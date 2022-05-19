---
id: ga_login
title: "ログイン方法(一般解析区画)"
---


ユーザーのアカウント登録後、まず最初に必ず[SSH 公開鍵の登録](/application/ssh_keys)を行ってください。


## ログインの手順


1, ターミナルエミュレータを開き、`ssh ユーザ名@ゲートウェイノード名` を入力し、enter を押下します。
（Windows PowerShell の SSH クライアントの場合も同じです。）

```
$ ssh youraccount@gw.ddbj.nig.ac.jp
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

うまく行かない場合は、[よくある質問(FAQ)](/faq/faq_login)を参照してください。



## 利用可能メモリに関する注意


ログインノードで利用可能なメモリはデフォルトでは 4GB です。
これを増やすには以下のように`qlogin`時にメモリ量を指定してください。

```
qlogin -l s_vmem=10G -l mem_req=10G
```

### 参考

- [Java の使い方](/software/java) > 注意事項 Java プログラムを起動するとメモリが足りないとのエラーが出る
- [Singularity の使い方](/software/Singularity) > スパコン上でのイメージのビルド : Docker コンテナイメージから Singularity イメージを生成する




## GPU ノードの利用方法


GPU を用いたプログラムの開発や動作テストの目的で、GPU を搭載したログインノードを１台用意しています。
このログインノードを使うには、`-l gpu`オプションを付けて`qlogin`してください。


```
qlogin -l gpu
```


