---
id: ga_grid_engine_queue_old
title: Grid Engine キューの種類
---


:::danger This is an outdated document

This document pertains to the former NIG Supercomputer (2019) and is retained for reference purposes only.

Please note that it does not reflect the behavior or configuration of the current NIG Supercomputer (2025).

:::

Nodes managed by Grid Engine are broadly categorized into *interactive nodes* and *compute nodes*.

* **Interactive nodes** are computing systems intended for users to develop programs or run small-scale, short-duration computations interactively.
* **Compute nodes** are designed for long-duration or resource-intensive computations that require a large number of CPUs or significant memory.

In both interactive and compute nodes, computational requests (referred to as *jobs*) are managed using queues in Grid Engine. When the total demand for computing resources exceeds the available capacity, jobs are held in queues and automatically executed by Grid Engine once resources become available.

In the general-purpose section of the NIG Supercomputer, a dedicated Grid Engine queue is configured for each type of compute node.

<table>
<tr>
<th>Node Type</th>
<th>Grid Engine Queue Name</th>
<th>Hardware Type</th>
<th>Number of Nodes / Total Cores</th>
</tr>

<tr>
<td rowspan="2">Interactive Nodes</td>
<td>login.q</td>
<td>
Thin Node Type1b<br />
(AMD EPYC7702, 128 CPU cores per node,<br />
4GB memory per CPU core)
</td>
<td>3 nodes / 384 cores</td>
</tr>

<tr>
<td>login_gpu.q</td>
<td>
Thin Node Type2b<br />
(Intel Xeon Gold 6136, 24 CPU cores per node,<br />
16GB memory per CPU core)
</td>
<td>1 node / 24 cores</td>
</tr>

<tr>
<td rowspan="6">Compute Nodes</td>
<td>epyc.q</td>
<td>
Thin Node Type1b<br />
(AMD EPYC7702, 128 CPU cores per node,<br />
4GB memory per CPU core)
</td>
<td>25 nodes / 3200 cores</td>
</tr>

<tr>
<td>intel.q</td>
<td>
Thin Node Type2a<br />
(Intel Xeon Gold 6130, 32 CPU cores per node,<br />
12GB memory per CPU core)
</td>
<td>32 nodes / 1024 cores</td>
</tr>

<tr>
<td>gpu.q</td>
<td>
Thin Node Type2b<br />
(Intel Xeon Gold 6136, 24 CPU cores per node,<br />
16GB memory per CPU core)
</td>
<td>7 nodes / 168 cores</td>
</tr>

<tr>
<td>short.q</td>
<td>
Thin Node Type1a<br />
(AMD EPYC7501, 64 CPU cores per node,<br />
8GB memory per CPU core)
</td>
<td>2 nodes / 128 cores</td>
</tr>

<tr>
<td>medium.q</td>
<td rowspan="2">
Medium Node<br />
(Intel Xeon Gold 6148, 80 CPU cores per node,<br />
38.4GB memory per CPU core)
</td>
<td rowspan="2">10 nodes / 800 cores</td>
</tr>

<tr>
<td>medium-ubuntu.q</td>
</tr>
</table>
