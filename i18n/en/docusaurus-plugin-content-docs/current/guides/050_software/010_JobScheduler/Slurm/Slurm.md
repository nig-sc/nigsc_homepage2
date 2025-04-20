---
id: Slurm
title: How to use Slurm
---

Slurm is a type of program known as a job scheduler or resource scheduler, which automatically allocates computing resources (such as CPU cores or memory) to each user in environments utilized by numerous users.

Slurm (Simple Linux Utility for Resource Management) is a powerful job scheduler designed for Linux, originally developed at Lawrence Livermore National Laboratory (LLNL). It is widely used, particularly in High-Performance Computing (HPC) environments. Initially created to efficiently manage large-scale parallel computing, it has been adopted by many supercomputers and research institutions. Slurm is released as open-source software and is available for free. Additionally, it is often provided as a package for major Linux distributions, making it easy to deploy on research lab servers.


Reference materials:

- [SchedMD's (developer) Quick Start User Guide](https://slurm.schedmd.com/quickstart.html)
- [Slurm's online manual page](https://slurm.schedmd.com/man_index.html)
- [Summary table of Slurm commands](https://slurm.schedmd.com/pdfs/summary.pdf)
- [SchedMD's (developer) Tutorial](https://slurm.schedmd.com/tutorials.html)
- [Rosetta Stone of Workload Manager](https://slurm.schedmd.com/rosetta.pdf)

## Types of Jobs

In general, job schedulers primarily use the following four types of jobs.
Slurm follows this classification for explanations as well.

- [Interactive jobs](/guides/software/JobScheduler/Slurm/interactive_jobs)
  - Used when interacting with the supercomputer.
- [Batch jobs](/guides/software/JobScheduler/Slurm/batch_jobs)
  - Used when running a small number of programs that use only one CPU core.
- [Parallel jobs](/guides/software/JobScheduler/Slurm/parallel_jobs)
  - Used when running a small number of programs that use multiple CPU cores simultaneously.
- [Array jobs](/guides/software/JobScheduler/Slurm/array_jobs)
  - Used when sequentially running many batch or parallel jobs.

For more details on other types of jobs, please refer to the official manual.

## Other Commands

The primary commands used are as follows:

- squeue
    - Check the current status of jobs.
- scancel
    - Delete a job.
- scontrol
    - Change the settings of a job.

For details, please refer to the section on [other commands](/guides/software/JobScheduler/Slurm/other_commands) and the official manual.

## When a Job Does Not Start

1. Check the job settings, mainly in the following aspects:
    - Ensure the amount of computing resources requested in the job script is correct. Confirm that the description does not exceed the memory amount per node or the physical CPU core count.
    - Verify that the executable time is not requesting beyond the partition settings.
2. Check the congestion status of the supercomputer.
    - Refer to the usage status with commands like sinfo. (Refer to [How to check the congestion status of the entire cluster](/guides/software/JobScheduler/Slurm/other_commands/#checking-the-overall-congestion-of-the-cluster-sinfo-squeue))
    - Judge the situation based on the job status displayed in the ST field by the squeue command. (Refer to [Description of job statuses](/guides/software/JobScheduler/Slurm/other_commands/#job-status-description-st-field))
    - Check the reason for the waiting state shown in the NODELIST(REASON) field by the squeue command. (Refer to [How to check the reason why a job is not executing](/guides/software/JobScheduler/Slurm/other_commands#how-to-check-the-reason-why-a-job-is-not-starting))
