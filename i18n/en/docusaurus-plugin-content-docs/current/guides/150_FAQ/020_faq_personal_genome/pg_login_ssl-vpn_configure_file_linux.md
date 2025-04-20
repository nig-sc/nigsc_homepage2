---
id: pg_login_ssl-vpn_configure_file_linux
title: "Configure the SSL-VPN client (Linux)"
---


For Linux, configure the SSL-VPN client by creating and saving a configuration file 'config file' using the openfortivpn CUI.


Save a configuration file with the following content;
- Configration file name and location are optional.
- For username and password, enter the VPN account information obtained in advance.
- For trusted-cert, the following fixed value (hash value of the SSL-VPN server's certificate) must be specified.

```
$ sudo vi /path/to/config
host = 133.39.233.30
port = 443
username = **********
password = **********
trusted-cert = 9f0a86fe555acbd053181471a0b2305eaff3ca995d69ca227f126e741da60546
```
