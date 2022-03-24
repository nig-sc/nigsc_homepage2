---
id: hcptools
title: HCPtoolsの使い方
---


遺伝研スパコンに対してファイルのアップロード、ダウンロードを行うには、一般的に広く用いられているファイル転送ソフトウェアである`scp`や`sftp`をつかうことができますが、`scp`などでは遠距離間で大量のファイルを転送する際に転送速度が遅くなる性質があります。

遠距離の高速通信のために、遺伝研スパコンでは、一般解析区画ではAspera、個人ゲノム解析区画ではHCP toolsというファイル転送ソフトウェアが利用可能となっています。



## クライアントソフトウェアのインストール

HCP toolsを利用するためにはクライアントソフトウェアをユーザのクライアント計算機にインストールする必要があります。
お使いのクライアント計算機の環境に応じて以下の文書をご参照ください。

- [Windowsの場合](software/HCPtools/Windows/install_HCPtools_001.md)
- Mac OSの場合 : 現在クライアントソフトウェアの開発中のため、現時点では利用できません。2022年6月頃提供開始予定です。
- Linuxの場合(CentOS 7/Ubuntu Linux)


## ファイル転送


### 個人ゲノム解析区画へのSSL-VPN接続

個人ゲノム解析区画とのファイルの転送を行うために、まず最初にSSL-VPN接続を行う必要があります。

接続方法は、<a href="https://sc.ddbj.nig.ac.jp/personal_genome_division/pg_login#windows%E3%81%BE%E3%81%9F%E3%81%AFmac%E3%81%AE%E5%A0%B4%E5%90%88-forticlient-gui">「ログイン方法(個人ゲノム解析区画)」の「VPNへの接続方法　WindowsまたはMacの場合 (FortiClient GUI)」</a>をご参照ください。


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

## よく使うオプション

- `--hpfp` : UDP(HpFP2)通信の指定で、遠距離間の通信を高速化します。
    - このオプションを省略すると、通常広く用いられているTCP通信を行います。
- `-p` : 転送元のパーミッションを保持します。
- `-R` : ディレクトリごと再帰的にファイルを転送します。
- `-r` : ファイル転送の再開処理（リジューム）を行う。
- `-y` データの完全性（転送途中でエラーや改ざんがないか）の確認を行います。
    - ダイジェストの計算方法は現在 MM128, SHA256, SHA160から選択可能です。
- `-z` : 転送時にデータの圧縮を行います。
- ` : 通信の暗号化を行います。
    - 暗号化の方式は現在 AES256/CTR/VMAC, AES256/CBC, AES128/CBSから選択可能です。
    - 現時点では、個人ゲノム解析区画との間をSSL-VPNで通信しているので暗号化は必要ありません。
- `--config-test` : hcpコマンドの設定情報を出力します。

オプションの詳細については、公式マニュアルをご参照下さい。


## 参考資料

- 公式マニュアル (vession 1.3.0R-45)
    - HCPtoolsコマンド導入ガイド ([日本語版](/pdf/HCPtools_Guide_ja.pdf) / [英語版](/pdf/HCPtools_Guide_en.pdf))
    - HCPtoolsコマンド概要説明 ([日本語版](/pdf/HCPtools_overview_ja.pdf) / [英語版](/pdf/HCPtools_overview_en.pdf))
    - HCPtoolsコマンドリファレンス ([日本語版](/pdf/HCPtools_CommandReference.pdf))

- [FAQ（よくある質問）: HCP tools](/faq/faq_hcptools)


