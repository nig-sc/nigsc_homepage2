---
id: pg_login_ssl-vpn_connection_linux
title: "SSL-VPNへの接続方法(Linuxの場合)"
---


Linuxの場合は、openfortivpn CUIを使ってSSL-VPNに接続します。


1. 設定ファイルを引数に指定して、以下のコマンドを実行します。
```
$ sudo openfortivpn -c /path/to/config
```

2. コマンドを実行すると、SSL-VPNアカウントに紐付くメールアドレスへ以下のようなワンタイムパスワードが送信されます。

![figure](VPNwin_15.png)

送信されない場合は、[FAQ:Login > FAQ(ログインについて)](/guides/FAQ/faq_personal_genome/faq_forticlient/#no-onetime-pw-received)をご参照ください。

3. 以下のように対話式でワンタイムパスワード(上記の例の場合、269274)を入力し、Enterキーを押してください。
```
$ sudo openfortivpn -c /path/to/config
INFO: Connected to gateway.
Two-factor authentication token:ワンタイムパスワードを入力し、Enterキーを押す
```

4. ワンタイムパスワード認証に成功すると、以下のようにログが表示されます。ログが表示されましたら、VPN接続が開始されます。このとき、プロンプトは返ってきません。

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

