---
id: faq_change_StorageCapacity
title: FAQ (Change Storage Capacity)
---

## I want to change the allocated storage

You need to apply for using large-scale storage.

Refer to [General Analysis Section > Using large-scale storage](/general_analysis_division/largescale_storage) for application details.


## How is storage currently allocated?

Execute the `quota` command as shown below to check.

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

For more information, see ["Checking Quota" in the "Using Lustre FS" page](/general_analysis_division/ga_lustre/#checking-quota).


