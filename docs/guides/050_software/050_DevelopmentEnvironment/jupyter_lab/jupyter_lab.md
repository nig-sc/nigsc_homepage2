---
id: jupyter_lab
title: "Jupyter Labの使い方"
---

Jupyter LabはJupyter Notebookに比べユーザビリティの向上や拡張機能の導入などエンハンスが行われています。標準ではインストールされていないため各自で導入が必要です。インストール、および使用方法は次のとおりです。


## Jupyter Labのインストール {#installing-jupyter-lab}

condaを導入していない場合、先に[Pythonの使い方](/guides/software/DevelopmentEnvironment/python)を参照しMinicondaをインストールします。
condaのインストール後にcondaコマンドでJupyter Labをインストールします。
```
$ conda install -c conda-forge jupyterlab
```
## Jupyter Labの起動 {#launch-jupyter-lab}

Jupyter Labを起動するインタラクティブノードを確認します。インタラクティブノードは負荷状況に応じてqlogin時に選択されるのでログインの度に確認が必要です。
```
(interactive node) $ hostname
at139
```
Jupyter Labに使用するポート(e.g. 8888)が他に使用されていないか確認します。
```
$ netstat -an|grep 8888
```
Jupyter Labにパスワードを設定します。
```
$ jupyter server --generate-config
Writing default config to: /lustre7/home/user/.jupyter/jupyter_server_config.py
$ jupyter server password
Enter password:
Verify password:
[JupyterPasswordApp] Wrote hashed password to /lustre7/home/user/.jupyter/jupyter_server_config.json
```
Jupyter Labを起動します。任意のポートを指定しますが、実際に割り当てられたポートは標準出力から確認します。
```
$ jupyter lab --no-browser --port=8888 --ip=`hostname`
[I 2024-03-19 10:22:38.636 ServerApp] Serving notebooks from local directory: /lustre7/home/user
[I 2024-03-19 10:22:38.636 ServerApp] Jupyter Server 2.12.5 is running at:
[I 2024-03-19 10:22:38.636 ServerApp] http://at083:8888/lab
[I 2024-03-19 10:22:38.636 ServerApp]     http://127.0.0.1:8888/lab
```
起動するとプロンプトは戻りません。メッセージに記載があるとおり終了する場合はCtrl-Cを使用します。


## Alternative: Jupyter Labのジョブ起動 {#launch-alternative-jupyter-lalb}

Jupyter Labにパスワードを設定します。
```
$ jupyter server --generate-config
Writing default config to: /lustre7/home/user/.jupyter/jupyter_server_config.py
$ jupyter server password
Enter password:
Verify password:
[JupyterPasswordApp] Wrote hashed password to /lustre7/home/user/.jupyter/jupyter_server_config.json
```

Jupyter Lab起動スクリプトを用意します。
任意のポートを指定しますが、実際に割り当てられたポートは後にログから確認します。
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

ジョブをサブミットします。
```
$ qsub jupyter_lab
```
サブミットしたジョブの実行ノードを確認します。
この例ではat083が使用されているため後のポートフォワーディングで指定します。
```
$ qstat
job-ID     prior   name       user         state submit/start at     queue                          jclass                         slots ja-task-ID
------------------------------------------------------------------------------------------------------------------------------------------------
  25675539 0.25013 QLOGIN     user         r     03/13/2024 21:29:33 login.q@at137                                                     1
  25675545 0.25000 user_jupyt user         r     03/13/2024 21:45:20 short.q@at083                                                     1
```
実際に割り当てられたポートをログから確認します。
```
$ grep -A1 running user_jupyter_lab.e25683453
[I 2024-03-19 10:42:03.438 ServerApp] Jupyter Server 2.12.5 is running at:
[I 2024-03-19 10:42:03.439 ServerApp] http://at084:28888/lab
```


## SSHポートフォワーディング {#ssh-port-forwarding}

Jupyter Labを使用したい端末から当該インタラクティブノードへポートへフォワーディングを行います。
実行するとプロンプトは戻りません。Ctrl-Cで終了します。

```
$ ssh -i ~/.ssh/my_id_rsa -L 18888:at139:8888 <user>@gw.ddbj.nig.ac.jp
Enter passphrase for key '/home/user/.ssh/my_id_rsa':
```
ここでLオプションは次のとおり指定します。

` -L <(1)>:<(2)>:<(3)> `

1. 端末で使用していない任意のポートを指定

2. Jupyter Labを起動したノードのホスト名

3. Jupyter Labに指定したポート番号


## Webブラウザからのアクセス {#access-jupyter-lab}

端末でWebブラウザを起動し次のURLにアクセスします。ポートは先に(1)で指定したポートを使用します。

` http://localhost:18888/ `

パスワードの入力を求められるので先に設定したパスワードを入力します。
入力後、Jupyter LabのWeb画面が表示されます。
![figure](JupyterLab.PNG)


## Jupyter Labからのジョブ起動 {#launch-python-jupyter-lab}

ConsoleまたはTerminalからジョブ起動ができます。
Consoleから起動する場合はコマンドの先頭に`!`を追加して実行します。
```
!qsub launch_python.sh
```

## Jupyter Labの終了 {#terminate-jupyter-lab}

Webブラウザ上で`File`メニューから`Shut Down`をクリックします。
