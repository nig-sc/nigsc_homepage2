---
id: faq_os_migration_env-var
title: "Questions related to reinstallation of analysis environments"
---


## &#x1F180; I want to reinstall my analysis environment along with the OS migration. (Ubuntu Linux 22.04)

&#x1F150; It depends on how you have built your analysis environment, so it is difficult to say, but in general, on Cent OS 7, any parts of C code that you have compiled yourself will need to be recompiled.

The same applies to Conda and R packages that call C code behind that.

Referring to [<u>FAQ</u>](/faq/faq_software/#ubuntu-initialization), the procedure is as follows.
1. restore the shell configuration files, such as `.bashrc`, to their initial state once.
2. reinstall the programs installed from the tarball after restoring the initial state.
3. reinstall conda, R packages, etc.

The libraries and tools installed on Ubuntu Linux 22.04 are greatly expanded, and installation from the tarball has been simplified.


## &#x1F180; I have recompiled by tarball, but when make runs, I get the follow error.
```
collect2: error: ld returned 1 exit status
```

&#x1F150; It is likely that this error is occurring because there are still libraries compiled on CentOS 7 and link those libraries.

Libraries compiled by the CentOS 7 environment cannot be used on the Ubuntu environment, so remove any libraries compiled by the CentOS 7 environment and re-compile them.

If the same error occurs after recompiling, the environment variables may not be set correctly. Please reset `.bash_profile` and `.bashrc` to the initial state and see the errors do not occur again.

To learn how to restore the initial state, [<u>refer to the FAQ 'Software General'</u>](/faq/faq_software#%F0%9F%86%80-i-want-to-restore-my-computer-environment-to-its-initial-state-ubuntu-linux-2204).

If you are using e.g. conda, your environment variables are rewritten there and may be affected by this - try leaving the conda environment and starting to compile again and see if the error does not occur again.


## &#x1F180; When I try to run some programme, I get the following error about libraries. It was running without problems before the OS has been changed.
```
error while loading shared libraries: libcrypto.so.10: cannot open shared object file: No such file or directory
```

&#x1F150; This error is due to a difference between the version of the libraries that were included with the previous CentOS 7 and Ubuntu Linux 22.04 now. If you installed by tarball on CentOS 7, you may get this error.

Please compile again by the tarball.

If the same error occurs after recompiling, the environment variables may not be set correctly. Please reset `.bash_profile` and `.bashrc` to the initial state and see the errors do not occur again.

To learn how to restore the initial state, [<u>refer to the FAQ 'Software General'</u>](/faq/faq_software#%F0%9F%86%80-i-want-to-restore-my-computer-environment-to-its-initial-state-ubuntu-linux-2204).

If you are using e.g. conda, your environment variables are rewritten there and may be affected by this - try leaving the conda environment and starting to compile again and see if the error does not occur again.


## &#x1F180; I want to use R, but I get the following error: error while loading shared libraries: libgfortran.so.3: cannot open shared object file: No such file or directory

&#x1F150; Since CentOS 7 will reach its End-Of-Life on June 30, 2024, The OS of the NIG supercomputer has been migrated from CentOS 7 to Ubuntu Linux 22.04LTS in the scheduled maintenance.

CentOS 7 had become outdated in terms of its Linux kernel version, leading to numerous issues with installing tools like Aspera client and bioinformatics tools.

Given these circumstances, I apologize for the inconvenience, but I kindly request the reinstallation of the analysis environment.

```
error while loading shared libraries: libgfortran.so.3: cannot open shared object file: No such file or directory
```

This type of error is occurring due to the difference in library versions between the ones that came with the previous CentOS 7 and those included in the current Ubuntu Linux 22.04.

There are two ways to deal with this issue.

### i) Using R that comes with Ubuntu Linux 22.04

When we migrated to Ubuntu Linux 22.04, we significantly expanded the installed libraries and tools. The version of R that can be installed by `apt install` of Ubuntu Linux is installed on the system from the beginning. The various packages of R that can be installed by `apt install` are also already installed.

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

If the same error occurs after recompiling, the environment variables may not be set correctly. Please reset `.bash_profile` and `.bashrc` to the initial state and see the errors do not occur again.

To learn how to restore the initial state, [<u>refer to the FAQ 'Software General'</u>](/faq/faq_software#%F0%9F%86%80-i-want-to-restore-my-computer-environment-to-its-initial-state-ubuntu-linux-2204).

If you are using e.g. conda, your environment variables are rewritten there and may be affected by this - try leaving the conda environment and starting to compile again and see if the error does not occur again.


## &#x1F180; When I try to analyse the data using OpenMPI as before, I get the following error.
```
ERROR: Unable to locate a modulefile for 'openmpi/mlnx/gcc/64'
/var/spool/age/at***/job_scripts/jobid: line 16: mpirun: command not found
```


&#x1F150; On the Ubuntu environment, `openmpi` is installed in `/usr/mpi/gcc/openmpi-4.1.5a1` on each node.

In the subdirectory bin of this directory, `mpicc`, `mpirun`, etc. are located.

```
$ ls /usr/mpi/gcc/openmpi-4.1.5a1/bin
aggregate_profile.pl  mpifort       orte-clean   oshcc           shmemcc
mpiCC                 mpirun        orte-info    oshcxx          shmemcxx
mpic++                ompi-clean    orte-server  oshfort         shmemfort
mpicc                 ompi-server   ortecc       oshmem_info     shmemrun
mpicxx                ompi_info     orted        oshrun
mpiexec               opal_wrapper  orterun      profile2mat.pl
mpif77                opalc++       oshCC        shmemCC
mpif90                opalcc        oshc++       shmemc++
```

If you use the `mpirun` command or other commands, execute one of the following ways.

1. Specify the command by full path.

```
/usr/mpi/gcc/openmpi-4.1.5a1/bin/mpirun -np 32 ....
```

2. Add the environment variable `PATH`/usr/mpi/gcc/openmpi-4.1.5a1/bin` and execute the command.

```
export PATH=/usr/mpi/gcc/openmpi-4.1.5a1/bin:${PATH}
mpirun -np 32 ....
```


## &#x1F180; When I try to use the intel compiler, I get an error: `ERROR: Unable to locate a modulefile for 'intel/compiler/64/2018/18.0.5'　ERROR: Unable to locate a modulefile for 'gcc/8.2.0'`.

&#x1F150; Environmental Modules is only available on the CentOS 7 environment of the NIG supercomputer. It is not available on the Ubuntu Linux environment.

Therefor, the existing `.bashrc`, `barc_profile`, etc., should be commented out.

For more information on commenting out, see ['Questions about behavior at login'](/faq/faq_os_migration_login/#module_load).

Also, when you use the intel compiler, activate it with the following command.

```
source /opt/pkg/intel/oneapi/setvars.sh
```

## &#x1F180; I would like to use DRMAA, but the library path I have been using is not available. It seems to change from `/home/geadmin/UGED/lib/lx-amd64/libdrmaa.so.1.0` that I have been using due to the scheduled maintenance.

&#x1F150;  The DRMAA libraries were changed to the following paths along with [the AGE version upgrade (8.6.19/8.6.4 → 8.8.1)](/blog/2023-11-24-scheduled-maintenance/#software-version-upgrade-details).
Please use the libraries located in the following paths.

```
$ ls -l /home/geadmin/AGEN/drmaa/lib/lx-amd64/
total 7444
drwxr-xr-x 2 9901 9901  4096 Sep 19 02:05 ./
drwxr-xr-x 3 root root  4096 Nov 29 13:44 ../
lrwxrwxrwx 1 9901 9901   15 Sep 19 02:05 libdrmaa.so -> libdrmaa.so.1.0*
-rwxr-xr-x 1 9901 9901 3699608 Sep 19 02:05 libdrmaa.so.1.0*
lrwxrwxrwx 1 9901 9901   16 Sep 19 02:05 libdrmaa2.so -> libdrmaa2.so.0.1*
-rwxr-xr-x 1 9901 9901 3911464 Sep 19 02:05 libdrmaa2.so.0.1*
$
```
