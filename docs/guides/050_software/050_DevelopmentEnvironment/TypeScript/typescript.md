---
id: typescript
title: "Node.js, TypeScript の使い方"
---

## TypeScript の使い方 {#how-to-use-typescript}

### Node.js 処理系のインストール {#installing-nodejs-processor}

サーバーサイド JavaScript 処理系である Node.js のインストールはユーザー権限で可能なので、各自必要なバージョンを自分のホームディレクトリにインストールしてください。

` nvm (node version manager)`を用いたインストールが便利です。 

1, 以下のコマンドにて nvm をホームディレクトリにインストールします。($HOME/.nvm ディレクトリ下にインストールされます。）

` curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash `

- nvm の最新バージョンは以下のページにて確認してください。[GitHub - nvm-sh/nvm: Node Version Manager - POSIX-compliant bash script to manage multiple active node.js versions](https://github.com/nvm-sh/nvm)

nvm をインストールすると、~/.bashrc に下記のような記述が自動的に追加されます。

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

` source ~/.bashrc `あるいは` qlogin `しなおすなどの方法で上記の記述を実行すると nvm が使えるようになります。

2, ` nvm ls-remote --lts `で、利用可能な Node.JS のバージョンを表示させます。 

3, ` nvm install v18.20.3 `のようにしてインストールします。 

4, ` nvm use v18.20.3 `のようにして Node.JS 処理系をアクティベートします。`~/.bashrc `の最後にこれを追加しておくと良いです。


### TypeScript などのインストール {#installing-typescript-etc}

npm (node package manager)コマンドにより、TypeScript および関連するツールをインストールします。

```
npm install -g typescript @types/node ts-node \
  typedoc jsdoc \
  pkg yarn \
  eslint
```

nvm install, nvm use を用いて、使用する Node.js 処理系のバージョンを変えた場合は、TypeScript 及び関連するツールもインストールし直す必要があります。


### 注意事項 {#notes}

#### TypeScript がインストールできない {#typescript-cannot-be-installed}

上記のように npm install -g typescript を実行すると、$HOME/.nvm/versions/node/v18.20.3/ といったディレクトリの下に tsc や tsserver などのファイルがインストールされるはずであるが、インストールされていない場合の対処方法です。


以下のコマンドを実行したときに、nvm use で指定しているバージョンと同じバージョンが表示されるかを確かめます。（これが一致していないのがインストールできない原因です。)

```
$ npm config get prefix 
/home/youraccount/.nvm/versions/node/v16.3.0
```

以下のコマンドで prefix を正しく調整します。 
` npm config set prefix /home/youraccount/.nvm/versions/node/v18.20.3 `
      
その後、TypeScript をインストールします。

[Cannot install TypeScript globally](https://stackoverflow.com/questions/48518601/cannot-install-typescript-globally)


	 
