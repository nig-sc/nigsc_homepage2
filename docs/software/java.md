---
id: java
title: "Java の使い方"
---

### Java 処理系のインストール

Java 処理系 (JDK)のインストールはユーザー権限で可能なので、各自必要なバージョンの JDK を自分のホームディレクトリにインストールしてください。

- [Oracle Java SE download site](https://www.oracle.com/java/technologies/javase-downloads.html)
- [OpenJDK download site](https://openjdk.java.net/install/index.html)
- [GraalVM download site](https://www.graalvm.org/)
- [IBM Java SDK download site](https://www.ibm.com/support/pages/java-sdk-downloads-version-80) (古いバージョンの Java をサポート）

インストール例

まず、ユーザーのパソコンから、JDK の tarball ファイルをスパコンにアップロードします。

```
# 例: Windows10 or 11 上の WSL2 端末から、遺伝研スパコンにファイルをアップロード
$ scp /mnt/c/Users/you/Downloads/jdk-16.0.2_linux-x64_bin.tar.gz \
  youraccount@gw.ddbj.nig.ac.jp:/home/youraccount
Enter passphrase for key '/home/youraccount/.ssh/id_rsa':
jdk-16.0.2_linux-x64_bin.tar.gz                       100%  170MB   3.5MB/s   00:48
$
```

つぎに、スパコンのホームディレクトリ上で tarball を展開し、パスなどを設定します。

```
# 遺伝研スパコンに ssh ログイン => qlogin 後、以下のようにしてインストール
tar zxvf jdk-16.0.2_linux-x64_bin.tar.gz
mkdir $HOME/local
mv jdk-16.0.2 $HOME/local
# 環境変数の設定は必要に応じて~/.bashrc にも書いてください。
export JAVA_HOME=$HOME/local/jdk-16.0.2
export PATH=$JAVA_HOME/bin:$PATH
``` 


## SDKMAN!による Java 処理系のインストール

SDKMAN!は、Software Development Kit Manager の略で、Java や Groovy、Scala などの JVM 言語や maven, gradle といったビルドツールのインストールや管理を簡単にし、特定のバージョンへの切り替えを容易にすることができます。

参考資料

- [SDKMAN!公式ページ](https://sdkman.io/)


### SDKMAN!のインストール

SDKMAN!自体ユーザ権限で自分のホームディレクトリにインストールすることができます。

SDKMAN!自体のインストールは以下のコマンドを実行してください。

```
curl -s "https://get.sdkman.io" | bash
```

このコマンドによりユーザの`~/.bashrc`に設定が加わりますので、
ログインしなおすか、以下のコマンドを実行して SDKMAN!をアクティベートしてください。

```
source "$HOME/.sdkman/bin/sdkman-init.sh"
```

参考資料

- https://sdkman.io/install


### SDKMAN!による Java 処理系(JDK) のインストール

`sdk list java`コマンドを実行することによりインストール可能な Java 処理系のリストが表示されます。

```
================================================================================
Available Java Versions for Linux 64bit
================================================================================
 Vendor        | Use | Version      | Dist    | Status     | Identifier
--------------------------------------------------------------------------------
 Corretto      |     | 21.0.1       | amzn    |            | 21.0.1-amzn
               |     | 17.0.9       | amzn    |            | 17.0.9-amzn
               |     | 11.0.21      | amzn    |            | 11.0.21-amzn
               |     | 8.0.392      | amzn    |            | 8.0.392-amzn
 Dragonwell    |     | 17.0.9       | albba   |            | 17.0.9-albba
               |     | 11.0.20      | albba   |            | 11.0.20-albba
               |     | 8.0.382      | albba   |            | 8.0.382-albba
 Gluon         |     | 22.1.0.1.r17 | gln     |            | 22.1.0.1.r17-gln
               |     | 22.1.0.1.r11 | gln     |            | 22.1.0.1.r11-gln
 GraalVM CE    |     | 21.0.1       | graalce |            | 21.0.1-graalce
               |     | 17.0.9       | graalce |            | 17.0.9-graalce
 GraalVM Oracle|     | 21.0.1       | graal   |            | 21.0.1-graal
               |     | 17.0.9       | graal   |            | 17.0.9-graal
 Java.net      |     | 23.ea.3      | open    |            | 23.ea.3-open
               |     | 23.ea.2      | open    |            | 23.ea.2-open
               |     | 23.ea.1      | open    |            | 23.ea.1-open
               |     | 22.ea.29     | open    |            | 22.ea.29-open
               |     | 22.ea.28     | open    |            | 22.ea.28-open
               |     | 22.ea.27     | open    |            | 22.ea.27-open
               |     | 22.ea.26     | open    |            | 22.ea.26-open
               |     | 21.ea.35     | open    |            | 21.ea.35-open
 JetBrains     |     | 17.0.9       | jbr     |            | 17.0.9-jbr
               |     | 11.0.14.1    | jbr     |            | 11.0.14.1-jbr
 Liberica      |     | 21.0.1.crac  | librca  |            | 21.0.1.crac-librca
               |     | 21.0.1.fx    | librca  |            | 21.0.1.fx-librca
               |     | 21.0.1       | librca  |            | 21.0.1-librca
               |     | 17.0.9.crac  | librca  |            | 17.0.9.crac-librca
               |     | 17.0.9.fx    | librca  |            | 17.0.9.fx-librca
               |     | 17.0.9       | librca  |            | 17.0.9-librca
               |     | 11.0.21.fx   | librca  |            | 11.0.21.fx-librca
               |     | 11.0.21      | librca  |            | 11.0.21-librca
               |     | 8.0.392.fx   | librca  |            | 8.0.392.fx-librca
               |     | 8.0.392      | librca  |            | 8.0.392-librca
 Liberica NIK  |     | 23.1.1.r21   | nik     |            | 23.1.1.r21-nik
               |     | 22.3.4.r17   | nik     |            | 22.3.4.r17-nik
               |     | 22.3.4.r11   | nik     |            | 22.3.4.r11-nik
 Mandrel       |     | 23.1.1.r21   | mandrel |            | 23.1.1.r21-mandrel
 Microsoft     |     | 21.0.1       | ms      |            | 21.0.1-ms
               |     | 17.0.9       | ms      |            | 17.0.9-ms
               |     | 11.0.21      | ms      |            | 11.0.21-ms
 Oracle        |     | 21.0.1       | oracle  |            | 21.0.1-oracle
               |     | 17.0.9       | oracle  |            | 17.0.9-oracle
... (以下略)
```

リストの表示をやめてプロンプトに戻るには`q`キーを押します。
`q`キーを押すとリスト全体が消えてしまうので、これを防ぐには以下のコマンドによりリストを表示します。

```
sdk list java | less -X
```


例えば Oracle Java Develoment Kit (Oracle JDK) 21 をインストールしたい場合はこの表の Identifier の列を使って以下のようにします。

```
sdk install java 21.0.1-oracle
```

このとき、`JAVA_HOME`環境変数は自動的には設定されないので、以下のコマンドにより設定します。
必要に応じて`~/.bashrc`にも記載してください。


```
export JAVA_HOME="$(sdk home java current)"
```

これにより、`JAVA_HOME`環境変数は`/home/you/.sdkman/candidates/java/current`を指すようになります。




同様に例えば Java 8 をインストールしたい場合は以下のようにします。
(ここでは Amazon Web Service がサポートしている Corretto JDK https://aws.amazon.com/jp/corretto をインストールする例を示します。)

```
sdk install java 8.0.392-amzn
```


インストールされている JDK のリストは`sdk list java`で確認できます。

使用する JDK を切り替えるには`sdk use`コマンドを実行します。

```
sdk use java 21.0.1-oracle
```

Java 21 をデフォルトの Java にするには`sdk default`コマンドを実行します。

```
sdk default java 21.0.1-oracle
```

不要なバージョンの JDK を削除するには`sdk uninstall`コマンドを使います。

```
sdk uninstall java 8.0.392-amzn
```


### SDKMAN!による maven のインストール


`sdk list maven`コマンドを実行するとインストール可能なバージョンが表示されます。


```
================================================================================
Available Maven Versions
================================================================================
     4.0.0-alpha-10      3.8.6               3.3.3
     4.0.0-alpha-9       3.8.5               3.3.1
     4.0.0-alpha-8       3.8.4               3.2.5
     4.0.0-alpha-7       3.8.3               3.2.3
     4.0.0-alpha-5       3.8.2               3.2.2
     4.0.0-alpha-4       3.8.1               3.2.1
     3.9.6               3.6.3               3.1.1
     3.9.5               3.6.2               3.1.0
     3.9.4               3.6.1               3.0.5
     3.9.3               3.6.0               3.0.4
     3.9.2               3.5.4
     3.9.1               3.5.3
     3.9.0               3.5.2
     3.8.8               3.5.0
     3.8.7               3.3.9

================================================================================
+ - local version
* - installed
> - currently in use
================================================================================
```

リストの表示をやめてプロンプトに戻るには`q`キーを押します。
`q`キーを押すとリスト全体が消えてしまうので、これを防ぐには以下のコマンドによりリストを表示します。

```
sdk list maven | less -X
```



maven をインストールするには以下のようにします。

```
sdk install maven 3.9.6
```


このとき、`MAVEN_HOME`環境変数は自動的には設定されないので、以下のコマンドにより設定します。
必要に応じて`~/.bashrc`にも記載してください。


```
export MAVEN_HOME="$(sdk home maven current)"
```

これにより、`MAVEN_HOME`環境変数は`/home/you/.sdkman/candidates/maven/current`を指すようになります。



### SDKMAN!による gradle のインストール

`sdk list gradle`コマンドを実行するとインストール可能なバージョンが表示されます。


```
================================================================================
Available Gradle Versions
================================================================================
     8.5                 6.8.3               5.1                 2.13
     8.4                 6.8.2               5.0                 2.12
     8.3                 6.8.1               4.10.3              2.11
     8.2.1               6.8                 4.10.2              2.10
     8.2                 6.7.1               4.10.1              2.9
     8.1.1               6.7                 4.10                2.8
     8.1                 6.6.1               4.9                 2.7
     8.0.2               6.6                 4.8.1               2.6
     8.0.1               6.5.1               4.8                 2.5
     8.0                 6.5                 4.7                 2.4
     7.6.3               6.4.1               4.6                 2.3
     7.6.2               6.4                 4.5.1               2.2.1
     7.6.1               6.3                 4.5                 2.2
     7.6                 6.2.2               4.4.1               2.1
     7.5.1               6.2.1               4.4                 2.0
     7.5                 6.2                 4.3.1               1.12
     7.4.2               6.1.1               4.3                 1.11
     7.4.1               6.1                 4.2.1               1.10
     7.4                 6.0.1               4.2                 1.9
     7.3.3               6.0                 4.1                 1.8
     7.3.2               5.6.4               4.0.2               1.7
     7.3.1               5.6.3               4.0.1               1.6
     7.3                 5.6.2               4.0                 1.5
     7.2                 5.6.1               3.5.1               1.4
     7.1.1               5.6                 3.5                 1.3
     7.1                 5.5.1               3.4.1               1.2
     7.0.2               5.5                 3.4                 1.1
     7.0.1               5.4.1               3.3                 1.0
     7.0                 5.4                 3.2.1               0.9.2
     6.9.4               5.3.1               3.2                 0.9.1
     6.9.3               5.3                 3.1                 0.9
     6.9.2               5.2.1               3.0                 0.8
     6.9.1               5.2                 2.14.1              0.7
     6.9                 5.1.1               2.14

================================================================================
+ - local version
* - installed
> - currently in use
================================================================================
```


リストの表示をやめてプロンプトに戻るには`q`キーを押します。
`q`キーを押すとリスト全体が消えてしまうので、これを防ぐには以下のコマンドによりリストを表示します。

```
sdk list gradle | less -X
```


gradle をインストールするには以下のようにします。

```
sdk install gradle 8.5
```




### 注意事項

#### Java プログラムを起動するとメモリが足りないとのエラーが出る
qlogin 後、Java プログラムを起動しようとすると以下に示すようなエラーが出る。

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

 Java プログラムから使われるメモリは、(1)JVM が管理している「Java ヒープメモリ」 (2)OS が管理している「ネイティブメモリ」の２種類があります。
 glibc 2.10 以降で arena 機能が導入されたことにより、Java プログラムにとってはネイディブメモリ側のメモリ確保量が不必要に大きくなる（常に 8GB 程とられる）結果となっております。arena 機能は Java プログラムの実行時には不要ですので Java プログラムを使う際には環境変数 MALLOC_ARENA_MAX に小さな値を設定してください。
 
```
 $ export MALLOC_ARENA_MAX=3
 
 $ java -version
 openjdk version "1.8.0_191"
 OpenJDK Runtime Environment (build 1.8.0_191-b12)
 OpenJDK 64-Bit Server VM (build 25.191-b12, mixed mode)
 $

```

#### 参考資料

- [What consumes memory in java process?](https://serverfault.com/questions/341579/what-consumes-memory-in-java-process)
- [Java Performance, 2nd Edition](https://learning.oreilly.com/library/view/java-performance-2nd/9781492056102/)
- [Sensepost | Painless intro to the Linux userland heap](https://sensepost.com/blog/2017/painless-intro-to-the-linux-userland-heap/)
