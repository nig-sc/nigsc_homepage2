---
id: univa_grid_engine
title: Univa Grid Engine
---

## バッチジョブの使い方


CPUコアを1コアだけ使用し長時間実行するプログラムを少数実行する場合は、バッチジョブとして実行してください。（多数実行する場合はアレイジョブを使ってください。）

### 例1: バイナリファイルの実行

以下の例は遺伝研スパコンでバッチジョブを実行する際の典型的なオプションの書き方を示している。（オプションの全リストについてはman qsub, man qlogin等を参照のこと。）

```
qsub -cwd -V \
	 -l short \
     -l d_rt=00:20:00 -l s_rt=00:20:00 \
	 -l s_vmem=1G -l mem_req=1G \
	 -N extract_flatfile \
     -b y \
     gzip -d ddbjvrt9.seq.gz
```

1行目の -cwd と-Vはジョブの実行環境に関係するオプションである。
							  
							  


<table>
<tr>
  <th width="300">Option</th><th width="300">Description</th>
 </tr>
 <tr>
    <td>-v environment</td><td>qsubを実行した環境の環境変数を一つジョブに引き継ぐ</td>
</tr>
<tr>
	<td>-v environment=value</td><td>ジョブに環境変数を1つずつ設定する。</td>
</tr>
<tr>
	<td>-V</td><td>qsubを実行した環境の環境変数を全てジョブに引き継ぐ。</td>
</tr>
<tr>
    <td>-cwd</td><td>ジョブは現在のディレクトリ上で実行される。（指定しないと$HOMEディレクトリ上で実行される。）</td>
	</tr>
</table>

2行目はUGEキューの種類を表す。遺伝研スパコンではワーカーノードの計算機の種類ごとに待ち行列（Queue)を作成している。キューを何も指定しないとepycキューにジョブが投入される。 （Type1b => Type1aの順で空いているワーカーノードを探す。)


<table>
<tr>
	<th width="300">キューの名称</th><th width="300">計算ノードの種類<th width="300">ジョブ実行時間の最大値</th></th><th width="300">利用可能メモリ量の初期値</th>
</tr>
<tr>
	<td>intel</td><td>Thinノード Type2a</td><td>62日</td><td>8GB</td>
</tr>
<tr>
	<td>epyc</td><td>Thinノード Type1a, Type1b</td><td>62日</td><td>Type1bの場合4GB, Type1aの場合8GB</td>
</tr>
<tr>
    <td>gpu</td><td>Thinノード Type2b (GPUノード)</td><td>62日</td><td>   </td>
</tr>
<tr>
    <td>short</td><td>Thinノード Type2b (GPUノード)</td><td>1時間</td><td>   </td>
</tr>
<tr>
    <td>medium</td><td>mediumノード</td><td>62日</td><td>   </td>
</tr>
</table>


3行目はジョブの実行上限時間である。

例えば8日以内にジョブが終了する見込みであるから最大8日間のジョブ実行枠を指定する、といった場合には -l d_rt オプション、 -l s_rt オプションに192時間(8日×24時間)を指定する。-l d_rt オプションおよび、-l s_rt オプションには同じ値を指定する必要がある。

```
qsub -l d_rt=192:00:00 -l s_rt=192:00:00 test.sh
```

ジョブはshortキュー（最大1時間）を除き、最大2ヶ月間実行を継続することが可能となっている。しかしジョブスケジューリングを円滑に行うために、 -l d_rt オプション、 -l s_rt オプションを指定しないとUGEはそのジョブは3日以内に終了するものと判断するよう遺伝研スパコンでは設定されている。したがって計算時間が3日を超える見込みである場合は必ず -l d_rt オプション、 -l s_rt オプションを指定すること。（正しいジョブスケジューリングのために、いつも-l d_rt オプション、 -l s_rt オプションを指定することを推奨します。実行上限時間が来るとプログラムの実行は強制終了されるので、見込みよりも少し長めに指定してください。)


4行目は使用するメモリ量の指定である。`-l s_vmem`,  `-l mem_req`に同じ値を指定すること。単位はG,M,K等が使える。

5行目はジョブ名の指定である。

6行目は（シェルスクリプトなどではなく）バイナリの実行ファイルを実行しようとしていることを示す。

7行目は実際にワーカーノードで実行されるプログラムの呼び出しである。



### 例2: シェルスクリプトなどの実行

```
qsub -cwd -V \
     -l epyc \
	 -l d_rt=192:00:00 -l s_rt=192:00:00 \
	 -l s_vmem=20G -l mem_req=20G \
	 -N an_example \
	 -S /bin/bash \
	 example.sh arg1 arg2
```


例1との違いは6行目と7行目である。bashやperl等スクリプトを呼ぶときにはこのように書く。


### 例3: Job Script


上記の例1,例2でたくさんのオプションを指定したが、オプションをスクリプトに書いておき、そのスクリプトを呼ぶことで呼び出しを簡略化することが出来る。

以下のようなjob_script.shを用意し、` qsub -S /bin/bash job_script.sh ` でサブミットすればよい。
							   
```
#!/bin/bash

#$ -cwd 
#$ -V 
#$ -l epyc
#$ -l d_rt=192:00:00
#$ -l s_rt=192:00:00
#$ -l s_vmem=20G 
#$ -l mem_req=20G
#$ -N an_example
#$ -S /bin/bash


example.sh arg1 arg2
```


## アレイジョブ(Array Job)の使い方

一度に多数のジョブ（バッチジョブまたは並列ジョブ）をシステムに投入したい場合はアレイジョブ機能を利用してください。

決して、多数のジョブをそのまま投入しようとしないでください。システムを過負荷を与える場合があります。

アレイジョブとして実行するには以下のように-tオプションを指定してqsubを実行します。 "-t 1-6:2"は、最小インデックス番号を1、最大インデックス番号を6とし、それに対して":2"を付加することで、1つ飛ばしのインデックス 番号を付けることを指定しています。この為、インデックス番号としては、1,3,5が指定されたことになります。これはqstatの出力の 各行の末尾に、タスクIDとして参照が可能となっています。

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

タスクIDは、ジョブスクリプト内で、SGE_TASK_IDという環境変数によって参照可能です。これを使って「アレイジョブ内の各タスクは SGE_TASK_IDの値を確認して、それぞれ異なる処理を行う。」ことが可能です。


各タスクは計算機の空きが見つかり次第それぞれ実行されます。（並列に実行されるとは限りません。）計算機が空いていれば各タスクは並列に実行されますが、その上限を-tcオプションで制限することが出来ます。

 その他の例：
 
- ` qsub -t 1-10 -tc 5 job_script.sh `
  - $SGE_TASK_IDが1から10の合計10個のタスクをサブミットする。計算機が空いていれば最大5並列で順次実行する。

- ` qsub -t 10 job_script.sh `
  - $SGE_TASK_IDが10であるタスクを1つサブミットする。
 
- ` qsub -t 2-10:2 job_script.sh ` 
  - 最小インデックス番号を2、最大インデックス番号を10とし、それに対して":2"を付加することで、1つ飛ばしのインデックス 番号を付けることを指定しています。
(task-ids 2,4,6,8,10).
 
  
アレイジョブ内から参照可能な環境変数 (Pseudo environment variable)は以下の通りです。


<table>
<tr>
  <th width="300">Pseudo env variable</th><th width="300">Description</th>
</tr>
<tr>
  <td>"HOME</td><td>Home directory of the submitting user</td>
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

 
## 並列ジョブ(Parallel Job)の使い方
 
 CPUコアを複数使用し長時間実行するプログラムを少数実行する場合は、並列ジョブ(parallel job)として実行してください。（多数実行する場合は並列ジョブのアレイジョブを使ってください。）
 
  
  
  並列ジョブ機能を利用するには（バッチジョブの項で説明したオプションに加えて）-peオプションを用いてparallel environmentを指定します。
  
  遺伝研スパコンで用意されているparallel environmentの種類を以下に示します。
  
<table>
<tr>
<th width="300">parallel environment</th><th width="300">意味</th>
</tr>
<tr>
  <td>def_slot N</td>
  <td>同一計算ノード上にN個のCPUコアを確保する。(Nが計算ノード上のCPUコア数を超えている場合はジョブが始まらない。）</td>
 </tr>
 <tr>
  <td>mpi N</td>
  <td>複数の計算ノードにわたってN個のCPUコアを確保する。その際に計算ノードはround-robin方式で選択される。結果としてなるべく多数の計算ノードに散った形でコアが確保される。</td>
</tr>
<tr>
  <td>mpi-fillup N</td><td>複数の計算ノードにわたってN個のCPUコアを確保する。その際に計算ノードの台数がなるべく少なくなるようコアが確保される。</td>
</tr>
<tr>
  <td>mpi_n N
  
  定義されているparallel environmentは以下の通り。
  
  mpi_4, mpi_8, mpi_16, mpi_32, mpi_64,
  
  mpi_5, mpi_10, mpi_20</td>
  <td>複数の計算ノードにわたってN個のコアを確保する。その際各計算ノード上にn=4,8,16, … コアを確保する。</td>
</tr>
</table>
		
コア数は数値を一つ指定するほか、範囲の指定もできる。

- ` qsub -pe mpi-fillup 100 -S /bin/bash job_script.sh `
- ` qsub -pe def_slot 20-100 -S /bin/bash job_script.sh `
- ` qsub -pe mpi 20- -S /bin/bash job_script.sh `

### 並列ジョブに対して、メモリ要求量を指定する際の注意事項

並列ジョブに対して-l s_vmem、-l mem_reqを指定する場合、並列環境で指定した並列数と指定したメモリ量が掛け合わされた容量のメモリをシステム に要求してジョブが投入されます。

例えば、下記のように指定した場合、並列ジョブが使用するメモリ総量として16×8=128GBを指定したことになります。 その点について注意した上で指定する要求メモリ量を決定してください。

```
-pe def_slot 16 -l s_vmem=8G -l mem_req=8G
-pe mpi-fillup 16 -l s_vem=8G -l mem_req=8G 
```

## GNU makeを並列ジョブとして実行する方法

qmakeを使わなくても、qsubで並列ジョブとして以下のようにすればよい。

```
qsub -cwd -V -pe def_slot 8 -b y make -j 8
```

## MPIの使い方


## GPUの使い方

GPUを使用するジョブを投入する場合、"-l gpu"オプションの他"-l cuda=n"(nは使用するGPU数を指定。上限は4)オプションを付与します。"-l cuda=n"オプションを付与しない場合、ジョブはgpu.qに投入されますが、GPUは使用できません。

例えば2つのGPUを使用する場合、以下のように指定します。
```
[username@at027 ~]$ qsub -l gpu -l cuda=2 gputest.sh
Your job 10000 ("gputest.sh") has been submitted
```

GPUはジョブから、"cuda=n"で指定した数だけ参照可能です。
```
[username@at027 ~]$ cat gputest.sh
#!/bin/bash
#$ -S /bin/bash

nvidia-smi
[username@at027 ~]$ qsub -l gpu -l cuda=1 gputest.sh 
Your job 10001 ("gputest.sh") has been submitted
[username@at027 ~]$ qsub -l gpu -l cuda=2 gputest.sh 
Your job 10002 ("gputest.sh") has been submitted
[username@at027 ~]$ qsub -l gpu -l cuda=4 gputest.sh 
Your job 10003 ("gputest.sh") has been submitted
[username@at027 ~]$ cat gputesh.sh.o10001
Wed Mar  4 20:00:00 2019
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 396.26                 Driver Version: 410.66                    |
|-------------------------------|----------------------|----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
|   0  Tesla V100-SXM2...  On   | 00000000:15:00.0 Off |                    0 |
| N/A   32C    P0    39W / 300W |      0MiB / 16130MiB |      0%      Default |
+-------------------------------|----------------------|----------------------+

+-----------------------------------------------------------------------------+
| Processes:                                                       GPU Memory |
|  GPU       PID   Type   Process name                             Usage      |
|=============================================================================|
|  No running processes found                                                 |
+-----------------------------------------------------------------------------+
[username@at027 ~]$ cat gputesh.sh.o10002
Wed Mar  4 20:00:00 2019
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 396.26                 Driver Version: 410.66                    |
|-------------------------------|----------------------|----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
|   0  Tesla V100-SXM2...  On   | 00000000:15:00.0 Off |                    0 |
| N/A   29C    P0    39W / 300W |      0MiB / 16130MiB |      0%      Default |
+-------------------------------|----------------------|----------------------+
|   1  Tesla V100-SXM2...  On   | 00000000:16:00.0 Off |                    0 |
| N/A   30C    P0    39W / 300W |      0MiB / 16130MiB |      0%      Default |
+-------------------------------|----------------------|----------------------+

+-----------------------------------------------------------------------------+
| Processes:                                                       GPU Memory |
|  GPU       PID   Type   Process name                             Usage      |
|=============================================================================|
|  No running processes found                                                 |
+-----------------------------------------------------------------------------+
[username@at027 ~]$ cat gputesh.sh.o10003
Wed Mar  4 20:00:00 2019
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 396.26                 Driver Version: 410.66                    |
|-------------------------------|----------------------|----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
|   0  Tesla V100-SXM2...  On   | 00000000:15:00.0 Off |                    0 |
| N/A   32C    P0    38W / 300W |      0MiB / 16130MiB |      0%      Default |
+-------------------------------|----------------------|----------------------+
|   1  Tesla V100-SXM2...  On   | 00000000:16:00.0 Off |                    0 |
| N/A   32C    P0    39W / 300W |      0MiB / 16130MiB |      0%      Default |
+-------------------------------|----------------------|----------------------+
|   2  Tesla V100-SXM2...  On   | 00000000:3A:00.0 Off |                    0 |
| N/A   30C    P0    39W / 300W |      0MiB / 16130MiB |      0%      Default |
+-------------------------------|----------------------|----------------------+
|   3  Tesla V100-SXM2...  On   | 00000000:3B:00.0 Off |                    0 |
| N/A   31C    P0    37W / 300W |      0MiB / 16130MiB |      0%      Default |
+-------------------------------|----------------------|----------------------+

+-----------------------------------------------------------------------------+
| Processes:                                                       GPU Memory |
|  GPU       PID   Type   Process name                             Usage      |
|=============================================================================|
|  No running processes found                                                 |
+-----------------------------------------------------------------------------+

```

## ジョブの実行状態の確認 (qstat)

### ジョブの投入状況の確認

qsubで投入したジョブがジョブとして投入されたかを確認します。投入したジョブの状態確認にはqstatコマンドを利用します。例えばジョブが 投入されていたとすれば以下のように表示されます。
```
[username@at027 ~]$ qstat
job-ID     prior   name       user         state submit/start at     queue                          jclass                         slots ja-task-ID 
------------------------------------------------------------------------------------------------------------------------------------------------
     80312 0.50000 QLOGIN     username     r     02/27/2019 17:42:00 login.q@at027                                                     1
     80313 0.25000 jobname    username     r     02/27/2019 17:44:30 epyc.q@at040                                                      1
     80314 0.25000 jobname    username     r     02/27/2019 17:44:35 epyc.q@at040                                                      1
     80315 0.25000 jobname    username     r     02/27/2019 17:44:40 epyc.q@at040                                                      1
					
```
この時、"state"欄の文字の意味は以下のようになります。

<table>
<tr>
<th width="300">文字</th><th width="300">意味</th>
</tr>
<tr>
  <td>r</td><td>ジョブ実行中</td>
</tr>
<tr>
  <td>qw</td><td>ジョブはキューで待機中</td>
</tr>
<tr>
  <td>t</td><td>ジョブは実行ホストへ転送処理中</td>
</tr>
<tr>
 <td>E</td><td>ジョブにエラーが発生</td>
</tr>
<tr>
 <td>d</td><td>ジョブは削除処理中</td>
</tr>
</table>

また、キューの利用状況を確認したい場合は、"qstat -f"と入力します。以下のような出力が出力されます。

```
[username@at027 ~]$ qstat -f
queuename                      qtype resv/used/tot. np_load  arch          states
---------------------------------------------------------------------------------
medium.q@m01                   BP    0/0/80         0.00     lx-amd64      
---------------------------------------------------------------------------------
medium.q@m02                   BP    0/0/80         0.00     lx-amd64      
---------------------------------------------------------------------------------
medium.q@m03                   BP    0/0/80         0.00     lx-amd64      
---------------------------------------------------------------------------------
medium.q@m04                   BP    0/0/80         0.00     lx-amd64      
(中略)
---------------------------------------------------------------------------------
epyc.q@at033                   BP    0/0/64         0.00     lx-amd64      
---------------------------------------------------------------------------------
epyc.q@at034                   BP    0/0/64         0.00     lx-amd64      
---------------------------------------------------------------------------------
epyc.q@at035                   BP    0/0/64         0.00     lx-amd64      
(中略)
---------------------------------------------------------------------------------
intel.q@it003                  BP    0/0/32         0.00     lx-amd64      
---------------------------------------------------------------------------------
intel.q@it004                  BP    0/0/32         0.00     lx-amd64      
---------------------------------------------------------------------------------
intel.q@it005                  BP    0/0/32         0.00     lx-amd64      
---------------------------------------------------------------------------------
intel.q@it006                  BP    0/0/32         0.00     lx-amd64      
---------------------------------------------------------------------------------
(以下略)

```

これにより、どのノード(キュー)にジョブが投入されているかを判別することができます。

 
 
 "qstat -j ジョブID"とすることで、ジョブの詳細情報を取得することができます。
 
 ```
 [username@at027 ~]$ qstat -j 199666
 ==============================================================
 job_number:                 199666
 jclass:                     NONE
 submission_time:            02/27/2019 17:42:00.867
 owner:                      username
 uid:                        9876
 group:                      ddbj
 gid:                        9876
 supplementary group:        ddbj
 sge_o_home:                 /home/username
 sge_o_log_name:             username
 sge_o_path:                 /cm/local/apps/gcc/7.2.0/bin:/home/geadmin/UGER/bin/lx-amd64:/cm/local/apps/environment-modules/4.0.0//bin:/usr/local/bin:/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/opt/ibutils/bin:/sbin:/usr/sbin:/cm/local/apps/environment-modules/4.0.0/bin:/home/username/.local/bin:/home/username/bin
 sge_o_shell:                /bin/bash
 sge_o_workdir:              /lustre8/home/username
 sge_o_host:                 gw1
 account:                    sge
 stderr_path_list:           NONE:NONE:/dev/null
 hard resource_list:         d_rt=259200,mem_req=8G,s_rt=259200,s_stack=10240K,s_vmem=8G
 soft resource_list:         epyc=TRUE,gpu=TRUE,intel=TRUE,login=TRUE
 mail_list:                  username@gw1
 notify:                     FALSE
 job_name:                   QLOGIN
 stdout_path_list:           NONE:NONE:/dev/null
 priority:                   0
 jobshare:                   0
 restart:                    n
 env_list:                   TERM=xterm
 department:                 defaultdepartment
 binding:                    NONE
 mbind:                      NONE
 submit_cmd:                 qlogin
 category_id:                4
 request_dispatch_info:      FALSE
 start_time            1:    02/27/2019 17:42:00.884
 job_state             1:    r
 exec_host_list        1:    at027:1
 granted_req.          1:    mem_req=8.000G
 usage                 1:    wallclock=01:00:01, cpu=00:00:00, mem=0.00000 GBs, io=0.00000 GB, iow=0.000 s, ioops=0, vmem=N/A, maxvmem=N/A
 scheduling info:            -
 
 
 ```
 
 
## クラスタ全体の混雑状況の確認方法
 
 各キューのジョブの投入状況、キューの負荷状況等、全体を把握するのには、"qstat -g c"として確認することが 出来ます。
 
 ```
 [username@at027 ~]$ qstat -g c
 CLUSTER QUEUE                   CQLOAD   USED    RES  AVAIL  TOTAL aoACDS  cdsuE  
 --------------------------------------------------------------------------------
 epyc.q                            0.00      1      0   4159   4224      0     64 
 gpu.q                             0.00      0      0     64    112      0     48 
 intel.q                           0.00      0      0   1472   1472      0      0 
 login.q                           0.00      4      0    380    384      0      0 
 login_gpu.q                       0.00      0      0     48     48      0      0 
 medium.q                          0.00      0      0    800    800      0      0 
 short.q                           0.00      0      0    128    224      0     96 
     
 ```
 
## ジョブの削除(qdel)

ジョブの終了を待たずにジョブを削除したい場合はqdelコマンドを使用します。 "qdel ジョブID"とします。自分が投入しているジョブをすべて削除したい場合は、"qdel -u ユーザ名"とすることで実行可能です。

<table>
<tr>
<th width="300">Parameter Description</th><th width="300">Description</th>
</tr>
<tr>
  <td>-f *job_id(s)*</td>
  <td>Forces the deletion a job even if the responsible execution host does not respond.</td>
</tr>
<tr>
  <td>*job_id* -t range</td>
  <td>
Deletes specific tasks of an array job. It is also possible to delete
a specific range of array jobs.
  </td>
</tr>
<tr>
  <td>-u *user_list*</td><td>Deletes all job of the specified user.</td>
</tr>
</table>


## ジョブの実行条件の変更 (qalter)


## ジョブの結果の確認

ジョブの結果は、qsubのコマンドラインオプションで特に何も指定しなければ、ファイル名がジョブ名.oジョブIDのファイルににジョブの標準出力、ホームディレクトリ上の下記のファイル名でジョブの標準エラー出力 が出力されています。ファイルをご確認ください。
` ジョブ名.eジョブID `

実行したジョブがどのぐらいのリソースを利用したか等の詳細情報については、qreportコマンドで確認することができます。
```
[username@at137 ~]$ qreport -j 110488
==============================================================
owner                okishinya                                                  
jobnumber            110488                                                     
taskid               undefined                                                  
slots                1                                                          
pe_taskid            NONE                                                       
granted_pe           NONE                                                       
exit_status          0                                                          
failed               0                                                          
qname                epyc.q                                                     
hostname             at116                                                      
jobname              TEST_intel                                                 
qsub_time            20190307-22:30:33                                          
start_time           20190307-22:31:31                                          
end_time             20190307-22:31:35                                          
ru_wallclock         4.249                                                      
cpu                  3.0                                                        
mem                  0.0                                                        
maxvmem              0.0G                                                       
r_mem                8.000G                                                     
r_q                  NONE                                                       
r_cpu                NONE

```

## UGE実行に必要な環境変数などのセットアップ

UGEのqsubなどのコマンドを実行できるようになるためには一連の環境変数のセットアップが必要である。一般解析区画のゲートウェイノードにログインするとこれらの環境変数が自動的に設定されるので通常は自分で設定する必要はない。

Singularityコンテナからqsubする場合など特殊なケースでは明示的なセットアップが必要な場合がある。その場合には以下のコマンドを実行すれば良い。

 
 
 UGEのUser’s Manualにあるとおり、以下のようにUGEが提供しているシェルスクリプトを実行すると必要な環境変数がセットアップされる。
 
 ```
 export SGE_ROOT=/home/geadmin/UGER
 export SGE_CELL=uger
 source $SGE_ROOT/$SGE_CELL/common/settings.sh
 ```
 
