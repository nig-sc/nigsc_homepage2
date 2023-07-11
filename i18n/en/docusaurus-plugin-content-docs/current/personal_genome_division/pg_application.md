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
Steps from user account application to start of use are <u>[the same step as the general analysis section](/general_analysis_division/ga_application/#steps-from-user-account-application-to-start-of-use)</u>.
The personal genome analysis section is <u>[a billing service](../application/resource_extension.md)</u>, so <u>[Download the usage plan](../application/resource_extension.md)</u>, fill it out and submit it.


<ol>
<li><a href="https://sc.ddbj.nig.ac.jp/en/application/registration"><u>Follow the usage application procedure</u></a> and apply from <a href="https://sc-account.ddbj.nig.ac.jp/en/application/registration">&#x1f517;<u>the usage application form</u></a>.</li>
    <ul>
    <li>Before you fill it in, ensure <a href="https://sc.ddbj.nig.ac.jp/en/application/"><u>"User Account Issuance Criteria"</u></a> and <a href="https://sc.ddbj.nig.ac.jp/en/application/use_policy"><u>"Acceptable Use Policy"</u></a>.</li>
    <li>You can use the e-mail address of your institution, not a free e-mail address. (except in special cases)</li>
    <li>In the registration form, there is a page to register the SSH public key, so create your SSH public key in advance. For details, see <a href="https://sc.ddbj.nig.ac.jp/en/application/ssh_keys"><u>SSH public key registration</u></a>.</li>
    <li>When applying to use the NIG supercomputer, you must designate a faculty member of a university or national/public research institution who is a resident of Japan under the Foreign Exchange and Foreign Trade Control Law as the responsible person. A UNIX group is created for each account of the responsible person.</li>
    </ul>
<li>To confirm your identity, the person in charge of the NIG supercomputer send email to <a href="https://sc.ddbj.nig.ac.jp/en/application/#the-responsible-person"><u>the responsible person</u></a>. Send back the Pledge(PDF) <a href="https://sc.ddbj.nig.ac.jp/en/application/signing_PDF"><u>with reference to the 'Steps to sign a PDF'</u></a>.
</li>
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
    <li>For how to login the general analysis section, refer to the pages after <a href="https://sc.ddbj.nig.ac.jp/en/personal_genome_division/pg_login/"><u>How to Login (The Personal Genome Analysis Section)</u></a>.</li>
    </ul>
<li>If you have a request to expand the resources or use billing services, <a href="https://sc.ddbj.nig.ac.jp/en/application/resource_extension"><u>download the Usage Plan Form</u></a>, fill it out and submit it.</li>
    <ul>
    <li><a href="https://sc.ddbj.nig.ac.jp/en/application/reference/"><u>Contact us</u></a> for Submission.</li>
    </ul>
</ol>

### Additional notes on preferences

When using the personal genome analysis section, indicate your preference regarding the following.

- Type and number of compute nodes you want to use.
     - For types of compute nodes, refer to [System Overview > Hardware](../guides/hardware.md).
    - Basically, only Thin compute nodes are available. If you need to use Medium or Fat nodes, contact us.
- If you want to install a job scheduler, which one to install, Grid Engine or Slurm.
    - For how to use it, refer to [System Overview > Software](../software/software.md).
- If you would like to use NVIDIA Parabricks, contact us.


## Application for use by a group

If you would like to register many users, such as for using in a workshop or consortium, follow the steps below.

1. If the person in charge does not yet have an account for NIG supercomputer, create an account by following the steps above.
2. [Download the usage plan](../application/resource_extension.md) and submit it with all information. At that time, fill in the purpose of use and the amount of resources to be used.
