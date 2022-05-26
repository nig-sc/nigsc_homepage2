---
id: guix
title: How to use Guix
---

GNU Guix is a package manager available with user permission.

The package is installed at a high speed because it is distributed in binary format.

References:


- [GNU Guix Reference Manual](https://guix.gnu.org/manual/en/html_node/index.html) (The official manual)
- [Guix packages](https://guix.gnu.org/en/packages/) (Lists of available packages)
- [Install the GNU Guix package manager (PLCnext Technology)](https://www.plcnext-community.net/makersblog/install-the-gnu-guix-package-manager/) (Tutorial)
- [Reproducible Computation with Guix](https://guix.gnu.org/en/blog/2020/reproducible-computations-with-guix/) (design concept)
- [Guix-HPC](https://hpc.guix.info/about/)
    - Guix-HPC is an effort to optimize GNU Guix for reproducible scientific workflows in high-performance computing (HPC).
- [guix-bioinformatics](https://github.com/genenetwork/guix-bioinformatics)
- https://guix.gnu.org/en/blog/2018/paper-on-reproducible-bioinformatics-pipelines-with-guix/



## Preparing to use Guix

Write the following in `~/.bashrc`.

```
export GUIX_DAEMON_SOCKET=guix://at111
export GUIX_PROFILE="$HOME/.guix-profile"
source "$GUIX_PROFILE/etc/profile"
```

To set the locale to UTF-8, execute `guix install glibc-utf8-locales` and write the following in `~/.bashrc`.

```
export GUIX_LOCPATH="$HOME/.guix-profile/lib/locale"
```

## List available packages in Guix

search for packages by `guix search`

```bash
name: gcc-toolchain
version: 9.3.0
outputs: out debug static
systems: x86_64-linux i686-linux
dependencies: binutils@2.34 gcc@9.3.0 glibc@2.31 ld-wrapper@0
location: gnu/packages/commencement.scm:3856:4
homepage: https://gcc.gnu.org/
license: GPL 3+
synopsis: Complete GCC tool chain for C/C++ development  
description: This package provides a complete GCC tool chain for C/C++ development to be installed in user profiles.  This
+ includes GCC, as well as libc (headers and binaries, plus debugging symbols in the `debug' output), and Binutils.  GCC is
+ the GNU Compiler Collection.
relevance: 13

name: gcc-toolchain
version: 8.4.0
outputs: out debug static
systems: x86_64-linux i686-linux
dependencies: binutils@2.34 gcc@8.4.0 glibc@2.31 ld-wrapper@0
location: gnu/packages/commencement.scm:3856:4
homepage: https://gcc.gnu.org/
license: GPL 3+
synopsis: Complete GCC tool chain for C/C++ development  

...
```

- On the <a href="https://guix.gnu.org/en/packages/">Guix packages</a> website, there are available packages lists.

![](2022-04-30_15-22.png)

In addition, there are the following websites related to bioinformatics.

- [guix-bioinformatics](https://github.com/genenetwork/guix-bioinformatics)
- https://guix.gnu.org/en/blog/2018/paper-on-reproducible-bioinformatics-pipelines-with-guix/


## Install packages

Install packages by the `guix install` command.


For example, to install gcc version 10 series, execute the following.

```bash
guix install gcc-toolchain@10
```

When you change the version of gcc to 8 series, just redo `guix install`.

```bash
guix install gcc-toolchain@8
```

This will switch the version of gcc used.