---
id: ga_login
title: "How to Login (A general analysis section)"
---

[Register your SSH public key](/application/ssh_keys)  after your account registration.

##  How to log in to the general analysis section with your account

1. Open a terminal emulator. On its screen, enter ssh `username@gatewaynodename`. Then press enter. (The same is true for the Windows PowerShell SSH client.)

```
$ ssh youraccount@gw.ddbj.nig.ac.jp
```

2. In "Enter passphrase for key ...", enter the passphrase for the SSH key pair and press enter.

Enter "yes" to continue connecting after entering the key passphrase.

```
Are you sure you want to continue connecting (yes/no)?

```

3, Execute 'qlogin' command to log in to the login node.

```
$ qlogin
```

Enter "yes" to continue connecting after entering your password.

```
Are you sure you want to continue connecting (yes/no)?

```


### Execution example

You can see the following message means success on your display.

```
$ ssh youraccount@gw.ddbj.nig.ac.jp
Enter passphrase for key '/home/youraccount/.ssh/id_rsa': 
Last login: Sun Sep 26 15:03:33 2021 from XXX.XXX.XXX.XXX
---------------------------------------------------------------------
Thank you for using NIG supercomputer system.
This is the gateway node, do not run program here.
Please use 'qlogin' to login to a login node.
---------------------------------------------------------------------
$ qlogin
Your job 13867668 ("QLOGIN") has been submitted
waiting for interactive job to be scheduled ...
Your interactive job 13867668 has been successfully scheduled.
Establishing /home/geadmin/UGER/utilbin/lx-amd64/qlogin_wrapper session to host at138 ...
Last login: Sun Sep 26 15:29:09 2021 from gw1
$ 
```

If it does not work, refer to [FAQ](/faq/faq1).


## Notes on available memory

The default available memory for a login node is 4GB.
Specify the amount of memory at `qlogin` as follows to increase this.

```
qlogin -l s_vmem=10G -l mem_req=10G
```

### Reference

- [How to use Java](/software/java) > Notes: when the Java program launches, you get an error message saying out of memory.
- [How to use Singularity](/software/singularity) > Building Images on Supercomputer : Generating Singularity Image from Docker Container Image


## How to use the GPU node


For the purpose of developing programs using GPUs and testing their operation, we have a login node equipped with a GPU.
To use this login node, `qlogin` with the `-l gpu` option.

```
qlogin -l gpu
```


