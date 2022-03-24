---
id: hcptools_conf
title: 設定ファイルの書き方
---


## 3.1. 設定ファイル

(参考) HCP toolsのコマンドと設定ファイル(Linuxの場合)(注1)

![](HCPtools_3.png)

注1) Windowsの場合、設定ファイルの場所は~/_hcp/配下となります。

以下、<font color="blue">hcp</font>コマンドの設定のみ、紹介します。

※他のコマンドも、設定方法は同様です。

　詳細は、HCP tools コマンドリファレンスを参照して下さい。

hcpコマンドの設定を、設定ファイル「~/.hcp/hcp.conf」に行います。

設定したい内容を「hcp.conf」に書き込むことで有効となりますが、設定したい内容を書き込んだ共通設定ファイル「~/.hcp/hcp.conf」を作成し、「hcp.conf」にインクルードさせる方法を推奨します。以下は、共通設定ファイルによる設定例です。

共通設定ファイル「~/.hcp/hcp-common.conf」に設定を記述します。
```
PrivateKeyFile /home/nig01/.ssh/id_rsa     # 秘密鍵指定
AcceptableCryptMethod   PLAIN              # 暗号化:なし
AcceptableDigestMethod  NONE               # ダイジェスト方式:なし
DisableDataIntegrityChecking yes            # ダイジェスト方式なしを許可
```

「~/.hcp/hcp.conf」に共通設定ファイル「~/.hcp/hcp-common.conf」をインクルードする設定を追記します。記述するファイル名は、フルパスにして下さい。
```
$ echo "Include ${HOME}/.hcp/hcp-common.conf" >> ${HOME}/.hcp/hcp.conf
```

## 3.2. 設定項目

confファイルに記述する設定項目を紹介します。

詳細は、HCP tools コマンドリファレンスを参照して下さい。

AcceptableCryptMethod: 暗号化を行うための設定項目です。

[例1] デフォルトの設定
```
AcceptableCryptMethod AES256/CBC AES128/CBC
```

[例2] 暗号化通信を行わず、平文で通信する
```
AcceptableCryptMethod PLAIN
```

AcceptableDigestMethod: ダイジェストアルゴリズムを設定します。

[例1] デフォルトの設定
```
AcceptableDigestMethod SHA256 SHA160
```

[例2] 通信するメッセージ・ファイルやそのデータブロックの検証を行わない場合
「DisableDataIntegrityChecking yes」も指定する必要があります。
```
AcceptableDigestMethod NONE
DisableDataIntegrityChecking yes
```






