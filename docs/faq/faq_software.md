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
