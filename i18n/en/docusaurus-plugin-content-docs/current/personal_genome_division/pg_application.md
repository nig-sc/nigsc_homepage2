---
id: pg_application
title: "Preparation for use（The Personal Genome Analysis Section）"
---

## Preparation of user's computer

The personal genome analysis section of NIG supercomputer can be used in the same way as the general analysis section, which with a computer running a SSH client and a web browser. We recommend a Windows, Mac, or Linux computer with 16GB or more main memory.

- Mac and Linux computers can be accessed using a standard terminal emulator.
- Windows computers can be accessed using PowerShell SSH client or Windows Subsystem for Linux version 2 (WSL2), etc.

## Steps from user account application to start of use

The account name of the personal genome analysis section is the account name of the general analysis section with `-pg` added to the end.
If you only use the personal genome analysis section, you will be given an account in the general analysis section.
Steps from user account application to start of use are [the same step as the general analysis section](/general_analysis_division/ga_application/#steps-from-user-account-application-to-start-of-use).
The personal genome analysis section is [a billing service](../application/resource_extension.md), so [Download the usage plan](../application/resource_extension.md), fill it out and submit it.


<ol>
<li>Apply for <a href="https://sc-account.ddbj.nig.ac.jp/en/application/registration">the application form for use to register your application</a>.</li>
    <ul>
    <li>Before you fill it in, ensure <a href="https://sc.ddbj.nig.ac.jp/en/application/">"User Account Issuance Criteria"</a> and <a href="https://sc.ddbj.nig.ac.jp/en/application/use_policy">"Acceptable Use Policy"</a>.</li>
    <li>You can use the e-mail address of your institution, not a free e-mail address. (except in special cases)</li>
    <li>In the registration form, there is a page to register the SSH public key, so create your SSH public key in advance. For details, see <a href="https://sc.ddbj.nig.ac.jp/en/application/ssh_keys">SSH public key registration</a>.</li>
    <li>When applying to use the NIG supercomputer, you must designate a faculty member of a university or national/public research institution who is a resident of Japan under the Foreign Exchange and Foreign Trade Control Law as the responsible person. A UNIX group is created for each account of the responsible person.</li>
    </ul>
<li>To confirm your identity, the person in charge of the NIG supercomputer send email to <a href="https://sc.ddbj.nig.ac.jp/en/application/#the-responsible-person">the responsible person</a>. The pleage(PDF) should be signed and sent back by them.</li>
    <ul>
    <li>The email will be sent in a few days After completing the application form</li>
    </ul>
<li>Wait for your account registration certificate to arrive.
    <ul>
    <li>It takes about a week to mail your account registration certidicate by post after you sent the pledge(PDF)</li>
    <li>It takes longer time if the examination is required by the Organization such as foreign exchange law.</li>
    </ul>
</li>
<li>Confirm your initial password with your account registration card and start using the service</li>
    <ul>
    <li>For how to login the general analysis section, refer to the pages after <a href="https://sc.ddbj.nig.ac.jp/en/general_analysis_division/ga_login/">How to Login (The general analysis section)</a>.</li>
    </ul>
<li>If you have a request to expand the resources or use billing services, <a href="https://sc.ddbj.nig.ac.jp/en/application/resource_extension">download the Usage Plan Form</a>, fill it out and submit it.</li>
    <ul>
    <li><a href="https://sc.ddbj.nig.ac.jp/en/application/reference/">Contact us</a> for Submission.</li>
    </ul>
</ol>


### Additional notes on preferences

When using the personal genome analysis section, indicate your preference regarding the following.

- Type and number of compute nodes you want to use.
     - For types of compute nodes, refer to [System Overview > Hardware](./guides/hardware.md).
    - Basically, only Thin compute nodes are available. If you need to use Medium or Fat nodes, contact us.
- If you want to install a job scheduler, which one to install, UGE or Slurm.
    - For how to use it, refer to [System Overview > Software](./software/software.md).
- If you would like to use NVIDIA Parabricks, contact us.


## Application for use by a group

If you would like to register many users, such as for using in a workshop or consortium, follow the steps below.

1. If the person in charge does not yet have an account for NIG supercomputer, create an account by following the steps above.
2. [Download the usage plan](../application/resource_extension.md) and submit it with all information. At that time, fill in the purpose of use and the amount of resources to be used.
