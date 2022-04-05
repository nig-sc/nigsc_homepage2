---
id: ga_transfer
title: データ転送（一般解析区画）
---


遺伝研スパコンの一般解析区画へのデータのアップロード・ダウンロードについては現在以下の2つの方法が利用可能です。


- scp, sftp
- Aspera


##  SSHプロトコルによるファイル転送の方法 (scp, sftp)

遺伝研スパコンの一般解析区画のゲートウェイサーバ(`gw.ddbj.nig.ac.jp`)に対してscp, sftp等を用いたファイル転送が可能です。

例:

```
scp your_file.txt youraccount@gw.ddbj.nig.ac.jp:/home/youraccount/data
```


## Asperaの利用方法

Asperaは大容量のファイル転送を効率的に行う商用ソフトウェアです。
特に遠距離との通信の際の転送速度の劣化が少ないことと、きちんとチューニングすれば理論帯域幅にかなり近い転送速度が実現できることが特徴です。
遺伝研スパコンでは合計帯域幅上限10GbpsのAsperaサーバーを導入し運用しています。
（遺伝研の総帯域幅は30Gbpsです。）

利用方法については[システム構成 > ソフトウェア > Aspera](../software/aspera/aspera.md) を参照してください。
