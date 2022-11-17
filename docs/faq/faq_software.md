---
id: faq_software
title: "FAQ(ソフトウェア一般)"
---

## 環境を初期状態に戻したい

アカウント作成直後の`.bashrc`, `.bash_profile`は以下のとおりですので、環境を初期状態に戻すには`.bashrc`, `.bashr_profile`をこの状態に戻してログインし直してください。

**.bashrc**

```bash
# .bashrc

# Source global definitions
if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi

# Uncomment the following line if you don't like systemctl's auto-paging feature:
# export SYSTEMD_PAGER=

# User specific aliases and functions
module load gcc
```

**.bash_profile**

```bash
# .bash_profile

# Get the aliases and functions
if [ -f ~/.bashrc ]; then
	. ~/.bashrc
fi

# User specific environment and startup programs

PATH=$PATH:$HOME/.local/bin:$HOME/bin

export PATH
```


## PuttyやTeraTermなどを使って遺伝研スパコンにログインする方法を教えてください。

ホームページではWindowsに標準搭載されているPowerShellをターミナルエミュレータとして使った場合の利用手順を記載しています。サードパーティ製のターミナルエミュレータ(PuttyやTeraTerm等)を利用したい場合は、PowerShellの場合の利用方法をご参考の上、各ソフトウェアのマニュアルをご参照ください。

- Putty : 
[&#x1f517;<u>PuTTY: a free SSH and Telnet client (greenend.org.uk)</u>](https://www.chiark.greenend.org.uk/~sgtatham/putty/)


- TeraTerm : 
[&#x1f517;<u>Tera Term Open Source Project (osdn.jp)</u>](https://ttssh2.osdn.jp/index.html.en)


## 遺伝研スパコンでWinScpやFileZillaなどを使ってにファイル転送する方法を教えてください。

遺伝研スパコンでは、scpやsftpの他、遠距離間で大量のファイルを高速通信で転送する場合には、一般解析区画では[<u>Aspera</u>](/software/aspera/)、個人ゲノム解析区画では[<u>HCPtools</u>](/software/HCPtools/)というファイル転送ソフトウェアが利用可能となっています。
サードパーティ製のソフトウェア(WinScpやFileZilla等)を利用したい場合は、[<u>Aspera</u>](/software/aspera/)や[<u>HCPtools</u>](/software/HCPtools/)のページをご参考の上、各ソフトウェアのマニュアルをご参照ください。

- WinScp : 
[&#x1f517;<u>WinSCP :: Official Site :: Free SFTP and FTP client for Windows</u>](https://winscp.net/eng/index.php)


- FileZilla : 
[&#x1f517;<u>FileZilla - The free FTP solution (filezilla-project.org)</u>](https://filezilla-project.org/)
