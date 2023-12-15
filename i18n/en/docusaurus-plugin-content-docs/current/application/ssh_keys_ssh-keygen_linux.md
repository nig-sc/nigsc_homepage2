---
id: ssh_keys_ssh-keygen_linux
title: How to generate SSH public and private keys (Linux)
---


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

