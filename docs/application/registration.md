---
id: registration
title: "利用申請・変更"
---

&#x26A0;SSH公開鍵の登録をしないまま利用申請を完了してしまった場合は、[<u>FAQ : 利用申請等 > 利用申請</u>](/faq/faq_NewUser_registration#%F0%9F%86%80-%E5%88%A9%E7%94%A8%E7%94%B3%E8%AB%8B%E3%81%AE%E3%81%A8%E3%81%8D%E3%81%ABssh%E5%85%AC%E9%96%8B%E9%8D%B5%E3%81%AE%E7%99%BB%E9%8C%B2%E3%82%92%E3%81%97%E3%81%AA%E3%81%84%E3%81%BE%E3%81%BE%E5%88%A9%E7%94%A8%E7%94%B3%E8%AB%8B%E3%82%92%E5%AE%8C%E4%BA%86%E3%81%97%E3%81%A6%E3%81%97%E3%81%BE%E3%81%84%E3%81%BE%E3%81%97%E3%81%9Fssh%E5%85%AC%E9%96%8B%E9%8D%B5%E3%82%92%E7%99%BB%E9%8C%B2%E3%81%97%E3%81%9F%E3%81%84%E3%81%AE%E3%81%A7%E3%81%99%E3%81%8C%E3%81%A9%E3%81%86%E3%81%97%E3%81%9F%E3%82%89%E3%82%88%E3%81%84%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%81%8B)をご参照ください。


## 利用申請

[&#x1f517;<u>利用申請は利用登録申請のページから</u>](https://sc-account.ddbj.nig.ac.jp/application/registration)随時受け付けています。

- 利用申請が受理されると高速ストレージ 1TB が利用可能となります。
- 利用可能なストレージ領域を拡張したい場合や課金サービスを利用したい場合は、利用申請が受理されたあとで[<u>利用計画表を提出</u>](/application/resource_extension)してください。
  - &#x26A0;現在、個人ゲノム解析区画および一般解析区画大規模ユーザの新規利用申請の受付を停止しております。詳細は[<u>こちらのお知らせをご参照ください</u>](/blog/2022-05-13-suspension-of-applications)。


### 利用申請の手順

<table>
<tr>
<td width="400" valign="top">

![](Registration_JP_0.png)

</td>
<td width="400" valign="top">

<font size="5">まず、SSH公開鍵を生成します。</font><br/>

次のステップで利用登録申請する際に、SSH公開鍵の登録も一緒に行います。このため、事前に生成しておきます。<br/>
生成方法は、以下をご参照ください。

1. [<u>Windowsの場合</u>](/application/ssh_keys_ssh-keygen_win)
2. [<u>Macの場合</u>](/application/ssh_keys_ssh-keygen_mac)
3. [<u>Linuxの場合</u>](/application/ssh_keys_ssh-keygen_linux)

</td>
</tr>


<tr>
<td width="400" valign="top">

![](Registration_JP_1.png)

</td>
<td width="400" valign="top">

<font size="5">次に、<a href="https://sc-account.ddbj.nig.ac.jp/application/registration">&#x1f517;<u>利用登録申請のページ</u></a>にアクセスします。</font><br/>

アクセスすると左図のような画面が表示されますので、利用申請フォームに入力し、「次へ」をクリックします。

- メールアドレスは誤送信対策のためフリーメールではなく所属機関のメールアドレスを記載してください。
- 利用目的は正確に記載してください。ここで記載した利用目的以外でのスパコンの利用は禁止しています。
- 間違ったメールアドレスを入力した場合、誤送信により申請情報が漏洩する可能性がありますが、責任を負いかねますので、お気を付けください。
- JGA や AGD のアカウントをすでにお持ちの場合は「JGAアカウント」や「AGDアカウント」に入力してください。
持っていない場合は何も入力しないでください。

</td>
</tr>


<tr>
<td>

![](Registration_JP_2.png)

</td>
<td>

<font size="5">次に、所属機関の住所を記入し、「次へ」をクリックします。</font><br/>

本人確認のために、記入した所属機関の住所に郵送でアカウント証をお送りします。

</td>
</tr>

<tr>
<td>

![](Registration_JP_3.png)

</td>
<td>

<font size="5">次に、一番最初に生成したSSH公開鍵を、利用登録申請フォームにコピー&ペーストして登録します。</font><br/>

コピー&ペーストして登録する方法は、以下をご参照ください。<br/>
1. [<u>Windowsの場合</u>](/application/ssh_keys_register_win)
2. [<u>Macの場合</u>](/application/ssh_keys_register_mac)
3. [<u>Linuxの場合</u>](/application/ssh_keys_register_linux)


- 個人ゲノム解析区画を利用したい場合は、一番下のチェックボックスにチェックを入れてください。

</td>
</tr>

<tr>
<td>

![](Registration_JP_4.png)

</td>
<td>

<font size="5">責任者の情報を入力し、「次へ」をクリックします。</font><br/>

セキュリティー上のトレーサビリティーの観点から利用申請に際して責任者を指定していただいております。
[<u>責任者の指定方法の詳細についてはこちらのページ</u>](/application/#責任者について)を参照してください。<br/>


</td>
</tr>



<tr>
<td>

![](Registration_JP_5.png)

</td>
<td>
<font size="5">利用申請が完了します。</font><br/>

左図のように利用登録申請完了の画面が表示され、利用申請が完了となります。
<br/>

利用申請が完了すると、通常一週間以内に DDBJ から申請者本人と責任者宛てにメールが届きます。
<br/>

詳細は、以下のリンクから、「ユーザーアカウント申請から利用開始までの流れ」をご参照ください。
<ul>
  <li><a href="https://sc.ddbj.nig.ac.jp/general_analysis_division/ga_application#%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%82%A2%E3%82%AB%E3%82%A6%E3%83%B3%E3%83%88%E7%94%B3%E8%AB%8B%E3%81%8B%E3%82%89%E5%88%A9%E7%94%A8%E9%96%8B%E5%A7%8B%E3%81%BE%E3%81%A7%E3%81%AE%E6%B5%81%E3%82%8C"><u>一般解析区画</u></a></li>
  <li><a href="https://sc.ddbj.nig.ac.jp/personal_genome_division/pg_application#%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%82%A2%E3%82%AB%E3%82%A6%E3%83%B3%E3%83%88%E7%94%B3%E8%AB%8B%E3%81%8B%E3%82%89%E5%88%A9%E7%94%A8%E9%96%8B%E5%A7%8B%E3%81%BE%E3%81%A7%E3%81%AE%E6%B5%81%E3%82%8C"><u>個人ゲノム解析区画</u></a></li>
</ul>

</td>
</tr>

</table>




## 申請内容の変更


所属などが変更になった場合は速やかに[&#x1f517;<u>ログインページから申請内容の変更</u>](https://sc-account.ddbj.nig.ac.jp/login)をお願いいたします。


<table>
<tr>
<td width="400" valign="top">

![](Change_login.png)

</td>
<td width="400" valign="top">

<font size="5">まず、ユーザアカウントのページにログインします。</font><br/>

以下のURLをクリックして、ユーザアカウントのページにアクセスします。アクセスすると、左図のように、ページへのログイン画面が表示されます。<br/>

アカウント名とパスワードを入力して、「Sign In」をクリックします。そうすると、ログインできます。<br/>

&#x1f517;<u>https://sc-account.ddbj.nig.ac.jp/login</u>

</td>
</tr>


<tr>
<td width="400" valign="top">

![](Keycload.png)

</td>
<td width="400" valign="top">

「Sign In」をクリックしたときに、もし、左図の画面が表示された場合は、「Sing in with Keycloak」をクリックします。<br/>

クリックすると、ログインできます。<br/>

左図の画面が表示されることなく、ユーザアカウントのページにログインできた場合は、読み飛ばしてください。

</td>
</tr>


<tr>
<td>

![](Change_App_JP.png)

</td>
<td>
<font size="5">申請内容を変更します。</font><br/>
ログインすると、左図のようにユーザアカウントのページが表示されます。<br/>

左メニューから、所属、SSH 公開鍵、パスワードなどの変更やアカウントの利用終了の申請などができます。


</td>
</tr>
</table>



