---
id: jupyter_lab
title: "Jupyter Lab"
---

Jupyter Lab was implemented based on Jupyter Notebook. Jupyter Lab provides better usability and supports extensions. You need to install it to use. Follow the instruction below.

## Jupyter Lab Installation {#installing-jupyter-lab}

You need to install conda before installation. Refer to [How to use Python](/guides/software/DevelopmentEnvironment/python).

You can install Jupyter Lab with conda.
```
$ conda install -c conda-forge jupyterlab
```


## Launch Jupyter Lab

Identify the node where you have launched Jupyter Lab. Note that the interactive node where you do qlogin varies each time because the job scheduler controls it according to load status.
```
(interactive node) $ hostname
at139
```
Confirm the port you want to use for Jupyter Lab is not used.
```
$ netstat -an|grep 8888
```
Set password for Jupyter Lab.
```
$ jupyter server --generate-config
Writing default config to: /lustre7/home/user/.jupyter/jupyter_server_config.py
$ jupyter server password
Enter password:
Verify password:
[JupyterPasswordApp] Wrote hashed password to /lustre7/home/user/.jupyter/jupyter_server_config.json
```
Then launch Jupyter Lab.
You can specify the port which you confirmed is exclusive above, but you need to check the assigned port from the standard output.
```
$ jupyter lab --no-browser --port=8888 --ip=`hostname`
[I 2024-03-19 10:22:38.636 ServerApp] Serving notebooks from local directory: /lustre7/home/user
[I 2024-03-19 10:22:38.636 ServerApp] Jupyter Server 2.12.5 is running at:
[I 2024-03-19 10:22:38.636 ServerApp] http://at083:8888/lab
[I 2024-03-19 10:22:38.636 ServerApp]     http://127.0.0.1:8888/lab
```
Once it launched, the prompt is not returned. Use Ctrl-C to terminate.


## Alternative: Launch Jupyter Lab with Job scheduler {#launch-alternative-jupyter-lalb}

Set password for Jupyter Lab
```
$ jupyter server --generate-config
Writing default config to: /lustre7/home/user/.jupyter/jupyter_server_config.py
$ jupyter server password
Enter password:
Verify password:
[JupyterPasswordApp] Wrote hashed password to /lustre7/home/user/.jupyter/jupyter_server_config.json
```

You need to prepare a job script for launching Jupyter Lab.
You can use an arbitrary port, but you need to check the assigned port from the log.
```
$ cat jupyter_lab
#!/bin/bash

#$ -cwd
#$ -V
#$ -l short
#$ -l s_vmem=16G
#$ -l mem_req=16G
#$ -N user_jupyter_lab
#$ -S /bin/bash

source ${HOME}/miniconda3/etc/profile.d/conda.sh
conda activate py312
jupyter lab --no-browser --port=8888 --ip=`hostname`
conda deactivate
```

Submit a job
```
$ qsub jupyter_lab
```
Confirm the node where the job is running.
This example shows at083 is being usued for the job.
```
$ qstat
job-ID     prior   name       user         state submit/start at     queue                          jclass                         slots ja-task-ID
------------------------------------------------------------------------------------------------------------------------------------------------
  25675539 0.25013 QLOGIN     user         r     03/13/2024 21:29:33 login.q@at137                                                     1
  25675545 0.25000 user_jupyt user         r     03/13/2024 21:45:20 short.q@at083                                                     1
```
Check the port that has been assigned from the log
```
$ grep -A1 running user_jupyter_lab.e25683453
[I 2024-03-19 10:42:03.438 ServerApp] Jupyter Server 2.12.5 is running at:
[I 2024-03-19 10:42:03.439 ServerApp] http://at084:28888/lab
```


## SSH Port Forwarding

Set up port forwarding on the `Jupyter_client` node where you want to use Jupyter Lab.
Once you run it, the prompt won't return. To terminate it use Ctrl-C.
```
$ ssh -i ~/.ssh/my_id_rsa -L 18888:at139:8888 <user>@gw.ddbj.nig.ac.jp
Enter passphrase for key '/home/user/.ssh/my_id_rsa':
```
The L option should be set as follows:

` -L <(1)>:<(2)>:<(3)> `

1. `Jupyter_client` port

2. Jupyter Lab Host Name

3. Jupyter Lab Port Specified


## Access Jupyter Lab

Open your web browser and access the following

` http://localhost:18888/ `

You are requested to enter your password, and so you enter yours.
After the authentication Jupyter Lab is available.
![figure](JupyterLab.PNG)


## Launch Python from Jupyter Lab with Job scheduler {#launch-python-jupyter-lab}

You can submit a Python job from `Console` or `Terminal` in Jupyter Lab.
In case you use `Console`, you have to prepend '!' to the command.

```
!qsub launch_python.sh
```

## Terminate Jupyter Lab

Click `Menu`->`Shut Down` in Jupyter Lab.
