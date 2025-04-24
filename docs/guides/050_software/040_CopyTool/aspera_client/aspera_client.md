---
id: aspera_client
title: Aspera client(ascp)の使い方
---

## 概略 {#introduction}

Asperaは高速データ転送ソフトウェアです。
NCBI, EBIその他有名なリポジトリから遺伝研スパコンへのデータダウンロードにAsperaを利用することができます。
本記事では、Asperaを用いてデータを遺伝研スパコンにダウンロードするユーザ利用手順を示します。
初めて行うときは、まず「1.環境設定 」を実施してください。
その後「2.NCBIからのデータダウンロード」と「3. EBIからのデータダウンロード」の手順を紹介します。


## 1. 環境設定 {#settings}

下記のコマンドを実行して、遺伝研スパコン内でaspera client利用の環境設定を行ってください。

```
$ cd /path/to/workdir/
$ git clone https://github.com/nig-sc/apptainer_ascp3.git
$ cd apptainer_ascp3
$ apptainer exec ascp3_ubuntu22.sif bash ibm-aspera-connect-3.9.5.172984-linux-g2.12-64.sh
```

この結果、`${HOME}/.aspera/connect/bin/ascp` 実行ファイルと、`${HOME}/.aspera/connect/etc` 下に秘密鍵が作成されます。
次のようにすることで、apptainerを使ってaspera実行コマンド(ascp)を実行することができます。

```
$ cd /path/to/workdir/apptainer_ascp3
$ apptainer exec ascp3_ubuntu22.sif ~/.aspera/connect/bin/ascp --help
```


## 2. NCBIからのデータのダウンロード {#aspera_download_from_ncbi}

### 2-1. NCBIサーバのファイルパス確認 {#check-file-path-of-ncbi}
 
NCBIのダウンロード対象のファイル一覧は、次のURLから閲覧することができます。
 
https://ftp.ncbi.nlm.nih.gov/
 
以下では、`/blast/db/core_nt.00.tar.gz` (5.5GB) をダウンロードする例を示します。
小さいサイズのデータで一度試したい場合は、`/blast/db/core_nt.00.tar.gz.md5`(52b)をダウンロードしても良いです。
 

### 2-2. NCBIサーバからのファイルダウンロード {#download-file-from-ncbi}
 
以下のようにすることで、ascpコマンドを実行しファイルをダウンロードすることができます。
 
```
$ cd /path/to/workdir/apptainer_ascp3
$ apptainer exec ./ascp3_ubuntu22.sif ~/.aspera/connect/bin/ascp -T -i ~/.aspera/connect/etc/asperaweb_id_dsa.openssh anonftp@ftp.ncbi.nlm.nih.gov:/blast/db/core_nt.00.tar.gz /path/to/download_dir/
```
 
- `-i ~/.aspera/connect/etc/asperaweb_id_dsa.openssh` でダウンロードに必要な秘密鍵を指定しています。
- `-T` は最大スループットを確保するために暗号化を無効にするオプションです。NCBIからダウンロードする際には必須のオプションです。
- `anonftp@ftp.ncbi.nlm.nih.gov:/blast/db/core_nt.00.tar.gz` はダウンロードするファイルを指定しています。`/blast/db/core_nt.00.tar.gz` の部分を適宜変更してください。
- `/path/to/download_dir/` は、ダウンロード先のパスを指定してください。
 
遺伝研スパコン環境では、NCBIからasperaを用いてダウンロードする際には、100–300Mb/s 程度の速度が出ています。5.5GBある `core_nt.00.tar.gz` をダウンロードするのに、2.5–7.5分程度かかります。
 


## 3. EBIからのデータのダウンロード {#aspera_download_from_ebi}

### 3-1. EBIサーバのファイルパス確認 {#check-file-path-of-ebi}

EBIのダウンロード対象のファイル一覧は、次のURLから閲覧することができます。

https://ftp.sra.ebi.ac.uk/

以下では、`/vol1/fastq/SRR144/004/SRR1448774/SRR1448774.fastq.gz`(2.7GB)をダウンロードする例を示します。

### 3-2. EBIサーバからのファイルダウンロード {#downliad-file-from-ebi}

以下のようにすることで、ascpコマンドを実行しファイルをダウンロードすることができます。

```
$ apptainer exec ./ascp3_ubuntu22.sif ~/.aspera/connect/bin/ascp -P33001 -i ~/.aspera/connect/etc/asperaweb_id_dsa.openssh era-fasp@fasp.sra.ebi.ac.uk:/vol1/fastq/SRR144/004/SRR1448774/SRR1448774.fastq.gz /path/to/download_dir/
```

- `-i ~/.aspera/connect/etc/asperaweb_id_dsa.openssh` でダウンロードに必要な秘密鍵を指定しています。
- `-P33001` はfaspセッションの開始に使用するTCPポートを設定しています。EBIからダウンロードする際は`-P33001`と指定してください。
- `era-fasp@fasp.sra.ebi.ac.uk:/vol1/fastq/SRR144/004/SRR1448774/SRR1448774.fastq.gz` はダウンロードするファイルを指定しています。`/vol1/fastq/SRR144/004/SRR1448774/SRR1448774.fastq.gz` の部分を適宜変更してください。
- `/path/to/download_dir/` は、ダウンロード先のパスを指定してください。

遺伝研スパコン環境では、EBIからasperaを用いてダウンロードする際には、30–60Mb/s 程度の速度が出ています。2.7GBある `SRR1448774.fastq.gz` をダウンロードするのに、6–12分程度かかります。


## 4. ascpコマンドのオプション {#ascp-command-options}

ascpコマンドのオプションは次のURLから閲覧することができます。

https://download.asperasoft.com/download/docs/ascp/3.5.2/html/dita/ascp_usage.html

ここでは `-k` オプションについて紹介します。
`-k` オプションを指定することで、部分的に転送されたファイルの再開を有効にすることもできます（デフォルト: 0）。
これは最初の転送時に指定する必要があり、そうでない場合、後続の転送では機能しません。

再開レベル:
- `-k 0`: 常にファイル全体を再転送します。
- `-k 1`: ファイル属性を確認し、現在の属性と元の属性が一致する場合に再開します。
- `-k 2`: ファイル属性を確認し、スパースファイルチェックサムを実行します。現在の属性と元の属性/チェックサムが一致する場合に再開します。
- `-k 3`: ファイル属性を確認し、完全なファイルチェックサムを実行します。現在の属性と元の属性/チェックサムが一致する場合に再開します。

なお、宛先に完全なファイルが存在する場合（.aspxがない場合）、ソースファイルのサイズは宛先ファイルのサイズと比較されます。
宛先に部分ファイルと有効な.aspxファイルが存在する場合、ソースファイルのサイズは.aspxファイル内に記録されたファイルサイズと比較されます。

`-k` の指定する値が大きくなるほど転送開始までのチェックに要する時間が長くなることに注意してください。

