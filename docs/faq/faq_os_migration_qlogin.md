---
id: faq_os_migration_qlogin
title: qloginに関するご質問
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
