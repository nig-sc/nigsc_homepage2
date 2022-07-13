---
id: pg_transfer
title: "データ転送（個人ゲノム解析区画）"
---


## SSHプロトコルによるファイル転送の方法 (scp, sftp)

個人ゲノム解析区画のゲートウェイサーバ(gwa.ddbj.nig.ac.jp)に対してscp, sftp等を用いたファイル転送が可能です。

例:

```
scp your_file.txt youraccount@gwa.ddbj.nig.ac.jp:/home/youraccount/data
```

## HCPtoolsによるファイル転送の方法

転送方法は、[HCPtools の使い方](../software/HCPtools/hcptools.md)をご参照下さい。
