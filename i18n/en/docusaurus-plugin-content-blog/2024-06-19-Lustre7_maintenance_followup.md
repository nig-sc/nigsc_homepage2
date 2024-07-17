---
slug: 2024-06-19-Lustre7_maintenance_followup
title: "(Ended) (Follow-up)[Outage] June 18, 2024: Emergency maintenance of Lustre7"
tags:
  - maintenance
authros:
  - oogasawara
  - akatsumata
date: 2024-06-19
---

Publication date: June 19, 2024


The restoration work was completed at 9:00am on Tuesday, 25 June 2024.

Also, the gateways (gw.ddbj.nig.ac.jp, gw2.ddbj.nig.ac.jp) have been restored and are available for logging in.

- At 18:21:14 on Mon 17 Jun, a fault occurred on the Lustre7 high-speed storage system in the General Analysis division, resulting in a partial write failure. Specifically, one of the 88 RAID groups Lustre OST (OST0029) was not writable.
- The recovery work started at around 14:00 on Tue 18 Jun and finished at around 20:00.
- However, at 20:00, it was confirmed that some compute nodes were not able to access OST0029 (neither read nor write). Specifically, the following computation nodes.
    - at017,at025,at026,at028,at029,at030,at031,at032,at033,at034,at035,at036,at037,at043,at044,at045,at046,at047,at048,at050,at051,at052,at053,at054,at055,at057,at058,at059,at060,at061,at062,at063,at064,at073,at074,at083,at084,at085,at087,at090,at095,at096,at097,at098,at099,at100,at101,at102,at103,at126,at127,at128,at129,at130,at131,at132,at133,at134,at135,at136 (60 of 136 Thin compute nodes Type 1a, AMD EPYC 7501 CPU)
    - at139,at140,at141,at142,at143,at144,at145,at146,at147,at148,at149,at150,at151,at152,at153,at154,at155,at156,at157,at159,at160,at161,at162,at163,at164 (25 of 28 Thin compute nodes Type 1b, AMD ROMA CPU)
    - it001,it002,it004,it006,it007,it008,it009,it010,it013,it014,it015,it017,it024,it025,it026,it027,it028,it029,it031,it032,it034,it035,t036,it040,it041,it048,it049,it050,it051,it052 (30 of 52 Thin compute nodes Type 2a, Intel CPU)
    - igt001,igt003,igt005,igt006,igt007,igt008,igt011,igt012,igt013,igt014 (10 of 16 Thin compute nodes Type 2b, Intel CPU)
    - `gw.ddbj.nig.ac.jp`, `gw2.ddbj.nig.ac.jp` (all of 2 gateways for the general analysis division)
    - m01,m02,m03,m04 (4 of 10 medium nodes)
    - dtn4 (one of 4 data transfer nodes used for DDBJ services)
- - Wed 19 Jun, these nodes will be restarted in sequence to normalise access to Lustre7.
    - Since two gateways in the general analysis section are included, login to the supercomputer will not be possible during this work and it will be disconnected from SSH communication.
    - [There are two gateways in the general analysis division, so if you cannot log in to one of them, please log in from the other one.](/general_analysis_division/ga_login#two-gateways)


## Scope of impact
- **From around 18:20 on 17 June to 14:00 on 18 June, any writing to OST0029 from all compute nodes is not possible. From around 14:00 to 20:00 on 18 June, any writing and reading to OST0029 from all compute nodes is not possible. The compute nodes listed above were also not read/write accessible as of 19 June. Please check your calculation results for any anomalies.** (Jobs that do not use OST0029 are not affected, but whether or not using OST0029 is randomly determined.) 
- The personal genome analysis division will not be affected.
- Communication breakdowns will occur for DDBJ services that use data transfer nodes dtn2 and dtn4.
