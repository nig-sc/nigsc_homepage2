---
id: pg_login_ssl-vpn_configure_file_linux
title: "SSL-VPNクライアントの設定方法(Linuxの場合)"
---


Linuxの場合は、openfortivpn CUIを使って設定ファイル「configファイル」を作成して保存することにより、SSL-VPNクライアントの設定をします。

configファイルは、以下の内容で保存してください。
- configファイルの名前、配置場所は任意です。
- usernameとpasswordには事前に取得したVPNアカウント情報を入力ください。
- trusted-certには、以下の固定値(SSL-VPNサーバの証明書のハッシュ値)を指定する必要があります。
```
$ sudo vi /path/to/config
host = 133.39.233.30
port = 443
username = **********
password = **********
trusted-cert = 9f0a86fe555acbd053181471a0b2305eaff3ca995d69ca227f126e741da60546
```
