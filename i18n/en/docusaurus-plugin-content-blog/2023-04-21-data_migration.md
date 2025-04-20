---
slug: 2023-04-21-data_migration
title: "April 21, 2023:  Request for data migration of some users due to the start of operation of the new storage system for databases"
tags:
  - maintenance

date: 2023-04-21
---


The storage system used to build the DDBJ database was replaced in April 2023 and the disk space was renewed from approximately 15 PB to 40 PB.

<!-- truncate -->

Currently, data on Lustre6 high-speed storage for DDBJ operations and data on GPFS1,2 storage for the previous database are being migrated to the new storage system. The data migration will be completed around July, after which full-scale operations will be started.

After the new storage is fully operational, DRA data etc. will be directly mounted from the NIG supercompute and will be available directly.

Lustre6 was mainly used for building the DDBJ database, but some users' data of the previous supercomputer (NIG supercomputer 2012) still remained. We are informing the applicable users by email. The user home directories in the general analysis division of the current NIG supercomputer is located in Lustre7, so we ask users who have received the email to transfer your data there or delete your data.

For information on the current storage types, see below.

[Hardware > Storage > Analysis storage](/guides/hardware/hardware2025/#analysis-storage)
