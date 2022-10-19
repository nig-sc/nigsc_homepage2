---
id: imputation_server_install
title: NBDC-DDBJインピュテーションサーバ (beta) インストールマニュアル 
---


## 構成・使用方法

### jq のインストール

`jq` というコマンドが必要なので、ないときはインストールします。

以下のコマンドで　`jq` があるかどうかの確認をします。存在するときは `jq` のパスが返ってきます。存在しないときは、存在しないというメッセージとともに、エラーが返ってきます。

```
which jq
```

存在しない場合は、以下のコマンドで、 `jq` を取得し、実行権限を与えます。
以下の例は、環境変数 PATHに、 `~/bin` が存在している場合の例です。ない場合は `mkdir ~/bin` を実行し、環境変数PATHに `~/bin` を追加します。

```
curl -L -o ~/bin/jq https://github.com/stedolan/jq/releases/download/jq-1.6/jq-linux64
chmod 755 ~/bin/jq
```

再び、 `which jq` を実行し、 `jq` が利用可能なことを確認します。

### セットアップ、サービス実行方法

本システムをセットアップし、サービスの実行を行うスクリプトがあります。

#### スクリプトの実行

guacamoleの仮想マシンにログインします。

以下のコマンドを使って、必要なものをインストールし、サービスの実行を行います。

```
cp /home/ddbjshare-pg/imputation-desktop/scripts/install.sh install.sh
./install.sh
```



デフォルトでは、`$HOME/sapporo-install` 以下に必要なものがインストールされます。

インストール先を変更したい場合は、スクリプトの中の `INSTALLDIR` を変更してください。

このスクリプトでは以下のものが、指定されたディレクトリにインストールされます。

- Python 3.9.7
- Node.js v14.17.6
- ImputationServer web ui
- Sapporo web 1.0.10
- Sapporo Service 1.0.16

これでインストール完了です。

### 注記：途中で入力をもとめられてたら、nを入力してください。

スクリプト実行中以下のような画面になって入力受付待ちになることがありましたら、「n」を入力して、続行してください。（nを押した後 Enterキーを押します）

```
?? NuxtJS collects completely anonymous data about usage.                                                                                                                                                                            16:55:30
  This will help us improve Nuxt developer experience over time.
  Read more on https://git.io/nuxt-telemetry
? Are you interested in participating? (Y/n)
```

