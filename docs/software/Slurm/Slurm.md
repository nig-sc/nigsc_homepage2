---
id: Slurm
title: Slurm の概要
---

Slurm はジョブスケジューラあるいはリソーススケジューラと呼ばれるプログラムの一種で、 多数のユーザーが利用している環境で、各ユーザに自動的に計算リソース（CPU コアやメモリ）を割り当てるものです。 
- 一般解析区画では、Grid Engine を用いています。
- 個人ゲノム解析区画では、Grid Engine または Slurm が利用可能です。

Slurmはオープンソースソフトウェアのジョブスケジューラで、開発元の一つである米国SchedMD社からの商用サポートも提供されているソフトウェアです。米国LLNL（ローレンスリバモア国立研究所）を初め、国内外の大規模クラスタ型スーパーコンピュータでの数多くの利用実績があるソフトウェアです。複数のパブリッククラウド上でもHPC向けのジョブスケジューラとして利用可能となっています。

参考資料

- [SchedMD(開発元)のQuick Start User Guide(英語)](https://slurm.schedmd.com/quickstart.html)
- [Slurm のオンラインマニュアルページ](https://slurm.schedmd.com/man_index.html)
- [Slurmのコマンドのサマリ表](https://slurm.schedmd.com/pdfs/summary.pdf)
- [SchedMD(開発元)のTutorial(英語)](https://slurm.schedmd.com/tutorials.html)
- [Rosetta Stone of Workload Manager](https://slurm.schedmd.com/rosetta.pdf)


## ジョブの種類

個人ゲノム解析区画のSlurmでは以下の3種類のジョブが主に使われます。(Slurmのドキュメントではパラレルジョブという分類が明示的にはないですが、遺伝研スパコンのAGEの説明との対応として別に分類して説明します)

- [インタラクティブジョブ (interactive job)](/software/Slurm/interactive_jobs.md)
  - スパコンを対話的に利用する場合に用いる。
- [バッチジョブ (batch job)](/software/Slurm/batch_jobs.md)
  - CPU コアを 1 コアだけ使用するプログラムを少数実行する場合に用いる。
- [パラレルジョブ (parallel job)](/software/Slurm/parallel_jobs.md )
  - CPU コアを複数同時に使用するプログラムを少数実行する場合に用いる。
- [アレイジョブ (array job)](/software/Slurm/array_jobs.md)
  - バッチジョブまたはパラレルジョブを多数順次実行する場合に用いる。

（その他のジョブについての説明など詳細については公式のマニュアルをご参照下さい。）

## その他のコマンド

主に使うコマンドは以下のとおりです。

- squeue
    - ジョブの現在の状況を確認する。
- scancel
    - ジョブを削除する。
- scontrol
    - ジョブの設定を変更する。

詳細は[その他のコマンド](/software/Slurm/other_commands)の項および公式マニュアルをご参照下さい。

## ジョブの実行が開始されない場合

1. ジョブの設定が間違っていないかを、主に以下の点で確認してください。
    - ジョブの記述スクリプトで要求している計算リソース量が間違っていないか確認してください。計算ノードの１ノードあたりのメモリ量、物理CPUコア数を超えて要求している記述になっていないかを確認してください。
    - 実行可能時間が、パーティションの設定を超えた要求になっていないかを確認してください。
2. スパコンの混雑状況を確認する。
    - sinfo等のコマンドで利用状況を参照してください。(参照[クラスタ全体の混雑状況の確認方法](/software/Slurm/other_commands#クラスタ全体の混雑状況の確認方法sinfosqueue))
    - squeueコマンドのSTフィールドで表示されているジョブの状態によって状況を判断してください。(参照[ジョブの状態説明](/software/Slurm/other_commands#ジョブの状態説明stフィールド))
    - squeueコマンドのNODELIST(REASON)フィールドで表示されている待ち状態の理由を確認してください。(参照[ジョブが実行されない理由の確認方法](/software/Slurm/other_commands#ジョブが実行されない理由の確認方法))





















