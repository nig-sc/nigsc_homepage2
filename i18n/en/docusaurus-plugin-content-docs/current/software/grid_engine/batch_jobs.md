---
id: batch_jobs
title: Batch Jobs (batch job)
---


## How to use the batch job

When you run a small number of programs that use only one CPU core and run for a long time, run them as the batch job. (When you execute many jobs, use the array job described later.)


Example: to execute the following shell script(example.sh)

This shell script will generate a list of biotools Singularity containers installed on the NIG Supercomputer.

```bash
#!/bin/bash

ls /usr/local/biotools > $1
```

Prepare `job_script.sh` as follows and execute ` qsub job_script.sh `.
Then the batch job will be submitted to the queue of Grid Engine.

```
#!/bin/bash

#$ -cwd 
#$ -V 
#$ -l short
#$ -l d_rt=00:10:00
#$ -l s_rt=00:10:00
#$ -l s_vmem=4G 
#$ -l mem_req=4G
#$ -N an_example
#$ -S /bin/bash


example.sh biotools_list.txt
```

- `-cwd`: The batch job will be executed in the same directory as the current. Without this option, the job will be executed in `$HOME` directory.
- `-V` : All environment variables when you execute `qsub` are inherited to the compute node that executes the batch job.
- `l short` : Specifies the type of queue that submits the batch job.
    - The general analysis section has queues such as `epyc`,` intel`, `gpu`,` short`, `medium` and etc. for each computer type. For details, see the [UGE Queue Type](/general_analysis_division/ga_introduction#uge%E3%82%AD%E3%83%A5%E3%83%BC%E3%81%AE%E7%A8%AE%E9%A1%9E) page.
    - On the personal genome analysis section, it depends on the configuration. When you specify nothing, only the `all` queue exists, so specify `-l all`.


- `-l d_rt`, `-l s_rt`  : the maximum execution time for the batch job.
    -The batch job will be forcibly terminated when the maximum execution time has passed from the start of the batch job.
    - Therefore, it is safer to specify the upper limit of the execution time a little longer, but when it is too long, the job may not be executed easily.
    - In this example, `00:10:00` specifies 10 minutes.
    - For example, when you specify a job execution frame of up to 8 days because the job is expected to be completed within 8 days, specify 192 hours (8 days x 24 hours) `192:00:00` for the option.
    - The maximum time is 2976 hours(= about 4 months). (However, the `short` queue is 1 hour.)
    - When this option is not specified, 72 hours = 3 days (default value) is specified.
    - The `-l d_rt` and `-l s_rt` options must have the same value.

- `-l s_vmem`,` -l mem_req`: Specify the amount of memory to use. Normally, specify the same value for `-l s_vmem` and` -l mem_req`. You can use G, M, K, etc. as the unit.
- `-N`: Specify the job name.
- `-S`: Specify the interpreter used to execute the script (`example.sh` in this example).





