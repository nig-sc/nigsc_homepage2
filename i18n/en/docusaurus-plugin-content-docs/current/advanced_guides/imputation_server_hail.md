---
id: imputation_server_hail
title: "Tutorial 3 - PRS calculation with hail"
---

<img
  src={require('./imputationserver.logo_color.png').default}
  alt=''
  style={{ width: '200px' }}
/>

This Tutorial 3 describes how to set up an environment for analysing the results of an imputation server's imputation results in [&#x1f517;<u>hail</u>](https://hail.is)  to analyse the results of an imputation server.

## Connecting to NIG Guacamole desktop environment

You need to sign in to NIG Guacamole desktop environment via VPN first.

Next, please launch the terminal from the "Activities" in the Guacamole desktop environment.

You need to run the following tutorial in the terminal that you launched above.

## Preparations

### Installing miniconda

If you can already use the conda command, skip this section and proceed to `Building a conda environment using conda-forge`.
If you cannot use the conda command, run the following commands to install miniconda.

```
$ wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
$ chmod 755 ./Miniconda3-latest-Linux-x86_64.sh
$ ./Miniconda3-latest-Linux-x86_64.sh
```

After running the above commands, the terminal shows the following message continuing to the license terms.

```
Welcome to Miniconda3 py312_24.3.0-0

In order to continue the installation process, please review the license
agreement.
Please, press ENTER to continue
>>>
```

Pressing the ENTER key displays the text of the end user licence agreement.
By pressing the SPACE key several times, the text scrolls and a confirmation question appears asking whether you accept the following licence terms.

```
7. Intellectual Property Notice. You acknowledge that, as between You and
Anaconda, Anaconda owns all right, title, and interest, including all
intellectual property rights, in and to Miniconda(R) and, with respect to
third-party products distributed with or through Miniconda(R), the applicable
third-party licensors own all right, title and interest, including all
intellectual property rights, in and to such products.


Do you accept the license terms? [yes|no]
>>>
```

Type `yes` and press ENTER to continue.

Next, you will see `Miniconda3 will now be installed into this location: /home/<username>/miniconda3:`.
If the installation location is OK, press the ENTER key.
If you want to install in a different location, specify a different path.
You will then be asked `Do you wish to update your shell profile to automatically initialise conda? [yes|no]`.
Type `yes` or `no` and press ENTER to proceed. (We recommend typing `no`.)

Run the following command to set PATH for to the conda command.

```
$ PATH=$PATH:~/miniconda3/bin
```

Then, once sign out and re-enter to the terminal.

Finally, check that the conda command is available by running the following command.

```
$ which conda
$ conda --version
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
