---
id: Singularity
title: "Singularity Tutorial"
---

## 概要

遺伝研スパコンでは様々な解析ソフトウェアをユーザー権限でインストール出来るようにするためSingularityコンテナが利用可能です。

Singularityを使うことによって例えば遺伝研スパコン(CentOS7.5)の上で、Ubuntu Linuxのapt-get等でインストールした解析ソフトウェアを動作させることが可能になります。



## 参考資料

- [Singularityの公式ホームページ](https://singularity.hpcng.org/)


## Singularityイメージ作成の基本的手順

Singularityコンテナは一般に以下の手順で用います。

- (i)root権限を持つローカルのサーバー上でsandboxモードで解析環境を作成する。
- (ii)それをsingularity buildしてコンテナイメージファイル(*.sif)に固める
- (iii)このファイルをスパコンなど共用計算機にコピーする。1
- (iv)スパコン上ではユーザー権限でコンテナの中のプログラムを実行する。

このときコンテナイメージファイル(*.sif)は元々書き込み禁止となっており、これにより共用計算機上にコンテナを持ち込んだ際のセキュリティーの問題を回避しています。

Singularity Definition Fileを用いた利用例は以下の通りです。

まず、ユーザー自身のLinux環境でSingularityコンテナイメージファイルを作成します。(Singularity自体のインストールについては公式ページ[Quick Start — Singularity container 3.5 documentation ](https://sylabs.io/guides/3.5/user-guide/quick_start.html)を参照ください。）


```
# 例えば以下のサイトからSingularity Definition Fileをユーザーのlinuxサーバにクローンする。
git clone https://github.com/oogasawa/singularity-ubuntu18

# このDefinitionファイルをビルドしてSingularityコンテナイメージファイルを作る。
# (ビルド方法の詳細は上記githubリポジトリREADME.md参照.)
cd singularity-ubuntu18
sudo apt-get debootstrap
sudo singularity build ubuntu18.sif Singularity
```

上記のようにして作ったSingularityコンテナイメージファイルを遺伝研スパコン上にコピーします。

（あるいは、上記のビルドには1時間以上かかるので、あらかじめsingularity-hubに登録しすることでバックグラウンドでビルドしておいて、singularity-hubからSingularityコンテナイメージファイルを遺伝研スパコンにダウンロードします。）

遺伝研スパコン上で以下のようにします。


```
# singularity-hubからコンテナイメージファイルを取得。
singularity pull shub://oogasawa/singularity-ubuntu18
# コマンドが長くなるのを防ぐためaliasを設定する。
alias sing="singularity exec $HOME/ubuntu18.sif
# 使ってみる
```


## スパコン上でのイメージのビルド : DockerコンテナイメージからSingularityイメージを生成する

Singularityのsandboxモードの代わりにDockerコンテナを使うことが出来ます。この方法を使うとスパコン上でSingularityイメージをビルド（作成）することが出来ます。(その際DockerコンテナイメージファイルはあらかじめDocker Hubに登録しておいてください。）


Dockerコンテナイメージを用いたSingularityの利用例は以下の通り
```
# singularity build時にメモリが足りないというエラーが出るので、qlogin時にあらかじめメモリ量を指定する。
$ qlogin -l s_vmem=20G -l mem_req=20G
Your job 5083922 ("QLOGIN") has been submitted
waiting for interactive job to be scheduled ...
Your interactive job 5083922 has been successfully scheduled.
Establishing /home/geadmin/UGER/utilbin/lx-amd64/qlogin_wrapper
session to host at029 ...
Warning: Permanently added '[at029]:45682,[172.19.7.5]:45682' (ECDSA)
to the list of known hosts.
Last login: Sun Jan 26 20:55:09 2020 from gw1


# Docker Hub上のDockerコンテナをユーザー権限でSingularityビルドする。
$ singularity build lolcow.sif docker://godlovedc/lolcow
INFO:    Starting build...
Getting image source signatures
Skipping fetch of repeat blob
sha256:9fb6c798fa41e509b58bccc5c29654c3ff4648b608f5daa67c1aab6a7d02c118
Skipping fetch of repeat blob
sha256:3b61febd4aefe982e0cb9c696d415137384d1a01052b50a85aae46439e15e49a
Skipping fetch of repeat blob
sha256:9d99b9777eb02b8943c0e72d7a7baec5c782f8fd976825c9d3fb48b3101aacc2
Skipping fetch of repeat blob
sha256:d010c8cf75d7eb5d2504d5ffa0d19696e8d745a457dd8d28ec6dd41d3763617e
Skipping fetch of repeat blob
sha256:7fac07fb303e0589b9c23e6f49d5dc1ff9d6f3c8c88cabe768b430bdb47f03a9
Skipping fetch of repeat blob
sha256:8e860504ff1ee5dc7953672d128ce1e4aa4d8e3716eb39fe710b849c64b20945
Copying config sha256:73d5b1025fbfa138f2cacf45bbf3f61f7de891559fa25b28ab365c7d9c3cbd82
 3.33 KiB / 3.33 KiB [======================================================] 0s
Writing manifest to image destination
Storing signatures
INFO:    Creating SIF file...
INFO:    Build complete: lolcow.sif

# Singularityコンテナを実行してみる。
$ singularity run lolcow.sif
 ________________________________________
/ Don't let your mind wander -- it's too \
\ little to be let out alone.            /
 ----------------------------------------
        \ ^__^
         \ (oo)\_______
            (__)\ )\/\
                ||----w |
                || ||
o
```


## スパコン上に設置してあるSingularityイメージを使う

遺伝研スパコンでは、解析ソフトウェアのインストールの手間を軽減するために、biocontainersが提供している3万4千個以上のSingularityコンテナイメージファイルを/usr/local/biotools/ディレクトリ以下に置いています。

 

使用例は以下の通りです。
```
# コマンドが長くなるのを防ぐためaliasを設定するとよい。
$ alias singR="singularity exec /usr/local/biotools/r/r-base:3.5.1 R"

$ singR --no-save < example.R
> attach(mtcars)
> plot(wt, mpg)
> abline(lm(mpg~wt))
> title("Regression of MPG on Weight")
>

```

（引用）上記コード例は以下のサイトを参考にした。

[R Tutorial For Beginners](https://www.statmethods.net/r-tutorial/index.html)

実行結果(Rplots.pdf)は以下の通り。

![figure](singurarity.PNG)


