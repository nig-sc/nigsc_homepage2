---
id: ga_transfer
title: データ転送（一般解析区画）
---


遺伝研スパコンの一般解析区画へのデータのアップロード・ダウンロードについては現在以下の 2 つの方法が利用可能です。


- scp, sftp
- Aspera


##  SSH プロトコルによるファイル転送の方法 (scp, sftp) {#usage-scp-sftp}

遺伝研スパコンの一般解析区画のゲートウェイサーバ ( `gw.ddbj.nig.ac.jp` ) に対して `scp`, `sftp` 等を用いたファイル転送が可能です。

Linux または Mac の例:

この状態で、カレントディレクトリにある `your_file.txt` ファイルを遺伝研スパコンに `scp` するには、
以下のコマンドを実行します。

ここで`you`は、遺伝研スパコンのアカウント名です。

```
scp your_file.txt you@gw.ddbj.nig.ac.jp:/home/you
```

- `your_file.txt` は、転送したいファイル名に変えて実行してください。
- `you` は、アカウント登録証に記載されているユーザのアカウント名に変えて実行ください。


Windows (PowerShell)の例

1. まず PowerShell を起動します。そうすると、デフォルトの場合では、Windows 内のホームディレクトリがカレントディレクトリになった状態で PowerShell が起動します(ここで"youwin" は Windows のアカウント名)。この状態で以下のコマンドを実行して、SSH 秘密鍵ファイルが以下の位置にあることを確認します。この場合の SSH 秘密鍵ファイルは、`id_rsa` ファイルのことです。

```
PS C:\Users\youwin> ls .ssh


    Directory: C:\Users\youwin\.ssh


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----        2023/11/28     16:18            160 config
-a----        2022/11/01     16:33           1766 id_rsa
-a----        2024/01/22     12:44           4885 known_hosts
-a----        2024/01/22     12:41           5453 known_hosts.old
```

2. この状態で、ダウンロードフォルダ ( `Downloads` ) の中にある `your_file.txt` ファイルを遺伝研スパコンに `scp` するには、
以下のコマンドを実行します。（ここで `you` は、遺伝研スパコンのアカウント名です。）

```
PS C:\Users\youwin> scp .\Downloads\your_file.txt
you@gw.ddbj.nig.ac.jp:/home/you
```


## Aspera の利用方法 {#usage-aspera}

Aspera は大容量のファイル転送を効率的に行う商用ソフトウェアです。
特に遠距離との通信の際の転送速度の劣化が少ないことと、きちんとチューニングすれば理論帯域幅にかなり近い転送速度が実現できることが特徴です。
遺伝研スパコンでは合計帯域幅上限 10Gbps の Aspera サーバーを導入し運用しています。
（遺伝研の総帯域幅は 30Gbps です。）

利用方法については[システム構成 > ソフトウェア > Aspera](../software/aspera/aspera.md) を参照してください。
