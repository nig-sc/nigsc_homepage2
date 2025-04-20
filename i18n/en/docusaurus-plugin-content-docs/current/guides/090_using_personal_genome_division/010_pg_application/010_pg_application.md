---
id: pg_application
title: "Preparation for use（The Personal Genome Analysis division）"
---

## Preparation of user's computer {#prepare-users-computer}

The personal genome analysis division of NIG supercomputer can be used in the same way as the general analysis division, which with a computer running a SSH client and a web browser. We recommend a Windows, Mac, or Linux computer with 16GB or more main memory.

- Mac and Linux computers can be accessed using a standard terminal emulator.
- Windows computers can be accessed using PowerShell SSH client or Windows Subsystem for Linux version 2 (WSL2), etc.

## Steps from account application to start of use {#starting-to-use}

The account name of the personal genome analysis division is the account name of the general analysis division with `-pg` added to the end.
If you only use the personal genome analysis division, you will be given an account in the general analysis division.
Steps from account application to start of use are [the same step as the general analysis division](http://guides/using_general_analysis_division/ga_application/#steps-from-application-to-start).
The personal genome analysis division is [a billing service](/application/resource_extension), so [Download the usage plan](/application/resource_extension), fill it out and submit it.



1. [Follow the account application procedure](/application/registration) and apply from [the account application form](/blog/2024-10-25-account_system_maintenance)<!-- (https://sc-account.ddbj.nig.ac.jp/en/application/registration) -->.
    - Before you fill it in, ensure ['Issuance criteria for user accounts'](/application/terms_and_policies/user_account_issurance_criteria) and ["Term of Use"](/application/terms_and_policies/terms_of_use_2025).
    - You can use the e-mail address of your institution, not a free e-mail address. (except in special cases)
    - In the registration form, there is a page to register the SSH public key, so create your SSH public key in advance. For details, see [SSH public key registration](/application/ssh_keys)
    - When applying to use the NIG supercomputer, you must designate a faculty member of a university or national/public research institution who is a resident of Japan under the Foreign Exchange and Foreign Trade Control Law as the responsible person. A UNIX group is created for each account of the responsible person.
2. To confirm your identity, the person in charge of the NIG supercomputer send email to [the responsible person](/application/terms_and_policies/user_account_issurance_criteria/#the-responsible-persons-responsibilities). Send back the Pledge(PDF) [with reference to the 'Steps to sign a PDF'](/application/agreement_signing).
    - The email will be sent in a few days after completing the application form.
3. Wait for your account registration certificate to arrive.
    - It takes about a week to mail your account registration certidicate by post after you sent the pledge(PDF).
    - It takes longer time if the examination is required by the Organization such as foreign exchange law.
4. Confirm your initial password with your account registration certificate and start using the service.
    - For how to login the general analysis division, refer to the pages after [How to Login (The Personal Genome Analysis division)](/guides/using_general_analysis_division/ga_login)
5. If you have a request to expand the resources or use billing services, [download the Usage Plan Form](/application/resource_extension), fill it out and submit it.
    - [Contact us](/application/reference/) for Submission.


### Additional notes on preferences{#add-note-pref}

When using the personal genome analysis division, indicate your preference regarding the following.

- Type and number of compute nodes you want to use.
     - For types of compute nodes, refer to [System Overview > Hardware](/guides/hardware/hardware2025/).
    - Basically, only Thin compute nodes are available. If you need to use Medium or Fat nodes, contact us.
- If you want to install a job scheduler, which one to install, Grid Engine or Slurm.
    - For how to use it, refer to [System Overview > Software](/guides/software).
- If you would like to use NVIDIA Parabricks, contact us.


## Application for use by a group {#application-group}

If you would like to register many users, such as for using in a workshop or consortium, follow the steps below.

1. If the person in charge does not yet have an account for NIG supercomputer, create an account by following the steps above.
2. [Download the usage plan](/application/resource_extension) and submit it with all information. At that time, fill in the purpose of use and the amount of resources to be used.
