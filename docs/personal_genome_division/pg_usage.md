---
id: pg_usage
title: "使い方（個人ゲノム解析区画）"
---


## 概要

現時点では、個人ゲノム解析区画は全て課金によるサービスでありノード貸しとなっています。 ノード上では通常のLinuxシステムとして開発作業や解析作業を行うことが可能です。

ノードに対してジョブスケジューラとしてGrid EngineまたはSlurmをインストールしてお渡しすることも可能です。

- ジョブスケジューラ Grid Engineの使い方については[<u>システム構成 > ソフトウェア > Grid Engine</u>](/software/grid_engine/)をご参照ください。
- ジョブスケジューラ Slurmの使い方については[<u>システム構成 > ソフトウェア > Slurm</u>](/software/slurm)をご参照ください。
- その他、利用可能なソフトウェアについては[<u>システム構成>ソフトウェア</u>](../software/software.md)をご参照ください。
- 具体的な解析方法などについては[<u>活用方法</u>](../advanced_guides/advanced_guide_2023.md)をご参照ください。


## セキュリティー上の注意

Python等で解析を行う際、PyPI等のリポジトリに悪意のコードが含まれている場合があります。
これによる被害を最小限にするために、[<u>biocontainersが提供するApptainer (Singularity)コンテナ</u>](/software/BioContainers)のように、
ユーザ権限でのみ動作するコンテナを介して解析プログラムを利用することを推奨します。


参考資料
- &#x1f517;<u>https://news.mynavi.jp/techplus/article/20230605-2695874/</u>
- &#x1f517;<u>https://www.reversinglabs.com/blog/when-python-bytecode-bites-back-who-checks-the-contents-of-compiled-python-files</u>

## NVIDIA Parabricksの利用方法

[<u>NVIDIA Clara Parabricks の利用方法</u>](/advanced_guides/parabricks/)をご参照ください。
