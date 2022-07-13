---
id: pg_login
title: "ログイン方法（個人ゲノム解析区画）"
---

## 概要

遺伝研スパコンの個人ゲノム解析区画へのログイン及びファイル転送にはSSL-VPN接続を用います。SSL-VPN接続を行うためにはユーザーの計算機に専用のソフトウェアをインストールする必要があります(これを以下SSL-VPNクライアントソフトウェアと呼びます)。

SSL-VPN接続の際は二要素認証が行われます。セキュリティー向上の目的で、SSL-VPNで接続している時にはユーザの計算機のインターネットへのアクセスは遮断される設定としています。このとき、ユーザの計算機が属するローカルネットワーク内への通信は遮断されません。したがって例えばユーザの計算機がローカルネットワーク内のファイルサーバーに接続されていて、そのファイルサーバーからデータを個人ゲノム解析環境に送るといった操作は問題なく可能です。一方、ローカルネットワークの外側からsshでユーザの計算機に接続して作業を行っていた場合はそのssh接続は遮断されるので注意が必要です。

一方で遺伝研スパコンのファイアウォール上での設定により個人ゲノム解析環境からインターネット上のHTTPSについてのみ利用可能となっています。

![figure](sslvpn.png)


接続の手順の概要は以下の図のとおりです。

![figure](howto.png)

## SSL-VPNクライアントソフトウェアのインストール 


### Windowsの場合
1. 以下のURLをクリックし、ForiClientの公式サイトのページにいきます。公式サイトのページで、［Product Downloads］、［FortiClient VPN only］の順にクリックします。
	- FortiClient公式サイト: [https://www.forticlient.com/downloads](https://www.forticlient.com/downloads)

![figure](VPNwin_2_701_1.png)

2. Windows版のFortiClient VPNインストーラのインストールプログラムをダウンロードします。

![figure](VPNwin_2_701_2.png)

3. ダウンロードフォルダに保存されたインストールプログラムを実行します。
「ユーザーアカウント制御」が表示された場合は［はい］を選択して許可します。

![figure](VPNwin_3_701.png)

4. 「Yes, I have read and accept the」にチェックを付け、「Next」をクリックします。

![figure](VPNwin_4.png)

5. ユーザの計算機のセットアップの種類を選択します。選択する種類は、ユーザの計算機にウィルスチェックソフトが入っているか否かで異なります。

注意事項
- 必ず以下の画像の通りにチェックボックスにチェックされていることを確認してください。
- その他のチェックされていない項目にチェックが入っていると、正常に動作しない恐れがあります。

【ユーザの計算機にウイルスチェックソフトが入っている場合】

Choose Setup Typeで「Secure Remote Access」にチェックが入っていることを確認し、「Next」をクリックします。

![figure](VPNwin_5.png)

【ユーザの計算機にウイルスチェックソフトが入っていない場合】

Choose Setup Typeで「Secure Remote Access」と「Additional Security Features」と「AntiVirus」にチェックが入っていることを確認し、「Next」をクリックします。

![figure](VPNwin_6.png)

6. Destination Folderではそのまま「Next」をクリックします。※通常、変更は不要です。

![figure](VPNwin_8.png)

7. 「install」をクリックするとインストールが開始されます。

![figure](VPNwin_9.png)

8. 「Finish」をクリックするとインストール完了となります。

![figure](VPNwin_10.png)


### Macの場合

1. 以下のURLをクリックし、ForiClientの公式サイトのページにいきます。公式サイトのページで、［Product Downloads］、［FortiClient VPN only］の順にクリックします。
	- FortiClient公式サイト: [https://www.forticlient.com/downloads](https://www.forticlient.com/downloads)


![figure](VPN_MAC_install_1_701_1.png)

2. Mac版のFortiClient VPNインストーラをダウンロードします。

![figure](VPN_MAC_install_1_701_2.png)

3. ダウンロードしたインストーラを実行します。OKをクリックします。

![figure](VPN_MAC_install_2_701.png)

4. FortiClientUpdateをダブルクリックします。

![figure](VPN_Mac_install_3.png)

[開く]をクリックします。

![figure](VPN_Mac_install_4.png)

ダウンロードが始まります。このまましばらくお待ち下さい。

![figure](VPN_Mac_install_5.png)

[install]をクリックします。

![figure](VPN_MAC_install_6_701.png)

![figure](VPN_MAC_install_6_701_2.png)

[続ける]をクリックします。

![figure](VPN_Mac_install_7.png)

[続ける]をクリックします。

![figure](VPN_Mac_install_8.png)

5. ユーザの計算機のインストールの種類を選択します。選択する種類は、ユーザの計算機にウィルスチェックソフトが入っているか否かで異なります。


【ユーザの計算機にウイルスチェックソフトが入っている場合】

[インストール]をクリックします。

![figure](VPN_Mac_install_10_1.png)


【ユーザの計算機にウイルスチェックソフトが入っていない場合】

[カスタマイズ]をクリックします。

![figure](VPN_Mac_install_10_2.png)

 
『パッケージ名』で「Secure Remote Access」と「AntiVirus」にチェックを入れ、[インストール]をクリックします。

必ず以下の画像の通りにチェックボックスにチェックされていることを確認してください。

その他のチェックされていない項目にチェックが入っていると、正常に動作しない恐れがあります。


![figure](VPN_Mac_install_11.png)


6. [閉じる]をクリックすると、インストールが完了します。

![figure](VPN_Mac_install_12.png)


### Linuxの場合

Linuxの場合やWindows Subsystem for Linux 2(WSL2)を使う場合はCUIのopenfortivpnを使うことでVPNにアクセスできます。

1. openfortivpnパッケージをインストール

SSL-VPNクライアントソフトopenfortivpnをインストールします。

例) centOSにインストールする場合
下記ページの RPMs -> x86_64 のリンクからopenfortivpnをインストールします。

[https://koji.fedoraproject.org/koji/buildinfo?buildID=1821936](https://koji.fedoraproject.org/koji/buildinfo?buildID=1821936)(2021.12.10時点 最新版)

```
$ sudo yum -y install
https://kojipkgs.fedoraproject.org//packages/openfortivpn/1.17.0/3.el7/x86_64/op
enfortivpn-1.17.0-3.el7.x86_64.rpm
```


インストールされたことを確認します。
```
$ sudo openfortivpn --version
1.17.0
```

例) Ubuntuにインストールする場合

以下のコマンドを実行してopenfortivpnをインストールします。

```
$ sudo apt-get install -y openfortivpn
```

インストールされたことを確認します。
```
$ sudo openfortivpn --version
1.6.0
```


2. 設定ファイル作成

configファイルを以下の内容で保存します。configファイルの名前、配置場所は任意です。

usernameとpasswordには事前に取得したVPNアカウント情報を入力ください。

trusted-certには、以下の固定値(SSL-VPNサーバの証明書のハッシュ値)を指定する必要があります。
```
$ sudo vi /path/to/config
host = 133.39.24.254
port = 443
username = ********
password = ********
trusted-cert = 860101b1dbaff15fa35da3f6ed643b3cae434234c9bd866d86f67948d07a7f94
```


## VPNへの接続方法 

### WindowsまたはMacの場合 (FortiClient GUI)

1. SSL-VPNクライアントの設定

1.1. FortiClientを起動し、メニューからリモートアクセスを選択し、[VPN設定]をクリックします。

![figure](VPNwin_11.png)

1.2. 新規VPN接続画面にて下表の通り入力し、「保存」をクリックします。

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

2. SSL-VPN接続を行う

2.1. ユーザ名とパスワードを入力します。

![figure](VPNwin_13.png) 

Macの場合は、さらに以下のように[証明書を検証]というメッセージが表示されます。

[続ける]をクリックします。

![figure](VPN_Mac_install_17.png)

2.2. セキュリティの警告は「はい」をクリックします。

![figure](VPNwin_14.png)

2.3. SSL-VPNアカウントに紐付くメールアドレスへ以下のようなワンタイムパスワードが送信されます。

![figure](VPNwin_15.png)

送信されない場合は、[FAQ:Login > FAQ(ログインについて)](/faq/faq_login#個人ゲノム解析区画に対してssl-vpn接続を行うためにforticlientにユーザ名をパスワードを入力してもvpnアカウントに紐付くメールアドレスへワンタイムパスワードが送られてきません)をご参照ください。

- Windowsの場合

「トークン」へワンタイムパスワード(上記の例の場合、269274)を入力し、「OK」をクリックします。

![figure](VPNwin_16.png)

- Macの場合

[答え]にワンタイムパスワード(上記の例の場合、269274)を入力し、[OK]をクリックします。

![figure](VPN_Mac_install_19.png)

2.4. 以下の画面が表示されましたら、VPN接続が開始されます。

![figure](VPNwin_17.png)


### Linuxの場合 (openfortivpn CUI)

1. 設定ファイル作成

configファイルを以下の内容で保存します。configファイルの名前、配置場所は任意です。

usernameとpasswordには事前に取得したVPNアカウント情報を入力ください。

trusted-certには、以下の固定値(SSL-VPNサーバの証明書のハッシュ値)を指定する必要があります。
```
$ sudo vi /path/to/config
host = 133.39.24.254
port = 443
username = ********
password = ********
trusted-cert = 860101b1dbaff15fa35da3f6ed643b3cae434234c9bd866d86f67948d07a7f94
```

2. VPN接続コマンド実行

設定ファイルを引数に指定して下記の通りコマンドを実行します。
```
$ sudo openfortivpn -c /path/to/config
```

コマンドを実行すると、SSL-VPNアカウントに紐付くメールアドレスへ以下のようなワンタイムパスワードが送信されます。

![figure](VPNwin_15.png)

送信されない場合は、[FAQ:Login > FAQ(ログインについて)](/faq/faq_login#個人ゲノム解析区画に対してssl-vpn接続を行うためにforticlientにユーザ名をパスワードを入力してもvpnアカウントに紐付くメールアドレスへワンタイムパスワードが送られてきません)をご参照ください。

以下の通り対話式でワンタイムパスワード(上記の例の場合、269274)を入力し、Enterキーを押してください。
```
$ sudo openfortivpn -c /path/to/config
INFO: Connected to gateway.
Two-factor authentication token:ワンタイムパスワードを入力し、Enterキーを押す
```

ワンタイムパスワード認証に成功すると、以下の通りログが表示されます。以下の通り表示されましたら、VPN接続が開始されます。このとき、プロンプトは返ってきません。Ctrl+Cを押すことでVPN接続が解除されます。

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


## SSHによるゲートウェイへのログイン

SSL-VPN接続後、ターミナルエミュレータを起動し、
以下のようにコマンドを実行すると個人ゲノム解析環境のゲートウェイにログインできます。

```
ssh [ユーザ名]@gwa.ddbj.nig.ac.jp 
```


## SSHによる解析サーバへのログイン

個人ゲノム解析区画はノード貸しなので、ユーザーの借りたノードにはゲートウェイ上からSSHすることによりログインします。
該当のノードの名前は利用開始時にお知らせします。

