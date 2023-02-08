---
id: ssh_keys
title: Registering or changing SSH public keys
---


&#x26A0;If you have already completed an application for use but without registering your SSH public key, refer to [<u>FAQ : Application/Billing > FAQ(Application for New Use)</u>](/faq/faq_NewUser_registration#when-applying-for-new-use-i-applied-for-use-without-entering-my-ssh-public-key-in-the-usage-registration-application-form-i-have-already-completed-the-application-for-use-but-without-registering-my-ssh-public-key-what-should-i-do).



## Generating public and private key

Create the SSH public and private key required for secure user authentication on the user's computer.
To create them, use a terminal emulator for Mac or Linux (PowerShell for Windows).

make sure OpenSSH is installed on the user's computer before starting the process. For information on how to install OpenSSH on Windows PowerShell, read, for example, [Microsoft's corresponding page](https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse).

To generate SSH public and private keys, use the `ssh-keygen` command.



```
$ cd ~/.ssh
$ ssh-keygen -t rsa -b 3072                                                      (1)
Generating public/private rsa key pair.
Enter file in which to save the key (/home/temp/.ssh/id_rsa):                    (2)
Enter passphrase (empty for no passphrase):                                      (3)
Enter same passphrase again:                                                     (4)
Your identification has been saved in /home/temp/.ssh/id_rsa.
Your public key has been saved in /home/temp/.ssh/id_rsa.pub.
The key fingerprint is:
e5:23:f0:fc:b7:60:70:80:79:91:f2:f1:6d:a8:ae:90 temp@host
```

- (1) Generate a 3072-bit key with RSA version 2.
- (2) Saving Public and private key: Specify the path here only if you want to change it. If not, press the Enter key.
- (3) Enter the passphrase.
- (4) Re-enter the passphrase.

SSH treats possession of the private key file as evidence of identity.
If the private key file is stolen, identity theft is possible.
It is possible to omit the passphrase setting, but it is strongly recommended to set it to reduce damage when the private key is stolen.


## Installation of public key on the NIG supercomputer gateway

```
$ ls ~/.ssh
id_rsa  id_rsa.pub
$ cat ~/.ssh/id_rsa.pub
ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAznOdmkDHzjDpsNIhkl2VNjUXBlC3QePKDAzmu3FDCMgBYUDyiXAXLf85q25cylVq66gLUP63nlFJz4/SLO13w2Qf3Gyyj7ADJJZR3sD+Sf8vdlt2hShAT0kkKBmToBqv2Pqx2SfzRVedlyCE4YFieUVmZUkz95dxwSUklGXmQSvigkqCG86r0NlxCSMjYitDGWAyGMu37cvBYzH0+C2uthtbqTd1VYHfjtvewySSZsvbVVnjLme0Ah2cAyifVaSN4uslDBqkN62b3vaijoXPy9ieUzSP0/dgBhKN/m7yhnM/1s+foJnRI3wfDdqXPw3yOqPC/9EXrjnmdpEmpgMJTw== temp@host
$ 
```

When you check the save location of the key pair, you will find two files, `id_rsa` and `id_rsa.pub`, are created.
`id_rsa.pub` is the public key, so you can register the public key by copying all character strings from "ssh-rsa" of the file and pasting it into the "SSH Key" below(red frame).

&#x26A0; If you already have your account, register your public key in [<u>the Change of application details on the Application for use/change page</u>](/application/registration/#change-of-application-details).

![](reg_ssh_EN.png)
 

## Confirmation of connection to the NIG supercomputer gateway

- To log in to the General Analysis Section, refer to [<u>"General Analysis Section > How to Login (The general analysis section)"</u>](/general_analysis_division/ga_login).
- To login to the Personal Genome Analysis Section, refer to [<u>"Personal Genome Analysis Section > How to Login（The Personal Genome Analysis Section）</u>](/personal_genome_division/pg_login).

If you have trouble connecting, refer to [FAQ](/faq/faq_login).

