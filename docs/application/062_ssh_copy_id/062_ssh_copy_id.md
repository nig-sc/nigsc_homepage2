---
id: ssh_copy_id
title: SSH公開鍵の設置方法
---

遺伝研スパコンではSSHログインは公開鍵暗号方式を使用しています。

以下の手順で公開鍵を遺伝研スパコンにアップロードしてください。

公開鍵のアップロードにはユーザーの計算機上のターミナルエミュレータ(Macの場合はターミナル、Windows の場合は PowerShell など)を使います。


## 1. 必要なコマンドがインストールされていることの確認 {#check-command-installed}

以下のコマンドを実行して、必要なコマンドがインストールされているか確認します。

```
ssh-copy-id -h
```

使い方が表示されれば、コマンドはインストールされています。

:::note

インストールされていない場合、

Macの場合はHomebrewやMacPortなどで`ssh-copy-id`コマンドをインストールしてください。

```
brew install ssh-copy-id
```

Windowsの場合はgit for windowsをインストールすることで`ssh-copy-id`がインストールされます。

1. git for windowsの公式ページ https://gitforwindows.org/ からインストーラをダウンロードし実行してください。
2. インストールが終了したら、「スタート」からGit Bashを起動してください。そうするとGit Bashのターミナルが表示されます。
3. 表示されたターミナルから`ssh-copy-id -h`を実行してみてください。これでコマンドのインストールが完了したかどうか確認できます。

このようにしてインストールされたGit Bashから`ssh`, `ssh-keygen`, `ssh-copy-id`が実行できます。
(PowerShellからは`ssh`と`ssh-keygen`だけが実行可能です。)

:::



## 2. 遺伝研スパコンへのSSH公開鍵の設置方法 {#set-ssh-pub-key}


`ssh-copy-id`コマンドを使って、新しいSSH公開鍵を遺伝研スパコンに追加することができます。

`ssh-copy-id`コマンドを使う場合は、 新しい鍵を`-i`オプションに、既存の鍵を`-o IdentityFile=`オプションに書くことにより、遺伝研スパコンにSSH公開鍵を追加することができます。

:::note

予めSSH公開鍵が遺伝研スパコンに設置されていない場合は、このコマンドは使えません。

:::


### 一般解析区画の場合 {#set-ssh-pub-key-ga}

```
ssh-copy-id -f -i ~/.ssh/id_ed25519_nigsc-gw.pub -o IdentityFile=~/.ssh/id_rsa youraccount@gw.ddbj.nig.ac.jp
```


### 個人ゲノム解析区画の場合 {#set-ssh-pub-key-ga}

```
ssh-copy-id -f -i ~/.ssh/id_ed25519_nigsc-gwa.pub -o IdentityFile=~/.ssh/id_rsa youraccount-pg@gwa.ddbj.nig.ac.jp
```



## 3. SSHログインが可能であるかの確認方法 {#check-ssh-login}


以下のコマンドで、ログインを行います。

```
ssh -i ~/.ssh/id_ed25519_nigsc-gw youraccount@gw.ddbj.nig.ac.jp
```


うまく接続できない場合は、よくある質問(FAQ)もご参照ください。
- [一般解析区画](/guides/FAQ/faq_general_analysis_division/faq_login_general/)
- [個人ゲノム解析区画](/guides/FAQ/faq_personal_genome/faq_forticlient/faq_forticlient)



## 4. `~/.ssh/config` ファイルを使った設定 {#conf-ssh-config}

`~/.ssh/config` ファイルを作成することで、毎回 `-i` オプションを指定することを省略できます。

以下の設定を追加してください。


### 一般解析区画用の設定 {#conf-ssh-config-ga}

```
Host gw
    HostName gw.ddbj.nig.ac.jp
    User youraccount
    IdentityFile ~/.ssh/id_ed25519_nigsc-gw

Host gw2
    HostName gw2.ddbj.nig.ac.jp
    User youraccount
    IdentityFile ~/.ssh/id_ed25519_nigsc-gw
```
 
### 個人ゲノム区画用の設定 {#conf-ssh-config-pg}

```
Host gwa
    HostName gwa.ddbj.nig.ac.jp
    User youraccount-pg
    IdentityFile ~/.ssh/id_ed25519_nigsc-gwa

Host gwa2
    HostName gwa2.ddbj.nig.ac.jp
    User youraccount-pg
    IdentityFile ~/.ssh/id_ed25519_nigsc-gwa
```

### 動作確認 {#verification}
 
上記のようにすると、以下のコマンドでSSHログインできるようになります。

### 一般解析区画の場合 {#verification-ga}

```
ssh  youraccount@gw.ddbj.nig.ac.jp
ssh  youraccount@gw2.ddbj.nig.ac.jp
```


### 個人ゲノム解析区画の場合 {#verification-pg}

```
ssh  youraccount-pg@gwa.ddbj.nig.ac.jp
ssh  youraccount-pg@gwa2.ddbj.nig.ac.jp
```

