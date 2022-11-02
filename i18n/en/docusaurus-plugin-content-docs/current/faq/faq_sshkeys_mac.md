---
id: faq_sshkeys_mac
title: "FAQ (Registration of SSH public key(MacOS))"
---


## When I typed `ssh -V` and executed it, and the output is `-bash: ssh: command not found`.

OpenSSH client is not installed, so first execute the following command to install it.

````
sudo apt update
sudo apt upgrade
sudo apt install -y ssh openssh-client
```
Next, execute the following command.
```
ssh -V
````

When the version of the OpenSSH client software is displayed as follows after executing the command, the installation is completed.

! [](/img/ssh_keys/mac/ssh_mac_11.png)
