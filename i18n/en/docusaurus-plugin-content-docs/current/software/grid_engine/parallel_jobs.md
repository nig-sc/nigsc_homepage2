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


### Details of parallel environment

#### CPU and memory allocation

The above example specifies one CPU core and the corresponding memory.

If the amount of memory is not specified when executing the qsub command (default value), e.g. for Thin node Type 1a, 8 GB of memory is allocated per CPU core.
(This depends on the type of computer and the type of queue.)

![](/img/software/grid_engine/pe_1.png)


#### parallel_job(1) -pe def_slot 2-10

`-pe def_slot` always allocates the specified number of cores on the same compute node.

```
#!/bin/bash
#$ -cwd        
#$ -V          
#$ -l epyc     
#$ -l d_rt=192:00:00 
#$ -l s_rt=192:00:00 
#$ -pe def_slot 2
#$ -l s_vmem=20G      
#$ -l mem_req=20G   
#$ -N an_example      

make -j 2
```

![](/img/software/grid_engine/pe_2.png)


#### parallel job (2) -pe mpi -pe pe

`-pe mpi` allocates the specified number of cores on a separate compute node if at all possible.

```
#!/bin/bash
#$ -cwd        
#$ -V          
#$ -l epyc     
#$ -l d_rt=192:00:00 
#$ -l s_rt=192:00:00 
#$ -pe mpi 2
#$ -l s_vmem=20G      
#$ -l mem_req=20G     
#$ -N an_example      

your_program
```

![](/img/software/grid_engine/pe_3.png)


#### parallel-job(3) -pe mpi-fillup 10 -pe pe-fillup 10

`-pe mpi-fillup` allocates the specified number of cores by packing them into the same compute node as much as possible.

```
#!/bin/bash
#$ -cwd        
#$ -V          
#$ -l epyc     
#$ -l d_rt=192:00:00 
#$ -l s_rt=192:00:00 
#$ -pe mpi-fillup 4
#$ -l s_vmem=20G      
#$ -l mem_req=20G     
#$ -N an_example      

your_program
```

![](/img/software/grid_engine/pe_4.png)


#### parallel jobs(4) -pe mpi_N -pe pe_N

`-pe mpi_N` allocates the specified number of cores on each compute node.

The following are available: mpi_4, mpi_8, mpi_16, mpi_32, mpi_64, mpi_5, mpi_10, mpi_20.

The following are available: pe_4, pe_8, pe_16, pe_32, pe_64, pe_5, pe_10 and pe_20.

```
#!/bin/bash
#$ -cwd        
#$ -V          
#$ -l epyc     
#$ -l d_rt=192:00:00 
#$ -l s_rt=192:00:00 
#$ -pe mpi_4 2
#$ -l s_vmem=8G      
#$ -l mem_req=8G     
#$ -N an_example      

your_program
```

![](/img/software/grid_engine/pe_5.png)


#### How to know which compute nodes have been allocated in a parallel job

```
$ qstat
job-ID     prior   name       user      state submit/start at     queue   jclass       slots ja-task-ID  
------------------------------------------------------------------------------------------------------
 13862312 0.25410 QLOGIN     you         r     09/25/2021 23:34:49 login.q@at138        1         
 13862486 0.25194 QLOGIN     you         r     09/26/2021 10:15:28 login.q@at139        1         
 13862667 0.25084 QLOGIN     you         r     09/26/2021 15:40:40 login.q@at137        1         
 13862992 0.25039 an_example you         r     09/26/2021 18:54:09 epyc.q@at143         2         
 13862987 0.25020 an_example you         r     09/26/2021 19:44:58 epyc.q@at154         1         
 13862989 0.25040 an_example you         qw    09/26/2021 18:50:50                      2   

$ qstat -j 13862992 | grep exec_host_list
exec_host_list        1:    at143:2     
```


You can see which compute nodes have been allocated from the `exec_host_list` line displayed by `qstat -j <job number>`.
