---
id: ga_transfer
title: Data file transfer（The general analysis section）
---

For uploading and downloading data to the general analysis section of the NIG supercomputer, you can currently use the following two file transfer softwares.

- scp, sftp
- Aspera

## To transfer files with SSH protocol (scp, sftp)

You can use scp, sftp, etc. to transfer files to the gateway server (`gw.ddbj.nig.ac.jp`) of the general analysis section of the NIG supercomputer.

Example :

```
scp your_file.txt youraccount@gw.ddbj.nig.ac.jp:/home/youraccount/data
```

## To use Aspera

Aspera is a commercial software that tranefers efficiently large file. 
It is mainly characterized by low degradation of transfer speed when moving big files over long distances and the ability to achieve transfer rates very close to the theoretical bandwidth with properly tuning.

The NIG supercomputer introduces Aspera servers with a total bandwidth of up to 10 Gbps. (The total bandwidth of NIG is 30 Gbps.)

### Reference

[System Configuration > Software > Aspera](../software/aspera/aspera.md) : how to use Aspera.
