---
id: go
title: "Go"
---


Go is not installed on the NIG supercomputer. You need to install Go by yourself. The following describes the way to install and use Go.


## Go Installation

Find and download the latest version of Go from the official site [Go All releases](https://go.dev/dl/)
```
$ wget https://go.dev/dl/go1.22.4.linux-amd64.tar.gz
```
If you have old Go installations, remove them before you untar the archive.
```
$ rm -rf ~/local/go
```
:::warning
Do not untar the archive into your existing Go installation tree. This is known to produce broken Go installations.
:::

Untar the archive.
```
$ tar -C ~/local -zxf go1.22.4.linux-amd64.tar.gz
```
:::warning
Do not untar the archive into $HOME. The default location of $GOPATH is $HOME/go. Therefore, if you have checked out the Go distribution to $HOME/go, you must set GOPATH to another location to avoid conflicts.
:::

Add your Go installation path to the PATH environment variable.
```
$ echo 'export PATH=$PATH:$HOME/local/go/bin' > ~/.profile
```
:::note
Changes made to a profile file will not apply until the next time you login. To apply the changes immediately, just run the shell commands directly or execute them from the profile using a command `source $HOME/.profile`.
:::

Verify that you've installed Go
```
$ go version
go version go1.22.4 linux/amd64
```

## Launch Go with Job scheduler

Run your Go program in your job script.

### Grid Engine

```
$ cat launch_go.sh
#!/bin/bash
#$ -cwd
#$ -V
#$ -l short
#$ -l s_vmem=16G
#$ -l mem_req=16G
#$ -N user_go
#$ -S /bin/bash
s3_upload_objects
$ qsub launch_go.sh
```

### Slurm

```
$ cat launch_go.sh
#!/bin/bash
#SBATCH -N 1
#SBATCH -n 1
#SBATCH -c 1
#SBATCH --mem-per-cpu=16G
#SBATCH -t 0-01:00:00
#SBATCH -J user_go
WORKDIR=${HOME}/s3-list
cd ${WORKDIR}
go run .
$ sbatch launch_go.sh
```
