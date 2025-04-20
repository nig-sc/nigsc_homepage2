---
id: install_HCPtools_002
title: "Installing HCP tools (CentOS 7)"
---

:::danger This is an old document

This document is a former NIG supercomputer (2019) document and is kept for reference purposes.

Please note that it does not work in the same way on the current NIG supercomputer (2025).
:::

When you use CentOS 7 as the OS of the user's client computer, install the HCP tools client software installer from the following link.

Download the zip file [from here](https://github.com/nig-sc/HCPtools/tree/main/1.3.0R-45/CentOS7).
- [Here](https://github.com/nig-sc/HCPtools) are past versions and others.


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

## Location the configuration file {#locat-configfile}

Copy configuration files for HCP tools in the user home directory.

```
$ cp -rp ~/ hcp-tools-1.3.0-42/conf/ ~/.hcp
```

## Editing the configuration file {#edit-configfile}

Locate the HCP tools configuration file in the user directory and add the public key settings for user authentication.

Procedure: [How to write the configuration file](/guides/old_docs/software/CopyTool/archaea_conf/)

