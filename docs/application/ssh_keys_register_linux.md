---
id: ssh_keys_register_linux
title: 遺伝研スパコンへのSSH公開鍵の登録・変更方法 (Linuxの場合)
---

鍵ペアの保存先を確認すると、`id_rsa`, `id_rsa.pub`の２つのファイルが作成されています。
`id_rsa.pub`が公開鍵になりますので、ファイルの内容を、先頭文字列"ssh-rsa"から全部コピーし下記の赤枠部分「SSH鍵」にペーストすることで、公開鍵の登録が出来ます。


```
$ ls ~/.ssh
id_rsa  id_rsa.pub
$ cat ~/.ssh/id_rsa.pub
ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAznOdmkDHzjDpsNIhkl2VNjUXBlC3QePKDAzmu3FDCMgBYUDyiXAXLf85q25cylVq66gLUP63nlFJz4/SLO13w2Qf3Gyyj7ADJJZR3sD+Sf8vdlt2hShAT0kkKBmToBqv2Pqx2SfzRVedlyCE4YFieUVmZUkz95dxwSUklGXmQSvigkqCG86r0NlxCSMjYitDGWAyGMu37cvBYzH0+C2uthtbqTd1VYHfjtvewySSZsvbVVnjLme0Ah2cAyifVaSN4uslDBqkN62b3vaijoXPy9ieUzSP0/dgBhKN/m7yhnM/1s+foJnRI3wfDdqXPw3yOqPC/9EXrjnmdpEmpgMJTw== temp@host
$ 
```


&#x26A0; アカウントをお持ちの方は、[<u>申請内容の変更</u>](/application/registration/#%E7%94%B3%E8%AB%8B%E5%86%85%E5%AE%B9%E3%81%AE%E5%A4%89%E6%9B%B4)のページから登録してください。

![](reg_ssh_JP.png)

