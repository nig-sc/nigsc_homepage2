# NIG Supercomputer Home Page (version 2)

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## 起動方法


### nvm を用いた Node.js のインストール

前提として Node.js がインストールされている必要があります。

1. nvm のインストール

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

最新バージョンが何かは以下のページにて確認してください。https://github.com/nvm-sh/nvm

2. `source ~/.bashrc`などにより nvm をアクティベートする。
3. `nvm ls-remote` で、利用可能な node.js のバージョンを表示させる。
4. `nvm install v16.18.1` のようにして Node.js をインストールする。
5. `nvm use v16.18.1` のようにして Node.js をアクティベートする。

### 編集用ページの表示

以下の方法で web サーバを起動すると、markdown ファイルの編集結果がリアルタイムで画面上に反映される。

1. この git リポジトリを clone する。

```
git clone https://github.com/oogasawa/nigsc_homepage2
```

2. 以下のコマンドにて web サーバを起動する。（ブラウザが開きページが表示される）

```
cd nigsc_homepage2
npm install  # 初回のみ
npm start
```

これによりローカル環境の web ブラウザ上に web ページが表示される。

- これで表示されるのは開発用サイトであり、全文検索が効かない、多言語設定が効かないといった制限がある。
- リモート環境からアクセスしたい場合は`npm start -- --host 0.0.0.0`等とする。

![](top_page.png)

英語版を表示するには`npm start`の際に言語を指定する必要がある。

```
npm start -- --locale en
```


### 静的サイトの生成

実際のサービスに使うためには以下のコマンドで静的サイトをビルドする。英語版も含めてサイト全体が生成される。

```
npx browserslist@latest --update-db
npm run build  # Markdown => HTML
```

生成された静的サイトをテスト用に表示するには、例えば以下のようにする。

```
npm run serve  # HTML 化されたサイトの表示 
```

これによりローカル環境の web ブラウザ上に web ページが表示される。（リモート環境からアクセスしたい場合は`npm run serve -- --host 0.0.0.0`等とする）


最終的には上記コマンドで出来た build ディレクトリを Apache サーバなどで見せれば良い。以下は一例。

```
sudo -u www-data rm -Rf /var/www/html ; sudo -u www-data mv build /var/www/html
```
