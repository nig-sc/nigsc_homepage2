---
slug: 2025-05-22-Slurm_ga_maintenance
title: "(Resolved) [Outage] May 22, 2025:  Slurm Outage in General Analysis Division on Thursday, May 22, 2025"
tags:
  - maintenance
date: 2025-05-22
---



At 02:54 on Thursday, May 22, 2025 (24-hour format; all times below are in 24-hour format), the Slurm management server for the general analysis division encountered a service outage.

The cause of the issue was insufficient memory on the compute node hosting the Slurm management server.

Recovery procedures were completed at 10:34 on the same day, and job submission has since resumed.


## Scope of Impact

<!-- truncate -->

- In the general analysis division, job submissions were unavailable for approximately 8 hours, from 02:54 to 10:34, due to the Slurm management server outage.  
Running jobs during this period were cancelled and will need to be resubmitted. Affected users will be contacted individually.  
In contrast, jobs that had not yet started during this period were not impacted.
- The personal genome analysis division was not affected.
- DDBJ services were not affected.