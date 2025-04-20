---
slug: 2024-12-13-scheduled-maintenance
title: "(Ended) [Maintenance] December 13 - December 19, 2024: Scheduled Maintenance"
tags:
  - maintenance
date: 2024-12-13
---



The scheduled maintenance of the NIG supercomputer is scheduled on the following date and time in accordance with the legal power outage of the NIG. The supercomputer will not be available during the scheduled maintenance.

<!-- truncate -->

## Period

December 13, 17:00 - December 19, 2024, 24:00(24h)


## Work schedule

- 13 Dec.(Fri.) 17:00 - 　Supercomputer outage
- 14 Dec.(Sat.) 　　　　　Legal power outage
- 15 Dec.(Sun.) - 18 Dec.(Wed.) Supercomputer scheduled maintenance work
- 19 Dec.(Thu.) is a spare day.


## Main Work Description
- Perform an overall upgrade with `apt upgrade` in Ubuntu Linux.
- Updates to software outside the control of `apt` will be published in [‘software update information’](/guides/software/software_update_info) as soon as they are determined.
- OS update for some gateway nodes. When logging in after the update, you will get the following error message due to the SSH server's impersonation protection feature:
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
To fix this error, please follow the steps of the URL below.

    https://sc.ddbj.nig.ac.jp/en/guides/FAQ/faq_general_analysis_division/faq_login_general/#error-ssh-login
    

## Notes
- Running jobs will be deleted, so please resubmit jobs after the scheduled maintenance.
