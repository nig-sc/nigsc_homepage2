---
id: ga_introduction
title: "概要（一般解析区画)"
---


## 一般解析区画のシステム構成

遺伝研スパコン一の般解析区画は多数の計算機（これらをノードと呼びます）を束ねたクラスタ構成となっています。

ユーザーからの計算要求に対してクラスタ計算機システム上の適切な計算機を割り当てる仕事をするのがジョブスケジューラと呼ばれるプログラムです。
遺伝研スパコンでは、バイオインフォマティックス系で広く用いられてきたSun Grid Engineの後継であるGrid Engineをジョブスケジューラとして使っています。

Grid Engineで管理された全てのノードは大容量高速ストレージシステム (Lustre FS)をマウントしており、ユーザーのホームディレクトリは全てのノードから同じようにアクセスできます。


![](GA_division.png)


## Grid Engineキューの種類

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
  <td>login</td>
  <td>Thinノード Type1b<br />
  (AMD EPYC7702, 128 CPU cores/node,<br />
  4GB memory/CPU core)
  </td>
  <td>3台・384コア</td>
</tr>
<tr>

  <td>login_gpu</td>
   <td>Thinノード Type2b <br />
   (Intel Xeon Gold 6136, 24 CPU cores/node, <br />
   16GB memory/CPU core)
   </td>
  <td>1台・24コア</td>
</tr>

<tr>
  <td rowspan="5">計算ノード</td>
  <td>epyc</td>
    <td>Thinノード Type1b<br />
  (AMD EPYC7702, 128 CPU cores/node, <br />
  4GB meVmory/CPU core)
  </td>
  <td>25台・3200コア</td>

</tr>
<tr>
  <td>intel</td>
  <td>Thinノード Type2a <br />
  (Intel Xeon Gold 6130, 32 CPU cores/node, <br />
  12GB memory/CPU core)
  </td>
  <td>32台・1024コア</td>
</tr>
<tr>
  <td>gpu</td>
     <td>Thinノード Type2b <br />
   (Intel Xeon Gold 6136, 24 CPU cores/node, <br />
   16GB memory/CPU core)
   </td>
  <td>7台・168コア</td>
</tr>
<tr>
  <td>short</td>
     <td>Thinノード Type1a <br />
   (AMD EPYC7501, 64 CPU cores/node,<br />
   8GB memory/CPU core)
   </td>
  <td>2台・128コア</td>
</tr>
<tr>
  <td>medium</td>
  <td>Mediumノード <br />
  (Intel Xeon Gold 6148, 80 CPU cores/node, <br />
  38.4GB moemory/CPU core)
  </td>
  <td>10台・800コア</td>
</tr>

</table>







