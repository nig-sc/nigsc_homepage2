---
id: faq_os_migration_env-var
title: 環境変数の設定に関するご質問
---


## &#x1F180; tarball からコンパイルし直しましたが、make の時に、以下のエラーが出ます。
```
collect2: error: ld returned 1 exit status
```


&#x1F150; CentOS 7 の時にコンパイルしたライブラリが残っていて、そのライブラリをリンクしに行くため、このエラーが出ていると考えられます。

CentOS 7 の環境でコンパイルされたライブラリは、Ubuntu の環境では使うことができないので、CentOS 7 の環境でコンパイルされたライブラリは削除して、コンパイルしなおしてください。

コンパイルをし直しても同様のエラーが出る場合は、環境変数の設定が合っていないことが考えられます。 `.bash_profile`, `.bashrc`を初期状態に戻したのち、エラーが出なくなるかどうかご確認ください。

初期状態に戻す方法は、[<u>FAQ の「ソフトウェア一般」をご参照ください。</u>](/faq/faq_software#%F0%9F%86%80-%E7%92%B0%E5%A2%83%E3%82%92%E5%88%9D%E6%9C%9F%E7%8A%B6%E6%85%8B%E3%81%AB%E6%88%BB%E3%81%97%E3%81%9F%E3%81%84%E3%81%AE%E3%81%A7%E3%81%99%E3%81%8C%E3%81%A9%E3%81%AE%E3%82%88%E3%81%86%E3%81%AB%E3%81%97%E3%81%9F%E3%82%89%E3%82%88%E3%81%84%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%81%8Bubuntu-linux-2204-%E3%81%AE%E5%A0%B4%E5%90%88)

conda などを利用している場合、環境変数がそこで書き換えられているので、これにより影響を受けている場合があります。conda 環境を抜けてコンパイルからやり直し、エラーが出なくなるかどうかご確認ください。


## &#x1F180; 何かプログラムを実行しようとすると、以下のようなライブラリに関するエラーが出ます。OS 移行前は問題なく実行できていました。
```
error while loading shared libraries: libcrypto.so.10: cannot open shared object file: No such file or directory
```

&#x1F150; このエラーは以前の CentOS7 に付属するライブラリのバージョンと、今の Ubuntu Linux 22.04 に付属するライブラリのバージョンが違うために出ています。
CentOS 7 のときに tarball からインストールしていた場合、このようなエラーが出る可能性があります。

お手数ですが tarball からコンパイルをし直してください。

コンパイルをし直しても同様のエラーが出る場合は、環境変数の設定が合っていないことが考えられます。 `.bash_profile`, `.bashrc`を初期状態に戻したのち、エラーが出なくなるかどうかご確認ください。

初期状態に戻す方法は、[<u>FAQ の「ソフトウェア一般」をご参照ください。</u>](/faq/faq_software/#%F0%9F%86%80-%E7%92%B0%E5%A2%83%E3%82%92%E5%88%9D%E6%9C%9F%E7%8A%B6%E6%85%8B%E3%81%AB%E6%88%BB%E3%81%97%E3%81%9F%E3%81%84%E3%81%AE%E3%81%A7%E3%81%99%E3%81%8C%E3%81%A9%E3%81%AE%E3%82%88%E3%81%86%E3%81%AB%E3%81%97%E3%81%9F%E3%82%89%E3%82%88%E3%81%84%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%81%8Bubuntu-linux-2204-%E3%81%AE%E5%A0%B4%E5%90%88)

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

初期状態に戻す方法は、[<u>FAQ の「ソフトウェア一般」をご参照ください。</u>](/faq/faq_software/#%F0%9F%86%80-%E7%92%B0%E5%A2%83%E3%82%92%E5%88%9D%E6%9C%9F%E7%8A%B6%E6%85%8B%E3%81%AB%E6%88%BB%E3%81%97%E3%81%9F%E3%81%84%E3%81%AE%E3%81%A7%E3%81%99%E3%81%8C%E3%81%A9%E3%81%AE%E3%82%88%E3%81%86%E3%81%AB%E3%81%97%E3%81%9F%E3%82%89%E3%82%88%E3%81%84%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%81%8Bubuntu-linux-2204-%E3%81%AE%E5%A0%B4%E5%90%88)

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
