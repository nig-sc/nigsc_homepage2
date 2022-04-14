---
id: aspera
title: Aspera の使い方
---

遺伝研スパコンに対してファイルのアップロード、ダウンロードを行うには、一般的に広く用いられているファイル転送ソフトウェアである scp や sftp をつかうことができますが、scp などでは遠距離間で大量のファイルを転送する際に転送速度が遅くなる性質があります。

遠距離の高速通信のために、遺伝研スパコンでは、一般解析区画では Aspera、個人ゲノム解析区画では HCP tools というファイル転送ソフトウェアが利用可能となっています。

- ユーザー全員の合計で 10Gbps まで速度が出せます。


参考資料

- [ascp4 公式マニュアル](https://www.ibm.com/docs/en/ahte/3.9.6?topic=solaris-ascp4-transferring-from-command-line-ascp)

指定可能なオプションについては、`ascp --help`の出力なども参照してください。

## クライアントソフトウェアのインストール

Aspera を利用するためにはクライアントソフトウェアをユーザのクライアント計算機にインストールする必要があります。
インストール方法は[Aspera のインストール](/software/aspera/install_Aspera)の項をご参照下さい。

- クライアントソフトウェアはバージョン 4 以降が必要です。バージョン 4 以降をインストールするためには Aspera connect の Web ブラウザプラグインをインストールする必要があります。これをインストールしないとバージョン 4
の`ascp`コマンドをダウンロードできないのでご注意下さい。


## ファイル転送

### アップロード

ユーザのクライアント計算機でターミナルエミュレータを起動し以下のコマンドを実行します。

```
$ ascp -l 1G -P 33001 -i ~/.ssh/DDBJ/id_rsa \
  $HOME/test.txt \
  youraccount@ascp.ddbj.nig.ac.jp:
```

`youraccount@ascp.ddbj.nig.ac.jp:`の後ろにユーザのホームディレクトリからの相対パスを書きます。

上記の例で、各コマンドライン引数の意味は以下のとおりです。

- `-l` : データ転送速度の上限値を書きます。（単位は bits per second)
    - "10M"など、英字による単位指定ができます。本システムでは"10G"が上限で 10M が本オプションを指定しない場合のデフォルト値です。
- `-P` : aspera が使用するポートの番号です。
- `-i` 秘密鍵ファイルのパスを指定します。（例では`~/.ssh/DDBJ/id_rsa`）
- `$HOME/test.txt` アップロードしたいファイルのパス。
- `youraccount@ascp.ddbj.nig.ac.jp:` アップロード先のパス



### ダウンロード

ユーザのクライアント計算機でターミナルエミュレータを起動し以下のコマンドを実行します。

```
$ ascp -l 1G -P 33001 -i ~/.ssh/DDBJ/id_rsa \
  youraccount@ascp.ddbj.nig.ac.jp:somedir/test.txt \
  $HOME/tmp
```

このコマンドを実行すると、スパコン上の`/home/youraccount/somedir/test.txt`がローカルマシン上の`$HOME/tmp/test.txt`としてダウンロードされます。





