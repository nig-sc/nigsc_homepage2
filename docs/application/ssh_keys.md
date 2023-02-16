---
id: ssh_keys
title: SSH公開鍵の登録・変更
---

&#x26A0;既に利用申請を終えているが、SSH公開鍵の登録をしないまま利用申請をしてしまった場合は、[<u>FAQ : Application/Billing > FAQ(新規利用申請)</u>](/faq/faq_NewUser_registration#新規利用申請の際利用登録申請フォームにssh公開鍵を入力しないまま利用申請をしてしまいました既に利用申請を終えていますがssh公開鍵の登録をしないまま利用申請をしてしまった状態ですどうしたらよいでしょうか)をご参照ください。


## 公開鍵・秘密鍵の生成

安全なユーザー認証のために必要となる SSH 公開鍵・秘密鍵をユーザーの計算機上で作成します。
作成には Mac, Linux の場合ターミナルエミュレータ(Windows の場合は PowerShell など)を使います。

作業前にユーザーの計算機に OpenSSH がインストールされていることを確認して下さい。Windows PowerShell への OpenSSH のインストール方法はたとえば[Microsoft 社の該当ページ](https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse)などを参照してください。


SSH 公開鍵・秘密鍵を生成するには、`ssh-keygen`コマンドを使用します。

```
$ cd ~/.ssh
$ ssh-keygen -t rsa -b 3072                                                      (1)
Generating public/private rsa key pair.
Enter file in which to save the key (/home/temp/.ssh/id_rsa):                    (2)
Enter passphrase (empty for no passphrase):                                      (3)
Enter same passphrase again:                                                     (4)
Your identification has been saved in /home/temp/.ssh/id_rsa.
Your public key has been saved in /home/temp/.ssh/id_rsa.pub.
The key fingerprint is:
e5:23:f0:fc:b7:60:70:80:79:91:f2:f1:6d:a8:ae:90 temp@host
```

- (1) RSA バージョン 2 で、3072 ビットの鍵を生成する。
- (2) 公開鍵・秘密鍵の保存先：変更する場合のみここでパスを指定する。変更しない場合は Enter を押す。
- (3) パスフレーズを入力する。
- (4) パスフレーズを再入力する。


SSH では秘密鍵ファイルを所有していることが本人であることの根拠として扱われます。
秘密鍵ファイルを盗まれてしまうとなりすましが可能となります。
パスフレーズの設定は省略することが可能ですが秘密鍵の盗難時の被害を軽減するため設定することを強く推奨します。



## 遺伝研スパコンへのSSH公開鍵の登録


```
$ ls ~/.ssh
id_rsa  id_rsa.pub
$ cat ~/.ssh/id_rsa.pub
ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAznOdmkDHzjDpsNIhkl2VNjUXBlC3QePKDAzmu3FDCMgBYUDyiXAXLf85q25cylVq66gLUP63nlFJz4/SLO13w2Qf3Gyyj7ADJJZR3sD+Sf8vdlt2hShAT0kkKBmToBqv2Pqx2SfzRVedlyCE4YFieUVmZUkz95dxwSUklGXmQSvigkqCG86r0NlxCSMjYitDGWAyGMu37cvBYzH0+C2uthtbqTd1VYHfjtvewySSZsvbVVnjLme0Ah2cAyifVaSN4uslDBqkN62b3vaijoXPy9ieUzSP0/dgBhKN/m7yhnM/1s+foJnRI3wfDdqXPw3yOqPC/9EXrjnmdpEmpgMJTw== temp@host
$ 
```


鍵ペアの保存先を確認すると、`id_rsa`, `id_rsa.pub`の２つのファイルが作成されています。
`id_rsa.pub`が公開鍵になりますので、ファイルの内容を、先頭文字列"ssh-rsa"から全部コピーし下記の赤枠部分「SSH鍵」にペーストすることで、公開鍵の登録が出来ます。

&#x26A0; アカウントをお持ちの方は、[<u>申請内容の変更</u>](/application/registration/#%E7%94%B3%E8%AB%8B%E5%86%85%E5%AE%B9%E3%81%AE%E5%A4%89%E6%9B%B4)のページから登録してください。

![](reg_ssh_JP.png)

 

## 遺伝研スパコンへの接続確認

- 一般解析区画にログインする場合は、[<u>「一般解析区画 > ログイン方法(一般解析区画)」</u>](/general_analysis_division/ga_login)をご参照ください。
- 個人ゲノム解析区画にログインする場合は、[<u>「個人ゲノム解析区画 > ログイン方法(個人ゲノム解析区画)」</u>](/personal_genome_division/pg_login)をご参照ください。


うまく接続できない場合は[よくある質問(FAQ)](/faq/faq_login)もご参照ください。

