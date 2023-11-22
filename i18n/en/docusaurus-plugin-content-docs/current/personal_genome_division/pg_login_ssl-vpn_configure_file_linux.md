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
host = 133.39.24.254
port = 443
username = ********
password = ********
trusted-cert = 860101b1dbaff15fa35da3f6ed643b3cae434234c9bd866d86f67948d07a7f94
```
