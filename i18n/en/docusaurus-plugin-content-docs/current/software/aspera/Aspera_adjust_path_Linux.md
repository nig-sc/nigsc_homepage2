---
id: Aspera_adjust_path_Linux
title: インストーラの実行とパスの調整 (Linuxの場合) 
---

Linuxの場合は上記の手順で
`ibm-aspera-connect_4.1.0.46-linux_x86_64.tar.gz`
のようなファイルがダウンロードされてくるので、解凍してbashで実行します。ユーザー権限でインストール可能です。

```
tar zxvf ibm-aspera-connect_4.1.0.46-linux_x86_64.tar.gz
bash ibm-aspera-connect_4.1.0.46-linux_x86_64.tar.gz
```
インストーラを実行すると、`$HOME/.aspera/connect/bin`の下に実行ファイルが展開されるのでここにパスを通します。

```
export PATH=$HOME/.aspera/connect/bin:$PATH
```

