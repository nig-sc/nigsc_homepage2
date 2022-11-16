---
id: jupyter_notebook
title: "Jupyter Notebook"
---


### Starting the Jupyter Notebook server

First, check the local IP address of the interactive node assigned by qlogin.

```
$ ip a | grep ib0
10: ib0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 256
    inet 172.19.7.186/20 brd 172.19.15.255 scope global ib0

```

In this example, the local IP address of the interactive node assigned by qlogin is 172.19.7.186.


Next, start the Juypter Notebook server on the interactive node.

If you have installed the Python environment with Miniconda as described above, you can start the Jupyter Notebook server with the following command.

` $ jupyter-notebook --no-browser --ip "*" `

When it starts, you will get the following message at the end. (No prompt is returned. Leave it connected, Ctrl-C to exit).

```
    To access the notebook, open this file in a browser:
	        file:///lustre7/home/lustre4/youraccount/.local/share/jupyter/runtime/nbserver-693-open.html
    Or copy and paste one of these URLs:
	        http://localhost:8888/?token=bc5ae6c7d53b76f9721c95308cf25405c399bbc770b37040
     or http://127.0.0.1:8888/?token=bc5ae6c7d53b76f9721c95308cf25405c399bbc770b37040
```

Now remember the port number of the Jupyter Notebook on the interactive node. (In this case, 8888.)


### SSH port forwarding

Start a new terminal on the user's client machine and execute the following command. (No prompt will be returned. Do nothing and leave it connected, use Ctrl-C to exit).

```
$ ssh -N gw.ddbj.nig.ac.jp -L 3001:172.19.7.186:8888
Enter passphrase for key '/home/youraccount/.ssh/id_rsa': 
```

Now the -L option means the following.

` -L <(1)the port number for access>:<(2)IP address of the interactive node>:<(3)the port number for the Jupyter Notebook> `

- Users can decide (1) for themselves.

- (2) is the above 'the local IP address of the interactive node'.

- (3) is the above 'the port number of the Jupyter Notebook on the interactive node'.


### Access from a web browser

Access the following URL using a web browser on the user's client machine.

` http://localhost:3001/?token=bc5ae6c7d53b76f9721c95308cf25405c399bbc770b37040 `

- The token is the string displayed in the message when the Jupyter notebook is started.

- The port number is the port number used when accessing (1) above.
 
Now the Jupyter notebook web screen will be displayed.

  
### Reference
- Jupyter Notebook Official Website 

[Running the Notebook — Jupyter Documentation 4.1.1 alpha documentation](https://jupyter.readthedocs.io/en/latest/running.html)

