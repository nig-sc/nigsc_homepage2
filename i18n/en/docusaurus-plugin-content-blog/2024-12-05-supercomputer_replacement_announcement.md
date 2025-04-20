---
slug: 2024-12-05-supercomputer_replacement_announcement
title: "Announcement Regarding the Replacement of the Supercomputer"
tags:
  - news
date: 2024-12-05
---


As previously announced on the NIG Supercomputer website, the next-generation NIG supercomputer will begin operations on March 1, 2025.

<!-- truncate -->


## 1. Configuration of the Successor Supercomputer (2025)

The basic configuration of the new supercomputer will follow that of
the current one, with significant enhancements: the network connection
to SINET6 will be upgraded to 100 Gbps, and the computational
performance per CPU core will approximately double.

For GPU-equipped nodes, the following cutting-edge hardware will be introduced:
NVIDIA DGX B200 for advanced AI analysis, NVIDIA L40S and PEZY-SC3 to
provide cost-effective solutions for genome analysis.

For more details about the Successor Supercomputer (2025)’s configuration,
please visit the NIG Supercomputer website:
https://sc.ddbj.nig.ac.jp/guides/hardware2025


## 2. Schedule Until the New Supercomputer Becomes Operational

(1) A regular maintenance period, coinciding with a legally mandated
power outage, is scheduled from 5:00 PM on Friday, December 13, 2024,
to 12:00 AM on Thursday, December 19, 2024. During this time, the
current NIG supercomputer will be unavailable.
https://sc.ddbj.nig.ac.jp/blog/2024-12-13-scheduled-maintenance

(2) Starting in mid-December, data migration from users' home directories will begin.
Data as of 5:00 PM on February 14, 2025, will be the final snapshot copied to the new supercomputer’s disk.

(3) The current supercomputer will be shut down at 9:00 AM on February
21, 2025, to facilitate the transition to the next-generation system.
The login service for the new supercomputer will become available from 12:00 PM on March 1, 2025.

(4) GPU compute nodes equipped with L40S will be available starting
April 1. Please note that GPU compute nodes will not be accessible
during the period from March 1 to March 31. We appreciate your understanding.

(5) GPU compute nodes equipped with B200 are scheduled to be available starting June 1.


## 3. Points to Note Regarding the Transition to the New Supercomputer

(1) The job scheduler will change from Grid Engine to Slurm.
Job scripts written for Grid Engine must be converted to Slurm-compatible scripts.
Please refer to the NIG Supercomputer website for guidance on this transition:
https://sc.ddbj.nig.ac.jp/guides/software/JobScheduler/Slurm/

(2) The operating system for all computation nodes of the new
supercomputer will be Ubuntu Linux 24.04.
