---
id: java
title: "Java"
---


### Installing the Java processor

The Java processor (JDK) can be installed with user permission, so install the version of the JDK you need in your home directory.

- [Oracle Java SE download site](https://www.oracle.com/java/technologies/javase-downloads.html)
- [OpenJDK download site](https://openjdk.java.net/install/index.html)
- [GraalVM download site](https://www.graalvm.org/)
- [IBM Java SDK download site](https://www.ibm.com/support/pages/java-sdk-downloads-version-80) (supports older versions of Java）

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


### Notes

#### When I start the Java program, I get an error saying that there is not enough memory.

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
