---
id: ga_queue
title: Grid Engine Queue Type
---


Compute nodes managed by the Grid Engine are broadly devided into login nodes and compute nodes.

- Login nodes(login node) are calculators to develop users' programs or perform small, quick calculations interactively on the spot.
- Compute nodes(compute node) are compute node to perform calculations that take a long time or use a large amount of CPU or memory.

Compute requests called jobs to login and compute nodes are managed in Grid Engine with queues.
Jobs wait in queue and are automatically executed by Grid Engine as soon as a computer is available if calculation requirements exceed computer resources.

In the general analysis division of the NIG supercomputer, there is a Grid Engine queue for each type of compute node.





<table>
<tr>
  <th>Compute nodes Type</th>
  <th>Grid Engine queue name</th>
  <th>Hardware type</th>
  <th>Number of computers and total cores</th>
</tr>
<tr>
  <td rowspan="2">Login Nodes</td>
  <td>login.q</td>
  <td>Thin nodes Type1b<br />
  (AMD EPYC7702, 128 CPU cores/node,<br />
  4GB memory/CPU core)
  </td>
  <td>three computers<br/>384 cores</td>
</tr>
<tr>

  <td>login_gpu.q</td>
   <td>Thin nodes Type2b <br />
   (Intel Xeon Gold 6136, 24 CPU cores/node, <br />
   16GB memory/CPU core)
   </td>
  <td>one computer<br/>24 cores</td>
</tr>

<tr>
  <td rowspan="5">Compute Nodes</td>
  <td>epyc.q</td>
    <td>Thin nodes Type1b<br />
  (AMD EPYC7702, 128 CPU cores/node, <br />
  4GB memory/CPU core)  </td>
  <td>25 computers<br/>3200 cores</td>

</tr>
<tr>
  <td>intel.q</td>
  <td>Thin nodes Type2a <br />
  (Intel Xeon Gold 6130, 32 CPU cores/node, <br />
  12GB memory/CPU core)
  </td>
  <td>32 computers<br/>1024 cores</td>
</tr>
<tr>
  <td>gpu.q</td>
     <td>Thin nodes Type2b <br />
   (Intel Xeon Gold 6136, 24 CPU cores/node, <br />
   16GB memory/CPU core)
   </td>
  <td>seven computers<br/>168 cores</td>
</tr>
<tr>
  <td>short.q</td>
     <td>Thin nodes Type1a <br />
   (AMD EPYC7501, 64 CPU cores/node,<br />
   8GB memory/CPU core)
   </td>
  <td>two computers<br/>128 cores</td>
</tr>
<tr>
  <td>medium.q</td>
  <td>Medium nodes <br />
  (Intel Xeon Gold 6148, 80 CPU cores/node, <br />
  38.4GB moemory/CPU core)
  </td>
  <td>ten computers<br/>800 cores</td>
</tr>

</table>
