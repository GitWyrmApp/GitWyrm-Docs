# Install on Linux

GitWyrm supports x86_64 Linux. The AppImage is recommended because GitWyrm can
download and apply its own updates. The `.deb` and `.rpm` packages use your
system package manager, so replacing those packages remains a manual step.

## AppImage (recommended)

```bash
curl -fL -o GitWyrm.AppImage https://cdn.gitwyrm.com/installers/latest/GitWyrm-x86_64.AppImage
chmod +x GitWyrm.AppImage
./GitWyrm.AppImage
```

Keep the AppImage somewhere permanent before running it, such as
`~/Applications/GitWyrm.AppImage`. GitWyrm updates the file at that location.

## Ubuntu, Debian, or Mint

```bash
curl -fL -o GitWyrm-amd64.deb https://cdn.gitwyrm.com/installers/latest/GitWyrm-amd64.deb
sudo apt install ./GitWyrm-amd64.deb
```

## Fedora, RHEL, or a related distribution

```bash
curl -fL -o GitWyrm-x86_64.rpm https://cdn.gitwyrm.com/installers/latest/GitWyrm-x86_64.rpm
sudo dnf install ./GitWyrm-x86_64.rpm
```

All three links always point to the latest stable release. You can also choose
a different package from the download card on [gitwyrm.com](https://gitwyrm.com).
