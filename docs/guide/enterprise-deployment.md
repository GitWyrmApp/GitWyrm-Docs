# Enterprise Deployment

GitWyrm can be installed silently and deployed through Intune, Configuration
Manager, Group Policy, or any scripted automation.

## How GitWyrm installs

GitWyrm installs **per-user** into `%LOCALAPPDATA%\GitWyrm`. It never requires
administrator rights and never writes outside the user's profile.

This matters for deployment: GitWyrm must run in a **user** context, not as
`SYSTEM`. Installing as `SYSTEM` appears to succeed but places the app in the
system profile, where no real user can launch it.

The file you deploy, `GitWyrm-Setup.exe`, is a small bootstrapper. It downloads
the current release through `https://cdn.gitwyrm.com` and installs it.

## Installer switches

```
GitWyrm-Setup.exe [options]
```

| Switch          | Effect                                                                            |
| --------------- | --------------------------------------------------------------------------------- |
| `/S`, `/silent` | Install with no user interface and no prompts. Required for automated deployment. |
| `/log <path>`   | Write the setup log to `<path>` instead of `%TEMP%`. `/log=<path>` also works.    |
| `/norestart`    | Accepted and ignored. GitWyrm setup never reboots the machine.                    |
| `/?`            | Show usage.                                                                       |

Switches are case-insensitive, and the `--silent` / `--log` long forms are
accepted as well.

### Exit codes

The bootstrapper returns a status your deployment tool can act on.

| Code | Meaning                                                     |
| ---- | ----------------------------------------------------------- |
| `0`  | Success                                                     |
| `1`  | Bad command line                                            |
| `2`  | Download failed - check the [network requirements](#network-requirements) |
| `3`  | The installer ran but failed                                |

### Logging

Setup writes a log to `%TEMP%\GitWyrm-Setup.log` unless `/log` overrides it.
Collect this file when reporting a failed deployment.

```
GitWyrm-Setup.exe /S /log "C:\Logs\GitWyrm-Setup.log"
```

## Deploying with Intune

### 1. Package the installer

Put `GitWyrm-Setup.exe` in an otherwise empty folder and wrap it with the
[Microsoft Win32 Content Prep Tool](https://github.com/microsoft/Microsoft-Win32-Content-Prep-Tool):

```
IntuneWinAppUtil.exe -c C:\package -s GitWyrm-Setup.exe -o C:\output
```

### 2. Create the app

In Intune, create a **Windows app (Win32)** and upload the resulting
`.intunewin` file.

| Setting                 | Value                                                  |
| ----------------------- | ------------------------------------------------------ |
| Install command         | `GitWyrm-Setup.exe /S /log "%TEMP%\GitWyrm-Setup.log"` |
| Uninstall command       | `"%LOCALAPPDATA%\GitWyrm\uninstall.exe" /S`            |
| Install behavior        | **User**                                               |
| Device restart behavior | No specific action                                     |

::: warning Install behavior must be User
GitWyrm is a per-user application. Leaving this set to **System** installs into
the system profile and users will not see the app.
:::

### 3. Detection rule

Use a file rule:

- **Rule type:** File
- **Path:** `%LOCALAPPDATA%\GitWyrm`
- **File or folder:** `GitWyrm.exe`
- **Detection method:** File or folder exists

To require a minimum version instead, use detection method **String (version)**
with the operator _Greater than or equal to_ and the version you are deploying.

## Deploying with a script

The bootstrapper is a normal executable, so any automation that can run a
command works. Check the exit code rather than assuming success.

```powershell
$setup = "\\server\share\GitWyrm-Setup.exe"
$log = "$env:TEMP\GitWyrm-Setup.log"

$proc = Start-Process $setup -ArgumentList '/S', "/log=$log" -PassThru
$proc.WaitForExit()

if ($proc.ExitCode -ne 0) {
  Write-Error "GitWyrm install failed with exit code $($proc.ExitCode). See $log"
  exit $proc.ExitCode
}
```

::: tip Wait on the bootstrapper, not the process tree
The installer launches GitWyrm when it finishes. The bootstrapper still exits
immediately with its own status, so Intune records the result correctly. In
scripts, wait on the bootstrapper process itself as shown above.
`Start-Process -Wait` waits on the whole process tree and will block until the
user closes GitWyrm.
:::

## Network requirements

Setup downloads over HTTPS. Allow egress to these hosts:

| Host                                   | Used for                                        |
| -------------------------------------- | ----------------------------------------------- |
| `cdn.gitwyrm.com`                      | Setup, the bundled git tools, and the beta channel |
| `github.com`                           | Release downloads and stable update checks      |
| `release-assets.githubusercontent.com` | The release files `github.com` hands off to     |

GitWyrm's own update checks use the same hosts, so allow them for installed
copies too, not just for setup.

### Proxies

If the machine reaches the internet through a proxy, set `HTTPS_PROXY` (or
`ALL_PROXY`) in the environment setup runs in:

```powershell
$env:HTTPS_PROXY = 'http://proxy.corp.example:8080'
GitWyrm-Setup.exe /S
```

Setup does not read Windows' system-wide proxy configuration, so the
environment variable is required.

Proxies requiring authentication are supported with the usual
`http://user:password@host:port` form. Credentials are redacted from the setup
log.

### Installing without internet access

There is no separate offline installer. If the target machines cannot reach the
CDN at install time, download the full installer for the version you are
deploying - `GitWyrm_<version>_x64-setup.exe` (or `arm64`) from the
[releases page](https://github.com/Wutname1/GitWyrm/releases), or the
version-pinned copy at
`https://github.com/Wutname1/GitWyrm/releases/download/<version>/GitWyrm-Setup.exe` -
and deploy that directly instead of the bootstrapper. It accepts the same `/S` switch.

## Uninstalling

```
"%LOCALAPPDATA%\GitWyrm\uninstall.exe" /S
```

This removes the application. It runs in the user's context and returns `0` on
success.
