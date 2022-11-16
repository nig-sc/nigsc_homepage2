---
id: python
title: "Python"
---

The Python processor can be installed with user permission, so install the version you need in your home directory.


## Installation example with MIniconda 

 Follow the steps in the official manual. [Installing on Linux conda 4.10.3.post11+888309718 documentation](https://conda.io/projects/conda/en/latest/user-guide/install/linux.html)
 
 Locate the Miniconda downloaded from the official page in a suitable location and execute it as follows. After executing, follow the instructions of the installer.
 
 ```
 cd ~/local/src
 bash Miniconda3-py39_4.10.3-Linux-x86_64.sh
 ```
 
 During installation, you will be asked if you want to run conda init, select NO.
 After installation, a Miniconda3 folder will be created directly in your home directory.
 
 Execute the following two lines. Also add them to ~/.bashrc.
 
 ```
 export PATH=~/miniconda3/bin:$PATH
 source ~/miniconda3/etc/profile.d/conda.sh
 ```
  

Set the conda-forge repository to default and make sure it is added to the top of the .condarc.

```
$ conda config --add channels conda-forge
$ conda config --set channel_priority strict
$ sudo vim /home/imo/.condarc
```

## Check operation

```
$ python --version 
Python 3.9.5 

$ python3 --version 
Python 3.9.5 
```

Reference:  [Miniconda Install notebook - Qiita](https://qiita.com/Ihmon/items/11074e1a4c0e397d934f)

