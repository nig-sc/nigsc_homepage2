---
id: R
title: "R の使い方"
---


共用の計算機で各ユーザが必要とするバージョンの R 処理系を利用するには以下の方法があります。

1. tarball から R 処理系をインストールして利用する方法。



## インストール方法 (1) tarball からインストールする方法 {#install-R-from-tarball}

### インストール手順 {#installation-procedure}

tarball からの R 処理系のインストールはユーザー権限で可能です。
各自必要なバージョンを自分のホームディレクトリにインストールできます。

以下を実行することで`$HOME/local/`の下に R 処理系がインストールされます。
R の最新のソースコード(tarball)については[The Comprehensive R Archive Network](https://cran.ism.ac.jp/)などを参照してくだい。
 
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

遺伝研スパコンで make を並列化して高速化するには以下の例のように並列ジョブとして実行してください。
```
qsub -cwd -V -pe def_slot 8 -b y make -j 8
```

このようにしてインストールした R 処理系を実行するには、以下のようにして実行ファイルとライブラリのパスを通してから R を起動してください。
(`.bashrc`にもこれら環境変数の設定を書いておいてください。)

```bash
export PATH=$HOME/local/bin:$PATH
export LD_LIBRARY_PATH=$HOME/local/lib64/R/lib:$HOME/local/lib64:$LD_LIBRARY_PATH

# R 処理系の起動
R
```

### アンインストールの方法 {#uninstall-R}

1. パス(`PATH`および`LD_LIBRARY_PATH`環境変数)をもとに戻せば、ローカルインストールした R 処理系の存在 は無視されます。
2. tarball が展開されたソースコードのディレクトリから`make uninstall`すれば`make install`作業をもとに戻せます。
3. `rm -Rf $HOME/local`すれば完全に消去されます。

以下の FAQ もご参照ください。

- [FAQ:環境を初期状態に戻したい](/faq/faq_software#環境を初期状態に戻したい) 

