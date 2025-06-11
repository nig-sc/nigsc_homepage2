---
id: pg_application
title: "利用の準備（個人ゲノム解析区画）"
---



## ユーザーの計算機の用意  {#prepare-users-computer}

遺伝研スパコン個人ゲノム解析区画は（一般解析区画と同様）SSH クライアントおよび Web ブラウザが動作する計算機があれば利用できます。 16 GB 以上のメインメモリを持った Windows, Mac, Linux の計算機を推奨します。

- Mac, Linux については、標準のターミナルエミュレータを使ってアクセス利用可能です。
- Windows については、PowerShell の SSH クライアントまたは Windows Subsystem for Linux version 2(WSL2) 等により、アクセス可能です。



## アカウントの新規利用から利用開始までの流れ {#starting-to-use}

個人ゲノム解析区画のアカウント名は、一般解析区画のアカウント名の末尾に`-pg`を付加したものになります。
個人ゲノム解析環境のみを利用する場合でも一般解析区画のアカウントが付与されます。
アカウントの新規利用から利用開始までの流れは[一般解析区画と共通](/guides/using_general_analysis_division/ga_application/#steps-from-application-to-start)となります。
個人ゲノム解析区画は[課金サービス](/application/billing_services)ですので、[利用計画表をダウンロード](/application/resource_extension)し、記入の上、ご提出ください。


1. [アカウントの新規登録手順](/application/registration)に沿って、[アカウント登録システムのフォーム](/blog/2024-10-25-account_system_maintenance)　<!-- (https://sc-account.ddbj.nig.ac.jp/application/registration) -->から申請登録をしてください。
    - 事前に[「ユーザーアカウント発行基準」](/application/terms_and_policies/user_account_issurance_criteria/)及び「利用規程」をご確認ください。
        - [スパコン(2025)利用規程](/application/terms_and_policies/terms_of_use_2025/)
    - メールアドレスは、フリーメールアドレスではなく、所属機関のメールアドレスをご入力ください。(特別な場合を除く)
    - 事前に SSH 公開鍵を作成してください。登録フォームの中で、SSH 公開鍵の登録を行う箇所があります。SSH 公開鍵の作成・登録などは、[SSH 公開鍵の登録](/application/ssh_keys)をご参照ください。
    - 遺伝研スパコンではアカウントの新規登録時に外為法の定める国内居住者でありかつ大学あるいは国公立研究機関の教員を責任者として指名する必要があります。責任者のアカウント毎に UNIX グループが作られます。
2. ご本人様確認のため、[責任者](/application/terms_and_policies/user_account_issurance_criteria/#the-responsible-persons-responsibilities)にメールが送信されます。[「署名の手順」の順番に沿って](/application/agreement_signing)、誓約書 PDF をご返信ください。
    - 受付後、数日程度でメールを送信いたします。
3. アカウント登録証の到着をお待ちください。
    - 受付後、 1 週間程度で発送いたします。
    - 外為法関係など機構にて審査が必要な場合はもう少し時間がかかります。
4. アカウント登録証で初期パスワードを確認し、利用を開始してください。
    - 利用方法については、[ログイン方法(個人ゲノム解析区画)](/guides/using_personal_genome_division/pg_login)以降のページをご参照ください。
5. 利用リソースの拡張や[課金サービスの利用](/application/billing_services)を希望する場合は[利用計画表をダウンロード](/application/resource_extension)し、記入の上ご提出ください
    - 提出先は[問い合わせ先](/application/reference)をご参照ください。



