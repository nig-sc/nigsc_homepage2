---
id: faq_os_migration_login
title: login 時の挙動に関する質問
---


## &#x1F180; 2023 年度のメンテナンス後、qlogin をしようとすると、`ERROR: Unable to locate a modulefile for 'gcc'`というエラーが表示されます。

&#x1F150; このエラーは無視して問題ありません。

OS が CentOS 7 から Ubuntu に変わった一方で、ユーザのホームディレクトリ上の`.bashrc`が昔のままであることが原因です。Ubuntu では environmental modules を使わなくなったので、module load しているところがエラーになり、このエラーが出ます。

無害ではありますが、頻繁に出ることになるので、`~/.bashrc`に書かれている、

```
module load gcc
```

という行を、コメントアウトまたは削除してください。コメントアウトまたは削除すると、エラーが出なくなります。

同様に、以下のように似たようなエラーに対しても、コメントアウトまたは削除すれば、エラーが出なくなります。

例えば、
```
> ERROR: Unable to locate a modulefile for 'r/3.5.2'
> ERROR: Unable to locate a modulefile for 'singularity'
```

というエラーが出た場合には、`~/.bashrc`から、以下の行をコメントアウトまたは削除してください。

```
module load r/3.5.2
module load singularity
```



## &#x1F180; 2023 年度のメンテナンス後、`ls`した後にファイルとディレクトリの色分けがされなくなりました。{#ls-coloring}


&#x1F150; `ls`の際にファイルとディレクトリの色分けをする場合はシェル設定ファイル`~/.bashrc`に以下の記述を追加してください。


```
# enable color support of ls and also add handy aliases
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    #alias dir='dir --color=auto'
    #alias vdir='vdir --color=auto'

    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
fi
```

あるいは、「[環境を初期状態に戻したいのですが、どのようにしたらよいでしょうか。(Ubuntu Linux 22.04 の場合)](/faq/faq_software#ubuntu-initialization)」のシェル設定ファイルの初期状態を参考にして`~/.bashrc`を編集してください。


シェル設定ファイルに関する説明は[FAQ ソフトウェア一般](/faq/faq_software)の中の「 [`.bashrc` などのシェル設定ファイルの読み込み順について教えてください](/faq/faq_software#shell-config)」の項目をご参照ください。


