---
id: R
title: "R manual"
---

The R processor can be installed with user permission, so you should install the necessary version in your own home directory by yourself.

The latest version of R is often required to run R packages, so an example installation from tarball is shown below. For the latest source code of R, please refer to [The Comprehensive R Archive Network](https://cran.ism.ac.jp/) etc..

```
mkdir -p ~/local/src
cd ~/local/src

# Install PCRE2 (Perl-compatible regular expression library)
wget https://ftp.pcre.org/pub/pcre/pcre2-10.36.tar.gz
tar zxvf pcre2-10.36.tar.gz
cd pcre2-10.36
./configure --prefix=$HOME/local
make
make install
cd ~/local/src

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
make check
make install
														
```

If you need to run parallelize and speed up 'make' with NIG supercomputer, you should run it as a parallel job like the following example.

` qsub -cwd -V -pe def_slot 8 -b y make -j 8 `


