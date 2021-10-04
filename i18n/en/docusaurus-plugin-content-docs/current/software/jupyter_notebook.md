---
id: jupyter_notebook
title: "Jupyter Notebookの使い方"
---

### Jupyter Notebookサーバーの起動

まず最初に、qloginにより割り当てられたインタラクティブノードのローカルIPアドレスを調べる。

```
$ ip a | grep ib0
10: ib0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 256
    inet 172.19.7.186/20 brd 172.19.15.255 scope global ib0

```
この例の場合はqloginにより割り当てられたインタラクティブノードのローカルIPアドレスは172.19.7.186である。


次にインタラクティブノード上でJuypter Notebookサーバーを起動する。

前述のMinicondaでPythonの環境をインストールしていれば、以下のコマンドでJupyter Notebookサーバーを起動することができる。

` $ jupyter-notebook --no-browser --ip "*" `

起動すると最後に以下のようなメッセージが出る。（プロンプトは返ってこない。このままつないでおく。Ctrl-Cで終了）

```
    To access the notebook, open this file in a browser:
	        file:///lustre7/home/lustre4/youraccount/.local/share/jupyter/runtime/nbserver-693-open.html
    Or copy and paste one of these URLs:
	        http://localhost:8888/?token=bc5ae6c7d53b76f9721c95308cf25405c399bbc770b37040
     or http://127.0.0.1:8888/?token=bc5ae6c7d53b76f9721c95308cf25405c399bbc770b37040
```

ここでインタラクティブノード上のJupyter Notebookのポート番号（この例の場合8888）を覚えておく。

### SSHポートフォワード

ユーザーのクライアントマシンで新しい端末を起動し、以下のコマンドを実行する。（プロンプトは返ってこない。何もせずこのままつないでおく。Ctrl-Cで終了。)

```
$ ssh -N gw.ddbj.nig.ac.jp -L 3001:172.19.7.186:8888
Enter passphrase for key '/home/youraccount/.ssh/id_rsa': 
```

ここで-Lオプションの意味は以下の通りである。

` -L <(1)アクセス時のポート番号>:<(2)インタラクティブノードのIPアドレス>:<(3)Jupyter Notebookのポート番号> `

- (1)については適当に決めて良い。

- (2)は上記の「インタラクティブノードのローカルIPアドレス」である。

- (3)は上記の「インタラクティブノード上のJupyter Notebookのポート番号」である。


### Webブラウザからのアクセス

ユーザーのクライアントマシンのWebブラウザを用いて以下のURLにアクセスする。

` http://localhost:3001/?token=bc5ae6c7d53b76f9721c95308cf25405c399bbc770b37040 `

- tokenはJupyter notebookを起動した際のメッセージに表示された文字列を使う。

- ポート番号は、上記(1)アクセス時のポート番号とする。

 
 
これでJupyter notebookのWeb画面が表示される。
 
  
  
### 参考
- Jupyter Notebookの公式サイト [Running the Notebook — Jupyter Documentation 4.1.1 alpha documentation](https://jupyter.readthedocs.io/en/latest/running.html)

