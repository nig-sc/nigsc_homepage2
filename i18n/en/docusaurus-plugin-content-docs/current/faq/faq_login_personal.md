---
id: faq_login_personal
title: How to Login
---

## &#x1F180; Public key authentication failed.

&#x1F150; Public key authentication fails if write permission is granted to group, other in the home directory.
Also if any permission other than owner is granted to `~/.ssh` and `~/.ssh/authorised_keys`, public key authentication fails.
You need to check the permission of the following three directories and files.

You can change the permission using the `chmod` command.

```
（例）
chmod 750 ~/
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
chmod 600 ~/.ssh/id_rsa.pub
```


## &#x1F180; What to do if you cannot log in to the NIG supercomputer via SSH

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


## &#x1F180; SSH connections frequently disconnected.


&#x1F150; Add the following to `~/.ssh/config`.

```
Host *
    ServerAliveInterval 20
    TCPKeepAlive no
```

For more information, click the link below.

&#x1f517;<u>https://unix.stackexchange.com/questions/602518/ssh-connection-client-loop-send-disconnect-broken-pipe-or-connection-reset</u>


## &#x1F180; I don't know how to download the SSL-VPN client software FortiClient. {#how-to-DL-VPN}

&#x1F150; 

Click on the URL below to access the official ForiClient website page, then download the FortiClient VPN client software for Windows or Mac from 'FortiClient VPN' at the bottom of the displayed page. Click on ① and ② in the diagram below to download the software.

- FortiClient official website:[https://www.fortinet.com/support/product-downloads](https://www.fortinet.com/support/product-downloads)


＜Windows＞
![figure](VPNwin_2_701_2.png)

＜Mac＞
![figure](VPN_MAC_install_1_701_2.png)



## &#x1F180; VPN connection to the personal genome analysis division cannot be established.

&#x1F150; If you got the error `Credential or ssl vpn configuration is wrong (-7200)` when accessing the personal genome analysis division with FortiClient on Windows 10 or 11,

Control Panel => Internet Options => Security tab => Trusted Sites

Register the SSL-VPN address here.

![](faq_pg-vpn.png)


## &#x1F180; When logging in to FortiClient, the "Security Warning" dialogue box does not appear and does not proceed beyond about 40% status.{#dialogbox_disappear}

![](faq_login_personal_1.png)

&#x1F150; If the connection does not proceed beyond about 40% and does not connect,

1. first, check that the dialogue box is not behind another screen or window. 
2. second, if this does not solve the problem, see [<u>'Installing FortiClient VPN Client software'</u>](/personal_genome_division/pg_login/#1-installing-forticlient-vpn-client-software) and reinstall the latest FortiClient.



## &#x1F180; When entering your username and password for FortiClient for an SSL-VPN connection to the personal genome analysis division, the one-time password is not sent to the email address associated with your VPN account.

&#x1F150; 
- Google has tightened the security since 1 March 2022, therefore there have been incidents that the email with one-time password from the NIG supercomputer VPN is not sent to gmail.
- We recommend that you register your institution's email address instead of a free email to sent the e-mail to the wrong person.



## &#x1F180; I can login from Windows PowerShell, but not from Ubuntu Linux on WSL2 (Windows Subsystem for Linux)?


&#x1F150; Yes, you can login.

Current Windows runs on a virtual machine from the beginning to use WSL2, and Ubuntu on WSL2
Linux runs as another virtual machine. (For example, see this link &#x1f517;<u>
https://www.thomasmaurer.ch/2019/06/install-wsl-2-on-windows-10/</u>)

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
Please use 'qlogin' to login to a login node.
---------------------------------------------------------------------
your_account@gw4:~ (2022-12-01 15:34:50)
$
```
