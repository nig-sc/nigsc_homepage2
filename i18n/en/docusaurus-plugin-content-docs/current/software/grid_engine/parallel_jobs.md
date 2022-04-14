---
id: parallel_jobs
title: パラレルジョブ
---

 
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

