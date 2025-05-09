---
id: ssh_copy_id
title: How to Upload an SSH Public Key
---

The NIG supercomputer uses SSH login with public key cryptography.

Please upload your public key to the NIG supercomputer following the steps below.

To upload the public key, you will use a terminal emulator on your computer (Terminal on Mac, PowerShell on Windows, etc.).

## 1. Checking if the necessary commands are installed {#check-command-installed}

Execute the following command to check if the necessary commands are installed:

```
ssh-copy-id -h
```

If the usage information is displayed, the command is installed.

:::note

If the command is not installed:

On Mac, you can install `ssh-copy-id` command using Homebrew or MacPorts

```
brew install ssh-copy-id
```

On Windows, installing git for windows will install `ssh-copy-id` command.

1. Download and run the installer from the official Git for Windows page: https://gitforwindows.org/
2. When installation is complete, launch Git Bash from the "Start" menu. This will open a Git Bash terminal.
3. Run `ssh-copy-id -h` in the Git Bash terminal to check if the command is installed.

Once Git Bash is installed, you can execute `ssh`, `ssh-keygen`, and `ssh-copy-id` from there.
(From PowerShell, only ssh and ssh-keygen can be execute.)

:::


## 2. Updating the SSH Public Key on the NIG Supercomputer {#set-ssh-pub-key}

You can use the `ssh-copy-id` command to add your new SSH public key to the NIG supercomputer.

To use the `ssh-copy-id` command, pass the new key using the `-i` option and the existing key using the `-o IdentityFile=` option to add your SSH public key to the NIG supercomputer.

:::note

If the SSH public key has not been installed on the NIG supercomputer beforehand, this command cannot be used.

:::

### For the General Analysis Division {#set-ssh-pub-key-ga}

```
ssh-copy-id -f -i ~/.ssh/id_ed25519_nigsc-gw.pub -o IdentityFile=~/.ssh/id_rsa youraccount@gw.ddbj.nig.ac.jp
```

### For the Personal Genome Analysis Divison {#set-ssh-pub-key-pg}

```
ssh-copy-id -f -i ~/.ssh/id_ed25519_nigsc-gwa.pub -o IdentityFile=~/.ssh/id_rsa youraccount-pg@gwa.ddbj.nig.ac.jp
```


## 3. Checking SSH Login is Possible {#check-ssh-login}

To check if SSH login is working, execute the following command:

```
ssh -i ~/.ssh/id_ed25519_nigsc-gw youraccount@gw.ddbj.nig.ac.jp
```

If you are unable to connect, refer to FAQ:
- [The General Analysis Division FAQ](/guides/FAQ/faq_general_analysis_division/faq_login_general/)
- [The Personal Genome Analysis Area FAQ](/guides/FAQ/faq_personal_genome/faq_forticlient/faq_forticlient)


## 4. Configuring with the `~/.ssh/` config File {#conf-ssh-config}

By creating a `~/.ssh/config` file, you can avoid specifying the `-i` option each time you connect.

Please add the following configuration.

### Configuration for the General Analysis Division {#conf-ssh-config-ga}

```
Host gw
    HostName gw.ddbj.nig.ac.jp
    User youraccount
    IdentityFile ~/.ssh/id_ed25519_nigsc-gw

Host gw2
    HostName gw2.ddbj.nig.ac.jp
    User youraccount
    IdentityFile ~/.ssh/id_ed25519_nigsc-gw
```

### Configuration for the Personal Genome Analysis Divison {#conf-ssh-config-pg}

```
Host gwa
    HostName gwa.ddbj.nig.ac.jp
    User youraccount-pg
    IdentityFile ~/.ssh/id_ed25519_nigsc-gwa

Host gwa2
    HostName gwa2.ddbj.nig.ac.jp
    User youraccount-pg
    IdentityFile ~/.ssh/id_ed25519_nigsc-gwa
```

## Verifying

With the above configuration, you will be able to SSH login using the following commands.

### For the General Analysis Division {#verification-ga}

```
ssh youraccount@gw.ddbj.nig.ac.jp
ssh youraccount@gw2.ddbj.nig.ac.jp
```

### For the Personal Genome Analysis Division {#verification-pg}

```
ssh youraccount-pg@gwa.ddbj.nig.ac.jp
ssh youraccount-pg@gwa2.ddbj.nig.ac.jp
````
