---
id: install_HCPtools_003
title: "HCPtools のインストール(Ubuntu Linux の場合)"
---

## クライアントソフトウェアのインストール

ユーザが使っているクライアント計算機が Ubuntu Linux である場合、以下の手順に従って TCP tools のクライアントソフトウェアをインストールしてください。

Ubuntu Linux 16.04, 18.04, 20.04 に対応しています。お使いの Ubuntu Linux のバージョンに対応した zip ファイルを zip ファイルを[ここからダウンロードしてください。](https://github.com/nig-sc/HCPtools/tree/main/1.3.0R-45/Ubuntu_Linux)
- 過去のバージョンなどは<a href="https://github.com/nig-sc/HCPtools">こちらにあります。</a>


以下では Ubuntu Linux 20.04 の場合を例に説明します。

```
$ git clone https://github.com/nig-sc/HCPtools/blob/main/1.3.0R-45/Ubuntu_Linux/hcp-tools-1.3.0R_45.amd64.ubuntu2004.zip
```


zip ファイルを解凍します。

```
$ unzip hcp-tools-1.3.0R_45.amd64.ubuntu2004.zip
```

解凍すると以下のようなディレクトリが生成されます。

```
hcp-tools-1.3.0R_45.amd64.ubuntu2004/
├── *_1.3.0-45_amd64.deb #コマンドパッケージ
├── /conf/*.conf #設定ファイル
└── /license/* #ライセンス文書
```

hcp コマンドのパッケージ `hcp-tools-<バージョン>.deb`をインストールします。

```
$ cd hcp-tools-1.3.0R_45.amd64.ubuntu2004/
$ sudo dpkg -i hcp_1.3.0-45_amd64.deb
$ hcp --version
hcp client (hcp) 1.3.0R_45 / Linux (HpFP2 2.0.0.91_16 WSAPI 0.0.1.23)
```

## 設定ファイルの設置

HCP tools に必要な設定ファイルを、ホームディレクトリにコピーします。

```
$ cp -rp ~/hcp-tools-1.3.0R_45.amd64.ubuntu2004/conf/ ~/.hcp
```

## 設定ファイルの編集

HCP tools の設定ファイルをユーザディレクトリに設置し、ユーザ認証のための公開鍵の設定を追記します。

手順については[設定ファイルの書き方](/software/Archaea_tools/hcptools_conf)を参照して下さい。
