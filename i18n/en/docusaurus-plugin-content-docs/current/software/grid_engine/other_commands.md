---
id: other_commands
title: Other Commands
---



## Using GPU

Click [CUDA manual](/software/cuda).




## Checking the job execution status (qstat)

### Checking the job submission status

qstate checks whether the submitted job by using qsub was submitted as a job. To check the status of the submitted job, use the qstat command. For example, when the job is submitted, qstate shows as follows.

```
[username@at027 ~]$ qstat
job-ID     prior   name       user         state submit/start at     queue                          jclass                         slots ja-task-ID 
------------------------------------------------------------------------------------------------------------------------------------------------
     80312 0.50000 QLOGIN     username     r     02/27/2019 17:42:00 login.q@at027                                                     1
     80313 0.25000 jobname    username     r     02/27/2019 17:44:30 epyc.q@at040                                                      1
     80314 0.25000 jobname    username     r     02/27/2019 17:44:35 epyc.q@at040                                                      1
     80315 0.25000 jobname    username     r     02/27/2019 17:44:40 epyc.q@at040                                                      1
					
```

The meanings of the characters in the "state" colum at this time are as follows.



<table>
<tr>
<th width="300">state</th><th width="300">meaning</th>
</tr>
<tr>
  <td>r</td><td>running</td>
</tr>
<tr>
  <td>qw</td><td>queued, waiting</td>
</tr>
<tr>
  <td>t</td><td>transferring to the execution host</td>
</tr>
<tr>
 <td>E</td><td>error in the job</td>
</tr>
<tr>
 <td>d</td><td>the job is in the process of being deleted</td>
</tr>
</table>


The "qstat -f" command shows the queue usage status like this output result.



```
[username@at027 ~]$ qstat -f
queuename                      qtype resv/used/tot. np_load  arch          states
---------------------------------------------------------------------------------
medium.q@m01                   BP    0/0/80         0.00     lx-amd64      
---------------------------------------------------------------------------------
medium.q@m02                   BP    0/0/80         0.00     lx-amd64      
---------------------------------------------------------------------------------
medium.q@m03                   BP    0/0/80         0.00     lx-amd64      
---------------------------------------------------------------------------------
medium.q@m04                   BP    0/0/80         0.00     lx-amd64      
(中略)
---------------------------------------------------------------------------------
epyc.q@at033                   BP    0/0/64         0.00     lx-amd64      
---------------------------------------------------------------------------------
epyc.q@at034                   BP    0/0/64         0.00     lx-amd64      
---------------------------------------------------------------------------------
epyc.q@at035                   BP    0/0/64         0.00     lx-amd64      
(中略)
---------------------------------------------------------------------------------
intel.q@it003                  BP    0/0/32         0.00     lx-amd64      
---------------------------------------------------------------------------------
intel.q@it004                  BP    0/0/32         0.00     lx-amd64      
---------------------------------------------------------------------------------
intel.q@it005                  BP    0/0/32         0.00     lx-amd64      
---------------------------------------------------------------------------------
intel.q@it006                  BP    0/0/32         0.00     lx-amd64      
---------------------------------------------------------------------------------
(以下略)

```

This makes it possible to determine which node (queue) the job is submitted to.

"qstaus -j jobID" prints information about the job with a list.

 ```
 [username@at027 ~]$ qstat -j 199666
 ==============================================================
 job_number:                 199666
 jclass:                     NONE
 submission_time:            02/27/2019 17:42:00.867
 owner:                      username
 uid:                        9876
 group:                      ddbj
 gid:                        9876
 supplementary group:        ddbj
 sge_o_home:                 /home/username
 sge_o_log_name:             username
 sge_o_path:                 /cm/local/apps/gcc/7.2.0/bin:/home/geadmin/UGER/bin/lx-amd64:/cm/local/apps/environment-modules/4.0.0//bin:/usr/local/bin:/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/opt/ibutils/bin:/sbin:/usr/sbin:/cm/local/apps/environment-modules/4.0.0/bin:/home/username/.local/bin:/home/username/bin
 sge_o_shell:                /bin/bash
 sge_o_workdir:              /lustre8/home/username
 sge_o_host:                 gw1
 account:                    sge
 stderr_path_list:           NONE:NONE:/dev/null
 hard resource_list:         d_rt=259200,mem_req=8G,s_rt=259200,s_stack=10240K,s_vmem=8G
 soft resource_list:         epyc=TRUE,gpu=TRUE,intel=TRUE,login=TRUE
 mail_list:                  username@gw1
 notify:                     FALSE
 job_name:                   QLOGIN
 stdout_path_list:           NONE:NONE:/dev/null
 priority:                   0
 jobshare:                   0
 restart:                    n
 env_list:                   TERM=xterm
 department:                 defaultdepartment
 binding:                    NONE
 mbind:                      NONE
 submit_cmd:                 qlogin
 category_id:                4
 request_dispatch_info:      FALSE
 start_time            1:    02/27/2019 17:42:00.884
 job_state             1:    r
 exec_host_list        1:    at027:1
 granted_req.          1:    mem_req=8.000G
 usage                 1:    wallclock=01:00:01, cpu=00:00:00, mem=0.00000 GBs, io=0.00000 GB, iow=0.000 s, ioops=0, vmem=N/A, maxvmem=N/A
 scheduling info:            -
 
 
 ```
 
 
## Checking the status of all cluster queues

To get a grasp on the job submission status of each queue, the queue load status, etc., type and execute "qstat -g c".
You can also get the overall status with it.

 ```
 [username@at027 ~]$ qstat -g c
 CLUSTER QUEUE                   CQLOAD   USED    RES  AVAIL  TOTAL aoACDS  cdsuE  
 --------------------------------------------------------------------------------
 epyc.q                            0.00      1      0   4159   4224      0     64 
 gpu.q                             0.00      0      0     64    112      0     48 
 intel.q                           0.00      0      0   1472   1472      0      0 
 login.q                           0.00      4      0    380    384      0      0 
 login_gpu.q                       0.00      0      0     48     48      0      0 
 medium.q                          0.00      0      0    800    800      0      0 
 short.q                           0.00      0      0    128    224      0     96 
```

The meanings of the numbers are as follows

- USED: Number of slots currently in use 
- RES: Number of Advance Reservation slots
- AVAIL: Number of available slots
- TOTAL: Total number of slots
- aoACDS: Number of slots which the computer node is in one of the aoACDS states
- cdsuE: Number of slots which the computer node is in one of the cdsuE states

You can find more details with `man qstat`.
 
## Deleting jobs(qdel)

The qdel command is used to delete a job without waiting for the job to finish. Use "qdel jobID". "qdel -u username" enables to delete all jobs that you have submitted.

<table>
<tr>
<th width="300">Parameter Description</th><th width="300">Description</th>
</tr>
<tr>
  <td>-f *job_id(s)*</td>
  <td>Forces the deletion a job even if the responsible execution host does not respond.</td>
</tr>
<tr>
  <td>*job_id* -t range</td>
  <td>
Deletes specific tasks of an array job. It is also possible to delete
a specific range of array jobs.
  </td>
</tr>
<tr>
  <td>-u *user_list*</td><td>Deletes all job of the specified user.</td>
</tr>
</table>


## Changing the job execution condition(qalter)


## Checking the result of jobs

About the result, if you don't specify any options in the qsub command line, the standard output is output to the file named job name.o job ID and the standard error output is output with the following file name in the home directory. 

`job name.e jobID`

You can use the qreport command to check detailed information such as how much resources the executed job used.

```
[username@at137 ~]$ qreport -j 110488
==============================================================
owner                okishinya                                                  
jobnumber            110488                                                     
taskid               undefined                                                  
slots                1                                                          
pe_taskid            NONE                                                       
granted_pe           NONE                                                       
exit_status          0                                                          
failed               0                                                          
qname                epyc.q                                                     
hostname             at116                                                      
jobname              TEST_intel                                                 
qsub_time            20190307-22:30:33                                          
start_time           20190307-22:31:31                                          
end_time             20190307-22:31:35                                          
ru_wallclock         4.249                                                      
cpu                  3.0                                                        
mem                  0.0                                                        
maxvmem              0.0G                                                       
r_mem                8.000G                                                     
r_q                  NONE                                                       
r_cpu                NONE

```

## Setup of environment variables required for running Grid Engine 

To be able to execute commands such as qsub of Grid Engine, a series of environment variables must be set up. Normally, you do not need to set up these environment variables yourself because they are automatically set up when you login to the gateway node of the general analysis section.

Explicit setup may be required in special cases, such as when you use qsub from the Singularity container. In this case, execute the following command.

As in the User’s Manual, the necessary environment variables are set up by executing the shell script provided by Grid Engine as follows: 

 ```
 export SGE_ROOT=/home/geadmin/UGER
 export SGE_CELL=uger
 source $SGE_ROOT/$SGE_CELL/common/settings.sh
 ```
 