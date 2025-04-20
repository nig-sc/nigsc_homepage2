---
id: array_jobs
title: Array Jobs(array job)
---

:::danger This is an old document

This document is a former NIG supercomputer (2019) document and is kept for reference purposes.

Please note that it does not work in the same way on the current NIG supercomputer (2025).
:::


When you submit many jobs(batch jobs or parallel jobs) to the system at once, use the array job. 

Never submit many jobs as it is. It may overload the system.

"-t 1-6: 2" specifies that the minimum index number is 1 and the maximum index number is 6, and by adding ": 2" to that, the index number is skipped by one. increase. Therefore, 1,3,5 are specified as the index number. It can be referenced as a task ID at the end of each line of qstat output.

```
[username@at027 ~]$ qsub -t 1-6:2 arraytest.sh
Your job-array 10000.1-6:2 ("arraytest.sh") has been submitted
[username@at027 ~]$ qstat
job-ID     prior   name       user         state submit/start at     queue                jclass            slots ja-task-ID
-----------------------------------------------------------------------------------------------------------------------------
	10000 0.25000 arraytest. username     r     03/04/2019 20:31:57 epyc.q@at095                                 1 1
	10000 0.25000 arraytest. username     r     03/04/2019 20:31:57 epyc.q@at095                                 1 3
	80430 0.25000 arraytest. username     r     03/04/2019 20:31:57 epyc.q@at095                                 1 5
```

The task ID can be referenced in the job script by an environment variable called SGE_TASK_ID. 
It is possible that "each task in the array job checks the value of SGE_TASK_ID and execute the different process." by using it.

Each task is executed as soon as it finds the free computer. (It is not necessarily executed in parallel.)
When the computer is free, each task is executed in parallel, but the upper limit can be limited by the -tc option.

Other examples:
 
- ` qsub -t 1-10 -tc 5 job_script.sh `
  - Submit a total of 10 tasks with $ SGE_TASK_ID from 1 to 10. When the computer is free, the task will be executed sequentially in up to 5 parallels.
- ` qsub -t 10 job_script.sh `
  - Submit one task whose $ SGE_TASK_ID is 10.
- ` qsub -t 2-10:2 job_script.sh ` 
  - The minimum index number is 2, the maximum index number is 10, and ":2" is added to specify that the index number is skipped by one. (task-ids 2,4,6,8,10).


The environment variables (Pseudo environment variables) that can be referenced from within the array job are as follows.

<table>
<tr>
  <th width="300">Pseudo env variable</th><th width="300">Description</th>
</tr>
<tr>
  <td>$HOME</td><td>Home directory of the submitting user</td>
</tr>
<tr>
<td>$HOSTNAME</td><td>Hostname of the execution host</td>
</tr>
<tr>
  <td>$JOB_ID</td><td>ID of the job</td>
</tr>
<tr>
  <td>$SGE_TASK_ID</td><td>ID of the array task</td>
</tr>
<tr>
  <td>$SGE_TASK_FIRST</td><td>ID of the first array task</td>
 </tr>
 <tr>
  <td>$SGE_TASK_LAST</td><td>ID of the last array task</td>
</tr>
<tr>
  <td>$JOB_NAME</td><td>Name of the job</td>
</tr>
<tr>
<td>$USER</td><td>User name of the submitting user</td>
</tr>
<tr>
  <td>$SGE_TASK_STEPSIZE</td><td>step size</td>
</tr>
</table>

 
