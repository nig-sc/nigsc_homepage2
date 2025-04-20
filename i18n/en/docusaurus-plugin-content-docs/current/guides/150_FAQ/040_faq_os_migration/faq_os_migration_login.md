---
id: faq_os_migration_login
title: "Questions about behavior at login"
---

## &#x1F180; After the scheduled maintenance in FY2023, when I tried to qlogin, I got an error `ERROR: Unable to locate a modulefile for 'gcc'`. {#module_load}

&#x1F150; This error can be safely ignored.

While the OS has changed from CentOS 7 to Ubuntu, the `.bashrc` on the user's home directory is still the same.
On Ubuntu, the environmental modules are no longer used, so the module load is causing an error, and this error occurs.

It is harmless, but it will appear frequently. So comment out or delete the following lines in `~/.bashrc`. Then, the error will no longer occur.

```
module load gcc
```

Similarly, the following similar errors should be commented out or removed to prevent them from occurring.

For example,

```
> ERROR: Unable to locate a modulefile for 'r/3.5.2'
> ERROR: Unable to locate a modulefile for 'singularity'
```

If such an error occurs, comment out or delete the following lines in `~/.bashrc`.

```
module load r/3.5.2
module load singularity
```


## &#x1F180; After the scheduled maintenance in FY2023, files and directories are not colour coded after `ls`. {#ls-coloring}

&#x1F150; If you would like to colour-code files and directories after `ls`, add the following description to the shell configuration file `.bashrc`.


```
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
```

Or restore the shell configuration file to its initial state as described on  this page: [I want to restore my computer environment to its initial state. (Ubuntu Linux 22.04)](/guides/FAQ/faq_software/faq_bash/#ubuntu-initialization)

For an explanation of shell configuration files, see the section ['What is the order in which shell configuration files such as .bashrc are loaded?'](/guides/FAQ/faq_software/faq_bash/#shell-config) on [the Software General page](/guides/FAQ/faq_software/faq_bash/).

