---
id: Slurm
title: Overview of Slurm
---

Slurm is a type of program known as a job scheduler or resource scheduler, which automatically allocates computing resources (such as CPU cores or memory) to each user in environments utilized by numerous users.
- The general analysis section uses Grid Engine.
- The personal genome analysis section can use either Grid Engine or Slurm.

Slurm is an open-source job scheduler software, with commercial support provided by one of its developers, SchedMD in the USA. It is software with numerous usage records in large cluster supercomputers both in Japan and abroad, including the USA's LLNL (Lawrence Livermore National Laboratory). It is also available as a job scheduler for HPC on several public clouds.

Reference materials:

- [SchedMD's (developer) Quick Start User Guide](https://slurm.schedmd.com/quickstart.html)
- [Slurm's online manual page](https://slurm.schedmd.com/man_index.html)
- [Summary table of Slurm commands](https://slurm.schedmd.com/pdfs/summary.pdf)
- [SchedMD's (developer) Tutorial](https://slurm.schedmd.com/tutorials.html)
- [Rosetta Stone of Workload Manager](https://slurm.schedmd.com/rosetta.pdf)

## Types of Jobs

In the personal genome analysis section's Slurm, the following three types of jobs are mainly used. (Although the Slurm documentation does not explicitly categorize parallel jobs, they are classified separately here for correspondence with the AGE of the genetic research supercomputer's explanation.)

- [Interactive jobs](software/Slurm/interactive_jobs.md)
  - Used when interacting with the supercomputer.
- [Batch jobs](software/Slurm/batch_jobs.md)
  - Used when running a small number of programs that use only one CPU core.
- [Parallel jobs](software/Slurm/parallel_jobs.md)
  - Used when running a small number of programs that use multiple CPU cores simultaneously.
- [Array jobs](software/Slurm/array_jobs.md)
  - Used when sequentially running many batch or parallel jobs.

(For more details on other types of jobs, please refer to the official manual.)

## Other Commands

The primary commands used are as follows:

- squeue
    - Check the current status of jobs.
- scancel
    - Delete a job.
- scontrol
    - Change the settings of a job.

For details, please refer to the section on [other commands](/software/Slurm/other_commands) and the official manual.

## When a Job Does Not Start

1. Check the job settings, mainly in the following aspects:
    - Ensure the amount of computing resources requested in the job script is correct. Confirm that the description does not exceed the memory amount per node or the physical CPU core count.
    - Verify that the executable time is not requesting beyond the partition settings.
2. Check the congestion status of the supercomputer.
    - Refer to the usage status with commands like sinfo. (Refer to [How to check the congestion status of the entire cluster](/software/Slurm/other_commands#how-to-check-the-congestion-status-of-the-entire-cluster-sinfo-squeue))
    - Judge the situation based on the job status displayed in the ST field by the squeue command. (Refer to [Description of job statuses](/software/Slurm/other_commands#description-of-job-statuses-st-field))
    - Check the reason for the waiting state shown in the NODELIST(REASON) field by the squeue command. (Refer to [How to check the reason why a job is not executing](/software/Slurm/other_commands#how-to-check-the-reason-why-a-job-is-not-executing))
