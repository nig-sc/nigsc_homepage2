---
id: pg_transfer
title: "データ転送（個人ゲノム解析区画）"
---


## SSH プロトコルによるファイル転送の方法 (scp, sftp) {#transfer-scp-sftp}

個人ゲノム解析区画のゲートウェイサーバ(`gwa.ddbj.nig.ac.jp`)に対して `scp`, `sftp` 等を用いたファイル転送が可能です。

Linux または Mac の場合の例：

この状態で、カレントディレクトリにある`your_file.txt`ファイルを遺伝研スパコンに `scp` するには、
以下のコマンドを実行します。

ここで`you`は、遺伝研スパコンのアカウント名です。

```
scp your_file.txt you@gwa.ddbj.nig.ac.jp:/home/you
```

Windows (PowerShell) の場合の例:

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

2. この状態で、ダウンロードフォルダ(`Downloads`)の中にある`your_file.txt`ファイルを遺伝研スパコンに `scp` するには、
以下のコマンドを実行します。（ここで`you`は、遺伝研スパコンのアカウント名です。）

```
PS C:\Users\youwin> scp .\Downloads\your_file.txt
you@gwa.ddbj.nig.ac.jp:/home/you
```


## Archaea tools(旧 HCPtools) によるファイル転送の方法 {#transfer-archaea-tools}

転送方法は、[Archaea tools(旧 HCPtools) の使い方](/software/Archaea_tools)をご参照下さい。
