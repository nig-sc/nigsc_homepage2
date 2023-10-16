---
id: ga_queue
title: Grid Engineキューの種類
---


Grid Engineで管理されたノードはログインノードと計算ノードに大別されます。

- ログインノード(login node)はユーザがプログラム開発や、小規模で短時間で終わる計算をその場で対話的に行うための計算機です。
- 計算ノード(compute node)は、長時間かかる計算、大量のCPUやメモリを使う計算を行うための計算ノードです。

ログインノード、計算ノードに対する計算要求（これをジョブと呼びます）はGrid Engineでは待ち行列（キュー）を用いて管理されます。計算要求量が計算機のリソース量を超えている場合は、ジョブは待ち行列の中で待ち、計算機が空き次第Grid Engineにより自動的に実行されます。


遺伝研スパコンの一般解析区画では、ノードを構成する計算機の種類ごとにGrid Engineキューが設けられています。

<table>
<tr>
  <th>ノードの種別</th>
  <th>Grid Engineキューの名称</th>
  <th>ハードウェア種別</th>
  <th>台数・合計コア数</th>
</tr>
<tr>
  <td rowspan="2">ログインノード</td>
  <td>login.q</td>
  <td>Thinノード Type1b<br />
  (AMD EPYC7702, 128 CPU cores/node,<br />
  4GB memory/CPU core)
  </td>
  <td>3台・384コア</td>
</tr>
<tr>

  <td>login_gpu.q</td>
   <td>Thinノード Type2b <br />
   (Intel Xeon Gold 6136, 24 CPU cores/node, <br />
   16GB memory/CPU core)
   </td>
  <td>1台・24コア</td>
</tr>

<tr>
  <td rowspan="5">計算ノード</td>
  <td>epyc.q</td>
    <td>Thinノード Type1b<br />
  (AMD EPYC7702, 128 CPU cores/node, <br />
  4GB meVmory/CPU core)
  </td>
  <td>25台・3200コア</td>

</tr>
<tr>
  <td>intel.q</td>
  <td>Thinノード Type2a <br />
  (Intel Xeon Gold 6130, 32 CPU cores/node, <br />
  12GB memory/CPU core)
  </td>
  <td>32台・1024コア</td>
</tr>
<tr>
  <td>gpu.q</td>
     <td>Thinノード Type2b <br />
   (Intel Xeon Gold 6136, 24 CPU cores/node, <br />
   16GB memory/CPU core)
   </td>
  <td>7台・168コア</td>
</tr>
<tr>
  <td>short.q</td>
     <td>Thinノード Type1a <br />
   (AMD EPYC7501, 64 CPU cores/node,<br />
   8GB memory/CPU core)
   </td>
  <td>2台・128コア</td>
</tr>
<tr>
  <td>medium.q</td>
  <td>Mediumノード <br />
  (Intel Xeon Gold 6148, 80 CPU cores/node, <br />
  38.4GB moemory/CPU core)
  </td>
  <td>10台・800コア</td>
</tr>

</table>
