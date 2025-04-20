---
id: faq_forticlient
title: "FAQ: SSL-VPN, FortiClient"
---


## &#x1F180; SSL-VPNクライアントソフトウェア FortiClientのダウンロード方法がわかりません。{#how-to-DL-VPN}

&#x1F150; 

以下のURLをクリックして、ForiClientの公式サイトのページにアクセスしたら、表示されたページの下の方にある「FortiClient VPN」から、Windows用またはMac用のFortiClient VPNクライアントソフトウェアをダウンロードします。下図の①、②の順にクリックすると、ダウンロードできます。

- FortiClient公式サイト: [https://www.fortinet.com/support/product-downloads](https://www.fortinet.com/support/product-downloads)

＜Windowsの場合＞
![](VPNwin_2_701_2.png)

＜Macの場合＞
![](VPN_MAC_install_1_701_2.png)


## &#x1F180; 個人ゲノム解析区画に対する VPN 接続ができません。{#error-vpn-connection}

&#x1F150; Windows 10, 11 の FortiClient で個人ゲノム解析区画にアクセスしたときに、`Credential or ssl vpn configuration is wrong (-7200)`というエラーが出る場合、

コントロールパネル => インターネットオプション => セキュリティータブ => 信頼済みサイト

ここに SSL-VPN のアドレスを登録します。

![](faq_pg-vpn.png)

## &#x1F180; FortiClientにログインするときに、「セキュリティの警告」のダイアログボックスが表示されずに、ステータス 40％ぐらいから先に進みません。{#dialogbox_disappear}

![](faq_login_personal_1.png)

&#x1F150; 40%ぐらいから先に進まずうまくつながらないときは、

1. まず、ダイアログボックスが、他の画面やウィンドウの後ろに表示されていないか、確認してください。

2. それでも解決できない場合は、[「SSL-VPNクライアントソフトウェアのインストール」を参照して](/guides/using_personal_genome_division/pg_login/#install-sslvpn)、最新のFortiClientをインストールしなおしてください。




## &#x1F180; 個人ゲノム解析区画に対してSSL-VPN接続を行うために、FortiClientにアカウント名とパスワードを入力しても、VPNアカウントに紐付くメールアドレスへワンタイムパスワードが送られてきません。{#no-onetime-pw-received}

&#x1F150; 
- Googleが2022年3月1日からセキュリティを強化した影響により、gmailに遺伝研スパコンVPNからのワンタイムパスワードのメールが飛ばない事象が発生しています。
- メール誤送信を防ぐためにも、フリーメールではなく所属機関のメールアドレスのご登録を推奨しています。

