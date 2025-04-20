---
id: ssh_keys
title: How to generate SSH public key
---

The NIG supercomputer uses SSH login with public key cryptography.

Currently, ED25519 is generally recommended for use with public key cryptography.

To generate your public and private keys, follow the steps below.

When you create them, use a terminal emulator for Mac or Linux (PowerShell for Windows).

## 1. Checking if the necessary commands are installed {#check-commands-installation}

Run the following commands to check whether the necessary commands are installed.

Execute each of the following commands:

```
ssh -V
ssh-keygen -V
```

If each command displays version information or usage instructions, the commands are correctly installed.


## 2. Generating SSH Public and Private Keys {#generate-ssh-keys}

To generate SSH public and private keys, use the `ssh-keygen` command.

Execute the command as shown below. (Replace `youraccount` with your account name, and use the date of key generation for the date (e.g., 2025-01-15)).

### For the General Ayalysis Division {#generate-ssh-keys-ga}

```
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_nigsc-gw -C "nigsc-gw:youraccount:2025-01-15"
```

### For the Personal Genome Division {#generate-ssh-keys-pg}

```
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_nigsc-gwa -C "nigsc-gwa:youraccount:2025-01-15"
```


When you use the above command, the following will be displayed, and the SSH public and private keys will be generated.

```
$ ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_nigsc-gw -C "nigsc-gw:youraccount:2025-01-15"   (1)
Generating public/private ed25519 key pair.
Enter passphrase (empty for no passphrase):                                                  (2)
Enter same passphrase again:                                                                 (3)
Your identification has been saved in /home/youraccount/.ssh/id_ed25519_nigsc-gw
Your public key has been saved in /home/youraccount/.ssh/id_ed25519_nigsc-gw.pub    
The key fingerprint is:
SHA256:3Lwg2PC8TFJBLT3xbfvE+sSE1NLXnDew+MesJhVp54c nigsc-gw:youraccount:2025-01-15   
The key's randomart image is:
+--[ED25519 256]--+
|     .oo..   .   |
|      ..+. ..o+.o|
|    . .. ...==o+=|
|     B . o oo=*oo|
|    o * S o ooE=.|
|     + o . ..*o .|
|      o   ...o+  |
|            oo   |
|              .  |
+----[SHA256]-----+
```

(1) Generate an ED25519 key.
(2) Enter a passphrase.
(3) Re-enter the passphrase.

SSH treats possession of the private key file as evidence of identity.
If the private key file is stolen, identity theft is possible.
It is possible to omit the passphrase setting, but it is strongly recommended to set it to reduce damage when the private key is stolen.


## 3. Checking if the Keys Have Been Generated {#check-ssh-key-generated}

The public and private key files will be created in the `~/.ssh` directory.

When you follow the steps above, the following files will be created:

### For the General Analysis Division {#check-ssh-key-generated-ga}

```
~/.ssh/id_ed25519_nigsc-gw.pub  # Public key file
~/.ssh/id_ed25519_nigsc-gw      # Private key file
```

### For the Personal Genome Division {#check-ssh-key-generated-pg}

```
~/.ssh/id_ed25519_nigsc-gwa.pub  # Public key file
~/.ssh/id_ed25519_nigsc-gwa      # Private key file
```

