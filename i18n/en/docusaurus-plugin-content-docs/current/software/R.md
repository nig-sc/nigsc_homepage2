---
id: R
title: "R"
---


There are the following methods to use the version of R processing system required by each user on the shared computer.

1. Install and use R processing system from tarball.
2. Install and use R processing system using a package manager that can be used only with user permission.
3. Use R processing system using the Singularity container.

## Installation method (1) Install it from tarball

### Installation procedure

The R processing system can be installed with user permission, so you can install the necessary version in your own home directory by yourself.

The R processing system will be installed under `$ HOME / local /` by executing the following.
For the latest source code of R, please refer to [The Comprehensive R Archive Network](https://cran.ism.ac.jp/) etc..

```
mkdir -p ~/local/src
cd ~/local/src

# Install PCRE2 (Perl-compatible regular expression library)
wget https://github.com/PhilipHazel/pcre2/releases/download/pcre2-10.39/pcre2-10.39.tar.gz
tar zxvf pcre2-10.39.tar.gz
cd pcre2-10.39
./configure --prefix=$HOME/local
make
make install
cd ~/local/src

# Install libcurl
wget --no-check-certificate https://curl.se/download/curl-7.81.0.tar.gz
tar zxvf curl-7.81.0.tar.gz
cd curl-7.81.0
./configure --prefix=$HOME/local --with-openssl
make
make install
cd ~/local/src

export PKG_CONFIG_PATH=$HOME/local/src/pcre2-10.39:$HOME/local/src/curl-7.81.0

# Install R
R_VERSION=4.0.5
R_MAJOR=4
wget https://cran.ism.ac.jp/src/base/R-${R_MAJOR}/R-${R_VERSION}.tar.gz
tar xzvf R-${R_VERSION}.tar.gz
cd R-${R_VERSION}

CPPFLAGS=-I$HOME/local/include LDFLAGS="-L$HOME/local/lib -Wl,-rpath=$HOME/local/lib" \
        ./configure --prefix=$HOME/local \
        --with-cairo \
        --with-blas \
        --with-lapack \
        --x-includes=/usr/include/X11 \
        --x-libraries=/usr/lib/X11 \
        --enable-R-shlib

make
# make check
make install
```

If you need to run parallelize and speed up 'make' with the NIG supercomputer, you should execute it as a parallel job like the example below.

```
qsub -cwd -V -pe def_slot 8 -b y make -j 8
```

To execute the R processing system installed in this way, set paths of the executable file and library as follows and start R.
(Please also write the settings of these environment variables in `.bashrc`.)

```bash
export PATH=$HOME/local/bin:$PATH
export LD_LIBRARY_PATH=$HOME/local/lib64/R/lib:$HOME/local/lib64:$LD_LIBRARY_PATH

# starting the R processing system
R
```

### Uninstallation procedure

1. If you reset the paths (`PATH` and `LD_LIBRARY_PATH` environment variables), the existence of the locally installed R processing system will be ignored.
2. Execute `make uninstall` from the source code directory where the tarball was extracted to reset the `make install` process. 
3. Execute `rm -Rf $ HOME / local` to completely erased.


See also the FAQ below.

- [FAQ: Reset environment variables to its initial state](/faq/faq_software#環境を初期状態に戻したい) 



## Installation method (2) Use a package manager spack.

Spack is one of the package managers available with user permission.

### The Basic procedure

Install the spack package manager by [spacke itself installation procedure](/software/spack/install_spack) by following the steps below.

You can use the R processing system when executing the following command.

```
spack install r
spack load r
```

### Installation Details

#### Listing available packages

The package name of the R processing system is simply `r`, so you need to devise a creative way to search for available packages related to R.
You can list packages related to R using `spack list | grep ^r | less`.

```bash
$ spack list | grep ^r | less
r
r-a4
r-a4base
r-a4classif
r-a4core
r-a4preproc
r-a4reporting
r-abadata
r-abaenrichment
r-abind
... (以下略)
```

#### Listing available versions

Since the package name of the R processing system is `r`, you can list available R versions using `spack info r`.

```bash
$ spack info r
AutotoolsPackage:   r

Description:
    R is 'GNU S', a freely available language and environment for
    statistical computing and graphics which provides a wide variety of
    statistical and graphical techniques: linear and nonlinear modelling,
    statistical tests, time series analysis, classification, clustering,
    etc. Please consult the R project homepage for further information.

Homepage: https://www.r-project.org

Preferred version:  
    4.1.3    https://cloud.r-project.org/src/base/R-4/R-4.1.3.tar.gz

Safe versions:  
    4.1.3    https://cloud.r-project.org/src/base/R-4/R-4.1.3.tar.gz
    4.1.2    https://cloud.r-project.org/src/base/R-4/R-4.1.2.tar.gz
    4.1.1    https://cloud.r-project.org/src/base/R-4/R-4.1.1.tar.gz
    4.1.0    https://cloud.r-project.org/src/base/R-4/R-4.1.0.tar.gz
    4.0.5    https://cloud.r-project.org/src/base/R-4/R-4.0.5.tar.gz
    4.0.4    https://cloud.r-project.org/src/base/R-4/R-4.0.4.tar.gz
    4.0.3    https://cloud.r-project.org/src/base/R-4/R-4.0.3.tar.gz
    4.0.2    https://cloud.r-project.org/src/base/R-4/R-4.0.2.tar.gz
    4.0.1    https://cloud.r-project.org/src/base/R-4/R-4.0.1.tar.gz
    4.0.0    https://cloud.r-project.org/src/base/R-4/R-4.0.0.tar.gz
    3.6.3    https://cloud.r-project.org/src/base/R-3/R-3.6.3.tar.gz
    3.6.2    https://cloud.r-project.org/src/base/R-3/R-3.6.2.tar.gz
    3.6.1    https://cloud.r-project.org/src/base/R-3/R-3.6.1.tar.gz
    3.6.0    https://cloud.r-project.org/src/base/R-3/R-3.6.0.tar.gz
    3.5.3    https://cloud.r-project.org/src/base/R-3/R-3.5.3.tar.gz
    3.5.2    https://cloud.r-project.org/src/base/R-3/R-3.5.2.tar.gz
    3.5.1    https://cloud.r-project.org/src/base/R-3/R-3.5.1.tar.gz
    3.5.0    https://cloud.r-project.org/src/base/R-3/R-3.5.0.tar.gz
    3.4.4    https://cloud.r-project.org/src/base/R-3/R-3.4.4.tar.gz
    3.4.3    https://cloud.r-project.org/src/base/R-3/R-3.4.3.tar.gz
    3.4.2    https://cloud.r-project.org/src/base/R-3/R-3.4.2.tar.gz
    3.4.1    https://cloud.r-project.org/src/base/R-3/R-3.4.1.tar.gz
    3.4.0    https://cloud.r-project.org/src/base/R-3/R-3.4.0.tar.gz
    3.3.3    https://cloud.r-project.org/src/base/R-3/R-3.3.3.tar.gz
    3.3.2    https://cloud.r-project.org/src/base/R-3/R-3.3.2.tar.gz
    3.3.1    https://cloud.r-project.org/src/base/R-3/R-3.3.1.tar.gz
    3.3.0    https://cloud.r-project.org/src/base/R-3/R-3.3.0.tar.gz
    3.2.5    https://cloud.r-project.org/src/base/R-3/R-3.2.5.tar.gz
    3.2.3    https://cloud.r-project.org/src/base/R-3/R-3.2.3.tar.gz
    3.2.2    https://cloud.r-project.org/src/base/R-3/R-3.2.2.tar.gz
    3.2.1    htSince tions:  
    None

Variants:
    ======================    ====    ==============    ==================================================

    X [off]                   --      on, off           Enable X11 support (TCLTK, PNG, JPEG, TIFF, CAIRO)
    external-lapack [off]     --      on, off           Links to externally installed BLAS/LAPACK
    memory_profSince t   Build standalone Rmath library

Build Dependencies:
    blas   cairo  gnuconfig  icu4c  jpeg    libpng   libx11  libxt    pango  pcre2     tk  zlib
    bzip2  curl   harfbuzz   java   lapack  libtiff  libxmu  ncurses  pcre   readline  xz

Link Dependencies:
    blas   cairo  harfbuzz  java  lapack  libtiff  libxmu  ncurses  pcre   readline  xz
    bzip2  curl   icu4c     jpeg  libpng  libx11   libxt   pango    pcre2  tk        zlib

Run Dependencies:
    None
```

If you want to install a specific version, execute the command as follows.

```bash
spack install r@4.0.5
spack load r@4.0.5
```

#### Switching the R processing system version

Check the currently installed version.

```
$ spack find r
==> 2 installed packages
-- linux-centos7-zen2 / intel@2021.4.0 --------------------------
r@4.0.5  r@4.1.3

```

Execute `spack load` with the version you want to use. Then it will switch to that version.


```
$ spack load r@4.0.5
$ R

R version 4.0.5 (2021-03-31) -- "Shake and Throw"
Copyright (C) 2021 The R Foundation for Statistical Computing
Platform: x86_64-pc-linux-gnu (64-bit)

R is free software and comes with ABSOLUTELY NO WARRANTY.
You are welcome to redistribute it under certain conditions.
Type 'license()' or 'licence()' for distribution details.

  Natural language support but running in an English locale

R is a collaborative project with many contributors.
Type 'contributors()' for more information and
'citation()' on how to cite R or R packages in publications.

Type 'demo()' for some demos, 'help()' for on-line help, or
'help.start()' for an HTML browser interface to help.
Type 'q()' to quit R.

> q()
Save workspace image? [y/n/c]: n

$ spack load r@4.1.3
$ R

R version 4.1.3 (2022-03-10) -- "One Push-Up"
Copyright (C) 2022 The R Foundation for Statistical Computing
Platform: x86_64-pc-linux-gnu (64-bit)

R is free software and comes with ABSOLUTELY NO WARRANTY.
You are welcome to redistribute it under certain conditions.
Type 'license()' or 'licence()' for distribution details.

  Natural language support but running in an English locale

R is a collaborative project with many contributors.
Type 'contributors()' for more information and
'citation()' on how to cite R or R packages in publications.

Type 'demo()' for some demos, 'help()' for on-line help, or
'help.start()' for an HTML browser interface to help.
Type 'q()' to quit R.

> q()

$
```

#### Adjusting compile options

Looking at the Variants part of the `spack info r` above, by default, X window related libraries are not linked and the graph image output is not possible.

You can adjust the compile options by executing the following during `spack instal`. ( It will take quite time to compile.)

```bash
spack install r@4.0.5 X=True
```

### Uninstalling the package

To uninstall the package, execute this command line.

`spack uninstall r`

For how to uninstall spack, refer to [Installing spack](/software/spack/install_spack).

