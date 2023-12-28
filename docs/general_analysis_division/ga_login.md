---
id: ga_login
title: "ログイン方法(一般解析区画)"
---

[<u>ログインするためには、アカウントの新規登録が必要です。</u>](/application/registration)

<details>
<summary>
アカウントの新規登録の流れは、以下のようになります。</summary>

<p>

[<u>手順の詳細は、ここをクリックして「アカウントの新規登録」をご参照ください。</u>](/application/registration)


**1. [SSH公開鍵・秘密鍵の生成](/application/ssh_keys#1-%E5%85%AC%E9%96%8B%E9%8D%B5%E7%A7%98%E5%AF%86%E9%8D%B5%E3%81%AE%E7%94%9F%E6%88%90)**

**2. [アカウントの新規登録](/application/registration)**

以下の情報を登録します。
 - 申請者情報
 - 所属機関の住所
 - 1．で生成したSSH公開鍵
 - 責任者情報

**3. アカウントの新規登録完了**

アカウントの新規登録が完了すると、[<u>誓約書への署名を依頼するメールが届きますので、署名します。</u>](/application/signing_PDF)


署名が受理されると、郵送によりアカウント登録証がお手元に届き、ログインできるようになります。

ログイン方法は以下をご参照ください。

- [遺伝研スパコンへのログイン方法](/general_analysis_division/ga_login#%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3%E3%81%AE%E6%89%8B%E9%A0%86)
- [申請登録フォームのマイページへのログイン方法](/application/registration#%E7%94%B3%E8%AB%8B%E5%86%85%E5%AE%B9%E3%81%AE%E5%A4%89%E6%9B%B4)

</p>
</details>


## 概要

遺伝研スパコンの一般解析区画へのログインにはssh接続を用います。

![](pg_login_1.png)


## ゲートウェイノードは ２つあります

遺伝研スパコンの一般解析区画のゲートウェイノードは、以下の2つがあります。

- `gw.ddbj.nig.ac.jp`
- `gw2.ddbj.nig.ac.jp`


## ログインの手順


1, ターミナルエミュレータを開き、`ssh アカウント名@ゲートウェイノード名` を入力し、enter を押下します。
（Windows PowerShell の SSH クライアントの場合も同じです。）

```
$ ssh youraccount@gw.ddbj.nig.ac.jp
```

または

```
$ ssh youraccount@gw2.ddbj.nig.ac.jp
```

秘密鍵の格納場所が`~/.ssh/id_rsa`以外の場合は以下のように秘密鍵のパスを指定します。

```
ssh -i ~/yourpath/id_rsa youraccount@gw.ddbj.nig.ac.jp
```

2, "Enter passphrase for key ..."のプロンプトに対し、SSH 鍵ペアのパスフレーズを入力し、enter を押下します。

※ 鍵のパスフレーズ入力後に以下のメッセージが出力された場合は、yes を入力してください。
```
Are you sure you want to continue connecting (yes/no)?
```


3, `qlogin` コマンドを実行し、ログインノードにログインします。

```
$ qlogin
```

パスワード入力後に以下のメッセージが出力された場合は、yes を入力してください。
```
Are you sure you want to continue connecting (yes/no)?
```



### 実行例

以下のように表示されれば成功です。

```
$ ssh youraccount@gw.ddbj.nig.ac.jp
Enter passphrase for key '/home/youraccount/.ssh/id_rsa': 
Last login: Sun Sep 26 15:03:33 2021 from XXX.XXX.XXX.XXX
---------------------------------------------------------------------
Thank you for using NIG supercomputer system.
This is the gateway node, do not run program here.
Please use 'qlogin' to login to a login node.
---------------------------------------------------------------------
$ qlogin
Your job 13867668 ("QLOGIN") has been submitted
waiting for interactive job to be scheduled ...
Your interactive job 13867668 has been successfully scheduled.
Establishing /home/geadmin/UGER/utilbin/lx-amd64/qlogin_wrapper session to host at138 ...
Last login: Sun Sep 26 15:29:09 2021 from gw1
$ 
```

うまく行かない場合は、[よくある質問(FAQ)](/faq/faq_login_general)を参照してください。



## 利用可能メモリに関する注意


ログインノードで利用可能なメモリはデフォルトでは 4GB です。
これを増やすには以下のように`qlogin`時にメモリ量を指定してください。

```
qlogin -l s_vmem=10G -l mem_req=10G
```

### 参考

- [Java の使い方](/software/java) > 注意事項 Java プログラムを起動するとメモリが足りないとのエラーが出る
- [Singularity の使い方](/software/Apptainer/) > [スパコン上でのイメージのビルド : Docker コンテナイメージから Singularity イメージを生成する](/software/Apptainer/#スパコン上でのイメージのビルド--docker-コンテナイメージから-apptainer-sigularity-イメージを生成する)




## GPU ノードの利用方法


GPU を用いたプログラムの開発や動作テストの目的で、GPU を搭載したログインノードを１台用意しています。
このログインノードを使うには、`-l gpu`オプションを付けて`qlogin`してください。


```
qlogin -l gpu
```


