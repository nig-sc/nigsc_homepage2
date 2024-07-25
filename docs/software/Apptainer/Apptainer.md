---
id: Apptainer
title: "Apptainer (Singularity)の使い方"
---

[(Singularity は Apptainer と改称されました。)](https://github.com/apptainer/singularity)

## 概要 {#introduction}

遺伝研スパコンでは様々な解析ソフトウェアをユーザー権限でインストール出来るようにするため Apptainer (Sigularity) コンテナが利用可能です。

Apptainer (Sigularity) を使うことによって例えば遺伝研スパコン(CentOS7.9)の上で、Ubuntu Linux の apt-get 等でインストールした解析ソフトウェアを動作させることが可能になります。



## 参考資料 {#reference}

- [Apptainer (Sigularity) の公式ホームページ](https://apptainer.org/)


## Apptainer (Sigularity) イメージ作成の基本的手順 {#apptainer-basic-procedures}

Apptainer (Sigularity) コンテナは一般に以下の手順で用います。

- (i)root 権限を持つローカルのサーバー上で sandbox モードで解析環境を作成する。
- (ii)それを singularity build してコンテナイメージファイル(*.sif)に固める
- (iii)このファイルをスパコンなど共用計算機にコピーする。1
- (iv)スパコン上ではユーザー権限でコンテナの中のプログラムを実行する。

このときコンテナイメージファイル(*.sif)は元々書き込み禁止となっており、これにより共用計算機上にコンテナを持ち込んだ際のセキュリティーの問題を回避しています。

Apptainer (Sigularity) Definition File を用いた利用例は以下の通りです。

まず、ユーザー自身の Linux 環境で Apptainer (Sigularity) コンテナイメージファイルを作成します。(Apptainer (Sigularity) 自体のインストールについては公式ページ[Quick Start — Apptainer (Sigularity) container 3.5 documentation ](https://sylabs.io/guides/3.5/user-guide/quick_start.html)を参照ください。）


```
# 例えば以下のサイトから Apptainer (Sigularity) Definition File をユーザーの linux サーバにクローンする。
git clone https://github.com/oogasawa/singularity-ubuntu18

# この Definition ファイルをビルドして Apptainer (Sigularity) コンテナイメージファイルを作る。
# (ビルド方法の詳細は上記 github リポジトリ README.md 参照.)
cd singularity-ubuntu18
sudo apt-get debootstrap
sudo singularity build ubuntu18.sif Singularity
```


上記のようにして作った Apptainer (Sigularity) コンテナイメージファイルを遺伝研スパコン上にコピーします。

（あるいは、上記のビルドには 1 時間以上かかるので、あらかじめ singularity-hub に登録しすることでバックグラウンドでビルドしておいて、singularity-hub から Apptainer (Sigularity) コンテナイメージファイルを遺伝研スパコンにダウンロードします。）

遺伝研スパコン上で以下のようにします。


```
# singularity-hub からコンテナイメージファイルを取得。
singularity pull shub://oogasawa/singularity-ubuntu18
# コマンドが長くなるのを防ぐため alias を設定する。
alias sing="singularity exec $HOME/ubuntu18.sif
# 使ってみる
```


## スパコン上でのイメージのビルド : Docker コンテナイメージから Apptainer (Sigularity) イメージを生成する {#build-apptainer-image-from-docker}

Apptainer (Sigularity) の sandbox モードの代わりに Docker コンテナを使うことが出来ます。この方法を使うとスパコン上で Apptainer (Sigularity) イメージをビルド（作成）することが出来ます。(その際 Docker コンテナイメージファイルはあらかじめ Docker Hub に登録しておいてください。）


Docker コンテナイメージを用いた Apptainer (Sigularity) の利用例は以下の通りです。
```
# singularity build 時にメモリが足りないというエラーが出るので、qlogin 時にあらかじめメモリ量を指定する。
$ qlogin -l s_vmem=20G -l mem_req=20G
Your job 5083922 ("QLOGIN") has been submitted
waiting for interactive job to be scheduled ...
Your interactive job 5083922 has been successfully scheduled.
Establishing /home/geadmin/UGER/utilbin/lx-amd64/qlogin_wrapper
session to host at029 ...
Warning: Permanently added '[at029]:45682,[172.19.7.5]:45682' (ECDSA)
to the list of known hosts.
Last login: Sun Jan 26 20:55:09 2020 from gw1


# Docker Hub 上の Docker コンテナをユーザー権限で Apptainer (Sigularity) ビルドする。
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

# Apptainer (Sigularity) コンテナを実行してみる。
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

