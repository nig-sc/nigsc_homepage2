---
id: install_Aspera
title: Aspera のインストール
---

## Aspera クライアントソフトウェアのインストール

クライアントソフトウェアには Web インタフェイス版(aspera connect)とコマンドラインインタフェイス版(`ascp`)があり、
バージョン 4 以降が必要です。

- Aspera サーバとクライアントのバージョンの組み合わせの関係により 3.9.x は Mac では動作せず、Windows, Linux ではパスフレーズを指定していない秘密鍵・公開鍵では動作しません。
-  Aspera connect の Web ブラウザプラグインをインストールしないとバージョン 4 の `ascp` コマンドをダウンロードできないのでご注意下さい。


インストール手順の概要は以下のとおりです。

1. インストーラのダウンロード
2. インストーラの実行と`ascp`のパスの調整


## インストーラのダウンロード

Windows, Mac, Linux とも同様の手順となります。


1, ウェブブラウザで https://www.ibm.com/aspera/connect/ を開き、「Aspera Connect のダウンロード」をクリックする。

![](aspera01.png)


2, 「アドオンのインストール」（Firefox の場合）または「拡張機能のインストール」（Chrome の場合）をクリックする。

![](aspera02.png)


3, 「Add to Firefox」（Firefox の場合）または「Chrome に追加」（Chrome の場合）をクリックして IBM Aspera Connect アドオンをウェブブラウザにインストールする。

![](aspera03a.png)

![](aspera03b.png)


4, 改めてウェブブラウザで https://www.ibm.com/aspera/connect/ を開き、「Aspera Connect のダウンロード」をクリックするとインストーラがダウンロードできるようになる。

![](aspera04a.png)

![](aspera04b.png)


## インストーラの実行とパスの調整


### クライアント計算機が Windows または Mac の場合


Windows と Mac の場合はダウンロードしたインストーラを実行してください。
インストーラを実行するとパスも設定されます。

![](aspera05.png)


### クライアント計算機が Linux の場合 


Linux の場合は上記の手順で
`ibm-aspera-connect_4.1.0.46-linux_x86_64.tar.gz`
のようなファイルがダウンロードされてくるので、解凍して bash で実行します。ユーザー権限でインストール可能です。

```
tar zxvf ibm-aspera-connect_4.1.0.46-linux_x86_64.tar.gz
bash ibm-aspera-connect_4.1.0.46-linux_x86_64.tar.gz
```
インストーラを実行すると、`$HOME/.aspera/connect/bin`の下に実行ファイルが展開されるのでここにパスを通します。

```
export PATH=$HOME/.aspera/connect/bin:$PATH
```


