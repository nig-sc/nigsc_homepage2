---
id: ssh_keys_windows
title: SSH公開鍵の登録(Windowsの場合)
---


Windowsに標準搭載されているPowerShellを使ってSSH公開鍵の登録を行う手順をご説明します。

![](/img/ssh_keys/windows/ssh_win_1.png)

PowerShellを起動すると、以下の画像のようにPowerShellのバージョンが古くなっていることを示すメッセージが表示される場合があります。その場合は本ページの作業に入る前に、PowerShellのバージョンアップを行うことを推奨します。方法については[FAQの「最新バージョンのPowerShellをインストールする方法」](/faq/faq_sshkeys_windows#最新バージョンのpowershellをインストールする方法)をご参照ください。

![](/img/ssh_keys/windows/ssh_win_PS5_1.png)


## ①SSH公開鍵と秘密鍵を作る

![](/img/ssh_keys/windows/ssh_win_2.png)


### PowerShellを起動する

Windowsマークをクリックします。

![](/img/ssh_keys/windows/ssh_win_3.png)

検索ボックスが表示されますので、「&#x1F50D; 検索するには、ここに入力します」をクリックします。クリックする場所は、検索ボックスの中であればどこでも構いません。

![](/img/ssh_keys/windows/ssh_win_4.png)

クリックすると、以下の画像のように表示されます。

![](/img/ssh_keys/windows/ssh_win_5.png)

「pwsh」と入力します。

![](/img/ssh_keys/windows/ssh_win_6.png)

入力すると、以下の画面のように検索結果に実行ファイルが表示されます。

![](/img/ssh_keys/windows/ssh_win_7.png)

もし以下の画面のように、検索結果に実行ファイルが表示されない場合は、まだ最新バージョンのPowerShellがインストールされていない状態ですので、インストールが必要です。[FAQの「最新バージョンのPowerShellをインストールする方法」を参照して、最新バージョンのPowerShellをインストールしてください](/faq/faq_sshkeys_windows#最新バージョンのpowershellをインストールする方法)。

![](/img/ssh_keys/windows/ssh_win_7_nonpwsh.png)

検索結果に実行ファイルが表示されたら、「管理者として実行」をクリックします。

![](/img/ssh_keys/windows/ssh_win_8.png)

「はい」をクリックします。

![](/img/ssh_keys/windows/ssh_win_9.png)

クリックすると、PowerShellが起動します。

![](/img/ssh_keys/windows/ssh_win_10.png)

このとき、PowerShellの画面は、以下のように表示されます。この画面は、2022年10月19日時点での最新バージョン PowerShell 7.2.6を起動したときのPowerShellの画面です。

![](/img/ssh_keys/windows/ssh_win_11.png)

PowerShellの画面が表示されると、コマンドプロンプトが表示されます。コマンドプロンプトの最後には「>」が表示されています。コマンドプロンプトが表示されると、コマンドを入力できる状態になります。コマンドプロンプトの後ろで点滅している四角い箱「_」は、カーソルといい、ここにコマンドを入力していきます。

- コマンドを入力するときは、「>」は入力しないでください。「>」はPowerShell 7.2.6が自動で表示するので、ユーザが入力する必要はありません。
- マウスで「>」やカーソルや黒い画面の中をクリックする必要はありません。クリックしても操作できません。カーソルが表示されたら、そのままの状態でコマンドを入力し、[Enter]キーを押します。マウスは使いません。

![](/img/ssh_keys/windows/ssh_win_12.png)

もしこの時に、画面に以下のメッセージが表示される場合は、「さらに最新バージョンが発表されているのでアップグレードしてください。」と言われています。[ここをクリックして、FAQの「最新バージョンのPowerShellをインストールする方法」のページに移動して、最新バージョンのPowerShellをインストールしてください](/faq/faq_sshkeys_windows#最新バージョンのpowershellをインストールする方法)。

```
 A new PowerShell stable release is available: v7.2.7
   Upgrade now, or check out the release page at:
     https://aka.ms/PowerShell-Release?tag=v7.2.7
```

コマンドプロンプトが表示されたことを確認したら、SSH公開鍵と秘密鍵を作る前に、OpenSSHクライアントソフトウェアがインストールされているか確認します。

このソフトウェアは、SSH公開鍵と秘密鍵を作ったり、遺伝研スパコンにSSHを用いて通信するためのコマンドを実行するときに使われるソフトウェアです。

インストールされていないと、これ以降の作業ができないので、ここで確認しておきましょう。

以下のコマンドを入力し、[Enter]キーを押します。

```
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'
```

![](/img/ssh_keys/windows/ssh_win_13.png)

すると、以下のように、OpensSSHクライアントがインストールされている状態かどうかが表示されます。

![](/img/ssh_keys/windows/ssh_win_14.png)

```
Name  : OpenSSH.Client~~~~0.0.1.0
State : Installed
```

このように、「OpenSSH.Client~~~~0.0.1.0」の「State」が "Installed" になっていたら、OpensSSHクライアントがインストールされている状態です。[次の「SSH公開鍵と秘密鍵を作る」に進みます](/application/ssh_keys_windows#ssh公開鍵と秘密鍵を作る-1)。

もし「State」が "NotPresent" になっている場合は、まだOpenSSHクライアントソフトウェアがインストールされていない状態です。[「参考文献」を参照してインストール](/application/ssh_keys_windows#参考文献)してから、次の「SSH公開鍵と秘密鍵を作る」に進んでください。


### SSH公開鍵と秘密鍵を作る

OpensSSHクライアントのインストールの状態が表示された行の次の行に、新たにコマンドプロンプトとカーソルが表示され、再び、コマンドを入力できる状態になります。

![](/img/ssh_keys/windows/ssh_win_15.png)

以下のコマンドを入力して、[Enter]キーを押します。

```
ssh-keygen -t rsa -b 3072
``` 

![](/img/ssh_keys/windows/ssh_win_16.png)

すると、以下の画面のように、2行表示されます。

![](/img/ssh_keys/windows/ssh_win_17.png)

`Enter file in which to save the key (/Users/your_username/.ssh/id_rsa):`と聞かれます。これは、「作ったSSH公開鍵と秘密鍵をあなたのPCの中のどこに保存しますか。」という意味です。

通常は何も入力しないで、そのまま[Enter]キーを押します。

![](/img/ssh_keys/windows/ssh_win_18.png)

すると、以下の画面のように、２行表示されます。

![](/img/ssh_keys/windows/ssh_win_19.png)

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


パスフレーズを入力して、[Enter]キーを押します。

&#x2757; パスフレーズを入力しても、画面は以下の状態のまま何も変化しません。入力している最中も、以下の画面のまま何も変化しませんが、気にせずそのまま入力していきます。入力が終わったら、[Enter]キーを押します。

![](/img/ssh_keys/windows/ssh_win_20.png)

すると、以下の画面のように表示されます。

![](/img/ssh_keys/windows/ssh_win_21.png)

`Enter same passphrase again: `というメッセージが表示されます。上記で入力したパスフレーズと同じパスフレーズを入力して、[Enter]キーを押します。

&#x2757; パスフレーズを入力しても、画面は以下の状態のまま何も変化しません。入力している最中も、以下の画面のまま何も変化しませんが、気にせずそのまま入力していきます。入力が終わったら、[Enter]キーを押します。

![](/img/ssh_keys/windows/ssh_win_22.png)

すると、以下の画面のように表示されます。

![](/img/ssh_keys/windows/ssh_win_23.png)


#### &#x2666;**作ったSSH公開鍵と秘密鍵の存在を確認する**

C:\Users\your_username/.sshというフォルダの中に、SSH公開鍵と秘密鍵が本当に作られているかどうか確認していきます。

![](/img/ssh_keys/windows/ssh_win_24.png)

まず、.sshというフォルダが本当にできているかを確認するために、以下のコマンドを入力して、[Enter]キーを押します。

```
Get-ChildItem -Directory C:\Users\your_username
```

![](/img/ssh_keys/windows/ssh_win_25.png)

すると、以下の画面のように表示され、C:\Users\your_usernameのフォルダの中に、.sshという名前のフォルダが存在していることが確認できます。

![](/img/ssh_keys/windows/ssh_win_26.png)

次に、.sshというフォルダの中に移動して、SSH公開鍵と秘密鍵が本当に作られているかどうか確認していきます。

.sshの中に移動するために、以下のコマンドを入力して、[Enter]キーを押します。

```
Set-Location C:\Users\your_username\.ssh
```

続けて、SSH公開鍵と秘密鍵が本当に作られているかどうか確認するために、以下のコマンドを入力して、[Enter]キーを押します。

```
Get-ChildItem
```

![](/img/ssh_keys/windows/ssh_win_27.png)

すると、以下の画面のように表示され、SSH公開鍵と秘密鍵が本当に作られていることが確認できます。

![](/img/ssh_keys/windows/ssh_win_28.png)


#### &#x2666;**作ったSSH公開鍵を確認する**

以下のコマンドを打ち込んで、[Enter]キーを押して、作ったSSH公開鍵の中身を確認します。

```
cat .\id_rsa.pub
```

![](/img/ssh_keys/windows/ssh_win_29.png)

すると、以下の画面のように、作ったSSH公開鍵の中身が表示されます。文字列で書かれているのがわかります。

![](/img/ssh_keys/windows/ssh_win_30.png)


## ②遺伝研スパコンにSSH公開鍵を登録する

![](/img/ssh_keys/windows/ssh_win_31.png)

作ったSSH公開鍵の中身が表示されたら、表示された中身を全て選択してコピーします。

範囲を選択してコピーする方法：先頭文字列「ssh-rsa」の先頭文字「s」のすぐ左でマウスを左クリックし、そのまま末尾(ここでは、「your_username@LAPTOP-USERS」の「S」(大文字のエス))までドラックします。ドラッグすると、以下の画面のように、選択された文字列に灰色にハイライトがかかった状態になります。そうしたら一度マウスから手を離します。次に、灰色にハイライトがかかった文字列の上で、マウスを右クリックします。右クリックすると、ハイライトが消えます。そうなりましたら、コピーは完了です。右クリックする場所は、灰色にハイライトがかかった部分であれば、どこでも良いです。Ctl + Cをしてもコピーはされませんので、ご注意ください。

![](/img/ssh_keys/windows/ssh_win_32.png)

<a href="https://sc-account.ddbj.nig.ac.jp/application/registration">新規利用申請のページ</a>の「アカウント」のページにある「SSH鍵」の枠の中をクリックし、Ctl + Vをして、貼り付けます。

![](/img/ssh_keys/windows/ssh_win_33.png)

貼り付けたら、「次へ」ボタンを押して、[利用登録申請フォームへの入力を続けます](/application/registration#利用申請)。

![](/img/ssh_keys/windows/ssh_win_34.png)

[「利用申請・変更」のページの「利用申請」で、以下の画面のように、"利用申請登録完了"の画面が表示されると、SSH公開鍵の登録が完了します](/application/registration#利用申請)。

![](/img/ssh_keys/windows/ssh_win_35.png)


## 参考文献

- <a href="https://learn.microsoft.com/ja-jp/windows-server/administration/openssh/openssh_install_firstuse?source=recommendations">OpenSSHのインストール方法</a>
