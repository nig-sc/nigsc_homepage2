---
id: imputation_server_hail
title: TOGO Imputation (beta) チュートリアル3、hail を用いた PRS 計算
---

<img
  src='https://github.com/genome-analytics-japan/imputation-server-logo/blob/main/logo_color.png?raw=true'
  alt=''
  style={{width:'200px'}}
/>

本チュートリアル3ではインピューテーションサーバのインピューテーション結果を
[&#x1f517;<u>hail</u>](https://hail.is) で解析するための環境構築方法を説明します。

## Guacamole環境への接続

この作業は、遺伝研個人ゲノム解析区画Guacamole環境から行いますので、VPN接続を行いGuacamoleに接続してください。

次にguacamole デスクトップ環境の「アクティビティ」からターミナルを起動してください。

以下は上記で開いたターミナルの中で作業を行います。

## 事前準備

### miniconda のインストール

もしすでに conda コマンドが使える場合、本節はスキップして、 `conda-forge を用いた conda 環境の構築` に進んでください。
conda コマンドが使えない場合は、下記のコマンドを実行して miniconda のインストールを行います。

```
$ wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
$ chmod 755 ./Miniconda3-latest-Linux-x86_64.sh
$ ./Miniconda3-latest-Linux-x86_64.sh
```

上記コマンドを実行した後に、下記のように使用許諾条件 (license terms) へと続くメッセージが表示されます。

```
Welcome to Miniconda3 py312_24.3.0-0

In order to continue the installation process, please review the license
agreement.
Please, press ENTER to continue
>>>
```

ENTER キーを押下すると、end user license agreement の文面が表示されます。
SPACE キーを複数回押下することにより、文面がスクロールし、下記の license terms を許諾するかどうかの確認の質問が表示されます。

```
7. Intellectual Property Notice. You acknowledge that, as between You and
Anaconda, Anaconda owns all right, title, and interest, including all
intellectual property rights, in and to Miniconda(R) and, with respect to
third-party products distributed with or through Miniconda(R), the applicable
third-party licensors own all right, title and interest, including all
intellectual property rights, in and to such products.


Do you accept the license terms? [yes|no]
>>>
```

`yes` とタイプしてから、ENTER キーを押下し、先に進んでください。

次に、`Miniconda3 will now be installed into this location: /home/<username>/miniconda3:`
と表示されるのでインストール場所が問題なければそのまま ENTER キーを押下してください。
別の場所にインストールする場合には、別のパスを指定してください。
続いて、`Do you wish to update your shell profile to automatically initialize conda? ... [yes|no]` と表示されるので
`yes` か `no` をタイプしてから ENTER キーを押下し、先に進んでください。(`no`を推奨します)

下記コマンドを実行して、conda コマンドへのパスを通してください。

```
$ PATH=$PATH:~/miniconda3/bin
```

その後一旦、作業環境ターミナルやSSHから抜けて、入り直します。

最後に、下記コマンドを実行し、conda コマンドが使えることを確認してください。

```
$ which conda
$ conda --version
```

### conda-forge を用いた conda 環境の構築

続いて、下記コマンドを実行してください。
ここでは、有償ライセンス契約を行う必要が無い `conda-forge` と呼ばれるパッケージリポジトリを使う方法を紹介しています。
conda のパッケージリポジトリのライセンスについては[こちらの記事](https://qiita.com/kimisyo/items/986802ea52974b92df27)
をご参照ください。

```
$ conda create -c conda-forge -n hail-python37-openjdk8 python=3.7 openjdk=8
```

### Hail と Jupyter のインストール

続いて、下記コマンドを実行して、`hail` と `jupyter` をインストールしてください。

```
$ conda activate hail-python37-openjdk8
$ pip install hail
$ pip install jupyter
```

加えて以下のコマンドも実行してください。
以下のコマンドは hail 用にメモリを 48G 確保することを意味します。
このメモリが少ない場合、hail は Out Of Memory エラーを出し、計算は失敗します。
ご注意ください。

```
export PYSPARK_SUBMIT_ARGS='--driver-memory 48g --executor-memory 48g pyspark-shell'
```

## Jupyter Notebook の起動

続いて、下記のコマンドで Jupyter Notebook を起動してください。

```
$ jupyter notebook --notebook-dir=~/imputation-server-test &
```

このコマンドを実行すると、Firefox に新しいタブが開かれ、Jupyter Notebook の画面が表示されます。

画面右側にある `新規` ボタンを押下して、`Python 3 (ipykernel)` を選択してクリックしてください。
これにより、新たなFirefoxタブが作られ、Jupyter Notebook 実行環境が表示されます。

Jupyter Notebook 実行環境の操作方法に慣れていない場合は、
[こちらの記事](https://www.javadrive.jp/python/jupyter-notebook/index5.html) を参考に基本操作を習得いただくとチュートリアルを進めやすくなります。

## Hailの起動確認
Jupyter Notebook を1つ新規作成し、最初のセルに以下を入力し、実行します。

```
import hail as hl
```

次のセルに以下を入力し、実行します。

```
hl.init()
```

エラーがないことを確認します。

## インピューテーション結果を hail の入力とし PRS 計算の行うノートブック

続いては下記のノートブックを参考に、Jupyter 中で hail をご利用ください。

https://nbviewer.org/github/ddbj/imputation-server-wf/blob/main/Notebooks/hail-prs-tutorial.ipynb

作業を終える場合は、Guacamoleを表示しているブラウザタブを閉じてください。

## 補足

Guacamole デスクトップ環境内でノートブックチュートリアルを開くには、
Firefoxのウェブ検索欄に「DDBJ imputation」とタイプし検索を行ってください。
その検索結果中に「[TOGO Imputation(beta)チュートリアル3、hailを用いたPRS計算](https://sc.ddbj.nig.ac.jp/advanced_guides/imputation_server_hail)」があります。
そのウェブページ下部に https://nbviewer.org/github/ddbj/imputation-server-wf/blob/main/Notebooks/hail-prs-tutorial.ipynb へのリンクがあります。

Guacamole デスクトップ環境中の Firefox から https://nbviewer.org/github/ddbj/imputation-server-wf/blob/main/Notebooks/hail-prs-tutorial.ipynb を開けたら、
コピーアンドペーストでチュートリアルを進めていただくことが可能です。
