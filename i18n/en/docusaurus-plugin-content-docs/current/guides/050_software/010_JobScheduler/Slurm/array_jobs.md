---
id: array_jobs
title: Submitting array jobs
---

When you want to submit a large number of jobs (batch or parallel jobs) to the system at once, please use the array job feature.



To execute as an array job, run sbatch with the `-a` option like this: `-a 1-6:2`. The `-t 1-6:2` specifies a minimum index number of 1, a maximum of 6, and `:2` to apply every other index number, resulting in 1,3,5. These index numbers can be seen at the end of each line in the squeue output as task IDs.

```
xxxxx-pg@at022vm02:~$ sbatch -a 1-6:2 ./arraytest.sh 
Submitted batch job 744
xxxxx-pg@at022vm02:~$ squeue
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
             744_1 parabrick arraytes xxxxx-pg  R       0:03      1 igt010
             744_3 parabrick arraytes xxxxx-pg  R       0:03      1 igt010
             744_5 parabrick arraytes xxxxx-pg  R       0:03      1 igt010
```

The task ID can be referenced within the job script through the `SLURM_ARRAY_TASK_ID` environment variable. This allows each task within the array job to perform different operations based on the value of `SLURM_ARRAY_TASK_ID`.

Tasks start executing as soon as a computer becomes available (they may not necessarily run in parallel). If computers are available, tasks can run in parallel, but you can limit the maximum concurrency with a percentage notation.

Other examples:

- `sbatch -a 1-10%5 job_script.sh`
  - Submits a total of 10 tasks from $SGE_TASK_ID 1 to 10. If computers are available, it sequentially executes up to 5 in parallel.

- `sbatch -a 10 job_script.sh`
  - Submits a single task with $SGE_TASK_ID of 10.

- `sbatch -a 2-10:2 job_script.sh`
  - Specifies skipping every other index number starting from 2 to 10 (task-ids 2,4,6,8,10).

When submitting an array job, the following environment variables are available for use.

### Slurm Environment Variables for Array Jobs {#Slurm_Env_Vars_Array_Jobs}

The environment variables accessible from within an array job include:

| Environment Variable | Description |
|----------------------|-------------|
|SLURM_ARRAY_JOB_ID | Job ID of the array job|
|SLURM_ARRAY_TASK_ID | Task ID within the array job |
|SLURM_ARRAY_TASK_COUNT | Number of tasks in the array job |
|SLURM_ARRAY_TASK_MIN | The first task ID in the array job |
|SLURM_ARRAY_TASK_MAX | The last task ID in the array job |
