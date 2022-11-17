---
id: faq_login
title: "FAQ(Login)"
---


## Public key authentication failed.

Public key authentication fails if write permission is granted to group, other in the home directory.
Also if any permission other than owner is granted to `~/.ssh` and `~/.ssh/authorised_keys`, public key authentication fails.
You need to check the permission of the following three directories and files.

You can change the permission using the `chmod` command.

```
（例）
chmod 750 ~/
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```


## What to do if you cannot log in to the NIG supercomputer via SSH

When you try to log in to the NIG supercomputer, the following message may appear and you may not be able to log in.

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

In this case, delete the relevant line in the `.ssh/known_hosts` file or the `.ssh/known_hosts` file itself.
Also use `ssh-keygen -R gw.ddbj.nig.ac.jp` to delete the relevant line.


## SSH connections frequently disconnected.


Add the following to `~/.ssh/config`.

```
Host *
    ServerAliveInterval 20
    TCPKeepAlive no
```

For more information, click the link below.

&#x1f517;<u>https://unix.stackexchange.com/questions/602518/ssh-connection-client-loop-send-disconnect-broken-pipe-or-connection-reset</u>



## VPN connection to the personal genome analysis section cannot be established.

If you got the error `Credential or ssl vpn configuration is wrong (-7200)` when accessing the personal genome analysis section with FortiClient on Windows 10 or 11,

Control Panel => Internet Options => Security tab => Trusted Sites

Register the SSL-VPN address here.

![](faq_pg-vpn.png)



## When entering your username and password for FortiClient for an SSL-VPN connection to the personal genome analysis section, the one-time password is not sent to the email address associated with your VPN account.

- Google has tightened the security since 1 March this year, therefore there have been incidents that the email with one-time password from the NIG supercomputer VPN is not sent to gmail.
- We recommend that you register your institution's email address instead of a free email to sent the e-mail to the wrong person.


## I have reconfigured my ssh public key again, but I get a error message `Permission denied` and cannot connect.

As of 7 July 2022, we move the data to a new application system for use ("[<u>July 5, 2022(Monday) Application system for new use is new</u>](/en/blog/2022-07-05-news_NewApp)").
Therefore, public key registrations to the new gateway `gw2.ddbj.nig.ac.jp` will be reflected immediately, but it will take about one day for the settings to be reflected to the old gateway `gw.ddbj.nig.ac.jp`.
At the next scheduled maintenance (December), the system will be modified so that the settings will be reflected immediately on the old gateway.

Please login from `gw2.ddbj.nig.ac.jp` immediately after setting your public key etc.
