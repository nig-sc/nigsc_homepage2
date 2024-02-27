---
id: other_commands
title: その他のコマンド
---

## GPUの使い方

個人ゲノム解析区画では、GPU計算ノードはノード単位で占有してジョブを割り当てる運用としています。ノード内のGPUを分割して利用する環境設定はしていません。このため、GPUを利用するジョブの投入時には、GPU利用をオプションで明示的に指定する必要はありません。


## ジョブの実行状態の確認(squeue)

### ジョブの投入状況の確認

squeueコマンドを利用してジョブの実行状態を確認することができます。オプションの詳細については[オンラインマニュアル](https://slurm.schedmd.com/squeue.html#SECTION_OPTIONS)を参照してください。

実行例

```
xxxxx-pg@at022vm02:~$ squeue
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
               751 parabrick  test.sh xxxxx-pg  R       0:02      3 igt[010,015-016]
               750 parabrick  test.sh xxxxx-pg  R       0:05      3 igt[010,015-016]
               749 parabrick  test.sh xxxxx-pg  R       0:09      3 igt[010,015-016]
               748 parabrick  test.sh xxxxx-pg  R       0:13      3 igt[010,015-016]

```

squeueでデフォルトで表示される項目は以下のようになります


|項目名|説明|
|-------|----|
|JOBID|ジョブに割り当てられたジョブIDが表示されます。|
|PARTITION | ジョブが投入されたパーティション(キュー)名を表示します。|
|NAME|ジョブ名（未指定の場合はコマンド文字列）を表示します。|
|USER |ジョブを投入したユーザ名が表示されます。|
|ST|ジョブの状態を表示します。主なジョブの状態を以下の表に示します。|
|TIME|ジョブの実行時間（形式：days-hh:mm:ss）|
|NODES|ジョブ実行に使用されるノード数 |
|NODELIST(REASON)|ジョブが実行されるホスト名のリスト|


#### ジョブの状態説明（STフィールド）

|状態の文字|説明|
|---|---|
|CA　(CANCELLED) | ジョブが明示的にユーザまたはシステム管理者によってキャンセルされました。|
|CD　(COMPLETED) |ジョブは、すべてのノード上のすべてのプロセスを終了しました。|
|CF　(CONFIGURING) |ジョブは、資源が割り当てられた後、資源が使える状態になるのを待っている状態です。|
|CG　(COMPLETING)|ジョブは、終了手続きの過程にあります。|
|F　(FAILED)|ジョブは、ゼロ以外の終了コードまたはその他の障害状態で終了しました。|
|NF　(NODE_FAIL)|ジョブは、割り当てられたノードのいずれかの故障のために終了しました。|
|PD　(PENDING)|ジョブは、資源の割り当てを待っています。保留中です。|
|PR　(PREEMPTED)|ジョブが中断のために終了しました。|
|R　(RUNNING) |ジョブは、現在実行中です。|
|S　(SUSPENDED)|ジョブは、資源の割り当てを持っています（実行が中断されています）。|
|TO　(TIMEOUT) |ジョブは、その制限時間に達して終了しました。|

## ジョブの詳細情報確認(scontrol show job)

自分のジョブのより詳細な情報を確認したい場合は、squeueコマンドでジョブＩＤを確認した後に、scontrol show job により確認することができます。オプションの詳細については[オンラインマニュアル](https://slurm.schedmd.com/scontrol.html#SECTION_OPTIONS)を参照してください。

実行例

```
xxxxx-pg@at022vm02:~/$ scontrol show job 747
JobId=747 JobName=test
   UserId=xxxxx-pg(30257) GroupId=xxxxxx-pg(30063) MCS_label=N/A
   Priority=10102 Nice=0 Account=(null) QOS=normal
   JobState=RUNNING Reason=None Dependency=(null)
   Requeue=1 Restarts=0 BatchFlag=1 Reboot=0 ExitCode=0:0
   RunTime=00:00:12 TimeLimit=UNLIMITED TimeMin=N/A
   SubmitTime=2024-02-19T20:57:53 EligibleTime=2024-02-19T20:57:53
   AccrueTime=2024-02-19T20:57:53
   StartTime=2024-02-19T20:57:53 EndTime=Unknown Deadline=N/A
   SuspendTime=None SecsPreSuspend=0 LastSchedEval=2024-02-19T20:57:53 Scheduler=Main
   Partition=parabricks AllocNode:Sid=at022vm02:1768472
   ReqNodeList=(null) ExcNodeList=(null)
   NodeList=igt010
   BatchHost=igt010
   NumNodes=1 NumCPUs=4 NumTasks=1 CPUs/Task=1 ReqB:S:C:T=0:0:*:*
   TRES=cpu=4,mem=375G,node=1,billing=4
   Socks/Node=* NtasksPerN:B:S:C=0:0:*:* CoreSpec=*
   MinCPUsNode=4 MinMemoryNode=375G MinTmpDiskNode=0
   Features=(null) DelayBoot=00:00:00
   OverSubscribe=OK Contiguous=0 Licenses=(null) Network=(null)
   Command=./test.sh
   WorkDir=/lustre8/home/xxxxx-pg/parabricks
   StdErr=/lustre8/home/xxxxx-pg/parabricks/res.txt
   StdIn=/dev/null
   StdOut=/lustre8/home/xxxxx-pg/parabricks/res.txt
   Power=
   TresPerNode=gres:gpu:4
```

## クラスタ全体の混雑状況の確認方法(sinfo,squeue)

パーティションの状況確認には主にsinfo,パーティションに投入されたジョブの状況を参照するにはsqueueコマンドを利用してください。詳細についてはそれぞれのオンラインマニュアルを参照してください。

### sinfo -s (-sは要約表示)

ノードの状態で区別せずに、パーティションごとに要約して表示します。

```
yxxxx-pg@at022vm02:~/parabricks$ sinfo -s
PARTITION   AVAIL  TIMELIMIT   NODES(A/I/O/T) NODELIST
igt009         up   infinite          0/0/1/1 igt009
igt010         up   infinite          1/0/0/1 igt010
igt015         up   infinite          0/1/0/1 igt015
igt016         up   infinite          0/1/0/1 igt016
parabricks*    up   infinite          1/2/1/4 igt[009-010,015-016]
```
NODES欄の表示は以下の意味を持ちます。
- A (Allocated): 割り当てられている（使用中の）ノードの数です。
- I (Idle): アイドル（使用されていない）状態のノードの数です。使用可能なノードがここに分類されます。
- O (Other): その他の状態のノードの数です。このカテゴリには、ドレイン（メンテナンスのために使用不可）、ダウン（故障などで使用不可）、またはその他のSlurmが認識している特定の状態のノードが含まれます。
- T (Total): パーティション内のノードの総数です。これは、Allocated、Idle、およびOtherの状態にあるノードの合計です。

-sをつけずに要約しないと以下のようにノードの状態で分けて表示されます。
```
yxxxx-pg@at022vm02:~/parabricks$ sinfo
PARTITION   AVAIL  TIMELIMIT  NODES  STATE NODELIST
igt009         up   infinite      1  down* igt009
igt010         up   infinite      1    mix igt010
igt015         up   infinite      1   idle igt015
igt016         up   infinite      1   idle igt016
parabricks*    up   infinite      1  down* igt009
parabricks*    up   infinite      1    mix igt010
parabricks*    up   infinite      2   idle igt[015-016]

```
パーティションとしてはUPとして認識されているが、パーティションに含まれる計算ノードがダウンしている。などの状況が表示されます。STATEのmixは計算ノード上の全てのコアが使用中ではない状態を表します。

### showpartitions

より要約されたパーティション状態を表示したい場合は、Slurmの標準コマンドではなく、別の作者のオープンソースのコマンドですが、showpartitionsを利用してください。

```
yxxxx-pg@at022vm02:~/parabricks$ showpartitions 
Partition statistics for cluster linux at Thu Feb 22 10:45:21 AM JST 2024
        Partition     #Nodes     #CPU_cores  Cores_pending   Job_Nodes MaxJobTime Cores Mem/Node
        Name State Total  Idle  Total   Idle Resorc  Other   Min   Max  Day-hr:mn /node     (GB)
      igt009    up     1     0     48      0      0      0     1 infin   infinite    48     386 
      igt010    up     1     0     48     44      0      0     1 infin   infinite    48     386 
      igt015    up     1     1     48     48      0      0     1 infin   infinite    48     386 
      igt016    up     1     1     48     48      0      0     1 infin   infinite    48     386 
parabricks:*    up     4     2    192    140      0      0     1 infin   infinite    48     386 
Note: The cluster default partition name is indicated by :*
```
パーティションに所属しているノードの中で利用可能なノード数が、#Nodes欄のidleに表示されます。パーティション内で利用可能なCPUコア数が、#CPU_Cores欄のIdleに表示されます。これによりパーティションの利用状況をみてください。


### squeue

パーティションへのユーザのジョブの投入状況は、squeueコマンドで確認してください。現在の設定ではおなじSlurmシステムを使用しているユーザ間ではジョブの投入状況が互いに参照可能になっていますが、明示的にシステム上の全ユーザ、全パーティションのジョブ情報を表示したい場合は,-aオプションを指定して実行してください。

```
xxxxx-pg@at022vm02:~$ squeue
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
               646 parabrick  test.sh xxxxx-pg  R       0:02      3 igt[010,015-016]
               647 parabrick  test.sh xxxxx-pg  R       0:02      3 igt[010,015-016]
               645 parabrick  test.sh xxxxx-pg  R       0:05      3 igt[010,015-016]
               648 parabrick test_gpu    tkxxx  R       0:02      1 igt010
               644 parabrick test_gpu    tkxxx  R       0:12      1 igt010
```

### pestat

ジョブが投入された計算ノードの稼働状況を計算ノード観点で確認したい場合は、オープンソースのツールである、pestatを利用してください。ノード別に投入されたジョブリストと、ノード上で利用されているCPUコア数、空きメモリ量などが表示されます。
```
xxxx-pg@at022vm02:~/parabricks$ pestat 
Hostname       Partition     Node Num_CPU  CPUload  Memsize  Freemem  Joblist
                            State Use/Tot  (15min)     (MB)     (MB)  JobID User ...
igt009            igt009   down*    0  48    0.03    386452   366715   
igt010        parabricks     mix    4  48    0.33*   386462   377722  844 xxxx-pg  
igt015            igt015    idle    0  48    0.01    386458   380861   
igt016            igt016    idle    0  48    0.10    386462   379586   
```

### ジョブが実行されない理由の確認方法

ジョブが開始されず、待ち状態になっている理由を参照するには、squeueコマンドで確認してください。””NODELIST (REASON)"欄にReason Codeが表示されます。


Reason Codeのフルリストは以下の開発元のサイトで参照可能です。

- [Job Reason Codesのフルリスト](https://slurm.schedmd.com/resource_limits.html#reasons)

何らかのリソースを待っていると思われる理由以外の理由が表示されていて状態が変わらず長時間ジョブの実行が待たされている場合は、窓口に問い合わせてください。




## ジョブの削除(scancel)

想定した以上に処理に時間がかかっている、ジョブの標準出力、標準エラー出力に出力されている途中結果からジョブが期待した動作をしていないと思われる場合は、scancelコマンドでジョブを削除します。

実行例

```
xxxxx-pg@at022vm02:~/parabricks$ squeue
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
               747 parabrick     test xxxxx-pg  R       3:01      1 igt010
xxxxx-pg@at022vm02:~/parabricks$ scancel 747
xxxxx-pg@at022vm02:~/parabricks$ squeue
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
               747 parabrick     test xxxxx-pg CG       3:06      1 igt010
xxxxx-pg@at022vm02:~/parabricks$ squeue
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)

```

投入した複数のジョブを一括してキャンセルしたい場合は、以下の指定方法が利用可能です。


|scancelのオプション指定 |説明|
|---------------------|----|
| -u ユーザ名 |ユーザ名を指定してジョブを削除する|
|-p パーティション名|パーティション名を指定して、当該パーティションを対象にscancel実行ユーザのジョブを削除します。|
|-t ジョブの状態|ジョブの状態を指定してキャンセルします。PENDING、RUNNING、SUSPENDEDのいずれかを指定します。|


オプションの詳細については[オンラインマニュアル](https://slurm.schedmd.com/scancel.html#SECTION_OPTIONS)を参照してください。

## ジョブの実行条件の変更(scontrol update)

Slurmでジョブを投入した後に、そのジョブが要求しているリソース量などを変更するにはscontrol updateを利用します。

詳細については、[オンラインマニュアル](https://slurm.schedmd.com/scontrol.html)を参照してください。

### ジョブのCPU数の変更

```
scontrol update JobId=<ジョブID> NumCPUs=<新しいCPU数>
```
実行例

### ジョブのメモリ量の変更

```
scontrol update JobId=<ジョブID> MinMemoryNode=<新しいメモリ量(ノード単位)>
```
メモリ量はMB単位で指定します。

### ジョブの実行時間の変更

```
scontrol update JobId=<ジョブID> TimeLimit=<新しい時間制限>
```
ここで、新しい時間制限は、days-hours:minutes:secondsの形式か、あるいはminutesの形式で指定します。

#### 実行例

```
xxxxx-pg@at022vm02:~$ sbatch ./test.sh 
Submitted batch job 779
xxxxx-pg@at022vm02:~$ squeue
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
               779 parabrick  test.sh xxxxx-pg PD       0:00      3 (BeginTime)
xxxxx-pg@at022vm02:~$ scontrol show job 779
JobId=779 JobName=test.sh
   UserId=xxxxx-pg(30257) GroupId=co-ddn-pg(30063) MCS_label=N/A
   Priority=10150 Nice=0 Account=(null) QOS=normal
   JobState=PENDING Reason=BeginTime Dependency=(null)
   Requeue=1 Restarts=0 BatchFlag=1 Reboot=0 ExitCode=0:0
   RunTime=00:00:00 TimeLimit=UNLIMITED TimeMin=N/A
   SubmitTime=2024-02-21T11:38:08 EligibleTime=2024-02-27T00:00:00
   AccrueTime=2024-02-21T11:38:08
   StartTime=2024-02-27T00:00:00 EndTime=Unknown Deadline=N/A
   SuspendTime=None SecsPreSuspend=0 LastSchedEval=2024-02-21T11:38:08 Scheduler=Main
   Partition=parabricks AllocNode:Sid=at022vm02:1918834
   ReqNodeList=(null) ExcNodeList=(null)
   NodeList=(null)
   NumNodes=3-5 NumCPUs=20 NumTasks=20 CPUs/Task=1 ReqB:S:C:T=0:0:*:*
   TRES=cpu=20,mem=80G,node=1,billing=20
   Socks/Node=* NtasksPerN:B:S:C=0:0:*:* CoreSpec=*
   MinCPUsNode=1 MinMemoryCPU=4G MinTmpDiskNode=0
   Features=(null) DelayBoot=00:00:00
   OverSubscribe=OK Contiguous=0 Licenses=(null) Network=(null)
   Command=./test.sh
   WorkDir=/lustre8/home/xxxxx-pg
   StdErr=/lustre8/home/xxxxx-pg/slurm-779.out
   StdIn=/dev/null
   StdOut=/lustre8/home/xxxxx-pg/slurm-779.out
   Power=
   SpreadJob=Yes
   

xxxxx-pg@at022vm02:~$ scontrol update JobID=779 NumCPUs=24
xxxxx-pg@at022vm02:~$ scontrol update JobID=779 MinMemoryNode=20000
xxxxx-pg@at022vm02:~$ scontrol update JobID=779 TimeLimit=100
xxxxx-pg@at022vm02:~$ scontrol show job 779
JobId=779 JobName=test.sh
   UserId=xxxxx-pg(30257) GroupId=co-ddn-pg(30063) MCS_label=N/A
   Priority=10160 Nice=0 Account=(null) QOS=normal
   JobState=PENDING Reason=BeginTime Dependency=(null)
   Requeue=1 Restarts=0 BatchFlag=1 Reboot=0 ExitCode=0:0
   RunTime=00:00:00 TimeLimit=01:40:00 TimeMin=N/A
   SubmitTime=2024-02-21T11:38:08 EligibleTime=2024-02-27T00:00:00
   AccrueTime=2024-02-21T11:38:08
   StartTime=2024-02-27T00:00:00 EndTime=2024-02-27T01:40:00 Deadline=N/A
   SuspendTime=None SecsPreSuspend=0 LastSchedEval=2024-02-21T11:38:08 Scheduler=Main
   Partition=parabricks AllocNode:Sid=at022vm02:1918834
   ReqNodeList=(null) ExcNodeList=(null)
   NodeList=(null)
   NumNodes=1-5 NumCPUs=24 NumTasks=20 CPUs/Task=1 ReqB:S:C:T=0:0:*:*
   TRES=cpu=24,mem=20000M,node=1,billing=24
   Socks/Node=* NtasksPerN:B:S:C=0:0:*:* CoreSpec=*
   MinCPUsNode=1 MinMemoryNode=20000M MinTmpDiskNode=0
   Features=(null) DelayBoot=00:00:00
   OverSubscribe=OK Contiguous=0 Licenses=(null) Network=(null)
   Command=./test.sh
   WorkDir=/lustre8/home/xxxxx-pg
   StdErr=/lustre8/home/xxxxx-pg/slurm-779.out
   StdIn=/dev/null
   StdOut=/lustre8/home/xxxxx-pg/slurm-779.out
   Power=
   SpreadJob=Yes
   

xxxxx-pg@at022vm02:~$ 
```

### その他のリソース変更

他にも、ジョブに割り当てるノード数(NumNodes)や特定のノードへの割り当て(NodeList)など、様々な
リソースパラメータを変更することができます。
```
scontrol update JobId=<ジョブID> NumNodes=<新しいノード数>
scontrol update JobId=<ジョブID> NodeList=<新しいノードリスト>
```
これらの変更は、ジョブがまだ開始されていない（状態がPENDING）場合に限られます。一度ジョブが
実行状態（RUNNING）に入ると、リソースの変更が制限されるか、または不可能になることがあります。また、
システムの設定やポリシーによっては、特定のリソースの変更が許可されていない場合もあります。

## ジョブの実行結果の確認(sacct)

ジョブの結果は、sbatchのコマンドラインオプションで特に何も指定しなければ、ファイル名がslurm-ジョブ名.outのファイルににジョブの標準出力が出力されています。

sacctコマンドでジョブの実行履歴を確認することが可能です。オプションの詳細については[オンラインマニュアル](https://slurm.schedmd.com/sacct.html#SECTION_OPTIONS)を参照してください。

```
xxxxx-pg@at022vm02:~/parabricks$ sacct
JobID           JobName  Partition    Account  AllocCPUS      State ExitCode 
------------ ---------- ---------- ---------- ---------- ---------- -------- 
722                bash parabricks                     1  COMPLETED      0:0 
723                bash parabricks                     1     FAILED      2:0 
724                bash parabricks                     1  COMPLETED      0:0 
725                bash parabricks                     1 CANCELLED+      0:0 
726                test parabricks                     4  COMPLETED      0:0 
726.batch         batch                                4  COMPLETED      0:0 
727                test parabricks                     4  COMPLETED      0:0 
727.batch         batch                                4  COMPLETED      0:0 
728                bash parabricks                     1  COMPLETED      0:0 
744_1        arraytest+ parabricks                     1  COMPLETED      0:0 
744_1.batch       batch                                1  COMPLETED      0:0 
744_3        arraytest+ parabricks                     1  COMPLETED      0:0 
744_3.batch       batch                                1  COMPLETED      0:0 
744_5        arraytest+ parabricks                     1  COMPLETED      0:0 
744_5.batch       batch                                1  COMPLETED      0:0 
747                test parabricks                     4 CANCELLED+      0:0 
747.batch         batch                                4  CANCELLED     0:15 

```

## Slurm実行に必要な環境変数などのセットアップ

個人ゲノム解析区画のslurm用ログインノードにログインすると自動的に設定されるので通常はユーザが設定する必要はありません。


 