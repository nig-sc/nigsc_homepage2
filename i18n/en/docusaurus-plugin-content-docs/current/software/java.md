---
id: java
title: "Java"
---

### Java処理系のインストール
Java処理系 (JDK)のインストールはユーザー権限で可能なので、各自必要なバージョンのJDKを自分のホームディレクトリにインストールしてください。

- [Oracle Java SE download site](https://www.oracle.com/java/technologies/javase-downloads.html)
- [OpenJDK download site](https://openjdk.java.net/install/index.html)
- [GraalVM download site](https://www.graalvm.org/)
- [IBM Java SDK download site](https://www.ibm.com/support/pages/java-sdk-downloads-version-80) (古いバージョンのJavaをサポート）

インストール例

まず、ユーザーのパソコンから、JDKのtarballファイルをスパコンにアップロードする。

```
# 例: Windows10 or 11上のWSL2端末から、遺伝研スパコンにファイルをアップロード
$ scp /mnt/c/Users/you/Downloads/jdk-16.0.2_linux-x64_bin.tar.gz \
  youraccount@gw.ddbj.nig.ac.jp:/home/youraccount
Enter passphrase for key '/home/youraccount/.ssh/id_rsa':
jdk-16.0.2_linux-x64_bin.tar.gz                       100%  170MB   3.5MB/s   00:48
$
```

つぎに、スパコンのホームディレクトリ上でtarballを展開し、パスなどを設定する。

```
# 遺伝研スパコンにsshログイン => qlogin後、以下のようにしてインストール
tar zxvf jdk-16.0.2_linux-x64_bin.tar.gz
mkdir $HOME/local
mv jdk-16.0.2 $HOME/local
# 環境変数の設定は必要に応じて~/.bashrcにも書いてください。
export JAVA_HOME=$HOME/local/jdk-16.0.2
export PATH=$JAVA_HOME/bin:$PATH
``` 


### 注意事項
#### Javaプログラムを起動するとメモリが足りないとのエラーが出る
qlogin後、Javaプログラムを起動しようとすると以下に示すようなエラーが出る。

```
$ qlogin
Your job 13631154 ("QLOGIN") has been submitted
waiting for interactive job to be scheduled ...
Your interactive job 13631154 has been successfully scheduled.
Establishing /home/geadmin/UGER/utilbin/lx-amd64/qlogin_wrapper session to host at137 ...
Last login: Sat Aug  7 22:32:05 2021 from gw1

$ java -version
Error occurred during initialization of VM
Unable to allocate 65536KB bitmaps for parallel garbage collection for the requested 2097152KB heap.
Error: Could not create the Java Virtual Machine.
Error: A fatal exception has occurred. Program will exit.
$
```

#### 対処方法

 Javaプログラムから使われるメモリは、(1)JVMが管理している「Javaヒープメモリ」 (2)OSが管理している「ネイティブメモリ」の２種類があります。
 glibc 2.10以降で arena機能が導入されたことにより、Javaプログラムにとってはネイディブメモリ側のメモリ確保量が不必要に大きくなる（常に8GB程とられる）結果となっております。arena機能はJavaプログラムの実行時には不要ですのでJavaプログラムを使う際には環境変数 MALLOC_ARENA_MAX に小さな値を設定してください。
 
```
 $ export MALLOC_ARENA_MAX=3
 
 $ java -version
 openjdk version "1.8.0_191"
 OpenJDK Runtime Environment (build 1.8.0_191-b12)
 OpenJDK 64-Bit Server VM (build 25.191-b12, mixed mode)
 $

```
