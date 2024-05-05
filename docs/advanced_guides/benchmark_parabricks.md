---
id: benchmark_parabricks
title: ベンチマーク(NVIDIA Parabricks)
---

## 概要
本ページでは、NVIDIA Parabricks (以降 Parabricks と呼ぶ) というゲノム解析ツールの性能を，最新の NVIDIA H100 SXM 80GB GPU を 8 基搭載したハードウェア環境で詳細に検証した結果を掲載する.
我々の実験では，臨床研究で用いられる典型的な全ゲノムシークエンスデータセットを使用し，計算時間 と出力結果の妥当性を評価した.その結果，NVIDIA H100 GPU を搭載したシステムでは，従来の V100 を搭載したシステムと比べて計算速度を 2.3 倍以上倍高速化できる と示された.

## 検証GPU環境
アプリケーションの実効性能比較のために，H100 搭載 ノードの他に V100 搭載ノードも用いて性能評価を行った. 検証対象の H100 搭載ノードは，さくらインターネットが 提供する高火力 PHY のベアメタルサーバ*2 (以降 高火力 PHY) で実行され，V100 搭載ノードは，遺伝研スーパー コンピュータシステムが提供する Thin 計算ノード (Type 2b)*3 (以降 遺伝研 igt) で実行した. いずれも，単体のノー ドとして使用され，複数台のノード構成によるアプリケー ション性能評価は行っていない.
この二つの異なる環境下で運用されるノード間で，GPU 関連ドライバー等のバージョン違いなどに起因する実行性 能への影響を防ぐ目的で，これまで対象アプリケーション の実行実績のある遺伝研 igt の環境設定を検証条件として 採用し，高火力 PHY 上での環境構築を行った. 検証に利 用した遺伝研 igt と高火力 PHY の GPU ノードのハード ウェア環境およびソフトウェア環境を表 1 に示す.

表 1 検証ノード構成
| | 遺伝研igt | 高火力PHY|
|----|----|----|
|利用環境|マネージドクラスター|ベアメタルサーバ|
|Hardware構成|
|CPU (総コア数)|Intel Xeon Gold 6136 3.0GHz x 2 基 (24)|Intel Xeon Platinum 8480 2.0GHz x 2 基 (112)|
|メモリー|DDR4 384GB|DDR5 2.0TB|
|GPU (FP64)|NVIDIA V100 SXM2 16GB (7.8 TFlops) x 4 基|NVIDIA H100 SXM5 80GB (33.5 Tflops ) x 8 基|
|GPU 間接続|NVLink Hybid Cube Mesh|NVSwitch Fabric|
|システムディスク|NVMe SSD 1.6TB x 1 枚|NVMe SSD 960GB x 2 枚 (RAID1 構成)|
|データディスク|NVMe SSD 3.2TB x 1 枚|NVMe 7.68TB x 4 枚|
|Software 構成 |
|OS|Ubuntu Server 22.04 LTS|Ubuntu Server 22.04 LTS |
|GPU ドライバー|530.30.02|530.30.02|
|CUDA|12.1|12.1|
|Fabric Manager|N/A|UP|
|Singularity CE|4.0.0|4.0.0|
 

1. ccc
2. ddd
3. eee

