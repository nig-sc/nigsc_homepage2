---
id: pg_usage
title: "使い方（個人ゲノム解析区画）"
---


## 概要 {#introduction}

現時点では、個人ゲノム解析区画は全て課金によるサービスでありノード貸しとなっています。 ノード上では通常のLinuxシステムとして開発作業や解析作業を行うことが可能です。

ノードに対してジョブスケジューラとしてGrid EngineまたはSlurmをインストールしてお渡しすることも可能です。

- ジョブスケジューラ Grid Engineの使い方については[システム構成 > ソフトウェア > JobScheduler > Grid Engine の概要](/guides/old_docs/software/JobScheduler/grid_engine)をご参照ください。
- ジョブスケジューラ Slurmの使い方については[システム構成 > ソフトウェア > JobScheduler > Slurm の概要](/guides/software/JobScheduler/Slurm)をご参照ください。
- その他、利用可能なソフトウェアについては[システム構成 >ソフトウェア](/guides/software)をご参照ください。
- 具体的な解析方法などについては[活用方法](/advanced_guides/topics/advanced_guide_2020-2022)をご参照ください。


## セキュリティー上の注意 {#security-precautions}

Python等で解析を行う際、PyPI等のリポジトリに悪意のコードが含まれている場合があります。
これによる被害を最小限にするために、[biocontainersが提供するApptainer (Singularity)コンテナ](/guides/software/Container/BioContainers)のように、
ユーザ権限でのみ動作するコンテナを介して解析プログラムを利用することを推奨します。


参考資料
- &#x1f517;https://news.mynavi.jp/techplus/article/20230605-2695874/
- &#x1f517;https://www.reversinglabs.com/blog/when-python-bytecode-bites-back-who-checks-the-contents-of-compiled-python-files

## NVIDIA Parabricksの利用方法 {#usage-nvidia-parabrics}

[NVIDIA Clara Parabricks の利用方法](/advanced_guides/parabricks/)をご参照ください。


