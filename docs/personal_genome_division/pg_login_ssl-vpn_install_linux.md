---
id: pg_login_ssl-vpn_install_linux
title: "SSL-VPNクライアントソフトウェアのインストール(Linuxの場合)"
---

LinuxやWindows Subsystem for Linux 2(WSL2)の場合は、CUIのopenfortivpnを使います。

## SSL-VPNクライアントソフト「openfortivpn」のインストール方法

### centOSにインストールする場合の実行例

1. 下記ページの RPMs -> x86_64 のリンクからopenfortivpnをインストールします。

[https://koji.fedoraproject.org/koji/buildinfo?buildID=1821936](https://koji.fedoraproject.org/koji/buildinfo?buildID=1821936)(2021.12.10時点 最新版)

```
$ sudo yum -y install
https://kojipkgs.fedoraproject.org//packages/openfortivpn/1.17.0/3.el7/x86_64/op
enfortivpn-1.17.0-3.el7.x86_64.rpm
```


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


## 設定ファイルの作成方法

configファイルを以下の内容で保存します。
- configファイルの名前、配置場所は任意です。
- usernameとpasswordには事前に取得したVPNアカウント情報を入力してください。
- trusted-certには、以下の固定値(SSL-VPNサーバの証明書のハッシュ値)を指定する必要があります。
```
$ sudo vi /path/to/config
host = 133.39.24.254
port = 443
username = ********
password = ********
trusted-cert = 860101b1dbaff15fa35da3f6ed643b3cae434234c9bd866d86f67948d07a7f94
```
