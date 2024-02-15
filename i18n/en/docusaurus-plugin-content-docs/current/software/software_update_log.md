---
id: software_update_log
title: Software update history
---


## Frequency of updates

- For nodes under the shared job scheduler, software will be updated every year around May-June and during regular maintenance associated with legal power outages around November. In addition to updating the entire system by executing `apt upgrade`, etc. when updating, we will also update commercial packages and software that is not managed by `apt`. 
- For occupied nodes, it will be updated every year only during regular maintenance.
    - Software updates generally involve node shutdown and system updates, and all storage on the node is initialised when a system update is performed, so for occupied nodes it will be performed only during regular maintenance. If you would like to update around May-June separately, please let us know.
- Software that is updated rapidly, such as CUDA, can be irregularly updated.
- [BioContainers Apptainer (Singularity) Images](/software/BioContainers) is updated weekly.


## Plan for next update

(in preparation.)


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

<tr>
  <td>30.11.2023</td>
  <td>Apptainer</td>
  <td>1.2.2-1</td>
  <td>Updated</td>
  <td>Updated</td>
  <td>Updated with the Scheduled maintenance in FY 2023. Updated from 1.1</td>
</tr>

<tr>
  <td>30.11.2023</td>
  <td>SingularityCE</td>
  <td>3.11.4</td>
  <td>Updated</td>
  <td>Updated</td>
  <td>Updated with the Scheduled maintenance in FY 2023. Updated from 3.10.2</td>
</tr>

<tr>
  <td>30.11.2023</td>
  <td>NVIDIA HPC SDK<br/>(former PGI compiler)	</td>
  <td>23.7</td>
  <td>Updated</td>
  <td>Updated</td> 
  <td>Updated with the Scheduled maintenance in FY 2023. Updated from 22.9</td>
</tr>

<tr>
  <td>30.11.2023</td>
  <td>NVIDIA CUDA*</td>
  <td>12.1</td>
  <td>Downgraded</td>
  <td>Downgraded</td>   
  <td>Downgraded with the Scheduled maintenance in FY 2023. *CUDA is downgraded to 12.1 from 12.2 because the supported version of the Ubuntu Linux 22.04LTS GA kernel is 12.1.</td>   
</tr>

<tr>
  <td>30.11.2023</td>
  <td>Intel OneAPI</td>
  <td>2023.2.0</td>
  <td>Updated</td>
  <td>Updated</td>
  <td>Updated with the Scheduled maintenance in FY 2023. Updated from 2022.2.0</td>
</tr>

<tr>
  <td>30.11.2023</td>
  <td>Altair Grid Engine</td>
  <td>8.8.1</td>
  <td>Updated</td>
  <td>Updated</td>
  <td>Updated with the Scheduled maintenance in FY 2023. Updated from 8.6.19/8.6.4</td>
</tr>


</table>
