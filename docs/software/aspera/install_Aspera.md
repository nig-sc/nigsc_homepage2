---
id: install_Aspera
title: Asperaのインストール
---

## Asperaクライアントソフトウェアのインストール

クライアントソフトウェアにはWebインタフェイス版(aspera connect)とコマンドラインインタフェイス版(`ascp`)があり、
バージョン4以降が必要です。（Asperaサーバとクライアントのバージョンの組み合わせの関係により3.9.xはMacでは動作せず、Windows, Linuxではパスフレーズを指定していない秘密鍵・公開鍵では動作しません。）このバージョン4をインストールするためには以下の手順でインストールします。

コマンドライン版クライアント`ascp`はWebインタフェイス版のaspera connectをインストールすると一緒にインストールされます。（また、Aspera connectのWebブラウザプラグインをインストールしないとこれらクライアントソフトウェアはダウンロードできません。)

インストール手順の概要は以下のとおりです。

1. インストーラのダウンロード
2. インストーラの実行
3. `ascp`のパスの調整


### インストール手順の概要

Asperaを利用するには無料のクライアントソフトウェアをインストールする必要があります。


クライアントソフトウェアにはWebインタフェイス版(aspera connect)とコマンドラインインタフェイス版(`ascp`)があり、
バージョン4以降が必要です。（Asperaサーバとクライアントのバージョンの組み合わせの関係により3.9.xはMacでは動作せず、Windows, Linuxではパスフレーズを指定していない秘密鍵・公開鍵では動作しません。）このバージョン4をインストールするためには以下の手順でインストールします。

コマンドライン版クライアント`ascp`はWebインタフェイス版のaspera connectをインストールすると一緒にインストールされます。（また、Aspera connectのWebブラウザプラグインをインストールしないとこれらクライアントソフトウェアはダウンロードできません。)

インストール手順の概要は以下のとおりです。

1. インストーラのダウンロード
2. インストーラの実行
3. `ascp`のパスの調整


### インストーラのダウンロード

Windows, Mac, Linuxとも同様の手順となります。


1, ウェブブラウザで https://www.ibm.com/aspera/connect/ を開き、「Aspera Connect のダウンロード」をクリックする。

![](aspera01.png)


2, 「アドオンのインストール」（Firefoxの場合）または「拡張機能のインストール」（Chromeの場合）をクリックする。

![](aspera02.png)


3, 「Add to Firefox」（Firefoxの場合）または「Chromeに追加」（Chromeの場合）をクリックしてIBM Aspera Connect アドオンをウェブブラウザにインストールする。

![](aspera03a.png)

![](aspera03b.png)


4, 改めてウェブブラウザで https://www.ibm.com/aspera/connect/ を開き、「Aspera Connect のダウンロード」をクリックするとインストーラがダウンロードできるようになる。

![](aspera04a.png)

![](aspera04b.png)


### インストーラの実行とパスの調整

- [windowsまたはMac OSの場合](/software/aspera/Aspera_adjust_path_windows_mac)
- [Linuxの場合](/software/aspera/Aspera_adjust_path_Linux)