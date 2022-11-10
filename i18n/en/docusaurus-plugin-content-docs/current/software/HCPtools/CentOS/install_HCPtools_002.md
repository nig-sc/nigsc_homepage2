---
id: install_HCPtools_002
title: "Installing HCP tools (CentOS 7)"
---

When you use CentOS 7 as the OS of the user's client computer, install the HCP tools client software installer from the following link.

Download the zip file [from here](https://github.com/nig-sc/HCPtools/tree/main/1.3.0R-45/CentOS7).
- <a href="https://github.com/nig-sc/HCPtools">Here</a> are past versions and others.


Unzip the zip file.

```
$ unzip hcp-tools-1.3.0R-45.el7.centos.zip
```

When unzipped, the following directory will be created.

```
hcp-tools-1.3.0R_45/
├bin/*.rpm    # command packages
├conf/*.conf  # configuration files
└license/*    # license documents
```

Install hcp command packages hcp-< version >.rpm.

```
$ cd hcp-tools-1.3.0R_45/bin
$ sudo rpm -ivh hcp-1.3.0R_45.el7.centos.x86_64.rpm
$ hcp --version
hcp client (hcp) 1.3.0R_45 / Linux (HpFP2 2.0.0.91_16 WSAPI 0.0.1.23)
```

## Location the configuration file

Copy configuration files for HCP tools in the user home directory.

```
$ cp -rp ~/ hcp-tools-1.3.0-42/conf/ ~/.hcp
```

## Editing the configuration file

Locate the HCP tools configuration file in the user directory and add the public key settings for user authentication.

Procedure: [How to write the configuration file](/software/HCPtools/hcptools_conf)
