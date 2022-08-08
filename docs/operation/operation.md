---
id: operation
title: ジョブの蓄積状況と予想される待ち時間
---


このグラフは、Grid Engine の各キューに対するジョブの蓄積状況と、
そこから予想される、ジョブの待ち時間(今投入したジョブが実行開始されるまで待ち時間の予測値)を示しています。

- 左図（折れ線グラフ）: キューの中で待ち状態にあったジョブのうち、実行開始したジョブの一時間あたりの数。
- 中央図（棒グラフ）：現在実行中のジョブの数(赤色)、および、現在キューの中で待ち状態にあるジョブの量（青色）。
- 右図 : 予測される待ち時間[hours] = 現在待ち状態にあるジョブの量[slots] / 実行開始したジョブの一時間あたりの量[slots/hour]

ジョブの量は、ジョブが占めるスロットの数として計算しています。

<img alt="job accumlation status" src="https://ddbj.nig.ac.jp/nigsc/sc_GraphStack_1.png" />

データは 1 時間おきに更新されます。


### 参考: スロットの定義

<table>
<tr>
<th>Compute node type</th><th>Definition of 1 slot</th>
</tr>
<tr>
<td>Thin Type 1a</td><td>1 CPU core, 8GB memory</td>
</tr>
<tr>
<td>Thin Type 1b</td><td>1 CPU core, 4GB memory</td>
</tr>
<tr>
<td>Thin Type 2a</td><td>1 CPU core, 12GB memory</td>
</tr>
<tr>
<td>Thin Type 2b</td><td>1 CPU core, 16GB memory</td>
</tr>
<tr>
<td>Medium</td><td>1 CPU core, 38.4GB memory</td>
</tr>
<tr>
<td>Fat</td><td>1 CPU core, 47.2GB memory</td>
</tr>

</table>


ジョブが消費するスロット数は、要求された CPU コア数, memory 量の大きい方で計算されます。

例えば 

- 3 CPU cores, 2GB memory を要求したジョブの要求スロット数は 3 と計算されます。
- 1 CPu core, 12 GB memory を 一般解析区画の AMD キュー(Thin Type 1a) で要求すると、要求スロット数は 2 と計算されます。

