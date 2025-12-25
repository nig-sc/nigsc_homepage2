---
id: interactive_jobs
title: インタラクティブジョブ
---

インタラクティブジョブが必要な場合とは、例えば、計算ノード上で、大量のメモリ、CPUを利用した計算もするがその結果をリアルタイムに確認したい
以下のような処理が必要になる場合です。

- デバッグ・テストなど
  - プログラムやスクリプトのデバッグ作業
  - パラメータやコード変更を即時評価したいような作業
- データ分析や探索などの作業
  - リアルタイムでのデータ探索と可視化
- ソフトウェアのインストールと構成
  - カスタムソフトウェアやライブラリの対話的なインストール作業

上記のような処理が必要になる場合で、ジョブ管理システムのインタラクティブジョブ機能が利用したい場合は、個人ゲノム解析区画の利用申請の際に、
計算ノード構成と合わせてインタラクティブ（ログイン）ノードとSlurmのインタラクティブジョブ用パーティションの構成を合わせて指定してください。

Slurmでは、ジョブを対話的(interactive)に処理するジョブ実行形式をサポートしています。この場合に利用するコマンドはsrunコマンドです。srunで
qloginコマンドのように要求したリソース条件を満たしたインタラクティブノードにログインする。という動作を実行させたい場合、例えば以下のように
--ptyオプションを使用します。

```
srun --pty bash
```
srunコマンドのオプション詳細については、オンラインマニュアルを参照してください。
- [srunコマンドのオンラインマニュアル](https://slurm.schedmd.com/srun.html)


srun --pty bash はリソース条件に合致したノード上でbashを起動して疑似端末に結び付けるということを意味します。

例えば、割り当てられた個人ゲノム解析区画のインタラクティブノードから計算ノードの一つにslurm経由でログインしたい場合は以下のようにします。

```
yxxxx-pg@at022vm02:~$ hostname
at022vm02
yxxxx-pg@at022vm02:~$ squeue
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
yxxxx-pg@at022vm02:~$ srun --pty bash
yxxxx-pg@igt010:~$ hostname
igt010
yxxxx-pg@igt010:~$ squeue
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
               757 parabrick     bash yxxxx-pg  R       0:46      1 igt010

```
上記の例ではログイン後のsqueueコマンドの出力に、srunで発行したbashがジョブとして見えており、parabrickパーティションに割り当てられた計算ノードの一つであるigt010にログインしていることがわかります。

インタラクティブノードで、srunコマンドを投入する際、何度もオプションを指定したくない場合、sallocコマンドで計算リソースを確保しておけば、その後のsrunコマンドではオプションを指定する必要はありません。sallocは指定したオプションでリソースを割り当て要求します。その際割当てだけが実施され、ジョブは実行されません。その割り当てられたリソースをsrunで利用してジョブが実行されるという形式になります。

```
yxxxx-pg@at022vm02:~$ salloc --mem=50g
salloc: Granted job allocation 765
yxxxx-pg@at022vm02:~$ squeue
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
               765 parabrick interact yxxxx-pg  R       0:02      1 igt010
yxxxx-pg@at022vm02:~$ srun hostname
igt010
yxxxx-pg@at022vm02:~$ srun hostname
igt010
yxxxx-pg@at022vm02:~$ env |grep SLURM_MEM_PER_NODE
SLURM_MEM_PER_NODE=51200
yxxxx-pg@at022vm02:~$ exit
exit
salloc: Relinquishing job allocation 765
yxxxx-pg@at022vm02:~$ 

```
上記の実行例では、sallocによってigt010上にリソースが割り当てられ、srunでジョブが実行される。ということになります。SLURM_MEM_PER_NODEで参照すると、50GBのメモリが割り当てられていることがわかります。


## 各種ジョブ実行時のオプションの指定の仕方について {#specify_options_for_jobs}

各種ジョブをsrunコマンドで実行する場合の、オプションの指定の仕方はバッチジョブ実行方法で説明した指示行の記載方法と同じです。詳しくはそちらの解説を参照してください。



