---
id: python
title: "How to use Python"
---

Python is installed on the system. To check the Python version and installed packages, run the following.
```
$ python --version
Python 3.10.12
$ pip list
Package                                          Version
------------------------------------------------ ------------------
matplotlib                                       3.5.1
numpy                                            1.21.5
pandas                                           1.3.5
scikit-learn                                     0.23.2
scipy                                            1.8.0
```
You need to set up a virtual Python environment in your home directory in order to use the version of Python that is not installed and / or packages that are not installed. Note that in this case, you install packages on Lustre and so using the packages may cause a performance drop compared with preinstalled packages on local drive. Hereafter, four approaches will be explained. Ranked from least involved to most involved
|Virtual Env Tool         |Description                                                                                                               |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------|
|[venv](#venv)            |official Python Virtual Env Tool, installation with pip supported                                                         |
|[virtualenv](#virtualenv)|similar to venv, Python2 supported                                                                                        |
|[pyenv](#pyenv)          |arbitrary version of Python can be intorduced, package management per version provided                                    |
|[Miniconda](#miniconda)  |provides the management of Python version and libraries per virt env, used to install [Jupyter Lab](/software/jupyter_lab)|


## venv
venv is the official Pyhton tool for virtual environment. You need to use it to install and use packages that are not installed.
```
$ python -m venv ~/venv_p310
$ source ~/venv_p310/bin/activate
$ python --version
Python 3.10.12
```
After you activate your virtual environment, use pip to install required libraries
```
$ pip install torch
```
To terminate your virtual environment. use `deactivate`
```
$ deactivate
```
### Launch Python with Job scheduler
You need to run Python after you activate your virtual environment in your job script.
#### Grid Engine
```
$ cat launch_python.sh
#!/bin/bash
#$ -cwd
#$ -V
#$ -l short
#$ -l s_vmem=16G
#$ -l mem_req=16G
#$ -N user_tensorflow
#$ -S /bin/bash
source ${HOME}/venv_p310/bin/activate
python tensorflow-testing.py
deactivate
$ qsub launch_python.sh
```
#### Slurm
```
$ cat launch_python.sh
#!/bin/bash
#SBATCH -N 1
#SBATCH -n 1
#SBATCH -c 1
#SBATCH --mem-per-cpu=16G
#SBATCH -t 0-01:00:00
#SBATCH -J user_tensorflow
source ${HOME}/venv_p310/bin/activate
python tensorflow-testing.py
deactivate
$ sbatch launch_python.sh
```
Refer to the official web page for the details [venv --- Create Virtual Envi](https://docs.python.org/ja/3/library/venv.html)```
## virtualenv
Basically, you need virtualenv in order to use Python2.
```
$ virtualenv -p python2.7 ~/p27
$ source ~/p27/bin/activate
$ python --version
Python 2.7.18
```
After you activate your virtual environment, use pip to install required libraries
```
$ pip install torch
```
To terminate your virtual environment, use `deactivate`
```
$ deactivate
```
### Launch Python with Job scheduler
You need to run Python after you activate your virtual environment in your job script.
#### Grid Engine
```
$ cat launch_python.sh
#!/bin/bash
#$ -cwd
#$ -V
#$ -l short
#$ -l s_vmem=16G
#$ -l mem_req=16G
#$ -N user_tensorflow
#$ -S /bin/bash
source ${HOME}/p27/bin/activate
python tensorflow-testing.py
deactivate
$ qsub launch_python.sh
```
#### Slurm
```
$ cat launch_python.sh
#!/bin/bash
#SBATCH -N 1
#SBATCH -n 1
#SBATCH -c 1
#SBATCH --mem-per-cpu=16G
#SBATCH -t 0-01:00:00
#SBATCH -J user_tensorflow
source ${HOME}/p27/bin/activate
python tensorflow-testing.py
deactivate
$ sbatch launch_python.sh
```
Refer to the official web page for the details [virtualenv User Guide](https://virtualenv.pypa.io/en/latest/user_guide.html)

## pyenv
You need to use pyenv to install and use the versions of Python that are not installed. You can manage packages per Python version.
You can activate your virtual environment for all directories (global) or any given directory (local).
```
$ git clone https://github.com/pyenv/pyenv.git ~/.pyenv
$ echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
$ echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
$ echo 'eval "$(pyenv init -)"' >> ~/.bashrc
$ source ~/.bashrc
```
You need to confirmw what versions of Python are available and You can install the required version.
```
$ pyenv install --list
Available versions:
  3.10.13
  3.11.7
  3.12.0
  3.12.1
  3.12.2
$ pyenv install 3.12.2
```
After you install Python, you need to activate the version of Python. You can set global version and local version. The global version affects all directries and local version only affects the currnet directory
```
$ pyenv global 3.12.1
$ mkdir ~/p3122;cd $_;pyenv local 3.12.2
$ python --version
Python 3.12.2
```
After you enter your virtual environment, use pip to install required libraries
```
$ pip install torch
```
### Launch Python with Job scheduler
You need to run Python after you move to your virtual environment in your job script.
#### Grid Engine
```
$ cat launch_python.sh
#!/bin/bash
#$ -cwd
#$ -V
#$ -l short
#$ -l s_vmem=16G
#$ -l mem_req=16G
#$ -N user_tensorflow
#$ -S /bin/bash
WORKDIR=${HOME}/p3122
cd ${WORKDIR}
python tensorflow-testing.py
$ qsub launch_python.sh
```
#### Slurm
```
$ cat launch_python.sh
#!/bin/bash
#SBATCH -N 1
#SBATCH -n 1
#SBATCH -c 1
#SBATCH --mem-per-cpu=16G
#SBATCH -t 0-01:00:00
#SBATCH -J user_tensorflow
WORKDIR=${HOME}/p3122
cd ${WORKDIR}
python tensorflow-testing.py
$ sbatch launch_python.sh
```
Refer to the official web page for the details [pyenv](https://github.com/pyenv/pyenv)

## Miniconda
Miniconda is needed if you need to use a version of Python that is not installed on the sysytem and need to use packages that are not installed on the system and need to manage packages per virutal environment with the same version of Python.
```
$ mkdir ~/miniconda3
$ wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh
$ sh ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
$ rm -f ~/miniconda3/miniconda.sh
$ ~/miniconda3/bin/conda init bash
$ source ~/.bashrc
```
You need to set the conda-forge repository to the default repository and confirm whether it is added to .condarc.
```
$ conda config --add channels conda-forge
$ conda config --set channel_priority strict
$ vim ~/.condarc
```
The `base` environment starts by default. It may be safe to disable this behavior to prevent you from setting up unintended environment.
```
(base) $ conda deactivate
$ conda config --set auto_activate_base false
```

Confirm what versions of Python are available and create a virtual environment with the required version of Python.
```
$ conda search -f python
Loading channels: done
# Name                       Version           Build  Channel
python                        3.9.18      h955ad1f_0  pkgs/main
python                       3.10.13      h955ad1f_0  pkgs/main
python                        3.11.7      h955ad1f_0  pkgs/main
python                        3.12.1      h996f2a0_0  pkgs/main
$ conda create --name py312 python=3.12.1
$ conda activate py312
$ python --version
Python 3.12.0
```
Install required packages by using `conda install`
```
$ conda install pytorch
```
To terminate your virtual environmnet, use `deactivate`
```
$ conda deactivate
```
### Launch Python with Job scheduler
You need to run Python after you activate your virtual environment in your job script.
#### Grid Engine
```
$ cat launch_python.sh
#!/bin/bash
#$ -cwd
#$ -V
#$ -l short
#$ -l s_vmem=16G
#$ -l mem_req=16G
#$ -N user_tensorflow
#$ -S /bin/bash
source ${HOME}/miniconda3/etc/profile.d/conda.sh
conda activate py312
python tensorflow-testing.py
conda deactivate
$ qsub launch_python.sh
```
#### Slurm
```
$ cat launch_python.sh
#!/bin/bash
#SBATCH -N 1
#SBATCH -n 1
#SBATCH -c 1
#SBATCH --mem-per-cpu=16G
#SBATCH -t 0-01:00:00
#SBATCH -J user_tensorflow
source ${HOME}/miniconda3/etc/profile.d/conda.sh
conda activate py312
python tensorflow-testing.py
conda deactivate
$ sbatch launch_python.sh
```
Refer to the official web page for the details [Installing on Linux conda 4.10.3.post11+888309718 documentation](https://conda.io/projects/conda/en/latest/user-guide/install/linux.html)
