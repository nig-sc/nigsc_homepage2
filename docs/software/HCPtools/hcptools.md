---
id: hcptools
title: HCPtools の使い方
---


遺伝研スパコンに対してファイルのアップロード、ダウンロードを行うには、一般的に広く用いられているファイル転送ソフトウェアである`scp`や`sftp`をつかうことができますが、`scp`などでは遠距離間で大量のファイルを転送する際に転送速度が遅くなる性質があります。

遠距離の高速通信のために、遺伝研スパコンでは、一般解析区画では Aspera、個人ゲノム解析区画では HCP tools というファイル転送ソフトウェアが利用可能となっています。



参考資料

- 公式マニュアル (vession 1.3.0R_45)
    - HCPtools コマンド導入ガイド (<a href="https://github.com/oogasawa/nigsc_HCPtools/raw/main/1.3.0R-45/manual/HCPtools_command_Guide.pdf">日本語版</a>)
    - HCPtools コマンド概要説明 (<a href="https://github.com/oogasawa/nigsc_HCPtools/raw/main/1.3.0R-45/manual/HCPtools_command_overview.pdf">日本語版</a>)
    - HCPtools コマンドリファレンス (<a href="https://github.com/oogasawa/nigsc_HCPtools/raw/main/1.3.0R-45/manual/HCPtools_command_reference.pdf">日本語版</a>)

- [FAQ（よくある質問）: HCP tools](/faq/faq_hcptools)


## クライアントソフトウェアのインストール

HCP tools を利用するためにはクライアントソフトウェアをユーザのクライアント計算機にインストールする必要があります。
お使いのクライアント計算機の環境に応じて以下の文書をご参照ください。

- [Windows の場合](/software/HCPtools/Windows/install_HCPtools_001)
- Mac OS の場合 : 現在クライアントソフトウェアの開発中のため、現時点では利用できません。
- Linux の場合
    - [Ubuntu Linux](/software/HCPtools/Ubuntu/install_HCPtools_003)
    - [CentOS 7](/software/HCPtools/CentOS/install_HCPtools_002)


## ファイル転送


### 個人ゲノム解析区画への SSL-VPN 接続

個人ゲノム解析区画とのファイルの転送を行うために、まず最初に SSL-VPN 接続を行う必要があります。

接続方法は、[「ログイン方法(個人ゲノム解析区画)」の「VPN への接続方法」](/personal_genome_division/pg_login#vpn%E3%81%B8%E3%81%AE%E6%8E%A5%E7%B6%9A%E6%96%B9%E6%B3%95)をご参照ください。



### アップロード

ユーザのクライアント計算機でターミナルエミュレータを起動し以下のコマンドを実行します。


```
hcp --user ユーザ名 --hpfp \
    C:\Users\ユーザ名\your_file.txt \
    gwa.ddbj.nig.ac.jp:/home/your_account-pg/some_directory/your_file.txt
```

### ダウンロード

ユーザのクライアント計算機でターミナルエミュレータを起動し以下のコマンドを実行します。


```
hcp --user ユーザ名 --hpfp  \
    gwa.ddbj.nig.ac.jp:/home/your_account-pg/some_directory/your_file.txt \
    C:\Users\ユーザ名\your_file.txt
```

## ファイル転送でよく使うオプション

- `--hpfp` : UDP(HpFP2)通信の指定で、遠距離間の通信を高速化します。
    - このオプションを省略すると、通常広く用いられている TCP 通信を行います。
- `-p` : 転送元のパーミッションを保持します。
- `-R` : ディレクトリごと再帰的にファイルを転送します。
- `-r` : ファイル転送の再開処理（リジューム）を行う。
- `-y` データの完全性（転送途中でエラーや改ざんがないか）の確認を行います。
- `-z` : 転送時にデータの圧縮を行います。


オプションの詳細については、公式マニュアルをご参照下さい。


## その他のコマンド


| コマンド | 機能                                     |
|----------|------------------------------------------|
| `hrm`    | サーバ上のファイルを削除                 |
| `hcp-ls` | サーバ上のファイル一覧を表示             |
| `hmkdir` | サーバ上にディレクトリ作成               |
| `hpwd`   | サーバ上のワーキングディレクトリ表示     |
| `hmv`    | サーバ上のファイルを移動                 |
| `hlm`    | サーバ上にシンボリックリンク等を作成     |
| `hchmod` | サーバ上のファイルのパーミッションを変更 |
| `hchown` | サーバ上のファイルの所有者を変更         |
| `hsync`  | サーバ上のファイルと同期                 |

詳細については、公式マニュアルをご参照下さい。


