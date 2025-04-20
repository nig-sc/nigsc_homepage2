---
id: jupyter_notebook
title: "Jupyter Notebookの使い方"
---

Jupyter Notebookはシステムにインストールされています。使用方法は次のとおりです。[^1]

[^1]:ユーザビリティの向上や拡張機能の導入などエンハンスが行われている[Jupyter Lab](/guides/software/DevelopmentEnvironment/jupyter_lab)の使用を推奨します。


## Jupyter Notebookの起動 {#launch-jupyter-notebook}

Jupyter Notebookを起動するインタラクティブノードを確認します。インタラクティブノードは負荷状況に応じてqlogin時に選択されるのでログインの度に確認が必要です。
```
(interactive node) $ hostname
at139
```
Jupyter Notebookに使用するポート(e.g. 8888)が他に使用されていないか確認します。
```
$ netstat -an|grep 8888
```
Jupyter Notebookにパスワードを設定します。
```
$ jupyter notebook --generate-config
Writing default config to: /lustre7/home/user/.jupyter/jupyter_notebook_config.py
$ jupyter notebook password
Enter password:
Verify password:
[NotebookPasswordApp] Wrote hashed password to /lustre7/home/user/.jupyter/jupyter_notebook_config.json
```
Jupyter Notebookを起動します。
任意のポートを指定しますが、実際に割り当てられたポートは標準出力から確認します。
```
$ jupyter notebook --no-browser --port=8888 --ip=`hostname`
[I 18:18:10.476 NotebookApp] Serving notebooks from local directory: /lustre7/home/user
[I 18:18:10.477 NotebookApp] Jupyter Notebook 6.4.8 is running at:
[I 18:18:10.477 NotebookApp] http://at139:8888/
[I 18:18:10.477 NotebookApp] Use Control-C to stop this server and shut down all kernels (twice to skip confirmation).
```
起動するとプロンプトは戻りません。メッセージに記載があるとおり終了する場合はCtrl-Cを使用します。


## Alternative: Jupyter Notebookのジョブ起動 {#launch-alternative-jupyter-notebook}

Jupyter Notebookにパスワードを設定します。
```
$ jupyter notebook --generate-config
Writing default config to: /lustre7/home/user/.jupyter/jupyter_notebook_config.py
$ jupyter notebook password
Enter password:
Verify password:
[NotebookPasswordApp] Wrote hashed password to /lustre7/home/user/.jupyter/jupyter_notebook_config.json
```

Jupyter Notebook起動スクリプトを用意します。
任意のポートを指定しますが、実際に割り当てられたポートは後にログから確認します。
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

ジョブをサブミットします。
```
$ qsub jupyter_nb
```
サブミットしたジョブの実行ノードを確認します。
この例ではat083が使用されているため後のポートフォワーディングで指定します。
```
$ qstat
job-ID     prior   name       user         state submit/start at     queue                          jclass                         slots ja-task-ID
------------------------------------------------------------------------------------------------------------------------------------------------
  25675534 0.25000 user_jupyt user         r     03/13/2024 21:01:36 short.q@at083                                                     1
```
実際に割り当てられたポートをログから確認します。
```
$ grep -A1 running user_jupyter_nb.e25682956
[I 10:33:36.315 NotebookApp] Jupyter Notebook 6.4.8 is running at:
[I 10:33:36.315 NotebookApp] http://at084:18888/
```

## SSHポートフォワーディング {#ssh-port-forwarding}

Jupyter Notebookを使用したい端末から当該インタラクティブノードへポートへフォワーディングを行います。
実行するとプロンプトは戻りません。Ctrl-Cで終了します。

```
$ ssh -i ~/.ssh/my_id_rsa -L 18888:at139:8888 <user>@gw.ddbj.nig.ac.jp
Enter passphrase for key '/home/user/.ssh/my_id_rsa':
```

ここでLオプションは次のとおり指定します。

` -L <(1)>:<(2)>:<(3)> `

1. 端末で使用していない任意のポートを指定

2. Jupyter Notebookを起動したノードのホスト名

3. Jupyter Notebookに指定したポート番号


## Webブラウザからのアクセス {#access-jupyter-notebook}

端末でWebブラウザを起動し次のURLにアクセスします。ポートは先に(1)で指定したポートを使用します。

` http://localhost:18888/ `

パスワードの入力を求められるので先に設定したパスワードを入力します。
入力後、Jupyter notebookのWeb画面が表示されます。

## Jupyter Notebookからのジョブ起動 {#launch-python-jupyter-notebook}

Consoleからジョブ起動ができます。
コマンドの先頭に`!`を追加して実行します。
```
!qsub launch_python.sh
```

## Jupyter Notebookの終了 {#terminate-jupyter-notebook}

Webブラウザ上で`Quit`をクリックします。

## 参考 {#reference}

- Jupyter Notebookの公式サイト

 [Running the Notebook — Jupyter Documentation 4.1.1 alpha documentation](https://jupyter.readthedocs.io/en/latest/running.html)
