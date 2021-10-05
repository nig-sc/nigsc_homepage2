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

### ホームページの起動

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

![](top_page.png)

## 静的サイトの生成

```
npm run build
```

上記コマンドで出来たbuildディレクトリをApacheサーバなどで見せれば良い。

```
sudo rm -Rf /var/www/html ; sudo mv build /var/www/html
```
