---
id: pg_transfer
title: "Data file transfer（The Personal Genome Analysis division）"
---



## How to transfer files using SSH protocol (scp, sftp) {#transfer-scp-sftp}

You can transfer files using `scp`, `sftp`, etc. to the gateway server (`gwa.ddbj.nig.ac.jp`) of the personal genome analysis division.

Example on Linux and Mac:

In this state, to `scp` the `your_file.txt` file in the current directory to the NIG supercomputer, execute the following command. 

`you` is the account name of the NIG supercomputer.


```
scp your_file.txt you@gw.ddbj.nig.ac.jp:/home/you
```

Example on Windows (PowerShell): 

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

2. In this state, to scp the `your_file.txt` file in the download folder to the NIG supercomputer, execute the following command. 

`you` is the account name of the NIG supercomputer.

```
PS C:\Users\youwin> scp .\Downloads\your_file.txt
you@gwa.ddbj.nig.ac.jp:/home/you
```



## How to transfer files using Archaea tools(formerly HCPtools) {#transfer-archaea-tools}

Refer to [How to use Archaea tools(formerly HCPtools)](/software/Archaea_tools).
