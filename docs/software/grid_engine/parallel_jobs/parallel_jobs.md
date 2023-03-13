---
id: parallel_jobs
title: パラレルジョブ
---

 
 CPU コアを複数同時に使用し、長時間実行するプログラムを少数実行する場合は、並列ジョブ(parallel job)として実行してください。（多数実行する場合は並列ジョブのアレイジョブを使ってください。）
 
  
  
  並列ジョブ機能を利用するには（バッチジョブの項で説明したオプションに加えて）`-pe` オプションを用いて parallel environment を指定します。
  
## パラレルジョブの種類 (概要)


  遺伝研スパコンで用意されている parallel environment の種類を以下に示します。
  
<table>
<tr>
<th width="300">parallel environment</th><th width="300">意味</th>
</tr>
<tr>
  <td>`def_slot N`</td>
  <td>同一計算ノード上に N 個の CPU コアを確保する。(N が計算ノード上の CPU コア数を超えている場合はジョブが始まらない。）</td>
 </tr>
 <tr>
  <td>`mpi N`</td>
  <td>複数の計算ノードにわたって N 個の CPU コアを確保する。その際に計算ノードは round-robin 方式で選択される。結果としてなるべく多数の計算ノードに散った形でコアが確保される。</td>
</tr>
<tr>
  <td>`mpi-fillup N`</td><td>複数の計算ノードにわたって N 個の CPU コアを確保する。その際に計算ノードの台数がなるべく少なくなるようコアが確保される。</td>
</tr>
<tr>
  <td>`pe_n N`
  
  定義されている parallel environment は以下の通り。<br/>
  
  `pe_4`, `pe_8`, `pe_16`, `pe_32`, `pe_64`,
  
  `pe_5`, `pe_10`, `pe_20`</td>
  <td>複数の計算ノードにわたって N 個のコアを確保する。その際各計算ノード上に n=4,8,16, … コアを確保する。</td>
</tr>
</table>
		
コア数は数値を一つ指定するほか、範囲の指定もできます。

- ` qsub -pe mpi-fillup 100 -S /bin/bash job_script.sh `
- ` qsub -pe def_slot 20-100 -S /bin/bash job_script.sh `
- ` qsub -pe mpi 20- -S /bin/bash job_script.sh `

### 並列ジョブに対して、メモリ要求量を指定する際の注意事項

並列ジョブに対して`-l s_vmem`、`-l mem_req` を指定する場合、並列環境で指定した並列数と指定したメモリ量が掛け合わされた容量のメモリをシステム に要求してジョブが投入されます。

例えば、下記のように指定した場合、並列ジョブが使用するメモリ総量として 16×8=128GB を指定したことになります。 その点について注意した上で指定する要求メモリ量を決定してください。

```
-pe def_slot 16 -l s_vmem=8G -l mem_req=8G
-pe mpi-fillup 16 -l s_vem=8G -l mem_req=8G 
```


## パラレルジョブの種類 (詳細)

### CPUとメモリの確保の様子

先程までの例は、１個のCPUコアと、それに対応するメモリを指定する場合です。

qsubコマンド実行時にメモリ量を指定しない場合(デフォルト値)、例えば、Thinノード Type1aの場合は、CPUコア1 個あたり8GBのメモリが割り当てられます。
(計算機の種類、キューの種類によって異なります。)

![](/img/software/grid_engine/pe_1.png)


`def_slot`は、必ず一台の計算機にリソースを取ろうとします。下図の例だと、メモリは1CPUコア当たり20GB、合計20GB x 2コア = 40GBが一台の計算機の中に確保されます。

![](/img/software/grid_engine/pe_2_JP.png)

`mpi`は、複数台の計算機に、なるべく均一にリソースを確保しようとします。下図の例だと、例えば、`mpi 2`と書くと、メモリは1CPUコア当たり20GB、各計算機に 1コアx20GB = 20GB ずつ、合計 20GB x 2台 = 40GB 確保されます。

![](/img/software/grid_engine/pe_3_JP.png)

`mpi-fillup`は、複数台の計算機の中で、なるべく1台の計算機にリソースを詰めて確保しようとします。入りきらない場合は、別の計算機にリソースを確保しようとします。これが、`def_slot`との違いです。下図の例だと、1台につきメモリ容量 64GBの計算機が2台ある場合、例えば、`mpi-fillup 4`と書くと、メモリは1CPUコア当たり20GB、2台の計算機のうち、どちらか一方の計算機に 3コア×20GB = 60GB、もう1台に1コア × 20GB = 20GB、合計 20GB × 4コア = 80GB 確保されます。

![](/img/software/grid_engine/pe_4_JP.png)

`pe_N`は、例えば`pe_4 2`と書くと2台の計算機に4コアずつリソースを取ります。メモリの取られ方は下図の通りだと１CPUコア当たり8GB、各計算機に 4コアx8GB = 32GB ずつ、合計 32GB x 2台 = 64GB 取られます。

![](/img/software/grid_engine/pe_5_JP.png)


### 並列ジョブでどの計算ノードが確保されたかを知る方法

```
$ qstat
job-ID     prior   name       user      state submit/start at     queue   jclass       slots ja-task-ID  
------------------------------------------------------------------------------------------------------
 13862312 0.25410 QLOGIN     you         r     09/25/2021 23:34:49 login.q@at138        1         
 13862486 0.25194 QLOGIN     you         r     09/26/2021 10:15:28 login.q@at139        1         
 13862667 0.25084 QLOGIN     you         r     09/26/2021 15:40:40 login.q@at137        1         
 13862992 0.25039 an_example you         r     09/26/2021 18:54:09 epyc.q@at143         2         
 13862987 0.25020 an_example you         r     09/26/2021 19:44:58 epyc.q@at154         1         
 13862989 0.25040 an_example you         qw    09/26/2021 18:50:50                      2   

$ qstat -j 13862992 | grep exec_host_list
exec_host_list        1:    at143:2     
```

確保された計算ノードがどれであるかは`qstat -j <ジョブ番号>`で表示される`exec_host_list`の行から分かります。
