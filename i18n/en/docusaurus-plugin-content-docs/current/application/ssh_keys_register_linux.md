---
id: ssh_keys_register_linux
title: How to register or change the SSH public key to the NIG supercomputer (Linux)
---


When you check the save location of the key pair, you will find two files, `id_rsa` and `id_rsa.pub`, are created.
`id_rsa.pub` is the public key, so you can register the public key by copying all character strings from "ssh-rsa" of the file and pasting it into the "SSH public Key" below(red frame).

```
$ ls ~/.ssh
id_rsa  id_rsa.pub
$ cat ~/.ssh/id_rsa.pub
ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAznOdmkDHzjDpsNIhkl2VNjUXBlC3QePKDAzmu3FDCMgBYUDyiXAXLf85q25cylVq66gLUP63nlFJz4/SLO13w2Qf3Gyyj7ADJJZR3sD+Sf8vdlt2hShAT0kkKBmToBqv2Pqx2SfzRVedlyCE4YFieUVmZUkz95dxwSUklGXmQSvigkqCG86r0NlxCSMjYitDGWAyGMu37cvBYzH0+C2uthtbqTd1VYHfjtvewySSZsvbVVnjLme0Ah2cAyifVaSN4uslDBqkN62b3vaijoXPy9ieUzSP0/dgBhKN/m7yhnM/1s+foJnRI3wfDdqXPw3yOqPC/9EXrjnmdpEmpgMJTw== temp@host
$ 
```

&#x26A0; If you already have your account, register your public key in [<u>the Change of account information by clicking here</u>](/application/change_account_info).

![](reg_ssh_EN.png)
