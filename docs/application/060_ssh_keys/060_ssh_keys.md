---
id: ssh_keys
title: SSH公開鍵の作成方法
---

遺伝研スパコンではSSHログインは公開鍵暗号方式を使用しています。

現在、公開鍵暗号方式では一般にED25519の使用が推奨されています。


以下の手順で公開鍵・秘密鍵を作成してください。

鍵の作成にはユーザーの計算機上のターミナルエミュレータ(Macの場合はターミナル、Windows の場合は PowerShell など)を使います。


## 1. 必要なコマンドがインストールされていることの確認 {#check-commands-installation}

以下のコマンドを実行して、必要なコマンドがインストールされているか確認します。

以下のコマンドをそれぞれ実行します。

```
ssh -V
ssh-keygen -V
```

それぞれのコマンドがバージョンや使い方を表示すれば、コマンドはインストールされています。

## 2. SSH公開鍵・秘密鍵の生成方法 {#generate-ssh-keys}


SSH 公開鍵・秘密鍵を生成するには、`ssh-keygen`コマンドを使用します。

以下のようにコマンドを実行してください。(`youraccount`のところには自分のアカウント名を書いてください。また日付は鍵の作成日を書いてください。)

### 一般解析区画の場合 {#generate-ssh-keys-ga}

```
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_nigsc-gw -C "nigsc-gw:youraccount:2025-01-15"
```

### 個人ゲノム解析区画の場合 {#generate-ssh-keys-pg}

```
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_nigsc-gwa -C "nigsc-gwa:youraccount:2025-01-15"
```


上記のコマンドを使用すると、以下のように表示され、SSH公開鍵・秘密鍵が生成されます。

```
$ ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_nigsc-gw -C "nigsc-gw:youraccount:2025-01-15"   (1)
Generating public/private ed25519 key pair.
Enter passphrase (empty for no passphrase):                                                  (2)
Enter same passphrase again:                                                                 (3)
Your identification has been saved in /home/youraccount/.ssh/id_ed25519_nigsc-gw
Your public key has been saved in /home/youraccount/.ssh/id_ed25519_nigsc-gw.pub    
The key fingerprint is:
SHA256:3Lwg2PC8TFJBLT3xbfvE+sSE1NLXnDew+MesJhVp54c nigsc-gw:youraccount:2025-01-15   
The key's randomart image is:
+--[ED25519 256]--+
|     .oo..   .   |
|      ..+. ..o+.o|
|    . .. ...==o+=|
|     B . o oo=*oo|
|    o * S o ooE=.|
|     + o . ..*o .|
|      o   ...o+  |
|            oo   |
|              .  |
+----[SHA256]-----+
```

- (1) ED25519の鍵を生成する。
- (2) パスフレーズを入力する。
- (3) パスフレーズを再入力する。


SSH では秘密鍵ファイルを所有していることが本人であることの根拠として扱われます。
秘密鍵ファイルを盗まれてしまうとなりすましが可能となります。
パスフレーズの設定は省略することが可能ですが秘密鍵の盗難時の被害を軽減するため設定することを強く推奨します。


## 3. 鍵が生成されたかどうかの確認方法 {#check-ssh-key-generated}


`~/.ssh`ディレクトリの中に、公開鍵ファイルと秘密鍵ファイルが作られます。

上記手順で作成すると以下のようなファイルが作られます。

### 一般解析区画用の公開鍵、秘密鍵 {#check-ssh-key-generated-ga}

```
~/.ssh/id_ed25519_nigsc-gw.pub  # 公開鍵ファイル
~/.ssh/id_ed25519_nigsc-gw      # 秘密鍵ファイル
```

### 個人ゲノム解析区画用の公開鍵、秘密鍵 {#check-ssh-key-generated-pg}

```
~/.ssh/id_ed25519_nigsc-gwa.pub  # 公開鍵ファイル
~/.ssh/id_ed25519_nigsc-gwa      # 秘密鍵ファイル
```


