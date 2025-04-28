---
id: ga_transfer
title: データ転送（一般解析区画）
---

遺伝研スパコンでは、通常広く使われている
scp, sftpなどに加えて、
長距離の大規模データ転送に適したソフトウェアであるAsperaおよびArchaea toolsが利用可能です。

- AsperaはNCBI/EBI/DDBJなどからデータをスパコンやユーザのパソコンにダウンロードする際に利用できます。遺伝研スパコン全体で合計10Gbpsが転送速度の上限となります。
- Archaea toolsはスパコンのユーザホーム領域とユーザのパソコンとの間のデータ転送に利用できます。ライセンス上の転送速度の
上限はありません。

遺伝研スパコンは現在100GbpsでSINET6に接続されています。**Archaea toolsを利用することで遺伝研スパコンのネットワークを有効に使うことができます。**


一般解析区画及び個人ゲノム解析区画にはAspera Serverがインストールされていないため、
ユーザの計算機からAsperaでのデータのアップロード、ダウンロードはできません。
ユーザの計算機から一般解析区画及び個人ゲノム解析区画にデータ転送する場合はArchaea Toolsを使ってください。


![](copytool_1.png)

一方で、一般解析区画や個人ゲノム解析区画のユーザホームディレクトリに`ascp` (Aspera client)をインストールすれば、NCBI/EBI/DDBJなどとのデータのダウンロード、アップロードが可能です。

![](copytool_2.png)


## Archaea Toolsの利用方法 {#usage-archaea}

準備中

## Aspera の利用方法 {#usage-aspera}

Aspera は大容量のファイル転送を効率的に行う商用ソフトウェアです。
特に遠距離との通信の際の転送速度の劣化が少ないことと、きちんとチューニングすれば理論帯域幅にかなり近い転送速度が実現できることが特徴です。
遺伝研スパコンでは合計帯域幅上限 10Gbps の Aspera サーバーを導入し運用しています。
（遺伝研の総帯域幅は 100Gbps です。）

### Aspera client(ascp)の使い方 {#aspera-usage-guide}

例えば、EBIのサーバから、`SRR1448774.fastq.gz`(2.7GB)をダウンロードする場合は、以下のコマンドを実行します。

```
apptainer exec ./ascp3_ubuntu22.sif ~/.aspera/connect/bin/ascp -P33001 -i ~/.aspera/connect/etc/asperaweb_id_dsa.openssh era-fasp@fasp.sra.ebi.ac.uk:/vol1/fastq/SRR144/004/SRR1448774/SRR1448774.fastq.gz /path/to/download_dir/
```

以下に、コマンドの実行例を示します。

```
you@a001:~/path/to/workdir/apptainer_ascp3 (2025-04-22 16:54:17)
$ apptainer exec ./ascp3_ubuntu22.sif ~/.aspera/connect/bin/ascp -P33001 -i ~/.aspera/connect/e
tc/asperaweb_id_dsa.openssh era-fasp@fasp.sra.ebi.ac.uk:/vol1/fastq/SRR144/004/SRR1448774/SRR1448774.fastq.gz /path/to/download_dir/
tc/asperaweb_id_dsa.openssh era-fasp@fasp.sra.ebi.ac.uk:/vol1/fastq/SRR144/004/SRR1448774/SRR1448774.fastq.gz $HOME/works/
you@a001:~/path/to/workdir/apptainer_ascp3 (2025-04-22 16:57:55)
$
```

オプションの説明や利用方法の詳細については、[Software > CopyTool > Aspera client(ascp)の使い方](/guides/software/CopyTool/aspera_client/) を参照してください。


##  SSH プロトコルによるファイル転送の方法 (scp, sftp) {#usage-scp-sftp}

遺伝研スパコンの一般解析区画のゲートウェイサーバ ( `gw.ddbj.nig.ac.jp` ) に対して `scp`, `sftp` 等を用いたファイル転送が可能です。

Linux または Mac の例:

この状態で、カレントディレクトリにある `your_file.txt` ファイルを遺伝研スパコンに `scp` するには、
以下のコマンドを実行します。

ここで`you`は、遺伝研スパコンのアカウント名です。

```
scp your_file.txt you@gw.ddbj.nig.ac.jp:/home/you
```

- `your_file.txt` は、転送したいファイル名に変えて実行してください。
- `you` は、アカウント登録証に記載されているユーザのアカウント名に変えて実行ください。


Windows (PowerShell)の例

1. まず PowerShell を起動します。そうすると、デフォルトの場合では、Windows 内のホームディレクトリがカレントディレクトリになった状態で PowerShell が起動します(ここで"youwin" は Windows のアカウント名)。この状態で以下のコマンドを実行して、SSH 秘密鍵ファイルが以下の位置にあることを確認します。この場合の SSH 秘密鍵ファイルは、`id_rsa` ファイルのことです。

```
PS C:\Users\youwin> ls .ssh


    Directory: C:\Users\youwin\.ssh


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----        2023/11/28     16:18            160 config
-a----        2022/11/01     16:33           1766 id_rsa
-a----        2024/01/22     12:44           4885 known_hosts
-a----        2024/01/22     12:41           5453 known_hosts.old
```

2. この状態で、ダウンロードフォルダ ( `Downloads` ) の中にある `your_file.txt` ファイルを遺伝研スパコンに `scp` するには、
以下のコマンドを実行します。（ここで `you` は、遺伝研スパコンのアカウント名です。）

```
PS C:\Users\youwin> scp .\Downloads\your_file.txt
you@gw.ddbj.nig.ac.jp:/home/you
```

