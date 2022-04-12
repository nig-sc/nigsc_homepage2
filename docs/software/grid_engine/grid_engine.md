---
id: grid_engine
title: Grid Engine の概要
---

Grid Engine はジョブスケジューラあるいはリソーススケジューラと呼ばれるプログラムの一種で、
多数のユーザーが利用している環境で、各ユーザに自動的に計算リソース（CPU コアやメモリ）を割り当てるものです。
クラスタ計算機全体を一つの計算機と見たときの Operating System に相当する働きをします。

- 一般解析区画では、Grid Engine を用いています。
- 個人ゲノム解析区画では、Grid Engine または Slurm が利用可能です。

バイオインフォマティックス系では伝統的に Sun Grid Engine(SGE)が広く用いられてきました。SGE は Univa 社の Univa Grid Engine (UGE)を経て、現在は Altair 社がサポートしており Altair Grid Engine(AGE)となっています。（こういった経緯で、現在の AGE 公式マニュアルの中でも SGE, UGE, AGE, さらには総称としての Grid Engine という書き方が混在しています。）

参考資料

- [Sun Grid Engine for Dummies (2009)](http://web.archive.org/web/20151011170032/https://blogs.oracle.com/templedf/entry/sun_grid_engine_for_dummies)
- [「遺伝研スパコンを使った解析の並列化・高速化」 (IIBMP2021 データサイエンティスト養成セッション資料)](https://www.slideshare.net/oogasawa/pptx-251558577)
- [Altair Grid Engine 公式サイト](https://www.altair.com/grid-engine/)
    - [Introuctory Guide](https://2021.help.altair.com/2021.1/AltairGridEngine/8.7.0/IntroductionGE.pdf)
    - [User's Guide](https://2021.help.altair.com/2021.1/AltairGridEngine/8.7.0/UsersGuideGE.pdf)
    - [Administrator's Guide](https://2021.help.altair.com/2021.1/AltairGridEngine/8.7.0/AdminsGuideGE.pdf)



Grid Engine 各種コマンド(qsub, qlogin, qstat, qalter, qdel, qacct)の man ページもご参照ください。


## ジョブの種類

Grid Engine では以下の４種類のジョブが主に使われます。

- インタラクティブジョブ (interactive job)
- バッチジョブ (batch job)
- パラレルジョブ (parallel job)
- アレイジョブ (array job)

（その他のジョブについての説明など詳細については公式のマニュアルをご参照下さい。）


## アレイジョブ(Array Job)の使い方

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

 
## 並列ジョブ(Parallel Job)の使い方
 
 CPU コアを複数使用し長時間実行するプログラムを少数実行する場合は、並列ジョブ(parallel job)として実行してください。（多数実行する場合は並列ジョブのアレイジョブを使ってください。）
 
  
  
  並列ジョブ機能を利用するには（バッチジョブの項で説明したオプションに加えて）-pe オプションを用いて parallel environment を指定します。
  
  遺伝研スパコンで用意されている parallel environment の種類を以下に示します。
  
<table>
<tr>
<th width="300">parallel environment</th><th width="300">意味</th>
</tr>
<tr>
  <td>def_slot N</td>
  <td>同一計算ノード上に N 個の CPU コアを確保する。(N が計算ノード上の CPU コア数を超えている場合はジョブが始まらない。）</td>
 </tr>
 <tr>
  <td>mpi N</td>
  <td>複数の計算ノードにわたって N 個の CPU コアを確保する。その際に計算ノードは round-robin 方式で選択される。結果としてなるべく多数の計算ノードに散った形でコアが確保される。</td>
</tr>
<tr>
  <td>mpi-fillup N</td><td>複数の計算ノードにわたって N 個の CPU コアを確保する。その際に計算ノードの台数がなるべく少なくなるようコアが確保される。</td>
</tr>
<tr>
  <td>mpi_n N
  
  定義されている parallel environment は以下の通り。
  
  mpi_4, mpi_8, mpi_16, mpi_32, mpi_64,
  
  mpi_5, mpi_10, mpi_20</td>
  <td>複数の計算ノードにわたって N 個のコアを確保する。その際各計算ノード上に n=4,8,16, … コアを確保する。</td>
</tr>
</table>
		
コア数は数値を一つ指定するほか、範囲の指定もできます。

- ` qsub -pe mpi-fillup 100 -S /bin/bash job_script.sh `
- ` qsub -pe def_slot 20-100 -S /bin/bash job_script.sh `
- ` qsub -pe mpi 20- -S /bin/bash job_script.sh `

### 並列ジョブに対して、メモリ要求量を指定する際の注意事項

並列ジョブに対して-l s_vmem、-l mem_req を指定する場合、並列環境で指定した並列数と指定したメモリ量が掛け合わされた容量のメモリをシステム に要求してジョブが投入されます。

例えば、下記のように指定した場合、並列ジョブが使用するメモリ総量として 16×8=128GB を指定したことになります。 その点について注意した上で指定する要求メモリ量を決定してください。

```
-pe def_slot 16 -l s_vmem=8G -l mem_req=8G
-pe mpi-fillup 16 -l s_vem=8G -l mem_req=8G 
```



## GPU の使い方

[CUDA の使い方](/software/cuda)をご参照ください。




## ジョブの実行状態の確認 (qstat)

### ジョブの投入状況の確認

qsub で投入したジョブがジョブとして投入されたかを確認します。投入したジョブの状態確認には qstat コマンドを利用します。例えばジョブが 投入されていたとすれば以下のように表示されます。
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

 
 
 "qstat -j ジョブ ID"とすることで、ジョブの詳細情報を取得することができます。
 
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
 
数値の意味は以下のとおりです。

- USED :現在使用中のスロット数 
- RES  :事前予約(Advance Reservation)のスロット数
- AVAIL :使用可能なスロット数
- TOTAL :スロット総数
- aoACDS:計算ノードが aoACDS のいずれかの状態にあるスロット数
- cdsuE :計算ノードが cdsuE のいずれかの状態にあるスロット数 

詳細は`man qstat`で確認できます。


 
## ジョブの削除(qdel)

ジョブの終了を待たずにジョブを削除したい場合は qdel コマンドを使用します。 "qdel ジョブ ID"とします。自分が投入しているジョブをすべて削除したい場合は、"qdel -u ユーザ名"とすることで実行可能です。

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

ジョブの結果は、qsub のコマンドラインオプションで特に何も指定しなければ、ファイル名がジョブ名.o ジョブ ID のファイルににジョブの標準出力、ホームディレクトリ上の下記のファイル名でジョブの標準エラー出力 が出力されています。ファイルをご確認ください。
` ジョブ名.e ジョブ ID `

実行したジョブがどのぐらいのリソースを利用したか等の詳細情報については、qreport コマンドで確認することができます。
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

## Grid Engine 実行に必要な環境変数などのセットアップ

Grid Engine の qsub などのコマンドを実行できるようになるためには一連の環境変数のセットアップが必要である。一般解析区画のゲートウェイノードにログインするとこれらの環境変数が自動的に設定されるので通常は自分で設定する必要はありません。

Singularity コンテナから qsub する場合など特殊なケースでは明示的なセットアップが必要な場合があります。その場合には以下のコマンドを実行してください。

 
 
 User’s Manual にあるとおり、以下のように Grid Engine が提供しているシェルスクリプトを実行すると必要な環境変数がセットアップされます。
 
 ```
 export SGE_ROOT=/home/geadmin/UGER
 export SGE_CELL=uger
 source $SGE_ROOT/$SGE_CELL/common/settings.sh
 ```
 
