---
id: pg_login_ssl-vpn_install_linux
title: "Installing FortiClient VPN Client software (Linux)"
---

For Linux and Windows Subsystem for Linux 2 (WSL2), use the CUI openfortivpn.


## Install the SSL-VPN client software openfortivpn.

### Example 1: Installing on centOS

1. Install openfortivpn from the RPMs -> x86_64 link on the following page.

[https://koji.fedoraproject.org/koji/buildinfo?buildID=1821936](https://koji.fedoraproject.org/koji/buildinfo?buildID=1821936)(latest version as of 10.Dec.2021)

```
$ sudo yum -y install
https://kojipkgs.fedoraproject.org//packages/openfortivpn/1.17.0/3.el7/x86_64/op
enfortivpn-1.17.0-3.el7.x86_64.rpm
```


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


## Create a configuration file

Save a configuration file with the following content
- The configration file name and location are optional.
- For username and password, enter the VPN account information obtained in advance.
- For trusted-cert, the following fixed value (hash value of the SSL-VPN server's certificate) must be specified.

```
$ sudo vi /path/to/config
host = 133.39.24.254
port = 443
username = ********
password = ********
trusted-cert = 860101b1dbaff15fa35da3f6ed643b3cae434234c9bd866d86f67948d07a7f94
```
