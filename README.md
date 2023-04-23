# NIG Supercomputer Home Page (version 2)

The NIG Supercomputer home page ( https://sc.ddbj.nig.ac.jp ) is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Installing Node.js 

Node.js must be installed as a prerequisite for building and launching the NIG supercomputer home page in your local environment.

1. Installing `nvm`

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```
Please check the following page to see what the latest version is. https://github.com/nvm-sh/nvm

2. Activate nvm by running `source ~/.bashrc` or similar command.
3. Run `nvm ls-remote` to display the available node.js versions.
4. Install Node.js with `nvm install` command, for example `nvm install v16.18.1`.  (Please select the appropriate version of node.js from the output of the aforementioned command and use it.)
5. Activate Node.js with `nvm use v16.18.1`.

## Displaying for editing

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


## Generating the website for production

To use the site for actual service, build the website with the following command. The entire site, including the English version, will be generated.
```
npx browserslist@latest --update-db
npm run build  # Markdown => HTML
```

To display the generated web site for testing, for example

```
npm run serve  # Display the website converted to HTML 
```
If you want to access from a remote environment, use `npm run serve -- --host 0.0.0.0`, etc.


Finally, the build directory created by the above command should be shown to the Apache server, etc. The following is an example.

```
sudo -u www-data rm -Rf /var/www/html ; sudo -u www-data mv build /var/www/html
```

---

# NIG スーパーコンピュータホームページ（バージョン 2）

NIG Supercomputer ホームページ( https://sc.ddbj.nig.ac.jp )は、新しい静的ウェブサイト生成ツールである[Docusaurus 2](https://docusaurus.io/) を使って構築されています。

## Node.js のインストール

NIG スーパーコンピュータのホームページをローカル環境で構築・起動するためには、前提として Node.js のインストールが必要です。

1. nvm のインストール

``` bash
curl -o https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

最新バージョンは、以下のページでご確認ください。https://github.com/nvm-sh/nvm

2. `source ~/.bashrc` などのコマンドを実行して、nvm を起動します。
3. `nvm ls-remote` を実行して、利用可能な node.js のバージョンを表示します。
4. nvm install` コマンドで Node.js をインストールします。例: `nvm install v16.18.1`。(前述のコマンドの出力から適切なバージョンの node.js を選択し、使用してください)
5. `nvm use v16.18.1` を実行して Node.js を有効化する。

## web サイトの編集用表示

以下の方法で Web サーバーを起動すると、markdown ファイルの編集結果がリアルタイムで画面に反映されます。

1. 以下の git リポジトリをクローンします。

``` bash
git clone https://github.com/oogasawa/nigsc_homepage2
```

2. 以下のコマンドで Web サーバーを起動します(ブラウザが開き、ページが表示されます)。

``` bash
cd nigsc_homepage2
npm install # 初回のみ
npm start
```

これによりローカル環境の Web ブラウザに以下のようにページが表示されます。

- この場合、開発サイトしか表示されず、全文検索が効かない、多言語設定が効かないなどの制約があります。
- リモート環境からアクセスする場合は、`npm start -- --host 0.0.0.0`を実行します。

![](top_page.png)

英語版を表示するには、`npm start` を実行する際に言語を指定する必要があります。

``` bash
npm start -- --locale en
```

## 本番用 Web サイトの生成

実際のサービスに利用する場合は、以下のコマンドでサイトを構築してください。英語版も含めたサイト全体が生成されます。

``` bash
npx browserslist@latest --update-db
npm run build # markdown => HTML
```

テスト用に生成された Web サイトを表示する場合などは以下のようにします。

``` bash
npm run serve # HTML に変換されたウェブサイトを表示する 
```

リモート環境からアクセスする場合は、`npm run serve -- --host 0.0.0.0` などとします。

最後に、上記コマンドで作成した`build`ディレクトリを、Apache サーバーなどに表示させるには例えば以下のようにします。

``` bash
sudo -u www-data rm -Rf /var/www/html ; sudo -u www-data mv build /var/www/html
```

