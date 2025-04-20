---
id: faq_scp
title: "FAQ: scp etc."
---



## &#x1F180; I don't know how to transfer files stored on my personal laptop. {#file-transfer-from-laptop}

&#x1F150; To scp using PowerShell in Windows, follow these steps.

1. first, launch PowerShell. Then, PowerShell will start with your home directory of your Windows account as the current directory by default. 'user' is your username. In this state, run the following command to confirm that the SSH private key is located at the path below. In this case, the SSH private key is the id_rsa file.

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

2. In this state, to transfer the your_file.txt file from your personal computer to the NIG supercomputer using the scp command, execute the following command in PowerShell. 'useraccount' is your account name of the NIG supercomputer.

```
PS C:\Users\user> scp .\Downloads\your_file.txt
youraccount@gw.ddbj.nig.ac.jp:/home/youraccount
```


## &#x1F180; How can I transfer files to/from the NIG supercomputer using WinScp or FileZilla? {#filetransfer-winscp-filezilla}

&#x1F150; The NIG supercomputer website describes the procedure for transferring files using the scp and sftp commands.

- [Data file transfer (The general analysis division)](/guides/using_general_analysis_division/ga_data_transfer/)

If you want to use third-party software (e.g. WinScp or FileZilla), refer to the manual of each software after referring to the [Data file transfer (The general analysis division)](/guides/using_general_analysis_division/ga_data_transfer/) page.

- WinScp : 
[&#x1f517;WinSCP :: Official Site :: Free SFTP and FTP client for Windows](https://winscp.net/eng/index.php)


- FileZilla : 
[&#x1f517;FileZilla - The free FTP solution (filezilla-project.org)](https://filezilla-project.org/)
