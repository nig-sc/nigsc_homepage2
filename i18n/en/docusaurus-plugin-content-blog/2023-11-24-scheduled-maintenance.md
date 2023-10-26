---
slug: 2023-11-24-scheduled-maintenance
title: "[Maintenance] November 24 - November 30, 2023: Scheduled Maintenance."
tags:
  - maintenance
authros:
  - oogasawara
  - akatsumata
date: 2023-11-24
---

Publication date: October 2, 2023

The scheduled maintenance of the NIG supercomputer is scheduled on the following date and time in accordance with the legal power outage of the NIG. The supercomputer will not be available during the scheduled maintenance.

## Period

November 24, 17:00 - November 30, 2023, 17:00(24h)


## Work schedule

- 11/24(Fri.) 17:00～ 　Supercomputer outage
- 11/25(Sat.) 　　　　　Legal power outage
- 11/26(Sun.)～11/29(Wed.) Supercomputer scheduled maintenance work (UPS maintenance, Lustre maintenance, software updates, etc.)
- 11/30(Thu.) is a spare day.


## Work Description

Works for scheduled maintenance are as follows.

1. Software version upgrade 
2. OS migration (from CentOS 7.9 to Ubuntu Linux 22.04LTS)
3. Grid Engine version upgrade 
4. yum update for Cent OS that did not migrate OS 
5. Firmware and device driver version upgrade for InfininBand and Lustre 
6. LDAP configuration changes 
7. UPS inspection work

### Software Version Upgrade Details

Table: Software upgrade plan for development/analysis

<table>
<tr>
  <td>#</td>
  <td>Software</td>
  <td>Before upgrade</td>
  <td>After upgrade</td>
</tr>

<tr>
  <td>(1)</td>
  <td>Apptainer</td>
  <td>1.1</td>
  <td>1.2.2-1</td>
</tr>

<tr>
  <td>(2)</td>
  <td>SingularityCE</td>
  <td>3.10.2</td>
  <td>3.11.4</td>
</tr>

<tr>
  <td>(3)</td>
  <td>NVIDIA HPC SDK<br/>(Previous PGI compiler) </td>
  <td>22.9</td>
  <td>23.7</td>
</tr>

<tr>
  <td>(4)</td>
  <td>NVIDIA CUDA</td>
  <td>12.2</td>
  <td>12.3</td>
</tr>

<tr>
  <td>(5)</td>
  <td>Intel OneAPI</td>
  <td>2022.2.0</td>
  <td>2023.2.0</td>
</tr>

<tr>
  <td>(6)</td>
  <td>Altair Grid Engine</td>
  <td>8.6.19/8.6.4</td>
  <td>8.8.1</td>
</tr>

</table>


### OS migration (from CentOS 7.9 to Ubuntu Linux 22.04LTS)

As CentOS 7 will reach End-Of-Life on 30 June 2024, the migration from CentOS 7.9 to Ubuntu Linux 22.04LTS will be performed during scheduled maintenance.

- All compute nodes in the general analysis division will be migrated from CentOS 7.9 to Ubuntu Linux 22.04LTS. With this, **the analysis environment may need to be re-installed. Please make sure to check the development environment and reinstall the analysis environment on your own.**
- Users who are using occupied compute nodes will be asked by email whether you would like to migrate your OS during scheduled maintenance. Please let us know when the OS migration is convenient for you.


#### The Personal Genome Analysis Section

- The GPU compute nodes under Slurm will be migrated from CentOS 7.9 to Ubuntu Linux 22.04LTS. With this, **the analysis environment may need to be re-installed. Please make sure to check the development environment and reinstall the analysis environment on your own.**
- Users who are using occupied compute nodes will be asked by email whether you would like to migrate your OS during scheduled maintenance. Please let us know when the OS migration is convenient for you.


## Notes
- Running jobs will be deleted, so please resubmit jobs after the scheduled maintenance.
