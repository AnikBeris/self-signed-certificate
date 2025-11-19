<p align="center">
  <strong>-------></strong> 
  <a href="/README_en_EN.md">English</a> | 
  <a href="/README.md">Русский</a> 
  <strong><-------</strong>
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./media/logo-dark.png">
    <img alt="Project Logo" src="./media/logo-light.png" width="512" height="auto">
  </picture>
</p>

---

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-blue?style=flat&logo=github)](https://github.com/AnikBeris)
[![License](https://img.shields.io/badge/License-purple?style=flat&logo=github)](/LICENSE.md)
[![GitHub Stars](https://img.shields.io/github/stars/AnikBeris?style=flat&logo=github&label=Звёзды&color=orange)](https://github.com/AnikBeris)

</div>

<div align="center">
  <img src="./media/image0.gif" alt="SPACER" width="90%">
</div>


# 3x-ui + SSL certificate



> **Disclaimer:** This project is only for personal learning and communication, please do not use it for illegal purposes, please do not use it in a production environment


**If you like this project, don't forget to leave a star.**:star2:

<p align="left">
  <a href="https://pay.cloudtips.ru/p/7249ba98" target="_blank">
    <img src="./media/buymeacoffe.png" alt="Image">
  </a>
</p>

Donations are warmly welcomed no matter how small and thank you very much. 😌

| | |
|-------------:|:-------------|
| **Bitcoin (BTC)** |`1Dbwq9EP8YpF3SrLgag2EQwGASMSGLADbh`|
| **Ethereum (ERC20)** | `0x22258ea591966e830199d27dea7c542f31ed5dc5`|
| **Binance Smart Chain (BEP20)** | `0x22258ea591966e830199d27dea7c542f31ed5dc5`|
| **Solana (SOL)** | `yYYXsiVTzsvfvsMnBxfxSZEWTGytjAViE2ojf3hbLeF`|
| **Cloud tips** | [cloudtips](https://pay.cloudtips.ru/p/7249ba98) |
---



## Install 3x-ui + SSL certificate

```bash
sudo apt update && sudo apt upgrade -y && \
sudo apt install -y git curl openssl qrencode systemd && \
rm -rf self_signed_certificate.sh && \
curl -O https://raw.githubusercontent.com/AnikBeris/self-signed-certificate/main/self_signed_certificate.sh && \
chmod +x self_signed_certificate.sh && \
bash ./self_signed_certificate.sh


```


## SSL Certificate

<details>
    <summary>Click for SSL Certificate details</summary>

### Cloudflare

The management script includes a built-in SSL certificate application for Cloudflare. To use this script to apply for a certificate, you need the following:

- Cloudflare registered email
- Cloudflare Global API Key
- The domain name must be resolved to the current server through Cloudflare

**How to get the Cloudflare Global API Key:**

1. Run the `x-ui` command in the terminal, then choose `Cloudflare SSL Certificate`.
2. Visit the link: [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens).
3. Click on "View Global API Key" (see the screenshot below):
   ![](media/APIKey1.PNG)
4. You may need to re-authenticate your account. After that, the API Key will be shown (see the screenshot below):
   ![](media/APIKey2.png)

When using, just enter your `domain name`, `email`, and `API KEY`. The diagram is as follows:
   ![](media/DetailEnter.png)


</details>

---


## Recommended OS

- Ubuntu 20.04+
- Debian 11+
- CentOS 8+
- OpenEuler 22.03+
- Fedora 36+
- Arch Linux
- Parch Linux
- Manjaro
- Armbian
- AlmaLinux 8.0+
- Rocky Linux 8+
- Oracle Linux 8+
- OpenSUSE Tubleweed
- Amazon Linux 2023
- Windows x64

## Supported Architectures and Devices

<details>
  <summary>Click for Supported Architectures and devices details</summary>

Our platform offers compatibility with a diverse range of architectures and devices, ensuring flexibility across various computing environments. The following are key architectures that we support:

- **amd64**: This prevalent architecture is the standard for personal computers and servers, accommodating most modern operating systems seamlessly.

- **x86 / i386**: Widely adopted in desktop and laptop computers, this architecture enjoys broad support from numerous operating systems and applications, including but not limited to Windows, macOS, and Linux systems.

- **armv8 / arm64 / aarch64**: Tailored for contemporary mobile and embedded devices, such as smartphones and tablets, this architecture is exemplified by devices like Raspberry Pi 4, Raspberry Pi 3, Raspberry Pi Zero 2/Zero 2 W, Orange Pi 3 LTS, and more.

- **armv7 / arm / arm32**: Serving as the architecture for older mobile and embedded devices, it remains widely utilized in devices like Orange Pi Zero LTS, Orange Pi PC Plus, Raspberry Pi 2, among others.

- **armv6 / arm / arm32**: Geared towards very old embedded devices, this architecture, while less prevalent, is still in use. Devices such as Raspberry Pi 1, Raspberry Pi Zero/Zero W, rely on this architecture.

- **armv5 / arm / arm32**: An older architecture primarily associated with early embedded systems, it is less common today but may still be found in legacy devices like early Raspberry Pi versions and some older smartphones.

- **s390x**: This architecture is commonly used in IBM mainframe computers and offers high performance and reliability for enterprise workloads.
</details>

## Languages

- English
- Persian
- Traditional Chinese
- Simplified Chinese
- Japanese
- Russian
- Vietnamese
- Spanish
- Indonesian
- Ukrainian
- Turkish
- Português (Brazil)


## Features

- System Status Monitoring
- Search within all inbounds and clients
- Dark/Light theme
- Supports multi-user and multi-protocol
- Supports protocols, including VMESS, VLESS, Trojan, Shadowsocks, Dokodemo-door, Socks, HTTP, wireguard
- Supports XTLS native Protocols, including RPRX-Direct, Vision, REALITY
- Traffic statistics, traffic limit, expiration time limit
- Customizable Xray configuration templates
- Supports HTTPS access panel (self-provided domain name + SSL certificate)
- Supports One-Click SSL certificate application and automatic renewal
- For more advanced configuration items, please refer to the panel
- Fixes API routes (user setting will be created with API)
- Supports changing configs by different items provided in the panel.
- Supports export/import database from the panel




## Disclaimer ⚠️
Use this image at your own risk and responsibility. By using this image, you agree to be automatically bound by the License Agreement associated with it.

The author does not provide any assurances, whether explicit or implicit, regarding the accuracy, completeness, or appropriateness of this image for specific purposes. The author shall not be held accountable for any damages, including but not limited to direct, indirect, incidental, consequential, or special damages, arising from the use or inability to use this image or its accompanying documentation, even if the possibility of such damages has been communicated.

By choosing to use this image, you acknowledge and assume all risks associated with its use. Additionally, you agree that the author cannot be held liable for any issues or consequences that may arise as a result of its usage.
