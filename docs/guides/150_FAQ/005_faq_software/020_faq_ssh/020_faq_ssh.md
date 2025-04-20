---
id: faq_ssh
title: "FAQ: SSH"
---

## &#x1F180; 遺伝研スパコンを利用するにあたり、Linuxに関する前提知識は、どの程度必要でしょうか。

&#x1F150; 以下のような資料に書かれている内容は、下記リンクをご参照ください。

1．Linux documentation project (LDP)に操作方法の入門的なドキュメントに書かれている内容に関する資料

- [Machtelt Garrels氏による「Bash Guide for Beginners」](https://tldp.org/LDP/Bash-Beginners-Guide/html/index.html?utm_source=chatgpt.com)
    - Bashシェルの基本からスクリプト作成までを丁寧に解説しており、初心者にとって有用な資料です。 
- [Machtelt Garrels氏による「Introduction to Linux - A Hands on Guide」](https://tldp.org/guides.html?utm_source=chatgpt.com)
    - Linuxの基本操作を実践的に学ぶためのガイドとして提供されています。 

上記2つの資料は、LDPの公式サイトから無料で閲覧・ダウンロードが可能です。

2．Linuxの操作方法を初心者向けに学べる

無料で提供されています。
- [Linux標準教科書](https://linuc.org/textbooks/linux/)
    - LPI-Japanが提供する無料の学習教材で、Linuxの基本操作からシステム管理までを網羅しています。
- [Linux入門（LFS101-JP）](https://training.linuxfoundation.org/ja/training/introduction-to-linux-lfs101-jp/)
    - Linux Foundationが提供する無料のオンラインコースで、主要なLinuxディストリビューションの基本操作やコマンドラインの使い方を学べます。


## &#x1F180; SSH接続時の「Permission denied (publickey)」エラーの原因と対策 {#error-pubkey-auth}


&#x1F150; SSH接続時に「Permission denied (publickey)」エラーが発生する原因はいくつかあります。以下の確認項目を順にチェックしてください。

### 1. パーミッションの確認

接続時にエラーが発生する一番の原因は、**ファイルやディレクトリのパーミッション（アクセス権限）の設定ミス**です。以下の表を参考に、パーミッションが正しく設定されているかを確認してください。


#### クライアント側（SSH接続を実行する側）

| パス例                             | 役割                           | 推奨パーミッション        | 備考                                        |
|----------------------------------|--------------------------------|------------------------|-------------------------------------------|
| `/home/USERNAME/`                | ホームディレクトリ               | `755` または `700`        | 他ユーザーに書き込み権限がないことを確認 |
| `/home/USERNAME/.ssh/`           | 鍵や設定ファイル格納ディレクトリ   | `700` (`drwx------`)     | 所有者以外アクセス不可                    |
| `/home/USERNAME/.ssh/id_rsa`     | 秘密鍵                           | `600` (`-rw-------`)     | 読み書きできるのは本人のみ                 |
| `/home/USERNAME/.ssh/id_rsa.pub` | 公開鍵                           | `644` (`-rw-r--r--`)     | 他人に渡しても問題なし                    |
| `/home/USERNAME/.ssh/known_hosts` | 接続先ホスト鍵の記録              | `644` または `600`        | 通常は`600`が推奨（どちらでも可）        |

---

#### サーバー側（SSH接続される側）

| パス例                             | 役割                               | 推奨パーミッション        | 備考                                        |
|----------------------------------|------------------------------------|------------------------|-------------------------------------------|
| `/home/USERNAME/`                | ホームディレクトリ                   | `755` または `700`        | 所有者以外に書き込み不可（`777`はNG）    |
| `/home/USERNAME/.ssh/`           | 公開鍵等を格納するディレクトリ        | `700` (`drwx------`)     | 他人がアクセスできないこと                |
| `/home/USERNAME/.ssh/authorized_keys` | 許可された公開鍵を記述するファイル     | `600` (`-rw-------`)     | `sshd` が厳密にチェック                   |
| `/home/USERNAME/.ssh/known_hosts` | （使う場合）接続先の記録              | `600` または `644`        | 通常は不要だが、ある場合は制限を確認       |

すべてのファイルとディレクトリの**所有者が接続対象ユーザーであること**が必須です。

- 「クライアント」は、ユーザーのローカルコンピュータを指します。
- 「サーバー」は、遺伝研スパコンを指します。
- 「USERNAME」には、ユーザーのアカウント名が入ります。
- SSHログは `/var/log/auth.log` または `journalctl -u ssh` で確認できます。

クライアントとサーバーの関係は、下図のようになっています。

![](ssh_permission_1.png)


### 2. 鍵の不一致

クライアント側の秘密鍵（`id_rsa` など）と、サーバー側に登録されている公開鍵（`authorized_keys`）が一致していない場合、認証が失敗します。公開鍵と秘密鍵のペアが正しく設定されているかを確認しましょう。

### 3. ユーザー名の確認

SSH接続時に指定するユーザー名（`USERNAME`）が間違っていないか確認してください。


## &#x1F180; SSHログイン時にWARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!というエラーが出ます {#error-ssh-login}

&#x1F150; 遺伝研スパコンにログインしようとした際、下記のようなメッセージが表示されてログインできない場合があります。

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

遺伝研スパコンのゲートウェイノードは `gw.ddbj.nig.ac.jp`, `gw2.ddbj.nig.ac.jp` の２つがありますが、それぞれ `ssh-keygen -R gw.ddbj.nig.ac.jp` , `ssh-keygen -R gw2.ddbj.nig.ac.jp` を実行することでこのエラーが出なくなります。**実行するときは、スパコン上ではなく、<font color="red">ユーザの計算機上で実行します</font>。**

実行すると、エラーは出なくなりますが、`Are you sure you want to continue connecting (yes/no)?` と聞かれます。「yes」を入力します。<br/>この確認メッセージは、ユーザの計算機から遺伝研スパコンのサーバに初めて接続する場合に、接続先がなりすまされた偽のサーバではなく正規のサーバであるかどうかの確認のために、表示されます。最初の1回だけ聞かれて、次回以降は表示されません。


## &#x1F180; SSH のコネクションが頻繁に切れます。 {#disconnect-ssh}

&#x1F150; `~/.ssh/config` に以下を追記してください。

```
Host *
    ServerAliveInterval 20
    TCPKeepAlive no
```

詳しくは以下ご参照ください。

&#x1f517;https://unix.stackexchange.com/questions/602518/ssh-connection-client-loop-send-disconnect-broken-pipe-or-connection-reset


## &#x1F180; Windows PowerShellからはログインできましたが、WSL2 (Windows Subsystem for Linux)上のUbuntu Linuxからはログインできないのでしょうか？  {#wls2-login}

&#x1F150; ログインできます。

現在のWindowsはWSL2を使うために最初から仮想マシンの上で動いており、WSL2上のUbuntu
Linuxは別の仮想マシンとして動作します。(例えば以下のリンク&#x1f517;
https://www.thomasmaurer.ch/2019/06/install-wsl-2-on-windows-10/)

つまり一台の物理計算機の中に２台の完全に独立な仮想計算機が入っている状態で動作しています。
ディスク領域も独立になっており、この２台の仮想計算機が一台の物理計算機の中でネットワーク接続している状態で動作します。

外見上そっくりですが、PowerShellはWindows OSがのった仮想マシン上で動いており、
Ubuntuのプロンプトが表示される画面はUbuntu LinuxOSがのった仮想マシン上で動いています。

ですからPowerShellで作った秘密鍵をUbuntu Linuxの方にコピーする必要があります。

例えば以下の通りです。

```
you@wsl2:~$ cp /mnt/c/Users/you/.ssh/id_rsa .ssh
you@wsl2:~$ ssh your_account@gw2.ddbj.nig.ac.jp
Enter passphrase for key '/home/you/.ssh/id_rsa':
Last login: Thu Dec  1 15:33:59 2022 from XXX.XXX.XXX.XXX
---------------------------------------------------------------------
Thank you for using NIG supercomputer system.
This is the gateway node, do not run program here.
Please use 'qlogin' to login to a interactive node.
---------------------------------------------------------------------
your_account@gw4:~ (2022-12-01 15:34:50)
$
```
