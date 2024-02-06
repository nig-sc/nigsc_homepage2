---
id: pg_transfer
title: "Data file transfer（The Personal Genome Analysis division）"
---



## How to transfer files using SSH protocol (scp, sftp)

You can transfer files using scp, sftp, etc. to the gateway server (gwa.ddbj.nig.ac.jp) of the personal genome analysis division.

Example :

```
scp your_file.txt youraccount@gwa.ddbj.nig.ac.jp:/home/youraccount/data
```

<details>
<summary>
&#x1F180; I don't know how to transfer files stored in the downloads folder on my personal laptop. </summary>

<p>

&#x1F150; Using PowerShell in Windows to scp is as follows.

1. At first, start PowerShell. Then, by default, PowerShell starts with your home directory in Windows as the current directory ("user" is your user name). Execute the following command to check that the SSH private key is in the following location. In this case, the SSH private key is the id_rsa file.

```
PS C:\Users\user> ls .ssh


    Directory: C:\Users\user\.ssh


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----        2023/11/28     16:18            160 config
-a----        2022/11/01     16:33           1766 id_rsa
-a----        2024/01/22     12:44           4885 known_hosts
-a----        2024/01/22     12:41           5453 known_hosts.old
```

2. In this state, to scp the your_file.txt file in the download folder to the supercomputer, execute the following command. ("useraccount" is the account name of the NIG supercomputer).

```
PS C:\Users\user> scp .\Downloads\your_file.txt
youraccount@gwa.ddbj.nig.ac.jp:/home/youraccount
```

</p>
</details>


## How to transfer files using HCPtools

Refer to [How to use HCP tools](/software/Archaea_tools).
