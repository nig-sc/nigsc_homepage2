---
id: Rhelixa_RNAseq_manual
title: Rhelixa RNAseq pipeline manual
---

株式会社Rhelixa <br />
2020.8.13　初版


## 1. 構成・使用方法

### 1. 1 実行について

コマンドライン上で本解析パイプラインを実行するにあたり、以下の４つの引数を指定します。

- 引数１：出力データ名（出力先のディレクトリ名とファイル名の先頭文字列に使用されます）
- 引数２：参照ゲノム（hg19、hg38、mm9、mm10の４種類が選択できます）
- 引数３：リード１のfastqファイル
- 引数４：（オプション）リード２のfastqファイル

※ single-endデータの場合は引数３のみ、paired-endデータの場合は引数３と引数４の両方を指定する必要があります。

#### 1.1.1 コマンド実行

下記の手順でコマンドを実行します。ターミナルを閉じると処理が終了することに留意ください。

```bash
$ export GEA_HOME=/lustre7/singularity/images/gene_expression_analysis
$ export GEA_SINGULARITY=/lustre7/singularity/3.7.1/bin/singularity
$ ${GEA_SINGULARITY} exec \
-B ${GEA_HOME}/refs:${GEA_HOME}/refs \
${GEA_HOME}/gene_expression_analysis.sif \
GeneExpressionAnalysisSingle.sh [引数]
```

（例）

```bash
$ export GEA_HOME=/lustre7/singularity/images/gene_expression_analysis
$ export GEA_SINGULARITY=/lustre7/singularity/3.7.1/bin/singularity
$ ${GEA_SINGULARITY} exec \
-B ${GEA_HOME}/refs:${GEA_HOME}/refs \
${GEA_HOME}/gene_expression_analysis.sif \
GeneExpressionAnalysisSingle.sh \
Sample \
hg19 \
Sample_R1.fastq.gz \
Sample_R2.fastq.gz
```

 ※ 本コマンドは、出力先ディレクトリにファイルがある場合も、確認メッセージなしでファイルを上書きしますので、実行前に問題ないか確認ください。

※Rhelixa RNA-seq解析パイプラインは、singularityコンテナの形で提供されています。Rhelixa RNA-seq解析パイプラインは商用ソフトウェアであるため、遺伝研スパコン内の特定のsingularityバイナリでしか実行出来ないようにしております。そのためsingularityコマンドは、/lustre7/singularity/3.7.1/bin/singularity とフルパスで指定してください。通常のsingularityコマンドではRhelixa RNA-seq解析パイプラインが実行できませんのでご注意ください。

#### 1.1.2 qsubでのコマンド実行（バッチ実行する場合）

処理に長時間かかる場合は、qsubを利用し、バッチ実行することが推奨されます。
事前に実行用のシェルを作成し、qsubで実行します。実行キューを指定する場合は、-l epyc や -l short 等のオプションを4行目に追加してください。


（例）

gene_expression_analysis.shの内容

```bash
#!/bin/sh
#$ -S /bin/sh
#$ -cwd
#$ -l s_vmem=8G -l mem_req=8G
#$ -pe def_slot 4
#$ -o out.log
#$ -e error.log

export GEA_HOME=/lustre7/singularity/images/gene_expression_analysis
export GEA_SINGULARITY=/lustre7/singularity/3.7.1/bin/singularity
${GEA_SINGULARITY} exec \
-B ${GEA_HOME}/refs:${GEA_HOME}/refs \
${GEA_HOME}/gene_expression_analysis.sif \
GeneExpressionAnalysisSingle.sh \
Sample \
hg19 \
Sample_R1.fastq.gz \
Sample_R2.fastq.gz
```

下記の要領でバッチ処理を登録します。

```bash
$ qsub gene_expression_analysis.sh
```

## 2. 処理内容について

本パイプラインでは以下のプログラムが実行されます。

- FastQC (v0.11.7)：fastqファイルに含まれるシーケンスリードのクオリティを評価する。
- Trimmomatic (v0.38)：クオリティ情報に基づきfastqファイルのトリミングを行う。
- RSeQC (v3.0.1)：fastqファイルよりライブラリのストランド情報を取得する。
- HISAT2 (v2.1.0)：fastqファイルに含まれるシーケンスリードを参照ゲノムにマップする。
- Samtools (v1.9)：マップ後に得られるsamファイルをbamファイルに変換する。
- featureCounts (v1.6.3)：遺伝子ごとにマップされたリードのカウントを計算する。

## 3. 結果

以下の引数を指定して計算を実行した場合、[ファイル構成] 以降のフォルダおよびファイルが生成されます。

- 引数１：Sample
- 引数２：hg19
- 引数３：Sample_R1.fastq.gz
- 引数４：Sample_R2.fastq.gz

```bash
$ export GEA_HOME=/lustre7/singularity/images/gene_expression_analysis
$ export GEA_SINGULARITY=/lustre7/singularity/3.7.1/bin/singularity
$ ${GEA_SINGULARITY} exec -B ${GEA_HOME}/refs:${GEA_HOME}/refs \
${GEA_HOME}/gene_expression_analysis.sif \
GeneExpressionAnalysisSingle.sh \
Sample \
hg19 \
Sample_R1.fastq.gz \
Sample_R2.fastq.gz
```

[ファイル構成]

```
Sample  ## 出力データフォルダ
├── analysis_summary.txt  ## 解析内容のサマリー
├── fastqc  ## FastQCの出力データフォルダ
│   ├── Sample_R1_fastqc.html  ## Read1 fastqデータのクオリティ情報
│   ├── Sample_R1_fastqc.zip  ## Sample_R1_fastqc.html中の画像データ
│   ├── Sample_R2_fastqc.html  ## Read2 fastqデータのクオリティ情報
│   └── Sample_R2_fastqc.zip  ## Sample_R2_fastqc.html中の画像データ
├── featureCounts  ## featureCountsの出力データフォルダ
│   ├── Sample_count.txt  ## 各遺伝子に対するリードカウント
│   ├── Sample_count.txt.summary  ## 遺伝子へのマッピング情報
│   └── Sample.featureCounts.log  ## featureCountsの実行ログ
├── hisat2  ## HISAT2の出力データフォルダ
│   ├── Sample.bam  ## マップ後シーケンスリードのbamデータ
│   ├── Sample.hisat2.log  ## 参照ゲノムへのマッピング情報
│   ├── Sample.sam  ## マップ後シーケンスリードのsamデータ
│   ├── Sample.sort.bam  ## ソート後のbamデータ
│   └── Sample.sort.bam.bai  ## Sample.sort.bamのインデックス
└── trimmomatic  ## Trimmomaticの出力データフォルダ
    ├── Sample_R1_paired.fastq  ## ペアのあるRead1のシーケンスリード
    ├── Sample_R1_unpaired.fastq  ## ペアのないRead1のシーケンスリード
    ├── Sample_R2_paired.fastq  ## ペアのあるRead2のシーケンスリード
    ├── Sample_R2_unpaired.fastq  ## ペアのないRead2のシーケンスリード
    └── Sample.trimmomatic.log  ## Trimmomaticの実行ログ
```

- 「##」以降はフォルダまたはファイルの内容

analysis_summary.txtにおいて、[使用ツールのバージョン]には本解析パイプラインで使用されるプログラムのバージョン情報、[Phase.1~6]には各フェーズで実行されたコマンドの内容、[データ情報]には参照データ及び処理段階ごとのリード数情報が記載されています。

[analysis_summary.txtの内容]

```
[使用ツールのバージョン]
 - FastQC v0.11.7
 - Trimmomatic v0.38
 - HISAT2 v2.1.0
 - Samtool v1.9
 - RSeQC (infer_experiment.py) v3.0.1
 - featureCounts v1.6.3
 
[Phase.1] FastQCによるシーケンスデータのクオリティチェック
fastqc --nogroup -o Sample/fastqc/ Sample_Fr-firststrand_R1.fq.gz
fastqc --nogroup -o Sample/fastqc/ Sample_Fr-firststrand_R2.fq.gz
 
[Phase.2] Trimmomaticによるシーケンスデータのトリミング
java -jar /usr/local/bioinfo_tools/src/Trimmomatic-0.38/trimmomatic-0.38.jar PE -threads 4 Sample_Fr-firststrand_R1.fq.gz Sample_Fr-firststrand_R2.fq.gz Sample/trimmomatic/Sample_R1_paired.fastq Sample/trimmomatic/Sample_R1_unpaired.fastq Sample/trimmomatic/Sample_R2_paired.fastq Sample/trimmomatic/Sample_R2_unpaired.fastq ILLUMINACLIP:/usr/local/bioinfo_tools/src/Trimmomatic-0.38/adapters/paired_end.fa:2:30:10 LEADING:20 TRAILING:20 SLIDINGWINDOW:4:15 MINLEN:36
 
[Phase.3] RSeQC (infer_experiment.py) によるストランド情報の取得...
infer_experiment.py -r /data/share/reference/hg19/ucsc/refGene_hg19.bed -i Sample/hisat2/Sample.sort.bam
 
[Phase.4] HISAT2によるシーケンスデータのマッピング...
hisat2 --rna-strandness RF --dta -p 4 -x /data/share/reference/hg19/Hisat2/hg19 -1 Sample/trimmomatic/Sample_R1_paired.fastq -2 Sample/trimmomatic/Sample_R2_paired.fastq -S Sample/hisat2/Sample.sam
 
[Phase.5] SAMtoolsによるbamファイルの作成...
samtools view -bS Sample/hisat2/Sample.sam > Sample/hisat2/Sample.bam
samtools sort Sample/hisat2/Sample.bam > Sample/hisat2/Sample.sort.bam
samtools index Sample/hisat2/Sample.sort.bam
 
[Phase.6] featureCountsによる遺伝子にマッピングされるシーケンスリードの集計...
featureCounts -p -s 2 -T 4 -F GTF -t exon -g gene_id -a /data/share/reference/hg19/gtf/Homo_sapiens.GRCh37.87.processed.gtf -o Sample/featureCounts/Sample_count.txt Sample/hisat2/Sample.sort.bam
 
[データ情報]
 - Reference genome: hg19
 - Reference gene: Homo_sapiens.GRCh37.87.gtf
 - Library type: fr-firststrand
 - Num. of total read pairs: 1000000
 - Num. of trimmed read pairs: 981403
 - Num. of mapped reads: 1928834
 
[提供元：株式会社Rhelixa (https://www.rhelixa.com/)]
パイプラインの使用方法に関するご質問、または発展的な解析のご相談につきましては、 customer-service@rhelixa.com までご連絡ください。
 
株式会社Rhelixaでは多様なバイオインフォマティクスニーズにお応えする受託サービスを実施しています。
 - スピーディな図版付き基本解析（ベーシックプラン）
 - オーダーメイドの高次比較解析（スタンダードプラン）
 - IPAによるパスウェイ解析
 - シークエンスのみのご依頼も格安で
 
▼サービスの詳細・お問い合わせはこちらまで▼
https://www.rhelixa.com/service/
```

## 4. 免責事項

本パイプラインは、すべて研究目的のために使われることを前提として開発しております。本パイプラインを用いて得られた解析結果を研究目的以外へご使用された場合、これに起因する損失・損害等については、弊社では責任を負いかねますので、あらかじめご了承ください。

## 5. 謝辞について

本解析パイプラインを利用した論文が採択された際には、以下の記載例を参考に謝辞への記載をお願いします。

（記載例）

＜謝辞 英語＞
```
RNA-seq analyses were performed by the pipeline provided by Rhelixa, Inc.
```
 

＜謝辞 日本語＞

```
本研究は、株式会社Rhelixaの提供するRNA-seq解析パイプラインを利用しました。
```

## 6. 連絡先

本パイプラインの使用方法に関するご質問、または発展的な解析のご相談につきましては、 customer-service@rhelixa.com までご連絡ください。

## 株式会社Rhelixaについて

| 会社名     | 株式会社Rhelixa（レリクサ）                            |
|------------|--------------------------------------------------------|
|設立年月日  |	2015年2月                                             |
|本社 	     | 東京都千代田区神田三崎町2-2-14 BRICK GATE 水道橋 2階   |
|代表者      | 仲木 竜                                                |
|主な事業内容| 	ゲノミクス・エピジェネティクス研究のコンサルティングサービスおよびエピゲノムデータを活用した事業開発。|
