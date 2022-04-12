---
id: grid_engine
title: Grid Engine の概要
---

Grid Engine はジョブスケジューラあるいはリソーススケジューラと呼ばれるプログラムの一種で、
多数のユーザーが利用している環境で、各ユーザに自動的に計算リソース（CPU コアやメモリ）を割り当てるものです。
クラスタ計算機全体を一つの計算機と見たときの Operating System に相当する働きをします。

- 一般解析区画では、Grid Engine を用いています。
- 個人ゲノム解析区画では、Grid Engine または Slurm が利用可能です。

バイオインフォマティックス系では伝統的に Sun Grid Engine(SGE)が広く用いられてきました。SGE は Univa 社の Univa Grid Engine (UGE)を経て、現在は Altair 社がサポートしており Altair Grid Engine(AGE)となっています。（こういった経緯で、現在の AGE 公式マニュアルの中でも SGE, UGE, AGE, さらには総称としての Grid Engine という書き方が混在しています。）

参考資料

- [Sun Grid Engine for Dummies (2009)](http://web.archive.org/web/20151011170032/https://blogs.oracle.com/templedf/entry/sun_grid_engine_for_dummies)
- [「遺伝研スパコンを使った解析の並列化・高速化」 (IIBMP2021 データサイエンティスト養成セッション資料)](https://www.slideshare.net/oogasawa/pptx-251567866)
- [Altair Grid Engine 公式サイト](https://www.altair.com/grid-engine/)
    - [Introuctory Guide](https://2021.help.altair.com/2021.1/AltairGridEngine/8.7.0/IntroductionGE.pdf)
    - [User's Guide](https://2021.help.altair.com/2021.1/AltairGridEngine/8.7.0/UsersGuideGE.pdf)
    - [Administrator's Guide](https://2021.help.altair.com/2021.1/AltairGridEngine/8.7.0/AdminsGuideGE.pdf)



Grid Engine 各種コマンド(qsub, qlogin, qstat, qalter, qdel, qacct)の man ページもご参照ください。


## ジョブの種類

Grid Engine では以下の４種類のジョブが主に使われます。

- [インタラクティブジョブ (interactive job)](/software/grid_engine/interactive_jobs)
    - スパコンを対話的に利用する場合に用いる。
- [バッチジョブ (batch job)](/software/grid_engine/batch_jobs)
    - CPU コアを 1 コアだけ使用するプログラムを少数実行する場合に用いる。
- [パラレルジョブ (parallel job)](/software/grid_engine/parallel_jobs)
    - CPU コアを複数同時に使用するプログラムを少数実行する場合に用いる。
- [アレイジョブ (array job)](/software/grid_engine/array_jobs)
    - バッチジョブまたはパラレルジョブを多数順次実行する場合に用いる。

（その他のジョブについての説明など詳細については公式のマニュアルをご参照下さい。）

## その他のコマンド

主に使うコマンドは以下のとおりです。

- qstat
    - ジョブの現在の状況を確認する。
- qdel
    - ジョブを削除する。
- qalter
    - ジョブの設定を変更する。

詳細は[その他のコマンド](/software/grid_engine/other_commands)の項および公式マニュアルをご参照下さい。

## ジョブの実行が開始されない場合

1. ジョブの設定が間違っていないか確認する。
    - 設定が適切化チェックするプログラムを提供しています。[qsub_beta の使い方](/software/qsub_beta)をご参照下さい。
2. スパコンの混雑状況を確認する。
    - [稼働状況概要](/operation)の項で現在の稼働状況と混み具合が確認できます。

