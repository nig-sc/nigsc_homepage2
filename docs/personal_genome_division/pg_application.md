---
id: pg_application
title: "利用の準備（個人ゲノム解析区画）"
---

## ユーザーの計算機の用意

遺伝研スパコン個人ゲノム解析区画は（一般解析区画と同様）SSHクライアントおよびWebブラウザが動作する計算機があれば利用できます。 16GB以上のメインメモリを持ったWindows, Mac, Linuxの計算機を推奨します。

- Mac, Linuxについては標準のターミナルエミュレータを使ってアクセス利用可能です。
- WindowsについてはPowerShellのSSHクライアントまたはWindows Subsystem for Linux version 2(WSL2)等によりアクセス可能です。



## ユーザーアカウント申請から利用開始までの流れ

個人ゲノム解析区画のアカウント名は、一般解析区画のアカウント名の末尾に`-pg`を付加したものになります。
個人ゲノム解析環境のみを利用する場合でも一般解析区画のアカウントが付与されます。
ユーザーアカウント申請から利用開始までの流れは[一般解析区画と共通](/general_analysis_division/ga_application#ユーザーアカウント申請から利用開始までの流れ)となります。
個人ゲノム解析区画は[課金サービス](../application/billing_service.md)ですので、[利用計画表をダウンロード](../application/resource_extension.md)し、記入の上、ご提出ください。


<ol>
<li><a href="https://sc.ddbj.nig.ac.jp/application/registration"><u>利用申請の手順</u></a>に沿って、<a href="https://sc-account.ddbj.nig.ac.jp/application/registration">&#x1f517;<u>利用申請フォーム</u></a>から申請登録をしてください。</li>
    <ul>
    <li>事前に「<a href="https://sc.ddbj.nig.ac.jp/application/"><u>ユーザーアカウント発行基準</u></a>」及び「<a href="https://sc.ddbj.nig.ac.jp/application/use_policy"><u>利用規程</u></a>」をご確認ください。</li>
    <li>メールアドレスは、フリーメールアドレスではなく、所属機関のメールアドレスをご入力ください。(特別な場合を除く)</li>
    <li>事前にSSH公開鍵を作成してください。登録フォームの中で、SSH公開鍵の登録を行う箇所があります。SSH公開鍵の作成・登録などは<a href="https://sc.ddbj.nig.ac.jp/application/ssh_keys"><u>SSH公開鍵の登録</u></a>をご参照ください。</li>
    <li>遺伝研スパコンでは利用申請時に外為法の定める国内居住者でありかつ大学あるいは国公立研究機関の教員を責任者として指名する必要があります。責任者のアカウント毎にUNIXグループが作られます。</li>
    </ul>
<li>ご本人様確認のため、<a href="https://sc.ddbj.nig.ac.jp/application/#%E8%B2%AC%E4%BB%BB%E8%80%85%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6"><u>責任者</u></a>にメールが送信されます。<a href="https://sc.ddbj.nig.ac.jp/application/signing_PDF"><u>「署名の手順」の順番に沿って</u></a>、誓約書PDFをご返信ください。</li>
    <ul>
    <li>受付後、数日程度でメールを送信いたします。</li>
    </ul>
<li>アカウント登録証の到着をお待ちください。</li>
    <ul>
    <li>受付後、 1週間程度で発送いたします。</li>
    <li>外為法関係など機構にて審査が必要な場合はもう少し時間がかかります。</li>
    </ul>
<li>アカウント登録証で初期パスワードを確認し、利用を開始してください。</li>
    <ul>
    <li>利用方法については、<a href="https://sc.ddbj.nig.ac.jp/personal_genome_division/pg_login"><u>ログイン方法(個人ゲノム解析区画)</u></a>以降のページをご参照ください。</li>
    </ul>
<li>利用リソースの拡張や<a href="https://sc.ddbj.nig.ac.jp/application/billing_service"><u>課金サービスの利用</u></a>を希望する場合は<a href="https://sc.ddbj.nig.ac.jp/application/resource_extension"><u>利用計画表をダウンロード</u></a>し、記入の上ご提出ください。</li>
    <ul>
    <li>提出先は<a href="https://sc.ddbj.nig.ac.jp/application/reference"><u>問い合わせ先</u></a>をご参照ください。</li>
    </ul>
</ol>

### 環境設定に関する追記事項

個人ゲノム解析区画の利用にあたっては、以下についてご希望をご記入ください。

- 利用を希望する計算ノードの種類と台数。
    - 計算ノードの種類については [システム構成 > ハードウェア](../guides/hardware.md)をご参照ください。
    - 基本的にThin計算ノードに限ります。Medium, Fatが必要な場合はお問い合わせください。
- ジョブスケジューラのインストールを希望する場合はGrid Engine、Slurmのどちらをインストールするか。
    - 利用方法については[システム構成 > ソフトウェア](../software/software.md)をご参照ください。
- NVIDIA Parabricksの利用を希望する場合はその旨お知らせください。



## 団体での利用申請について

講習会やコンソーシアムでの利用など、多数のユーザーの登録をご希望の場合は以下の手順に従ってください。

1. 責任者に該当する方がまだ遺伝研スパコンのアカウントをお持ちでない場合、上記の手順に従いアカウントを取得してください。
2. [利用計画表をダウンロード](../application/resource_extension.md)し、そこにユーザーの情報をまとめて書いて提出してください。（その際に利用目的、利用するリソース量についてもご記載ください。）
