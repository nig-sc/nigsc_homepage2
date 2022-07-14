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
