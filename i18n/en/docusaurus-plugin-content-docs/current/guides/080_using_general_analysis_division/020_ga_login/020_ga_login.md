---
id: ga_login
title: "How to Login (The general analysis division)"
---


## Introduction

SSH connection is used for logging in to the general analysis division of the NIG supercomputer. 

![](GA_division.png)


## Preparation of user's computer

The general analysis division of NIG supercomputer can be used with a computer running a SSH client and a web browser. We recommend a Windows, Mac, or Linux computer with 16GB or more main memory.

- Mac and Linux computers can be accessed using a standard terminal emulator.
- Windows computers can be accessed using PowerShell SSH client or Windows Subsystem for Linux version 2 (WSL2), etc.


## Gateway Node {#two-gateways}

There are two gateway nodes for the general analysis division of the NIG supercomputer.

- `gw.ddbj.nig.ac.jp`
- `gw2.ddbj.nig.ac.jp`


## Preparing to Log In

The NIG supercomputer system uses public key authentication for SSH logins.


### Generating a Public/Private Key Pair

Before logging in, you need to generate a public/private key pair on your own computer.

Please execute the following command from a terminal emulator on your local machine:

```
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_nigsc-gw -C "nigsc-gw:you:2025-01-15"
```

- You will be prompted to enter a passphrase. This protects your private key if it is ever compromised.
- Replace you with your actual account name.
- The `-C` option is for adding a comment.
- This command will generate a private and a public key under the `~/.ssh/` directory.

For more detailed instructions on generating SSH public keys, refer to the following page:
- [How to generate SSH public key](/application/ssh_keys)

### Setting Up Your SSH Public Key

To access the NIG Supercomputer, you need to install your public key (generated on your local machine) on the system. Only the public key should be installed; do not send or upload your private key.


:::caution
Normally, the public key would be registered through our account application system (Web UI).
However, due to ongoing security enhancements, the system is currently being rebuilt.

Please contact our support desk and send your public key directly to the system administrator.
:::


:::info
Once your public key has been installed, you can add or replace keys using the following command.

Assuming the currently registered public key is named `~/.ssh/id_ed25519.pub` and the new one you would like to add as `~/.ssh/id_ed25519_nigsc-gw.pub`, execute the following command in your terminal:
:::


```bash
ssh-copy-id -f -i ~/.ssh/id_ed25519_nigsc-gw.pub -o IdentityFile=~/.ssh/id_ed25519 you@gw.ddbj.nig.ac.jp
```


Details of the command are as follows:

- `ssh-copy-id` copies the specified public key (`id_ed25519_nigsc-gw.pub`) to the ~/.ssh/authorized_keys file on the remote host (`gw.ddbj.nig.ac.jp`) for the user (`you`).
- `-f` forces the addition of the key even if similar keys are already registered.
- `-i` specifies the public key file to be added.
- `-o IdentityFile=~/.ssh/id_ed25519` ensures that the connection to the remote host is made using the specified ED25519 private key, not the RSA key.
:::

For a detailed guide on how to install your SSH public key, please refer to the URL below:

- [How to Upload an SSH Public Key](/application/ssh_copy_id)


##  How to log in to the general analysis division with your account {#login-nig-supercom}

1. Open a terminal emulator and enter `ssh username@gatewaynodename`. Then press enter. (The same way for the Windows PowerShell SSH client.)

```
$ ssh you@gw.ddbj.nig.ac.jp
```

or

```
$ ssh you@gw2.ddbj.nig.ac.jp
```

To explicitly specify the location of your private key, use the `-i` option followed by the path to the key.

```
ssh -i ~/yourpath/id_rsa you@gw.ddbj.nig.ac.jp
```

2. Enter the passphrase for the SSH key pair(SSH public key and SSH secret key) and press enter in "Enter passphrase for key ...".

Enter "yes" to continue connecting ig the following message is displayed after entering the key passphrase.

```
Are you sure you want to continue connecting (yes/no)?
```

3.  Execute `qlogin` command to log in to the interactive node.

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
$ ssh you@gw.ddbj.nig.ac.jp
Enter passphrase for key '/home/you/.ssh/id_ed25519':
Welcome to Ubuntu 24.04.1 LTS (GNU/Linux 6.8.0-51-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

 System information as of Mon Apr 14 12:01:35 JST 2025

  System load:  1.05               Processes:                     1437
  Usage of /:   7.6% of 878.15GB   Users logged in:               50
  Memory usage: 81%                IPv4 address for enp65s0f1np1: █████████████
  Swap usage:   16%                IPv4 address for enp65s0f1np1: █████████████
  Temperature:  73.0 C             IPv4 address for enp65s0f1np1: █████████████

 * Strictly confined Kubernetes makes edge and IoT secure. Learn how MicroK8s
   just raised the bar for easy, resilient and secure K8s cluster deployment.

   https://ubuntu.com/engage/secure-kubernetes-at-the-edge

Expanded Security Maintenance for Applications is not enabled.

4 updates can be applied immediately.
To see these additional updates run: apt list --upgradable

33 additional security updates can be applied with ESM Apps.
Learn more about enabling ESM Apps service at https://ubuntu.com/esm

The list of available updates is more than a week old.
To check for new updates run: sudo apt update

Last login: Fri Apr 11 10:20:50 2025 from ████████████
$

```

If it does not work, refer to [FAQ](/guides/FAQ/faq_general_analysis_division/faq_login_general).


## Notes on available memory

The default available memory for a interactive node is 4GB.
Specify the amount of memory at `qlogin` as follows to increase this.

```
qlogin -l s_vmem=10G -l mem_req=10G
```

### Reference

- [How to use Java](/guides/software/DevelopmentEnvironment/java) : Notes - when the Java program launches, you get an error message saying out of memory.
- [How to use Singularity](/guides/software/Container/Apptainer) : [Building Images on Supercomputer - Generating Singularity Image from Docker Container Image](/guides/software/Container/Apptainer/#build-apptainer-image-from-docker)


## How to use the GPU node


For the purpose of developing programs using GPUs and testing their operation, we have a interactive node equipped with a GPU.
To use this interactive node, `qlogin` with the `-l gpu` option.

```
qlogin -l gpu
```





:::note
To enhance security, we use public key authentication for login.
Please register your public key before using the system.

The specific steps for registering your SSH public key are provided at the URL below:

- [How to create an SSH public key](/application/ssh_keys))
- [How to install an SSH public key](/application/ssh_copy_id))
:::


