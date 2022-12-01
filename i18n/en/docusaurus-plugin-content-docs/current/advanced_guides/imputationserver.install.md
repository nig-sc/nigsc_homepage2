---
id: imputation_server_install
title: Install Manual
---


## Configuration and usage

### Installing jq

The command `jq` is essential, so if you don't have it, install it.

The following command checks if `jq` exists. If it exists, the path to `jq` is returned. If it does not exist, an error is returned with a message that it does not exist.

```
which jq
```

If it does not exist, use the following command to get `jq` and grant execute permission.
The following example assumes that `~/bin` is present in the PATH environment variable. If not, execute `mkdir ~/bin` and add `~/bin` to the PATH environment variable.


```
curl -L -o ~/bin/jq https://github.com/stedolan/jq/releases/download/jq-1.6/jq-linux64
chmod 755 ~/bin/jq
```

Execute `which jq` again to ensure `jq` is available.

### How to set up and run services

There is a script to set up this system and run the service.

#### Running the script

Log in to the guacamole virtual machine.

Use the following commands to install the essentials and run the service.

```
cp /home/ddbjshare-pg/imputation-desktop/scripts/install.sh install.sh
./install.sh
```

By default, the essentials are installed under `$HOME/sapporo-install`.

If you want to change the installation directory, change `INSTALLDIR` in the script.

The script will install the following in the specified directory.

- Python 3.9.7
- Node.js v14.17.6
- ImputationServer web ui
- Sapporo web 1.0.10
- Sapporo Service 1.0.16

Installation completed.


### Note: If you are asked for input during the process, enter 'n'.

During script execution, if the following screen appears and waits for input, enter 'n' and continue. (After pressing 'n', press the Enter key.)

```
?? NuxtJS collects completely anonymous data about usage.                                                                                                                                                                            16:55:30
  This will help us improve Nuxt developer experience over time.
  Read more on https://git.io/nuxt-telemetry
? Are you interested in participating? (Y/n)
```


## Starting and stopping

The following three services are automatically started when you run the installation script. 

- ImputationServer web ui
- Sapporo web
- Sapporo service


### Starting and stopping all services

The following two scripts can be found in the installation directory.

Batch startup script for all services
`startall.sh `

Script which stop all services at once 
`stopall.sh `

Please use these.


### Starting and stopping only ImputationServer web ui

How to start only ImputationServer web ui

```
cd imputation-server-ui
./start-imputation-server-ui.sh
```

How to stop only ImputationServer web ui

```
cd imputation-server-ui
./stop-imputation-server-ui.sh
```

### Starting and stopping only the Sapporo web

How to start only the Sapporo web

```
cd sapporo-web
./start-sapporo-web.sh
```

How to stop only the Sapporo web 

```
cd sapporo-web
./stop-sapporo-web.sh
```


### Starting and stopping only the Sapporo service

How to start only the Sapporo service 

```
cd sapporo-service
./start-sapporo-service.sh
```

How to stop only the Sapporo service

```
cd sapporo-service
./stop-sapporo-service.sh
```

