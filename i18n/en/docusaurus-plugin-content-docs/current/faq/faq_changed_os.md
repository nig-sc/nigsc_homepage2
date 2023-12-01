---
id: faq_changed_os
title: "Related to OS changing"
---

On this page, questions relating to errors and other problems that occurred after [<u>the scheduled maintenance in FY2023</u>](/en/blog/2023-11-24-scheduled-maintenance/) are listed.

## &#x1F180; After the scheduled maintenance in FY2023, when I tried to qlogin, I got an error `ERROR: Unable to locate a modulefile for 'gcc'`.

&#x1F150; This error can be safely ignored.

While the OS has changed from CentOS 7 to Ubuntu, the `.bashrc` on the user's home directory is still the same.
On Ubuntu, the environmental modules are no longer used, so the module load is causing an error, and this error occurs.

It is harmless, but it will appear frequently. So comment out or delete the following lines in `~/.bashrc`. Then, the error will no longer occur.

```
module load gcc
```

Similarly, the following similar errors should be commented out or removed to prevent them from occurring.

For example,

```
> ERROR: Unable to locate a modulefile for 'r/3.5.2'
> ERROR: Unable to locate a modulefile for 'singularity'
```

If such an error occurs, comment out or delete the following lines in `~/.bashrc`.

```
module load r/3.5.2
module load singularity
```

## &#x1F180; When I try to qlogin to the NIG supercomputer, I get the following error message.
```
[username@gwB1 ~]$ qlogin

error: commlib error: access denied (service qmaster@it001: client gdi version "0x100035F3" does not match server gdi version "0x10003800")

error: getting configuration: unable to contact qmaster using port 6444 on host "it001"

error: Cannot get configuration from qmaster.
```

&#x1F150; This is due to the fact that the path has changed due to Univa Grid Engine being acquired by Altair and becoming AGE.

Before you qlogin, execute this:
```
$ source /home/geadmin/AGER/ager/common/settings.sh
```



## &#x1F180; When I try to run some programme, I get the following error about libraries. It was running without problems before the OS has been changed.
```
error while loading shared libraries: libcrypto.so.10: cannot open shared object file: No such file or directory
```

&#x1F150; This error is due to a difference between the version of the libraries that were included with the previous CentOS 7 and Ubuntu Linux 22.04 now. If you installed by tarball on CentOS 7, you may get this error.

Please compile again by the tarball.


## &#x1F180; I want to use R, but I get the following error: error while loading shared libraries: libgfortran.so.3: cannot open shared object file: No such file or directory

&#x1F150;

Since CentOS 7 will reach its End-Of-Life on June 30, 2024, 
The OS of the NIG supercomputer has been migrated from CentOS 7 to Ubuntu Linux 22.04LTS in the scheduled maintenance.

CentOS 7 had become outdated in terms of its Linux kernel version, leading to numerous issues with installing tools like Aspera client and bioinformatics tools.

Given these circumstances, I apologize for the inconvenience, but I kindly request the reinstallation of the analysis environment.

> error while loading shared libraries: libgfortran.so.3: cannot open shared object file: No such file or directory

This type of error is occurring due to the difference in library versions between the ones that came with the previous CentOS 7 and those included in the current Ubuntu Linux 22.04.


There are two ways to deal with this issue.

### i) Using R that comes with Ubuntu Linux 22.04

When we migrated to Ubuntu Linux 22.04, we significantly expanded the installed libraries and tools.
The version of R that can be installed by `apt install` of Ubuntu Linux is installed on the system from the beginning.
The various packages of R that can be installed by `apt install` are also already installed.

```
$ which R
/usr/bin/R
$ R --version
R version 4.1.2 (2021-11-01) -- "Bird Hippie
Copyright (C) 2021 The R Foundation for Statistical Computing
Platform: x86_64-pc-linux-gnu (64-bit)
```


### ii) Reinstalling R from a tarball

As a result of migrating to Ubuntu Linux 22.04, the installation of R from tarballs has also been simplified.


Download and unzip R (download the tarball of the version you need. The latest is 4.2.3)

```
cd $HOME/local/src
wget https://cran.r-project.org/src/base/R-4/R-4.1.0.tar.gz
tar zxvf R-4.1.0.tar.gz
cd R-4.1.0
```

After this, installation can be done with just the following command.

```
. /configure --prefix=$HOME/local
make
make install
```

## &#x1F180; I have recompiled by tarball, but when make runs, I get the follow error.
```
collect2: error: ld returned 1 exit status
```


&#x1F150; It is likely that this error is occurring because there are still libraries compiled on CentOS 7 and link those libraries.

Libraries compiled by the CentOS 7 environment cannot be used on the Ubuntu environment, so remove any libraries compiled by the CentOS 7 environment and re-compile them.

