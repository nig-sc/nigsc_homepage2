---
id: Alphafold_3_0_1
title: alphafold 3.0.1
---


## Overview {#overview}

AlphaFold3 is a protein structure prediction program developed by [DeepMind](https://deepmind.com/).

On the NIG supercomputer, an Apptainer image with [AlphaFold 3.0.1](https://github.com/google-deepmind/alphafold3/tree/v3.0.1) installed is provided, along with the sequence and structure databases required for AlphaFold3 and sample scripts for submitting jobs to SLURM.

The model parameter files required to run AlphaFold3 must be obtained directly by users from DeepMind, as [described later](#prep-model-params) in this manual.

AlphaFold3 should be executed on the Accelerator-Optimized Node Type 2 (L40S Node) within the Personal Genome Analysis division.
Use of the Personal Genome Analysis division requires prior application. Please refer to the [relevant documentation](/guides/using_personal_genome_division/pg_application/) and submit a usage application form along with your research plan.

On the L40S node, it is possible to predict the three-dimensional structure of proteins up to approximately 3,500 amino acid residues in length.
By enabling Unified Memory, larger proteins can also be predicted, although execution speed will be reduced, as [described later](#enable-unified-memory-during-model-inference).


## Execution Process of AlphaFold3 {#af3-exec-details}

Protein structure prediction with AlphaFold3 is performed through the following steps:
1. **Multiple Sequence Alignment (MSA)** of the input amino acid sequence against sequence databases using **jackhmmer** (CPU processing)
2. **Template search** against structure databases using **hmmsearch** (CPU processing)
3. **Model inference** (GPU processing)

If the input amino acid sequence represents a multimer, Steps 1 and 2 are executed separately for each subunit type composing the multimer.

The runtime for Steps 1–2 is approximately **500–800 seconds** for a single sequence of about **300 amino acid residues**.

When using an **L40S** node for Step 3, the approximate runtimes are as follows:

- 600 residues: **90 seconds**
- 1,100 residues: **180 seconds**
- 3,500 residues: **1,400 seconds**

When **Unified Memory** is enabled, larger proteins can also be predicted, though at reduced speed. The approximate runtimes in this case are:

- 3,900 residues: **2,100 seconds**
- 4,300 residues: **3,900 seconds**
- 4,700 residues: **12,900 seconds**

The database search (Steps 1–2, CPU) and model inference (Step 3, GPU) parts of AlphaFold3 can be executed separately by specifying the appropriate execution options.
If the process is run as a single combined job, please note that the runtime for the database search part will also be charged under the **L40S node usage fee**.
Usage fees for L40S nodes are calculated on a **daily basis** (rounded up to the nearest whole day).

When executing the processes separately, please use either the **General Analysis division** or the **Personal Genome Analysis division** CPU nodes for the database search part.
If you plan to use the CPU nodes of the Personal Genome Analysis division together with the L40S nodes, please include both in your **usage plan submission**.


## Preparation of a Model Parameter File {#prep-model-params}

Before running AlphaFold3, users must apply directly to **DeepMind** to obtain the required model parameter file and download it from the link provided by DeepMind.

To request access, please fill out the [Google Form[Google Form](https://docs.google.com/forms/d/e/1FAIpQLSfWZAgo1aYk0O4MuAXZj8xRQ8DafeFJnldNOnh_13qAx2ceZw/viewform) provided by DeepMind.
After submitting the form, a download link for the model parameter file will be sent to you by email within a few days.

Once downloaded, decompress the model parameter file using the zstd command as shown below.
The zstd command is preinstalled on all nodes of the NIG supercomputer.

```
zstd -d af3.bin.zst
```


## Preparation of Input Files {#prep-input-files}

The input sequence data for AlphaFold3 must be prepared in **JSON format**.
Please refer to the [AlphaFold3 documentation](https://github.com/google-deepmind/alphafold3/blob/main/docs/input.md) for details on how to create the JSON input file.


## Running the Entire Workflow in a Single Job {#run-entire-workflow}

This section describes how to execute both the **database search** and **model inference** parts of AlphaFold3 together on the **Accelerator-Optimized Node Type 2 (L40S node)** in the Personal Genome Analysis division.

### Access to the Execution Environment {#access-execution-env}

For information on how to access the L40S node, please refer to the [relevant documentation](/guides/using_personal_genome_division/GPU_nodes_type2/).


### Preparing the Job Script {#prep-job-scripts}

A sample job script is available at:
`/lustre12/software/alphafold3/sample_scripts/run_alphafold3.sh`

Below is the content of the job script (`run_alphafold3.sh`) to be submitted to **slurm**:

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

Please modify **lines 8–10** (`INPUT_JSON_PATH`, `OUTPUT_DIR`, `MODEL_DIR`) according to your environment.

- Line 8: Path to the input JSON file.

```
INPUT_JSON_PATH="${HOME}/alphafold3/input/input.json"
```

- Line 9: Directory where the output results will be stored.

```
OUTPUT_DIR="${HOME}/alphafold3/output"
```

- Line 10: Directory containing the model parameter file (`af3.bin`) obtained from DeepMind.
```
MODEL_DIR="${HOME}/alphafold3/models"
```

Within the AlphaFold3 execution script, the MSA process is configured to use up to **32 CPU cores**.
However, since there is no difference in performance when using **16 cores**, the script specifies `#SBATCH -c 16`.


### Job Execution {#execute-jobs}

To submit the job to **slurm**, run the following command:

```
sbatch run_alphafold3.sh
```

During execution, the standard output will be written to the current directory with the filename:

```
slurm-<jobId>.out
```

If the input amino acid sequence is too long, an error message similar to the following will appear in the SLURM output file, and the job will terminate.
For the L40S node, the upper limit appears to be approximately **3,500 amino acid residues**.

```
jaxlib.xla_extension.XlaRuntimeError: RESOURCE_EXHAUSTED: Out of memory while trying to allocate 50677260416 bytes.
```


### Output Result {#output-result}

In the specified output directory, a subdirectory will be created using the string specified as `name` in the input JSON file (uppercase letters are automatically converted to lowercase).
If a directory with the same name already exists, a timestamp string will be appended to the directory name.

Within this directory, the file named `<name>_model.cif` is the predicted **three-dimensional protein structure**.
You can visualize this structure using software such as **PyMOL**.

Example:

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


## Separate Execution {#separate-execution}

This section explains how to execute the **database search part** and **model inference part** of AlphaFold3 separately.


### Running the Database Search Part {#execute-db-search}

When running only the database search part, use either the **epyc** or **rome** partition in the **General Analysis division**, or a **CPU node** in the **Personal Genome Analysis division**.

#### Preparing the Job Script {#prepare-job-scripts}

Sample job scripts are available at: `/lustre12/software/alphafold3/sample_scripts/run_alphafold3_msa.sh` or `/lustre10/software/alphafold3/sample_scripts/run_alphafold3_msa.sh` .

Below is the content of `run_alphafold3_msa.sh`, which runs the database search part:

```
#!/bin/bash
#SBATCH -p rome
#SBATCH -c 16
#SBATCH --mem-per-cpu=1g

INPUT_JSON_PATH="${HOME}/alphafold3/input/input.json"
OUTPUT_DIR="${HOME}/alphafold3/output"
MODEL_DIR="${HOME}/alphafold3/models"

DB_DIR="/lustre10/software/alphafold3/database"
IMAGE_PATH="/lustre10/softwar/alphafold3/alphafold3-v3.0.1.sif"

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

Please modify the following lines according to your environment:
**Lines 2, 6, 7, 8, 10, and 11** (`#SBATCH -p`, `INPUT_JSON_PATH`, `OUTPUT_DIR`, `MODEL_DIR`, `DB_DR` and `IMAGE_PATH`)


- Line 2: Specifies the partition to use. Use `epyc` for the **epyc** partition, or `rome` for the **rome** partition.

```
#SBATCH -p rome
```

- Line 6: Path to the input JSON file.

```
INPUT_JSON_PATH="${HOME}/alphafold3/input/input.json"
```

- Line 7: Directory for storing the output of the database search part.

```
OUTPUT_DIR="${HOME}/alphafold3/output"
```

- Line 8: Directory containing the model parameter file (`af3.bin`) obtained from DeepMind.

```
MODEL_DIR="${HOME}/alphafold3/models"
```

- Line 10: Path to the sequence and structure databases.
    - When running in the **General Analysis division**, set to `/lustre10/software/alphafold3/database`.
    - When running in the **Personal Genome Analysis division**, set to `/lustre12/software/alphafold3/database`.

```
DB_DIR="/lustre12/software/alphafold3/database"
```

If you are using **dedicated CPU nodes** in the Personal Genome Analysis division, copying the databases to the local SSD (`/data1`) can shorten the runtime by approximately **10–40%** compared to using the Lustre-based database.
If you do so, modify DB_DIR to point to the copied database path.

- Line 11: `IMAGE_PATH`
    - When running in the **General Analysis division**, use `/lustre10/software/alphafold3/alphafold3-v3.0.1.sif`
    - When running in the **Personal Genome Analysis division**, use `/lustre12/software/alphafold3/alphafold3-v3.0.1.sif`

Within the AlphaFold3 execution script, the MSA process is configured to use up to **32 CPU cores**, but assigning more than **16 cores** does not improve performance.
Therefore, the number of CPU cores is specified as `-c 16`.


### Job Execution {#execute-jobs}


#### When Running in the General Analysis Division {#exec-in-general-division}

Submit the job to **SLURM** using the following command.
Please execute it from one of the **interactive nodes** (`a001`, `a002` or `a003`):

```
sbatch run_alphafold3_msa.sh
```

When execution is complete, a directory will be created in the specified output directory using the string defined as `name` in the input JSON file (uppercase letters are automatically converted to lowercase).
If a directory with the same name already exists, a timestamp string will be appended to the name.
Inside that directory, a single JSON file named `<name>_data.json` will be generated.

```
$ ls -l output/aziu2_aziu3_pred
total 2128
-rw-r--r-- 1 y-okuda-pg ddbj-m-pg 2177352 10月 16 16:03 aziu2_aziu3_pred_data.json
```

This JSON file will be used as the **input file for the next step (model inference part)**.

Please note that files **cannot be directly copied between the General Analysis division and the Personal Genome Analysis division**.
Transfer the JSON file via your **local PC** before uploading it to the Personal Genome Analysis division.


#### When Running on a CPU Node in the Personal Genome Analysis Division {#exec-in-personal-genome-division}


Execute the job script directly using `bash`:

```
bash run_alphafold3_msa.sh > stdout_file
```

If **slurm** is installed on the CPU node you are using, you can alternatively submit the job via SLURM using the following command.
Specify the appropriate partition name with the `-p` option:

```
sbatch -p xxx -c 16 --mem-per-cpu=1g run_alphafold3_msa.sh
```

When the job finishes, a directory will be created in the specified output directory using the string defined as `name` in the input JSON file (uppercase letters are automatically converted to lowercase).
If a directory with the same name already exists, a timestamp string will be appended.
A single JSON file named `<name>_data.json` will be generated in that directory.

Example:

```
$ ls -l output/aziu2_aziu3_pred
total 2128
-rw-r--r-- 1 y-okuda-pg ddbj-m-pg 2177352 Oct 16 16:03 aziu2_aziu3_pred_data.json
```

This JSON file will be used as the **input for the next model inference step**.


### Running the Model Inference Part {#execute-model-inference}


#### Access to the Execution Environment {#access-execution-env}

The **model inference part** of AlphaFold3 should be executed on the **Accelerator-Optimized Node Type 2 (L40S node)** in the **Personal Genome Analysis division**.

For details on how to access the Accelerator-Optimized Node Type 2, please refer to the [relevant documentation](/guides/using_personal_genome_division/GPU_nodes_type2/).



#### Preparing the Job Script {#prep-job-scripts}

A sample job script is available at `/lustre12/software/alphafold3/sample_scripts/run_alphafold3_inference.sh`.

Below is the content of `run_alphafold3_inference.sh, which is used to run the model inference part:

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

Please modify **lines 8–10** (`INPUT_JSON_PATH`, `OUTPUT_DIR`, `MODEL_DIR`) to match your environment.

- Line 8: Path to the JSON file output from the **database search part** (`run_alphafold3_msa.sh`).

```
INPUT_JSON_PATH="${HOME}/alphafold3/output/pred_name/pred_name_data.json"
```

- Line 9: Directory where the **model inference results** will be saved.

```
OUTPUT_DIR="${HOME}/alphafold3/output"
```

- Line 10: Directory containing the **model parameter file** (`af3.bin`) obtained from DeepMind.

```
MODEL_DIR="${HOME}/alphafold3/models"
```



#### Job Execution {#execute-jobs}

Submit the job to **slurm** using the following command.
Please execute this from the **GPU login node**:

```
sbatch run_alphafold3_inference.sh
```

If the input amino acid sequence is too long, the following error message will appear in the SLURM output file, and the job will terminate.
On a **L40S node**, the upper limit appears to be approximately **3,500 amino acid residues**.

```
jaxlib.xla_extension.XlaRuntimeError: RESOURC
```


#### Output Results {#output-result}

In the specified output directory, a subdirectory will be created using the string defined as `name` in the input JSON file (uppercase letters are automatically converted to lowercase).
If a directory with the same name already exists, a timestamp string will be appended to the directory name.

Within this directory, the file `<name>_model.cif` contains the **predicted three-dimensional protein structure**.
You can visualize this structure using software such as **PyMOL**.

Example:

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

## Enabling Unified Memory During Model Inference {#enable-unified-memory-during-model-inference}

By modifying the environment variables `XLA_PYTHON_CLIENT_PREALLOCATE`, `TF_FORCE_UNIFIED_MEMORY` and `XLA_CLIENT_MEM_FRACTION`, Unified Memory can be enabled (as described in the AlphaFold3 [documentation](https://github.com/google-deepmind/alphafold3/blob/main/docs/performance.md#unified-memory)).

When Unified Memory is enabled, the program can utilize host memory in addition to GPU VRAM when sufficient VRAM is not available.
However, please note that the overall execution speed will decrease.

To enable Unified Memory, add the `--env` options to the `apptainer` command (lines 22–24 in the sample script below) to override the default environment variable settings inside the Apptainer image.

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
