---
id: ga_login
title: "How to Login (The general analysis division)"
---


## Introduction

SSH connection is used for logging in to the general analysis division of the NIG supercomputer. 

![](pg_login_1.png)


## Gateway Node

There are two gateway nodes for the general analysis division of the NIG supercomputer.

- `gw.ddbj.nig.ac.jp`
- `gw2.ddbj.nig.ac.jp`



##  How to log in to the general analysis division with your account

1. Open a terminal emulator and enter `ssh username@gatewaynodename`. Then press enter. (The same way for the Windows PowerShell SSH client.)

```
$ ssh youraccount@gw.ddbj.nig.ac.jp
```

or

```
$ ssh youraccount@gw2.ddbj.nig.ac.jp
```

If your private key is stored in a location other than `~/.ssh/id_rsa`, specify the private key path as shown below.

```
ssh -i ~/yourpath/id_rsa youraccount@gw.ddbj.nig.ac.jp
```

2. Enter the passphrase for the SSH key pair(SSH public key and SSH secret key) and press enter in "Enter passphrase for key ...".

Enter "yes" to continue connecting ig the following message is displayed after entering the key passphrase.

```
Are you sure you want to continue connecting (yes/no)?
```

3.  Execute `qlogin` command to log in to the login node.

```
$ qlogin
```

Enter "yes" to continue connecting if the following message is displayed after entering your password.

```
Are you sure you want to continue connecting (yes/no)?
```


### Execution example

You will see the following message means success on your display.

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

If it does not work, refer to [FAQ](/faq/faq_login_general).


## Notes on available memory

The default available memory for a login node is 4GB.
Specify the amount of memory at `qlogin` as follows to increase this.

```
qlogin -l s_vmem=10G -l mem_req=10G
```

### Reference

- [How to use Java](/software/java) : Notes - when the Java program launches, you get an error message saying out of memory.
- [How to use Singularity](/software/Apptainer/) : [Building Images on Supercomputer - Generating Singularity Image from Docker Container Image](/software/Apptainer/#Building images on the supercomputer : Generating Apptainer (Sigularity) images from Docker container images)


## How to use the GPU node


For the purpose of developing programs using GPUs and testing their operation, we have a login node equipped with a GPU.
To use this login node, `qlogin` with the `-l gpu` option.

```
qlogin -l gpu
```

### References

- [Java > Notes: When I start the Java program, I get an error saying that there is not enough memory.](/software/java/#when-i-start-the-java-program-i-get-an-error-saying-that-there-is-not-enough-memory)
- [Apptainer (Singularity) > Building images on the supercomputer : Generating Apptainer (Sigularity) images from Docker container images](/software/Apptainer/#building-images-on-the-supercomputer--generating-apptainer-sigularity-images-from-docker-container-images)

