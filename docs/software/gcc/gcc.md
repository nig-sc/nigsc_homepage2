---
id: gcc
title: "C/C++ の使い方(GCC: GNU Compiler Collection)"
---


## GCC バージョン:   C 言語標準、C++言語標準への対応状況

GCC の各バージョンと、デフォルト状態での準拠言語仕様は以下のとおりです。
(オプションを付けることにより準拠する標準は変えることができます。詳細は各バージョンのマニュアルをご参照ください。)

| バージョン | C 言語標準 | C++言語標準 | 初回リリース年 | URL                                                        |
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


参考資料

- [GCC Releases | gcc.gnu.org](https://gcc.gnu.org/releases.html)





## GCC のバージョンについて  (CentOS 7 の場合)

遺伝研スパコンの CentOS 7 のシステムでは
- CentOS 7 付属の rpm パッケージは GCC ver.4.8 系です。
- Bright Cluster Manager (BCM) 付属の[Environmentl modules](/software/environmental_modules) を使って GCC ver.8, ver.9 が提供されています。
    - BCM は計算機クラスタを構成する個々の計算機に OS 等をデプロイするためのシステムです。[BCM 公式ページ](https://www.nvidia.com/en-us/data-center/bright-cluster-manager/)。
    - Environmental modules 自体の説明については[「利用案内 => ソフトウェア => Environmental Modules」](/software/environmental_modules)のページをご参照ください。
- [spack パッケージマネージャ](/software/spack/install_spack)を使って GCC のインストールおよび GCC のバージョン変更ができます。この場合は GCC をソースコードからコンパイルするので少し時間がかかります。
    - spack 自体の説明については[「利用案内 => ソフトウェア => spack」](/software/spack/install_spack)のページをご参照ください。


## GCC のバージョンを切り替える方法 (Ubuntu Linux の場合)

- Ubuntu Linux 22.04 付属の deb パッケージは GCC 12 系です。
- [spack パッケージマネージャ](/software/spack/install_spack)を使って GCC のインストールおよび GCC のバージョン変更ができます。この場合は GCC をソースコードからコンパイルするので少し時間がかかります。
    - spack 自体の説明については[「利用案内 => ソフトウェア => spack」](/software/spack/install_spack)のページをご参照ください。

## Environmental Modules による GCC のロード

1, 現在自分の環境で利用可能になっている GCC のバージョンを確認します。

```
$ which gcc
/usr/bin/gcc

$ gcc --version
gcc (GCC) 4.8.5 20150623 (Red Hat 4.8.5-44)
Copyright (C) 2015 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

```

2, `module avail`コマンドにより、Environmental modules で利用可能な GCC を探します。

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

- 遺伝研スパコンでは`gcc/9.2.0`と`gcc/8.2.0`が見つかります。

3, `module load`コマンドで、`gcc`をロードし使えるようにします。

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

4, 元に戻すには`module unload`します。

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


## Spack による GCC のインストール


1, 現在自分の環境で利用可能になっている GCC のバージョンを確認します。

```
$ which gcc
/usr/bin/gcc

$ gcc --version
gcc (GCC) 4.8.5 20150623 (Red Hat 4.8.5-44)
Copyright (C) 2015 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

```


2, `spack info`コマンドで、利用可能な GCC のバージョンおよびコンパイルオプションを確認します。

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


3, `spack install`コマンドで gcc 自体をコンパイルし、インストールします。

Preferred version に合わせる場合、バージョンは省略できます。

```
spack install -j 8 gcc@13.1.0 binutils=True bootstrap=True
```

- この例では 1,で現在自分の環境で利用になっている gcc (ver.4.8.5)を使って spack の gcc(ver.13.1.0)をコンパイルした後、コンパイルされてできた spack の gcc ver.13.0.1 を使って spack の gcc ver.13.0.1 をコンパイルしています。(`bootstrap=True`)


他のバージョンをインストールする場合はバージョンを明記します。


```
spack install -j 8 gcc@12.3.0 binutils=True bootstrap=True
```


4, `spack load`コマンドで、インストールした gcc をロードし、使えるようにします。

利用可能なバージョンは`spack find`で見つけることができます。

```
$ spack find gcc
-- linux-centos7-x86_64_v3 / gcc@4.8.5 --------------------------
gcc@13.1.0
==> 1 installed package
```

spack でインストールした GCC を利用するには`spack load`コマンドを実行します。

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

元に戻すには`spack unload`します。

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
