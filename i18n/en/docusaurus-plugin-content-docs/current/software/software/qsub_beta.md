---
id: qsub_beta
title: How to use qsub_beta
---

## Tool Introduction

`qsub_beta` is a tool to check in advance the requested resource of the job if there are any error and submit it to Grid Engine when the batch job is executed using [Grid Engine](/software/grid_engine).

If you submit the request resource with a value that cannot be satisfied by any compute node, the job will be in the qw state (waiting), but it will not execute unless you modify the request resource because there are no executable compute nodes.

By Submitting the job to the Grid Engine via `qsub_beta`, you can notice the error in specifying the requested resource at the time the batch job is executed, reducing unnecessary waiting time.

## How to use qsub_beta

### Running the batch job via qsub_beta

The method of submitting with qsub_beta is as follows and is the same as for the Grid Engine original qsub.

```
$ qsub_beta –l intel,s_vmem=8G,mem_req=8G job.sh
Your job XXXXXXX ("job.sh") has been submitted
```

### Output in case of error

If there is an error in the requested resource, URL that can be used as a reference when correcting the cause of the error and the requested resource is displayed.
At this time, the exit status is `1` and the process ends with error.

In the following example, the option `-pe def_slot 40` specifies to reserve 40 CPU cores on the same compute node, and the option` -l intel.q` specifies to execute the job on the compute node of intel.q.

However, since the number of CPU cores on the compute node of intel.q is 32 cores, the job is not executed and error occurs.

```
$ qsub_beta -pe def_slot 40 -l intel job_script.sh
Unable to run job: resource "def_slot" is out of range.
Refer to : https://sc.ddbj.nig.ac.jp/ja/guide/usage-for-general-analysis-environment/uge
Exiting.
```

### Resources to be checked

Request resources to be checked are as follows. Currently, checking for mpi job is not supported.

<table>
	<tr>
		<th width="300">target to be checked</th>
		<th width="300">explanation</th>
	</tr>
	<tr>
		<td>Number of slots</td>
		<td>Determines if the specified number of slots is within the allowed range for each node.</td>
	</tr>
	<tr>
		<td>Memory size</td>
		<td>Determines if the specified requested memory size is within the allowed range.</td>
	</tr>
	<tr>
		<td>Executable time</td>
		<td>Determines if the specified executable time is within the allowed range.</td>
	</tr>
	<tr>
		<td>Number of GPU</td>
		<td>Determine if the specified number of GPU is within the allowed range.</td>
	</tr>
	<tr>
		<td>Memory size discrepancy</td>
		<td>Check if the requested memory size (mem_req) and the memory size upper limit (s_vmem) match.</td>
	</tr>
	<tr>
		<td>Specify queue</td>
		<td>Determine if multiple queues are specified for the hard option of qsub, and whether no queue is specified for either hard or soft.</td>
	</tr>
</table>

