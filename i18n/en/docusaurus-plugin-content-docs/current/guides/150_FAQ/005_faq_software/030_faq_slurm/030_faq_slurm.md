---
id: faq_slurm
title: "FAQ: Slurm"
---

## &#x1F180; I requested to use 128 cores, but it appears that only 32 cores are actually being used. {# exceeding_32-jobs_limit}

&#x1F150; If no specific settings are applied on the Slurm master daemon side, it becomes impossible to prevent a single user from occupying all cores on all compute nodes by submitting a large number of jobs.

To address this, we have configured the system to allow a maximum of 32 jobs per user per partition.

In this situation, if you would like to use, for example, 128 cores in parallel, you can achieve this by using parallel jobs.


#### Example 1: Submitting one job that uses 128 cores  (You should group programs with similar expected runtime to ensure balanced use and write the job script accordingly.)


```
```bash
#!/bin/bash
#SBATCH --job-name=multi_prog
#SBATCH --ntasks=128
#SBATCH --cpus-per-task=1
#SBATCH --time=00:10:00
#SBATCH --partition=normal

# Array of 128 commands
commands=(
    "python3 prog_000.py --foo 1"
    "python3 prog_001.py --bar 2"
    "python3 prog_002.py input.txt"
    "bash run_analysis.sh sampleA"
    # ... Add more up to 128 commands
)

# Launch each command in the background with srun
for i in "${!commands[@]}"; do
    srun --exclusive -N1 -n1 bash -c "${commands[i]}" &
done

wait
```


#### Example 2: Converting an array job of 128 tasks into a single parallel job

Suppose you originally had the following array job script:

```
#!/bin/bash
#SBATCH --job-name=arrayjob
#SBATCH --array=0-127
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --time=00:10:00
#SBATCH --partition=normal

INPUT_FILE=$(printf "input_%03d.txt" ${SLURM_ARRAY_TASK_ID})
python3 process.py "$INPUT_FILE"
```

To run this as a parallel job using 128 cores (counted as one job in Slurm), you can modify it like this:

```
#!/bin/bash
#SBATCH --job-name=paralleljob
#SBATCH --ntasks=128
#SBATCH --cpus-per-task=1
#SBATCH --time=00:10:00
#SBATCH --partition=normal

# Assign one task per core, running in background
for i in $(seq 0 127); do
    INPUT_FILE=$(printf "input_%03d.txt" $i)
    srun --exclusive -N1 -n1 python3 process.py "$INPUT_FILE" &
done

wait  # Wait for all background tasks to finish
```
