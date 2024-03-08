---
id: R
title: "Rの使い方"
---

この記事では、遺伝研スパコン上でのR環境のユーザ環境へのインストール方法、パッケージ管理の利用方法について説明します。
以下の項目について説明します。

1. [OSディストリビューション付属のRを使う方法](/software/R#osディストリビューション付属のrを使う方法)
2. [ソースコードからRをビルドしてユーザ環境にインストールする方法](/software/R#tarball-からrをインストールする方法)
3. [condaでRをインストールする方法](/software/R#condaでrをインストールする方法)
4. [renv を利用したR分析環境の管理](/software/R#renv-を利用したr分析環境の管理)
5. [パッケージマネージャspackを用いる方法](/software/R#パッケージマネージャ-spack-を用いる方法)

について説明します。


## OSディストリビューション付属のRを使う方法

ubuntu22.04を導入している計算ノードでは、Ubuntu22.04付属のRをインストール済みです。
Rとコマンドを入力すればR環境が立ち上がりますので、ご利用ください。

```
username@at138:~$ R

R version 4.1.2 (2021-11-01) -- "Bird Hippie"
Copyright (C) 2021 The R Foundation for Statistical Computing
Platform: x86_64-pc-linux-gnu (64-bit)

R is free software and comes with ABSOLUTELY NO WARRANTY.
You are welcome to redistribute it under certain conditions.
Type 'license()' or 'licence()' for distribution details.

R is a collaborative project with many contributors.
Type 'contributors()' for more information and
'citation()' on how to cite R or R packages in publications.

Type 'demo()' for some demos, 'help()' for on-line help, or
'help.start()' for an HTML browser interface to help.
Type 'q()' to quit R.

> 
```
2024年2月現在、インストールされているRのバージョンは4.1.2(2021-11-01)になります。

## tarball からRをインストールする方法

R Networkからソースコードをダウンロードしてビルド、ユーザホームディレクトリ下にインストールして利用する方法です。
以下を実行することで`$HOME/local/`の下に R 処理系がインストールされます。
R の最新のソースコード(tarball)については[The Comprehensive R Archive Network](https://cran.ism.ac.jp/)などを参照してくだい。
 
```
mkdir -p ~/local/src
cd ~/local/src
# Install R
R_VERSION=4.3.2
R_MAJOR=4
wget https://cran.ism.ac.jp/src/base/R-${R_MAJOR}/R-${R_VERSION}.tar.gz
tar xzvf R-${R_VERSION}.tar.gz
cd R-${R_VERSION}

./configure --prefix=$HOME/local
make
make install
```

## condaでRをインストールする方法

ここでは、minicondaを利用して、R環境をインストールする手順について説明します。
miniconda自体のインストール方法については、[「pythonの使い方」内のMiniconda](/software/python#miniconda)を参照してください。


minicondaをインストールして、condaコマンドが利用可能になったら、以下のコマンド群を投入します。

condaの場合、Rの複数のバージョン毎に仮想環境を作成して切り替えて使い分けるというような利用方法が可能になります。

以下のコマンドでチャネル上で使用可能なRのバージョンを確認します。
```
conda search -c conda-forge r-base
```

以下のように利用可能なバージョン群が表示されます。

```
yxxxx@at139:~$ conda search -c conda-forge r-base                                               
Loading channels: done                                                                          
# Name                       Version           Build  Channel                                   
r-base                         3.3.1               1  pkgs/r        

(中略)
            
r-base                         4.3.2      hb8ee39d_1  conda-forge         
r-base                         4.3.2      hb8ee39d_2  conda-forge         
```
利用したいRのバージョンの環境を作成します。

R-4.3.2という名前でR環境を作成します。ここでは4.3.2は単に例で、ユーザが利用したいバージョンを指定してください。

```
xxxx@at139:~$ conda create -n R-4.3.2 -y -c conda-forge r-base=4.3.2

Looking for: ['r-base=4.3.2']

(中略)

conda-forge/linux-64                                32.4MB @  48.6MB/s  0.7s
Transaction

  Prefix: /home/xxxx/miniconda3/envs/R-4.3.2

  Updating specs:

   - r-base=4.3.2


  Package                           Version  Build                Channel           Size
──────────────────────────────────────────────────────────────────────────────────────────
  Install:
──────────────────────────────────────────────────────────────────────────────────────────

  + font-ttf-dejavu-sans-mono          2.37  hab24e00_0           conda-forge      397kB
  + font-ttf-inconsolata              3.000  h77eed37_0           conda-forge       97kB

  (中略)

  + r-base                            4.3.2  hb8ee39d_2           conda-forge       26MB

  Summary:

  Install: 88 packages

  Total download: 184MB

──────────────────────────────────────────────────────────────────────────────────────────


font-ttf-inconsolata                                96.5kB @   1.0MB/s  0.1s
（中略）
libstdcxx-devel_linux-64                            13.0MB @   8.5MB/s  0.4s
sysroot_linux-64                                    15.3MB @   9.7MB/s  0.3s
binutils_impl_linux-64                               5.4MB @   3.1MB/s  0.3s

Downloading and Extracting Packages:

Preparing transaction: done
Verifying transaction: done
Executing transaction: done

To activate this environment, use

     $ conda activate R-4.3.2

To deactivate an active environment, use

     $ conda deactivate


```

r-base=4.3.2 という記述がバージョンを指定してインストールすることを意味します。

Rの環境をactivateします。
```
conda activate R-4.3.2

```
プロンプトに(R-4.3.2)という文字が付加されることを確認します。r-essentialsを追加インストールします。

```
conda install -c conda-forge r-essentials
```

インストールが開始されます。反応に時間がかかります。


```
Channels:
 - conda-forge
 - defaults
Platform: linux-64
Collecting package metadata (repodata.json): done
Solving environment: done

## Package Plan ##

  environment location: /home/yxxxx/miniconda3/envs/R-4.3.2

  added / updated specs:
    - r-essentials


The following packages will be downloaded:

    package                    |            build
    ---------------------------|-----------------
    anyio-4.2.0                |     pyhd8ed1ab_0          99 KB  conda-forge

　　（中略）

    zipp-3.17.0                |     pyhd8ed1ab_0          19 KB  conda-forge
    ------------------------------------------------------------
                                           Total:       202.4 MB

The following NEW packages will be INSTALLED:

  anyio              conda-forge/noarch::anyio-4.2.0-pyhd8ed1ab_0 

　　(中略)

  zipp               conda-forge/noarch::zipp-3.17.0-pyhd8ed1ab_0 

```
進めるかを確認されるので、yを入力します。

```

Proceed ([y]/n)? y

```

インストールが開始されます。

```

Downloading and Extracting Packages:
                                                                                                
Preparing transaction: done                                                                     
Verifying transaction: done                                                                     
Executing transaction: done  
(R-4.3.2) xxxx@at137:~$   

```
プロンプトが返ってきたら、R(4.3.2)が起動することを確認します。

```
(R-4.3.2) xxxx@at137:~$ R                                                                      
                                                                                                
R version 4.3.2 (2023-10-31) -- "Eye Holes"                                                     
Copyright (C) 2023 The R Foundation for Statistical Computing                                   
Platform: x86_64-conda-linux-gnu (64-bit)                                                       
                                                                                                
R is free software and comes with ABSOLUTELY NO WARRANTY.                                       
You are welcome to redistribute it under certain conditions.                                    
Type 'license()' or 'licence()' for distribution details.                                       
                                                                                                
R is a collaborative project with many contributors.                                            
Type 'contributors()' for more information and                                                  
'citation()' on how to cite R or R packages in publications.                                    
                                                                                                
Type 'demo()' for some demos, 'help()' for on-line help, or                                     
'help.start()' for an HTML browser interface to help.                                           
Type 'q()' to quit R.                                                                           
                                                                                                
>     

```

R環境から抜ける場合は、q()を入力します。

```
q()
```

condaの仮想環境から抜けるには、conda deactivate を実行します。

```
conda deactivate
```
通常のシェル環境に戻ります。
仮想環境に多重に入っている場合は、シェルに抜けるまで、conda deactivateを実行してください。

一回、Rの仮想環境をインストールした後、次回以降は

```
conda env list

```
で以前作成した仮想環境のリストを確認して、activateしたい仮想環境を conda activateして、Rを起動してください。

conda環境でのサブコマンドについては、開発元の以下のドキュメントを参照してください。

[condaのコマンド一覧](https://conda.io/projects/conda/en/latest/commands/index.html)

Rの仮想環境がインストールできましたら、R上のパッケージ管理は、以下のrenvを利用してください。

## renv を利用したR分析環境の管理

renvは、[posit](https://posit.co/)が開発支援しているRのパッケージ管理の為のオープンソースパッケージです。Rでの分析環境の再現性を担保することを目的として開発されています。

- renvのgithubのページ  https://rstudio.github.io/renv/
- renv利用のGettiing Started    https://rstudio.github.io/renv/articles/renv.html
- renvの関数リファレンス　https://rstudio.github.io/renv/reference/index.html

R環境上でのrenvを利用した解析作業の流れは以下のようになります。

1. renv::init()を実行する。
2. Rコードを書く。必要なパッケージをrenvを使ってインストールする。
3. 作業過程でrenv::snapshot()を適宜行う。ロックファイルに保存する。
4. 分析作業を終えたら、renv::snapshot()をして、編集したファイルとrenv/とrenv.lockファイルを外部リポジトリにgit commitして保存する。

この作業手順により解析環境をリポジトリに保存しながら、解析環境を再現することが可能になります。以下にrenvの各関数とシステムライブラリ、プロジェクトライブラリ、ロックファイルの関係を纏めた図を示します。


![figure](renv.png)

主なrenv関数は以下のようになります。

|renv関数|意味|オンラインマニュアル|
|------------|----|------------------|
|renv::init()|パッケージ管理開始(ホームディレクトリ直下では無く、作業用ディレクトリを作成して作業用ディレクトリ上で実行する。そうでないとエラーになる場合がある) |[renv::init](https://rstudio.github.io/renv/reference/init.html)|
|renv::install()|パッケージインストール|[renv::install](https://rstudio.github.io/renv/reference/install.html)|
|renv::status()|インストール状況確認コマンド|[renv::status](https://rstudio.github.io/renv/reference/status.html)|
|renv::snapshot()|インストール状況記録|[renv::snapshot](https://rstudio.github.io/renv/reference/snapshot.html)|
|renv::restore()|renv.lockファイルから状態を再現する|[renv::restore](https://rstudio.github.io/renv/reference/restore.html)|
|renv::history()|コミット履歴の参照|[renv::history](https://rstudio.github.io/renv/reference/history.html)|
|renv::revert()|histroyのcommit履歴を用いてrenv.lockを復旧する|[renv::revert](https://rstudio.github.io/renv/reference/history.html)|
|renv::update()|プロジェクトライブラリをアップデートする|[renv::update](https://rstudio.github.io/renv/reference/update.html)|



### renvのインストール

R環境でrenvパッケージをインストールするには以下のようにします。

```
> install.packages("renv")
Installing package into ‘/home/yxxxx/R/x86_64-pc-linux-gnu-library/4.3’
(as ‘lib’ is unspecified)
trying URL 'https://p3m.dev/cran/__linux__/jammy/latest/src/contrib/renv_1.0.4.tar.gz'
Content type 'binary/octet-stream' length 2102571 bytes (2.0 MB)
==================================================
downloaded 2.0 MB

* installing *binary* package ‘renv’ ...
* DONE (renv)

The downloaded source packages are in
	‘/tmp/Rtmp6nfjdw/downloaded_packages’

>
```

renvパッケージを呼び出して利用可能にします。

```
> library(renv)

Attaching package: ‘renv’

The following objects are masked from ‘package:stats’:

    embed, update

The following objects are masked from ‘package:utils’:

    history, upgrade

The following objects are masked from ‘package:base’:

    autoload, load, remove

> 

```

 インストールされたrenvのバージョンを確認します。

```
> print(packageVersion("renv"))
[1] ‘1.0.4’
> 
```
上記の流れでrenvパッケージが適用されました。



### 実行例

以下は、RStudio Serverのコンソール上での実行例です。プロジェクトはrenv-testという名称で作成しています。ホームディレクトリ直下でrenv::init()を
実行するとエラーになりますので、プロジェクトを作成してからプロジェクトディレクトリの中でinitを実施してください。

```
> renv::init()
The following package(s) will be updated in the lockfile:

# RSPM -----------------------------------------------------------------------
- renv   [* -> 1.0.4]

The version of R recorded in the lockfile will be updated:
- R      [* -> 4.3.2]

- Lockfile written to "~/renv-test/renv.lock".

Restarting R session...

- Project '~/renv-test' loaded. [renv 1.0.4]
```

パッケージをインストールしてみます。

```
> install.packages("tidyr")
# Downloading packages -------------------------------------------------------
- Downloading tidyr from CRAN ...               OK [1.1 Mb in 1.3s]
- Downloading cli from CRAN ...                 OK [1.2 Mb in 0.96s]
- Downloading dplyr from CRAN ...               OK [1.4 Mb in 1.0s]
- Downloading generics from CRAN ...            OK [74.5 Kb in 0.93s]
- Downloading glue from CRAN ...                OK [146.4 Kb in 0.96s]
- Downloading lifecycle from CRAN ...           OK [120.5 Kb in 0.93s]
- Downloading rlang from CRAN ...               OK [1.5 Mb in 1.1s]
- Downloading magrittr from CRAN ...            OK [215.9 Kb in 0.93s]
- Downloading pillar from CRAN ...              OK [631.4 Kb in 0.97s]
- Downloading fansi from CRAN ...               OK [300.6 Kb in 1.1s]
- Downloading utf8 from CRAN ...                OK [143.4 Kb in 0.94s]
- Downloading vctrs from CRAN ...               OK [1.2 Mb in 0.94s]
- Downloading R6 from CRAN ...                  OK [80.6 Kb in 0.97s]
- Downloading tibble from CRAN ...              OK [656.1 Kb in 0.95s]
- Downloading pkgconfig from CRAN ...           OK [17.2 Kb in 1.0s]
- Downloading tidyselect from CRAN ...          OK [214.8 Kb in 0.93s]
- Downloading withr from CRAN ...               OK [232.4 Kb in 0.93s]
- Downloading purrr from CRAN ...               OK [477.1 Kb in 0.97s]
- Downloading stringr from CRAN ...             OK [298.1 Kb in 0.97s]
- Downloading stringi from CRAN ...             OK [3.1 Mb in 0.96s]
- Downloading cpp11 from CRAN ...               OK [273.7 Kb in 0.94s]
Successfully downloaded 21 packages in 26 seconds.

The following package(s) will be installed:
- cli        [3.6.2]
- cpp11      [0.4.7]
- dplyr      [1.1.4]
- fansi      [1.0.6]
- generics   [0.1.3]
- glue       [1.7.0]
- lifecycle  [1.0.4]
- magrittr   [2.0.3]
- pillar     [1.9.0]
- pkgconfig  [2.0.3]
- purrr      [1.0.2]
- R6         [2.5.1]
- rlang      [1.1.3]
- stringi    [1.8.3]
- stringr    [1.5.1]
- tibble     [3.2.1]
- tidyr      [1.3.1]
- tidyselect [1.2.0]
- utf8       [1.2.4]
- vctrs      [0.6.5]
- withr      [3.0.0]
These packages will be installed into "~/renv-test/renv/library/R-4.3/x86_64-pc-linux-gnu".

Do you want to proceed? [Y/n]: y

```
yと入力します。

```
# Installing packages --------------------------------------------------------
- Installing cli ...                            OK [installed binary and cached in 1.3s]
- Installing generics ...                       OK [installed binary and cached in 0.56s]
- Installing glue ...                           OK [installed binary and cached in 0.89s]
- Installing rlang ...                          OK [installed binary and cached in 1.4s]
- Installing lifecycle ...                      OK [installed binary and cached in 1.2s]
- Installing magrittr ...                       OK [installed binary and cached in 0.97s]
- Installing fansi ...                          OK [installed binary and cached in 0.92s]
- Installing utf8 ...                           OK [installed binary and cached in 0.7s]
- Installing vctrs ...                          OK [installed binary and cached in 1.4s]
- Installing pillar ...                         OK [installed binary and cached in 1.5s]
- Installing R6 ...                             OK [installed binary and cached in 0.7s]
- Installing pkgconfig ...                      OK [installed binary and cached in 0.64s]
- Installing tibble ...                         OK [installed binary and cached in 1.7s]
- Installing withr ...                          OK [installed binary and cached in 0.87s]
- Installing tidyselect ...                     OK [installed binary and cached in 0.95s]
- Installing dplyr ...                          OK [installed binary and cached in 1.9s]
- Installing purrr ...                          OK [installed binary and cached in 0.99s]
- Installing stringi ...                        OK [installed binary and cached in 0.96s]
- Installing stringr ...                        OK [installed binary and cached in 1.4s]
- Installing cpp11 ...                          OK [installed binary and cached in 1.2s]
- Installing tidyr ...                          OK [installed binary and cached in 1.6s]
Successfully installed 21 packages in 25 seconds.

```
パッケージがインストールされました。ここで、Rのコード編集作業を行います。終わったら、renv::snapshot()を実行します。
```
> renv::snapshot()
The following package(s) will be updated in the lockfile:

# CRAN -----------------------------------------------------------------------
- cli          [* -> 3.6.2]
- cpp11        [* -> 0.4.7]
- dplyr        [* -> 1.1.4]
- fansi        [* -> 1.0.6]
- generics     [* -> 0.1.3]
- glue         [* -> 1.7.0]
- lifecycle    [* -> 1.0.4]
- magrittr     [* -> 2.0.3]
- pillar       [* -> 1.9.0]
- pkgconfig    [* -> 2.0.3]
- purrr        [* -> 1.0.2]
- R6           [* -> 2.5.1]
- rlang        [* -> 1.1.3]
- stringi      [* -> 1.8.3]
- stringr      [* -> 1.5.1]
- tibble       [* -> 3.2.1]
- tidyr        [* -> 1.3.1]
- tidyselect   [* -> 1.2.0]
- utf8         [* -> 1.2.4]
- vctrs        [* -> 0.6.5]
- withr        [* -> 3.0.0]

Do you want to proceed? [Y/n]: 
```
yと入力します。
```
- Lockfile written to "~/renv-test/renv.lock".
> 
```
ロックファイルに書き込まれます。このrenv.lockファイルをgitリポジトリなどで管理すれば
他のホストや他のプロジェクトフォルダ上でrenv::restore()でライブラリ環境を復元する
ことが可能になります。

## パッケージマネージャ spack を用いる方法

spack はユーザー権限だけで使えるパッケージマネージャの１つです。

### 基本的な手順

[spacke 自体のインストール手順](/software/spack/install_spack)の手順に従って spack パッケージマネージャをインストールしてください。

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

spack 自体のアンインストールについては[spack 自体のインストール手順](/software/spack/install_spack)をご参照ください。