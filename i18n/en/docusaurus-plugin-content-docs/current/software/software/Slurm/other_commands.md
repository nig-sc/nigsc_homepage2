---
id: other_commands
title: Other Commands
---

## How to Use GPUs

In the personal genome analysis section, GPU compute nodes are operated by allocating jobs on a per-node basis, without the environment setup for dividing GPUs within a node. Therefore, when submitting jobs that utilize the GPU, there is no need to explicitly specify GPU usage as an option.

## Checking the Status of Job Execution (squeue)

### Checking the Status of Job Submission

The `squeue` command can be used to check the status of job execution. For details on the options, please refer to the [online manual](https://slurm.schedmd.com/squeue.html#SECTION_OPTIONS).

Example of execution

```
xxxxx-pg@at022vm02:~$ squeue
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
               751 parabrick  test.sh xxxxx-pg  R       0:02      3 igt[010,015-016]
               750 parabrick  test.sh xxxxx-pg  R       0:05      3 igt[010,015-016]
               749 parabrick  test.sh xxxxx-pg  R       0:09      3 igt[010,015-016]
               748 parabrick  test.sh xxxxx-pg  R       0:13      3 igt[010,015-016]

```

The default items displayed by squeue are as follows:

|Item Name|Description|
|---------|-----------|
|JOBID|Displays the job ID assigned to the job.|
|PARTITION|Displays the name of the partition (queue) into which the job was submitted.|
|NAME|Displays the job name (if not specified, the command string is displayed).|
|USER|Displays the name of the user who submitted the job.|
|ST|Displays the job status. The main job statuses are shown in the table below.|
|TIME|Job execution time (format: days-hh:mm:ss)|
|NODES|Number of nodes used for job execution|
|NODELIST(REASON)|List of hostnames where the job is executed|

#### Job Status Description (ST field)

|Status Character|Description|
|----------------|-----------|
|CA (CANCELLED)|The job was explicitly cancelled by a user or system administrator.|
|CD (COMPLETED)|The job has finished executing on all nodes.|
|CF (CONFIGURING)|The job is waiting for resources to become usable after being allocated.|
|CG (COMPLETING)|The job is in the process of completing.|
|F (FAILED)|The job terminated with a non-zero exit code or another failure condition.|
|NF (NODE_FAIL)|The job terminated due to a failure of one of the allocated nodes.|
|PD (PENDING)|The job is waiting for resource allocation. It is pending.|
|PR (PREEMPTED)|The job terminated due to preemption.|
|R (RUNNING)|The job is currently running.|
|S (SUSPENDED)|The job has resource allocation (execution is suspended).|
|TO (TIMEOUT)|The job terminated because it reached its time limit.|

## Checking Detailed Information of a Job (scontrol show job)

If you want to check more detailed information about your job, after confirming the job ID with the `squeue` command, you can check it with the `scontrol show job`. For details on the options, please refer to the [online manual](https://slurm.schedmd.com/scontrol.html#SECTION_OPTIONS).

Example of execution

```
xxxxx-pg@at022vm02:~/$ scontrol show job 747
JobId=747 JobName=test
   UserId=xxxxx-pg(30257) GroupId=xxxxxx-pg(30063) MCS_label=N/A
   Priority=10102 Nice=0 Account=(null) QOS=normal
   JobState=RUNNING Reason=None Dependency=(null)
   Requeue=1 Restarts=0 BatchFlag=1 Reboot=0 ExitCode=0:0
   RunTime=00:00:12 TimeLimit=UNLIMITED TimeMin=N/A
   SubmitTime=2024-02-19T20:57:53 EligibleTime=2024-02-19T20:57:53
   AccrueTime=2024-02-19T20:57:53
   StartTime=2024-02-19T20:57:53 EndTime=Unknown Deadline=N/A
   SuspendTime=None SecsPreSuspend=0 LastSchedEval=2024-02-19T20:57:53 Scheduler=Main
   Partition=parabricks AllocNode:Sid=at022vm02:1768472
   ReqNode

List=(null) ExcNodeList=(null)
   NodeList=igt010
   BatchHost=igt010
   NumNodes=1 NumCPUs=4 NumTasks=1 CPUs/Task=1 ReqB:S:C:T=0:0:*:*
   TRES=cpu=4,mem=375G,node=1,billing=4
   Socks/Node=* NtasksPerN:B:S:C=0:0:*:* CoreSpec=*
   MinCPUsNode=4 MinMemoryNode=375G MinTmpDiskNode=0
   Features=(null) DelayBoot=00:00:00
   OverSubscribe=OK Contiguous=0 Licenses=(null) Network=(null)
   Command=./test.sh
   WorkDir=/lustre8/home/xxxxx-pg/parabricks
   StdErr=/lustre8/home/xxxxx-pg/parabricks/res.txt
   StdIn=/dev/null
   StdOut=/lustre8/home/xxxxx-pg/parabricks/res.txt
   Power=
   TresPerNode=gres:gpu:4
```

## Checking the Overall Congestion of the Cluster (sinfo, squeue)

For checking the status of partitions, primarily use `sinfo`, and to refer to the status of jobs submitted to partitions, use the `squeue` command. Please refer to the respective online manuals for more details.

### sinfo -s (-s for summary display)

Displays a summary for each partition, without distinguishing by the state of nodes.

```
yxxxx-pg@at022vm02:~/parabricks$ sinfo -s
PARTITION   AVAIL  TIMELIMIT   NODES(A/I/O/T) NODELIST
igt009         up   infinite          0/0/1/1 igt009
igt010         up   infinite          1/0/0/1 igt010
igt015         up   infinite          0/1/0/1 igt015
igt016         up   infinite          0/1/0/1 igt016
parabricks*    up   infinite          1/2/1/4 igt[009-010,015-016]
```
The display in the NODES column has the following meanings:
- A (Allocated): Number of nodes that are allocated (in use).
- I (Idle): Number of idle (not in use) nodes. Nodes available for use are classified here.
- O (Other): Number of nodes in other states. This category includes nodes in the drain (unusable for maintenance), down (unusable due to failure), or other specific states recognized by Slurm.
- T (Total): Total number of nodes in the partition. This is the sum of nodes in Allocated, Idle, and Other states.

Without -s, nodes are displayed separated by their states as follows:
```
yxxxx-pg@at022vm02:~/parabricks$ sinfo
PARTITION   AVAIL  TIMELIMIT  NODES  STATE NODELIST
igt009         up   infinite      1  down* igt009
igt010         up   infinite      1    mix igt010
igt015         up   infinite      1   idle igt015
igt016         up   infinite      1   idle igt016
parabricks*    up   infinite      1  down* igt009
parabricks*    up   infinite      1    mix igt010
parabricks*    up   infinite      2   idle igt[015-016]

```
The partition is recognized as UP, but the compute nodes included in the partition are down, etc. The state mix indicates that not all cores on the compute node are in use.

### showpartitions

If you want a more summarized display of partition states, use `showpartitions`, which is not a standard command of Slurm but an open-source command by another author.

```
yxxxx-pg@at022vm02:~/parabricks$ showpartitions 
Partition statistics for cluster linux at Thu Feb 22 10:45:21 AM JST 2024
        Partition     #Nodes     #CPU_cores  Cores_pending   Job_Nodes MaxJobTime Cores Mem/Node
        Name State Total  Idle  Total   Idle Resorc  Other   Min   Max  Day-hr:mn /node     (GB)
      igt009    up     1     0     48      0      0      0     1 infin   infinite    48     386 
      igt010    up     1     0     48     44      0      0     1 infin   infinite    48     386 
      igt015    up     1    

 1     48     48      0      0     1 infin   infinite    48     386 
      igt016    up     1     1     48     48      0      0     1 infin   infinite    48     386 
parabricks:*    up     4     2    192    140      0      0     1 infin   infinite    48     386 
Note: The cluster default partition name is indicated by :*
```
The number of nodes available in the partition is displayed in the #Nodes column as idle. The number of CPU cores available in the partition is displayed in the #CPU_Cores column as Idle. Please refer to this to check the utilization status of the partition.

### squeue

To check the status of user jobs submitted to the partition, use the `squeue` command. Currently, the submission status of jobs between users using the same Slurm system is visible to each other, but if you explicitly want to display job information for all users and all partitions, execute with the -a option.

```
xxxxx-pg@at022vm02:~$ squeue
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
               646 parabrick  test.sh xxxxx-pg  R       0:02      3 igt[010,015-016]
               647 parabrick  test.sh xxxxx-pg  R       0:02      3 igt[010,015-016]
               645 parabrick  test.sh xxxxx-pg  R       0:05      3 igt[010,015-016]
               648 parabrick test_gpu    tkxxx  R       0:02      1 igt010
               644 parabrick test_gpu    tkxxx  R       0:12      1 igt010
```

### pestat

If you want to check the operation status of the compute nodes where jobs have been submitted from the perspective of compute nodes, use `pestat`, an open-source tool. It displays a list of jobs submitted to each node, as well as the number of CPU cores used and the amount of free memory on the node.
```
xxxx-pg@at022vm02:~/parabricks$ pestat 
Hostname       Partition     Node Num_CPU  CPUload  Memsize  Freemem  Joblist
                            State Use/Tot  (15min)     (MB)     (MB)  JobID User ...
igt009            igt009   down*    0  48    0.03    386452   366715   
igt010        parabricks     mix    4  48    0.33*   386462   377722  844 xxxx-pg  
igt015            igt015    idle    0  48    0.01    386458   380861   
igt016            igt016    idle    0  48    0.10    386462   379586   
```

### How to Check the Reason Why a Job is Not Starting

To refer to the reason why a job is not starting and is in a waiting state, use the `squeue` command. The "NODELIST (REASON)" column displays the Reason Code.

The full list of Reason Codes can be found on the following developer's site:
- [Full list of Job Reason Codes](https://slurm.schedmd.com/resource_limits.html#reasons)

If a reason other than waiting for some resource is displayed and the job's execution is being delayed for a long time without any status change, please contact the help desk.

## Deleting a Job (scancel)

If the processing is taking longer than expected, or if the intermediate results output to the job's standard output and standard error output indicate that the job is not performing as expected, delete the job with the `scancel` command.

Example of execution

```
xxxxx-pg@at022vm02:~/parabricks$ squeue
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
               747 parabrick     test xxxxx-pg  R       3:01      1 igt010
xxxxx-pg@at022vm02:~/parabricks$ scancel 747
xxxxx-pg@at022vm02:~/parabricks$ squeue
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
               747 parabrick     test xxxxx-pg CG       3:06      1 igt010
xxxxx-pg@at022vm02:~/parabricks$

 squeue
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)

```

If you want to cancel multiple jobs at once, the following specification methods are available:

|scancel option specification|Description|
|----------------------------|-----------|
| -u username|Delete jobs by specifying a username.|
|-p partition name|Specify a partition name to delete jobs for that partition targeted at the scancel execution user.|
|-t job state|Cancel jobs by specifying the job state. Specify one of PENDING, RUNNING, SUSPENDED.|

For details on the options, please refer to the [online manual](https://slurm.schedmd.com/scancel.html#SECTION_OPTIONS).

## Changing Job Execution Conditions (scontrol update)

To change the amount of resources requested by a job after it has been submitted in Slurm, use `scontrol update`.

For more details, refer to the [online manual](https://slurm.schedmd.com/scontrol.html).

### Changing the Number of CPUs for a Job

```
scontrol update JobId=<Job ID> NumCPUs=<new CPU number>
```
Example of execution

### Changing the Memory Amount for a Job

```
scontrol update JobId=<Job ID> MinMemoryNode=<new memory amount (per node)>
```
Memory amount is specified in MB units.

### Changing the Execution Time for a Job

```
scontrol update JobId=<Job ID> TimeLimit=<new time limit>
```
Here, the new time limit is specified in the format days-hours:minutes:seconds, or simply in minutes.

#### Example of execution

```
xxxxx-pg@at022vm02:~$ sbatch ./test.sh 
Submitted batch job 779
xxxxx-pg@at022vm02:~$ squeue
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
               779 parabrick  test.sh xxxxx-pg PD       0:00      3 (BeginTime)
xxxxx-pg@at022vm02:~$ scontrol show job 779
JobId=779 JobName=test.sh
   UserId=xxxxx-pg(30257) GroupId=co-ddn-pg(30063) MCS_label=N/A
   Priority=10150 Nice=0 Account=(null) QOS=normal
   JobState=PENDING Reason=BeginTime Dependency=(null)
   Requeue=1 Restarts=0 BatchFlag=1 Reboot=0 ExitCode=0:0
   RunTime=00:00:00 TimeLimit=UNLIMITED TimeMin=N/A
   SubmitTime=2024-02-21T11:38:08 EligibleTime=2024-02-27T00:00:00
   AccrueTime=2024-02-21T11:38:08
   StartTime=2024-02-27T00:00:00 EndTime=Unknown Deadline=N/A
   SuspendTime=None SecsPreSuspend=0 LastSchedEval=2024-02-21T11:38:08 Scheduler=Main
   Partition=parabricks AllocNode:Sid=at022vm02:1918834
   ReqNodeList=(null) ExcNodeList=(null)
   NodeList=(null)
   NumNodes=3-5 NumCPUs=20 NumTasks=20 CPUs/Task=1 ReqB:S:C:T=0:0:*:*
   TRES=cpu=20,mem=80G,node=1,billing=20
   Socks/Node=* NtasksPerN:B:S:C=0:0:*:* CoreSpec=*
   MinCPUsNode=1 MinMemoryCPU=4G MinTmpDiskNode=0
   Features=(null) DelayBoot=00:00:00
   OverSubscribe=OK Contiguous=0 Licenses=(null) Network=(null)
   Command=./test.sh
   WorkDir=/lustre8/home/xxxxx-pg
   StdErr=/lustre8/home/xxxxx-pg/slurm-779.out
   StdIn=/dev/null
   StdOut=/lustre8/home/xxxxx-pg/slurm-779.out
   Power=
   SpreadJob=Yes
   

xxxxx-pg@at022vm02:~$ scontrol update JobID=779 NumCPUs=24
xxxxx-pg@at022vm02:~$ scontrol update JobID=779 MinMemoryNode=20000
xxxxx-pg@at022vm02:~$ scontrol update JobID=779 TimeLimit=100
xxxxx-pg@at022vm02:~$ scontrol show job 779
JobId=779 JobName=test.sh
   UserId=xxxxx-pg(30257) GroupId=co-ddn

-pg(30063) MCS_label=N/A
   Priority=10160 Nice=0 Account=(null) QOS=normal
   JobState=PENDING Reason=BeginTime Dependency=(null)
   Requeue=1 Restarts=0 BatchFlag=1 Reboot=0 ExitCode=0:0
   RunTime=00:00:00 TimeLimit=01:40:00 TimeMin=N/A
   SubmitTime=2024-02-21T11:38:08 EligibleTime=2024-02-27T00:00:00
   AccrueTime=2024-02-21T11:38:08
   StartTime=2024-02-27T00:00:00 EndTime=2024-02-27T01:40:00 Deadline=N/A
   SuspendTime=None SecsPreSuspend=0 LastSchedEval=2024-02-21T11:38:08 Scheduler=Main
   Partition=parabricks AllocNode:Sid=at022vm02:1918834
   ReqNodeList=(null) ExcNodeList=(null)
   NodeList=(null)
   NumNodes=1-5 NumCPUs=24 NumTasks=20 CPUs/Task=1 ReqB:S:C:T=0:0:*:*
   TRES=cpu=24,mem=20000M,node=1,billing=24
   Socks/Node=* NtasksPerN:B:S:C=0:0:*:* CoreSpec=*
   MinCPUsNode=1 MinMemoryNode=20000M MinTmpDiskNode=0
   Features=(null) DelayBoot=00:00:00
   OverSubscribe=OK Contiguous=0 Licenses=(null) Network=(null)
   Command=./test.sh
   WorkDir=/lustre8/home/xxxxx-pg
   StdErr=/lustre8/home/xxxxx-pg/slurm-779.out
   StdIn=/dev/null
   StdOut=/lustre8/home/xxxxx-pg/slurm-779.out
   Power=
   SpreadJob=Yes
   

xxxxx-pg@at022vm02:~$ 
```

### Other Resource Changes

You can also change various other resource parameters, such as the number of nodes assigned to a job (NumNodes) or allocation to specific nodes (NodeList):
```
scontrol update JobId=<Job ID> NumNodes=<new number of nodes>
scontrol update JobId=<Job ID> NodeList=<new node list>
```
These changes are limited to when the job has not yet started (status is PENDING). Once a job enters the RUNNING state, changes to resources are restricted or may become impossible. Additionally, system settings or policies may prohibit changes to certain resources.

## Checking the Results of Job Execution (sacct)

The results of a job are output to a file named `slurm-job name.out for the job's standard output if no specific command line options are provided with sbatch.

The `sacct` command can be used to check the execution history of a job. For details on the options, please refer to the [online manual](https://slurm.schedmd.com/sacct.html#SECTION_OPTIONS).

```
xxxxx-pg@at022vm02:~/parabricks$ sacct
JobID           JobName  Partition    Account  AllocCPUS      State ExitCode 
------------ ---------- ---------- ---------- ---------- ---------- -------- 
722                bash parabricks                     1  COMPLETED      0:0 
723                bash parabricks                     1     FAILED      2:0 
724                bash parabricks                     1  COMPLETED      0:0 
725                bash parabricks                     1 CANCELLED+      0:0 
726                test parabricks                     4  COMPLETED      0:0 
726.batch         batch                                4  COMPLETED      0:0 
727                test parabricks                     4  COMPLETED      0:0 
727.batch         batch                                4  COMPLETED      0:0 
728                bash parabricks                     1  COMPLETED      0:0 
744_1        arraytest+ parabricks                     1  COMPLETED      0:0 
744_1.batch       batch                                1  COMPLETED      0:0 
744_3        arraytest+ parabricks                     1  COMPLETED      0:0 
744_3.batch       batch                                1  COMPLETED      0:0 
744_5        arraytest+ parabricks                     1  COMPLETED      0:0 
744_5.batch       batch                                1  COMPLETED      0:0 
747                test parabricks                     4 CANCELLED+      0:0 


747.batch         batch                                4  CANCELLED     0:15 

```

## Setup of Environment Variables etc., Necessary for Slurm Execution

Normally, there is no need for users to set up anything as it is automatically configured upon logging into the Slurm login node for the personal genome analysis section.