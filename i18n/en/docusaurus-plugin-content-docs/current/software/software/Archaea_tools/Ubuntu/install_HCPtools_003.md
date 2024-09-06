---
id: install_HCPtools_003
title: "Installing HCP tools (Ubuntu Linux)"
---

## Get the installer

If you use Ubuntu Linux as the OS of the user's client computer, install the HCP tools client software installer from the following link.

HCP tools addesses Ubuntu Linux 16.04, 18.04, 20.04.
Download the zip file for your version [from here](https://github.com/nig-sc/HCPtools/tree/main/1.3.0R-45/Ubuntu_Linux).
- <a href="https://github.com/oogasawa/Ptools">Here</a> are past versions and others.


The following steps are an example of Ubuntu Linux 20.04.

```
$ git clone https://github.com/oogasawa/Ptools/blob/main/1.3.0R-45/Ubuntu_Linux/hcp-tools-1.3.0R_45.amd64.ubuntu2004.zip
```

Unzip the zip file.

```
$ unzip hcp-tools-1.3.0R_45.amd64.ubuntu2004.zip
```

When unzipped, the following directory will be created.

```
hcp-tools-1.3.0R_45.amd64.ubuntu2004/
├── *_1.3.0-45_amd64.deb # command packages
├── /conf/*.conf # configuration files
└── /license/* # license documents
```

Install hcp command packages hcp-tools-< version >.deb.

```
$ cd hcp-tools-1.3.0R_45.amd64.ubuntu2004/
$ sudo dpkg -i hcp_1.3.0-45_amd64.deb
$ hcp --version
hcp client (hcp) 1.3.0R_45 / Linux (HpFP2 2.0.0.91_16 WSAPI 0.0.1.23)
```

## Location the configuration file {#locat-configfile}

Copy configuration files for HCP tools in the user home directory.

```
$ cp -rp ~/hcp-tools-1.3.0R_45.amd64.ubuntu2004/conf/ ~/.hcp
```

## Editing the configuration file {#edit-configfile}

Locate the HCP tools configuration file in the user directory and add the public key settings for user authentication.

Procedure: [How to write the configuration file](/software/Archaea_tools/hcptools_conf)
