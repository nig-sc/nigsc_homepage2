---
id: gcc
title: "C/C++ (GCC: GNU Compiler Collection)"
---

## GCC version: status of support for C and C++ language standards

The GCC versions and the conforming language specifications of the default state are as follows.
(You can change the standard you are compliant with by adding options. For more information, refer to the manuals for each version).

| Version | C language standard | C++ language standard | Initial release year | URL                                                        |
|------------|------------|-------------|--------------|--------------------------------------------------------------|
| gcc 4.8    | std=gnu90  | std=gnu++98 | 2013         | https://gcc.gnu.org/onlinedocs/gcc-4.8.0/gcc/Standards.html  |
| gcc 4.9    | std=gnu90  | std=gnu++98 | 2014         | https://gcc.gnu.org/onlinedocs/gcc-4.9.0/gcc/Standards.html  |
| gcc 5      | std=gnu11  | std=gnu++98 | 2015         | https://gcc.gnu.org/onlinedocs/gcc-5.1.0/gcc/Standards.html  |
| gcc 6      | std=gnu11  | std=gnu++14 | 2016         | https://gcc.gnu.org/onlinedocs/gcc-6.1.0/gcc/Standards.html  |
| gcc7       | std=gnu11  | std=gnu++14 | 2017         | https://gcc.gnu.org/onlinedocs/gcc-7.1.0/gcc/Standards.html  |
| gcc 8      | std=gnu11  | std=gnu++14 | 2018         | https://gcc.gnu.org/onlinedocs/gcc-8.1.0/gcc/Standards.html  |
| gcc 9      | std=gnu11  | std=gnu++14 | 2019         | https://gcc.gnu.org/onlinedocs/gcc-9.1.0/gcc/Standards.html  |
| gcc 10     | std=gnu11  | std=gnu++14 | 2020         | https://gcc.gnu.org/onlinedocs/gcc-10.1.0/gcc/Standards.html |
| gcc 11     | std=gnu17  | std=gnu++17 | 2021         | https://gcc.gnu.org/onlinedocs/gcc-11.1.0/gcc/Standards.html |
| gcc 12     | std=gnu17  | std=gnu++17 | 2022         | https://gcc.gnu.org/onlinedocs/gcc-12.1.0/gcc/Standards.html |
| gcc 13     | std=gnu17  | std=gnu++17 | 2023         | https://gcc.gnu.org/onlinedocs/gcc-13.1.0/gcc/Standards.html |


Reference

- [GCC Releases | gcc.gnu.org](https://gcc.gnu.org/releases.html)





## About GCC versions for CentOS 7

For CentOS 7 systems of the NIG supercomputer
- The rpm package included in CentOS 7 is GCC ver.4.8. series. Ver. 4.8 is an old version, so it is recommended to install a newer version. You can switch to ver. 9 as a newer version, so just install and use ver. 9.
- GCC ver. 8 and ver. 9 are provided using [Environmentl modules](/software/environmental_modules) supplied with Bright Cluster Manager (BCM).
    - BCM is a system for deploying operating systems and other software to individual computers composing a computer cluster.[BCM official page](https://www.nvidia.com/en-us/data-center/bright-cluster-manager/).
    - For an explanation of Environmental modules itself, see the page [User Guide => Software => Environmental Modules](/software/environmental_modules).
- If you would like to use others, you can install GCC and change the GCC version using the [spack package manager](/software/spack/install_spack). In this case, it will take a little longer since GCC is compiled from source code.
    - For an explanation of spack itself, see the page [User Guide => software => spack](/software/spack/install_spack).


## How to switch GCC versions for Ubuntu Linux

- The deb package included in Ubuntu Linux 22.04 is GCC 12 series. If you do not need to specify a version, use GCC 12 series.
- If you would like to specify a version, you can install GCC and change the GCC version using the [spack package manager](/software/spack/install_spack). In this case, it will take a little longer since GCC is compiled from source code.
    - For an explanation of spack itself, see the page [User Guide => software => spack](/software/spack/install_spack).


## Loading GCC with Environmental Modules

1. Check which version of GCC is currently available in your environment.

```
$ which gcc
/usr/bin/gcc

$ gcc --version
gcc (GCC) 4.8.5 20150623 (Red Hat 4.8.5-44)
Copyright (C) 2015 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

```

2. Find the available GCCs in Environmental modules using the `module avail` command.

```
$ module avail

-------------------------------------------------------------------------- /cm/local/modulefiles --------------------------------------------------------------------------
apptainer/1.1.0    gcc/9.2.0        java/11.0.3             module-info                   r/3.5.2            singularity/3.2.0  singularity/3.8.7
cluster-tools/8.2  git/2.26.2       java/14.0.1             null                          ruby/1.9.3         singularity/3.3.0  singularity/3.10.2(default)
cmd                ipmitool/1.8.18  java/hotspot-8u252-b09  openldap                      ruby/2.6.0         singularity/3.4.1
dot                java/1.6.0_45    java/openj9-8u252-b09   openmpi/mlnx/gcc/64/4.0.3rc4  ruby/2.6.5         singularity/3.5.2
freeipmi/1.6.2     java/1.8.0_45    lua/5.3.5               python/3.7.2                  shared             singularity/3.7.1
gcc/8.2.0          java/1.8.0_202   module-git              python2                       singularity/2.6.1  singularity/3.8.3

-
```

- On the NIG supercomputer, you will find `gcc/9.2.0` and `gcc/8.2.0`.

3. Use the `module load` command to load and use `gcc`.

```
$ module load gcc/9.2.0

$ which gcc
/opt/pkg/gcc/9.2.0/bin/gcc

$ gcc --version
gcc (GCC) 9.2.0
Copyright (C) 2019 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

4. To undo, use the `module unload` command.

```
$ module unload gcc/9.2.0

$ which gcc
/usr/bin/gcc

$ gcc --version
gcc (GCC) 4.8.5 20150623 (Red Hat 4.8.5-44)
Copyright (C) 2015 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```


## Installing GCC with Spack


1, Check which version of GCC is currently available in your environment.

```
$ which gcc
/usr/bin/gcc

$ gcc --version
gcc (GCC) 4.8.5 20150623 (Red Hat 4.8.5-44)
Copyright (C) 2015 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

```


2. Check the available GCC versions and compilation options with the `spack info` command.

```
$ spack info gcc
AutotoolsPackage:   gcc

Description:
    The GNU Compiler Collection includes front ends for C, C++, Objective-C,
    Fortran, Ada, and Go, as well as libraries for these languages.

Homepage: https://gcc.gnu.org

Preferred version:
    13.1.0    https://ftpmirror.gnu.org/gcc/gcc-13.1.0/gcc-13.1.0.tar.xz

Safe versions:
    master    [git] git://gcc.gnu.org/git/gcc.git on branch master
    13.1.0    https://ftpmirror.gnu.org/gcc/gcc-13.1.0/gcc-13.1.0.tar.xz
    12.3.0    https://ftpmirror.gnu.org/gcc/gcc-12.3.0/gcc-12.3.0.tar.xz
    12.2.0    https://ftpmirror.gnu.org/gcc/gcc-12.2.0/gcc-12.2.0.tar.xz
    12.1.0    https://ftpmirror.gnu.org/gcc/gcc-12.1.0/gcc-12.1.0.tar.xz
    11.3.0    https://ftpmirror.gnu.org/gcc/gcc-11.3.0/gcc-11.3.0.tar.xz
    11.2.0    https://ftpmirror.gnu.org/gcc/gcc-11.2.0/gcc-11.2.0.tar.xz
    11.1.0    https://ftpmirror.gnu.org/gcc/gcc-11.1.0/gcc-11.1.0.tar.xz
    10.4.0    https://ftpmirror.gnu.org/gcc/gcc-10.4.0/gcc-10.4.0.tar.xz
    10.3.0    https://ftpmirror.gnu.org/gcc/gcc-10.3.0/gcc-10.3.0.tar.xz
    10.2.0    https://ftpmirror.gnu.org/gcc/gcc-10.2.0/gcc-10.2.0.tar.xz
    10.1.0    https://ftpmirror.gnu.org/gcc/gcc-10.1.0/gcc-10.1.0.tar.xz
    9.5.0     https://ftpmirror.gnu.org/gcc/gcc-9.5.0/gcc-9.5.0.tar.xz
    9.4.0     https://ftpmirror.gnu.org/gcc/gcc-9.4.0/gcc-9.4.0.tar.xz
    9.3.0     https://ftpmirror.gnu.org/gcc/gcc-9.3.0/gcc-9.3.0.tar.xz
    9.2.0     https://ftpmirror.gnu.org/gcc/gcc-9.2.0/gcc-9.2.0.tar.xz
    9.1.0     https://ftpmirror.gnu.org/gcc/gcc-9.1.0/gcc-9.1.0.tar.xz
    8.5.0     https://ftpmirror.gnu.org/gcc/gcc-8.5.0/gcc-8.5.0.tar.xz
    8.5.0     https://ftpmirror.gnu.org/gcc/gcc-8.5.0/gcc-8.5.0.tar.xz
    8.4.0     https://ftpmirror.gnu.org/gcc/gcc-8.4.0/gcc-8.4.0.tar.xz
    8.3.0     https://ftpmirror.gnu.org/gcc/gcc-8.3.0/gcc-8.3.0.tar.xz
    8.2.0     https://ftpmirror.gnu.org/gcc/gcc-8.2.0/gcc-8.2.0.tar.xz
    8.1.0     https://ftpmirror.gnu.org/gcc/gcc-8.1.0/gcc-8.1.0.tar.xz
    7.5.0     https://ftpmirror.gnu.org/gcc/gcc-7.5.0/gcc-7.5.0.tar.xz
    7.4.0     https://ftpmirror.gnu.org/gcc/gcc-7.4.0/gcc-7.4.0.tar.xz
    7.3.0     https://ftpmirror.gnu.org/gcc/gcc-7.3.0/gcc-7.3.0.tar.xz
    7.2.0     https://ftpmirror.gnu.org/gcc/gcc-7.2.0/gcc-7.2.0.tar.xz
    7.1.0     https://ftpmirror.gnu.org/gcc/gcc-7.1.0/gcc-7.1.0.tar.bz2
    6.5.0     https://ftpmirror.gnu.org/gcc/gcc-6.5.0/gcc-6.5.0.tar.bz2
    6.4.0     https://ftpmirror.gnu.org/gcc/gcc-6.4.0/gcc-6.4.0.tar.bz2
    6.3.0     https://ftpmirror.gnu.org/gcc/gcc-6.3.0/gcc-6.3.0.tar.bz2
    6.2.0     https://ftpmirror.gnu.org/gcc/gcc-6.2.0/gcc-6.2.0.tar.bz2
    6.1.0     https://ftpmirror.gnu.org/gcc/gcc-6.1.0/gcc-6.1.0.tar.bz2
    5.5.0     https://ftpmirror.gnu.org/gcc/gcc-5.5.0/gcc-5.5.0.tar.bz2
    5.4.0     https://ftpmirror.gnu.org/gcc/gcc-5.4.0/gcc-5.4.0.tar.bz2
    5.3.0     https://ftpmirror.gnu.org/gcc/gcc-5.3.0/gcc-5.3.0.tar.bz2
    5.2.0     https://ftpmirror.gnu.org/gcc/gcc-5.2.0/gcc-5.2.0.tar.bz2
    5.1.0     https://ftpmirror.gnu.org/gcc/gcc-5.1.0/gcc-5.1.0.tar.bz2
    4.9.4     https://ftpmirror.gnu.org/gcc/gcc-4.9.4/gcc-4.9.4.tar.bz2
    4.9.3     https://ftpmirror.gnu.org/gcc/gcc-4.9.3/gcc-4.9.3.tar.bz2
    4.9.2     https://ftpmirror.gnu.org/gcc/gcc-4.9.2/gcc-4.9.2.tar.bz2
    4.9.1     https://ftpmirror.gnu.org/gcc/gcc-4.9.1/gcc-4.9.1.tar.bz2
    4.8.5     https://ftpmirror.gnu.org/gcc/gcc-4.8.5/gcc-4.8.5.tar.bz2
    4.8.4     https://ftpmirror.gnu.org/gcc/gcc-4.8.4/gcc-4.8.4.tar.bz2
    4.7.4     https://ftpmirror.gnu.org/gcc/gcc-4.7.4/gcc-4.7.4.tar.bz2
    4.6.4     https://ftpmirror.gnu.org/gcc/gcc-4.6.4/gcc-4.6.4.tar.bz2
    4.5.4     https://ftpmirror.gnu.org/gcc/gcc-4.5.4/gcc-4.5.4.tar.bz2

Deprecated versions:
    None

Variants:
    Name [Default]                 When                Allowed values          Description
    ===========================    ================    ====================    ===========================================================================================

    binutils [off]                 --                  on, off                 Build via binutils
    bootstrap [on]                 --                  on, off                 Enable 3-stage bootstrap
    build_system [autotools]       --                  autotools               Build systems supported by the package
    build_type [RelWithDebInfo]    --                  Debug, Release,         CMake-like build type. Debug: -O0 -g; Release: -O3; RelWithDebInfo: -O2 -g; MinSizeRel: -Os
                                                       RelWithDebInfo,
                                                       MinSizeRel
    graphite [off]                 --                  on, off                 Enable Graphite loop optimizations (requires ISL)
    languages [c,c++,fortran]      --                  ada, brig, c, c++,      Compilers and runtime libraries to build
                                                       d, fortran, go,
                                                       java, jit, lto,
                                                       objc, obj-c++
    nvptx [off]                    --                  on, off                 Target nvptx offloading to NVIDIA GPUs
    piclibs [off]                  --                  on, off                 Build PIC versions of libgfortran.a and libstdc++.a
    profiled [off]                 [%gcc+bootstrap]    on, off                 Use Profile Guided Optimization
    strip [off]                    --                  on, off                 Strip executables to reduce installation size

Build Dependencies:
    autoconf  automake  binutils  cuda  diffutils  flex  gawk  gmake  gmp  gnat  gnuconfig  iconv  isl  libtool  m4  mpc  mpfr  perl  texinfo  zip  zlib  zstd

Link Dependencies:
    binutils  cuda  gmp  gnat  iconv  isl  mpc  mpfr  zlib  zstd

Run Dependencies:
    binutils

```

3. Compile and install gcc itself with the `spack install` command.

The version can be omitted if it matches the Preferred version.

```
spack install -j 8 gcc@13.1.0 binutils=True bootstrap=True
```

- In this example, after compiling spack's gcc (ver. 13.1.0) using the gcc (ver. 4.8.5) currently used in your environment in 1, the compiled spack's gcc ver. 13.0.1 is used to Compiled. (`bootstrap=True`)


If you would like to install other versions, specify the version.

```
spack install -j 8 gcc@12.3.0 binutils=True bootstrap=True
```


4. Load and make available the installed gcc with the `spack load` command.

You can find available versions that have been the `spack install` command with the `spack find` command.

```
$ spack find gcc
-- linux-centos7-x86_64_v3 / gcc@4.8.5 --------------------------
gcc@13.1.0
==> 1 installed package
```

To use GCC that has been installed with spack, execute the `spack load` command.

```
$ spack load gcc@13.1.0

$ gcc --version
gcc (Spack GCC) 13.1.0
Copyright (C) 2023 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

$ which gcc
/lustre7/home/lustre4/youraccount/spack/opt/spack/linux-centos7-x86_64_v3/gcc-4.8.5/gcc-13.1.0-j4uonbxx6sjxhg4tx3dd5q6mej62pgcd/bin/gcc
```

5. The first time, use the `spack compiler find` command to make spack recognise GCC.

By executing the following command, spack will find the compiler pre-installed on the NIG supercomputer.

```
spack compiler find
```

Then, a `$HOME/.spack/linux/compilers.yaml` file will be created and the recognised information will be stored there.

To make spack recognise GCC compiled by spack with the `spack compiler find` command, execute the `spack compiler find` command with the`spack load gcc` command executing.

6. Confirmation of operation

Make spack recognise gcc ver 13.1.0 made with the `spack install gcc` command and try installing other spack packages with it.

```
spack load gcc@13.1.0
spack compiler find
spack install tree %gcc@13.1.0
```

An example of an execution is shown below.

```
$ spack load gcc@13.1.0

$ spack compiler find
==> Added 1 new compiler to /home/oogasawa/.spack/linux/compilers.yaml
    gcc@13.1.0
==> Compilers are defined in the following files:
    /home/oogasawa/.spack/linux/compilers.yaml

$ spack install tree %gcc@13.1.0
==> Installing tree-2.1.0-ah6zdt2znzoc7ie7kpenwj6t255mr3wp
==> No binary for tree-2.1.0-ah6zdt2znzoc7ie7kpenwj6t255mr3wp found: installing from source
==> Fetching https://mirror.spack.io/_source-cache/archive/01/0160c535bff2b0dc6a830b9944e981e3427380f63e748da96ced7071faebabf6.tgz
==> No patches needed for tree
==> tree: Executing phase: 'install'
==> tree: Successfully installed tree-2.1.0-ah6zdt2znzoc7ie7kpenwj6t255mr3wp
  Stage: 1.15s.  Install: 1.54s.  Post-install: 0.16s.  Total: 2.96s
[+] /lustre7/home/lustre4/oogasawa/spack/opt/spack/linux-centos7-zen/gcc-13.1.0/tree-2.1.0-ah6zdt2znzoc7ie7kpenwj6t255mr3wp

$ spack find
-- linux-centos7-x86_64_v3 / gcc@4.8.5 --------------------------
autoconf@2.69                binutils@2.40  gcc@13.1.0      gmp@6.2.1        libxml2@2.10.3  ncurses@6.4    readline@8.2   zlib@1.2.13
autoconf-archive@2023.02.20  bzip2@1.0.8    gdbm@1.23       libiconv@1.17    m4@1.4.19       perl@5.36.0    tar@1.34       zstd@1.5.5
automake@1.16.5              diffutils@3.9  gettext@0.21.1  libsigsegv@2.14  mpc@1.3.1       pigz@2.7       texinfo@7.0.3
berkeley-db@18.1.40          gawk@5.2.1     gmake@4.4.1     libtool@2.4.7    mpfr@4.2.0      pkgconf@1.9.5  xz@5.4.1

-- linux-centos7-zen / gcc@13.1.0 -------------------------------
tree@2.1.0
```

- Now, you can see that the tree has been compiled with gcc@13.1.0.
- Since bootstrap=True when executing the `spack install gcc` command, gcc 13.1.0 is compiled without problems even with older version of the C compilers.



7. Unloading gcc

To undo, execute the `spack unload` command.

```
$ spack unload gcc

$ gcc --version
gcc (GCC) 4.8.5 20150623 (Red Hat 4.8.5-44)
Copyright (C) 2015 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.


$ which gcc
/usr/bin/gcc
```

