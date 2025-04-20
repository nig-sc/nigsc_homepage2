---
id: faq_bash
title: "FAQ: bash"
---


## &#x1F180; What is the order in which shell configuration files such as `.bashrc` are loaded? {#shell-config}


&#x1F150; The official information source for reading order is the `bash(1)` manual. (You can display it with the `man bash` command.)

The order in which shell configuration files are loaded differs in the following four cases. The corresponding descriptions in the `bash(1)` manual are given below.

### 1, interactive, login shell {#shell-config#interactive-login-shell}

When logging in with `ssh` or executing `su -`. (`su -` is the same as `su --login`. It means start a shell as a login shell.)
This also applies if you execute `qlogin`.

`~/.bash_profile`,  `~/.bash_login`,  and `~/.profile`, in that order, search and reads the first file that exists.

> When bash is invoked as an interactive login shell, or as a non-interactive shell with the --login option, it first
> reads and executes commands from the file `/etc/profile`, if that file exists.  After reading that file, it looks for
> `~/.bash_profile`,  `~/.bash_login`,  and `~/.profile`, in that order, and reads and executes commands from the first one
> that exists and is readable.  The `--noprofile` option may be used when the shell is started to inhibit  this  behavior.

Therefore, the behaviour of bash is that `~/.bashrc` is not automatically readed when you log in with SSH, but the relationship is that it is often written to read `~/.bashrc` in the shell configuration file above.

### 2, interactive, non-login shell {#shell-config#interactive-non-login-shell}

When a terminal emulator is started, or `screen`, or shell-mode of emacs is started.

`~/.bashrc` is read.

> When an interactive shell that is not a login shell is started, bash reads and executes commands from `~/.bashrc`, if
> that  file  exists.  This may be inhibited by using the `--norc` option.  The `--rcfile` file option will force bash to
> read and execute commands from file instead of `~/.bashrc`.


- Note: A popular software with similar functionality to GNU screen is `tmux`, but when `tmux` is started, bash is started as a login shell by default.


### 3, non-interactive, login shell {#shell-config#non-interactive-login-shell}

When executing scp or running a script on a local machine on a remote server.

```
ssh you@remotehost 'bash -s' < local_script.sh
```

`~/.bashrc` is read.

> Bash attempts to determine when it is being run with its standard input connected to a network connection, as  when
> executed by the remote shell daemon, usually `rshd`, or the secure shell daemon `sshd`.  If bash determines it is being
> run in this fashion, it reads and executes commands from `~/.bashrc`, if that file exists and is readable.   It  will
> not  do this if invoked as `sh`.  The `--norc` option may be used to inhibit this behavior, and the `--rcfile` option may
> be used to force another file to be read, but rshd does not generally invoke the shell with those options or  allow
> them to be specified.
> 

### 4, non-interactive non-login shell {#shell-config#non-interactive-non-login-shell}

When running a shell scrip, etc.

Shell configuration files are not read.


Reference
- https://qiita.com/ono_matope/items/feebac51afb346d9db0e


## &#x1F180; I want to restore my computer environment to its initial state. (Ubuntu Linux 22.04) {#ubuntu-initialization}


&#x1F150; To restore the environment to its initial state, change `.bash_profile` and `.bashrc` back to the following state and log in again.


### `.bash_profile` {#ubuntu-initialization#dot-bash_profile}

```
source ~/.bashrc
```


### `.bashrc` {#ubuntu-initialization#dot-bashrc}


```
# If this variable is already set, skip the rest of the script
if [ -n "$BASHRC_LOADED" ]; then
    return
fi

# Set the variable to indicate that the script has been loaded
BASHRC_LOADED=1

# ---

# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

# don't put duplicate lines or lines starting with space in the history.
# See bash(1) for more options
HISTCONTROL=ignoreboth

# append to the history file, don't overwrite it
shopt -s histappend

# for setting history length see HISTSIZE and HISTFILESIZE in bash(1)
HISTSIZE=1000
HISTFILESIZE=2000

# check the window size after each command and, if necessary,
# update the values of LINES and COLUMNS.
shopt -s checkwinsize

# If set, the pattern "**" used in a pathname expansion context will
# match all files and zero or more directories and subdirectories.
#shopt -s globstar

# make less more friendly for non-text input files, see lesspipe(1)
[ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

# set variable identifying the chroot you work in (used in the prompt below)
if [ -z "${debian_chroot:-}" ] && [ -r /etc/debian_chroot ]; then
    debian_chroot=$(cat /etc/debian_chroot)
fi

# set a fancy prompt (non-color, unless we know we "want" color)
case "$TERM" in
    xterm-color|*-256color) color_prompt=yes;;
esac

# uncomment for a colored prompt, if the terminal has the capability; turned
# off by default to not distract the user: the focus in a terminal window
# should be on the output of commands, not on the prompt
#force_color_prompt=yes

if [ -n "$force_color_prompt" ]; then
    if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
	# We have color support; assume it's compliant with Ecma-48
	# (ISO/IEC-6429). (Lack of such support is extremely rare, and such
	# a case would tend to support setf rather than setaf.)
	color_prompt=yes
    else
	color_prompt=
    fi
fi

if [ "$color_prompt" = yes ]; then
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi
unset color_prompt force_color_prompt

# If this is an xterm set the title to user@host:dir
case "$TERM" in
xterm*|rxvt*)
    PS1="\[\e]0;${debian_chroot:+($debian_chroot)}\u@\h: \w\a\]$PS1"
    ;;
*)
    ;;
esac

# enable color support of ls and also add handy aliases
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    #alias dir='dir --color=auto'
    #alias vdir='vdir --color=auto'

    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
fi

# colored GCC warnings and errors
#export GCC_COLORS='error=01;31:warning=01;35:note=01;36:caret=01;32:locus=01:quote=01'

# some more ls aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'

# Add an "alert" alias for long running commands.  Use like so:
#   sleep 10; alert
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'

# Alias definitions.
# You may want to put all your additions into a separate file like
# ~/.bash_aliases, instead of adding them here directly.
# See /usr/share/doc/bash-doc/examples in the bash-doc package.

if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi

# enable programmable completion features (you don't need to enable
# this, if it's already enabled in /etc/bash.bashrc and /etc/profile
# sources /etc/bash.bashrc).
if ! shopt -oq posix; then
  if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
  elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
  fi
fi

```


## &#x1F180; I want to restore my computer environment to its initial state. (CentOS 7) {#centos7-initialization}

&#x1F150; The state of `.bashrc` and `.bash_profile` immediately after account creation are as follows, so to restore the environment to its initial state, restore the `.bashrc` and `.bashr_profile` to this state and login again.

### `.bash_profile` {#centos7-initialization#dot-bash_profile}

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


### `.bashrc` {#centos7-initialization#dot-bashrc}

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
