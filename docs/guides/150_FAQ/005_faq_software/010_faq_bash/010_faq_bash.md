---
id: faq_bash
title: "FAQ: bash"
---

## &#x1F180; `.bashrc`などのシェル設定ファイルの読み込み順について教えてください {#shell-config}


&#x1F150; 読み込み順についての正式な情報源は、`bash(1)`マニュアルです。(`man bash`コマンドで表示できます。)

以下 4 つの場合でシェル設定ファイルの読み込み順が異なります。`bash(1)`マニュアルの該当の記載を併記します。

### 1, interactive, login shell {#interactive-login-shell}

`ssh` でログインした場合や`su -`を実行した場合など。(`su -`は`su --login`と同じ。ログインシェルとしてシェルを起動せよの意味。)
`qlogin`した場合もこれに該当します。

`~/.bash_profile`, `~/.bash_login`, `~/.profile`の順で探して最初に存在したファイルを読み込みます。

> When bash is invoked as an interactive login shell, or as a non-interactive shell with the --login option, it first
> reads and executes commands from the file `/etc/profile`, if that file exists.  After reading that file, it looks for
> `~/.bash_profile`,  `~/.bash_login`,  and `~/.profile`, in that order, and reads and executes commands from the first one
> that exists and is readable.  The `--noprofile` option may be used when the shell is started to inhibit  this  behavior.

したがって bash の動作としては SSH でログインした際には`~/.bashrc`は自動的には読み込まれませんが、
上記のシェル設定ファイルの中に`~/.bashrc`を読み込むように書かれている場合が多い、という関係にあります。

### 2, interactive, non-login shell {#interactive-non-login-shell}

ターミナルエミュレータを起動した場合や、`screen`, emacs の shell-mode を起動した場合など。

`~/.bashrc`が読み込まれます。

> When an interactive shell that is not a login shell is started, bash reads and executes commands from `~/.bashrc`, if
> that  file  exists.  This may be inhibited by using the `--norc` option.  The `--rcfile` file option will force bash to
> read and execute commands from file instead of `~/.bashrc`.


- 注意: GNU screen と同じような機能を持つポピュラーなソフトウェアとして`tmux`がありますが、`tmux`を起動するとデフォルトでは bash はログインシェルとして起動します。


### 3, non-interactive, login shell {#non-interactive-login-shell}

scp を実行する場合や、ローカルマシンにあるスクリプトをリモートサーバ上で実行する場合がこれに当たります。

```
ssh you@remotehost 'bash -s' < local_script.sh
```

`~/.bashrc`が読み込まれます。

> Bash attempts to determine when it is being run with its standard input connected to a network connection, as  when
> executed by the remote shell daemon, usually `rshd`, or the secure shell daemon `sshd`.  If bash determines it is being
> run in this fashion, it reads and executes commands from `~/.bashrc`, if that file exists and is readable.   It  will
> not  do this if invoked as `sh`.  The `--norc` option may be used to inhibit this behavior, and the `--rcfile` option may
> be used to force another file to be read, but rshd does not generally invoke the shell with those options or  allow
> them to be specified.
> 

### 4, non-interactive non-login shell {#non-interactive-non-login-shell}

シェルスクリプトを実行した場合など。
 
シェル設定ファイルは読み込まれません。


参考資料
- https://qiita.com/ono_matope/items/feebac51afb346d9db0e


## &#x1F180; 環境を初期状態に戻したいのですが、どのようにしたらよいでしょうか。(Ubuntu Linux 22.04 の場合) {#ubuntu-initialization}


&#x1F150; 環境を初期状態に戻すには`.bash_profile`, `.bashrc`を以下の状態に戻してログインし直してください。



### `.bash_profile` {#dot-bash_profile}

```
source ~/.bashrc
```


### `.bashrc` {#dot-bashrc}


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




## &#x1F180; 環境を初期状態に戻したいのですが、どのようにしたらよいでしょうか。(CentOS 7 の場合){#centos7-initialization}



&#x1F150; アカウント作成直後の`.bash_profile`, `.bashrc`は以下のとおりです。
これらのファイルをこの状態に戻してログインし直してください。

### `.bash_profile` {#dot-bash_profile}

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


### `.bashrc`{#dot-bashrc}

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


