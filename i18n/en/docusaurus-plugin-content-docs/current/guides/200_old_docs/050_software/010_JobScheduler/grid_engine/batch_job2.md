---
id: batch_job2
title: Example of batch job execution
---


:::danger This is an old document

This document is a former NIG supercomputer (2019) document and is kept for reference purposes.

Please note that it does not work in the same way on the current NIG supercomputer (2025).
:::



### Example 1: Running a binary file  {#ex1_run_binary_file}

The following example shows how to write typical options for running a batch job on the NIG supercomputer. ( For the full list of options, refer to man qsub, man qlogin, etc.).

```
qsub -cwd -V \
	 -l short \
     -l d_rt=00:20:00 -l s_rt=00:20:00 \
	 -l s_vmem=1G -l mem_req=1G \
	 -N extract_flatfile \
     -b y \
     gzip -d ddbjvrt9.seq.gz
```

The `-cwd` and `-V` options in the first line relate to the running environment of the job.


<table>
<tr>
  <th width="300">Option</th><th width="300">Description</th>
 </tr>
 <tr>
    <td>-v environment</td><td>One job takes over the environment variables of the environment which executed the qsub.</td>
</tr>
<tr>
	<td>-v environment=value</td><td>Set one environment variable for each job.</td>
</tr>
<tr>
	<td>-V</td><td>All environment variables of the environment which executed qsub are passed on to the job.</td>
</tr>
<tr>
    <td>-cwd</td><td>The job is executed on the current directory. (If not specified, the job will run on the $HOME directory.)</td>
	</tr>
</table>

The second line represents the type of queue. A queue (Queue) is created for each type of worker node's computer in the GENERAL INSTITUTE supercomputer. If you do not specify any queue, the job is submitted to the epyc queue. ( The available worker nodes are searched for in the order of Type1b => Type1a).


<table>
<tr>
	<th width="300">Queue Name</th><th width="300">Type of Compute Node</th><th width="300">Maximum Job Execution Time</th><th width="300">Initial Available Memory</th>
</tr>
<tr>
	<td>intel</td><td>Thin node Type2a</td><td>124 days</td><td>8GB</td>
</tr>
<tr>
	<td>epyc</td><td>Thin node Type1a, Type1b</td><td>124 days</td><td>Type1b 4GB, Type1a 8GB</td>
</tr>
<tr>
    <td>gpu</td><td>Thin node Type2b (GPU node)</td><td>124 days</td><td>   </td>
</tr>
<tr>
    <td>short</td><td>Thin node Type2b (GPU node)</td><td>1 hour</td><td>   </td>
</tr>
<tr>
    <td>medium</td><td>medium node</td><td>124 days</td><td>   </td>
</tr>
</table>


The third line is the maximum job running time.

For example, if you specify a maximum job running time of 8 days as the job is expected to be finished within 8 days, specify 192 hours (8 days x 24 hours) for the `-l d_rt` and `-l s_rt` options. -It is necessary to specify the same value for the `-l d_rt` option and the `-l s_rt` option.

```
qsub -l d_rt=192:00:00 -l s_rt=192:00:00 test.sh
```

Jobs can continue to run for up to four months, except for the short queue (maximum one hour). However, in order to facilitate job scheduling, the Grid Engine is configured in the GENETECH supercomputer to assume that the job will be completed within three days if the `-l d_rt` or `-l s_rt` option is not specified. Therefore, if the computation time is expected to exceed three days, be sure to specify the `-l d_rt` and `-l s_rt` options. (For correct job scheduling, it is recommended to always specify the `-l d_rt` and `-l s_rt` options. Specify a little longer than expected, as the programme execution will be forced to terminate when the execution limit time is reached).


The fourth line specifies the amount of memory to be used. Specify the same value for `-l s_vmem` and `-l mem_req`. The units can be G, M, K, etc.

Line 5 specifies the job name.

Line 6 indicates that a binary executable file is about to be executed (e.g. not a shell script).

Line 7 is the actual call to the programme to be executed on the worker node.



### Example 2: Running shell scripts, etc.  {#ex2_run_shell_scripts}

```
qsub -cwd -V \
     -l epyc \
	 -l d_rt=192:00:00 -l s_rt=192:00:00 \
	 -l s_vmem=20G -l mem_req=20G \
	 -N an_example \
	 -S /bin/bash \
	 example.sh arg1 arg2
```



The difference between example 1 and example 2 is lines 6 and 7. When calling scripts such as bash or perl, this is how you write it.


### Example 3: Job Script {#ex3_job_script}


In the above examples 1 and 2, many options were specified, but you can simplify the call by writing the options in a script and calling that script.

To do this, prepare a `job_script.sh` like the following and submit it with ` qsub -S /bin/bash job_script.sh `.
							   
```
#!/bin/bash

#$ -cwd 
#$ -V 
#$ -l epyc
#$ -l d_rt=192:00:00
#$ -l s_rt=192:00:00
#$ -l s_vmem=20G 
#$ -l mem_req=20G
#$ -N an_example
#$ -S /bin/bash


example.sh arg1 arg2
```
