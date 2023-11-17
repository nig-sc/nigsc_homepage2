---
id: pg_login_ssl-vpn_connection_mac
title: "VPNへの接続(Macの場合)"
---


Macの場合は、FortiClient GUIを使って接続します。

## 1. SSL-VPNクライアントの設定

1. FortiClientを起動し、メニューからリモートアクセスを選択し、[VPN設定]をクリックします。

![figure](VPNwin_11.png)

2. 新規VPN接続画面にて下表の通り入力し、「保存」をクリックします。

<table>
<tr>
	<td>VPN</td><td>「SSL-VPN」を選択</td>
</tr>
<tr>
	<td>接続名</td><td>任意の文字列</td>
</tr>
<tr>
	<td>リモートGW</td><td>133.39.24.254</td>
</tr>
<tr>
	<td>ポート番号</td><td>443(チェックボックスrにチェックを入れる)</td>
</tr>
<tr>
	<td>認証</td><td>「ユーザ名入力」を選択</td>
</tr>
</table>

![figure](sslvpn-win-443.png)

## 2. SSL-VPN接続を行う

1. ユーザ名とパスワードを入力します。

![figure](VPNwin_13.png) 

2. 以下のように[証明書を検証]というメッセージが表示されます。[続ける]をクリックします。

![figure](VPN_Mac_install_17.png)

3. セキュリティの警告は「はい」をクリックします。

![figure](VPNwin_14.png)

クリックすると、SSL-VPNアカウントに紐付くメールアドレスへ以下のようなワンタイムパスワードが送信されます。

![figure](VPNwin_15.png)

送信されない場合は、[FAQ:Login > FAQ(ログインについて)](/faq/faq_login_personal#🆀-個人ゲノム解析区画に対してssl-vpn接続を行うためにforticlientにユーザ名をパスワードを入力してもvpnアカウントに紐付くメールアドレスへワンタイムパスワードが送られてきません)をご参照ください。


4. [答え]にワンタイムパスワード(上記の例の場合、269274)を入力し、[OK]をクリックします。

![figure](VPN_Mac_install_19.png)

5. 以下の画面が表示されましたら、VPN接続が開始されます。

![figure](VPNwin_17.png)

