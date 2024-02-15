---
id: java
title: "Java"
---


### Installing the Java processor

The Java processor (JDK) can be installed with user permission, so install the version of the JDK you need in your home directory.

- [Oracle Java SE download site](https://www.oracle.com/java/technologies/javase-downloads.html)
- [OpenJDK download site](https://openjdk.java.net/install/index.html)
- [GraalVM download site](https://www.graalvm.org/)
- [IBM Java SDK download site](https://www.ibm.com/support/pages/java-sdk-downloads-version-80) (supports older versions of Java)

## Installation example

First, upload the JDK tarball file from the user's computer to the NIG supercomputer.

```
# Example: upload the file from a WSL2 terminal on Windows 10 or 11 to the NIG supercomputer.
$ scp /mnt/c/Users/you/Downloads/jdk-16.0.2_linux-x64_bin.tar.gz \
  youraccount@gw.ddbj.nig.ac.jp:/home/youraccount
Enter passphrase for key '/home/youraccount/.ssh/id_rsa':
jdk-16.0.2_linux-x64_bin.tar.gz                       100%  170MB   3.5MB/s   00:48
$
```

Next, extract the tarball file on your home directory of the NIG supercomputer and set the path etc.

```
# ssh login to the NIG supercomputer => After qlogin, install as follows
tar zxvf jdk-16.0.2_linux-x64_bin.tar.gz
mkdir $HOME/local
mv jdk-16.0.2 $HOME/local
# Set environment variables also in ~/.bashrc if necessary.
export JAVA_HOME=$HOME/local/jdk-16.0.2
export PATH=$JAVA_HOME/bin:$PATH
``` 

## Installing Java processors with SDKMAN!

SDKMAN! stands for Software Development Kit Manager, which simplifies the installation and management of JVM languages such as Java, Groovy and Scala, and build tools such as maven and gradle. It can also be used to easily switch to a specific version.

Reference

- [SDKMAN! | Official website](https://sdkman.io/)


### Installing an SDKMAN!

You can install SDKMAN! in your own home directory with user permissions.

Install SDKMAN! by running the following command:

```
curl -s "https://get.sdkman.io" | bash
```

This command will add the settings to the user's `~/.bashrc`, so please login again or run the following command to activate SDKMAN!

```
source "$HOME/.sdkman/bin/sdkman-init.sh"
```

Reference

- https://sdkman.io/install


### Installing Java processors (JDK) with SDKMAN!

#### - Installing Java processors (JDK)

Running the `sdk list java` command will list the Java processors that can be installed.

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

To stop listing and return to the prompt, press the `q`.
Pressing the `q` makes the entire list disappear. To prevent this, run the following command to display the list.

```
sdk list java | less -X
```


For example, if you would like to install Oracle Java Develoment Kit (Oracle JDK) 21, run the following command using the Identifier column in this table.

```
sdk install java 21.0.1-oracle
```

At this time, the `JAVA_HOME` environment variable is not set automatically, so run the following command to set it.
If necessary, also add it to `~/.bashrc`.

```
export JAVA_HOME=$HOME/.sdkman/candidates/java/current
```

The `JAVA_HOME` environment variable will point to `/home/you/.sdkman/candidates/java/current`.

Similarly, to install Java 8 (Here is an example of installing the Corretto JDK https://aws.amazon.com/jp/corretto, which is supported by Amazon Web Service.): 
```
sdk install java 8.0.392-amzn
```

A list of installed JDKs can be found with `sdk list java`.

#### - Switching which JDK to use

To switch which JDK to use, run the `sdk use` command: 

```
sdk use java 21.0.1-oracle
```

To make Java 21 the default Java, run the `sdk default` command: 

```
sdk default java 21.0.1-oracle
```

To remove unwanted versions of the JDK, run the `sdk uninstall` command: 

```
sdk uninstall java 8.0.392-amzn
```


### Installing maven with SDKMAN!

To see the versions available for installation, run the `sdk list maven` command: 


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

To stop listing and return to the prompt, press the `q`.
Pressing the `q` makes the entire list disappear. To prevent this, run the following command to display the list.

```
sdk list maven | less -X
```



To install maven: 
```
sdk install maven 3.9.6
```

At this time, the `MAVEN_HOME` environment variable is not set automatically, so run the following command to set it.
If necessary, also add it to `~/.bashrc`.


```
export MAVEN_HOME="$(sdk home maven current)"
```

The `MAVEN_HOME` environment variable will point to `/home/you/.sdkman/candidates/maven/current`.


### Installing grandle with SDKMAN!

To see the versions available for installation, run `the sdk list gradle` command as follows:

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


To stop listing and return to the prompt, press the `q`.
Pressing the `q` makes the entire list disappear. To prevent this, run the following command to display the list.

```
sdk list gradle | less -X
```


To install gradle:

```
sdk install gradle 8.5
```


## Notes

### When I start the Java program, I get an error saying that there is not enough memory.

After qlogin, when I try to start a Java program, I get the following error.

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

#### Solution

 There are two types of memory used by Java programs: (1) Java heap memory, which is managed by the JVM, and (2) native memory, which is managed by the OS.
 Due to the introduction of the arena function in glibc 2.10 and later, the amount of memory allocated on the native memory side is unnecessarily large for Java programs (always around 8 GB). The arena function is not necessary when running Java programs, so set the environment variable MALLOC_ARENA_MAX to a small value when using Java programs.
 
```
 $ export MALLOC_ARENA_MAX=3
 
 $ java -version
 openjdk version "1.8.0_191"
 OpenJDK Runtime Environment (build 1.8.0_191-b12)
 OpenJDK 64-Bit Server VM (build 25.191-b12, mixed mode)
 $

```

#### References

- [What consumes memory in java process?](https://serverfault.com/questions/341579/what-consumes-memory-in-java-process)
- [Java Performance, 2nd Edition](https://learning.oreilly.com/library/view/java-performance-2nd/9781492056102/)
- [Sensepost | Painless intro to the Linux userland heap](https://sensepost.com/blog/2017/painless-intro-to-the-linux-userland-heap/)
