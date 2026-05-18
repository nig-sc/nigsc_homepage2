---
id: job_submission_notes
title: Notes on Job Submission in the Personal Genome Analysis Division
---

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
