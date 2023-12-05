---
id: R
title: "R"
---

<table>
<td>
Only available on the CentOS 7 environment of the NIG supercomputer. It is not available on the Ubuntu Linux environment.
</td>
</table>

There are the following methods to use the version of R processing system required by each user on the shared computer.

1. Install and use R processing system from tarball.


## Installation method (1) Install it from tarball

### Installation procedure

The R processing system can be installed with user permission, so you can install the necessary version in your own home directory by yourself.

The R processing system will be installed under `$ HOME / local /` by executing the following.
For the latest source code of R, refer to [The Comprehensive R Archive Network](https://cran.ism.ac.jp/) etc..

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
(Also write the settings of these environment variables in `.bashrc`.)

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

