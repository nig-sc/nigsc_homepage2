---
id: typescript
title: "Node.js, TypeScript"
---

## How to use TypeScript

### Installing the Node.js processor {#installing-nodejs-processor}

Node.js, the server-side JavaScript processor, can be installed with user permission, so install the version you need in your home directory.

It is convenient to use ` nvm (node version manager)` for installation. 

1, Install nvm in your home directory with the following command. (It will be installed in the $HOME/.nvm directory.)

` curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash `

- Check the latest version of nvm at the following page. [GitHub - nvm-sh/nvm: Node Version Manager - POSIX-compliant bash script to manage multiple active node.js versions](https://github.com/nvm-sh/nvm)

When nvm is installed, the following is automatically added to ~/.bashrc.

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

You can use nvm by executing the above description by `source ~/.bashrc` or by `qlogin` again.

2, Display the available Node.JS versions using` nvm ls-remote --lts `. 

3, Install with ` nvm install v18.20.3 `.

4, Activate the Node.JS processor by doing ` nvm use v18.20.3 `. You can add this to the end of `~/.bashrc `.


### Installing TypeScript and other software {#installing-typescript-etc}

Install TypeScript and related tools by using the npm (node package manager) command.


```
npm install -g typescript @types/node ts-node \
  typedoc jsdoc \
  pkg yarn \
  eslint
```

If you change the version of the Node.js processor used using 'nvm install' or 'nvm use', TypeScript and related tools must also be re-installed.


### Note

#### TypeScript cannot be installed.

When you execute 'npm install -g typescript' as above, files such as tsc and tsserver should be installed in your directory such as $HOME/.nvm/versions/node/v18.20.3/. Here's what to do if they are not installed.

Check that the same version as that specified in nvm use is displayed when the following command is executed. (If this does not match, this is the reason why it cannot be installed).

```
$ npm config get prefix 
/home/youraccount/.nvm/versions/node/v16.3.0
```

Adjust the prefix correctly with the following command. 

` npm config set prefix /home/youraccount/.nvm/versions/node/v18.20.3 `
      
Then install TypeScript.

[Cannot install TypeScript globally](https://stackoverflow.com/questions/48518601/cannot-install-typescript-globally)


	 
