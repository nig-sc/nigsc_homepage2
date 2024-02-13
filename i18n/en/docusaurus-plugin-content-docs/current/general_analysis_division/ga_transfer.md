---
id: ga_transfer
title: Data file transfer（The general analysis division）
---

For uploading and downloading data to the general analysis division of the NIG supercomputer, you can currently use the following two file transfer softwares.

- scp, sftp
- Aspera

## To transfer files with SSH protocol (scp, sftp)

You can use `scp`, `sftp`, etc. to transfer files to the gateway server (`gw.ddbj.nig.ac.jp`) of the general analysis division of the NIG supercomputer.

Example on Linux and Mac:

```
scp your_file.txt you@gw.ddbj.nig.ac.jp:/home/you
```

Example on Windows (PowerShell)

1. At first, start PowerShell. Then, by default, PowerShell starts with your home directory in Windows as the current directory ("youwin" is your Windows user name). Execute the following command to check that the SSH private key is in the following location. In this case, the SSH private key is the `id_rsa` file.

```
PS C:\Users\youwin> ls .ssh


    Directory: C:\Users\youwin\.ssh


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----        2023/11/28     16:18            160 config
-a----        2022/11/01     16:33           1766 id_rsa
-a----        2024/01/22     12:44           4885 known_hosts
-a----        2024/01/22     12:41           5453 known_hosts.old
```

2. In this state, to scp the `your_file.txt` file in the download folder to the supercomputer, execute the following command. ("you" is the account name of the NIG supercomputer).

```
PS C:\Users\youwin> scp .\Downloads\your_file.txt
you@gw.ddbj.nig.ac.jp:/home/you
```


## To use Aspera

Aspera is a commercial software that tranefers efficiently large file. 
It is mainly characterized by low degradation of transfer speed when moving big files over long distances and the ability to achieve transfer rates very close to the theoretical bandwidth with properly tuning.

The NIG supercomputer introduces Aspera servers with a total bandwidth of up to 10 Gbps. (The total bandwidth of NIG is 30 Gbps.)

### Reference

[System Configuration > Software > Aspera](../software/aspera/aspera.md) : how to use Aspera.
