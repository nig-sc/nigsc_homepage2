---
id: faq_os_migration_env-var
title: 解析環境の再インストールに関するご質問
---


## &#x1F180; OS移行に伴って解析環境を再インストールしたいのですが、どのようにしたらよいでしょうか。(Ubuntu Linux 22.04 の場合)

&#x1F150; これは解析環境をどのように構築されたかに依存するので、一概には言えませんが、一般論としてCent OS 7上で、ご自分でC言語のコードをコンパイルされた部分については、すべて再コンパイルが必要です。

CondaやRのパッケージが裏でC言語のコードを呼んでいる場合も同様です。

[<u>FAQのページ</u>](/faq/faq_software/#ubuntu-initialization)
を参考にして、
1. 一度、`.bashrc`などシェル設定ファイルを初期状態に戻す。
2. 初期状態に戻したら、tarball からインストールしたプログラムを再インストールする。
3. conda や R のパッケージなどをインストールしなおす。

という手順になります。

Ubuntu Linux 22.04 にした際、インストールしてあるライブラリやツールについて大幅に拡充しました。tarball からのインストールも簡略化されました。



## &#x1F180; tarball からコンパイルし直しましたが、make の時に、以下のエラーが出ます。
```
collect2: error: ld returned 1 exit status
```


&#x1F150; CentOS 7 の時にコンパイルしたライブラリが残っていて、そのライブラリをリンクしに行くため、このエラーが出ていると考えられます。

CentOS 7 の環境でコンパイルされたライブラリは、Ubuntu の環境では使うことができないので、CentOS 7 の環境でコンパイルされたライブラリは削除して、コンパイルしなおしてください。

コンパイルをし直しても同様のエラーが出る場合は、環境変数の設定が合っていないことが考えられます。 `.bash_profile`, `.bashrc`を初期状態に戻したのち、エラーが出なくなるかどうかご確認ください。

初期状態に戻す方法は、[<u>FAQ の「ソフトウェア一般」をご参照ください。</u>](/faq/faq_software#ubuntu-initialization)

conda などを利用している場合、環境変数がそこで書き換えられているので、これにより影響を受けている場合があります。conda 環境を抜けてコンパイルからやり直し、エラーが出なくなるかどうかご確認ください。


## &#x1F180; 何かプログラムを実行しようとすると、以下のようなライブラリに関するエラーが出ます。OS 移行前は問題なく実行できていました。
```
error while loading shared libraries: libcrypto.so.10: cannot open shared object file: No such file or directory
```

&#x1F150; このエラーは以前の CentOS7 に付属するライブラリのバージョンと、今の Ubuntu Linux 22.04 に付属するライブラリのバージョンが違うために出ています。
CentOS 7 のときに tarball からインストールしていた場合、このようなエラーが出る可能性があります。

お手数ですが tarball からコンパイルをし直してください。

コンパイルをし直しても同様のエラーが出る場合は、環境変数の設定が合っていないことが考えられます。 `.bash_profile`, `.bashrc`を初期状態に戻したのち、エラーが出なくなるかどうかご確認ください。

初期状態に戻す方法は、[<u>FAQ の「ソフトウェア一般」をご参照ください。</u>](/faq/faq_software#ubuntu-initialization)

conda などを利用している場合、環境変数がそこで書き換えられているので、これにより影響を受けている場合があります。conda 環境を抜けてコンパイルからやり直し、エラーが出なくなるかどうかご確認ください。


## &#x1F180; R を使用したいのですが、以下のようなエラーが出ます。error while loading shared libraries: libgfortran.so.3: cannot open shared object file: No such file or directory

&#x1F150; 今回、CentOS 7 が 2024 年 6 月 30 日に End-Of-Life を迎えることを受け、定期メンテナンスで CentOS
7.9 から Ubuntu Linux 22.04LTS
への移行を行いました。CentOS7 はもう Linux カーネルのバージョンが古く、Aspera
client やバイオインフォマティックスのツールについてインストールできなくなったものがいくつも出てきていました。
このような事情ですのでお手数ですが解析環境の再インストールをお願いいたします。

```
error while loading shared libraries: libgfortran.so.3: cannot open shared object file: No such file or directory
```

この種のエラーは以前の CentOS7 に付属するライブラリのバージョンと、今の Ubuntu Linux
22.04 に付属するライブラリのバージョンが違うために出ています。

対処方法は 2 つあります。

### i) Ubuntu Linux 22.04 に付属する R を利用する

Ubuntu Linux 22.04 にした際、インストールしてあるライブラリやツールについて大幅に拡充しました。Rについても Ubuntu
Linus の apt install でインストールできるバージョンが最初からシステムにインストールされています。apt
install でインストールできる R の各種パッケージも既にインストールされています。

```
$ which R
/usr/bin/R
$ R --version
R version 4.1.2 (2021-11-01) -- "Bird Hippie"
Copyright (C) 2021 The R Foundation for Statistical Computing
Platform: x86_64-pc-linux-gnu (64-bit)
```

### ii) R を再インストールする

Ubuntu Linux 22.04 への移行の結果 R の tarball からのインストールも簡略化されました。

R のダウンロードと解凍（必要なバージョンの tarball をダウンロードしてください。最新は 4.2.3 です。）

```
cd $HOME/local/src
wget https://cran.r-project.org/src/base/R-4/R-4.1.0.tar.gz
tar zxvf R-4.1.0.tar.gz
cd R-4.1.0
```

をした後、以下のコマンドだけでインストールできます。

```
./configure --prefix=$HOME/local
make
make install
```

コンパイルをし直しても同様のエラーが出る場合は、環境変数の設定が合っていないことが考えられます。 `.bash_profile`, `.bashrc`を初期状態に戻したのち、エラーが出なくなるかどうかご確認ください。

初期状態に戻す方法は、[<u>FAQ の「ソフトウェア一般」をご参照ください。</u>](/faq/faq_software#ubuntu-initialization)

conda などを利用している場合、環境変数がそこで書き換えられているので、これにより影響を受けている場合があります。conda 環境を抜けてコンパイルからやり直し、エラーが出なくなるかどうかご確認ください。


## &#x1F180; 以前のように OpenMPI を用いて解析しようとすると、以下のようなエラーが出ます。
```
ERROR: Unable to locate a modulefile for 'openmpi/mlnx/gcc/64'
/var/spool/age/at***/job_scripts/<job id>: line 16: mpirun: command not found
```

&#x1F150; Ubuntu の環境では、openmpiは各ノードの`/usr/mpi/gcc/openmpi-4.1.5a1`にインストールされています。

このディレクトリのサブディレクトリbinに、`mpicc`, `mpirun`等が配置されています。

```
$ ls /usr/mpi/gcc/openmpi-4.1.5a1/bin
aggregate_profile.pl  mpifort       orte-clean   oshcc           shmemcc
mpiCC                 mpirun        orte-info    oshcxx          shmemcxx
mpic++                ompi-clean    orte-server  oshfort         shmemfort
mpicc                 ompi-server   ortecc       oshmem_info     shmemrun
mpicxx                ompi_info     orted        oshrun
mpiexec               opal_wrapper  orterun      profile2mat.pl
mpif77                opalc++       oshCC        shmemCC
mpif90                opalcc        oshc++       shmemc++
```

`mpirun`コマンド等を使用される場合、以下のいずれかの方法を実行してください。


方法 1) コマンドをフルパスで指定する場合

```
/usr/mpi/gcc/openmpi-4.1.5a1/bin/mpirun -np 32 ....
```

方法 2) 環境変数PATH`/usr/mpi/gcc/openmpi-4.1.5a1/bin`を追加してコマンドを実行する場合
```
export PATH=/usr/mpi/gcc/openmpi-4.1.5a1/bin:${PATH}
mpirun -np 32 ....
```


## &#x1F180; intel コンパイラを使おうとすると、`ERROR: Unable to locate a modulefile for 'intel/compiler/64/2018/18.0.5'　ERROR: Unable to locate a modulefile for 'gcc/8.2.0'`というエラーが出ます。

&#x1F150; Environmental Modulesは、遺伝研スパコンのCentOS 7 の環境のみで有効です。Ubuntu Linuxの環境では使用できません。

したがって、既存の.bashrc,barc_profile等で設定している"module load"の記述はコメントアウトしてください。

この詳細は、[<u>FAQ「login 時の挙動に関するご質問」をご参照ください。</u>](/faq/faq_os_migration_login/#module_load)


また、intelコンパイラを利用する場合は、以下のコマンドで有効化してください。

```
source /opt/pkg/intel/oneapi/setvars.sh
```


## &#x1F180; DRMAAを使用したいのですが、定期メンテナンスにより、これまで使用していた `/home/geadmin/UGED/lib/lx-amd64/libdrmaa.so.1.0` から変更になったようです。ライブラリのパスを教えてください。

&#x1F150;  DRMAAのライブラリは、[AGEのソフトウェアバージョンアップ (8.6.19/8.6.4 → 8.8.1)](/blog/2023-11-24-scheduled-maintenance#%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3%E3%82%A2%E3%83%83%E3%83%97%E3%81%AE%E5%86%85%E5%AE%B9)に伴い、以下のパスに変更されました。
以下のパスに配置されたライブラリを使用してください。

```
$ ls -l /home/geadmin/AGEN/drmaa/lib/lx-amd64/
total 7444
drwxr-xr-x 2 9901 9901  4096 Sep 19 02:05 ./
drwxr-xr-x 3 root root  4096 Nov 29 13:44 ../
lrwxrwxrwx 1 9901 9901   15 Sep 19 02:05 libdrmaa.so -> libdrmaa.so.1.0*
-rwxr-xr-x 1 9901 9901 3699608 Sep 19 02:05 libdrmaa.so.1.0*
lrwxrwxrwx 1 9901 9901   16 Sep 19 02:05 libdrmaa2.so -> libdrmaa2.so.0.1*
-rwxr-xr-x 1 9901 9901 3911464 Sep 19 02:05 libdrmaa2.so.0.1*
$
```