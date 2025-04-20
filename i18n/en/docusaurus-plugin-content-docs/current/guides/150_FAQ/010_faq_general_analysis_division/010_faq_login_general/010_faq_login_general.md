--- 
id: faq_login_general
title: "Logging in"
---


## &#x1F180; Public key authentication failed. {#error-pubkey-auth}

&#x1F150; Public key authentication fails if write permission is granted to group, other in the home directory.
Also if any permission other than owner is granted to `~/.ssh` and `~/.ssh/authorised_keys`, public key authentication fails.
You need to check the permission of the following three directories and files.

You can change the permission using the `chmod` command.

```
（例）
chmod 750 ~/
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
chmod 600 ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa.pub
```


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


## &#x1F180; How do I log in to the NIG supercomputer using Putty or TeraTerm? {#putty-teraterm-login}

&#x1F150; The NIG supercomputer website describes the procedure for using PowerShell, which comes standard with Windows, as a terminal emulator. 

- [Registering or changing SSH public keys](/application/ssh_keys)
<!-- - [Registering or changing SSH public keys (Windows)](/application/ssh_keys_windows) -->

If you want to use a third-party terminal emulator (Putty, TeraTerm, etc.), refer to the manual of each software after referring to the instructions for using PowerShell.

- Putty : 
[&#x1f517;PuTTY: a free SSH and Telnet client (greenend.org.uk)](https://www.chiark.greenend.org.uk/~sgtatham/putty/)


- TeraTerm : 
[&#x1f517;Tera Term Open Source Project (osdn.jp)](https://ttssh2.osdn.jp/index.html.en)
