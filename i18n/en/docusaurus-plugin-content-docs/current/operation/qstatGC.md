---
id: qstatGC
title: How to check the congestion status of the general analysis section
---


You can check the overall status such as the job submission status of each queue, the load status of the queue, etc. using the `qstat -g c` command.


 
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
 
The meanings of the numbers are as follows.

- USED: Number of slots currently in use 
- RES: Number of slots reserved in advance(Advance Reservation)
- AVAIL: Number of slots available
- TOTAL: Total number of slots
- aoACDS: Number of slots in which the compute node is in one of the aoACDS states
- cdsuE: Number of slots in which the compute node is in one of the cdsuE states. 

You can find using the `man qstat` command for more information.

