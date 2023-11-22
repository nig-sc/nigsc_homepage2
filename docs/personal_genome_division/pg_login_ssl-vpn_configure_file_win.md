---
id: pg_login_ssl-vpn_configure_file_win
title: "SSL-VPNクライアントの設定方法(Windowsの場合)"
---


Windowsの場合は、FortiClient GUIを使ってSSL-VPNクライアントの設定をします。


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
