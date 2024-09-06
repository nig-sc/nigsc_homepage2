---
id: interactive_jobs
title: Interactive Jobs
---

When you need an interactive job, for instance, to perform calculations using a large amount of memory and CPU on a compute node but want to check the results in real-time, the following processes might be necessary:

- Debugging and testing
  - Debugging programs or scripts
  - Work where immediate evaluation of parameters or code changes is desired
- Data analysis and exploration tasks
  - Real-time data exploration and visualization
- Software installation and configuration
  - Interactive installation tasks for custom software or libraries

If you need to perform processes like those mentioned above and want to use the interactive job feature of the job management system, please specify the configuration of interactive (login) nodes and Slurm's interactive job partitions along with the compute node configuration when applying for use of the personal genome analysis section.

Slurm supports an interactive job execution format for processing jobs interactively. In this case, the `srun` command is used. To log in to an interactive node that meets the requested resource conditions, similar to the `qlogin` command, you can use the `--pty` option as follows:

```
srun --pty bash
```
For detailed options of the `srun` command, please refer to the online manual.
- [Online manual for the srun command](https://slurm.schedmd.com/srun.html)

The command `srun --pty bash` means to launch bash on a node that matches the resource conditions and attach it to a pseudoterminal.

For example, if you want to log in to one of the compute nodes from the login node of the assigned personal genome analysis section via Slurm, you can do as follows:

```
yxxxx-pg@at022vm02:~$ hostname
at022vm02
yxxxx-pg@at022vm02:~$ squeue
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
yxxxx-pg@at022vm02:~$ srun --pty bash
yxxxx-pg@igt010:~$ hostname
igt010
yxxxx-pg@igt010:~$ squeue
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
               757 parabrick     bash yxxxx-pg  R       0:46      1 igt010

```
In the example above, the output of the `squeue` command after logging in shows that the bash launched by `srun` appears as a job, and you are logged into one of the compute nodes assigned to the parabrick partition, igt010.

If you do not want to specify options multiple times when entering the `srun` command on the login node, you can reserve computational resources in advance with the `salloc` command. Then, you do not need to specify options for subsequent `srun` commands. `salloc` requests the allocation of resources with specified options. In this case, only the allocation is performed without executing any job. The allocated resources are then used for job execution with `srun`.

```
yxxxx-pg@at022vm02:~$ salloc --mem=50g
salloc: Granted job allocation 765
yxxxx-pg@at022vm02:~$ squeue
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
               765 parabrick interact yxxxx-pg  R       0:02      1 igt010
yxxxx-pg@at022vm02:~$ srun hostname
igt010
yxxxx-pg@at022vm02:~$ srun hostname
igt010
yxxxx-pg@at022vm02:~$ env |grep SLURM_MEM_PER_NODE
SLURM_MEM_PER_NODE=51200
yxxxx-pg@at022vm02:~$ exit
exit
salloc: Relinquishing job allocation 765
yxxxx-pg@at022vm02:~$ 

```
In the execution example above, resources are allocated on igt010 by `salloc`, and jobs are executed with `srun`. You can see that 50GB of memory is allocated by referring to `SLURM_MEM_PER_NODE`.

## How to Specify Options for Various Job Executions

The way to specify options when executing various jobs with the `srun` command is the same as the method of specifying directive lines explained for batch job execution. For more details, please refer to that explanation.