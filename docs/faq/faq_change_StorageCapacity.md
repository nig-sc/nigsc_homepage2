---
id: faq_change_StorageCapacity
title: ストレージ容量変更について
---


## &#x1F180; 割り当てられているストレージ容量を変更したいです。

&#x1F150; ストレージの大規模利用の申請が必要です。

申請に関しては[<u>一般解析区画の使い方 > ストレージの大規模利用</u>](/general_analysis_division/largescale_storage)をご参照ください。


## &#x1F180; 現在どのような配分でストレージ容量を割り当てられているのでしょうか。

&#x1F150; 以下のように`quota`コマンドを実行してご確認ください。

```
$ lfs quota -u your_account /lustre7
Disk quotas for usr your_account (uid ****):
      Filesystem  kbytes   quota   limit   grace   files   quota limit  
grace
        /lustre7 982177580       0 1000000000       - 443208230 0      
0       -
uid **** is using default file quota setting
$
```

詳細は[<u>「Lustre FSの使い方」の「quotaの確認方法」</u>](/general_analysis_division/ga_lustre#quotaの確認方法)をご参照ください。
