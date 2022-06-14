---
id: operation
title: Operation Status Overview
---

## Job accumulation status and estimated waiting time



The figure below shows the status of job accumulation for each queue of Grid Engine and the estimated job wait time (the wait time prediction value of the job from just submitted to start running).

- Left (the line graph): The number of jobs per hour that have started running out of the jobs waiting in the queue.
- Center (the bar graph): The number of jobs currently running (red) and the number of jobs waiting in the queue (blue).
- Right: Estimated wait time = number of jobs waiting / number of jobs per hour that have started running.


The number of jobs is calculated as the number of slots occupied by jobs.

<img alt="job accumlation status" src="https://sc2.ddbj.nig.ac.jp/nigsc/sc_GraphStack_1.png" />

The data is updated every hour.

### Reference: Slot definition

<table>
<tr>
<th>Compute node type</th><th>Definition of 1 slot</th>
</tr>
<tr>
<td>Thin Type 1a</td><td>1 CPU core, 8GB memory</td>
</tr>
<tr>
<td>Thin Type 1b</td><td>1 CPU core, 4GB memory</td>
</tr>
<tr>
<td>Thin Type 2a</td><td>1 CPU core, 12GB memory</td>
</tr>
<tr>
<td>Thin Type 2b</td><td>1 CPU core, 16GB memory</td>
</tr>
<tr>
<td>Medium</td><td>1 CPU core, 38.4GB memory</td>
</tr>
<tr>
<td>Fat</td><td>1 CPU core, 47.2GB memory</td>
</tr>

</table>

If either CPU or memory reaches the upper limit, it will be in the "free" state.
