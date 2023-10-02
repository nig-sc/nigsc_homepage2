---
id: operation
title: ジョブの蓄積状況と予想される待ち時間
---


このグラフは、Grid Engine の各キューに対するジョブの蓄積状況と、
そこから予想される、ジョブの待ち時間(今投入したジョブが実行開始されるまで待ち時間の予測値)を示しています。

下図のqueueing timeが「ジョブの待ち時間」の推定値です。
- ジョブの待ち時間は、キューにたまっているジョブの量を、一時間に捌けたジョブの量で割ることで推定しています。
- キューにたまっているジョブの量は、棒グラフの青色部分の大きさで表されています。
- 1時間に捌けたジョブの量は、折れ線グラフの縦軸（10分間に捌けたジョブの量）12時間の平均値に6をかけた値から求めています。

ジョブの量は、ジョブが占めるスロットの数として計算しています。

<img alt="job accumlation status" src="https://ddbj.nig.ac.jp/nigsc/sc_GraphStack_1.png" />


- 左図（折れ線グラフ）: キューの中で待ち状態にあったジョブのうち、実行開始したジョブの一時間あたりの量
- 右図（棒グラフ）：
    - 赤：現在実行中のジョブの量
    - 青：現在キューの中で待ち状態にあるジョブの量
    - 緑：空きリソース量
    - ピンク：エラー状態のジョブの量

データは 10 分おきに更新されます。


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

