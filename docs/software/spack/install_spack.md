---
id: install_spack
title: spack 自体のインストール手順
---

Spack はユーザ権限で利用できるパッケージマネージャです。

例えば以下のような簡単なコマンドで、様々なパッケージをバージョン指定付きでインストールし使用することができます。

```
spack install r@4.0.5
spack load r@4.0.5
```

参考資料

- [Spack 公式ホームページ](https://spack.readthedocs.io/en/latest/#)
- [Spack github リポジトリ](https://github.com/spack/spack)
- [Spack packages](https://spack.github.io/packages/) (spack で利用可能なパッケージの検索サイト)


## spack のインストール手順概要

spack 自体をインストールするには以下の手順が必要です。

1. spack システムの入手
2. 環境変数の設定
3. 使用する C コンパイラの準備

これで spack を使用する準備は完了です。


## 1. spac システムの入手

まず最初に spack システムを github からユーザのホームディレクトリにクローンしてください。

```
cd $HOME
git clone -c feature.manyFiles=true https://github.com/spack/spack.git
```

ホームディレクトリ上に`spack`というディレクトリが作られます。


## 2. 環境変数の設定

以下を実行することで環境変数を設定してください。（次回ログイン時に自動的に呼ばれるよう`~/.bashrc`にも追加してください。）

```
export SPACK_ROOT=/home/your_account/spack
source $SPACK_ROOT/share/spack/setup-env.sh
```

## 3. 使用する C コンパイラの準備

spack はパッケージをソースコードからコンパイルしてインストールします。
その際につかうコンパイラを spack に予め登録しておく必要があります。

この作業は以下の手順で行います。

- i). スパコンに予めインストールされているコンパイラを spack に認識させる。
- ii) 予めスパコンに存在しているコンパイラを用いて、今後デフォルトで使うコンパイラ (gcc がよい)を spack でインストールする。
- iii). 今後デフォルトで使うコンパイラを spack に登録する。


### i) スパコンに予めインストールされているコンパイラを spack に認識させる

以下のコマンドを実行することで、スパコンに予めインストールされているコンパイラを spack が探します。

```
spack compiler find
```
これにより`$HOME/.spack/linux/compilers.yaml`ファイルが作られ、そこに認識された情報が保存されます。

しかしこれらのコンパイラを直接用いると、`spack install パッケージ名`によりパッケージをインストールする際にエラーが出る場合が多いため、
次の ii) iii)の手順を行ってください。

### ii) 今後デフォルトで使うコンパイラを spack でインストールする

例えば以下のコマンドを実行することで、
予めスパコンに存在しているコンパイラを用いて、今後主に使うコンパイラを spack でインストールします。

```
spack install -j 4 gcc@8.5.0
spack load gcc@8.5.0
```

ここで`-j 4`はコンパイルを高速化するための make の並列プロセス数の指定です。






### iii) 今後デフォルトで使うコンパイラを spack に登録する

ii)でインストールしたコンパイラは、設定ファイルを編集して spack に登録する必要があります。

`$HOME/.spack/linux/compilers.yaml`の編集

以下のように`- compiler: `の項目を追加し、先程インストールしたコンパイラ（今の例の場合`gcc@8.5.0`)を spack に登録します。

- ここで、`cc:`, `cxx:`, `f77:`, `fc:`に記載するパスは、`which gcc`, `which g++`, `which gfortran`の出力結果を記載します。
- YAML 形式なのでインデントはタブ文字ではなくスペース文字で書いてください。

```yaml
compilers:
- compiler:
    spec: gcc@8.5.0
    paths:
      cc: /lustre7/home/lustre4/youraccount/spack/opt/spack/linux-centos7-x86_64_v3/gcc-4.8.5/gcc-8.5.0-a4dcd4j7uq23aax4n6ri6amzt7hp4lxc/bin/gcc
      cxx: /lustre7/home/lustre4/youraccount/spack/opt/spack/linux-centos7-x86_64_v3/gcc-4.8.5/gcc-8.5.0-a4dcd4j7uq23aax4n6ri6amzt7hp4lxc/bin/g++
      f77: /lustre7/home/lustre4/youraccount/spack/opt/spack/linux-centos7-x86_64_v3/gcc-4.8.5/gcc-8.5.0-a4dcd4j7uq23aax4n6ri6amzt7hp4lxc/bin/gfortran
      fc: /lustre7/home/lustre4/youraccount/spack/opt/spack/linux-centos7-x86_64_v3/gcc-4.8.5/gcc-8.5.0-a4dcd4j7uq23aax4n6ri6amzt7hp4lxc/bin/gfortran
    flags: {}
    operating_system: centos7
    target: x86_64
    modules: []
    environment: {}
    extra_rpaths: []
- compiler:
    spec: dpcpp@2021.4.0
    paths:
      cc: /lustre7/software/intel/oneapi/compiler/2021.4.0/linux/bin/icx
      cxx: /lustre7/software/intel/oneapi/compiler/2021.4.0/linux/bin/dpcpp
      f77: /lustre7/software/intel/oneapi/compiler/2021.4.0/linux/bin/ifx
      fc: /lustre7/software/intel/oneapi/compiler/2021.4.0/linux/bin/ifx
    flags: {}
    operating_system: centos7
    target: x86_64
    modules: []
    environment: {}
    extra_rpaths: []
- compiler:
    spec: gcc@4.8.5
    paths:
      cc: /usr/bin/gcc
      cxx: /usr/bin/g++
      f77: /usr/bin/gfortran
      fc: /usr/bin/gfortran
    flags: {}
    operating_system: centos7
    target: x86_64
    modules: []
    environment: {}
    extra_rpaths: []

... (以下略)
```



`$HOME/.spack/packages.yaml`ファイルの作成

以下の内容で`$HOME/.spack/packages.yaml`ファイルを作成します。

```yaml
packages:
  all:
    compiler: [gcc@8.5.0]
```

以上で spack 自体のインストールは終了です。


## spack 自体のアンインストール

以下のコマンドで spack 自体をアンインストールできます。

```
spack uninstall --all
```

