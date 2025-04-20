---
id: faq_ssh
title: "FAQ: SSH"
---

## &#x1F180; The following materials describe the necessary knowledge. Please refer to the links below.

&#x1F150; 1. Materials related to the content described in the introductory documents on operating methods provided by the Linux Documentation Project (LDP):

- [“Bash Guide for Beginners” by Machtelt Garrels](https://tldp.org/LDP/Bash-Beginners-Guide/html/index.html?utm_source=chatgpt.com)  
    - This guide thoroughly explains the basics of the Bash shell and script creation, making it a valuable resource for beginners.
- [“Introduction to Linux - A Hands on Guide” by Machtelt Garrels](https://tldp.org/guides.html?utm_source=chatgpt.com)  
    - A hands-on guide designed to help you learn the basic operations of Linux in a practical way.

Both of these resources are freely available for viewing and downloading from the official LDP site.

2. Learn Linux operations for beginners:

These materials are available for free.

- [Linux Standard Textbook](https://linuc.org/textbooks/linux/)  
    - A free learning resource provided by LPI-Japan, covering everything from basic Linux operations to system administration.
- [Introduction to Linux (LFS101-JP)](https://training.linuxfoundation.org/ja/training/introduction-to-linux-lfs101-jp/)  
    - A free online course provided by the Linux Foundation where you can learn the basic operations of major Linux distributions and command-line usage.

## &#x1F180; Causes and Solutions for the SSH "Permission denied (publickey)" Error {#error-pubkey-auth}

&#x1F150; When connecting via SSH, the error `Permission denied (publickey)` can occur for several reasons. Go through the following checklist step by step to resolve the issue.

### 1. Check File and Directory Permissions

The most common cause of this error is **incorrect file or directory permissions**. Use the tables below to ensure your permissions are properly set.


#### On the **Client Side** (where you run the SSH command)

| Path                                | Purpose                             | Recommended Permission     | Notes                                            |
|-------------------------------------|--------------------------------------|----------------------------|--------------------------------------------------|
| `/home/USERNAME/`                   | Home directory                       | `755` or `700`             | Ensure no write access for other users          |
| `/home/USERNAME/.ssh/`              | SSH keys and config directory        | `700` (`drwx------`)       | Only accessible by the owner                    |
| `/home/USERNAME/.ssh/id_rsa`        | Private key                          | `600` (`-rw-------`)       | Only the owner can read/write                   |
| `/home/USERNAME/.ssh/id_rsa.pub`    | Public key                           | `644` (`-rw-r--r--`)       | Safe to share with others                       |
| `/home/USERNAME/.ssh/known_hosts`   | Record of previously connected hosts | `644` or `600`             | `600` is recommended, but `644` is also fine    |

---

#### On the **Server Side** (the machine you are connecting to)

| Path                                | Purpose                                | Recommended Permission     | Notes                                             |
|-------------------------------------|-----------------------------------------|----------------------------|---------------------------------------------------|
| `/home/USERNAME/`                   | Home directory                          | `755` or `700`             | Must not be writable by others (`777` is bad)    |
| `/home/USERNAME/.ssh/`              | Stores authorized/public keys           | `700` (`drwx------`)       | No one else should have access                   |
| `/home/USERNAME/.ssh/authorized_keys` | Contains allowed public keys            | `600` (`-rw-------`)       | Strictly checked by `sshd`                       |
| `/home/USERNAME/.ssh/known_hosts`   | (Optional) Records connected hosts      | `600` or `644`             | Not always needed—if present, should be secure   |

It is mandatory that **the owner of all files and directories is the user attempting to connect**.

- "Client" means the user's local computer.
- "Server" means the RIKEN supercomputer.
- "USERNAME" means the user's account name.
- SSH logs can be checked in `/var/log/auth.log` or by using `journalctl -u ssh`.

The relationship between the client and server is shown in the diagram below.

![](ssh_permission_1.png)


### 2. Key Pair Mismatch

Make sure the private key on the client (`id_rsa`, etc.) matches the public key listed in the server's `authorized_keys`. SSH authentication will fail if the key pair doesn't match.

### 3. Check the Username

Verify that you're using the correct username (`USERNAME`) when attempting to connect via SSH.



## &#x1F180; When I log in to SSH, I get the error "WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!" {#error-ssh-login}

&#x1F150; When you try to log in to the NIG supercomputer, the following message may appear and you may not be able to log in.

```
$ ssh gw.ddbj.nig.ac.jp
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@       WARNING: POSSIBLE DNS SPOOFING DETECTED!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
The RSA host key for gw.ddbj.nig.ac.jp has changed,
and the key for the corresponding IP address 133.39.228.101
is unknown. This could either mean that
DNS SPOOFING is happening or the IP address for the host
and its host key have changed at the same time.
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the RSA key sent by the remote host is
SHA256:xkyH37QZowWjidMSCIbOZa7Vw1p46Dxt4nF9nFJG+hk.
Please contact your system administrator.
Add correct host key in /home/username/.ssh/known_hosts to get rid of this message.
Offending RSA key in /home/username/.ssh/known_hosts:X
RSA host key for gw.ddbj.nig.ac.jp has changed and you have requested strict checking.
Host key verification failed.
```

There are two gateway nodes of the NIG supercomputer: `gw.ddbj.nig.ac.jp` and `gw2.ddbj.nig.ac.jp`. By executing `ssh-keygen -R gw.ddbj.nig.ac.jp` , `ssh-keygen -R gw2.ddbj.nig.ac.jp` respectively, this error will disappear. **<font color="red">Execute it on the user's computer</font>, not on the NIG supercomputer.**

When you execute it, the error will disappear, but you will be asked `Are you sure you want to continue connecting (yes/no)? `. Select `yes'.<br/>

This confirmation message is displayed the first time when connecting from a user's computer to the NIG supercomputer server, to make sure that the connection is to a legitimate server and not to a spoofed fake server. 

It will be asked only once the first time and will not be displayed again the next time.


## &#x1F180; SSH connections frequently disconnected. {#disconnect-ssh}

&#x1F150; Add the following to `~/.ssh/config`.

```
Host *
    ServerAliveInterval 20
    TCPKeepAlive no
```

For more information, click the link below.

&#x1f517;https://unix.stackexchange.com/questions/602518/ssh-connection-client-loop-send-disconnect-broken-pipe-or-connection-reset


## &#x1F180; I can login from Windows PowerShell, but not from Ubuntu Linux on WSL2 (Windows Subsystem for Linux)? {#wls2-login}

&#x1F150; Yes, you can login.

Current Windows runs on a virtual machine from the beginning to use WSL2, and Ubuntu on WSL2
Linux runs as another virtual machine. (For example, see this link &#x1f517; https://www.thomasmaurer.ch/2019/06/install-wsl-2-on-windows-10/)

In other words, it operates with two completely independent virtual machines in one physical computer.
The disk space is also independent, and these two virtual computers operate in a networked state on a single physical computer.

Although they look similar, PowerShell runs on a virtual machine running the Windows OS, but the screen with the Ubuntu prompt is running on a virtual machine with the Ubuntu Linux OS.

Therefore, you need to copy the private key created in PowerShell to Ubuntu Linux.

For example:
```
you@wsl2:~$ cp /mnt/c/Users/you/.ssh/id_rsa .ssh
you@wsl2:~$ ssh your_account@gw2.ddbj.nig.ac.jp
Enter passphrase for key '/home/you/.ssh/id_rsa':
Last login: Thu Dec  1 15:33:59 2022 from XXX.XXX.XXX.XXX
---------------------------------------------------------------------
Thank you for using NIG supercomputer system.
This is the gateway node, do not run program here.
Please use 'qlogin' to login to a interactive node.
---------------------------------------------------------------------
your_account@gw4:~ (2022-12-01 15:34:50)
$
```
