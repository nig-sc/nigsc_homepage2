---
id: pg_slurm_partition
title: Slurmパーティションの構成(個人ゲノム解析区画)
---

個人ゲノム解析区画ではGPUノードのためのSlurmパーティションとGPUノード用のインタラクティブジョブ用パーティションを用意しています。GPUノード用のインタラクティブジョブ用パーティションはエディタやシェルなどのコマンドの利用などジョブを投入する準備のための対話的な利用のための領域です。


<table>
<tr>
<th>ノードの種別</th>
<th>Slurmパーティションの名称</th>
<th>ハードウェア種別</th>
<th>台数・合計コア数</th>
</tr>
<tr>
<td>
インタラクティブノード
</td>
<td>
login
</td>
<td>
HPC CPU最適化ノード Type 1<br />
(AMD EPYC9654, 192 CPU cores/node, 1536GB<br />
8GB memory/CPU core)
</td>
<td>
1 台・xxx コア 
</td>
</tr>

<tr>
<td rowspan="6">バッチ計算ノード</td>
<td>l40s</td>
<td>
GPUノード Type 2<br />
(AMD EPYC 9334, 64 CPU cores/node, <br />
12GB memory/CPU core), 8GPUs/node
</td>
<td>3 台・xxxコア・合計24 GPU</td>
</tr>

</table>




