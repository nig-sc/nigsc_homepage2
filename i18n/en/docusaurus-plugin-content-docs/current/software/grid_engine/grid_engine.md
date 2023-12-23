---
id: grid_engine
title: Grid Engine Overview
---

Grid Engine is a type of program called a job scheduler or resource scheduler. It automatically allocates computer resources (CPU cores and memory) to each user in environments using many users.
It functions as the Operating System when the entire cluster computer is considered as one computer.

- In the general analysis division, the Grid Engine is used.
- In the personal genome analysis division, Grid Engine or Slurm is available.

In bioinformatics, traditionally, Sun Grid Engine (SGE) has been widely used. SGE was replaced by Univa's Grid Engine, which is now supported by Altair and has become Altair Grid Engine (AGE). (For this reason, the current AGE official manual has a mixture of SGE, UGE, AGE and the generic term "Grid Engine".)

Reference

- [Sun Grid Engine for Dummies (2009)](http://web.archive.org/web/20151011170032/https://blogs.oracle.com/templedf/entry/sun_grid_engine_for_dummies)
- ["Parallelization and acceleration of analysis using the NIG supercomputer" (IIBMP2021 the handout for the Data Scientist Training Session )](https://www.slideshare.net/oogasawa/pptx-251567866)
- [Altair Grid Engine official website](https://www.altair.com/grid-engine/)
    - [Introuctory Guide](https://2021.help.altair.com/2021.1/AltairGridEngine/8.7.0/IntroductionGE.pdf)
    - [User's Guide](https://2021.help.altair.com/2021.1/AltairGridEngine/8.7.0/UsersGuideGE.pdf)
    - [Administrator's Guide](https://2021.help.altair.com/2021.1/AltairGridEngine/8.7.0/AdminsGuideGE.pdf)


For Grid Engine commands(qsub, qlogin, qstat, qalter, qdel, qacct), refer to the `man` page.


## Job Types

The following four types of jobs are mainly used by Grid Engine.

- [Interactive Jobs (interactive job)](/software/grid_engine/interactive_jobs)
    - To use the supercomputer interactively.
- [Batch Jobs (batch job)](/software/grid_engine/batch_jobs)
    - To run a small number of programs that use only one CPU core
- [Parallel Jobs (parallel job)](/software/grid_engine/parallel_jobs)
    - To run a small number of programs that use multiple CPU cores at the same time
- [Array Jobs (array job)](/software/grid_engine/array_jobs)
    - To run a large number of batch jobs or parallel jobs sequentially

You can find other job descriptions, etc. in the official manual.

## Other Commands

Mainly used commands

- qstat
    - Show job states
- qdel
    - Delete job
- qalter
    - Change job settings

For more information, see the [Other Commands](/software/grid_engine/other_commands) page and the official manual.

## If the job does not start running

1. Check if the job settings are correct.
    - We provide a program to check if the settings are appropriate. Refer to the [How to use qsub_beta](/software/qsub_beta) page. 
2. Check the congestion status of the supercomputer.
    - You can check the current operation status and congestion in the [Operation Status Overview](/operation) page.
