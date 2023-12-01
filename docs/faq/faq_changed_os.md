---
id: faq_changed_os
title: FAQ：related to OS changing
---

このページでは、[<u>2023 年度の定期メンテナンス後</u>](/blog/2023-11-24-scheduled-maintenance)に発生したエラーなどに関する質問をまとめています。


## &#x1F180; 2023年度のメンテナンス後、qloginをしようとすると、`ERROR: Unable to locate a modulefile for 'gcc'`というエラーが表示されます。

&#x1F150; このエラーは無視して問題ありません。

OSがCentOS 7 から Ubuntu に変わった一方で、ユーザのホームディレクトリ上の`.bashrc`が昔のままであることが原因です。Ubuntu では environmental modules を使わなくなったので、module loadしているところがエラーになり、このエラーが出ます。

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


## &#x1F180; qloginしようとすると、以下のエラーが出ます。
```
[username@gwB1 ~]$ qlogin

error: commlib error: access denied (service qmaster@it001: client gdi version "0x100035F3" does not match server gdi version "0x10003800")

error: getting configuration: unable to contact qmaster using port 6444 on host "it001"

error: Cannot get configuration from qmaster.
```

&#x1F150; Univa Grid EngineがAltair社に買収されてAGEになった関係で、パスが変わってしまっていることが原因です。

qloginする前に
```
$ source /home/geadmin/AGER/ager/common/settings.sh
```
を実行してください。


## &#x1F180; 何かプログラムを実行しようとすると、以下のようなライブラリに関するエラーが出ます。OS移行前は問題なく実行できていました。
```
error while loading shared libraries: libcrypto.so.10: cannot open shared object file: No such file or directory
```

&#x1F150; このエラーは以前のCentOS7に付属するライブラリのバージョンと、今のUbuntu Linux 22.04に付属するライブラリのバージョンが違うために出ています。
CentOS 7 のときにtarballからインストールしていた場合、このようなエラーが出る可能性があります。

お手数ですがtarballからコンパイルし直してください。


## &#x1F180; tarball からコンパイルし直しましたが、makeの時に、以下のエラーが出ます。
```
collect2: error: ld returned 1 exit status
```


&#x1F150; CentOS 7 の時にコンパイルしたライブラリが残っていて、そのライブラリをリンクしに行くため、このエラーが出ていると考えられます。

CentOS 7 の環境でコンパイルされたライブラリは、Ubuntuの環境では使うことができないので、CentOS 7 の環境でコンパイルされたライブラリは削除して、コンパイルしなおしてください。

