---
id: jupyter_lab
title: "Jupyter Labの使い方"
---

### Jupyter Labのインストール

Minicondaをインストールしているのであれば、以下のコマンドでJuypter Labをインストールできます。

` conda install -c conda-forge jupyterlab `

以下のコマンドにてconfigファイルを生成します。

` jupyter server --generate-config `

以下のコマンドにてパスワードを設定します。

` jupyter server --generate-config `


### Jupyter Labサーバーの起動

まず最初に、qloginにより割り当てられたインタラクティブノードのローカルIPアドレスを調べます。

```
$ ip a | grep ib0 
10: ib0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 256 
 inet 172.19.7.186/20 brd 172.19.15.255 scope global ib0
``` 

この例の場合はqloginにより割り当てられたインタラクティブノードのローカルIPアドレスは172.19.7.186です。
 
  
  
次にインタラクティブノード上でJuypter Labサーバーを起動します。

` $ jupyter lab --no-browser --ip "*" `

起動すると最後に以下のようなメッセージが出ます。（プロンプトは返ってきません。このままつないでおきます。Ctrl-Cで終了します。）

```
$ jupyter lab --no-browser --ip "*"
[I 2021-08-13 09:55:43.340 ServerApp] jupyterlab | extension was successfully linked.
[I 2021-08-13 09:55:43.707 ServerApp] nbclassic | extension was successfully linked.
[W 2021-08-13 09:55:44.145 ServerApp] WARNING: The Jupyter server is listening on all IP addresses and not using encryption. This is not recommended.
[I 2021-08-13 09:55:44.245 ServerApp] nbclassic | extension was successfully loaded.
...
[I 2021-08-13 09:55:44.250 ServerApp] Jupyter Server 1.10.2 is running at:
[I 2021-08-13 09:55:44.250 ServerApp] http://at139:8888/lab
[I 2021-08-13 09:55:44.250 ServerApp]  or http://127.0.0.1:8888/lab
[I 2021-08-13 09:55:44.250 ServerApp] Use Control-C to stop this server and shut down all kernels (twice to skip confirmation).

```

ここでインタラクティブノード上のJupyter Labのポート番号（この例の場合8888）を覚えておきます。


### SSHポートフォワード

ユーザーのクライアントマシンで新しい端末を起動し、以下のコマンドを実行します。（プロンプトは返ってきません。何もせずこのままつないでおきます。Ctrl-Cで終了します。)

```
$ ssh -N gw.ddbj.nig.ac.jp -L 3001:172.19.7.186:8888 
Enter passphrase for key '/home/youraccount/.ssh/id_rsa': 
```

ここで-Lオプションの意味は以下の通りです。

` -L <(1)アクセス時のポート番号>:<(2)インタラクティブノードのIPアドレス>:<(3)Jupyter Labのポート番号> `

- (1)については適当に決めて良いです。

- (2)は上記の「インタラクティブノードのローカルIPアドレス」です。

- (3)は上記の「インタラクティブノード上のJupyter Labのポート番号」です。


### Webブラウザからのアクセス

ユーザーのクライアントマシンのWebブラウザを用いて以下のURLにアクセスします。

` http://localhost:3001 `

- ポート番号は、上記(1)アクセス時のポート番号とします。

- アクセスするとパスワードを聞かれるので、上記で設定したパスワードを入力します。

 
 
これでJupyter LabのWeb画面が表示されます。
![figure](JupyterLab.PNG)

