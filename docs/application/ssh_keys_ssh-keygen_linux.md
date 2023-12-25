---
id: ssh_keys_ssh-keygen_linux
title: SSH公開鍵・秘密鍵の生成方法 (Linuxの場合)
---


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


