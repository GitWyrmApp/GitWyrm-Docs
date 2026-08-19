# Install on Linux

GitWyrm supports x86_64 Linux. The AppImage is recommended for a quick,
cross-distribution install because GitWyrm can download and apply its own
updates. Ubuntu, Debian, and Mint users can instead add the signed GitWyrm APT
repository and receive updates through the system package manager.

## AppImage (recommended)

```bash
curl -fL -o GitWyrm.AppImage https://cdn.gitwyrm.com/installers/latest/GitWyrm-x86_64.AppImage
chmod +x GitWyrm.AppImage
./GitWyrm.AppImage
```

Keep the AppImage somewhere permanent before running it, such as
`~/Applications/GitWyrm.AppImage`. GitWyrm updates the file at that location.

## Ubuntu, Debian, or Mint (APT repository)

Add the GitWyrm signing key and repository once:

```bash
sudo install -d -m 0755 /etc/apt/keyrings
curl -fsSL https://cdn.gitwyrm.com/apt/gitwyrm-archive-keyring.gpg \
  | sudo tee /etc/apt/keyrings/gitwyrm-archive-keyring.gpg >/dev/null

sudo tee /etc/apt/sources.list.d/gitwyrm.sources >/dev/null <<'EOF'
Types: deb
URIs: https://cdn.gitwyrm.com/apt
Suites: stable
Components: main
Architectures: amd64
Signed-By: /etc/apt/keyrings/gitwyrm-archive-keyring.gpg
EOF

sudo apt update
sudo apt install gitwyrm
```

After that, GitWyrm updates with the rest of the system:

```bash
sudo apt update
sudo apt upgrade
```

GitWyrm still checks for new releases itself. When an APT-installed copy finds
one, it shows the new version and links back to these steps instead of
downloading an AppImage or asking for administrator access.

### Direct `.deb` fallback

If you do not want to add the repository, install the latest package directly:

```bash
curl -fL -o GitWyrm-amd64.deb https://cdn.gitwyrm.com/installers/latest/GitWyrm-amd64.deb
sudo apt install ./GitWyrm-amd64.deb
```

Direct `.deb` installs do not receive updates through APT until the repository
above is added.

## Fedora, RHEL, or a related distribution

```bash
curl -fL -o GitWyrm-x86_64.rpm https://cdn.gitwyrm.com/installers/latest/GitWyrm-x86_64.rpm
sudo dnf install ./GitWyrm-x86_64.rpm
```

The RPM repository is not available yet, so replacing the direct `.rpm`
package remains a manual step.

All three links always point to the latest stable release. You can also choose
a different package from the download card on [gitwyrm.com](https://gitwyrm.com).
