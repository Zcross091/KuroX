<div align="center">

   <img src="assets/images/app_icon.png" alt="KuroX Logo" width="130" style="border-radius: 28px;"/>

# KuroX

### Next-Gen Anime & Manga Client • Fast, Modern & Ad-Free

[![Total Downloads](https://img.shields.io/github/downloads/Zcross091/KuroX/total?style=for-the-badge&color=22c55e&logo=github&label=Downloads)](https://github.com/Zcross091/KuroX/releases)
[![Latest Release](https://img.shields.io/github/v/release/Zcross091/KuroX?style=for-the-badge&color=6366f1&logo=github&label=Release)](https://github.com/Zcross091/KuroX/releases/latest)
[![Release CI](https://img.shields.io/github/actions/workflow/status/Zcross091/KuroX/release.yaml?branch=main&style=for-the-badge&logo=githubactions&label=Build)](https://github.com/Zcross091/KuroX/actions/workflows/release.yaml)
[![Website](https://img.shields.io/website?style=for-the-badge&up_color=00e676&down_color=ff1744&url=https%3A%2F%2Fzcross091.github.io%2FKuroX%2F&label=Website)](https://zcross091.github.io/KuroX/)

<br/>

[![Flutter](https://img.shields.io/badge/Flutter-%E2%89%A53.8.1-02569B?logo=flutter)](https://flutter.dev/)
[![Dart](https://img.shields.io/badge/Dart-%E2%89%A53.8.1-0175C2?logo=dart)](https://dart.dev)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![GitHub stars](https://img.shields.io/github/stars/Zcross091/KuroX?style=social)](https://github.com/Zcross091/KuroX/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Zcross091/KuroX?style=social)](https://github.com/Zcross091/KuroX/network/members)

**KuroX** is a high-performance, open-source anime streaming and manga reading client built with Flutter. Engineered for speed, privacy, and visual elegance, KuroX delivers instant out-of-the-box playback, deep multi-tracker synchronization, and an extensible source architecture.

[✨ Features](#-key-features) • [📊 Live Stats](#-live-community--download-stats) • [📥 Downloads](#-downloads--installation) • [⚙️ Extensions](#-extensions--sources) • [👥 Contributors](#-contributors) • [⚖️ Legal](#-legal--dmca-disclaimer)

</div>

---

## 📊 Live Community & Download Stats

All metrics are fetched and updated in real time directly from GitHub:

<div align="center">

| Metric | Live Status / Counter | Description |
| :--- | :---: | :--- |
| **📥 Total App Downloads** | [![Total Downloads](https://img.shields.io/github/downloads/Zcross091/KuroX/total?style=for-the-badge&color=22c55e&logo=github&label=Downloads)](https://github.com/Zcross091/KuroX/releases) | Total binary downloads across all published releases & platforms |
| **🚀 Latest Release** | [![Latest Release](https://img.shields.io/github/v/release/Zcross091/KuroX?style=for-the-badge&color=6366f1&logo=github&label=Version)](https://github.com/Zcross091/KuroX/releases/latest) | Most recent stable production release tag |
| **⚡ Latest Version Downloads** | [![Latest Downloads](https://img.shields.io/github/downloads/Zcross091/KuroX/latest/total?style=for-the-badge&color=0284c7&logo=github&label=Latest%20Downloads)](https://github.com/Zcross091/KuroX/releases/latest) | Active adoption of the current release build |
| **🔄 Automated CI / CD Pipeline** | [![Release CI](https://img.shields.io/github/actions/workflow/status/Zcross091/KuroX/release.yaml?branch=main&style=for-the-badge&logo=githubactions&label=Build%20Status)](https://github.com/Zcross091/KuroX/actions/workflows/release.yaml) | Cross-platform build status across Android, Windows & Linux |
| **🌐 Official Web Portal** | [![Website](https://img.shields.io/website?style=for-the-badge&up_color=00e676&down_color=ff1744&url=https%3A%2F%2Fzcross091.github.io%2FKuroX%2F&label=Status)](https://zcross091.github.io/KuroX/) | Live status of the KuroX web showcase & download portal |
| **⭐ Repository Stars** | [![Stars](https://img.shields.io/github/stars/Zcross091/KuroX?style=for-the-badge&color=eab308&logo=github)](https://github.com/Zcross091/KuroX/stargazers) | Community interest & bookmarks |
| **🍴 Community Forks** | [![Forks](https://img.shields.io/github/forks/Zcross091/KuroX?style=for-the-badge&color=0ea5e9&logo=github)](https://github.com/Zcross091/KuroX/network/members) | Active forks and developer community |
| **🕒 Recent Activity** | [![Last Commit](https://img.shields.io/github/last-commit/Zcross091/KuroX?style=for-the-badge&logo=git&color=8b5cf6)](https://github.com/Zcross091/KuroX/commits/main) | Timestamp of the most recent commit |

</div>

<details>
<summary><b>📦 Platform Distribution & Compatibility</b> (Click to expand)</summary>

KuroX provides dedicated native builds for each ecosystem:

- **📱 Android & Android TV**:
  - `arm64-v8a`: Optimized for modern 64-bit phones and tablets.
  - `armeabi-v7a`: Compatibility for older 32-bit devices.
  - `Universal APK`: Single package supporting Android TV, Fire TV, and all architectures.
  - `x86_64`: Intel/AMD Android tablets, Chromebooks, and emulators.
- **🪟 Windows**:
  - `Setup.exe`: Inno Setup installer with automatic Start Menu shortcuts.
  - `Portable.zip`: Zero-installation standalone folder.
- **🐧 Linux**:
  - `.tar.gz` & `.zip`: Universal Linux release bundle.
- **🍏 macOS**:
  - `Universal.zip`: Universal binary for Apple Silicon (M1/M2/M3/M4) and Intel Macs with native window controls and Discord RPC.
- **📱 iOS & iPadOS**:
  - `Unsigned.ipa`: Lightweight IPA (~36 MB) for sideloading via AltStore, Sideloadly, TrollStore, Scarlet, or Feather.

Check out all available downloads on the **[GitHub Releases Page](https://github.com/Zcross091/KuroX/releases)**.

</details>

---

## ✨ Key Features

- ⚡ **Instant Native Streaming (1s–3s)**: Built-in high-speed native Public API provider. No manual repo installation required—open and start streaming immediately in full HD, or use third-party extensions of your choice.
- 🛠️ **Fixed Stream Extraction**: Built-in fixes for the extension bridge ensuring multi-repo sources (Aniyomi, Mangayomi, CloudStream) resolve streams reliably without "No video available" errors.
- 🧭 **Season Navigator**: Fast season switcher for multi-season franchises, spin-offs, and sequels directly from the anime details screen.
- 🔒 **App Lock Security**: Built-in biometric and PIN protection for private watchlists, library items, and read history.
- 📊 **Multi-Tracker Sync**: Real-time progress synchronization with **AniList**, **MyAnimeList**, and **Simkl**.
- 📥 **Offline Downloads**: Download full episodes and manga chapters for offline viewing anytime.
- 🖥️ **Cross-Platform**: Tailored experiences across Android (Mobile & TV), Windows (Installer & Portable), Linux, macOS, and iOS.

---

## 📥 Downloads & Installation

Pre-built binaries are automatically compiled and published through GitHub Actions:

### 📱 Android
Download the latest `.apk` from **[GitHub Releases](https://github.com/Zcross091/KuroX/releases)**:
- **`KuroX-...-android-universal.apk`**: Recommended for all phones, tablets, and Android TV sideloading.
- **`KuroX-...-android-arm64-v8a.apk`**: Optimized for modern 64-bit Android smartphones.

### 🪟 Windows
- **`KuroX-...-windows-setup.exe`**: Inno Setup installer.
- **`KuroX-...-windows-portable.zip`**: Zero-install standalone archive.

### 🐧 Linux
- **`KuroX-...-linux-x86_64.tar.gz`**: Standalone Linux bundle.

### 🍏 macOS
- **`KuroX-...-macos-universal.zip`**: Universal bundle for Apple Silicon (M-series) & Intel Macs. Unzip and drag `KuroX.app` to `/Applications`. Run `xattr -cr /Applications/KuroX.app` if macOS displays an open-source Gatekeeper prompt.

### 📱 iOS & iPadOS
- **`KuroX-...-ios-unsigned.ipa`**: Stripped lightweight IPA for sideloading via **AltStore**, **Sideloadly**, **TrollStore**, **Scarlet**, or **Feather**.

---

## 🛠️ Building From Source

**Prerequisites**: Flutter SDK ≥ 3.8.1, Git

```bash
# Clone the repository
git clone https://github.com/Zcross091/KuroX.git
cd KuroX

# Fetch dependencies
flutter pub get

# Run on your desktop or connected device
flutter run
```

---

## 👥 Contributors

Contributions are welcome! If you contribute code, bug fixes, or documentation, your name and avatar will be automatically updated here.

<a href="https://github.com/Zcross091/KuroX/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Zcross091/KuroX" alt="KuroX Contributors" />
</a>

<!-- readme: contributors -start -->
<table>
	<tbody>
		<tr>
            <td align="center">
                <a href="https://github.com/roshancodespace">
                    <img src="https://avatars.githubusercontent.com/u/230851258?v=4" width="64;" alt="roshancodespace"/>
                    <br />
                    <sub><b>roshancodespace</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/Darkx-dev">
                    <img src="https://avatars.githubusercontent.com/u/130650239?v=4" width="64;" alt="Darkx-dev"/>
                    <br />
                    <sub><b>Darkx-dev</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/Zcross091">
                    <img src="https://avatars.githubusercontent.com/u/126247344?v=4" width="64;" alt="Zcross091"/>
                    <br />
                    <sub><b>Zcross091</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/Shebyyy">
                    <img src="https://avatars.githubusercontent.com/u/83452219?v=4" width="64;" alt="Shebyyy"/>
                    <br />
                    <sub><b>Shebyyy</b></sub>
                </a>
            </td>
		</tr>
	<tbody>
</table>
<!-- readme: contributors -end -->

---

## ⚖️ Legal & DMCA Disclaimer

KuroX is purely a client application and does not host, upload, or own any media or video content. All metadata, synopses, and covers are fetched from public APIs (AniList, MyAnimeList, Simkl). All media links are resolved client-side from publicly available web sources.

---

<div align="center">

**Developed by [Zcross091](https://github.com/Zcross091) and the community**

⭐ Star the project on GitHub to support active development!

</div>
