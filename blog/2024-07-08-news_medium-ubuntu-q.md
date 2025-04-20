---
slug: 2024-07-08-news_medium-ubuntu-q
title: "MediumノードのUbuntu Linuxへの一部移行とGride Engineキュー(medium-ubuntu.q)新設のお知らせ"
tags:
  - news
date: 2024-07-08
---



これまでMediumノードはCentOS 7.9で動作していましたが、
6月末でCent OS 7がサポート終了(EOL)となったことをうけて
順次Ubuntu Linux 22.04に移行しています。

<!-- truncate -->

Mediumノードは、これまでの解析環境をそのまま使いたいユーザと、
早くUbuntu Linuxに移行しThin計算ノードと環境を統一したいユーザとが居るため、
今年度いっぱいはCent OS7のGrid Engineキュー(`medium.q`)と、Ubuntu Linux 22.04のGrid Engineキュー(`medium-ubuntu.q`)の両方を運用することとします。

`medium-ubuntu.q`へのジョブ投入は、qsubコマンドでのリソース指定時に `-l medium-ubuntu` を指定願います。

(例)

```
$ qsub -l medium-ubuntu example.sh
```

`medium.q`はこれまでもあったキューで、
`medium.q`へのジョブ投入は従来通り、リソース指定時に `-l medium` を指定願います。
