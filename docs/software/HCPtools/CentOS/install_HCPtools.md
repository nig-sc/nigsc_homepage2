---
id: install_HCPtools
title: "HCPtoolsのインストール(CentOS 7の場合)"
---


ユーザが使っているクライアント計算機がCentOS 7である場合、以下の手順に従ってTCP toolsのクライアントソフトウェアをインストールしてください。


zipファイルを解凍します。

```
$ unzip hcp-tools-1.3.0R_45.el7.centos.zip
```

解凍すると以下のようなディレクトリが生成されます。

```
hcp-tools-1.3.0R_45/
├bin/*.rpm    # コマンドパッケージ
├conf/*.conf  # 設定ファイル
└license/*    # ライセンス文書
```


hcpコマンドのパッケージ hcp-<バージョン>.rpmをインストールします。

```
$ cd hcp-tools-1.3.0R-45/bin
$ sudo rpm -ivh hcp-1.3.0R-45.el7.centos.x86_64.rpm
$ hcp --version
hcp client (hcp) 1.3.0R_45 / Linux (HpFP2 2.0.0.91_16 WSAPI 0.0.1.23)
```

## 設定ファイルの設置

HCP toolsに必要な設定ファイルを、ホームディレクトリにコピーします。

```
$ cp -rp ~/ hcp-tools-1.3.0-42/conf/ ~/.hcp
```


## 設定ファイルの編集 

HCP toolsの設定ファイルをユーザディレクトリに設置し、ユーザ認証のための公開鍵の設定を追記します。

手順については[設定ファイルの書き方](/software/HCPtools/hcptools_conf)を参照して下さい。

