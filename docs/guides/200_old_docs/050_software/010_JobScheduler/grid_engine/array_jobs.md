---
id: array_jobs
title: アレイジョブ
---

:::danger これは古いドキュメントです

本ドキュメントは旧遺伝研スパコン(2019)のドキュメントであり、参考のため残しているものです。

現行遺伝研スパコン(2025)ではこのとおりには動作しませんのでご注意ください。
:::


一度に多数のジョブ（バッチジョブまたは並列ジョブ）をシステムに投入したい場合はアレイジョブ機能を利用してください。

決して、多数のジョブをそのまま投入しようとしないでください。システムを過負荷を与える場合があります。

アレイジョブとして実行するには以下のように-t オプションを指定して qsub を実行します。 "-t 1-6:2"は、最小インデックス番号を 1、最大インデックス番号を 6 とし、それに対して":2"を付加することで、1つ飛ばしのインデックス 番号を付けることを指定しています。この為、インデックス番号としては、1,3,5 が指定されたことになります。これは qstat の出力の 各行の末尾に、タスク ID として参照が可能となっています。

```
[username@at027 ~]$ qsub -t 1-6:2 arraytest.sh
Your job-array 10000.1-6:2 ("arraytest.sh") has been submitted
[username@at027 ~]$ qstat
job-ID     prior   name       user         state submit/start at     queue                jclass            slots ja-task-ID
-----------------------------------------------------------------------------------------------------------------------------
	10000 0.25000 arraytest. username     r     03/04/2019 20:31:57 epyc.q@at095                                 1 1
	10000 0.25000 arraytest. username     r     03/04/2019 20:31:57 epyc.q@at095                                 1 3
	80430 0.25000 arraytest. username     r     03/04/2019 20:31:57 epyc.q@at095                                 1 5
```

タスク ID は、ジョブスクリプト内で、SGE_TASK_ID という環境変数によって参照可能です。これを使って「アレイジョブ内の各タスクは SGE_TASK_ID の値を確認して、それぞれ異なる処理を行う。」ことが可能です。


各タスクは計算機の空きが見つかり次第それぞれ実行されます。（並列に実行されるとは限りません。）計算機が空いていれば各タスクは並列に実行されますが、その上限を-tc オプションで制限することが出来ます。

 その他の例：
 
- ` qsub -t 1-10 -tc 5 job_script.sh `
  - $SGE_TASK_ID が 1 から 10 の合計 10 個のタスクをサブミットします。計算機が空いていれば最大 5 並列で順次実行します。

- ` qsub -t 10 job_script.sh `
  - $SGE_TASK_ID が 10 であるタスクを 1 つサブミットします。
 
- ` qsub -t 2-10:2 job_script.sh ` 
  - 最小インデックス番号を 2、最大インデックス番号を 10 とし、それに対して":2"を付加することで、1つ飛ばしのインデックス 番号を付けることを指定しています。
(task-ids 2,4,6,8,10).
 
  
アレイジョブ内から参照可能な環境変数 (Pseudo environment variable)は以下の通りです。


<table>
<tr>
  <th width="300">Pseudo env variable</th><th width="300">Description</th>
</tr>
<tr>
  <td>$HOME</td><td>Home directory of the submitting user</td>
</tr>
<tr>
<td>$HOSTNAME</td><td>Hostname of the execution host</td>
</tr>
<tr>
  <td>$JOB_ID</td><td>ID of the job</td>
</tr>
<tr>
  <td>$SGE_TASK_ID</td><td>ID of the array task</td>
</tr>
<tr>
  <td>$SGE_TASK_FIRST</td><td>ID of the first array task</td>
 </tr>
 <tr>
  <td>$SGE_TASK_LAST</td><td>ID of the last array task</td>
</tr>
<tr>
  <td>$JOB_NAME</td><td>Name of the job</td>
</tr>
<tr>
<td>$USER</td><td>User name of the submitting user</td>
</tr>
<tr>
  <td>$SGE_TASK_STEPSIZE</td><td>step size</td>
</tr>
</table>

 
