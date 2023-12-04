---
id: faq_os_migration_qlogin
title: "qlogin"
---

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
