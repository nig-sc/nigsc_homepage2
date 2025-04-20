---
id: use_spack
title: How to use spack
---

Spack is a package manager available with user permission.

References:

- [Spack Official Web Site](https://spack.readthedocs.io/en/latest/#)
- [Spack github repository](https://github.com/spack/spack)
- [Spack packages](https://spack.github.io/packages/) (search site for packages available in spack)


## List available packages

### The `spack list` and `spack info` comannd {#spacklist-spackinfo-command}

list available packages by `spack list`
（It takes time to list only the first time when it is executed.）

```
$ spack list | wc
   6348    6348   68228
```

You can list the detailes of available packages using `spack info`.

```
$ spack info gcc
AutotoolsPackage:   gcc

Description:
    The GNU Compiler Collection includes front ends for C, C++, Objective-C,
    Fortran, Ada, and Go, as well as libraries for these languages.

Homepage: https://gcc.gnu.org

Preferred version:  
    11.2.0    https://ftpmirror.gnu.org/gcc/gcc-11.2.0/gcc-11.2.0.tar.xz

Safe versions:  
    master    [git] git://gcc.gnu.org/git/gcc.git on branch master
    11.2.0    https://ftpmirror.gnu.org/gcc/gcc-11.2.0/gcc-11.2.0.tar.xz
    11.1.0    https://ftpmirror.gnu.org/gcc/gcc-11.1.0/gcc-11.1.0.tar.xz
    10.3.0    https://ftpmirror.gnu.org/gcc/gcc-10.3.0/gcc-10.3.0.tar.xz
    10.2.0    https://ftpmirror.gnu.org/gcc/gcc-10.2.0/gcc-10.2.0.tar.xz
    10.1.0    https://ftpmirror.gnu.org/gcc/gcc-10.1.0/gcc-10.1.0.tar.xz
    9.4.0     https://ftpmirror.gnu.org/gcc/gcc-9.4.0/gcc-9.4.0.tar.xz
    9.3.0     https://ftpmirror.gnu.org/gcc/gcc-9.3.0/gcc-9.3.0.tar.xz
    9.2.0     https://ftpmirror.gnu.org/gcc/gcc-9.2.0/gcc-9.2.0.tar.xz
    9.1.0     https://ftpmirror.gnu.org/gcc/gcc-9.1.0/gcc-9.1.0.tar.xz
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
    Name [Default]               When    Allowed values          Description
    =========================    ====    ====================    ===================================================

    binutils [off]               --      on, off                 Build via binutils
    bootstrap [on]               --      on, off                 Enable 3-stage bootstrap
    graphite [off]               --      on, off                 Enable Graphite loop optimizations (requires ISL)
    languages [c,c++,fortran]    --      ada, brig, c, c++,      Compilers and runtime libraries to build
                                         fortran, go, java,      
                                         jit, lto, objc,         
                                         obj-c++                 
    nvptx [off]                  --      on, off                 Target nvptx offloading to NVIDIA GPUs
    piclibs [off]                --      on, off                 Build PIC versions of libgfortran.a and libstdc++.a
    strip [off]                  --      on, off                 Strip executables to reduce installation size

Build Dependencies:
    autoconf  automake  binutils  cuda  diffutils  flex  gawk  gmp  gnat  gnuconfig  iconv  isl  libtool  m4  mpc  mpfr  texinfo  zip  zlib  zstd

Link Dependencies:
    binutils  cuda  gmp  gnat  iconv  isl  mpc  mpfr  zlib  zstd

Run Dependencies:
    binutils

```


### the "Spack packages" website {#website-spack-packages}

On the "<a href="https://spack.github.io/packages/">Spack packages</a>" website, you can search for available packages in spack.

![](spack_220411.png)


# Installing spack packages

Install packages by `spack install`

Uninstall packages by `spack unintall`

### The simplest example

```
spack install tree
```

### Specify version

Install a specified version with optional arguments


```
spack install -j 4 --fail-fast gcc@8.5.0
```

- `--fail-fast` : stop all builds if any build fails 
- `-j` : explicitly set number of parallel jobs

Show help for other commands using `spack help install`.

### Specify compile conditions for installation

You can specify the compile conditions for the installation by using Variants items listed detailed information on a particular package `spack info` command. 


```
spack install -j 4 --fail-fast gcc@8.5.0 binutils=True
```

## Make installed packages available {#make-available-packages}

Make installed packages available by `spack load` command.

Unload by `spack unload` command.


You can switch between multiple versions by `spack load` command.

```
spack load gcc@8.5.0
```


## Solution to install multiple same packages {#solution-multi-same-package}

For example, if Emacs@27.2 has already been installed on Spack, the following error will occur when `Spack Load Emacs` is executed in the same condition, etc. You may.

For example, if Emacs@27.2 has already been installed with spack, but the same Emacs@27.2 is installed again under the same conditions, you may receive the following error when executing `spack load emacs`.

```
==> Error: emacs matches multiple packages.  Matching packages:    
xi4oeab emacs@27.2%gcc@8.5.0 arch=linux-centos7-zen    
7ck36ru emacs@27.2%gcc@8.5.0 arch=linux-centos7-zen  

Use a more specific spec.
```

If you receive such an error, one of them is not needed and should be removed.

To uninstall, execute the following command with the hash value above.

```
spack uninstall /7ck36ru
```
