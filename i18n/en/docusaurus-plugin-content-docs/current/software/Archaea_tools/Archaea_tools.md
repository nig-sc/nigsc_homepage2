---
id: Archaea_tools
title: How to use Archaea tools(formerly HCPtools)
---

When you transfer files to and from the NIG supercomputer, you can use `scp` or `sftp`, which are widely used as the file transfer software. But their transfer speed is slow when a large numbers of files are transfered over long distances.

For high-speed file transfer over long distances, the file transfer software Aspera is available on the general analysis division, and Archaea tools(formerly HCPtools) is available on the personal genome analysis division on the NIG supercomputer.


Reference

- For official manuals for each product, [&#x1f517;<u>see the official Bytix page 'Documents'</u>](https://support.bytix.tech/document/).
- For the latest version, [&#x1f517;<u>refer to the Bytix official page 'Download "latest version"'</u>](https://support.bytix.tech/latest/).
- [<u>FAQ (HCP tools)</u>](/faq/faq_hcptools)


## Renaming of software

In October 2022, the HCPtools software provider launched the brand name 'Bytix' as a brand name for data transfer systems and the product name was changed from 'HCPtools' to 'Archaea tools'.

After the product name change, you can still use the same commands that you have been using for HCPtools.

For more information on the change, [&#x1f517;<u>refer to the Bytix official page 'Product name change etc.'</u>](https://support.bytix.tech/important/)

## Installing the client software

For using Archaea tools(formerly HCPtools), all user must install that client software on user's client computer.
Refer to the following documents depending on the environment of your client computer.

- Linux (including for Windows WSL2 environments)
    - [&#x1f517;<u>Ubuntu Linux</u>](https://support.bytix.tech/docs/archaea/tools/1.4_en/B_setup_client/B04_Ubuntu)
    - [&#x1f517;<u>CentOS 7</u>](https://support.bytix.tech/docs/archaea/tools/1.4_en/B_setup_client/B03_RHEL)
- [&#x1f517;<u>Mac OS</u>](https://support.bytix.tech/docs/archaea/tools/1.4_en/B_setup_client/B02_macOS/)
- [&#x1f517;<u>Windows</u>](https://support.bytix.tech/docs/archaea/tools/1.4_en/B_setup_client/B01_Windows)


## How to setup the configuration file

To transfer data between the NIG supercomputer, a configuration file for Archaea tools (formerly HCPtools) must be setup in your home directory. So download the configuration file for the NIG supercomputer from github with the `git clone` command.

Linux (including for Windows WSL2 environments)
```
cd $HOME
git clone https://github.com/nig-sc/Bytix_Archaea/ .hcp
```

Mac OS
```
cd $HOME
git clone https://github.com/nig-sc/Bytix_Archaea/ .hcp
```

Windows (PowerShell)
```
cd $HOME
git clone https://github.com/nig-sc/Bytix_Archaea/ _hcp
```

The following files are created when you git clone.

```
$ tree .hcp
.hcp
├── README.md
├── hchmod.conf
├── hchown.conf
├── hcp-common.conf
├── hcp-ls.conf
├── hcp.conf
├── hln.conf
├── hmkdir.conf
├── hmv.conf
├── hpwd.conf
├── hrm.conf
└── hsync.conf

1 directory, 12 files
```

Write the absolute path of the private key in the configuration file hcp-common.conf as follows.

```
PrivateKeyFile /home/username/.ssh/id_rsa    # Specify the private key
AcceptableCryptMethod   PLAIN                # Encryption: None
AcceptableDigestMethod  SHA256               # Digest format: SHA256
DisableDataIntegrityChecking yes             # Allow no digest format
```

Mac OS
```
PrivateKeyFile /Users/youraccount/.ssh/id_rsa    # Specify the private key
```

Windows (PowerShell)
```
PrivateKeyFile C:\Users\youraccount\.ssh/id_rsa    # Specify the private key
```


## The file transfer with Archaea tools(formerly HCPtools)


### SSL-VPN connection to the personal genome analysis division

For file transfer to and from the personal genome analysis division, establish the SSL-VPN connection between the client computer and the personal genome compartment of the NIG supercomputer.

How to establish it: [<u>「How to Login (the personal genome analysis division)」>「How to establish the SSL-VPN connection」</u>](/personal_genome_division/pg_login#vpn%E3%81%B8%E3%81%AE%E6%8E%A5%E7%B6%9A%E6%96%B9%E6%B3%95)

![](upload_download_EN.png)

### Upload files to the NIG supercomputer

Start a terminal emulator on the user's client computer and execute the following command.

Linux (including for Windows WSL2 environments)
```
hcp --user username --hpfp \
   /home/username/your_file.txt \
   gwa.ddbj.nig.ac.jp:/home/your_account-pg/some_directory/your_file.txt
```

Mac OS
```
hcp --user username --hpfp \
   /Users/username/your_file.txt \
   gwa.ddbj.nig.ac.jp:/home/your_account-pg/some_directory/your_file.txt
```

Windows (PowerShell)

```
hcp --user username --hpfp \
    C:\Users\username\your_file.txt \
    gwa.ddbj.nig.ac.jp:/home/your_account-pg/some_directory/your_file.txt
```

### Download files from the NIG supercomputer

Start a terminal emulator on the user's client computer and execute the following command.。

Linux (including for Windows WSL2 environments)
```
hcp --user username --hpfp  \
   gwa.ddbj.nig.ac.jp:/home/your_account-pg/some_directory/your_file.txt \
  /home/username/your_file.txt
```

Mac OS
```
hcp --user username --hpfp  \
   gwa.ddbj.nig.ac.jp:/home/your_account-pg/some_directory/your_file.txt \
   /Users/username/your_file.txt
```

Windows (PowerShell)
```
hcp --user username --hpfp  \
    gwa.ddbj.nig.ac.jp:/home/your_account-pg/some_directory/your_file.txt \
    C:\Users\username\your_file.txt
```

### NOTE.

For the first time when you transfer data, the following message will be displayed. Enter yes.

```
Are you sure you want to continue connecting [yes/no] ?
```


## Frequently used options for file transfer

For more information of options, refer to [&#x1f517;<u>the official manual</u>](https://support.bytix.tech/document/).


- `--hpfp` : Specify UDP (HpFP2) communication to speed up communication over long distances
    - Without this option, TCP communication ehich uesd usually widely is performed.
- `-p` : preserve information about file permission
- `-R` : copy all files under each directory, recursively
- `-r` : resume the previous copy
    - For more information, see <a hrefe="https://support.bytix.tech/docs/archaea/tools/1.4_en/D_commandRef/D01_hcp#r-resume">&#x1f517;<u>the command reference</u></a>.
- `-y` : verify blocks of data transfered by message digest
- `-z` : compress blocks of data transfered


## Other Commands


| command  | feature                                          |
|----------|--------------------------------------------------|
| `hrm`    | delete files on the server                       |
| `hcp-ls` | list files on the server                         |
| `hmkdir` | create directories on the server                 |
| `hpwd`   | retrieve the working directory on the server     |
| `hmv`    | move files on the server                         |
| `hlm`    | create symbolic links, etc. on the server        |
| `hchmod` | change the file's permission on the server       |
| `hchown` | change the file's owner on the server            |
| `hsync`  | synchronize files on the server                  |

For more information, refer to [&#x1f517;<u>the official manual</u>](https://support.bytix.tech/document/).


