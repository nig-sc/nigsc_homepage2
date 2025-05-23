---
id: top_page
title: Top Page
description: "Add important notice 2024 Third Term to Featured News"
slug: /
---

# NIG Supercomputer (2019 `=>` 2025)

The National Institute of Genetics (NIG) provides a cutting-edge supercomputer system equipped with large-scale cluster-based computation, large-scale shared memory computation, and high-capacity high-speed disk devices, serving as a large-scale computational infrastructure for information processing in life sciences and medical research.

![top_image](top_image.png)

:::tip Important

## Announcement of New System Launch

NIG Supercomputer was replaced with the new system on March 1, 2025.

- [Power Outage on April 7, 2025](/blog/2025-04-07-power-outage/)
- [Important Notices from the NIG Supercomputer: Third Term of 2024 (December–March)](/blog/2025-02-10-important_notice_2024_Dec-2025_Mar) (2025-02-10)
- [Announcement on Replacement to New Supercomputer](/blog/2024-12-05-supercomputer_replacement_announcement) (2024-12-05)
- [Important Notices from the NIG Supercomputer: Second Term of 2024 (August–November)](/blog/2024-11-11-important_notice_2024_Aug-Nov) (2024-11-11)
- [Important Notices from the NIG Supercomputer: First Term of 2024 (April–July)](/blog/2024-06-24-important_notice_2024_April-July) (2024-06-24)


The new supercomputer retains the basic configuration of the previous system while enhancing the network connection bandwidth to **100 Gbps** with **SINET6** and doubling the computational performance per CPU core.  

For GPU-equipped nodes, the system introduces **NVIDIA DGX B200** to support cutting-edge AI analysis, as well as cost-effective **NVIDIA L40S** and **PEZY-SC3** computing nodes for genome analysis.  

For more details on the new supercomputer’s configuration, please refer to the **[Hardware (2025)](/guides/hardware/hardware2025/)** page.


## Changes in Usage Instructions  

As of March 1, 2025, 12:00 PM, the login service for the new supercomputer has been launched.  

### 1. Login Instructions for the New System  

#### (1) Temporary Login Method  
For now, please use the following temporary login method. Further details will be announced on the website later.  

- General Analysis Division: First, log in to the gateway node via SSH. Then, log in to one of the interactive nodes (`a001`, `a002`, or `a003`) via SSH. For example, the following command executed on the gateway node will allow SSH login to an interactive node:  

  ```bash
  [youraccount@gw ~]$ ssh a001
  ```

  The job scheduler has been changed from Grid Engine to Slurm. Therefore, Grid Engine job scripts must be converted to Slurm scripts.  
  We apologize for the inconvenience, but please refer to the Software > Slurm page and update your job scripts accordingly.  

  [https://sc.ddbj.nig.ac.jp/guides/software/JobScheduler/Slurm](https://sc.ddbj.nig.ac.jp/guides/software/JobScheduler/Slurm)  

  The Slurm partition structure (equivalent to Grid Engine queues) is as follows:  

  - epyc  
  - short  
  - rome  
  - medium  

  Regarding GPU nodes:  
  - GPU nodes will be added from April 1.  
  - L40S-equipped GPU nodes will be available starting April 1.  
  - From March 1 to March 31, GPU nodes will not be available. We appreciate your understanding.  
  - B200-equipped GPU nodes are scheduled to be available from June 1.  

- Personal Genome Analysis Division: As before, connect via SSL-VPN using FortiClient, and then log in to your dedicated node via SSH.  
  - The SSL-VPN connection destination IP address and password have changed. You must update the IP address configured in FortiClient.  
    - Previous IP: `133.39.24.254`  
    - New IP: `133.39.233.30`  
  - Use your login password instead of the previous VPN password.  
    - This is not your SSH key passphrase.  
    - The login password is listed as the initial password on your account registration certificate. If you have changed it, please use your updated password.  

#### (2) Operating System Update  
All compute nodes in the new supercomputer have been upgraded from Ubuntu Linux 22.04 to Ubuntu Linux 24.04.  

As a result, when logging in for the first time, you may encounter the following SSH warning message due to the server's host key mismatch:  

```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
```

For instructions on how to resolve this error, please refer to the following URL:  

[https://sc.ddbj.nig.ac.jp/guides/FAQ/faq_general_analysis_division/faq_login_general/#error-ssh-login](https://sc.ddbj.nig.ac.jp/guides/FAQ/faq_general_analysis_division/faq_login_general/#error-ssh-login)  

#### (3) Dedicated Node Access  
Users who are utilizing dedicated node services in either the Personal Genome Analysis Division or General Analysis Division will receive separate instructions regarding access to the new compute nodes.  



### 2. Important Notes on Migration from the Previous Supercomputer  

The following is a reiteration of the information previously provided via email and on the website.  

#### (1) Home Directory Migration  
The final state of user home directories as of February 14, 2025, 5:00 PM has been copied to the new supercomputer’s storage.  

#### (2) Changes to Billing for Charged Services  
The billing rates for storage, memory-optimized nodes, and accelerator-optimized nodes (GPU nodes) have been revised to reflect the proportional leasing costs, in consideration of business continuity.  
For details on the updated pricing, please refer to the [Supercomputer (2025) Terms of Use](/application/terms_and_policies/terms_of_use_2025/) page.


:::

:::warning
Due to limited disk capacity, the research institute does not back up data in users' home directories. Users are responsible for backing up their data.
:::


## Featured News {#featured-news}

- [(Restored) [Outage] Slurm Outage in General Analysis Division on Thursday, May 22, 2025](/blog/2025-05-22-Slurm_ga_maintenance) (May 22, 2025) ＼ &#x1F195; ／
- [Network Maintenance due to Switchover to SINET6 on Wednesday, May 24, 2025](/blog/2025-05-24-network) (April 10, 2025)
- [Power Outage on April 7, 2025](/blog/2025-04-07-power-outage) (April 7, 2025)
- [Important Notices from the NIG Supercomputer: Third Term of 2024 (December–March)](/blog/2025-02-10-important_notice_2024_Dec-2025_Mar) (February 10, 2025) 
- [Announcement on Replacement to New Supercomputer](/blog/2024-12-05-supercomputer_replacement_announcement) (December 5, 2024) 
- [Extended Maintenance Period for Account Application System](/blog/2024-12-05-extened_account_system_maintenance) (December 5, 2024) 
- [Important Notices from the NIG Supercomputer: Second Term of 2024 (August–November)](/blog/2024-11-11-important_notice_2024_Aug-Nov) (November 11, 2024)
- [Maintenance of Account Application System](/blog/2024-10-25-account_system_maintenance) (October 25, 2024)
- [Important Notices from the NIG Supercomputer: First Term of 2024 (April–July)](/blog/2024-06-24-important_notice_2024_April-July) (June 24, 2024)


## Year-End Account Renewal Applications {#year-end-renewals}

The account application system is currently being revised for security enhancements, which is causing a delay in its reopening. Account renewal applications will be processed after the system is reopened. For 2024FY, account renewal for the supercomputer(2025) will be handled by the supercomputer administrator without use's application.


## Regular Maintenance in Fiscal Year 2024 {#2024-annual-maintenance}

[Regular maintenance for fiscal year 2024 was conducted from December 13 to December 19, 2024.](/blog/2024-12-13-scheduled-maintenance)


## Temporary Suspension of New Account Registrations for Large-Scale Users in General and Personal Genome Analysis Areas (May 13, 2022) {#registration-suspension}

Thank you for using the NIG supercomputer.

Due to the supercomputer's computational resources being highly constrained in terms of both CPU and disk, new account registrations for the following users will be temporarily suspended:

- Large-scale users in the general analysis area
- Users in the personal genome analysis area

The following applications will continue to be accepted:

- Additional resource usage requests for users who are already large-scale users in the general analysis area or personal genome analysis area.
- Regular user registrations for the general analysis area. In this case, disk usage is limited to an initial setting of up to 1TB.
- Applications for workshop usage will also continue to be accepted.

However, we ask for your understanding as it may not always be possible to meet your requests.

The resumption of new account registrations will be decided based on the availability of computational resources. Updates on the availability will be published on the homepage every four months. Prospective users are requested to refer to these updates and submit their usage plans in advance. Please note that the availability forecasts are not guaranteed, and requests may not always be fulfilled.


## Acknowledgements {#acknowledgement}

The activities of the NIG supercomputer system are evaluated through the acknowledgements received. If a paper utilizing this supercomputer system is accepted, please include an acknowledgement using the examples below.

Examples:

```
==============================================

<English Acknowledgement>
Computations were partially performed on the NIG supercomputer
at ROIS National Institute of Genetics.

==============================================

<Japanese Acknowledgement>
本研究は、情報・システム研究機構 国立遺伝学研究所が
有する遺伝研スーパーコンピュータシステムを利用しました。

================================================

