---
slug: 2024-06-06-Lustre7_maintenance_followup
title: "(Ended) (Follow-up)[Outage] June 5, 2024: Emergency maintenance of Lustre7"
tags:
  - maintenance
authros:
  - oogasawara
  - akatsumata
date: 2024-06-06
---

Publication date: June 6, 2024

The restoration work was completed at around 12:00 (24 hours notation) on Thursday, 6 June 2024.

- At 1:34:21 am on Wed 5 Jun, a fault occurred on the Lustre7 high-speed storage system in the General Analysis division, resulting in a partial write failure. Specifically, one of the 88 RAID groups Lustre OST (OST0031) was not writable.
- The recovery work started at around 15:30 and finished at around 20:00.
- However, at 20:00, it was confirmed that some compute nodes were not able to access OST0031 (neither read nor write). Specifically, the following computation nodes.
    - at017,at025,at054,at049,at051,at052,at047,at045,at050,at053,at085,at099,at102,at101,at132, (15 out of 136 Thin compute nodes Type 1a, AMD EPYC 7501 CPU)
    - at140,at141,at149,at155, (4 out of 28 Thin compute nodes Type 1b, AMD ROMA CPU)
    - it001,it040,igt003,it050,it049, (5 out of 52 Thin compute nodes Type 2a, Intel CPU)
    - gw1,gw4, (2 gateways for the general analysis division)
    - m01 (one of 10 medium nodes)
    - dtn2,dtn4 (data transfer nodes used for DDBJ services)
- - Thu 6 Jun, these nodes will be restarted in sequence to normalise access to Lustre7.
    - Since two gateways in the general analysis section are included, login to the supercomputer will not be possible during this work and it will be disconnected from SSH communication.
    - [There are two gateways in the general analysis division, so if you cannot log in to one of them, please log in from the other one.](/general_analysis_division/ga_login#two-gateways)


## Scope of impact
- **From around 1:30 to 20:00 on 5 June, any writing to OST0031 from all compute nodes is not possible, nor is any reading between 15:30 and 20:00. The compute nodes listed above were also not read/write accessible as of 6 June. Please check your calculation results for any anomalies.** (Jobs that do not use OST0031 are not affected, but whether or not using OST0031 is randomly determined.) 
- As you cannot log in to the SSL-VPN, you may not be able to log in to the personal genome analysis division either.
- Communication breakdowns will occur for DDBJ services that use data transfer nodes dtn2 and dtn4.
