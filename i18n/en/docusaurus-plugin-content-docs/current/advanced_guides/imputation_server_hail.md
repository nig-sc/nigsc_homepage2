---
id: imputation_server_hail
title: "Tutorial 3 - PRS calculation with hail"
---

This Tutorial 3 describes how to set up an environment for analysing the results of an imputation server's imputation results in [&#x1f517;<u>hail</u>](https://hail.is)  to analyse the results of an imputation server.


Login to the guacamole virtual machine.


## If you do not have a conda environment

If you already have a conda environment, skip the following `miniconda installation` and go on to `create environment with conda`.

### Installing miniconda

As Anaconda requires a paid licence for some uses, it is recommended that you install miniconda and `conda'.

In the following, miniconda and `conda-forge` are used.

```
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
chmod 755 ./Miniconda3-latest-Linux-x86_64.sh
./Miniconda3-latest-Linux-x86_64.sh
```

Leave and re-enter the working environment terminal or SSH.

Check that conda is available.

```
which conda
conda --version
```


### Creating the conda environment

Create Jupyter and Hail environments in the following method

```
conda create -c conda-forge -n hail-python37-openjdk8 python=3.7 openjdk=8
```

Activate the development environment:

```
conda activate hail-python37-openjdk8
```

To deactivate (when exiting) the conda environment:

```
conda deactivate
```


## Installing Jupyter and hail

In the conda environment for Jupyter and hail, execute the following commands.

```
pip install hail
pip install jupyter
```

The following commands are also required. This means that 48G of memory is allocated for hail.
If this memory is low, hail will output an out-of-memory error and the calculation will not be able to resume.

```
export PYSPARK_SUBMIT_ARGS='--driver-memory 48g --executor-memory 48g pyspark-shell'
```

Also create the following working directory for the tutorial notebook.

### Creating directory

```
mkdir ~/prs-on-hail
```

### Starting Jupyter

```
jupyter notebook --notebook-dir=~/prs-on-hail
```

To actually on a supercomputer, see [<u>the Jupyter Notebook page</u>](/software/jupyter_notebook).


### Checking Hail startup

Create one new Jupyter Notebook, enter the following in the first cell and run it.

```
import hail as hl
```

Enter the following in the next cell and run it.

```
hl.init()
```

Check that there are no errors.

### Notebook for performing PRS calculations using the imputation results as input to hail

Refer to the following notebook and use hail on Jupyter.


&#x1f517;<u>https://nbviewer.org/github/ddbj/imputation-server-wf/blob/main/Notebooks/hail-prs-tutorial.ipynb</u>
