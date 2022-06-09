---
id: parallel_jobs
title: Pallalel Jobs (parallel job)
---

When you run a small number of programs that use multiple CPU cores and run for a long time, run them as parallel jobs. (When you execute many jobs, use the array job of parallel jobs.)

To use the parallel job function in addition to the options described in the [Batch Jpbs (batch job)](/software/grid_engine/batch_jobs) page, specify the parallel environment with the -pe option.

Parallel environment types provided by the NIG supercomputer are as follows.
  
<table>
<tr>
<th width="300">parallel environment</th><th width="300">meaning</th>
</tr>
<tr>
  <td>def_slot N</td>
  <td>  N CPU cores are reserved on the same compute node. (When N exceeds the number of CPU cores on the compute node, the job will not start.)</td>
 </tr>
 <tr>
  <td>mpi N</td>
  <td>  N CPU cores are reserved across multiple compute nodes. At that time, the compute nodes are selected by the round-robin method. As a result, the cores are secured in a form scattered among as many computing nodes as possible.
  </td>
</tr>
<tr>
  <td>mpi-fillup N</td><td>  N CPU cores are reserved across multiple computation nodes. At that time, the core is secured so that the number of calculation nodes is as small as possible.</td>
</tr>
<tr>
  <td><p>mpi_n N</p><p>The defined parallel environment is as follows.</p><p>mpi_4, mpi_8, mpi_16, mpi_32, mpi_64, mpi_5, mpi_10, mpi_20</p></td>
  <td>N cores are reserved across multiple computation nodes. At that time, n = 4,8,16,… cores are secured on each compute node.</td>
</tr>
</table>

The number of cores can be specified a range besides a single number.

- ` qsub -pe mpi-fillup 100 -S /bin/bash job_script.sh `
- ` qsub -pe def_slot 20-100 -S /bin/bash job_script.sh `
- ` qsub -pe mpi 20- -S /bin/bash job_script.sh `

### Notes on specifying memory requirements for parallel jobs

When -l s_vmem or -l mem_req is specified for the parallel job, the job is submitted by requesting memory, which is multiplied by the number of parallels specified in the parallel environment and specified memory from the system.

For example, when you specify as below, it means that you have specified 16 × 8 = 128GB as the total memory used by the parallel jobs. Remember this point and decide requested memory to be specify.

```
-pe def_slot 16 -l s_vmem=8G -l mem_req=8G
-pe mpi-fillup 16 -l s_vem=8G -l mem_req=8G 
```

