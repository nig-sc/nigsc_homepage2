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



## &#x1F180; When I try to run any programme, I get the following error about libraries. It was running without problems before the OS has been changed.
```
error while loading shared libraries: libcrypto.so.10: cannot open shared object file: No such file or directory
```

&#x1F150; This error is due to a difference between the version of the libraries that were included with the previous CentOS 7 and Ubuntu Linux 22.04 now. If you installed by tarball on CentOS 7, you may get this error.

Please compile again by the tarball.


## &#x1F180; I have recompiled by tarball, but when make runs, I get the follow error.
```
collect2: error: ld returned 1 exit status
```


&#x1F150; It is likely that this error is occurring because there are still libraries compiled on CentOS 7 and link those libraries.

Libraries compiled by the CentOS 7 environment cannot be used on the Ubuntu environment, so remove any libraries compiled by the CentOS 7 environment and re-compile them.

