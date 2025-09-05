---
slug: 2025-07-29-ssh-failure_ga_gw
title: "(Resolved) [Outage] Juy 29, 2025: SSH Connection Disruption on General Analysis Gateway Node, 29 July 2025"
tags:
  - maintenance
date: 2025-07-29
---


On Tuesday, 29 July 2025, at 10:48 (24-hour format), an issue occurred preventing SSH connections to the General Analysis Division Gateway Node (`gw.ddbj.nig.ac.jp`).

<!-- truncate -->

The issue occurred due to a memory shortage on the gateway node caused by the execution of a user program. This caused the sssd process to stop, making SSH connections to the gateway node unavailable.

To address the issue, the sssd service was restarted at 12:19 on the same day, and the service has since been fully restored.

If you are unable to log in to `gw.ddbj.nig.ac.jp`, try logging in via the alternative gateway node, `gw2.ddbj.nig.ac.jp`. The login process is the same for both nodes.

For more information on login procedures, refer to the [“How to Login to the Gateway node (The general analysis division)”](/guides/using_general_analysis_division/ga_login/#two-gateways).

## Scope of Impact

<!-- truncate -->

- In the General Analysis Division, SSH connections to `gw.ddbj.nig.ac.jp` were unavailable from 10:48 to 12:19 on Tuesday, 29 July 2025.
- The personal genome analysis division was not affected.
- DDBJ services were not affected.
