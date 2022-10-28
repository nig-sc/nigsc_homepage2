---
id: faq_sshkeys_mac
title: "FAQ(SSH公開鍵の登録(macの場合))"
---

## `ssh -V`と入力して実行すると、`-bash: ssh: command not found`と出力された。

OpenSSHクライアントがインストールされていない状態ですので、まず、以下のコマンドを実行して、インストールしてください。

```
sudo apt update
sudo apt upgrade
sudo apt install -y ssh openssh-client
```

次に、以下のコマンドを実行します。
```
ssh -V
```

実行したあとに、以下のようにOpenSSHクライアントソフトウェアのバージョンが表示されれば、インストールが完了している状態です。

![](/img/ssh_keys/mac/ssh_mac_11.png)


