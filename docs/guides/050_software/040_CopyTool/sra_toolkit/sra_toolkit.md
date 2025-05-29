---
id: sra_toolkit
title: SraToolkitの使い方
---

## 概略 {#introduction}
prefetch は、NCBIが提供するSRA Toolkit の一部で、配列データ（SRAアクセッション）を事前にローカルへダウンロードするためのコマンドラインツールです。本記事では、遺伝研スパコンにログインした状態でprefetchを用い、データを遺伝研スパコンにダウンロードするユーザ利用手順を示します。なお、遺伝研の一般解析区画には、以下で使うコマンドprefetchやvdb-configなどは既にインストールされています。


注意点：
より詳しい使い方は、ncbiの次のサイトを参照してください。
https://github.com/ncbi/sra-tools/wiki/08.-prefetch-and-fasterq-dump

## 1. 基本的な使い方

1. vdb-dumpコマンドを用いダウンロードファイルのサイズを確認します(size:項目に表示されます)。20GB以上であれば、prefetchコマンドを利用する際に--max-sizeオプションに必要なサイズ以上の数値を指定してください。
2. 次に、prefetchコマンドでSRAアクセッションに対応するディレクトリをダウンロードします。
3. 最後に、fasterq-dumpコマンドでfastqファイルを抽出します。なお、HDDの空き容量には、アクセッションサイズの約17倍の空き容量が必要です。
    

以下は、SRR000001(サイズは20GB以下)をダウンロードする場合。
ダウンロード先は /path/to/download_dirとした場合。

```
  $ vdb-dump SRR1951777 --info
  $ prefetch SRR000001 -O /path/to/download_dir
  $ cd ./path/to/be/used
  $ fasterq-dump SRR000001
```

以下は、SRR1951777(サイズは20GB以上)をダウンロードする場合。
ダウンロード先は /path/to/download_dir とした場合。
```
  $ vdb-dump SRR1951777 --info
  $ prefetch SRR1951777 --max-size 420000000000 -O /path/to/download_dir
  $ fasterq-dump SRR1951777
```

