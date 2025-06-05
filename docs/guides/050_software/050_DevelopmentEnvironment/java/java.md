---
id: java
title: "Java の使い方"
---

## Java 処理系のインストール {#installing-java-processor}

Java 処理系 (JDK)のインストールはユーザー権限で可能なので、各自必要なバージョンの JDK を自分のホームディレクトリにインストールしてください。

- [Oracle Java SE download site](https://www.oracle.com/java/technologies/javase-downloads.html)
- [OpenJDK download site](https://openjdk.java.net/install/index.html)
- [GraalVM download site](https://www.graalvm.org/)
- [IBM Java SDK download site](https://www.ibm.com/support/pages/java-sdk-downloads-version-80) (古いバージョンの Java をサポート)


### インストール例 {#ex-installing-java}

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


## SDKMAN!による Java 処理系のインストール {#installing-jdk-sdkman}

SDKMAN!は、Software Development Kit Manager の略で、Java や Groovy、Scala などの JVM 言語や maven, gradle といったビルドツールのインストールや管理を簡単にし、特定のバージョンへの切り替えを容易にすることができます。

参考資料

- [SDKMAN!公式ページ](https://sdkman.io/)


### SDKMAN!のインストール {#installing-sdkman}

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


### SDKMAN!による Java 処理系(JDK) のインストール {#installing-jdk-using-sdkman}


#### - Java 処理系(JDK) のインストール {#installing-jdk}

`sdk list java`コマンドを実行することによりインストール可能な Java 処理系のリストが表示されます。

```
$ sdk list java
================================================================================
Available Java Versions for Linux 64bit
================================================================================
 Vendor        | Use | Version      | Dist    | Status     | Identifier
--------------------------------------------------------------------------------
 Corretto      |     | 24.0.1       | amzn    |            | 24.0.1-amzn         
               |     | 24           | amzn    |            | 24-amzn             
               |     | 23.0.2       | amzn    |            | 23.0.2-amzn         
               |     | 21.0.7       | amzn    |            | 21.0.7-amzn         
               |     | 21.0.6       | amzn    |            | 21.0.6-amzn         
               |     | 17.0.15      | amzn    |            | 17.0.15-amzn        
               |     | 17.0.14      | amzn    |            | 17.0.14-amzn        
               |     | 11.0.27      | amzn    |            | 11.0.27-amzn        
               |     | 11.0.26      | amzn    |            | 11.0.26-amzn        
               |     | 8.0.452      | amzn    |            | 8.0.452-amzn        
               |     | 8.0.442      | amzn    |            | 8.0.442-amzn        
 Dragonwell    |     | 21.0.6       | albba   |            | 21.0.6-albba        
               |     | 17.0.14      | albba   |            | 17.0.14-albba       
               |     | 17.0.13      | albba   |            | 17.0.13-albba       
               |     | 11.0.26      | albba   |            | 11.0.26-albba       
               |     | 11.0.25      | albba   |            | 11.0.25-albba       
               |     | 8.0.442      | albba   |            | 8.0.442-albba       
               |     | 8.0.432      | albba   |            | 8.0.432-albba       
 Gluon         |     | 22.1.0.1.r17 | gln     |            | 22.1.0.1.r17-gln    
               |     | 22.1.0.1.r11 | gln     |            | 22.1.0.1.r11-gln    
 GraalVM CE    |     | 24.0.1       | graalce |            | 24.0.1-graalce      
               |     | 24           | graalce |            | 24-graalce          
               | >>> | 23.0.2       | graalce | installed  | 23.0.2-graalce      
               |     | 21.0.2       | graalce |            | 21.0.2-graalce      
               |     | 17.0.9       | graalce |            | 17.0.9-graalce      
 GraalVM Oracle|     | 25.ea.22     | graal   |            | 25.ea.22-graal      
               |     | 25.ea.21     | graal   |            | 25.ea.21-graal      
               |     | 25.ea.20     | graal   |            | 25.ea.20-graal      
               |     | 25.ea.19     | graal   |            | 25.ea.19-graal      
               |     | 25.ea.18     | graal   |            | 25.ea.18-graal      
               |     | 25.ea.17     | graal   |            | 25.ea.17-graal      
               |     | 25.ea.16     | graal   |            | 25.ea.16-graal      
               |     | 25.ea.15     | graal   |            | 25.ea.15-graal      
               |     | 25.ea.14     | graal   |            | 25.ea.14-graal      
               |     | 25.ea.13     | graal   |            | 25.ea.13-graal      
               |     | 25.ea.8      | graal   |            | 25.ea.8-graal       
               |     | 24.ea.32     | graal   |            | 24.ea.32-graal      
               |     | 24.0.1       | graal   |            | 24.0.1-graal        
               |     | 24           | graal   |            | 24-graal            
               |     | 23.0.2       | graal   |            | 23.0.2-graal        
               |     | 21.0.7       | graal   |            | 21.0.7-graal        
               |     | 21.0.6       | graal   |            | 21.0.6-graal        
               |     | 17.0.12      | graal   |            | 17.0.12-graal       
 Huawei        |     | 21.0.6       | bisheng |            | 21.0.6-bisheng      
               |     | 17.0.14      | bisheng |            | 17.0.14-bisheng     
               |     | 11.0.26      | bisheng |            | 11.0.26-bisheng     
               |     | 8.0.442      | bisheng |            | 8.0.442-bisheng     
 Java.net      |     | 25.ea.16     | open    |            | 25.ea.16-open       
               |     | 25.ea.15     | open    |            | 25.ea.15-open       
               |     | 25.ea.14     | open    |            | 25.ea.14-open       
               |     | 25.ea.10     | open    |            | 25.ea.10-open       
               |     | 24.ea.36     | open    |            | 24.ea.36-open       
               |     | 24           | open    |            | 24-open             
               |     | 23.0.1       | open    |            | 23.0.1-open         
               |     | 21.0.2       | open    |            | 21.0.2-open         
 JetBrains     |     | 21.0.7       | jbr     |            | 21.0.7-jbr          
               |     | 21.0.6       | jbr     |            | 21.0.6-jbr          
               |     | 17.0.14      | jbr     |            | 17.0.14-jbr         
               |     | 11.0.14.1    | jbr     |            | 11.0.14.1-jbr       
 Liberica      |     | 24.fx        | librca  |            | 24.fx-librca        
               |     | 24.0.1.fx    | librca  |            | 24.0.1.fx-librca    
               |     | 24.0.1       | librca  |            | 24.0.1-librca       
               |     | 24           | librca  |            | 24-librca           
               |     | 23.0.2.fx    | librca  |            | 23.0.2.fx-librca    
               |     | 23.0.2       | librca  |            | 23.0.2-librca       
               |     | 21.0.7.crac  | librca  |            | 21.0.7.crac-librca  
               |     | 21.0.7.fx    | librca  |            | 21.0.7.fx-librca    
               |     | 21.0.7       | librca  |            | 21.0.7-librca       
               |     | 21.0.6.crac  | librca  |            | 21.0.6.crac-librca  
               |     | 21.0.6.fx    | librca  |            | 21.0.6.fx-librca    
               |     | 21.0.6       | librca  |            | 21.0.6-librca       
               |     | 17.0.15.crac | librca  |            | 17.0.15.crac-librca 
               |     | 17.0.15.fx   | librca  |            | 17.0.15.fx-librca   
               |     | 17.0.15      | librca  |            | 17.0.15-librca      
               |     | 17.0.14.crac | librca  |            | 17.0.14.crac-librca 
               |     | 17.0.14.fx   | librca  |            | 17.0.14.fx-librca   
               |     | 17.0.14      | librca  |            | 17.0.14-librca      
               |     | 11.0.27.fx   | librca  |            | 11.0.27.fx-librca   
               |     | 11.0.27      | librca  |            | 11.0.27-librca      
               |     | 11.0.26.fx   | librca  |            | 11.0.26.fx-librca   
               |     | 11.0.26      | librca  |            | 11.0.26-librca      
               |     | 8.0.452.fx   | librca  |            | 8.0.452.fx-librca   
               |     | 8.0.452      | librca  |            | 8.0.452-librca      
               |     | 8.0.442.fx   | librca  |            | 8.0.442.fx-librca   
               |     | 8.0.442      | librca  |            | 8.0.442-librca      
 Liberica NIK  |     | 24.2.1.r24   | nik     |            | 24.2.1.r24-nik      
               |     | 24.2.1.fx    | nik     |            | 24.2.1.fx-nik       
               |     | 24.1.2.r23   | nik     |            | 24.1.2.r23-nik      
               |     | 23.1.7.r21   | nik     |            | 23.1.7.r21-nik      
               |     | 23.1.7.fx    | nik     |            | 23.1.7.fx-nik       
               |     | 23.1.6.r21   | nik     |            | 23.1.6.r21-nik      
               |     | 23.1.6.fx    | nik     |            | 23.1.6.fx-nik       
               |     | 23.0.8.r17   | nik     |            | 23.0.8.r17-nik      
               |     | 23.0.8.fx    | nik     |            | 23.0.8.fx-nik       
               |     | 23.0.7.r17   | nik     |            | 23.0.7.r17-nik      
               |     | 23.0.7.fx    | nik     |            | 23.0.7.fx-nik       
               |     | 22.3.5.r17   | nik     |            | 22.3.5.r17-nik      
               |     | 22.3.5.r11   | nik     |            | 22.3.5.r11-nik      
 Mandrel       |     | 24.2.r24     | mandrel |            | 24.2.r24-mandrel    
               |     | 24.2.1.r24   | mandrel |            | 24.2.1.r24-mandrel  
               |     | 24.1.2.r23   | mandrel |            | 24.1.2.r23-mandrel  
               |     | 24.0.2.r22   | mandrel |            | 24.0.2.r22-mandrel  
               |     | 23.1.7.r21   | mandrel |            | 23.1.7.r21-mandrel  
               |     | 23.1.6.r21   | mandrel |            | 23.1.6.r21-mandrel  
               |     | 23.0.6.r17   | mandrel |            | 23.0.6.r17-mandrel  
               |     | 22.3.5.r17   | mandrel |            | 22.3.5.r17-mandrel  
 Microsoft     |     | 21.0.7       | ms      |            | 21.0.7-ms           
               |     | 21.0.6       | ms      |            | 21.0.6-ms           
               |     | 17.0.15      | ms      |            | 17.0.15-ms          
               |     | 17.0.14      | ms      |            | 17.0.14-ms          
               |     | 11.0.27      | ms      |            | 11.0.27-ms          
               |     | 11.0.26      | ms      |            | 11.0.26-ms          
 Oracle        |     | 24.0.1       | oracle  |            | 24.0.1-oracle       
               |     | 24           | oracle  |            | 24-oracle           
               |     | 23.0.2       | oracle  |            | 23.0.2-oracle       
               |     | 22.0.2       | oracle  |            | 22.0.2-oracle       
               |     | 21.0.7       | oracle  |            | 21.0.7-oracle       
               |     | 21.0.6       | oracle  |            | 21.0.6-oracle       
               |     | 17.0.12      | oracle  |            | 17.0.12-oracle      
 SapMachine    |     | 24.0.1       | sapmchn |            | 24.0.1-sapmchn      
               |     | 24           | sapmchn |            | 24-sapmchn          
               |     | 23.0.2       | sapmchn |            | 23.0.2-sapmchn      
               |     | 21.0.7       | sapmchn |            | 21.0.7-sapmchn      
               |     | 21.0.6       | sapmchn |            | 21.0.6-sapmchn      
               |     | 17.0.15      | sapmchn |            | 17.0.15-sapmchn     
               |     | 17.0.14      | sapmchn |            | 17.0.14-sapmchn     
               |     | 11.0.27      | sapmchn |            | 11.0.27-sapmchn     
               |     | 11.0.26      | sapmchn |            | 11.0.26-sapmchn     
 Semeru        |     | 21.0.7       | sem     |            | 21.0.7-sem          
               |     | 21.0.6       | sem     |            | 21.0.6-sem          
               |     | 17.0.15      | sem     |            | 17.0.15-sem         
               |     | 17.0.14      | sem     |            | 17.0.14-sem         
               |     | 11.0.27      | sem     |            | 11.0.27-sem         
               |     | 11.0.26      | sem     |            | 11.0.26-sem         
               |     | 8.0.452      | sem     |            | 8.0.452-sem         
               |     | 8.0.442      | sem     |            | 8.0.442-sem         
 Temurin       |     | 24.0.1       | tem     |            | 24.0.1-tem          
               |     | 24           | tem     |            | 24-tem              
               |     | 23.0.2       | tem     |            | 23.0.2-tem          
               |     | 21.0.7       | tem     |            | 21.0.7-tem          
               |     | 21.0.6       | tem     |            | 21.0.6-tem          
               |     | 17.0.15      | tem     |            | 17.0.15-tem         
               |     | 17.0.14      | tem     |            | 17.0.14-tem         
               |     | 11.0.27      | tem     |            | 11.0.27-tem         
               |     | 11.0.26      | tem     |            | 11.0.26-tem         
               |     | 8.0.452      | tem     |            | 8.0.452-tem         
               |     | 8.0.442      | tem     |            | 8.0.442-tem         
 Tencent       |     | 21.0.7       | kona    |            | 21.0.7-kona         
               |     | 21.0.6       | kona    |            | 21.0.6-kona         
               |     | 21.0.5       | kona    |            | 21.0.5-kona         
               |     | 17.0.15      | kona    |            | 17.0.15-kona        
               |     | 17.0.14      | kona    |            | 17.0.14-kona        
               |     | 17.0.13      | kona    |            | 17.0.13-kona        
               |     | 11.0.27      | kona    |            | 11.0.27-kona        
               |     | 11.0.26      | kona    |            | 11.0.26-kona        
               |     | 11.0.25      | kona    |            | 11.0.25-kona        
               |     | 8.0.452      | kona    |            | 8.0.452-kona        
               |     | 8.0.442      | kona    |            | 8.0.442-kona        
               |     | 8.0.432      | kona    |            | 8.0.432-kona        
 Trava         |     | 11.0.15      | trava   |            | 11.0.15-trava       
               |     | 8.0.282      | trava   |            | 8.0.282-trava       
 Zulu          |     | 24.crac      | zulu    |            | 24.crac-zulu        
               |     | 24.fx        | zulu    |            | 24.fx-zulu          
               |     | 24.0.1.crac  | zulu    |            | 24.0.1.crac-zulu    
               |     | 24.0.1.fx    | zulu    |            | 24.0.1.fx-zulu      
               |     | 24.0.1       | zulu    |            | 24.0.1-zulu         
               |     | 24           | zulu    |            | 24-zulu             
               |     | 23.0.2.fx    | zulu    |            | 23.0.2.fx-zulu      
               |     | 23.0.2       | zulu    |            | 23.0.2-zulu         
               |     | 23.0.1.crac  | zulu    |            | 23.0.1.crac-zulu    
               |     | 21.0.7.crac  | zulu    |            | 21.0.7.crac-zulu    
               |     | 21.0.7.fx    | zulu    |            | 21.0.7.fx-zulu      
               |     | 21.0.7       | zulu    |            | 21.0.7-zulu         
               |     | 21.0.6.crac  | zulu    |            | 21.0.6.crac-zulu    
               |     | 21.0.6.fx    | zulu    |            | 21.0.6.fx-zulu      
               |     | 21.0.6       | zulu    |            | 21.0.6-zulu         
               |     | 21.0.5.crac  | zulu    |            | 21.0.5.crac-zulu    
               |     | 17.0.15.crac | zulu    |            | 17.0.15.crac-zulu   
               |     | 17.0.15.fx   | zulu    |            | 17.0.15.fx-zulu     
               |     | 17.0.15      | zulu    |            | 17.0.15-zulu        
               |     | 17.0.14.crac | zulu    |            | 17.0.14.crac-zulu   
               |     | 17.0.14.fx   | zulu    |            | 17.0.14.fx-zulu     
               |     | 17.0.14      | zulu    |            | 17.0.14-zulu        
               |     | 17.0.13.crac | zulu    |            | 17.0.13.crac-zulu   
               |     | 11.0.27.fx   | zulu    |            | 11.0.27.fx-zulu     
               |     | 11.0.27      | zulu    |            | 11.0.27-zulu        
               |     | 11.0.26.fx   | zulu    |            | 11.0.26.fx-zulu     
               |     | 11.0.26      | zulu    |            | 11.0.26-zulu        
               |     | 8.0.452.fx   | zulu    |            | 8.0.452.fx-zulu     
               |     | 8.0.452      | zulu    |            | 8.0.452-zulu        
               |     | 8.0.442.fx   | zulu    |            | 8.0.442.fx-zulu     
               |     | 8.0.442      | zulu    |            | 8.0.442-zulu        
               |     | 7.0.352      | zulu    |            | 7.0.352-zulu        
               |     | 6.0.119      | zulu    |            | 6.0.119-zulu        
================================================================================
Omit Identifier to install default version 21.0.7-tem:
    $ sdk install java
Use TAB completion to discover available versions
    $ sdk install java [TAB]
Or install a specific version by Identifier:
    $ sdk install java 21.0.7-tem
Hit Q to exit this list view
================================================================================
```

リストの表示をやめてプロンプトに戻るには`q`キーを押します。
`q`キーを押すとリスト全体が消えてしまうので、これを防ぐには以下のコマンドによりリストを表示します。

```
sdk list java | less -X
```

あるいは、`less`ページャを使わないようにするには、`PAGER`環境変数に`cat`を設定します。

```
export PAGER=cat
sdk list java
```


例えば Oracle Java Develoment Kit (Oracle JDK) 21 をインストールしたい場合はこの表の Identifier の列を使って以下のようにします。

```
sdk install java 21.0.1-oracle
```

このとき、`JAVA_HOME`環境変数は自動的には設定されないので、以下のコマンドにより設定します。
必要に応じて`~/.bashrc`にも記載してください。


```
export JAVA_HOME=$HOME/.sdkman/candidates/java/current
```

これにより、`JAVA_HOME`環境変数は`/home/you/.sdkman/candidates/java/current`を指すようになります。


#### - Java 処理系(JDK) のバージョンの切り替え {#switch-jdk-version}

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


### SDKMAN!による maven のインストール {#installing-maven-sdkman}


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



### SDKMAN!による gradle のインストール {#installing-grandle-sdkman}

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


### SDKMAN!による JBang のインストール {#installing-jbang-sdkman}

JBang をインストールするには以下のようにします。

```
sdk install jbang
```



## 注意事項 {#notes}

### Java プログラムを起動するとメモリが足りないとのエラーが出る {#error-no-memory}

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

#### 対処方法 {#solution}

 Java プログラムから使われるメモリは、(1)JVM が管理している「Java ヒープメモリ」 (2)OS が管理している「ネイティブメモリ」の２種類があります。
 glibc 2.10 以降で arena 機能が導入されたことにより、Java プログラムにとってはネイディブメモリ側のメモリ確保量が不必要に大きくなる（常に 8GB 程とられる）結果となっております。arena 機能は Java プログラムの実行時には不要ですので Java プログラムを使う際には環境変数 `MALLOC_ARENA_MAX` に小さな値を設定してください。（常時小さい値を設定していると Java 以外のプログラムの実行に影響が出る場合があるので、必要な時だけ設定してください。）
 
```
 $ export MALLOC_ARENA_MAX=3
 
 $ java -version
 openjdk version "1.8.0_191"
 OpenJDK Runtime Environment (build 1.8.0_191-b12)
 OpenJDK 64-Bit Server VM (build 25.191-b12, mixed mode)
 $

```


#### 参考資料 {#references}

- [What consumes memory in java process?](https://serverfault.com/questions/341579/what-consumes-memory-in-java-process)
- [Java Performance, 2nd Edition](https://learning.oreilly.com/library/view/java-performance-2nd/9781492056102/)
- [Sensepost | Painless intro to the Linux userland heap](https://sensepost.com/blog/2017/painless-intro-to-the-linux-userland-heap/)
