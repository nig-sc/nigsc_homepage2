---
id: pg_login_ssl-vpn_connection_linux
title: "VPNへの接続(Linuxの場合)"
---


Linuxの場合は、openfortivpn CUIを使って接続します。

## 1. 設定ファイルの作成

configファイルを以下の内容で保存します。
- configファイルの名前、配置場所は任意です。
- usernameとpasswordには事前に取得したVPNアカウント情報を入力ください。
- trusted-certには、以下の固定値(SSL-VPNサーバの証明書のハッシュ値)を指定する必要があります。
```
$ sudo vi /path/to/config
host = 133.39.24.254
port = 443
username = ********
password = ********
trusted-cert = 860101b1dbaff15fa35da3f6ed643b3cae434234c9bd866d86f67948d07a7f94
```

## 2. SSL-VPN接続を行う

1. 設定ファイルを引数に指定して、以下のコマンドを実行します。
```
$ sudo openfortivpn -c /path/to/config
```

コマンドを実行すると、SSL-VPNアカウントに紐付くメールアドレスへ以下のようなワンタイムパスワードが送信されます。

![figure](VPNwin_15.png)

送信されない場合は、[FAQ:Login > FAQ(ログインについて)](/faq/faq_login_personal#🆀-個人ゲノム解析区画に対してssl-vpn接続を行うためにforticlientにユーザ名をパスワードを入力してもvpnアカウントに紐付くメールアドレスへワンタイムパスワードが送られてきません)をご参照ください。

2. 以下のように対話式でワンタイムパスワード(上記の例の場合、269274)を入力し、Enterキーを押してください。
```
$ sudo openfortivpn -c /path/to/config
INFO: Connected to gateway.
Two-factor authentication token:ワンタイムパスワードを入力し、Enterキーを押す
```

3. ワンタイムパスワード認証に成功すると、以下のようにログが表示されます。ログが表示されましたら、VPN接続が開始されます。このとき、プロンプトは返ってきません。

```
$ sudo openfortivpn -c config
INFO: Connected to gateway.
Two-factor authentication token:
INFO: Authenticated.
INFO: Remote gateway has allocated a VPN.
Using interface ppp0
Connect: ppp0 <--> /dev/pts/1
INFO: Got addresses: [10.212.134.11], ns [133.39.221.65, 133.39.222.41]
INFO: negotiation complete
INFO: negotiation complete
local IP address 10.212.134.11
remote IP address 192.0.2.1
INFO: Interface ppp0 is UP.
INFO: Setting new routes...
INFO: Adding VPN nameservers...
INFO: Tunnel is up and running.
```

SSL-VPN接続を終了する場合は、Ctrl+Cを押して終了します。
