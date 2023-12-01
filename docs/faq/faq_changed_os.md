---
id: faq_changed_os
title: FAQ：OS 以降に伴うご質問
---

このページでは、[<u>2023 年度の定期メンテナンス後</u>](/blog/2023-11-24-scheduled-maintenance)に発生したエラーなどに関する質問をまとめています。


## &#x1F180; 2023 年度のメンテナンス後、qlogin をしようとすると、`ERROR: Unable to locate a modulefile for 'gcc'`というエラーが表示されます。

&#x1F150; このエラーは無視して問題ありません。

OS が CentOS 7 から Ubuntu に変わった一方で、ユーザのホームディレクトリ上の`.bashrc`が昔のままであることが原因です。Ubuntu では environmental modules を使わなくなったので、module load しているところがエラーになり、このエラーが出ます。

無害ではありますが、頻繁に出ることになるので、`~/.bashrc`に書かれている、
```
module load gcc
```

という行を、コメントアウトまたは削除してください。コメントアウトまたは削除すると、エラーが出なくなります。

同様に、以下のように似たようなエラーに対しても、コメントアウトまたは削除すれば、エラーが出なくなります。

例えば、
```
> ERROR: Unable to locate a modulefile for 'r/3.5.2'
> ERROR: Unable to locate a modulefile for 'singularity'
```

というエラーが出た場合には、`~/.bashrc`から、以下の行をコメントアウトまたは削除してください。

```
module load r/3.5.2
module load singularity
```


## &#x1F180; qlogin しようとすると、以下のエラーが出ます。
```
[username@gwB1 ~]$ qlogin

error: commlib error: access denied (service qmaster@it001: client gdi version "0x100035F3" does not match server gdi version "0x10003800")

error: getting configuration: unable to contact qmaster using port 6444 on host "it001"

error: Cannot get configuration from qmaster.
```

&#x1F150; Univa Grid Engine が Altair 社に買収されて AGE になった関係で、パスが変わってしまっていることが原因です。

qlogin する前に
```
$ source /home/geadmin/AGER/ager/common/settings.sh
```
を実行してください。


## &#x1F180; 何かプログラムを実行しようとすると、以下のようなライブラリに関するエラーが出ます。OS 移行前は問題なく実行できていました。
```
error while loading shared libraries: libcrypto.so.10: cannot open shared object file: No such file or directory
```

&#x1F150; このエラーは以前の CentOS7 に付属するライブラリのバージョンと、今の Ubuntu Linux 22.04 に付属するライブラリのバージョンが違うために出ています。
CentOS 7 のときに tarball からインストールしていた場合、このようなエラーが出る可能性があります。

お手数ですが tarball からコンパイルし直してください。



## &#x1F180; qlogin しようとすると、以下のエラーが出ます。
```
[username@gwB1 ~]$ qlogin

error: commlib error: access denied (service qmaster@it001: client gdi version "0x100035F3" does not match server gdi version "0x10003800")

error: getting configuration: unable to contact qmaster using port 6444 on host "it001"

error: Cannot get configuration from qmaster.
```

&#x1F150; Univa Grid Engine が Altair 社に買収されて AGE になった関係で、パスが変わってしまっていることが原因です。

qlogin する前に
```
$ source /home/geadmin/AGER/ager/common/settings.sh
```
を実行してください。


## &#x1F180; 何かプログラムを実行しようとすると、以下のようなライブラリに関するエラーが出ます。OS 移行前は問題なく実行できていました。
```
error while loading shared libraries: libcrypto.so.10: cannot open shared object file: No such file or directory
```

&#x1F150; このエラーは以前の CentOS7 に付属するライブラリのバージョンと、今の Ubuntu Linux 22.04 に付属するライブラリのバージョンが違うために出ています。
CentOS 7 のときに tarball からインストールしていた場合、このようなエラーが出る可能性があります。

お手数ですが tarball からコンパイルし直してください。



## &#x1F180; R を使用したいのですが、以下のようなエラーが出ます。error while loading shared libraries: libgfortran.so.3: cannot open shared object file: No such file or directory

今回、CentOS 7 が 2024 年 6 月 30 日に End-Of-Life を迎えることを受け、定期メンテナンスで CentOS
7.9 から Ubuntu Linux 22.04LTS
への移行を行いました。CentOS7 はもう Linux カーネルのバージョンが古く、Aspera
client やバイオインフォマティックスのツールについてインストールできなくなったものがいくつも出てきていました。
このような事情ですのでお手数ですが解析環境の再インストールをお願いいたします。

error while loading shared libraries: libgfortran.so.3: cannot open shared object file: No such file or directory

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

Ubuntu Linux 22.04 にした結果 R の tarball からのインストールも簡略化され、

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



## &#x1F180; tarball からコンパイルし直しましたが、make の時に、以下のエラーが出ます。
```
collect2: error: ld returned 1 exit status
```


&#x1F150; CentOS 7 の時にコンパイルしたライブラリが残っていて、そのライブラリをリンクしに行くため、このエラーが出ていると考えられます。

CentOS 7 の環境でコンパイルされたライブラリは、Ubuntu の環境では使うことができないので、CentOS 7 の環境でコンパイルされたライブラリは削除して、コンパイルしなおしてください。

