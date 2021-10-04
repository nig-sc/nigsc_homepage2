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

遺伝研スパコンでmakeを並列化して高速化するには以下の例のように並列ジョブとして実行してください。

` qsub -cwd -V -pe def_slot 8 -b y make -j 8 `

***

追加すべきこと

- Rのバージョンを切り替える方法 : <= condaでいいか。R固有の方法が最近はあるのかな。でもcondaでいいや。どうせJupyter Notebookを使うだろうから。

- 特定のバージョンのパッケージを使いたい場合はbiocontainersを使ってください。=> biocontainersのRを使う方法の記載。

- ソフトウェア（およびデータベース）のアップデートの間隔 : Rはシステムにもインストールしているがこれをアップデートする間隔は？一年に一度じゃ仕方ないし、ちゃんとやったかのテストプログラムも必要。

 
 
参考:
 
configure時のCPPFLAGSなどの指定の仕方については以下を参考にした。
[Toby Dylan Hocking | Compiling R](https://tdhock.github.io/blog/2017/compiling-R/)

注意: 

make checkのところで

` running code in ‘reg-packages.R’ …make[3]: *** [reg-packages.Rout] Error 1 `

というエラーが出た。


[Fresh build from source of R-3.2.5 failing "make check"under 64-bit Ubuntu [SOLVED]](https://stat.ethz.ch/pipermail/r-devel/2016-April/072617.html)に同じ現象についての記述がありここではNFSマウントのせいであるとのことだが、この場合も同じかどうかはっきりしない。

