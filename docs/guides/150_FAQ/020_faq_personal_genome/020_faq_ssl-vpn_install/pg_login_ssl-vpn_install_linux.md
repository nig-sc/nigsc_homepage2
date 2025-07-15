---
id: pg_login_ssl-vpn_install_linux
title: "SSL-VPNクライアントソフトウェアのインストール(Linuxの場合)"
---

LinuxやWindows Subsystem for Linux 2(WSL2)の場合は、CUIのopenfortivpnを使います。

openfortivpn の最新バージョンは、以下のリンクをご参照ください。 

https://github.com/adrienverge/openfortivpn#installing


## SSL-VPNクライアントソフト「openfortivpn」のインストール方法 {#install-openfortivpn}


### Ubuntuにインストールする場合の実行例 {#install-openfortivpn#ubuntu}

1. 以下のコマンドを実行してopenfortivpnをインストールします。

```
$ sudo apt-get install -y openfortivpn
```

![figure](sslvpn.png)


2. インストールされたことを確認します。
```
$ sudo openfortivpn --version
1.6.0
```
