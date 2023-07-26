---
slug: 2023-07-27-NewStrage_Lustre9
title: "July 27, 2023: Communication breakdown due to switchover to new storage system."
tags:
  - maintenance
authros:
  - oogasawara
  - akatsumata
date: 2023-07-26
---


Due to switching work associated with the update of the storage system for the DDBJ database, the FTP service and connections with Aspera will be temporarily unavailable during the following time period.


## Date

Monday, 27 July 2023, 9:00 - 15:00 (24h notation)
- Communication interruptions of about 15 minutes occur.


## Scope of impact

- General Analysis Section and Personal genome Analysis Section of the NIG supercomputer
  - Login and data transfer operations using scp and HCPtools will not be affected.
  - The running jobs will not be stopped.
  - Access to the DDBJ database from within the supercomputer (access to under /usr/local/resources/) will not be affected.
- DDBJ services
  - Downloading of DDBJ databases using FTP, Aspera and HTTPS will not be available.


We appreciate your understanding and cooperation.
