---
id: ssh_keys
title: SSH 公開鍵の登録
---

## 公開鍵・秘密鍵の生成

安全なユーザー認証のために必要となる SSH 公開鍵・秘密鍵をユーザーの計算機上で作成します。
作成には Mac, Linux の場合ターミナルエミュレータ(Windows の場合は PowerShell など)を使います。

作業前にユーザーの計算機に OpenSSH がインストールされていることを確認して下さい。Windows PowerShell への OpenSSH のインストール方法はたとえば[Microsoft 社の該当ページ](https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse)などを参照してください。


SSH 公開鍵・秘密鍵を生成するには、`ssh-keygen`コマンドを使用します。

```
$ cd ~/.ssh
$ ssh-keygen -t rsa -b 2048                                                      (1)
Generating public/private rsa key pair.
Enter file in which to save the key (/home/temp/.ssh/id_rsa):                    (2)
Enter passphrase (empty for no passphrase):                                      (3)
Enter same passphrase again:                                                     (4)
Your identification has been saved in /home/temp/.ssh/id_rsa.
Your public key has been saved in /home/temp/.ssh/id_rsa.pub.
The key fingerprint is:
e5:23:f0:fc:b7:60:70:80:79:91:f2:f1:6d:a8:ae:90 temp@host
```

- (1) RSA バージョン 2 で、2048 ビットの鍵を生成する。
- (2) 公開鍵・秘密鍵の保存先：変更する場合のみここでパスを指定する。変更しない場合は Enter を押す。
- (3) パスフレーズを入力する。
- (4) パスフレーズを再入力する。


SSH では秘密鍵ファイルを所有していることが本人であることの根拠として扱われます。
秘密鍵ファイルを盗まれてしまうとなりすましが可能となります。
パスフレーズの設定は省略することが可能ですが秘密鍵の盗難時の被害を軽減するため設定することを強く推奨します。



## 遺伝研スパコンゲートウェイへの公開鍵の設置


```
$ ls ~/.ssh
id_rsa  id_rsa.pub
$ cat ~/.ssh/id_rsa.pub
ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAznOdmkDHzjDpsNIhkl2VNjUXBlC3QePKDAzmu3FDCMgBYUDyiXAXLf85q25cylVq66gLUP63nlFJz4/SLO13w2Qf3Gyyj7ADJJZR3sD+Sf8vdlt2hShAT0kkKBmToBqv2Pqx2SfzRVedlyCE4YFieUVmZUkz95dxwSUklGXmQSvigkqCG86r0NlxCSMjYitDGWAyGMu37cvBYzH0+C2uthtbqTd1VYHfjtvewySSZsvbVVnjLme0Ah2cAyifVaSN4uslDBqkN62b3vaijoXPy9ieUzSP0/dgBhKN/m7yhnM/1s+foJnRI3wfDdqXPw3yOqPC/9EXrjnmdpEmpgMJTw== temp@host
$ 
```


鍵ペアの保存先を確認すると、`id_rsa`, `id_rsa.pub`の２つのファイルが作成されています。
`id_rsa.pub`が公開鍵になりますので、ファイルの内容をコピーし下記の「直接入力フォーム」にペーストすることで、公開鍵の登録が出来ます。
もしくは、ファイルのアップロードフォームで`id_rsa.pub`をアップロードして下さい。


<table>
<tr>
<td>

[直接入力フォーム(日本語ページ)](https://sc2.ddbj.nig.ac.jp/index.php/ja-form-ssh-application)
[直接入力フォーム(英語ページ)](https://sc2.ddbj.nig.ac.jp/index.php/en/en-form-ssh-application)

![](ssh_direct_form.jpg)
</td>
<td>
画面下部（赤枠）部分に上記でコピーした鍵をペーストする。ペースト後、画面下部の公開鍵ボタンを押して登録を行う。
</td>
</tr>

<tr>
<td>

[ファイルのアップロードフォーム(日本語ページ)](https://sc2.ddbj.nig.ac.jp/index.php/ja-form-ssh-application-2)
[ファイルのアップロードフォーム(英語ページ)](https://sc2.ddbj.nig.ac.jp/index.php/en/en-form-ssh-application-2)

![](ssh_upload_form.jpg)
</td>
<td>
画面下部（赤枠）の【選択】を押し、ファイル選択画面寄り、アップロードするファイルを選択後、画面下部（赤枠）の【公開鍵登録】ボタンを押して登録を行う。
</td>
</tr>

</table>


 

## 遺伝研スパコンゲートウェイへの接続確認

ssh コマンドにてスーパーコンピュータシステムに接続します。

```
$ ssh youraccount@gw.ddbj.nig.ac.jp
Enter passphrase for key '/home/youraccount/.ssh/id_rsa':
Last login: Fri Sep 19 13:28:19 2014 from gw.ddbj.nig.ac.jp
---------------------------------------------------------------------
Thank you for using supercomputer system.
This node is in use for login service only. Please use 'qlogin'.
---------------------------------------------------------------------
[youraccount@gw ~]$
```

パスフレーズの入力プロンプトが表示されたら鍵生成に指定したパスフレーズを入力します。

認証後、スーパーコンピュータシステムへのログインが完了します。

秘密鍵の格納場所が`~/.ssh/id_rsa`以外の場合は以下のように秘密鍵のパスを指定します。

```
ssh -i ~/yourpath/id_rsa youraccount@gw.ddbj.nig.ac.jp
```

うまく接続できない場合は[よくある質問(FAQ)](/faq/faq_login)もご参照ください。














