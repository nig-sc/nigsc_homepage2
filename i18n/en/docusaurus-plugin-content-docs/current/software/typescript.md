---
id: typescript
title: "Node.js, TypeScriptの使い方"
---

## TypeScriptの使い方

### Node.js処理系のインストール
サーバーサイドJavaScript処理系であるNode.jsのインストールはユーザー権限で可能なので、各自必要なバージョンを自分のホームディレクトリにインストールしてください。

` nvm (node version manager)を用いたインストールが便利です。 `

1, 以下のコマンドにてnvmをホームディレクトリにインストール。($HOME/.nvmディレクトリ下にインストールされる）

` curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash `

- nvmの最新バージョンは以下のページにて確認してください。[GitHub - nvm-sh/nvm: Node Version Manager - POSIX-compliant bash script to manage multiple active node.js versions](https://github.com/nvm-sh/nvm)

nvmをインストールすると、~/.bashrcに下記のような記述が自動的に追加される。

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

` source ~/.bashrc `あるいは` qlogin `しなおすなどの方法で上記の記述を実行するとnvmが使えるようになる。

2, ` nvm ls-remote `で、利用可能なNode.JSのバージョンを表示させる。 

3, ` nvm install v12.18.3 `のようにしてインストールする。 

4, ` nvm use v12.18.3 `のようにしてNode.JS処理系をアクティベートする。`~/.bashrc `の最後にこれを追加しておくとよい。


### TypeScriptなどのインストール
npm (node package manager)コマンドにより、TypeScriptおよび関連するツールをインストールする。

```
npm install -g typescript @types/node ts-node
npm install -g typedoc jsdoc 
npm install -g pkg yarn
npm install -g tslint
```

nvm install, nvm useを用いて、使用するNode.js処理系のバージョンを変えた場合は、TypeScript及び関連するツールもインストールし直す必要がある。


### 注意事項

#### TypeScriptがインストールできない

上記のようにnpm install -g typescriptを実行すると、$HOME/.nvm/versions/node/v12.18.3/ といったディレクトリの下にtscやtsserverなどのファイルがインストールされるはずであるが、インストールされていない場合の対処方法。


以下のコマンドを実行したときに、nvm useで指定しているバージョンと同じバージョンが表示されるかを確かめる。（これが一致していないのがインストールできない原因である。)

```
$ npm config get prefix 
/home/youraccount/.nvm/versions/node/v16.3.0
```

以下のコマンドでprefixを正しく調整する。 
` npm config set prefix /home/youraccount/.nvm/versions/node/v12.18.3 `
      
その後、TypeScriptをインストールする。

[Cannot install TypeScript globally](https://stackoverflow.com/questions/48518601/cannot-install-typescript-globally)


	
	 
