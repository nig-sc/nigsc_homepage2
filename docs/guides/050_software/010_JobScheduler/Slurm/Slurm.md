---
id: Slurm
title: Slurm の使い方
---



Slurm はジョブスケジューラあるいはリソーススケジューラと呼ばれるプログラムの一種で、 多数のユーザーが利用している環境で、各ユーザに自動的に計算リソース（CPU コアやメモリ）を割り当てるものです。 

Slurm（Simple Linux Utility for Resource Management）は、ローレンス・リバモア国立研究所（LLNL: Lawrence Livermore National Laboratory） で開発された、Linux向けに設計された強力なジョブスケジューラであり、特にHPC（High-Performance Computing）環境で広く使用されています。もともと大規模な並列計算を効率的に管理するために開発され、多くのスーパーコンピュータや研究機関で採用されています。オープンソースソフトウェアとして公開されており、無料で使用可能です。また、主要なLinuxディストリビューション向けにパッケージとして提供されていることが多く、研究室のサーバにも容易に導入できます。


参考資料

- [SchedMD(開発元)のQuick Start User Guide(英語)](https://slurm.schedmd.com/quickstart.html)
- [Slurm のオンラインマニュアルページ](https://slurm.schedmd.com/man_index.html)
- [Slurmのコマンドのサマリ表](https://slurm.schedmd.com/pdfs/summary.pdf)
- [SchedMD(開発元)のTutorial(英語)](https://slurm.schedmd.com/tutorials.html)
- [Rosetta Stone of Workload Manager](https://slurm.schedmd.com/rosetta.pdf)


## ジョブの種類 {#types-of-jobs}

一般にジョブスケジューラでは以下の4種類のジョブが主に使われます。
Slurmに関してもこれに従って説明します。

- [インタラクティブジョブ (interactive job)](/guides/software/JobScheduler/Slurm/interactive_jobs)
  - スパコンを対話的に利用する場合に用いる。
- [バッチジョブ (batch job)](/guides/software/JobScheduler/Slurm/batch_jobs)
  - CPU コアを 1 コアだけ使用するプログラムを少数実行する場合に用いる。
- [パラレルジョブ (parallel job)](/guides/software/JobScheduler/Slurm/parallel_jobs)
  - CPU コアを複数同時に使用するプログラムを少数実行する場合に用いる。
- [アレイジョブ (array job)](/guides/software/JobScheduler/Slurm/array_jobs)
  - バッチジョブまたはパラレルジョブを多数順次実行する場合に用いる。

その他のジョブについての説明など詳細については公式のマニュアルをご参照下さい。

## その他のコマンド {#other-commands}

主に使うコマンドは以下のとおりです。

- squeue
    - ジョブの現在の状況を確認する。
- scancel
    - ジョブを削除する。
- scontrol
    - ジョブの設定を変更する。

詳細は[その他のコマンド](/guides/software/JobScheduler/Slurm/other_commands)の項および公式マニュアルをご参照下さい。

## ジョブの実行が開始されない場合 {#when-a-job-does-not-start}

1. ジョブの設定が間違っていないかを、主に以下の点で確認してください。
    - ジョブの記述スクリプトで要求している計算リソース量が間違っていないか確認してください。計算ノードの１ノードあたりのメモリ量、物理CPUコア数を超えて要求している記述になっていないかを確認してください。
    - 実行可能時間が、パーティションの設定を超えた要求になっていないかを確認してください。
2. スパコンの混雑状況を確認する。
    - sinfo等のコマンドで利用状況を参照してください。(参照[クラスタ全体の混雑状況の確認方法](/guides/software/JobScheduler/Slurm/other_commands/#checking-the-overall-congestion-of-the-cluster-sinfo-squeue))
    - squeueコマンドのSTフィールドで表示されているジョブの状態によって状況を判断してください。(参照[ジョブの状態説明](/guides/software/JobScheduler/Slurm/other_commands/#job-status-description-st-field))
    - squeueコマンドのNODELIST(REASON)フィールドで表示されている待ち状態の理由を確認してください。(参照[ジョブが実行されない理由の確認方法](/guides/software/JobScheduler/Slurm/other_commands#how-to-check-the-reason-why-a-job-is-not-starting))






















