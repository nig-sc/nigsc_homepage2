---
slug: 2025-12-25-Slurm_ga_maintenance
title: "(Restored) [Outage] December 25, 2025:  Slurm Outage in General Analysis Division on Thursday, December 25, 2025"
tags:
  - maintenance
date: 2025-12-25
---



At approximately 10:30 on Thursday, 25 December 2025 (24-hour clock; all times below are shown in 24-hour format), the Slurm management server for the General Analysis Division stopped.

The cause of the issue was insufficient memory on the compute node hosting the Slurm management server.

Recovery procedures were completed at 15:00 on the same day, and job submission has since resumed.

<!-- truncate -->

~~The system has not yet been restored.　Updates on the recovery work will be provided on the website as information becomes available.~~

## Scope of Impact



- In the general analysis division, job submissions were unavailable for approximately 4.5 hours, from 10:30 to 15:00, due to the Slurm management server outage.~~Job submission to the General Analysis Division is currently unavailable. Jobs that were running during the outage may have been cancelled and may need to be resubmitted.~~
  - You can check your own jobs that may have been affected during the incident using the following command:
    - `sacct -X -S 2025-12-25T10:30:00 -E 2025-12-25T15:00:00 --state=CANCELLED,FAILED --format=JobID,JobName,User,State,Start,End`
  - After checking the results, please re-submit the jobs if necessary.
- The personal genome analysis division is not affected.
- DDBJ services is not affected.
