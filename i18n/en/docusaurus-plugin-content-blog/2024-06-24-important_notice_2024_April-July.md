---
slug: 2024-06-24-important_notice_2024_April-July
title: "June 24, 2024: Important Announcement from the NIG supercomputer: 1st Period of 2024 (April - July)"
tags:
  - maintenance

date: 2024-06-24
---



## Contents
1. Notice of software update
2. Notice of operating system change to Ubuntu Linux 22.04 for Medium node
3. Notice of replacement to the next generation of the NIG supercomputer
4. **!!NOTICE!!** Data of users who have not renewed the account by the end of June will be deleted from 1 July.

<!-- truncate -->

## １．Notice of software update

Software updates are scheduled for the following dates and times.

### Period

Monday 1 July 2024, 10:00 - Wednesday 3 July 2024, 21:00

### Details of the software upgrade

Table: Software upgrade plan for development/analysis

<table>
<tbody>
   <tr>
   <td>#</td>
   <td>Software</td>
   <td>Before version up</td>
   <td>After version up</td>
   </tr>

   <tr>
   <td>(1)</td>
   <td>Apptainer</td>
   <td>1.2.4</td>
   <td>1.3.2</td>
   </tr>
   
   <tr>
   <td>(2)</td>
   <td>SingularityCE</td>
   <td>4.0.0</td>
   <td>4.1.3</td>
   </tr>
   
   <tr>
   <td>(3)</td>
   <td>NVIDIA HPC SDK(former PGI compiler)</td>
   <td>23.7</td>
   <td>24.3</td>
   </tr>
   
   <tr>
   <td>(4)</td>
   <td>Intel OneAPI</td>
   <td>2023.2.0</td>
   <td>2024.1.0</td>
   </tr>
   
   <tr>
   <td>(5)</td>
   <td>AMD C compiler(AOCC)</td>
   <td>-</td>
   <td>4.2</td>
   </tr>
   
   <tr>
   <td>(6)</td>
   <td>NVIDIA CUDA</td>
   <td>12.1</td>
   <td>12.3</td>
   </tr>
   
   <tr>
   <td>(7)</td>
   <td>Parabricks</td>
   <td>4.1</td>
   <td>4.3.1</td>
   </tr>
    
</tbody>
</table>

A Server restart is scheduled to occur for the GPU node. Users who occupy GPU nodes for billing services will be contacted separately with the date and time.


## ２． Notice of operating system change to Ubuntu Linux 22.04 for Medium node

The Medium node is currently running on CentOS 7.9, but as Cent OS 7 will be out of support (EOL) at the end of June.We will gradually change to Ubuntu Linux 22.04.

We will create a new medium-ubuntu.q queue in GridEngine and migrate the Medium nodes that have been changed to Ubuntu Linux 22.04 to this queue sequentially.When you submit a job to the medium-ubuntu.q queue, the job will be run in the Medium node on Ubuntu Linux 22.04, and when you submit a job to the Medium.q queue, the job will be run in the Medium node on Cent OS 7.9.
One or two Cent OS 7.9 Medium nodes will also remain.


## 3． Announcement of replacement to the next NIG supercomputer system

At the end of FY2024, it will be replaced by the next NIG supercomputer system. The current NIG supercomputer is contracted until 28 February 2025. The next NIG supercomputer is scheduled to start operation on 1 March 2025. Further details will be announced around October 2024 after the opening of the tender.


## 4. **NOTE: ** Data of users who have not applied for a renewal of the account by the end of June will be deleted from 1 July onwards.

### 4.1. If you would like to continue using your account.

If you did not applyfor a renewal of your account of the end of the fiscal year between 4 Jan and 31 Mar, your account will be suspended from 1 Apr and you will not be able to log in to this account system.

If you wish to continue using your account, [send us an email](/application/reference) to lift the suspension of your account.
After the suspension is lifted, click on the link below to complete the end-of-year renewal and performance report (progress report).

- Applying for a renewal of your account of the end of the fiscal year
	- https://sc.ddbj.nig.ac.jp/en/application/renewal/ 

### 4.2. If you would like to discontinue using your account

Click on the link below to stop using your account.

- [Application for account suspension](/blog/2024-10-25-account_system_maintenance)
	<!-- - https://sc-account.ddbj.nig.ac.jp/en/application/suspension -->

### NOTES.
- 4.1. After account lock, the home directory will be deleted sequentially from 1 July.
- 4.2. If you apply for account suspension, your account will be deactivated sequentially.


Thank you for your understanding and cooperation.

If you have any questions, [contact us.](/application/reference)
