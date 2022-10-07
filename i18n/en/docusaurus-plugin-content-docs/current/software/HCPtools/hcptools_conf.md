---
id: hcptools_conf
title: How to write the configuration file
---


## Configuration file types

There is a configuration file for each of the HCP tools commands.

| #| command  |location of configuration files| feature                                          |
|--|----------|-------------------------------|--------------------------------------------------|
| 1| `hcp`    |~/.hcp/hcp.conf                | copy files on the server                         |
| 2| `hrm`    |~/.hcp/hrm.conf                | delete files on the server                       |
| 3| `hcp-ls` |~/.hcp/hcp-ls.conf             | list files on the server                         |
| 4| `hmkdir` |~/.hcp/hmkdir.conf             | create directories on the server                 |
| 5| `hpwd`   |~/.hcp/hpwd.conf               | retrieve the working directory on the server     |
| 6| `hmv`    |~/.hcp/hmv.conf                | move files on the server                         |
| 7| `hln`    |~/.hcp/hln.conf                | create file's links on the server                |
| 8| `hchmod` |~/.hcp/hchmod.conf             | change the file's permission on the server       |
| 9| `hchown` |~/.hcp/hchown.conf             | change the file's owner on the server            |
|10| `hsync`  |~/.hcp/hsync.conf              | synchronize files on the server                  |



There are many configuration files, so we recommend that you create a new configuration file named `~/.hcp/hcp-common.conf` to describe common settings and include (read) from each configuration file. Add the following line at the top line of each of the above 10 configuration files such as `~/.hcp/hcp.conf`. (The path must be written in absolute path.)


For Linux

```
Include /home/username/.hcp/hcp-common.conf
```

For Windows

```
Include C:\Users\username\_hcp\hcp-common.conf
```


## An example of the common configuration file (`~/.hcp/hcp-common.conf`)

Normally write the contents of `hcp-common.conf` as follows.

```
PrivateKeyFile /home/username/.ssh/id_rsa    # Specify the private key
AcceptableCryptMethod   PLAIN              　# Encryption: None
AcceptableDigestMethod  SHA256               # Digest format: SHA256
DisableDataIntegrityChecking yes             # Allow no digest format
```

(For Windows, you must specify `C:\Users\username\.ssh\id_rsa` for the pricate key.)

### Specify the private key

HCP tools authenticates users using the public/private keys.

In this case, you can use the public/private key files used for SSH login to the NIG supercomputer as the public/private keys.
If you use them, make sure that the private key file (`id_rsa`) addresses under the user directory in the client computer (`C:\Users\username\.ssh` for Windows). (When you follow [how to set up the public key for SSH](/application/ssh_keys_mac), the private key file should already be here.)


### Encryption

It is not necessary to encrypt by HCPtools because the personal genome analysis section is used SSL-VPN connection.
Therefore, normally there is no problem when you create the file with the following content and set it up as `~/.hcp/hcp-hcp-common.conf`.

### Digest format

This is the setting for check that datas are not corrupted or tampered in file transfers. Normally, enable this setting.
When you check the integrity of files, add the `-y` option.

Example

```bash
hcp --user username --hpfp -y  \
    gwa.ddbj.nig.ac.jp:/home/your_account-pg/some_directory/your_file.txt \
    C:\Users\username\your_file.txt
```


