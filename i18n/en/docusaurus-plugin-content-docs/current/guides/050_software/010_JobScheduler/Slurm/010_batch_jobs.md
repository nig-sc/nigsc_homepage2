---
id: batch_jobs
title: Batch Jobs
---

## How to Use Batch Jobs {#usage_batch_job}


Batch jobs should be executed as batch jobs when running a small number of programs that use only one CPU core for an extended period. In Slurm, the sbatch command is used to submit batch jobs.

- [Online manual for the sbatch command](https://slurm.schedmd.com/sbatch.html)


## Typical Execution Example {#job_sub_expln}

The `sbatch` command is executed as follows:

```
sbatch job_script.sh
```
 

Here, `job_script.sh` is a script that specifies the execution conditions for Slurm jobs.  
A typical example is shown below.


 
 
```
#!/bin/bash
#SBATCH -p epyc
#SBATCH -t 0-00:10:00
#SBATCH --mem-per-cpu 4g
#SBATCH -J an_example
 
your-program
```


- In Slurm, by default, jobs are executed in the current working directory from which the `sbatch` command is issued.  
  If you want to run a job in a different directory, please use the `--chdir` option to specify it.
- By default, Slurm inherits all shell environment variables at the time of `sbatch` execution into the job’s startup shell.  
  If you want to inherit only specific environment variables (or not inherit them), please use the `--export` option.  
  For details, please refer to the online manual.



### `-p` Partition Name

Specifies the type of queue (partition) to which the batch job is submitted.

For available partitions, please refer to the following pages:

- [List of partitions in the General Analysis Division](/guides/using_general_analysis_division/ga_slurm_partition/)
- List of partitions in the Personal Genome Analysis Division



### `-t` Batch Job Time Limit

Specifies the execution time limit for the batch job.

If the job exceeds this execution time limit after it starts running, it will be forcibly terminated.

On the NIG supercomputer, if this parameter is not specified, the default time limit is **3 days**  
(**1 hour for the `short` partition**).

For details on how to specify the execution time limit, please refer to [here](/guides/software/JobScheduler/Slurm/slurm_time#slurm-batch-time-detail).



### `--mem-per-cpu` Memory Allocation

Specifies the amount of memory allocated per CPU core (task) assigned to the job.  
Units `G`, `M`, and `K` can be used.  
If omitted, the unit is interpreted as `M`.



### `-J` Job Name

Specifies the job name.

The job name is used to allow users to quickly identify  
“which processing step this job corresponds to”  
when viewing job lists or managing job dependencies.

For example:

- `align_NA12878_step1`
- `qc_sampleA`
- `fq2bam_chr1`



### Execution Commands (Processes Run on Compute Nodes)

At the end of `job_script.sh`, write one or more commands that you want to execute on the compute node.

Commands written here are executed on the compute nodes allocated by Slurm,  
not on the login node.

You can specify any command that can be executed as a normal Linux command, for example:

- Shell scripts (bash)
- Python programs
- Precompiled C/C++ executables
- Other commands (R, Java, Singularity, etc.)

Below are minimal examples that illustrate  
“what happens when a job is executed by Slurm”  
using bash, Python, and C.



Example: Running a Bash Script

[`job_script.sh` (excerpt)]


```
#!/bin/bash
#SBATCH -p epyc
#SBATCH -t 0-00:10:00
#SBATCH --mem-per-cpu 1g
#SBATCH -J bash_example
./run_analysis.sh
```

[run_analysis.sh]
```
#!/bin/bash

ls /usr/local/biotools > $1
```


In this example, a regular shell script (`run_analysis.sh`) is executed on a compute node.


Example: Running a Python Program

[`job_script.sh` (excerpt)]

```
#!/bin/bash
#SBATCH -p epyc
#SBATCH -t 0-00:10:00
#SBATCH --mem-per-cpu 2g
#SBATCH -J python_example
python analysis.py
```

[analysis.py]
```
import time
import socket
print(f"Running on host: {socket.gethostname()}")
for i in range(5):
    print(f"Step {i}")
    time.sleep(5)
print("Done")
```


In this example, `analysis.py` is executed by the Python interpreter on the compute node.

The standard output of the Python program is saved as a Slurm job log,  
and no interactive execution is performed.

---

Example: Running a C Program (Precompiled Executable)

Compile the program in advance on the login node:



```
gcc -O2 -o hello hello.c
```

[hello.c]
```
#include <stdio.h>
#include <unistd.h>
int main(void) {
    char hostname[256];
    gethostname(hostname, sizeof(hostname));
    printf("Hello from %s\n", hostname);
    sleep(10);
    printf("Finished\n");
    return 0;
}
```

[job_script.sh（抜粋）]
```
#!/bin/bash
#SBATCH -p epyc
#SBATCH -t 0-00:10:00
#SBATCH --mem-per-cpu 1g
#SBATCH -J c_example
./hello
```


In this example, the precompiled executable `hello` is launched directly on the compute node.

The executable must be located either in the current working directory at job submission time  
or in a directory included in the `PATH`.
