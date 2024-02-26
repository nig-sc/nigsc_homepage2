---
id: array_jobs
title: アレイジョブ
---


一度に多数のジョブ（バッチジョブまたは並列ジョブ）をシステムに投入したい場合はアレイジョブ機能を利用してください。

:::caution
決して、多数のジョブをそのまま投入しようとしないでください。システムを過負荷を与える場合があります。
:::

アレイジョブとして実行するには以下のように-a オプションを指定して sbatch を実行します。 `-t 1-6:2`は、最小インデックス番号を 1、最大インデックス番号を 6 とし、それに対して`:2`を付加することで、1つ飛ばしのインデックス 番号を付けることを指定しています。この為、インデックス番号としては、1,3,5 が指定されたことになります。これは squeue の出力の 各行の末尾に、タスク ID として参照が可能となっています。

```
xxxxx-pg@at022vm02:~$ sbatch -a 1-6:2 ./arraytest.sh 
Submitted batch job 744
xxxxx-pg@at022vm02:~$ squeue
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
             744_1 parabrick arraytes xxxxx-pg  R       0:03      1 igt010
             744_3 parabrick arraytes xxxxx-pg  R       0:03      1 igt010
             744_5 parabrick arraytes xxxxx-pg  R       0:03      1 igt010
```

タスク ID は、ジョブスクリプト内で、SLURM_ARRAY_TASK_ID という環境変数によって参照可能です。これを使って「アレイジョブ内の各タスクは SLURM_ARRAY_TASK_ID の値を確認して、それぞれ異なる処理を行う。」ことが可能です。


各タスクは計算機の空きが見つかり次第それぞれ実行されます。（並列に実行されるとは限りません。）計算機が空いていれば各タスクは並列に実行されますが、その上限は%表記で制限することができます。


 その他の例：
 
- ` sbatch -a 1-10%5 job_script.sh `
  - $SGE_TASK_ID が 1 から 10 の合計 10 個のタスクをサブミットします。計算機が空いていれば最大 5 並列で順次実行します。

- ` sbatch -a 10 job_script.sh `
  - $SGE_TASK_ID が 10 であるタスクを 1 つサブミットします。
 
- ` sbatch -a 2-10:2 job_script.sh ` 
  - 最小インデックス番号を 2、最大インデックス番号を 10 とし、それに対して":2"を付加することで、1つ飛ばしのインデックス 番号を付けることを指定しています。
(task-ids 2,4,6,8,10).

アレイジョブを投入したときに利用可能な環境変数は以下になります。

### アレイジョブで利用するSlurm環境変数について

アレイジョブ内から参照可能な環境変数は以下のとおりです。

|環境変数　 |  概要 |
|---------|-------|
|SLURM_ARRAY_JOB_ID | アレイジョブのジョブID|
|SLURM_ARRAY_TASK_ID | アレイジョブのタスクID |
|SLURM_ARRAY_TASK_COUNT | アレイジョブのタスク数 |
| SLURM_ARRAY_TASK_MIN | アレイジョブの最初のタスクID |
|SLURM_ARRAY_TASK_MAX |アレイジョブの最後のタスクID |

 
  


 



