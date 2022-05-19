---
id: qstatGC
title: How to check the congestion status of the general analysis section
---
 
 各キューのジョブの投入状況、キューの負荷状況等、全体を把握するのには、"qstat -g c"として確認することが 出来ます。
 
 ```
 [username@at027 ~]$ qstat -g c
 CLUSTER QUEUE                   CQLOAD   USED    RES  AVAIL  TOTAL aoACDS  cdsuE  
 --------------------------------------------------------------------------------
 epyc.q                            0.00      1      0   4159   4224      0     64 
 gpu.q                             0.00      0      0     64    112      0     48 
 intel.q                           0.00      0      0   1472   1472      0      0 
 login.q                           0.00      4      0    380    384      0      0 
 login_gpu.q                       0.00      0      0     48     48      0      0 
 medium.q                          0.00      0      0    800    800      0      0 
 short.q                           0.00      0      0    128    224      0     96 
```
 
数値の意味は以下のとおりです。

- USED :現在使用中のスロット数 
- RES  :事前予約(Advance Reservation)のスロット数
- AVAIL :使用可能なスロット数
- TOTAL :スロット総数
- aoACDS:計算ノードが aoACDSのいずれかの状態にあるスロット数
- cdsuE :計算ノードが cdsuEのいずれかの状態にあるスロット数 

詳細は`man qstat`で確認できます。
