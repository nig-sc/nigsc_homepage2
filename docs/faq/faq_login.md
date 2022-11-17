---
id: faq_login
title: "FAQ(ログインについて)"
---



## 公開鍵による認証ができません。

ホームディレクトリの group,other に write 権限が付与されている場合、公開鍵による認証は失敗します。
また、`~/.ssh`および`~/.ssh/authorized_keys`に、owner 以外の権限が付与されている場合も公開鍵認証に失敗します。
以下の 3 つのディレクトリ・ファイルのパーミッションをご確認願います。

パーミッションは `chmod` コマンドで変更できます。

```
（例）
chmod 750 ~/
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```



## 新スパコンに SSH ログインできない場合の対応


遺伝研スパコンにログインしようとした際、下記のようなメッセージが表示されてログインできない場合があります。

```
$ ssh gw.ddbj.nig.ac.jp
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@       WARNING: POSSIBLE DNS SPOOFING DETECTED!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
The RSA host key for gw.ddbj.nig.ac.jp has changed,
and the key for the corresponding IP address 133.39.228.101
is unknown. This could either mean that
DNS SPOOFING is happening or the IP address for the host
and its host key have changed at the same time.
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the RSA key sent by the remote host is
SHA256:xkyH37QZowWjidMSCIbOZa7Vw1p46Dxt4nF9nFJG+hk.
Please contact your system administrator.
Add correct host key in /home/username/.ssh/known_hosts to get rid of this message.
Offending RSA key in /home/username/.ssh/known_hosts:X
RSA host key for gw.ddbj.nig.ac.jp has changed and you have requested strict checking.
Host key verification failed.
```


その場合は、`.ssh/known_hosts`ファイルの該当行を削除、もしくは`.ssh/known_hosts`ファイル自体を削除する。
また、`ssh-keygen -R gw.ddbj.nig.ac.jp` を使用して該当行を削除してください。


## SSH のコネクションが頻繁に切れます。


`~/.ssh/config` に以下を追記してください。
```
Host *
    ServerAliveInterval 20
    TCPKeepAlive no
```

詳しくは以下ご参照ください。

&#x1f517;<u>https://unix.stackexchange.com/questions/602518/ssh-connection-client-loop-send-disconnect-broken-pipe-or-connection-reset</u>



## 個人ゲノム解析区画に対する VPN 接続ができません。


Windows 10, 11 の FortiClient で個人ゲノム解析区画にアクセスしたときに、`Credential or ssl vpn configuration is wrong (-7200)`というエラーが出る場合、

コントロールパネル => インターネットオプション => セキュリティータブ => 信頼済みサイト

ここに SSL-VPN のアドレスを登録する。

![](faq_pg-vpn.png)



## 個人ゲノム解析区画に対してSSL-VPN接続を行うために、FortiClientにユーザ名をパスワードを入力しても、VPNアカウントに紐付くメールアドレスへワンタイムパスワードが送られてきません。

- Googleが今年の3/1からセキュリティを強化した影響により、gmailに遺伝研スパコンVPNからのワンタイムパスワードのメールが飛ばない事象が発生しています。
- メール誤送信を防ぐためにも、フリーメールではなく所属機関のメールアドレスのご登録を推奨しています。


## ssh公開鍵を再度設定し直したのですが、`Permission denied`のエラーが出て接続できません。

2022年7月7日現在、新しい利用申請システムへの移行作業を行っております。(「[<u>2022 年 7 月 5 日(火) 新規利用申請システムが新しくなりました</u>](https://sc.ddbj.nig.ac.jp/blog/2022-07-05-news_NewApp)」)
そのため、新しいゲートウェイ`gw2.ddbj.nig.ac.jp`への公開鍵登録については即時設定が反映されますが、古い方のゲートウェイ`gw.ddbj.nig.ac.jp`へ設定が反映されるまでに１日程度かかります。
次回の定期メンテナンス（12月）の際に、古いゲートウェイにも即時設定が反映されるようシステムを改修する予定です。

つきましては、公開鍵などの設定直後は`gw2.ddbj.nig.ac.jp`からログインしてください。
