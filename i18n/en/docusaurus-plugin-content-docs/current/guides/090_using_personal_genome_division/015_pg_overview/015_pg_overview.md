---
id: pg_overview
title: "Overview of How to Use the personal genome analysis division"
---

- For security reasons, users are generally required to use dedicated (exclusive) compute nodes in the personal genome analysis division, so that they cannot see the job statuses of other users.

- However, due to the particularly limited number of L40S GPU nodes (Accelerator-optimised node Type 2), these are made available through a shared, GPU-dedicated Slurm job scheduler in order to maximise computational efficiency.

---

1. In either case, users must first log in to the personal genome analysis division gateway via SSL-VPN.  
2. For all nodes other than the L40S GPU nodes, users access their dedicated compute nodes via SSH from the gateway. It is also possible to submit jobs to one’s own dedicated node using Slurm from within that node.  
3. When using an L40S GPU node (Accelerator-optimised node Type 2), users should log in via SSH to the interactive node designated for L40S GPU access.

