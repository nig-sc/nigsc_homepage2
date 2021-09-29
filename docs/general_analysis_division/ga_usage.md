---
id: ga_usage
title: 使用方法（一般解析区画）
---



ログインノード上では通常のLinuxシステムとして開発作業や解析作業を行うことが可能です。

- 開発環境などについては[ソフトウェア](/software/software)の「開発環境・ライブラリ」の項目を参考にしてください。
- ログインノードでの作業は最長3日間です。qloginしてから3日経つと強制的にログアウトされます。


長時間かかる計算、CPUやメモリを大規模に使う計算は、`qsub`コマンドにより計算ノード(compute node)上のバッチジョブ、並列ジョブ、アレイジョブとして実行してください。

- [ジョブスケジューラ Univa Grid Engine (UGE)の使い方についてはこちら](/software/univa_grid_engine)をご参照ください。
- 遺伝研スパコンで用意されているUGEキューについては[概要（一般解析区画)](/general_analysis_division/ga_introduction)をご参照ください。
- その他、利用可能なソフトウェアについては[システム構成>ソフトウェア](/software/software)をご参照ください。
- 具体的な解析方法などについては[活用方法](/advance_guides/advanced_guide)をご参照ください。
