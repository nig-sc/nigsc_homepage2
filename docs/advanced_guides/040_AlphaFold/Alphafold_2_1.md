---
id: Alphafold_2_1
title: 遺伝研スパコンでの alphafold 2.1 の実行
---


## 概略 {#introduction}
遺伝研スパコンでは&#x1f517;<a href="https://github.com/deepmind/alphafold">alphafold 2.1</a>（Yoshitaka Moriwaki 氏の&#x1f517;<a href="https://gist.github.com/YoshitakaMo/">パッチ</a>適用済み）をインストールした singularity image と alphafold 2.1 で使用するデータベースを /lustre7/software/alphafold/2.1.1/ に用意しています。


alphafold 2.1 によるタンパク質の立体構造予測は以下のステップで実行されます。


1. jackhmmer による uniref90 データベースを対象とした入力アミノ酸配列の検索（CPU 使用）
2. jackhmmer による mgnify データベースを対象とした入力アミノ酸配列の検索（CPU 使用）
3. hhsearch による pdb70 データベース（単量体の場合）または pdb_seqres データベース（多量体の場合）を対象とした入力アミノ酸配列の検索（CPU 使用）
4. hhblits による bfd データベース・ uniclust30 データベースを対象とした入力アミノ酸配列の検索（CPU 使用）
5. 構造テンプレートを pdb_mmcif データベースより検索（CPU 使用）
6. jackhmmer による uniprot データベース（多量体の場合）を対象とした入力アミノ酸配列の検索（CPU 使用）
7. 機械学習による立体構造予測（CPU または GPU 使用）
8. OpenMM による構造最適化（CPU または GPU 使用）


入力アミノ酸配列が多量体の場合、ステップ 1-6 は多量体を構成するサブユニットのアミノ酸配列ごとに実行されます。


デフォルトの設定では 5 つのモデルの構造予測を行うため、ステップ 7 ・ 8 は 5 回実行されます。また、ステップ 7 ・ 8 は CPU の他に GPU を使用できるため、CPU 用と GPU 用の singularity image をそれぞれ用意しています。

 
（実行時間の目安）


## 入力ファイルの準備 {#prepare-input-files}

立体構造を予測するタンパク質のアミノ酸配列を 1 ファイルの fasta 形式で用意してください。対象タンパク質が多量体の場合は、構成するサブユニットのアミノ酸配列をすべて 1 ファイルに入力してください。同じサブユニットを複数含む場合は、その数だけ該当するサブユニットのアミノ酸配列を入力してください。


（入力ファイルのサンプル）


## ジョブスクリプトの準備 {#prepare-job-scripts}

/lustre7/software/alphafold/にジョブスクリプトのサンプルを用意しています。こちらを自分のホームにダウンロードして適宜修正して使用してください。


### `example_job_script_cpu.sh`

GPU を使用しない場合のジョブスクリプトです。
```
#!/bin/sh
#$ -S /bin/sh
#$ -cwd
#$ -l s_vmem=160G
#$ -l mem_req=8G
#$ -pe def_slot 16

FASTAFILE="${HOME}/input/test.fasta"
OUTPUTDIR="${HOME}/output"
DATE="2021-11-12"
MODEL="monomer"

export OPENMM_CPU_THREADS=16

singularity exec \
-B /lustre7/software/alphafold/database:/data1/database \
/lustre7/software/alphafold/alphafold-2.1-CPU.sif \
/opt/alphafold/bin/alphafold \
--fasta_paths=${FASTAFILE} \
--output_dir=${OUTPUTDIR} \
--model_preset=${MODEL} \
--max_template_date=${DATE}
```


#### 修正箇所 {#modification-place}
```
#$ -pe def_slot 16
```

```
export OPENMM_CPU_THREADS=16
```
使用する CPU コア数を 16 以上 128 以下で入力してください。両方の行に同じ数値を入力してください。

この値はステップ 8 で使用する CPU コア数を決定します。この値が大きければ大きいほどステップ 8 の処理が速くなります。


``` 
#$ -l s_vmem=160G
```
2560G / def_slot の値 を入力してください。


```
#$ -l mem_req=8G
```
128G / def_slot の値 を入力してください。


``` 
FASTAFILE="${HOME}/input/test.fasta"
```
入力ファイルのパスを入力してください。


``` 
OUTPUTDIR="${HOME}/output"
```
結果を出力するディレクトリのパスを入力してください。

このディレクトリ内に入力ファイル名から拡張子を除いた名前でディレクトリが作成され、結果が出力されます。同じ名前のディレクトリが既に存在し、その中に計算結果が入っていた場合、類縁配列の検索（ステップ 1-6）は行われず立体構造の予測部分（ステップ 7 ・ 8）のみ再計算されます。


```
DATE="2021-11-12"
```
立体構造の予測に使用する PDB の構造データのリリース日の上限を指定してください。この日付よりリリース日が新しい構造データは使用されません。


```
MODEL="monomer"
```
入力ファイルの内容に従って単量体タンパク質の構造予測の場合は monomer、多量体タンパク質の構造予測の場合は multimer を入力してください。


### example_job_script_gpu.sh

GPU を使用する場合のジョブスクリプトです。gpu.q でジョブを実行します。

```
#!/bin/sh
#$ -S /bin/sh
#$ -cwd
#$ -l gpu
#$ -l cuda=1
#$ -l s_vmem=320G
#$ -l mem_req=16G
#$ -pe def_slot 8

FASTAFILE="${HOME}/input/test.fasta"
OUTPUTDIR="${HOME}/output"
DATE="2021-11-12"
MODEL="monomer"

singularity exec \
--nv \
-B /lustre7/software/alphafold/database:/data1/database \
/lustre7/software/alphafold/alphafold-2.1-GPU.sif \
/opt/alphafold/bin/alphafold \
--fasta_paths=${FASTAFILE} \
--output_dir=${OUTPUTDIR} \
--model_preset=${MODEL} \
--max_template_date=${DATE}
```

#### 修正箇所 {#modification-place}

```
#$ -l cuda=1
```
構造予測するタンパク質の大きさが 1000 アミノ酸残基程度までは cuda=1 で実行可能です。GPU のメモリ不足でエラーになった場合、数を増やして実行してください。

 
```
FASTAFILE="${HOME}/input/test.fasta"
```
入力ファイルのパスを入力してください。


```
OUTPUTDIR="${HOME}/output"
```
結果を出力するディレクトリのパスを入力してください。

このディレクトリ内に入力ファイル名から拡張子を除いた名前でディレクトリが作成され、結果が出力されます。同じ名前のディレクトリが既に存在し、その中に計算結果が入っていた場合、類縁配列の検索（ステップ 1-6）は行われず立体構造を予測する処理（ステップ 7 ・ 8）のみ再計算されます。

 
```
DATE="2021-11-12"
```
立体構造の予測に使用する PDB の構造データのリリース日の上限を指定してください。この日付よりリリース日が新しい構造データは使用されません。


```
MODEL="monomer"
```
入力ファイルの内容に従って単量体タンパク質の構造予測の場合は monomer、多量体タンパク質の構造予測の場合は multimer を入力してください。


## ジョブの実行 {#running-a-job}

ジョブスクリプトを qsub コマンドで Grid Engine に投入してください。
```
$ qsub example_job_script_cpu.sh
```

```
$ qsub example_job_script_gpu.sh
```


## 出力例 {#output-example}

入力ファイル

[test.fasta](test.fasta)

出力ファイル

[ranking_debug.txt](ranking_debug.txt)←JSON ファイルで出力されます

[ranked_4.pdb](ranked_4.pdb)


[ranked_3.pdb](ranked_3.pdb)


[ranked_2.pdb](ranked_2.pdb)


[ranked_1.pdb](ranked_1.pdb)


[ranked_0.pdb](ranked_0.pdb)


入力ファイルと同一アミノ酸配列（近縁種）のタンパク質の PDB エントリー

&#x1f517;<a href="https://www.rcsb.org/structure/3AS4">https://www.rcsb.org/structure/3AS4</a>

&#x1f517;<a href="https://www.rcsb.org/structure/3AS5">https://www.rcsb.org/structure/3AS5</a>


 
