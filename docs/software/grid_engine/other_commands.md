---
id: other_commands
title: その他のコマンド
---



## GPU の使い方 {#using-gcp}

[CUDA の使い方](/software/cuda)をご参照ください。




## ジョブの実行状態の確認 (qstat) {#qstat}

### ジョブの投入状況の確認  {#qstat#check-job-status}

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
 
 
## クラスタ全体の混雑状況の確認方法 {#cluster-congestion-check}
 
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


 
## ジョブの削除(qdel) {#qdel}

ジョブの終了を待たずにジョブを削除したい場合は qdel コマンドを使用します。 "qdel ジョブ ID"とします。自分が投入しているジョブをすべて削除したい場合は、"qdel -u youraccountname"とすることで実行可能です。

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


## ジョブの実行条件の変更 (qalter) {#qalter}

qalter で 待ち行列（キュー）に投入（サブミット）されたバッチジョブが使用するメモリ量等を変更することが出来ます。ジョブのメモリ要求量を 200GB から 100GB に変更する場合は、まず、qstat でジョブの hard_resource_list を確認します。qalter による hard_resource_list の変更は hard_resource_list 全体を上書きするため、メモリ要求量とメモリ以外の hard_resource_list も合わせて指定して変更します。

```
[username@at027 ~]$ qstat -j 25453855 |grep hard_resource_list
hard_resource_list:         mem_req=100G,s_vmem=100G

[username@at027 ~]$ qalter -l  d_rt=600,mem_req=100G,s_rt=600,s_stack=10240K,s_vmem=100G,short=TRUE 25453855
modified hard resource list of job 25453855
modified environment of job 25453855

[username@at027 ~]$ qstat -j 25453855 |grep hard_resource_list
hard_resource_list:         d_rt=600,mem_req=100G,s_rt=600,s_stack=10240K,s_vmem=100G,short=TRUE
```

## ジョブの結果の確認 {#check-job-result}

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

## Grid Engine 実行に必要な環境変数などのセットアップ  {#setup-env}

Grid Engine の qsub などのコマンドを実行できるようになるためには一連の環境変数のセットアップが必要である。一般解析区画のゲートウェイノードにログインするとこれらの環境変数が自動的に設定されるので通常は自分で設定する必要はありません。

Singularity コンテナから qsub する場合など特殊なケースでは明示的なセットアップが必要な場合があります。その場合には以下のコマンドを実行してください。

 
 
 User’s Manual にあるとおり、以下のように Grid Engine が提供しているシェルスクリプトを実行すると必要な環境変数がセットアップされます。
 
 ```
 export SGE_ROOT=/home/geadmin/UGER
 export SGE_CELL=uger
 source $SGE_ROOT/$SGE_CELL/common/settings.sh
 ```
 
