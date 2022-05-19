---
id: R
title: "R の使い方"
---


共用の計算機で各ユーザが必要とするバージョンの R 処理系を利用するには以下の方法があります。

1. tarball から R 処理系をインストールして利用する方法。
2. ユーザ権限だけで使えるパッケージマネージャを利用して R 処理系をインストールし利用する方法
3. Singularity コンテナを利用して R 処理系を利用する方法


## インストール方法 (1) tarball からインストールする方法

### インストール手順

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

### アンインストールの方法

1. パス(`PATH`および`LD_LIBRARY_PATH`環境変数)をもとに戻せば、ローカルインストールした R 処理系の存在 は無視されます。
2. tarball が展開されたソースコードのディレクトリから`make uninstall`すれば`make install`作業をもとに戻せます。
3. `rm -Rf $HOME/local`すれば完全に消去されます。

以下の FAQ もご参照ください。

- [FAQ:環境を初期状態に戻したい](/faq/faq_software#環境を初期状態に戻したい) 

## インストール方法(2) パッケージマネージャ spack を用いる方法

### 基本的な手順

[spacke の使い方](/software/spack)の手順に従って spack パッケージマネージャをインストールしてください。

以下のコマンドを実行すると R 処理系が使えるようになります。

```
spack install r
spack load r
```

### インストール方法の詳細

#### 利用可能なパッケージの表示

R 処理系はパッケージ名も単に`r`なので、R関係の利用可能なパッケージの検索に工夫がいります。
`spack list | grep ^r | less`を実行することで R 関連のパッケージを表示できます。

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

#### 利用可能なバージョンの表示

R 処理系本体のパッケージ名は`r`ですので`spack info r`を実行すると利用可能な R のバージョンを表示できます。

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
    3.2.1    https://cloud.r-project.org/src/base/R-3/R-3.2.1.tar.gz
    3.2.0    https://cloud.r-project.org/src/base/R-3/R-3.2.0.tar.gz
    3.1.3    https://cloud.r-project.org/src/base/R-3/R-3.1.3.tar.gz
    3.1.2    https://cloud.r-project.org/src/base/R-3/R-3.1.2.tar.gz

Deprecated versions:  
    None

Variants:
    ======================    ====    ==============    ==================================================

    X [off]                   --      on, off           Enable X11 support (TCLTK, PNG, JPEG, TIFF, CAIRO)
    external-lapack [off]     --      on, off           Links to externally installed BLAS/LAPACK
    memory_profiling [off]    --      on, off           Enable memory profiling
    rmath [off]               --      on, off           Build standalone Rmath library

Build Dependencies:
    blas   cairo  gnuconfig  icu4c  jpeg    libpng   libx11  libxt    pango  pcre2     tk  zlib
    bzip2  curl   harfbuzz   java   lapack  libtiff  libxmu  ncurses  pcre   readline  xz

Link Dependencies:
    blas   cairo  harfbuzz  java  lapack  libtiff  libxmu  ncurses  pcre   readline  xz
    bzip2  curl   icu4c     jpeg  libpng  libx11   libxt   pango    pcre2  tk        zlib

Run Dependencies:
    None
```

特定のバージョンをインストールしたい場合は以下のようにコマンドを実行します。

```bash
spack install r@4.0.5
spack load r@4.0.5
```

#### R 処理系のバージョン切り替え

現在インストールされているバージョンを確認します。

```
$ spack find r
==> 2 installed packages
-- linux-centos7-zen2 / intel@2021.4.0 --------------------------
r@4.0.5  r@4.1.3

```

使いたいバージョンを`spack load`すればそのバージョンに切り替わります。

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

#### コンパイルオプションの調整

上記の`spack info r`の Variants の部分を見ると、デフォルトの状態では X window 関係のライブラリがリンクされておらず、グラフの画像出力ができない状態であることがわかります。

`spack instal`の際に以下のようにすることでコンパイルオプションを調整できます。(コンパイル時間はかなりかかるようになります。)

```bash
spack install r@4.0.5 X=True
```

### アンインストール

以下のコマンドでパッケージのアンインストールができます。

`spack uninstall r`

spack 自体のアンインストールについては[spack の使い方](/software/spack)をご参照ください。
