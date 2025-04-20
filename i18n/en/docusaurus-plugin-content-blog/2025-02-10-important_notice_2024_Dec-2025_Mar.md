---
slug: 2025-02-10-important_notice_2024_Dec-2025_Mar
title: "Feb. 10, 2025: Important Announcement from the NIG supercomputer: 3rd Period of 2024 (December-March)"
description: "Edit link jp to en"
tags:
  - maintenance
date: 2025-02-10
---



## Table of Contents

1. Announcement of the Replacement to the Next-Generation NIG Supercomputer and Price Revision
2. Announcement Regarding Year-End Account Renewal Application
3. 3rd Period of 2024 Billing Deadline Notice
4. Other Frequently Asked Questions

<!-- truncate -->


## 1. Announcement of the Replacement to the Next-Generation NIG Supercomputer and Price Revision

### 1.1. Configuration of the Successor Supercomputer (2025)

The basic configuration of the new supercomputer will follow that of the current one, with significant enhancements: the network connection to SINET6 will be upgraded to 100 Gbps, and the computational performance per CPU core will approximately double.

For GPU-equipped nodes, the following cutting-edge hardware will be introduced: NVIDIA DGX B200 for advanced AI analysis, NVIDIA L40S and PEZY-SC3 to provide cost-effective solutions for genome analysis.

For more details about the Successor Supercomputer (2025)’s configuration, please visit the NIG Supercomputer website: 

https://sc.ddbj.nig.ac.jp/en/guides/hardware/hardware2025/


### 1.2. Schedule Until the Next-Generation NIG Supercomputer Becomes Operational

Data migration from users' home directories is currently in progress. Data as of 5:00 PM on February 14, 2025, will be the final snapshot copied to the Next-Generation NIG Supercomputer’s disk.
For data after February 14, 2025, please back up as necessary and migrate it to the Next-Generation NIG Supercomputer yourself.

- The current supercomputer will be shut down at 9:00 AM on February 21, 2025, to facilitate the transition to the next-generation system.
- The login service for the Next-Generation NIG Supercomputer will become available from 12:00 PM on March 1, 2025.
  - The NIG supercomputer will be unavailable from 9:00 on 21 February 2025 until 12:00 on 1 March 2025.
- GPU compute nodes equipped with L40S will be available starting April 1. Please note that GPU compute nodes will not be accessible during the period from March 1 to March 31. We appreciate your understanding.
- GPU compute nodes equipped with B200 are scheduled to be available starting June 1.


### 1.3. Points to Note Regarding the Transition to the Next-Generation NIG Supercomputer

(1) The job scheduler will change from Grid Engine to Slurm. Job scripts written for Grid Engine must be converted to Slurm-compatible scripts. Please refer to the NIG Supercomputer website for guidance on this transition: https://sc.ddbj.nig.ac.jp/en/guides/software/JobScheduler/Slurm/

(2) The operating system for all computation nodes of the Next-Generation NIG Supercomputer will be Ubuntu Linux 24.04.

(3) The charges for the billing services, including storage, Memory optimisation node, and Accelerator-optimised nodes (GPU nodes), are based on lease fee allocation from a business continuity perspective. As a result of the replacement, the charges will be revised. Details of the revisions will be published on the website shortly.

https://sc.ddbj.nig.ac.jp/en/application/terms_and_policies/terms_of_use_2025/


## 2. Announcement Regarding Year-End Account Renewal Applications

Currently, due to security measures, the account application system is undergoing revisions, and it will take some time before it is republished.
The year-end account renewal applications will be carried out after the system is republished.
For this year, account renewals for the Next-generation NIG Supercomputer will be handled by the supercomputer administrators, so no action is required from users.


## 3. Billing Deadlines

As usual, the deadline for billing for the third period is the last day of December (Tuesday, December 31). 
 
Please note that for the billing service for the third term, no changes to plans with changes in amounts can be made after January 1.

The expected amount to be billed was already notified at the end of January, and the invoice will be sent by post in mid-March.

For more information, please refer to the following page

https://sc.ddbj.nig.ac.jp/en/application/invoice/



## 4. Other Frequently Asked Questions

### 4.1.  Error Message when Logging into the Gateway

An OS update has been performed on some of the gateway nodes.

When logging into a gateway node, you may encounter the following error message due to SSH server impersonation prevention:

```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
```

To resolve this error, please follow the instructions provided in the link below:

https://sc.ddbj.nig.ac.jp/en/guides/FAQ/faq_general_analysis_division/faq_login_general/#error-ssh-login


### 4.2. How to Upload an SSH Public Key

To enhance security, the ED25519 public key cryptography algorithm is now recommended.

To change or modify your SSH public key, you will first need to generate a new SSH public key.

- For instructions on how to create an SSH public key, refer to the following link:

　https://sc.ddbj.nig.ac.jp/en/application/ssh_keys/

- To install your SSH public key on the NIG supercomputer, refer to the following link:

　https://sc.ddbj.nig.ac.jp/en/application/ssh_copy_id/
