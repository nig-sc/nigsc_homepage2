---
id: pg_login
title: "ログイン方法（個人ゲノム解析区画）"
---


## 概要 {#introduction}

遺伝研スパコンの個人ゲノム解析区画へのログイン及びファイル転送には SSL-VPN 接続を用います。SSL-VPN 接続を行うためにはユーザーの計算機に専用のソフトウェアをインストールする必要があります(これを以下 SSL-VPN クライアントソフトウェアと呼びます)。

SSL-VPN 接続の際は二要素認証が行われます。セキュリティー向上の目的で、SSL-VPN で接続している時にはユーザの計算機のインターネットへのアクセスは遮断される設定としています。このとき、ユーザの計算機が属するローカルネットワーク内への通信は遮断されません。したがって例えばユーザの計算機がローカルネットワーク内のファイルサーバーに接続されていて、そのファイルサーバーからデータを個人ゲノム解析環境に送るといった操作は問題なく可能です。一方、ローカルネットワークの外側から ssh でユーザの計算機に接続して作業を行っていた場合はその ssh 接続は遮断されるので注意が必要です。

一方で遺伝研スパコンのファイアウォール上での設定により個人ゲノム解析環境からインターネット上の HTTPS についてのみ利用可能となっています。

![figure](sslvpn.png)


## ログイン方法 {#login-to-pg}


以下の図に、ログイン方法の流れを示します。

![figure](howto.png)


### STEP 1. SSL-VPN クライアントソフトウェアのインストール {#login-to-pg#install-sslvpn}

「[&#x1f517;<u>FortiClient</u>](https://www.fortinet.com/support/product-downloads)」の 公式サイト にアクセスし、FortiClient をダウンロードして、インストールします。

- 公式サイト：&#x1f517;<u>https://www.fortinet.com/support/product-downloads</u>


<table>
<tr>
<td width="400" valign="top">

![](forticlientonly.png)

</td>
<td width="400" valign="top">

「Product Downloads」の「FortiClient VPN only」をダウンロードしてください。

</td>
</tr>
</table>


ダウンロードとインストール方法の詳細は、以下のリンクからをご参照ください。

- [<u>SSL-VPN クライアントソフトウェアのインストール (Windows の場合)</u>](/personal_genome_division/pg_login_ssl-vpn_install_win)
- [<u>SSL-VPN クライアントソフトウェアのインストール (Mac の場合)</u>](/personal_genome_division/pg_login_ssl-vpn_install_mac)
- [<u>SSL-VPN クライアントソフトウェアのインストール (Linux の場合)</u>](/personal_genome_division/pg_login_ssl-vpn_install_linux)


### STEP 2. SSL-VPN クライアントの設定 {#login-to-pg#conf-sslvpn}

SSL-VPN クライアントのセットアップをします。

設定方法は、以下のリンクをご参照ください。
- [SSL-VPN クライアントの設定方法(Windows の場合)](/personal_genome_division/pg_login_ssl-vpn_configure_file_win)
- [SSL-VPN クライアントの設定方法(Mac の場合)](/personal_genome_division/pg_login_ssl-vpn_configure_file_mac)
- [SSL-VPN クライアントの設定方法(Linux の場合)](/personal_genome_division/pg_login_ssl-vpn_configure_file_linux)


### STEP 3. SSL-VPN への接続 {#login-to-pg#connect-sslvpn}

SSL-VPN 接続を行います。

接続方法の詳細は、以下のリンクをご参照ください。
- [<u>Windows の場合 (FortiClient GUI)</u>](/personal_genome_division/pg_login_ssl-vpn_connection_win)
- [<u>Mac の場合 (FortiClient GUI)</u>](/personal_genome_division/pg_login_ssl-vpn_connection_mac)
- [<u>Linux の場合 (openfortivpn CUI)</u>](/personal_genome_division/pg_login_ssl-vpn_connection_linux)

うまくつながらない場合は、[<u>FAQ</u>](/faq/faq_login_personal#dialogbox_disappear)をご参照ください。


### STEP 4. SSH によるゲートウェイへのログイン {#login-to-pg#ssh-login-gateway}

SSL-VPN 接続を開始したら、ユーザの計算機上でターミナルエミュレータを起動し、個人ゲノム解析環境のゲートウェイにログインします。

ゲートウェイノードは、`gwa.ddbj.nig.ac.jp` と  `gwa2.ddbj.nig.ac.jp` の 2 つがあります。それぞれ、以下のコマンドを実行するとログインできます。

```
ssh [アカウント名]@gwa.ddbj.nig.ac.jp 
```

または

```
ssh [アカウント名]@gwa2.ddbj.nig.ac.jp 
```

うまく行かない場合は、[<u>よくある質問(FAQ)</u>](/faq/faq_login_personal)をご参照ください。



## SSH による解析サーバへのログイン {#ssh-login-analysis-server}

個人ゲノム解析区画はノード貸しなので、ユーザーの借りたノードにはゲートウェイ上から SSH することによりログインします。
該当のノードの名前は利用開始時にお知らせします。
