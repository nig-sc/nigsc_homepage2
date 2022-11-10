---
id: hcptools
title: How to use HCP tools
---

When you transfer files to and from the NIG supercomputer, you can use `scp` or `sftp`, which are widely used as the file transfer software. But their transfer speed is slow when a large numbers of files are transfered over long distances.

For high-speed file transfer over long distances, the file transfer software Aspera is available on the general analysis section, and HCP tools is available on the personal genome analysis section on the NIG supercomputer.


Reference

- The official manual (vession 1.3.0R_45)
    - HCP tools Command Introduction Guide (<a href="https://github.com/nig-sc/HCPtools/raw/main/1.3.0R-45/manual/HCPtools_command_Guide.pdf">Japanese edition</a>)
    - HCP tools Command Overview (<a href="https://github.com/nig-sc/HCPtools/raw/main/1.3.0R-45/manual/HCPtools_command_overview.pdf">Japanese edition</a>)
    - HCP tools Command Reference (<a href="https://github.com/nig-sc/HCPtools/raw/main/1.3.0R-45/manual/HCPtools_command_reference.pdf">Japanese edition</a>)

- [FAQ (HCP tools)](/faq/faq_hcptools)


## Installing the HCP tools client software

For using HCP tools, all user must install the HCP tools client software on user's client computer.

Refer to the following documents depending on the environment of your client computer.

- [Windows](/software/HCPtools/Windows/install_HCPtools_001)
- Mac OS : This Platform is not available because of under development, so the client software is currently under development and is not available at this time. The service is scheduled to be available around June 2022.
- Linux
    - [Ubuntu Linux](/software/HCPtools/Ubuntu/install_HCPtools_003)
    - [CentOS 7](/software/HCPtools/CentOS/install_HCPtools_002)


## The file transfer with HCP tools


### SSL-VPN connection to the personal genome analysis section

Establish the SSL-VPN connection for file transfer to and from the personal genome analysis section.

How to establish it: [「How to Login (the personal genome analysis section)」>「How to establish the SSL-VPN connection」](/personal_genome_division/pg_login#vpn%E3%81%B8%E3%81%AE%E6%8E%A5%E7%B6%9A%E6%96%B9%E6%B3%95)


### Upload files to the NIG supercomputer

Start a terminal emulator on the user's client computer and execute the following command.


```
hcp --user username --hpfp \
    C:\Users\username\your_file.txt \
    gwa.ddbj.nig.ac.jp:/home/your_account-pg/some_directory/your_file.txt
```

### Download files from the NIG supercomputer

Start a terminal emulator on the user's client computer and execute the following command.。


```
hcp --user username --hpfp  \
    gwa.ddbj.nig.ac.jp:/home/your_account-pg/some_directory/your_file.txt \
    C:\Users\username\your_file.txt
```

## Frequently used options for file transfer

- `--hpfp` : Specify UDP (HpFP2) communication to speed up communication over long distances
    - Without this option, TCP communication ehich uesd usually widely is performed.
- `-p` : preserve information about file permission
- `-R` : copy all files under each directory, recursively
- `-r` : resume the previous copy
- `-y` : verify blocks of data transfered by message digest
- `-z` : compress blocks of data transfered


For more information of options, refer to the official manual.

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

For more information, refer to the official manual.


