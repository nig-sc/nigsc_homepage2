---
id: faq_ga_transfer
title: データ転送(一般解析区画)
---

## &#x1F180; 個人のノートパソコンのダウンロードフォルダに保存されているファイルを転送する方法がわかりません。

&#x1F150; WindowsのPowerShellを使ってscpする方法は以下のとおりです。

1. まずPowerShellを起動します。そうすると、デフォルトの場合では、Windows内のホームディレクトリがカレントディレクトリになった状態でPowerShellが起動します(ここで"user"はユーザ名)。この状態で以下のコマンドを実行して、SSH秘密鍵が以下の位置にあることを確認します。この場合のSSH秘密鍵は、id_rsaファイルのことです。

```
PS C:\Users\user> ls .ssh


    Directory: C:\Users\user\.ssh


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----        2023/11/28     16:18            160 config
-a----        2022/11/01     16:33           1766 id_rsa
-a----        2024/01/22     12:44           4885 known_hosts
-a----        2024/01/22     12:41           5453 known_hosts.old
```

2. この状態で、ダウンロードフォルダのyour_file.txtファイルをスパコンにscpするには、以下のコマンドを実行します。（ここで"useraccount"は、遺伝研スパコンのアカウント名です。）

```
PS C:\Users\user> scp .\Downloads\your_file.txt
youraccount@gw.ddbj.nig.ac.jp:/home/youraccount
```

