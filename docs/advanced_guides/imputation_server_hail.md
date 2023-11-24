---
id: imputation_server_hail
title: NBDC-DDBJインピュテーションサーバ (beta) チュートリアル3、hail を用いた PRS 計算
---

<img
  src={require('./imputationserver.logo_color.png').default}
  alt=''
  style={{ width: '200px' }}
/>

本チュートリアル3ではインピューテーションサーバのインピューテーション結果を
[&#x1f517;<u>hail</u>](https://hail.is) で解析するための環境構築方法を説明します。

まずは guacamole の仮想マシンにログインください。



## conda環境がない場合

もしすでに conda 環境がある場合、次の`minicondaのインストール`はスキップして、 `condaで環境作成` に進んでください。

### minicondaのインストール

Anacondaは利用目的によっては有償ライセンスを必要とするため、
以降では miniconda と `conda-forge` を用います。

```
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
chmod 755 ./Miniconda3-latest-Linux-x86_64.sh
./Miniconda3-latest-Linux-x86_64.sh
```

一旦、作業環境ターミナルやSSHから抜けて、入り直します。

condaが使えることを確認します。

```
which conda
conda --version
```

### conda 環境の作成

以下の方法で Jupyter と Hail の環境を作ります。

```
conda create -c conda-forge -n hail-python37-openjdk8 python=3.7 openjdk=8
```

開発環境のアクティベートは以下のように行います。

```
conda activate hail-python37-openjdk8
```

conda環境のdeactivate(抜ける場合)は、下記を行います。

```
conda deactivate
```

## Jupyterとhailのインストール

Jupyter と hail のための conda 環境で、以下のコマンドを実行します。


```
pip install hail
pip install jupyter
```

以下のコマンドも必要です。これは hail 用にメモリを 48G 確保することを意味します。
このメモリが少ないと hail はアウトオブメモリーエラーを吐き、計算は再開できなくなります。

```
export PYSPARK_SUBMIT_ARGS='--driver-memory 48g --executor-memory 48g pyspark-shell'
```

チュートリアルのノートブック用に、以下の作業ディレクトリ作成も行います。

### ディレクトリの作成

```
mkdir ~/prs-on-hail
```

### Jupyter起動

```
jupyter notebook --notebook-dir=~/prs-on-hail
```

実際にスパコンで行う場合は、[<u>Jupyter Notebookの使い方のページ</u>](/software/jupyter_notebook)をご参照ください。


### Hailの起動確認

Jupyter Notebookを１つ新規作成し、最初のセルに以下を入力し、実行します。

```
import hail as hl
```

つぎのセルに以下を入力し、実行します。

```
hl.init()
```

エラーがないことを確認します。

### インピューテーション結果を hail の入力とし PRS 計算の行うノートブック

続いては下記のノートブックを参考に、Jupyter 中で hail をご利用ください。

&#x1f517;<u>https://nbviewer.org/github/ddbj/imputation-server-wf/blob/main/Notebooks/hail-prs-tutorial.ipynb</u>

