---
id: R
title: "Rの使い方"
---

R処理系のインストールはユーザー権限で可能なので、各自必要なバージョンを自分のホームディレクトリにインストールしてください。

 
 
 Rのパッケージを動作させるためには最新のバージョンが必要となることが多いのでtarballからのインストール例を以下に示します。Rの最新のソースコードについては[The Comprehensive R Archive Network](https://cran.ism.ac.jp/)などを参照してください。

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

遺伝研スパコンでmakeを並列化して高速化するには以下の例のように並列ジョブとして実行してください。
```
qsub -cwd -V -pe def_slot 8 -b y make -j 8
```
