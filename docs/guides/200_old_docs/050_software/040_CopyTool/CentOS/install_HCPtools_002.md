---
id: install_HCPtools_002
title: "HCPtools のインストール(CentOS 7 の場合)"
---

:::danger これは古いドキュメントです

本ドキュメントは旧遺伝研スパコン(2019)のドキュメントであり、参考のため残しているものです。

現行遺伝研スパコン(2025)ではこのとおりには動作しませんのでご注意ください。
:::



ユーザが使っているクライアント計算機が CentOS 7 である場合、以下の手順に従って TCP tools のクライアントソフトウェアをインストールしてください。

zip ファイルを[ここからダウンロードしてください。](https://github.com/nig-sc/HCPtools/tree/main/1.3.0R-45/CentOS7)
- 過去のバージョンなどは[こちらにあります](https://github.com/nig-sc/HCPtools)。


zip ファイルを解凍します。

```
$ unzip hcp-tools-1.3.0R-45.el7.centos.zip
```

解凍すると以下のようなディレクトリが生成されます。

```
hcp-tools-1.3.0R_45/
├bin/*.rpm    # コマンドパッケージ
├conf/*.conf  # 設定ファイル
└license/*    # ライセンス文書
```


hcp コマンドのパッケージ `hcp-<バージョン>.rpm`をインストールします。

```
$ cd hcp-tools-1.3.0R_45/bin
$ sudo rpm -ivh hcp-1.3.0R_45.el7.centos.x86_64.rpm
$ hcp --version
hcp client (hcp) 1.3.0R_45 / Linux (HpFP2 2.0.0.91_16 WSAPI 0.0.1.23)
```

## 設定ファイルの設置 {#locat-configfile}

HCP tools に必要な設定ファイルを、ホームディレクトリにコピーします。

```
$ cp -rp ~/ hcp-tools-1.3.0-42/conf/ ~/.hcp
```


## 設定ファイルの編集 {#edit-configfile}

HCP tools の設定ファイルをユーザディレクトリに設置し、ユーザ認証のための公開鍵の設定を追記します。

手順については[設定ファイルの書き方](/guides/old_docs/software/CopyTool/archaea_conf/)を参照して下さい。
