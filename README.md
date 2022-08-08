# NIG Supercomputer Home Page (version 2)

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## 起動方法


### nvmを用いたNode.jsのインストール

前提としてNode.jsがインストールされている必要があります。

1. nvmのインストール

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

最新バージョンが何かは以下のページにて確認してください。https://github.com/nvm-sh/nvm

2. `source ~/.bashrc`などによりnvmをアクティベートする。
3. `nvm ls-remote` で、利用可能なnode.jsのバージョンを表示させる。
4. `nvm install v12.18.3` のようにしてNode.jsをインストールする。
5. `nvm use v12.18.3` のようにしてNode.jsをアクティベートする。

### 編集用ページの表示

以下の方法でwebサーバを起動すると、markdownファイルの編集結果がリアルタイムで画面上に反映される。

1. このgitリポジトリをcloneする。

```
git clone https://github.com/oogasawa/nigsc_homepage2
```

2. 以下のコマンドにてwebサーバを起動する。（ブラウザが開きページが表示される）

```
cd nigsc_homepage2
npm install  # 初回のみ
npm start
```

これによりローカル環境のwebブラウザ上にwebページが表示される。（リモート環境からアクセスしたい場合は`npm start -- --host 0.0.0.0`等とする）

これで表示されるのは開発用サイトであり、全文検索が効かない、多言語設定が効かないといった制限がある。

![](top_page.png)

英語版を表示するには`npm start`の際に言語を指定する必要がある。

```
npm start -- --locale en
```


### 静的サイトの生成

実際のサービスに使うためには以下のコマンドで静的サイトをビルドする。英語版も含めてサイト全体が生成される。

```
npm run build  # Markdown => HTML
```

生成された静的サイトをテスト用に表示するには、例えば以下のようにする。

```
npm run serve  # HTML化されたサイトの表示 
```

これによりローカル環境のwebブラウザ上にwebページが表示される。（リモート環境からアクセスしたい場合は`npm run serve -- --host 0.0.0.0`等とする）


最終的には上記コマンドで出来たbuildディレクトリをApacheサーバなどで見せれば良い。以下は一例。

```
sudo -u www-data rm -Rf /var/www/html ; sudo -u www-data mv build /var/www/html
```
