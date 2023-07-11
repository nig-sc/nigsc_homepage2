---
id: Alphafold_2_2
title: 遺伝研スパコンでのalphafold 2.2の実行
---


## 概略
遺伝研スパコンでは&#x1f517;<u><a href="https://github.com/deepmind/alphafold">alphafold 2.2.2</a></u>をインストールしたsingularity imageとalphafold 2.2で使用するデータベースを /lustre7/software/alphafold/2.2.2/ に用意しています。


alphafold 2.2によるタンパク質の立体構造予測は以下のステップで実行されます。


1. jackhmmerによるuniref90データベースを対象とした入力アミノ酸配列の検索（CPU使用）
2. jackhmmerによるmgnifyデータベースを対象とした入力アミノ酸配列の検索（CPU使用）
3. hhsearchによるpdb70データベース（単量体の場合）またはpdb_seqresデータベース（多量体の場合）を対象とした入力アミノ酸配列の検索（CPU使用）
4. hhblitsによるbfdデータベース・uniclust30データベースを対象とした入力アミノ酸配列の検索（CPU使用）
5. 構造テンプレートをpdb_mmcifデータベースより検索（CPU使用）
6. jackhmmerによるuniprotデータベース（多量体の場合）を対象とした入力アミノ酸配列の検索（CPU使用）
7. 機械学習による立体構造予測（CPUまたはGPU使用）
8. OpenMMによる構造最適化（CPUまたはGPU使用）

入力アミノ酸配列が多量体の場合、ステップ1-6は多量体を構成するサブユニットのアミノ酸配列ごとに実行されます。

デフォルトの設定では5つのモデルの構造予測を行うため、ステップ7・8は5回実行されます。また、ステップ7・8はCPUの他にGPUを使用できるため、CPU用とGPU用のsingularity imageをそれぞれ用意しています。

また、2.2より複合体の構造予測はデフォルトの設定では1つの配列に対して5個の構造予測を行うため、最大5つのサブユニットの配列に対して総計25個の予測構造が出力されます。

 
### 実行時間の目安

- ステップ1: 10 min
- ステップ2: 10 min
- ステップ3: 5min
- ステップ4: 5 hour
- ステップ5: 1 min
- ステップ6: 15 min
- ステップ7: 200aaで1 hour, 900aaで3 hour（64CPUコア使用）, 200aaで2min, 900aaで6 min（GPU使用）
- ステップ8: 200aaで0.5 min, 900aaで1 hour（64CPUコア使用）, 200aaで0.3min, 900aaで3 min（GPU使用）


## 入力ファイルの準備

立体構造を予測するタンパク質のアミノ酸配列を1ファイルのfasta形式で用意してください。対象タンパク質が多量体の場合は、構成するサブユニットのアミノ酸配列をすべて1ファイルに入力してください。同じサブユニットを複数含む場合は、その数だけ該当するサブユニットのアミノ酸配列を入力してください。

以下のfastaファイルはEcoRIホモ二量体の例となります。

```
>EcoRI
SNKKQSNRLTEQHKLSQGVIGIFGDYAKAHDLAVGEVSKLVKKALSNEYPQLSFRYRDSIKKTEINEALK
KIDPDLGGTLFVSNSSIKPDGGIVEVKDDYGEWRVVLVAEAKHQGKDIINIRNGLLVGKRGDQDLMAAGN
AIERSHKNISEIANFMLSESHFPYVLFLEGSNFLTENISITRPDGRVVNLEYNSGILNRLDRLTAANYGM
PINSNLCINKFVNHKDKSIMLQAASIYTQGDGREWDSKIMFEIMFDISTTSLRVLGRDLFEQLTSK
>EcoRI
SNKKQSNRLTEQHKLSQGVIGIFGDYAKAHDLAVGEVSKLVKKALSNEYPQLSFRYRDSIKKTEINEALK
KIDPDLGGTLFVSNSSIKPDGGIVEVKDDYGEWRVVLVAEAKHQGKDIINIRNGLLVGKRGDQDLMAAGN
AIERSHKNISEIANFMLSESHFPYVLFLEGSNFLTENISITRPDGRVVNLEYNSGILNRLDRLTAANYGM
PINSNLCINKFVNHKDKSIMLQAASIYTQGDGREWDSKIMFEIMFDISTTSLRVLGRDLFEQLTSK
```


## ジョブスクリプトの準備

/lustre7/software/alphafold/2.2.2/ にジョブスクリプトのサンプルを用意しています。こちらを自分のホームにダウンロードして適宜修正して使用してください。


### example_job_script_cpu.sh

GPUを使用しない場合のジョブスクリプトです。
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
PRED=5

export OPENMM_CPU_THREADS=16
export XLA_FLAGS="--xla_cpu_multi_thread_eigen=false intra_op_parallelism_threads=16"

singularity exec \
-B /lustre7/software/alphafold/database:/lustre7/software/alphafold/database \
-B /lustre7/software/alphafold/2.2.2/database:/data1/database \
/lustre7/software/alphafold/2.2.2/alphafold-2.2.2-CPU.sif \
/opt/alphafold/bin/alphafold \
--fasta_paths=${FASTAFILE} \
--output_dir=${OUTPUTDIR} \
--model_preset=${MODEL} \
--max_template_date=${DATE} \
--use_gpu_relax=false \
--num_multimer_predictions_per_model=${PRED}
```


#### 修正箇所
```
#$ -pe def_slot 16
```

```
export OPENMM_CPU_THREADS=16
```

```
export XLA_FLAGS="--xla_cpu_multi_thread_eigen=false intra_op_parallelism_threads=16"
```
使用するCPUコア数を16以上128以下で入力してください。3行に同じ数値を入力してください。

この値はステップ8で使用するCPUコア数を決定します。この値が大きければ大きいほどステップ8の処理が速くなります。



``` 
#$ -l s_vmem=160G
```
2560G / def_slotの値 を入力してください。


```
#$ -l mem_req=8G
```
128G / def_slotの値 を入力してください。


``` 
FASTAFILE="${HOME}/input/test.fasta"
```
入力ファイルのパスを入力してください。


``` 
OUTPUTDIR="${HOME}/output"
```
結果を出力するディレクトリのパスを入力してください。

このディレクトリ内に入力ファイル名から拡張子を除いた名前でディレクトリが作成され、結果が出力されます。同じ名前のディレクトリが既に存在し、その中に計算結果が入っていた場合、類縁配列の検索（ステップ1-6）は行われず立体構造の予測部分（ステップ7・8）のみ再計算されます。


```
DATE="2021-11-12"
```
立体構造の予測に使用するPDBの構造データのリリース日の上限を指定してください。この日付よりリリース日が新しい構造データは使用されません。


```
MODEL="monomer"
```

入力ファイルの内容に従って単量体タンパク質の構造予測の場合はmonomer、多量体タンパク質の構造予測の場合はmultimerを入力してください。

```
PRED=5
```

MODEL=”multimer” を指定した際に、1つの配列に対して出力する予測構造の数を指定します。デフォルト値は5で、最大5つのサブユニットの配列に対して総計25個の予測結果が出力されます。この値はMODEL=”monomer” を指定した際は無視されます。

### example_job_script_gpu.sh

GPUを使用する場合のジョブスクリプトです。gpu.qでジョブを実行します。

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
PRED=5

singularity exec \
--nv \
-B /lustre7/software/alphafold/database:/lustre7/software/alphafold/database \
-B /lustre7/software/alphafold/2.2.2/database:/data1/database \
/lustre7/software/alphafold/2.2.2/alphafold-2.2.2-GPU.sif \
/opt/alphafold/bin/alphafold \
--fasta_paths=${FASTAFILE} \
--output_dir=${OUTPUTDIR} \
--model_preset=${MODEL} \
--max_template_date=${DATE} \
--num_multimer_predictions_per_model=${PRED}
```

#### 修正箇所

```
#$ -l cuda=1
```

構造予測するタンパク質の大きさが1000アミノ酸残基程度までは cuda=1 で実行可能です。GPUのメモリ不足でエラーになった場合、数を増やして実行してください。

``` 
FASTAFILE="${HOME}/input/test.fasta"
```

入力ファイルのパスを入力してください。

```
OUTPUTDIR="${HOME}/output"
```

結果を出力するディレクトリのパスを入力してください。

このディレクトリ内に入力ファイル名から拡張子を除いた名前でディレクトリが作成され、結果が出力されます。同じ名前のディレクトリが既に存在し、その中に計算結果が入っていた場合、類縁配列の検索（ステップ1-6）は行われず立体構造を予測する処理（ステップ7・8）のみ再計算されます。

``` 
DATE="2021-11-12"
```

立体構造の予測に使用するPDBの構造データのリリース日の上限を指定してください。この日付よりリリース日が新しい構造データは使用されません。

``` 
MODEL="monomer"
```

入力ファイルの内容に従って単量体タンパク質の構造予測の場合はmonomer、多量体タンパク質の構造予測の場合はmultimerを入力してください。

``` 
PRED=5
```

MODEL=”multimer” を指定した際に、1つの配列に対して出力する予測構造の数を指定します。デフォルト値は5で、最大5つのサブユニットの配列に対して総計25個の予測結果が出力されます。この値はMODEL=”monomer” を指定した際は無視されます。


## ジョブの実行

ジョブスクリプトをqsubコマンドでGrid Engineに投入してください。

```
$ qsub example_job_script_cpu.sh
```

```
$ qsub example_job_script_gpu.sh
```

## 出力例

入力ファイル

[test.fasta](test.fasta)

出力ファイル

[ranking_debug.txt](ranking_debug.txt)←JSONファイルで出力されます

[ranked_4.pdb](ranked_4.pdb)


[ranked_3.pdb](ranked_3.pdb)


[ranked_2.pdb](ranked_2.pdb)


[ranked_1.pdb](ranked_1.pdb)


[ranked_0.pdb](ranked_0.pdb)


入力ファイルと同一アミノ酸配列（近縁種）のタンパク質のPDBエントリー

&#x1f517;<a href="https://www.rcsb.org/structure/3AS4"><u>https://www.rcsb.org/structure/3AS4</u></a>

&#x1f517;<a href="https://www.rcsb.org/structure/3AS5"><u>https://www.rcsb.org/structure/3AS5</u></a>
