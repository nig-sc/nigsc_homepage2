---
id: jupyter_notebook
title: "How to use Jupyter Notebook"
---
Jupyter Notebook is installed on the system. Follow the instruction below to use.[^1]

[^1]:Jupyter Lab provides better usability and supports extensions. [Jupyter Lab](/software/jupyter_lab) is recommended.
### Launch Jupyter Notebook
Identify the node where you launch Jupyter Notebook. Note that the interactive node where you do qlogin varies each time because the job scheduler controls it according to load status.
```
(login node) $ hostname
at139
```
Confirm the port you want to use for Jupyter Notebook is not used.
```
$ netstat -an|grep 8888
```
Set password for Jupyter Notebook
```
$ jupyter notebook --generate-config
Writing default config to: /lustre7/home/user/.jupyter/jupyter_notebook_config.py
$ jupyter notebook password
Enter password:
Verify password:
[NotebookPasswordApp] Wrote hashed password to /lustre7/home/user/.jupyter/jupyter_notebook_config.json
```
Launch Jupyter Notebook.
You can specify the port which you confirmed was exclusive above, but you need to check the assigned port from the standard output.
```
$ jupyter notebook --no-browser --port=8888 --ip=`hostname`
[I 18:18:10.476 NotebookApp] Serving notebooks from local directory: /lustre7/home/user
[I 18:18:10.477 NotebookApp] Jupyter Notebook 6.4.8 is running at:
[I 18:18:10.477 NotebookApp] http://at139:8888/
[I 18:18:10.477 NotebookApp] Use Control-C to stop this server and shut down all kernels (twice to skip confirmation).
```
Once it launched, the prompt is not returned. Use Ctrl-C to terminate.

### Alternative: Launch Jupyter Notebook with Job scheduler
Set password for Jupyter Notebook
```
$ jupyter notebook --generate-config
Writing default config to: /lustre7/home/user/.jupyter/jupyter_notebook_config.py
$ jupyter notebook password
Enter password:
Verify password:
[NotebookPasswordApp] Wrote hashed password to /lustre7/home/user/.jupyter/jupyter_notebook_config.json
```
You need to prepare a job script for launching Jupyter Notebook.
You can use an arbitrary port, but you need to check the assigned port from the log.
```
$ cat jupyter_nb
#!/bin/bash

#$ -cwd
#$ -V
#$ -l short
#$ -l s_vmem=16G
#$ -l mem_req=16G
#$ -N user_jupyter_nb
#$ -S /bin/bash

jupyter notebook --no-browser --port=18888 --ip=`hostname`
```

Submit a job.
```
$ qsub jupyter_nb
```
Identify the node where you have launched Jupyter
```
$ qstat
job-ID     prior   name       user         state submit/start at     queue                          jclass                         slots ja-task-ID
------------------------------------------------------------------------------------------------------------------------------------------------
  25675534 0.25000 user_jupyt user         r     03/13/2024 21:01:36 short.q@at083                                                     1
```
Check the port that has been assigned from the log
```
$ grep -A1 running user_jupyter_nb.e25682956
[I 10:33:36.315 NotebookApp] Jupyter Notebook 6.4.8 is running at:
[I 10:33:36.315 NotebookApp] http://at084:18888/
```

### SSH Port Forwarding

Set up port forwarding on the `jupyter_client` node where you want to use Jupyter Notebook.
Once you run it, the prompt won't return. To terminate it use Ctrl-C.

```
$ ssh -i ~/.ssh/my_id_rsa -L 18888:at139:8888 <user>@gw.ddbj.nig.ac.jp
Enter passphrase for key '/home/user/.ssh/my_id_rsa':
```

The L option should be set as follows:

` -L <(1)>:<(2)>:<(3)> `

1. `Jupyter_client` port

2. Jupyter Notebook Host Name

3. Jupyter Notebook Port Specified


### Access Jupyter Notebook
Open your web browser and access the following

` http://localhost:18888/ `

You are requested to enter your password, ando so you enter yours.
After the authentication Jupyter Notebook is available.

### Launch Python from Jupyter Notebook with Job scheduler
You can submit a Python job from `Console` or `Terminal`.
In case you use `Console`, you have to add '!' to in front of the command.
```
!qsub launch_python.sh
```

### Terminate Jupyter Notebook
Click `Quit` in Jupyter Notebook.

### Reference
- Jupyter Notebook - official

 [Running the Notebook — Jupyter Documentation 4.1.1 alpha documentation](https://jupyter.readthedocs.io/en/latest/running.html)
