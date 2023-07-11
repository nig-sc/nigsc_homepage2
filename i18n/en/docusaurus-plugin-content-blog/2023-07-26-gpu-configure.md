---
slug: 2023-07-26-gpu-configure
title: "[Maintainance] July 11, 2023: Change the configuration of the AGE queue on Wednesday, July 26, 2023"
tags:
  - maintenance
authros:
  - oogasawara
  - akatsumata
date: 2023-07-11
---

Until now, a part of the CPU of the GPU compute node has been allocated to short.q because the utilisation rate of the CPU of the GPU compute node is low, but in recent years, various software using the GPU has been created and the usage methods have changed, so the AGE queue configuration will be changed as follows to increase the number of CPU cores available in the GPU node.


Before change

| Queue | Configuration Nodes | Total Number of nodes | Total Number of CPU cores | Memory |
| ---- | ---- | ----: | ----: | ----: |
| gpu.q |	Thin nodes Type2b | 7 | 56 (8/node) | 1,344GB (192GB/node) |
| short.q | 	Thin nodes Type2b | 7 | 112 (16/node) | 1,344GB (192GB/node) |


After change

| Queue | Configuration Nodes | Total Number of nodes | Number of CPU cores | Memory |
| ---- | ---- | ----: | ----: | ----: |
| gpu.q | Thin nodes Type2b  | 7 | 168 | 2,688GB (384GB/node)|
| short.q | Thin nodes Type1a | 2 |  128　| 1,024GB (512GB/node) |

- For short.q, the CPU will be changed from AMD EPYC 7501 to Intel Xeon Gold 6130 due to the node type change. Please review the execution job if necessary.

## Date

Wednesday, July 26, 2023 11:00 - 11:30 (24h notation)


## Scope of Impact

<ul>
<li>
During the work,

  <ul>
  <li>There is no impact for running jobs.</li>
  <li>gpu.q will not be able to execute new jobs.</li>
  <li>You can run new jobs for short.q.</li>
  <li>Information updates for the system "<a href="https://sc.ddbj.nig.ac.jp/en/operation/"><u>Job accumulation status and estimated waiting time</u></a>"  will be stopped.</li>
  </ul>

<li>
Before and after the work, there is no change in the method of submitting jobs for each queue.
</li>

</li>
</ul>
