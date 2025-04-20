---
id: ga_grid_engine_queue
title: Grid Engine キューの種類
---

:::danger これは古いドキュメントです

本ドキュメントは旧遺伝研スパコン(2019)のドキュメントであり、参考のため残しているものです。

現行遺伝研スパコン(2025)ではこのとおりには動作しませんのでご注意ください。
:::


Grid Engine で管理されたノードはインタラクティブノードと計算ノードに大別されます。

- インタラクティブノード(interactive node)はユーザがプログラム開発や、小規模で短時間で終わる計算をその場で対話的に行うための計算機です。
- 計算ノード(compute node)は、長時間かかる計算、大量の CPU やメモリを使う計算を行うための計算ノードです。

インタラクティブノード、計算ノードに対する計算要求（これをジョブと呼びます）は Grid Engine では待ち行列（キュー）を用いて管理されます。計算要求量が計算機のリソース量を超えている場合は、ジョブは待ち行列の中で待ち、計算機が空き次第 Grid Engine により自動的に実行されます。


遺伝研スパコンの一般解析区画では、ノードを構成する計算機の種類ごとに Grid Engine キューが設けられています。

<table>
<tr>
<th>ノードの種別</th>
<th>Grid Engine キューの名称</th>
<th>ハードウェア種別</th>
<th>台数・合計コア数</th>
</tr>
<tr>
<td rowspan="2">
インタラクティブノード
</td>
<td>
login.q
</td>
<td>
Thin ノード Type1b<br />
(AMD EPYC7702, 128 CPU cores/node,<br />
4GB memory/CPU core)
</td>
<td>
3 台・ 384 コア
</td>
</tr>
<tr>

<td>login_gpu.q</td>
<td>
Thin ノード Type2b <br />
(Intel Xeon Gold 6136, 24 CPU cores/node, <br />
16GB memory/CPU core)
</td>
<td>1 台・ 24 コア</td>
</tr>
<tr>
<td rowspan="6">計算ノード</td>
<td>epyc.q</td>
<td>
Thin ノード Type1b<br />
(AMD EPYC7702, 128 CPU cores/node, <br />
4GB meVmory/CPU core)
</td>
<td>25 台・ 3200 コア</td>

</tr>
<tr>
<td>intel.q</td>
<td>
Thin ノード Type2a <br />
(Intel Xeon Gold 6130, 32 CPU cores/node, <br />
12GB memory/CPU core)
</td>
<td>32 台・ 1024 コア</td>
</tr>
<tr>
<td>gpu.q</td>
<td>
Thin ノード Type2b <br />
(Intel Xeon Gold 6136, 24 CPU cores/node, <br />
16GB memory/CPU core)
</td>
<td>7 台・ 168 コア</td>
</tr>
<tr>
<td>short.q</td>
<td>
Thin ノード Type1a <br />
(AMD EPYC7501, 64 CPU cores/node,<br />
8GB memory/CPU core)
</td>
<td>2 台・ 128 コア</td>
</tr>
<tr>
<td>medium.q</td>
<td rowspan="2">
Medium ノード <br />
(Intel Xeon Gold 6148, 80 CPU cores/node, <br />
38.4GB moemory/CPU core)
</td>
<td rowspan="2">10 台・ 800 コア</td>
</tr>
<tr>
<td>medium-ubuntu.q</td>
</tr>

</table>


