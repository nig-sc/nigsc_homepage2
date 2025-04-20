---
id: go
title: "Goの使い方"
---

Goは遺伝研スパコンにインストールされていないため各自で導入が必要です。インストール、および使用方法は次のとおりです。

## Goのインストール {#installing-go}

公式サイト[Go All releases](https://go.dev/dl/)から最新版をダウンロードします。

```
$ wget https://go.dev/dl/go1.22.4.linux-amd64.tar.gz
```
古いバージョンのGoをインストールしていた場合は削除します。
```
$ rm -rf ~/local/go
```
:::warning
インストール済みのGoディレクトリにダウンロードしたアーカイブを展開しないでください。Goが正常に動作しなくなる場合があります。
:::

ダウンロードしたアーカイブを展開します。
```
$ tar -C ~/local -zxf go1.22.4.linux-amd64.tar.gz
```
:::warning
アーカイブは$HOME直下に展開しないようにしてください。
$GOPATHのデフォルトが$HOME/goでありチェックアウトする外部のGoプロジェクトやツールと衝突が発生する場合があります。
$HOME/goにGoをインストールしたい場合は$GOPATHを別のパスに変更してください。
:::
PATH環境変数に展開したGoのパスを追加します。
```
$ echo 'export PATH=$PATH:$HOME/local/go/bin' > ~/.profile
```
:::note
ログイン中のシェルでは変更内容が反映されません。当該シェルで継続して作業する場合はインストールパスのコマンドを直接実行するか、Goを実行する前に`source $HOME/.profile`を用いてプロファイルを読み込みます。
:::

Goが正しくインストールされたか確認します。
```
$ go version
go version go1.22.4 linux/amd64
```
## ジョブ実行 {#runnning-a-job-using-go}

ジョブスクリプト内で任意のGoプログラムを実行します。

### Grid Engine

```
$ cat launch_go.sh
#!/bin/bash
#$ -cwd
#$ -V
#$ -l short
#$ -l s_vmem=16G
#$ -l mem_req=16G
#$ -N user_go
#$ -S /bin/bash
s3_upload_objects
$ qsub launch_go.sh
```

### Slurm

```
$ cat launch_go.sh
#!/bin/bash
#SBATCH -N 1
#SBATCH -n 1
#SBATCH -c 1
#SBATCH --mem-per-cpu=16G
#SBATCH -t 0-01:00:00
#SBATCH -J user_go
WORKDIR=${HOME}/s3-list
cd ${WORKDIR}
go run .
$ sbatch launch_go.sh
```
