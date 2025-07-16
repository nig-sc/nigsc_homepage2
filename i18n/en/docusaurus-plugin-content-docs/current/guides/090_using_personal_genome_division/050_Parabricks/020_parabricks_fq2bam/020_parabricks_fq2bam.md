---
id: parabricks_fq2bam
title: "Running fq2bam with Parabricks"
---



## Application for Access

To run Parabricks, GPU compute nodes are required.
Currently, due to the limited number of GPU nodes, they are located within the *Personal Genome Analysis* section.
Even if your analysis does not involve personal genomes, you must create an account in this section and submit a usage plan.



## SSH Login to Interactive Node

To use GPU nodes, log in first to the `at022vm02` node:

```bash
ssh at022vm02
```



## Downloading Tutorial Data Files

Reference:
[https://docs.nvidia.com/clara/parabricks/latest/tutorials/fq2bam\_tutorial.html](https://docs.nvidia.com/clara/parabricks/latest/tutorials/fq2bam_tutorial.html)

As an example, download the reference genome and paired-end read data used in the tutorial:

```bash
wget -O parabricks_sample.tar.gz "https://s3.amazonaws.com/parabricks.sample/parabricks_sample.tar.gz"
```

Extract the data:

```bash
tar zxvf parabricks_sample.tar.gz
```



## Apptainer Equivalent to Official Docker Example

The official tutorial suggests running `fq2bam` with Docker like this:

```bash
docker run \
  --gpus all \
  --rm \
  --volume $(pwd):/workdir \
  --volume $(pwd):/outputdir \
  nvcr.io/nvidia/clara/clara-parabricks:4.5.1-1 \
  pbrun fq2bam \
    --ref /workdir/parabricks_sample/Ref/Homo_sapiens_assembly38.fasta \
    --in-fq /workdir/parabricks_sample/Data/sample_1.fq.gz /workdir/parabricks_sample/Data/sample_2.fq.gz \
    --out-bam /outputdir/fq2bam_output.bam
```

The equivalent using Apptainer is:

```bash
apptainer exec \
  --nv \
  --bind "$(pwd)":/workdir \
  --bind "$(pwd)":/outputdir \
  clara-parabricks.sif \
  pbrun fq2bam \
    --ref /workdir/parabricks_sample/Ref/Homo_sapiens_assembly38.fasta \
    --in-fq /workdir/parabricks_sample/Data/sample_1.fq.gz /workdir/parabricks_sample/Data/sample_2.fq.gz \
    --out-bam /outputdir/fq2bam_output.bam \
    --num-gpus 8
```

- `--nv` enables NVIDIA GPU access inside the container.
- You should specify the number of GPUs explicitly with `--num-gpus`.



## Running the Job via Slurm `sbatch`

To run the `fq2bam` job using Slurm, prepare a job script (e.g., `run_fq2bam.sh`) like below:

```bash
#!/bin/bash
#SBATCH --job-name=fq2bam
#SBATCH --output=fq2bam_%j.out
#SBATCH --error=fq2bam_%j.err
#SBATCH --partition=l40s
#SBATCH --account=l40s
#SBATCH --gres=gpu:1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=16
#SBATCH --mem=94G
#SBATCH --time=01:00:00

apptainer exec \
  --nv \
  --bind "$(pwd)":/workdir \
  --bind "$(pwd)":/outputdir \
  clara-parabricks.sif \
  pbrun fq2bam \
    --ref /workdir/parabricks_sample/Ref/Homo_sapiens_assembly38.fasta \
    --in-fq /workdir/parabricks_sample/Data/sample_1.fq.gz /workdir/parabricks_sample/Data/sample_2.fq.gz \
    --out-bam /outputdir/fq2bam_output.bam \
    --num-gpus 1
```

Submit with:

```bash
sbatch run_fq2bam.sh
```



### Recommended Resource Configuration for L40S Nodes

| GPU Count | `--cpus-per-task` | `--mem` | Ref. Core Count | Parabricks Thread Req. | Parabricks RAM Req. |
| --------- | ----------------- | ------- | --------------- | ---------------------- | ------------------- |
| 1         | 16                | 94GB    | 8               | —                      | —                   |
| 2         | 32                | 188GB   | 16              | 24                     | 100GB               |
| 4         | 64                | 376GB   | 32              | 32                     | 196GB               |
| 8         | 128               | 752GB   | 64              | 48                     | 392GB               |

*Note: Threads refer to logical (hyperthreaded) CPUs.*



## About `--bwa-options="-K"` Message

If you see:

```
Set --bwa-options="-K #" to produce compatible pair-ended results...
```

This means `fq2bam` uses a GPU-accelerated BWA-MEM internally, and for output to match that of the original BWA-MEM, you may specify:

```bash
--bwa-options="-K 10000000"
```



## Using Local SSD Storage for Improved Performance

To stage data on node-local storage and improve I/O speed:

1. Create a staging job to copy input to `/data1`.
2. Run the computation job.
3. Clean up the `/data1` directory.

All jobs must run on the same node. Use `--nodelist` to ensure this.



### Staging Job (`stage_fq2bam.sh`)

```bash
#!/bin/bash
#SBATCH --job-name=stage_fq2bam
#SBATCH --output=stage_fq2bam_%j.out
#SBATCH --error=stage_fq2bam_%j.err
#SBATCH --partition=l40s
#SBATCH --account=l40s
#SBATCH --time=00:20:00

LOCAL_BASE=/data1/$USER/workdir
mkdir -p "$LOCAL_BASE"
cp -r "$SLURM_SUBMIT_DIR/parabricks_sample" "$LOCAL_BASE/"
```



### Main Job (`run_fq2bam.sh`)

```bash
#!/bin/bash
#SBATCH --job-name=run_fq2bam
#SBATCH --output=run_fq2bam_%j.out
#SBATCH --error=run_fq2bam_%j.err
#SBATCH --partition=l40s
#SBATCH --account=l40s
#SBATCH --gres=gpu:1
#SBATCH --cpus-per-task=16
#SBATCH --mem=94G
#SBATCH --time=01:00:00

LOCAL_BASE=/data1/$USER/workdir
INPUT_DIR=$LOCAL_BASE/parabricks_sample
OUTPUT_DIR=$LOCAL_BASE/results

mkdir -p "$OUTPUT_DIR"
cd "$SLURM_SUBMIT_DIR"

apptainer exec \
  --nv \
  --bind "$INPUT_DIR":/workdir/parabricks_sample \
  --bind "$OUTPUT_DIR":/outputdir \
  clara-parabricks.sif \
  pbrun fq2bam \
    --ref /workdir/parabricks_sample/Ref/Homo_sapiens_assembly38.fasta \
    --in-fq /workdir/parabricks_sample/Data/sample_1.fq.gz /workdir/parabricks_sample/Data/sample_2.fq.gz \
    --out-bam /outputdir/fq2bam_output.bam \
    --num-gpus 1

cp "$OUTPUT_DIR/fq2bam_output.bam" "$SLURM_SUBMIT_DIR/"
```



### Cleanup Job (`clean_fq2bam.sh`)

```bash
#!/bin/bash
#SBATCH --job-name=clean_fq2bam
#SBATCH --output=clean_fq2bam_%j.out
#SBATCH --error=clean_fq2bam_%j.err
#SBATCH --partition=l40s
#SBATCH --account=l40s
#SBATCH --time=00:05:00

rm -rf /data1/$USER/workdir
```



### Submit Jobs with Dependencies (`run_fq2bam_with_local_staging.sh`)

```bash
NODE=l40s-02

jid1=$(sbatch --nodelist=$NODE stage_fq2bam.sh | awk '{print $4}')
jid2=$(sbatch --nodelist=$NODE --dependency=afterok:$jid1 run_fq2bam.sh | awk '{print $4}')
sbatch --nodelist=$NODE --dependency=afterok:$jid2 clean_fq2bam.sh
```

Run with:

```bash
bash run_fq2bam_with_local_staging.sh
```

Check job status:

```bash
squeue
```



## Checking Local Storage Content

### Using `sbatch`

Create `check_cleanup.sh`:

```bash
#!/bin/bash
#SBATCH --job-name=check_cleanup
#SBATCH --output=check_cleanup_%j.out
#SBATCH --error=check_cleanup_%j.err
#SBATCH --partition=l40s
#SBATCH --account=l40s
#SBATCH --time=00:05:00

tree /data1/$USER/workdir
```

Submit:

```bash
sbatch --nodelist=l40s-02 check_cleanup.sh
```

Check output:

```bash
cat check_cleanup_*.out
```



### Using `srun`

```bash
srun --partition=l40s --account=l40s --nodelist=l40s-02 --pty bash
```

Then on the allocated node:

```bash
tree /data1/$USER/workdir
```

Optionally clean up:

```bash
rm -rf /data1/$USER/workdir
```

Exit to finish the session:

```bash
exit
```
