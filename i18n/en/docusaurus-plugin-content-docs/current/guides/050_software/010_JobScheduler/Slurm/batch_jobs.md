---
id: batch_jobs
title: Batch Jobs
---

## How to Use Batch Jobs {#usage_batch_job}


Batch jobs should be executed as batch jobs when running a small number of programs that use only one CPU core for an extended period. In Slurm, the sbatch command is used to submit batch jobs.

- [Online manual for the sbatch command](https://slurm.schedmd.com/sbatch.html)

### General Explanation of Job Submission {#job_sub_expln}

For example, suppose you want to execute the following shell script (example.sh), which generates a list of Singularity containers of biotools installed on the NIG supercomputer.

```bash
#!/bin/bash

ls /usr/local/biotools > $1
```

Prepare a job_script.sh like the following and execute it with sbatch job_script.sh. This will queue the batch job in Slurm's queue (partition). Lines in the job submission script with #SBATCH are option directives for Slurm. (Please note that what was called a queue in AGE is called a partition in Slurm.)

```bash
#!/bin/bash
#SBATCH -t 0-00:10:00
#SBATCH --mem-per-cpu 4g
#SBATCH -J an_example

example.sh biotools_list.txt
```

- Unlike AGE, Slurm, by default, runs jobs in the current working directory where the sbatch command was executed. If you want to run a job in a different directory, please use the `--chdir` option to specify it.
- Unlike AGE, Slurm, by default, inherits all shell environment variables at the time of sbatch execution to the job's startup shell. If you want to inherit only specific environment variables (or not inherit them), please use the `--export` option. Please refer to the online manual for more details.
- `-p partition_name`: Specifies the type of queue (partition) to submit the batch job to.
  - For the personal genome analysis division, the available partition configuration depends on the system configuration applied for at the time of application. For details, please see the section on [Slurm Partition Configuration](/guides/using_personal_genome_division/pg_slurm_partition/).
- `-t 0-00:10:00`: The execution time limit for the batch job.
  - The batch job will be forcibly terminated if it exceeds this execution time limit.
  - It is safer to write a slightly longer execution time, but if it is too long, scheduling may become difficult and the job may not run. In that case, consider specifying `--time-min` in combination.
  - If `-t` is omitted, the partition's settings will apply.
  - Time can be written in formats like minutes, minutes:seconds, hours:minutes:seconds, days-hours, days-hours:minutes, and days-hours:minutes:seconds.
- `--mem-per-cpu` specifies the amount of memory. This indicates the amount of memory allocated per CPU core (task) assigned to the job. The units G, M, K can be used. The default unit is M if omitted. For the entire job, the amount of memory allocated will be the number of cores assigned to the job multiplied by the specified amount of memory, so please be careful.
- `-J`: Specifies the job name.

### Special Notes for Submitting Jobs in the Personal Genome Analysis Division {#notes_job_sub_personal_genome}
When using Parabricks (a job that utilizes GPUs) in the personal genome analysis division, even if the job is operating while monopolizing all GPUs on a compute node, there is a possibility that other jobs will start concurrently on the same compute node if there are available CPU cores and memory. If you want to monopolize a compute node for one job so that no other jobs run on the same compute node, you should do the following:

- `--gres=gpu:4` option to allocate GPUs

Then, please specify one of the following:

- `--mem` 384000 to obtain memory up to the maximum configuration limit (384GB) per compute node
- Specify the `--exclusive` option for exclusive use of the node

```bash
#!/bin/bash
#SBATCH -t 0-10:00:00
#SBATCH --gres:gpu:4
#SBATCH --mem=384000
#SBATCH -J an_example

your program
```
The `--mem` option sets the amount of memory allocated per node. Since the limit is set to 384GB per machine, no further jobs will flow into it.
```bash
#!/bin/bash
#SBATCH -t 0-10:00:00
#SBATCH --gres=gpu:4
#SBATCH --exclusive
#SBATCH -J an_example

your program
```
If the `--exclusive` option is specified, the CPU will be allocated with the maximum CPU core number per compute node, which is 48 cores, and the memory will be allocated with 4096MB (the default memory amount per CPU core) × 48 = 192GB.
This prevents other jobs from being queued to that compute node.
