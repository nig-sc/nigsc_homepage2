---
id: pg_login_ssl-vpn_install_linux
title: "SSL-VPNクライアントソフトウェアのインストール(Linuxの場合)"
---

LinuxやWindows Subsystem for Linux 2(WSL2)の場合は、CUIのopenfortivpnを使います。


## SSL-VPNクライアントソフト「openfortivpn」のインストール方法

### centOSにインストールする場合の実行例

1. 下記URLの 「RPMs」 -> 「x86_64」 のリンクから、openfortivpnをユーザの計算機上 (下図の「クライアントマシン」) にインストールします。　[https://koji.fedoraproject.org/koji/buildinfo?buildID=1821936](https://koji.fedoraproject.org/koji/buildinfo?buildID=1821936)(2021.12.10時点 最新版)

- openfortivpn の最新バージョンは、以下のリンクをご参照ください。 https://github.com/adrienverge/openfortivpn#installing

```
$ sudo yum -y install
https://kojipkgs.fedoraproject.org//packages/openfortivpn/1.17.0/3.el7/x86_64/op
enfortivpn-1.17.0-3.el7.x86_64.rpm
```

![figure](sslvpn.png)



2. インストールされたことを確認します。
```
$ sudo openfortivpn --version
1.17.0
```

### Ubuntuにインストールする場合の実行例

1. 以下のコマンドを実行してopenfortivpnをインストールします。

```
$ sudo apt-get install -y openfortivpn
```

2. インストールされたことを確認します。
```
$ sudo openfortivpn --version
1.6.0
```
