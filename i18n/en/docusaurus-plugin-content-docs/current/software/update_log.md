---
id: software_update_log
title: Software update history
---


## Frequency of updates

- For nodes under the shared job scheduler, software will be updated every year around May-June and during regular maintenance associated with legal power outages around November.
- For occupied nodes, it will be updated every year only during regular maintenance.
    - Software updates generally involve node shutdown and system updates, and all storage on the node is initialised when a system update is performed, so for occupied nodes it will be performed only during regular maintenance. If you would like to update around May-June separately, please let us know.
- Software that is updated rapidly, such as CUDA, can be irregularly updated.


## Plan for next update

(in preparation.)

**For FY2023, we plan to gradually change the OS of the NIG supercomputer to Ubuntu Linux from around August 2023, as CentOS 7 will reach its End-Of-Life on 30 June 2024. **We will announce the plan on our website when it is decided.
- Although the OS will be changed as little as possible, the number of available compute nodes will be temporarily reduced.
- The user's analysis environment may also need to be migrated due to the change in OS.


After the change to Ubuntu Linux, in addition to updating the entire system by executing `apt upgrade`, etc. when updating, we will also update commercial packages and software that is not managed by `apt`. 




## Update history (since 01.09.2023)

- Abbreviations for target division: G: General analysis division, P: Personal genome analysis division

<table>
<tr>
<th>Date</th>
<th>Software name</th>
<th>Version</th>
<th width="100">G</th>
<th width="100">P</th>
<th>Notes</th>
</tr>
<tr>
<td>06.09.2023</td>
<td>CUDA</td>
<td>CUDA Version: 12.2         NVIDIA-SMI 535.54.03    Driver Version: 535.54.03</td>
<td>Updated (GPU queue)</td>
<td>Updated (Slurm GPU partition)</td>
<td>CUDA Version: 11.6       NVIDIA-SMI 510.47.03    Driver Version: updated from 510.47.03; GPU login nodes are currently being updated(06.09.2023)</td>
</tr>

</table>
