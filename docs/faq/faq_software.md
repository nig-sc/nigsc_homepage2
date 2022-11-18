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

ホームページではWindowsに標準搭載されているPowerShellをターミナルエミュレータとして使った場合の利用手順を記載しています。

- [<u>SSH公開鍵の登録・変更</u>](/application/ssh_keys)
- [<u>SSH公開鍵の登録(Windowsの場合)</u>](/application/ssh_keys_windows)

サードパーティ製のターミナルエミュレータ(PuttyやTeraTerm等)を利用したい場合は、PowerShellの場合の利用方法をご参考の上、各ソフトウェアのマニュアルをご参照ください。

- Putty : 
[&#x1f517;<u>PuTTY: a free SSH and Telnet client (greenend.org.uk)</u>](https://www.chiark.greenend.org.uk/~sgtatham/putty/)


- TeraTerm : 
[&#x1f517;<u>Tera Term Open Source Project (osdn.jp)</u>](https://ttssh2.osdn.jp/index.html.en)


## 遺伝研スパコンでWinScpやFileZillaなどを使ってにファイル転送する方法を教えてください。

ホームページではscp, sftpコマンドを用いたファイル転送の手順を記載しています。

- [<u>データ転送(一般解析区画)</u>](/general_analysis_division/ga_transfer/)

サードパーティ製のソフトウェア(WinScpやFileZilla等)を利用したい場合は、[<u>データ転送(一般解析区画)</u>](/general_analysis_division/ga_transfer/)をご参考の上、各ソフトウェアのマニュアルをご参照ください。

- WinScp : 
[&#x1f517;<u>WinSCP :: Official Site :: Free SFTP and FTP client for Windows</u>](https://winscp.net/eng/index.php)


- FileZilla : 
[&#x1f517;<u>FileZilla - The free FTP solution (filezilla-project.org)</u>](https://filezilla-project.org/)
