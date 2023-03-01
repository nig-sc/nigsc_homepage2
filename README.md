# NIG Supercomputer Home Page (version 2)

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Installing Node.js 

Node.js must be installed as a prerequisite for building and launching the NIG supercomputer home page in your local environment.

1. Installing `nvm`

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```
Please check the following page to see what the latest version is. https://github.com/nvm-sh/nvm

2. Activate nvm by running `source ~/.bashrc` or similar command.
3. Run `nvm ls-remote` to display the available node.js versions.
4. Install Node.js with `nvm install v16.18.1`.  (v16.18.1 is the appropriate one from the node.js version displayed in the aforementioned command.)
5. Activate Node.js with `nvm use v16.18.1`.

## Displaying the page for editing

By starting the web server in the following way, the result of editing a markdown file is reflected on the screen in real time.

1. Clone the following git repository.

```
git clone https://github.com/oogasawa/nigsc_homepage2
```

2. Start the web server with the following command (The browser will open and the page will be displayed.)

```
cd nigsc_homepage2
npm install  # First time only
npm start
```

This displays the web page in a web browser in the local environment.

- This will only display the development site, and there are some limitations such as full-text search does not work, and multilingual settings do not work.
- If you want to access from a remote environment, use `npm start -- --host 0.0.0.0`.

![](top_page.png)

To display the English version, you need to specify the language at `npm start`.

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
