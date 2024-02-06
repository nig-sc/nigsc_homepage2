---
id: ssh_keys_register_win
title: 遺伝研スパコンへのSSH公開鍵の登録・変更方法 (Windowsの場合)
---

このページでは、Windowsのための、SSH公開鍵の登録方法について詳しい手順を説明しています。

Windowsに標準搭載されているPowerShellを例に、ご説明します。

![](/img/ssh_keys/windows/ssh_win_1.png)



作ったSSH公開鍵の中身が表示されたら、表示された中身を全て選択してコピーします。

範囲を選択してコピーする方法：先頭文字列「ssh-rsa」の先頭文字「s」のすぐ左でマウスを左クリックし、そのまま末尾(ここでは、「your_username@LAPTOP-USERS」の「S」(大文字のエス))までドラックします。ドラッグすると、以下の画面のように、選択された文字列に灰色にハイライトがかかった状態になります。そうしたら一度マウスから手を離します。次に、灰色にハイライトがかかった文字列の上で、マウスを右クリックします。右クリックすると、ハイライトが消えます。そうなりましたら、コピーは完了です。右クリックする場所は、灰色にハイライトがかかった部分であれば、どこでも良いです。Ctl + Cをしてもコピーはされませんので、ご注意ください。

![](/img/ssh_keys/windows/ssh_win_32.png)

<a href="https://sc-account.ddbj.nig.ac.jp/application/registration">アカウント登録システム</a>の「アカウント」のページにある「SSH公開鍵」の枠の中をクリックし、Ctl + Vをして、貼り付けます。

![](/img/ssh_keys/windows/ssh_win_33.png)

貼り付けたら、「次へ」ボタンを押して、[アカウント申請システムの申請フォームへの入力を続けます](/application/registration)。

![](/img/ssh_keys/windows/ssh_win_34.png)

[「アカウントの新規登録」のページで、以下の画面のように、"利用申請登録完了"の画面が表示されると、SSH公開鍵の登録が完了します](/application/registration)。

![](/img/ssh_keys/windows/ssh_win_35.png)

&#x26A0; アカウントをお持ちの方は、[<u>申請内容の変更</u>](/application/change_account_info)のページから登録してください。

![](reg_ssh_JP.png)