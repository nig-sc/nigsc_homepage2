---
id: pg_login_ssl-vpn_install_linux
title: "Installing the SSL-VPN Client software FortiClient VPN(Linux)"
---

For Linux and Windows Subsystem for Linux 2 (WSL2), use the CUI openfortivpn.


## Install the SSL-VPN client software openfortivpn.

### Example 1: Installing on centOS

1. Install openfortivpn on the user's computer ('Client machine' in the figure below) by selecting the link 'RPMs' -> 'x86_64' at the URL below. [https://koji.fedoraproject.org/koji/buildinfo?buildID=1821936](https://koji.fedoraproject.org/koji/buildinfo?buildID=1821936)(latest version as of 10.Dec.2021)

- For the latest version of openfortivpn, see the following link. https://github.com/adrienverge/openfortivpn#installing

```
$ sudo yum -y install
https://kojipkgs.fedoraproject.org//packages/openfortivpn/1.17.0/3.el7/x86_64/op
enfortivpn-1.17.0-3.el7.x86_64.rpm
```

![figure](sslvpn.png)


2. Ensure that it has been installed.
```
$ sudo openfortivpn --version
1.17.0
```

### Example 2: Installing on Ubuntu

1. Execute the following command to install openfortivpn.

```
$ sudo apt-get install -y openfortivpn
```

2. Ensure that it has been installed.
```
$ sudo openfortivpn --version
1.6.0
```
