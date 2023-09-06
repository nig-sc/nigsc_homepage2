---
slug: 2022-12-02-scheduled-maintenance
title: "(Ended) [Maintenance] December 2 - December 8, 2022: Scheduled Maintenance."
tags:
  - maintenance
authros:
  - oogasawara
  - akatsumata
date: 2022-11-09
---

Publication date: November 9, 2022

The scheduled maintenance of the NIG supercomputer is scheduled on the following date and time in accordance with the legal power outage of the NIG. The supercomputer will not be available during the scheduled maintenance.

## Period

December 2, 17:00 - December 8, 2022, 00:00(24h)


### Work schedule

- 12/2(Fri.) 17:00～ 　Supercomputer outage
- 12/3(Sat.) 　　　　　Legal power outage
- 12/4(Sun.)～12/7(Wed.) Supercomputer scheduled maintenance work (UPS maintenance, Lustre maintenance, software updates, etc.)
- 12/8(Thu.) is a spare day.


## Main contents of Scheduled Maintenance

1. Run `yum update` on all compute nodes to get the latest version of Cent OS 7.9.

2. Singularity has been renamed Apptainer. Along with this, the following updates will be made.

- Current Singularity 3.8.7 ⇒ Apptainer 1.1
- SingularityCE 3.10.2 added
- For more information, refer to the Apptainer description page.

3. unification of SSH public key reflection flow

Until now, when the SSH public key was registered, it took about 24 hours to be reflected in the gateway gw.ddbj.nig.ac.jp in the general analysis division, and about 10 minutes in gw2.ddbj.nig.ac.jp. After the scheduled maintenance in December, the processing flow will be unified and both gw and gw2 will be reflected in about 10 minutes.


## Notes
- Running jobs will be deleted, so please resubmit jobs after the scheduled maintenance.
