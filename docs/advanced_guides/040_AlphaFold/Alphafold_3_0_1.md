---
id: Alphafold_3_0_1
title: 遺伝研スパコンでのalphafold 3.0.1の実行
---


## 概略 {#overview}

AlphaFold3 は[DeepMind社](https://deepmind.com/)が開発したタンパク質立体構造予測プログラムです。

遺伝研スパコンでは [alphafold 3.0.1](https://github.com/google-deepmind/alphafold3/tree/v3.0.1) をインストールした apptainer image、AlphaFold3で使用する配列・構造データベース、slurmにジョブを投入するサンプルスクリプトを用意してあります。

AlphaFold3 の実行に必要なモデルパラメータファイルは、[後述](#prep-model-params)するようにユーザー様ご自身でDeepMind社から取得していただく必要がございます。

AlphaFold3の実行には個人ゲノム解析区画のアクセラレータ最適化ノード Type2（L40Sノード）を使用します。個人ゲノム解析区画の利用は利用申請が必要となりますので、[利用の準備（個人ゲノム解析区画） | NIG supercomputer](/guides/using_personal_genome_division/pg_application/)を参照して利用申請を行い、利用計画表をご提出ください。

L40S では、3500アミノ酸残基程度までの大きさのタンパク質の立体構造予測が可能です。[後述](#enable-unified-memory-during-model-inference)するようにUnified Memoryを有効化するとさらに大きなタンパク質の立体構造予測が可能ですが、実行速度は低下します。


## AlphaFold3 の実行内容について {#af3-exec-details}

AlphaFold3によるタンパク質の立体構造の推論は以下のステップで実行されます。
1. **jackhmmer**による配列データベースを対象とした入力アミノ酸配列の**Multiple Sequence Alignment**（CPU使用）
2. **hmmsearch**による構造データベースを対象とした構造**テンプレート検索**（CPU使用）
3. **モデル推論**（GPU使用）

入力アミノ酸配列が多量体の場合、ステップ1-2は多量体を構成する異なる種類のサブユニットのアミノ酸配列ごとに実行されます。

ステップ1-2の実行時間は**300アミノ酸残基程度**のアミノ酸配列1個でおおよそ**500秒～800秒**です。

**L40S**を使用したステップ3の実行時間はタンパク質のサイズが600アミノ酸残基で**90秒**、1100アミノ酸残基で**180秒**、3500アミノ酸残基で**1400秒**程度です。

モデル推論に**Unified Memory**を使用した場合、実行時間は3900アミノ酸残基で**2100秒**、4300アミノ酸残基で**3900秒**、4700アミノ酸残基で**12900秒**程度になります。

CPUを使用するステップ1-2のデータベース検索パートとGPUを使用するステップ3のモデル推論パートはAlphaFold3の実行オプションで分割して実行可能です。一括して実行する場合は、データベース検索パートの実行時間も**L40Sノード使用の課金対象**になることにご注意ください。L40Sノードの使用料金は、**日数単位**（小数点以下切り上げ）で算出いたします。

分割して実行する場合、データベース検索パートは**一般解析区画**または**個人ゲノム解析区画**のCPUノードをご使用ください。個人ゲノム解析区画のCPUノードを使用する場合は、L40Sノードと併せて**利用計画表**をご提出ください。


## モデルパラメータファイルの準備 {#prep-model-params}

モデルパラメータファイルは、事前にユーザ様ご自身で**DeepMind社**に利用申請を行い、DeepMind社からダウンロードして頂く必要があります。

モデルパラメータの利用申請は、DeepMind社の用意している[Google Form](https://docs.google.com/forms/d/e/1FAIpQLSfWZAgo1aYk0O4MuAXZj8xRQ8DafeFJnldNOnh_13qAx2ceZw/viewform)から行ってください。申請後、数日でモデルパラメータファイルのダウンロードリンクがメールで送信されます。

ダウンロードしたモデルパラメータファイルは、以下のようにzstdコマンドを使用して解凍してください。zstdコマンドは遺伝研スパコンの各ノードにインストールされています。

```
zstd -d af3.bin.zst
```

## 入力ファイルの準備 {#prep-input-files}

AlphaFold3に入力する配列データは**JSON形式**で準備する必要があります。AlphaFold3 の[ドキュメント](https://github.com/google-deepmind/alphafold3/blob/main/docs/input.md) を参考にJSONファイルをご用意ください。


## 全行程の一括実行 {#run-entire-workflow}

**データベース検索パート**と**モデル推論パート**を個人ゲノム解析区画の**アクセラレータ最適化ノード Type2（L40Sノード）**で一括して実行する場合について説明いたします。


### 実行環境へのアクセス {#access-execution-env}

L40Sノードへのアクセス方法は [アクセラレータ最適化ノード Type 2 (L40Sノード)の使い方 | NIG supercomputer](/guides/using_personal_genome_division/GPU_nodes_type2/) をご参照ください。


### ジョブスクリプトの準備 {#prep-job-scripts}

ジョブスクリプトのサンプルは `/lustre12/software/alphafold3/sample_scripts/run_alphafold3.sh` に置いてあります。

以下が**slurm**に登録するジョブスクリプト `run_alphafold3.sh`の内容になります。


```
#!/bin/bash
#SBATCH -p l40s
#SBATCH -A l40s
#SBATCH --gres=gpu:1
#SBATCH -c 16
#SBATCH --mem-per-cpu=1g
INPUT_JSON_PATH="${HOME}/alphafold3/input/input.json"
OUTPUT_DIR="${HOME}/alphafold3/output"
MODEL_DIR="${HOME}/alphafold3/models"
DB_DIR="/data1/alphafold3/database"
IMAGE_PATH="/lustre12/software/alphafold3/alphafold3-v3.0.1.sif"
MAX_TEMPLATE_DATE="2099-12-31"
ALPHAFOLD3DIR="/app/alphafold"
HMMER3_BINDIR="/hmmer/bin"
apptainer exec \
    --nv \
    -B ${DB_DIR}:${DB_DIR} \
    ${IMAGE_PATH} \
    python3.11 ${ALPHAFOLD3DIR}/run_alphafold.py \
        --jackhmmer_binary_path="${HMMER3_BINDIR}/jackhmmer" \
        --nhmmer_binary_path="${HMMER3_BINDIR}/nhmmer" \
        --hmmalign_binary_path="${HMMER3_BINDIR}/hmmalign" \
        --hmmsearch_binary_path="${HMMER3_BINDIR}/hmmsearch" \
        --hmmbuild_binary_path="${HMMER3_BINDIR}/hmmbuild" \
        --db_dir="${DB_DIR}" \
        --model_dir=${MODEL_DIR} \
        --max_template_date=${MAX_TEMPLATE_DATE} \
        --json_path=${INPUT_JSON_PATH} \
        --output_dir=${OUTPUT_DIR}
```

**8-10行目**の`INPUT_JSON_PATH`, `OUTPUT_DIR`, `MODEL_DIR`を自身の環境に合わせて修正してください。


- 8行目：

```
INPUT_JSON_PATH="${HOME}/alphafold3/input/input.json"
```

INPUT_JSON_PATHは入力ファイルのパスです。

- 9行目：

```
OUTPUT_DIR="${HOME}/alphafold3/output"
```

OUTPUT_DIRは実行結果の出力ディレクトリです。

- 10行目：

```
MODEL_DIR="${HOME}/alphafold3/models"
```

MODEL_DIRはDeep Mind社から取得したモデルパラメータファイル（`af3.bin`）を置いたディレクトリです。

AlphaFold3 の実行スクリプト中ではMSAの処理に最大**32 CPUコア**を使用する設定ですが、**16 CPUコア**を指定した場合と比較して実行速度に変化はありませんので、`#SBATCH -c 16` を指定しています。


### ジョブ実行 {#execute-jobs}

**slurm**へのジョブの登録は以下のコマンドになります。

```
sbatch run_alphafold3.sh
```

実行時の標準出力はカレントディレクトリに `slurm-<jobId>.out` のファイル名で出力されます。

入力アミノ酸配列が長すぎる場合は以下のようなエラーがslurmの出力ファイルに出力され、実行が終了します。L40Sの場合、**3500アミノ酸程度**が限界のようです。

```
jaxlib.xla_extension.XlaRuntimeError: RESOURCE_EXHAUSTED: Out of memory while trying to allocate 50677260416 bytes.
```


### 実行結果 {#output-result}

指定した出力ディレクトリに入力JSONファイル内で `name` で指定した文字列のディレクトリが作成されます（大文字は小文字に変換されます）。同じ名前のディレクトリがすでに存在する場合は日時の文字列が後ろに追加されます。

このディレクトリ中の `<nameで指定した文字列>_model.cif` が**予測された立体構造のファイル**です。立体構造の可視化には**PyMOL**等をご使用ください。

```
y-okuda-pg@at022vm02:~/alphafold3$ ls -l output/aziu2_aziu3_pred/
total 15200
-rw-r--r-- 1 y-okuda-pg ddbj-m-pg    13036 10月 14 19:45 TERMS_OF_USE.md
-rw-r--r-- 1 y-okuda-pg ddbj-m-pg 10868659 10月 14 19:45 aziu2_aziu3_pred_confidences.json
-rw-r--r-- 1 y-okuda-pg ddbj-m-pg  3912641 10月 14 19:41 aziu2_aziu3_pred_data.json
-rw-r--r-- 1 y-okuda-pg ddbj-m-pg   732784 10月 14 19:45 aziu2_aziu3_pred_model.cif
-rw-r--r-- 1 y-okuda-pg ddbj-m-pg     1029 10月 14 19:45 aziu2_aziu3_pred_summary_confidences.json
-rw-r--r-- 1 y-okuda-pg ddbj-m-pg      147 10月 14 19:45 ranking_scores.csv
drwxr-xr-x 2 y-okuda-pg ddbj-m-pg     4096 10月 14 19:44 seed-1_sample-0
drwxr-xr-x 2 y-okuda-pg ddbj-m-pg     4096 10月 14 19:44 seed-1_sample-1
drwxr-xr-x 2 y-okuda-pg ddbj-m-pg     4096 10月 14 19:44 seed-1_sample-2
drwxr-xr-x 2 y-okuda-pg ddbj-m-pg     4096 10月 14 19:44 seed-1_sample-3
drwxr-xr-x 2 y-okuda-pg ddbj-m-pg     4096 10月 14 19:45 seed-1_sample-4
```


## 分割実行 {#separate-execution}

**データベース検索パート**と**モデル推論パート**を分割して実行する場合について説明いたします。


### データベース検索パートの実行 {#execute-db-search}

データベース検索パートを分割実行する場合は、**一般解析区画**の**epyc**または**rome**パーティション、または**個人ゲノム解析区画**の**CPUノード**で実行します。


#### ジョブスクリプトの準備 {#prepare-job-scripts}

ジョブスクリプトのサンプルは `/lustre12/software/alphafold3/sample_scripts/run_alphafold3_msa.sh` または `/lustre10/software/alphafold3/sample_scripts/run_alphafold3_msa.sh` に置いてあります。

以下がデータベース検索パートを実行する`run_alphafold3_msa.sh`の内容になります。

```
#!/bin/bash
#SBATCH -p rome
#SBATCH -c 16
#SBATCH --mem-per-cpu=1g

INPUT_JSON_PATH="${HOME}/alphafold3/input/input.json"
OUTPUT_DIR="${HOME}/alphafold3/output"
MODEL_DIR="${HOME}/alphafold3/models"

DB_DIR="/lustre10/software/alphafold3/database"
IMAGE_PATH="/lustre12/softwar/alphafold3/alphafold3-v3.0.1.sif"

MAX_TEMPLATE_DATE="2099-12-31"
ALPHAFOLD3DIR="/app/alphafold"
HMMER3_BINDIR="/hmmer/bin"

apptainer exec \
    -B ${DB_DIR}:${DB_DIR} \
    ${IMAGE_PATH} \
    python3.11 ${ALPHAFOLD3DIR}/run_alphafold.py \
        --jackhmmer_binary_path="${HMMER3_BINDIR}/jackhmmer" \
        --nhmmer_binary_path="${HMMER3_BINDIR}/nhmmer" \
        --hmmalign_binary_path="${HMMER3_BINDIR}/hmmalign" \
        --hmmsearch_binary_path="${HMMER3_BINDIR}/hmmsearch" \
        --hmmbuild_binary_path="${HMMER3_BINDIR}/hmmbuild" \
        --db_dir="${DB_DIR}" \
        --model_dir=${MODEL_DIR} \
        --max_template_date=${MAX_TEMPLATE_DATE} \
        --json_path=${INPUT_JSON_PATH} \
        --output_dir=${OUTPUT_DIR} \
        --norun_inference
```

**2, 6, 7, 8, 10, 11行目**の`#SBATCH -p`, `INPUT_JSON_PATH`, `OUTPUT_DIR`, `MODEL_DIR`, `DB_DR`, `IMAGE_PATH`を自身の環境に合わせて修正してください。

- 2行目：

```
#SBATCH -p rome
```

#SBATCH -pで使用するパーティションを指定します。**epyc**パーティションを使用する場合は`epyc`, **rome**パーティションを使用する場合は`rome`を指定してください。

- 6行目：

```
INPUT_JSON_PATH="${HOME}/alphafold3/input/input.json"
```

INPUT_JSON_PATHは入力ファイルのパスです。

- 7行目：

```
OUTPUT_DIR="${HOME}/alphafold3/output"
```

OUTPUT_DIRはデータベース検索結果の出力ディレクトリです。

- 8行目：

```
MODEL_DIR="${HOME}/alphafold3/models"
```

MODEL_DIRはDeep Mind社から取得したモデルパラメータファイル（`af3.bin`）を置いたディレクトリです。

- 10行目：

```
DB_DIR="/lustre12/software/alphafold3/database"
```

DB_DIRは、実行場所が一般解析区画の場合 `/lustre10/software/alphafold3/database`、個人ゲノム解析区画の場合 `/lustre12/software/alphafold3/database` となります。個人ゲノム解析区画で**CPUノードを占有利用している場合**、ローカルのSSD（`/data1`）にコピーした配列・構造データベースを使用すると、lustreのデータベースを使用した場合と比較して実行時間が**10-40%**程度短縮されます。ローカルのSSDにデータベースをコピーした場合はコピー先のパスに変更してください。

- 11行目：

IMAGE_PATHは、実行場所が**一般解析区画**の場合 `/lustre10/software/alphafold3/alphafold3-v3.0.1.sif`、**個人ゲノム解析区画**の場合 `/lustre12/software/alphafold3/alphafold3-v3.0.1.sif` となります。

AlphaFold3 の実行スクリプト中ではMSAの処理に最大**32 CPUコア**を使用する設定ですが、**16 CPUコア**以上を指定しても処理速度の向上は見られません。そのため、使用するCPUコア数の割り当てを `-c 16` としてあります。


### ジョブ実行 {#execute-jobs}


#### 一般解析区画で実行する場合 {#exec-in-general-division}

以下が**slurm**へのジョブ登録コマンドです。**インタラクティブノード**（`a001`, `a002`, `a003`）から実行してください。

```
sbatch run_alphafold3_msa.sh
```

実行が完了すると、指定した出力ディレクトリに入力JSONファイル内で `name` で指定した文字列のディレクトリが作成されます（大文字は小文字に変換されます）。同じ名前のディレクトリがすでに存在する場合は日時の文字列が後ろに追加されます。このディレクトリに、`<nameで指定した文字列>_data.json` というファイル名でJSONファイルが1個出力されます。

```
$ ls -l output/aziu2_aziu3_pred
total 2128
-rw-r--r-- 1 y-okuda-pg ddbj-m-pg 2177352 10月 16 16:03 aziu2_aziu3_pred_data.json
```

このJSONファイルは、**次のモデル推論パートの入力ファイル**として使用します。

**一般解析区画と個人ゲノム解析区画の間では、ファイルのコピーができません。** **ユーザー様のご使用になっているPC**を経由してJSONファイルを個人ゲノム解析区画にコピーしてください。


#### 個人ゲノム解析区画のCPUノードで実行する場合 {#exec-in-personal-genome-division}

ジョブスクリプトを`bash`で実行してください。

```
bash run_alphafold3_msa.sh > stdout_file
```

ご使用になるCPUノードに**slurm**のインストールを申請している場合は、以下のようにsbatchコマンドでslurmにジョブを登録して実行することも可能です。`-p`オプションで使用するパーティション名を指定してください。

```
sbatch -p xxx -c 16 --mem-per-cpu=1g run_alphafold3_msa.sh
```

実行が完了すると、指定した出力ディレクトリに入力JSONファイル内で `name` で指定した文字列のディレクトリが作成されます（大文字は小文字に変換されます）。同じ名前のディレクトリがすでに存在する場合は日時の文字列が後ろに追加されます。このディレクトリに、`<nameで指定した文字列>_data.json` というファイル名でJSONファイルが1個出力されます。

```
$ ls -l output/aziu2_aziu3_pred
total 2128
-rw-r--r-- 1 y-okuda-pg ddbj-m-pg 2177352 10月 16 16:03 aziu2_aziu3_pred_data.json
```

このJSONファイルは、**次のモデル推論パートの入力ファイル**として使用します。


### モデル推論パートの実行 {#execute-model-inference}


#### 実行環境へのアクセス {#access-execution-env}

AlphaFold3の**推論パート**は**個人ゲノム解析区画**の**アクセラレータ最適化ノード Type2**で実行します。

アクセラレータ最適化ノード Type2へのアクセス方法は [アクセラレータ最適化ノード Type 2 (L40Sノード)の使い方 | NIG supercomputer](/guides/using_personal_genome_division/GPU_nodes_type2/) をご参照ください。


#### ジョブスクリプトの準備 {#prep-job-scripts}

ジョブスクリプトのサンプルは `/lustre12/software/alphafold3/sample_scripts/run_alphafold3_inference.sh` に置いてあります。

以下が推論パートを実行する`run_alphafold3_inference.shの内容になります。

```
#!/bin/bash
#SBATCH -p l40s
#SBATCH -A l40s
#SBATCH --gres=gpu:1
#SBATCH -c 1
#SBATCH --mem-per-cpu=16g

INPUT_JSON_PATH="${HOME}/alphafold3/output/pred_name/pred_name_data.json"
OUTPUT_DIR="${HOME}/alphafold3/output"
MODEL_DIR="${HOME}/alphafold3/models"

DB_DIR="/data1/alphafold3/database"
IMAGE_PATH="/lustre12/software/alphafold3/alphafold3-v3.0.1.sif"

MAX_TEMPLATE_DATE="2099-12-31"
ALPHAFOLD3DIR="/app/alphafold"
HMMER3_BINDIR="/hmmer/bin"

apptainer exec \
    --nv \
    -B ${DB_DIR}:${DB_DIR} \
    ${IMAGE_PATH} \
    python3.11 ${ALPHAFOLD3DIR}/run_alphafold.py \
        --jackhmmer_binary_path="${HMMER3_BINDIR}/jackhmmer" \
        --nhmmer_binary_path="${HMMER3_BINDIR}/nhmmer" \
        --hmmalign_binary_path="${HMMER3_BINDIR}/hmmalign" \
        --hmmsearch_binary_path="${HMMER3_BINDIR}/hmmsearch" \
        --hmmbuild_binary_path="${HMMER3_BINDIR}/hmmbuild" \
        --db_dir="${DB_DIR}" \
        --model_dir=${MODEL_DIR} \
        --max_template_date=${MAX_TEMPLATE_DATE} \
        --json_path=${INPUT_JSON_PATH} \
        --output_dir=${OUTPUT_DIR} \
        --norun_data_pipeline
```

**8-10行目**の`INPUT_JSON_PATH`, `OUTPUT_DIR`, `MODEL_DIR`を自身の環境に合わせて修正してください。

- 8行目：

```
INPUT_JSON_PATH="${HOME}/alphafold3/output/pred_name/pred_name_data.json"
```

INPUT_JSON_PATHは**データベース検索パート**で`run_alphafold3_msa.sh`の実行により出力されたJSONファイルのパスです。

- 9行目：

```
OUTPUT_DIR="${HOME}/alphafold3/output"
```

OUTPUT_DIRは**モデル推論結果**の出力ディレクトリです。

- 10行目：

```
MODEL_DIR="${HOME}/alphafold3/models"
```

MODEL_DIRはDeep Mind社から取得した**モデルパラメータファイル**（`af3.bin`）を置いたディレクトリです。


#### ジョブ実行 {#execute-jobs}

**slurm**へのジョブの登録は以下のコマンドになります。**GPU用slurmログインノード**から実行してください。

```
sbatch run_alphafold3_inference.sh
```

入力アミノ酸配列が長すぎる場合は以下のようなエラーがslurmの出力ファイルに出力されます。**L40S**の場合、**3500アミノ酸程度**が限界のようです。

```
jaxlib.xla_extension.XlaRuntimeError: RESOURC
```


#### 実行結果 {#execution-output}

指定した出力ディレクトリに入力JSONファイルの `name` で指定したディレクトリが作成されます（大文字は小文字に変換されます）。同じ名前のディレクトリがすでに存在する場合は日時の文字列が後ろに追加されます。

このディレクトリ中の `<name>_model.cif` が**予測された立体構造**のファイルです。立体構造の可視化には**PyMOL**等をご使用ください。

```
y-okuda-pg@at022vm02:~/alphafold3$ ls -l output/aziu2_aziu3_pred/
total 15200
-rw-r--r-- 1 y-okuda-pg ddbj-m-pg    13036 10月 14 19:45 TERMS_OF_USE.md
-rw-r--r-- 1 y-okuda-pg ddbj-m-pg 10868659 10月 14 19:45 aziu2_aziu3_pred_confidences.json
-rw-r--r-- 1 y-okuda-pg ddbj-m-pg  3912641 10月 14 19:41 aziu2_aziu3_pred_data.json
-rw-r--r-- 1 y-okuda-pg ddbj-m-pg   732784 10月 14 19:45 aziu2_aziu3_pred_model.cif
-rw-r--r-- 1 y-okuda-pg ddbj-m-pg     1029 10月 14 19:45 aziu2_aziu3_pred_summary_confidences.json
-rw-r--r-- 1 y-okuda-pg ddbj-m-pg      147 10月 14 19:45 ranking_scores.csv
drwxr-xr-x 2 y-okuda-pg ddbj-m-pg     4096 10月 14 19:44 seed-1_sample-0
drwxr-xr-x 2 y-okuda-pg ddbj-m-pg     4096 10月 14 19:44 seed-1_sample-1
drwxr-xr-x 2 y-okuda-pg ddbj-m-pg     4096 10月 14 19:44 seed-1_sample-2
drwxr-xr-x 2 y-okuda-pg ddbj-m-pg     4096 10月 14 19:44 seed-1_sample-3
drwxr-xr-x 2 y-okuda-pg ddbj-m-pg     4096 10月 14 19:45 seed-1_sample-4
```

## モデル推論時のUnified Memoryの有効化 {#enable-unified-memory-during-model-inference}

環境変数 `XLA_PYTHON_CLIENT_PREALLOCATE`, `TF_FORCE_UNIFIED_MEMORY`, `XLA_CLIENT_MEM_FRACTION` の値を変更すると、Unified Memoryが有効化されます（AlphaFold3の[ドキュメント](https://github.com/google-deepmind/alphafold3/blob/main/docs/performance.md#unified-memory)）。

Unified Memoryを有効にするとGPUのVRAMに十分な空き容量がない場合にプログラムがホストメモリも使用できるようになりますが、プログラムの動作速度は低下します。

Unified Memoryを有効化する場合は、以下のサンプルスクリプトのように `apptainer` の `--env` オプションを追加（22-24行目）してapptainerイメージ内に設定されている環境変数 `XLA_PYTHON_CLIENT_PREALLOCATE`, `TF_FORCE_UNIFIED_MEMORY`, `XLA_CLIENT_MEM_FRACTION` の値を変更してください。

```
#!/bin/bash
#SBATCH -p l40s
#SBATCH -A l40s
#SBATCH --gres=gpu:1
#SBATCH -c 1
#SBATCH --mem-per-cpu=128g

INPUT_JSON_PATH="${HOME}/alphafold3/input/input_data.json"
OUTPUT_DIR="${HOME}/alphafold3_test/output"
MODEL_DIR="${HOME}/alphafold3_test/models"

DB_DIR="/data1/alphafold3/database"
IMAGE_PATH="/lustre12/software/alphafold3/alphafold3-v3.0.1.sif"

MAX_TEMPLATE_DATE="2099-12-31"
ALPHAFOLD3DIR="/app/alphafold"
HMMER3_BINDIR="/hmmer/bin"

apptainer exec \
    --nv \
    -B ${DB_DIR}:${DB_DIR} \
    --env 'XLA_PYTHON_CLIENT_PREALLOCATE=false' \
    --env 'TF_FORCE_UNIFIED_MEMORY=true' \
    --env 'XLA_CLIENT_MEM_FRACTION=3.2' \
    ${IMAGE_PATH} \
    python3.11 ${ALPHAFOLD3DIR}/run_alphafold.py \
        --jackhmmer_binary_path="${HMMER3_BINDIR}/jackhmmer" \
        --nhmmer_binary_path="${HMMER3_BINDIR}/nhmmer" \
        --hmmalign_binary_path="${HMMER3_BINDIR}/hmmalign" \
        --hmmsearch_binary_path="${HMMER3_BINDIR}/hmmsearch" \
        --hmmbuild_binary_path="${HMMER3_BINDIR}/hmmbuild" \
        --db_dir="${DB_DIR}" \
        --model_dir=${MODEL_DIR} \
        --max_template_date=${MAX_TEMPLATE_DATE} \
        --json_path=${INPUT_JSON_PATH} \
        --output_dir=${OUTPUT_DIR} \
        --norun_data_pipeline
```
