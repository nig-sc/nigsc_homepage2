---
id: use_spack
title: spack の使い方
---

Spack はユーザ権限で利用できるパッケージマネージャです。


参考資料

- [Spack 公式ホームページ](https://spack.readthedocs.io/en/latest/#)
- [Spack github リポジトリ](https://github.com/spack/spack)
- [Spack packages](https://spack.github.io/packages/) (spack で利用可能なパッケージの検索サイト)



## spack で利用可能なパッケージを表示する

### `spack list`, `spack info`コマンド

`spack list`コマンドにより利用可能なパッケージの一覧が表示できます。
（初回実行時のみ表示に時間がかかります。）

```
$ spack list | wc
   6348    6348   68228
```

`spack info`コマンドで利用可能なパッケージの詳細を表示することができます。

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


### "Spack packages" Web サイト

https://spack.github.io/packages/ Web サイトから spack で利用可能なパッケージを検索できます。

![](spack_220411.png)


## パッケージをインストールする

`spack install`コマンドでパッケージをインストールします。（アンインストールは`spack unintall`）

### 最も簡単な例

```
spack install tree
```

### バージョンの指定

バージョンを指定してインストールするには以下のようにします。

```
spack install -j 4 --fail-fast gcc@8.5.0
```

- `--fail-fast` : インストール時にコンパイルエラーなどが発生したらその時点で実行を終了する。
- `-j` : コンパイル時の並列数を指定する。

その他のオプションについては、`spack help install`の出力を参照して下さい。


### インストール時のコンパイル条件の指定

`spack info`コマンドの実行時に表示される Variants の項目を利用して、
インストール時のコンパイル条件を指定することができます。

```
spack install -j 4 --fail-fast gcc@8.5.0 binutils=True
```


## インストールしたパッケージを利用可能にする

`spack load`コマンドでインストールしたパッケージを利用可能にします。（`spack unload`でロードの解除）

これにより複数のバージョンを切り替えることができます。

```
spack load gcc@8.5.0
```


## 複数の同一パッケージをインストールしてしまった場合

例えば、emacs@27.2をすでに spack でインストールしてあるにも関わらずもう一度同じemacs@27.2を同一条件でインストールしてしまった場合、`spack load emacs`を実行した際などに以下のようなエラーが出ることがあります。

```
==> Error: emacs matches multiple packages.  Matching packages:    
xi4oeab emacs@27.2%gcc@8.5.0 arch=linux-centos7-zen    
7ck36ru emacs@27.2%gcc@8.5.0 arch=linux-centos7-zen  

Use a more specific spec.
```

このようなエラーが出る場合、一方は不要なので削除してください。

以下のコマンドにより、上記ハッシュ値を用いてアンインストールできます。

```
spack uninstall /7ck36ru
```
