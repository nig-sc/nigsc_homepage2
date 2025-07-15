---
id: pg_login_ssl-vpn_install_linux
title: "Installing the SSL-VPN Client software FortiClient VPN(Linux)"
---

For Linux and Windows Subsystem for Linux 2 (WSL2), use the CUI openfortivpn.

For the latest version of openfortivpn, see the following link. 

https://github.com/adrienverge/openfortivpn#installing


## Install the SSL-VPN client software openfortivpn. {#install-openfortivpn}


### Example: Installing on Ubuntu {#install-openfortivpn#ubuntu}

1. Execute the following command to install openfortivpn.

```
$ sudo apt-get install -y openfortivpn
```

![figure](sslvpn.png)

2. Ensure that it has been installed.
```
$ sudo openfortivpn --version
1.6.0
```
