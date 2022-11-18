---
id: faq_software
title: "FAQ(Software General)"
---


## I want to restore my computer environment to its initial state.

The state of `.bashrc` and `.bash_profile` immediately after account creation are as follows, so to restore the environment to its initial state, restore the `.bashrc` and `.bashr_profile` to this state and login again.

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


## How do I log in to the genetic laboratory supercomputer using Putty or TeraTerm?

The NIG supercomputer website describes the procedure for using PowerShell, which comes standard with Windows, as a terminal emulator. 

- [<u>Registering or changing SSH public keys</u>](/application/ssh_keys)
- [<u>Registering or changing SSH public keys (Windows)</u>](/application/ssh_keys_windows)

If you want to use a third-party terminal emulator (Putty, TeraTerm, etc.), refer to the manual of each software after referring to the instructions for using PowerShell.

- Putty : 
[&#x1f517;<u>PuTTY: a free SSH and Telnet client (greenend.org.uk)</u>](https://www.chiark.greenend.org.uk/~sgtatham/putty/)


- TeraTerm : 
[&#x1f517;<u>Tera Term Open Source Project (osdn.jp)</u>](https://ttssh2.osdn.jp/index.html.en)


## How can I transfer files to/from the NIG supercomputer using WinScp or FileZilla?

The NIG supercomputer website describes the procedure for transferring files using the scp and sftp commands.

- [<u>Data file transfer (The general analysis section)</u>](/general_analysis_division/ga_transfer/)

If you want to use third-party software (e.g. WinScp or FileZilla), refer to the manual of each software after referring to the [<u>Data file transfer (The general analysis section)</u>](/general_analysis_division/ga_transfer/) page.

- WinScp : 
[&#x1f517;<u>WinSCP :: Official Site :: Free SFTP and FTP client for Windows</u>](https://winscp.net/eng/index.php)


- FileZilla : 
[&#x1f517;<u>FileZilla - The free FTP solution (filezilla-project.org)</u>](https://filezilla-project.org/)
