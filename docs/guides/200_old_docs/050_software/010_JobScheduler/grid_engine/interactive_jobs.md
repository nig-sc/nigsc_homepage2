---
id: interactive_jobs
title: インタラクティブジョブ
---

:::danger これは古いドキュメントです

本ドキュメントは旧遺伝研スパコン(2019)のドキュメントであり、参考のため残しているものです。

現行遺伝研スパコン(2025)ではこのとおりには動作しませんのでご注意ください。
:::


ゲートウェイノード上で`qlogin`コマンドを実行すると、空いているインタラクティブノードが割り当てられます。


```
$ ssh gw.ddbj.nig.ac.jp
Enter passphrase for key '/home/your_account/.ssh/id_rsa': 
Last login: Sat Apr  9 16:53:55 2022 from XXX.XXX.XXX.XXX
---------------------------------------------------------------------
Thank you for using NIG supercomputer system.
This is the gateway node, do not run program here.
Please use 'qlogin' to login to a interactive node.
---------------------------------------------------------------------

$ qlogin -l s_vmem=16G -l mem_req=16G
Your job 15193768 ("QLOGIN") has been submitted
waiting for interactive job to be scheduled ...
Your interactive job 15193768 has been successfully scheduled.
Establishing /home/geadmin/UGER/utilbin/lx-amd64/qlogin_wrapper session to host at137 ...

$
```

この例では at137 というインタラクティブノードがユーザに割り当てられ、最後に at137 のプロンプトが表示されています。
このプロンプトから対話的にコマンドを実行できます。

- `qlogin`コマンドに`-l s_vmem`, `-l mem_req`オプションをつけると、利用可能なメモリ量を指定できます。（一般解析区画の場合、オプション無指定の場合は 4GB のメモリが割り当てられます。個人ゲノム解析区画の場合は利用する構成に依存します。）
- インタラクティブノード上で指定可能なメモリ用の上限は 96GB を目安としています。これ以上のメモリ量を必要とする場合は、qsubコマンドを用いて計算ノードでバッチジョブを実行するか、![](sc-helpdesk.png) にお問い合わせください。また、インタラクティブノードの混雑状況により、メモリの節約をお願いする場合があります。



