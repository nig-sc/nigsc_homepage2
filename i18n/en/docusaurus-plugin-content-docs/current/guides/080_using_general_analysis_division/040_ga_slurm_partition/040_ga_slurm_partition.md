--- 
id: ga_slurm_partition
title: Slurm Partitions（The general analysis division）
--- 


The compute nodes managed by the Slurm job scheduler are broadly categorised into interactive nodes and batch compute nodes.

- Interactive nodes are computing environments designed for users to carry out program development or to perform small-scale, short-duration tasks in an interactive, real-time manner.
- Batch compute nodes are intended for long-running jobs and computational tasks that require large amounts of CPU or memory resources.

In Slurm, jobs are requests for computation submitted to either interactive or batch compute nodes, and these are managed using partitions. If a job requests more resources than are currently available, it is placed in a queue within the appropriate partition. The job will be executed automatically by Slurm once sufficient resources become available.

In the general analysis division of the NIG Supercomputer, Slurm partitions are defined based on the type of compute node used in each system configuration.



<table>
  <tr>
    <th>Node Type</th>
    <th>Slurm Partition Name</th>
    <th>Hardware Specification</th>
    <th>Number of Nodes / Total CPU Cores</th>
  </tr>

  <tr>
    <td>Interactive Node</td>
    <td>login</td>
    <td>
      HPC CPU Optimised Node Type 1<br />
      (AMD EPYC 9654, 192 CPU cores/node, 1536GB<br />
      8GB memory per CPU core)
    </td>
    <td>3 nodes / 576 cores</td>
  </tr>

  <tr>
    <td rowspan="6">Batch Compute Nodes</td>
    <td>epyc</td>
    <td>
      HPC CPU Optimised Node Type 1<br />
      (AMD EPYC 9654, 192 CPU cores/node, 1536GB<br />
      8GB memory per CPU core)
    </td>
    <td>12 nodes / 2304 cores</td>
  </tr>

  <tr>
    <td>rome</td>
    <td>
      HPC CPU Optimised Node Type 2<br />
      (AMD EPYC 7702, 128 CPU cores/node,<br />
      4GB memory per CPU core)
    </td>
    <td>9 nodes / 1152 cores</td>
  </tr>

  <tr>
    <td>short.q</td>
    <td>
      HPC CPU Optimised Node Type 1<br />
      (AMD EPYC 9654, 192 CPU cores/node, 1536GB<br />
      8GB memory per CPU core)
    </td>
    <td>1 node / 192 cores</td>
  </tr>

  <tr>
    <td>medium</td>
    <td rowspan="2">
      Memory Optimisation Node Type 2<br />
      (AMD EPYC 9654, 192 CPU cores/node,<br />
      16GB memory per CPU core)
    </td>
    <td rowspan="2">2 nodes / 384 cores</td>
  </tr>
</table>

