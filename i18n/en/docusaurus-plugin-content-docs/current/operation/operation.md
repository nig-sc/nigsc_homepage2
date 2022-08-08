---
id: operation
title: Job accumulation status and estimated waiting time
---

The figure below shows the status of job accumulation for each queue of Grid Engine and the estimated job wait time (the wait time prediction value of the job from just submitted to start running).

- Left (the line graph): The number of jobs per hour that have started running out of the jobs waiting in the queue.
- Center (the bar graph): The number of jobs currently running (red) and waiting in the queue (blue).
- Right: Estimated waiting time [hours] = The quantity of jobs currently waiting [slots] / The quantity per hour of jobs that have started running [slots/hour].

The quantity of jobs is calculated as the number of slots occupied by jobs.

<img alt="job accumlation status" src="https://ddbj.nig.ac.jp/nigsc/sc_GraphStack_1.png" />

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

The number of slots consumed by a job is calculated based on the number of CPU cores requested or the amount of memory, whichever is greater.

Example:

- A job requesting 3 CPU cores and 2 GB memory will request 3 slots. 
- If one CPU core, 12 GB memory is requested in the AMD queue (Thin Type 1a) of the general analysis section, the number of slots requested is calculated to be 2.





