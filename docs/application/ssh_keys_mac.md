---
id: ssh_keys_mac
title: SSH公開鍵の登録(Macの場合)
---

以下の順番で作業を行います。

![](/img/ssh_keys/mac/ssh_mac_1.png)


## ①SSH公開鍵と秘密鍵を作る

![](/img/ssh_keys/mac/ssh_mac_2.png)

### 「ターミナル」を起動する

まず、「Finder」をクリックします。

![](/img/ssh_keys/mac/ssh_mac_3.png)

次に、「アプリケーション」をクリックします。

![](/img/ssh_keys/mac/ssh_mac_4.png)

次に、「ユーティリティ」をダブルクリックします。

![](/img/ssh_keys/mac/ssh_mac_5.png)

最後に、「ターミナル」をダブルクリックします。

![](/img/ssh_keys/mac/ssh_mac_6.png)

すると、「ターミナル」が起動します。

![](/img/ssh_keys/mac/ssh_mac_7.png)

このとき、「ターミナル」の画面は、以下のように表示されます。

![](/img/ssh_keys/mac/ssh_mac_8.png)

「ターミナル」の画面が表示されると、プロンプトが表示されます。プロンプトの最後には「$」が表示されています。プロンプトが表示されると、コマンドを入力できる状態になります。プロンプトの後ろの四角い箱は、カーソルといい、ここにコマンドを入力していきます。

- コマンドを入力するときは、「$」は入力しないでください。「$」は「ターミナル」が自動で表示するので、ユーザが入力する必要はありません。
- マウスで「$」やカーソルをクリックする必要はありません。カーソルが表示されたら、そのままの状態でコマンドを入力し、「enter」キーまたは「return」キーを押します。マウスは使いません。

![](/img/ssh_keys/mac/ssh_mac_9.png)

プロンプトとカーソルが表示されたことを確認したら、SSH公開鍵と秘密鍵を作る前に、OpenSSHクライアントソフトウェアがインストールされているか確認します。

このソフトウェアは、SSH公開鍵と秘密鍵を作ったり、遺伝研スパコンにSSHを用いて通信するためのコマンドを実行するときに使われるソフトウェアです。インストールされていないと、これ以降の作業ができないので、ここで確認しておきましょう。

以下のコマンドを入力し、「enter」キーまたは「return」キーを押します。


```
ssh -V
```

![](/img/ssh_keys/mac/ssh_mac_10.png)

すると、以下のようにOpensSSHクライアントのバージョン情報が出力されます。macOS Monterey 12.6では、デフォルトで、バージョン8.6p1がインストールされています。(2022年10月13日現在)

バージョン情報が出力されていれば、インストールされている状態ですので、次の「SSH公開鍵と秘密鍵を作る」の作業に移ります。

![](/img/ssh_keys/mac/ssh_mac_11.png)

最新バージョンの使用をおすすめいたします。<a href="http://www.openssh.com/">最新バージョンについての詳細は、OpehSSHの公式Webサイトで確認することができます。</a>

もしも以下のような画面が表示された場合は、まだOpenSSHクライアントソフトウェアがインストールされていない状態です。[ここをクリックしてFAQを参照し、OpenSSHクライアントをインストールしてください。](/faq/faq_sshkeys)

![](/img/ssh_keys/mac/Openssh_none.png)

### SSH公開鍵と秘密鍵を作る

バージョン情報が表示された行の次の行に、新たにプロンプトとカーソルが表示され、再び、コマンドを入力できる状態になります。

![](/img/ssh_keys/mac/ssh_mac_12.png)

以下のコマンドを入力して、「enter」キーまたは「return」キーを押します。

```
ssh-keygen -t rsa -b 3072
```

![](/img/ssh_keys/mac/ssh_mac_13.png)

すると、以下の画面のように、2行表示されます。

![](/img/ssh_keys/mac/ssh_mac_14.png)

`Enter file in which to save the key (/Users/your_username/.ssh/id_rsa):`と聞かれます。これは、「作ったSSH公開鍵と秘密鍵をあなたのPCの中のどこに保存しますか。」という意味です。

通常は何も入力しないで、そのまま「enter」キーまたは「return」キーを押します。

![](/img/ssh_keys/mac/ssh_mac_15.png)

すると、以下の画面のように、２行表示されます。

![](/img/ssh_keys/mac/ssh_mac_16.png)

`Enter passphrase (empty for no passphrase):`というメッセージが表示されます。ここにパスフレーズを入力してください。

パスフレーズは遺伝研スパコンのパスワードとは違うものです。長い文字列を自由に設定することが出来ます。
パスフレーズは、ランダムに本を開いた際のページの一行目など、スペースを含む長いランダムな文字列を設定することが想定されています。

<table>
	<tbody>
		<tr>
			<td>SSH では秘密鍵ファイルを所有していることが本人であることの根拠として扱われます。 秘密鍵ファイルを盗まれてしまうとなりすましが可能となります。 パスフレーズの設定は省略することが可能ですが、秘密鍵の盗難時の被害を軽減するために設定することを強く推奨します。</td>
		</tr>
	</tbody>
</table>

パスフレーズを入力して、「enter」キーまたは「return」キーを押します。

&#x2757; パスフレーズを入力しても、画面は以下の状態のまま何も変化しません。入力している最中も、以下の画面のまま何も変化しませんが、気にせずそのまま入力していきます。入力が終わったら、「enter」キーまたは「return」キーを押します。

![](/img/ssh_keys/mac/ssh_mac_17.png)

すると、以下の画面のように表示されます。

![](/img/ssh_keys/mac/ssh_mac_18.png)

`Enter same passphrase again: `というメッセージが表示されます。上記で入力したパスフレーズと同じパスフレーズを入力して、「enter」キーまたは「return」キーを押します。


&#x2757; パスフレーズを入力しても、画面は以下の状態のまま何も変化しません。入力している最中も、以下の画面のまま何も変化しませんが、気にせずそのまま入力していきます。入力が終わったら、「enter」キーまたは「return」キーを押します。

![](/img/ssh_keys/mac/ssh_mac_19.png)

すると、以下の画面のように表示されます。

![](/img/ssh_keys/mac/ssh_mac_20.png)


#### &#x2666;**作ったSSH公開鍵と秘密鍵の存在を確認する**
/Users/your_username/.ssh/というディレクトリの中に、SSH公開鍵と秘密鍵が本当に作られているかどうか確認していきます。

![](/img/ssh_keys/mac/ssh_mac_21.png)

まず、.sshというディレクトリが本当にできているかを確認するために、以下のコマンドを入力して、「enter」キーまたは「return」キーを押します。

```
ls -la
```

![](/img/ssh_keys/mac/ssh_mac_22.png)

すると、以下の画面のように表示され、/Users/your_usernameのディレクトリの中に、.sshという名前のディレクトリが存在していることが確認できます。

![](/img/ssh_keys/mac/ssh_mac_23.png)

次に、.sshというディレクトリの中に移動して、SSH公開鍵と秘密鍵が本当に作られているかどうか確認していきます。

.sshの中に移動するために、以下のコマンドを入力して、「enter」キーまたは「return」キーを押します。

```
cd .ssh
```

続けて、SSH公開鍵と秘密鍵が本当に作られているかどうか確認するために、以下のコマンドを入力して、「enter」キーまたは「return」キーを押します。

```
ls -l
```

![](/img/ssh_keys/mac/ssh_mac_24.png)

すると、以下の画面のように表示され、SSH公開鍵と秘密鍵が本当に作られていることが確認できます。

![](/img/ssh_keys/mac/ssh_mac_25.png)


#### &#x2666;**作ったSSH公開鍵を確認する**

以下のコマンドを打ち込んで、「enter」キーまたは「return」キーを押して、作ったSSH公開鍵の中身を確認します。

```
cat id_rsa.pub
```

すると、以下の画面のように、作ったSSH公開鍵の中身が表示されます。文字列で書かれているのがわかります。

![](/img/ssh_keys/mac/ssh_mac_26.png)


## ②遺伝研スパコンにSSH公開鍵を登録する

![](/img/ssh_keys/mac/ssh_mac_27.png)

作ったSSH公開鍵の中身が表示されたら、表示された中身を全て選択し、command + Cを押して、コピーします。


範囲を選択する方法: 先頭文字「s」のすぐ左でクリックし、そのまま末尾(ここでは、"your_username@your_usernamenoMacBook-Pro.local" の「l」(小文字のエル))までドラックすると、選択できます。

![](/img/ssh_keys/mac/ssh_mac_28.png)

<a href="https://sc-account.ddbj.nig.ac.jp/application/registration">新規利用申請のページ</a>の「アカウント」のページにある「SSH鍵」の枠の中をクリックし、command + V を押して、貼り付けます。

![](/img/ssh_keys/mac/ssh_mac_29.png)

貼り付けたら、「次へ」ボタンを押して、[利用登録申請フォームへの入力を続けます](/application/registration#利用申請)。

![](/img/ssh_keys/mac/ssh_mac_30.png)


[「利用申請・変更」のページの「利用申請」で利用申請が完了し、以下の画面のように、"利用申請登録完了"の画面が表示されると、SSH公開鍵の登録が完了します。](/application/registration#利用申請)

![](/img/ssh_keys/mac/ssh_mac_31.png)
