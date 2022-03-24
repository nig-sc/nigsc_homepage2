---
id: hcptools_conf
title: 設定ファイルの書き方
---


## 設定ファイルの種類

HCP toolsの各コマンドのそれぞれに対し、設定ファイルがあります。

![](HCPtools_3.png)


設定ファイルがたくさんあるので、共通の設定を`~/.hcp/hcp-common.conf`に記述し、各設定ファイルからインクルードする方法を推奨します。`~/.hcp/hcp.conf`などの設定ファイルの冒頭に以下の一行を記載して下さい。

Linuxの場合

```
Include /home/ユーザ名/.hcp/hcp-common.conf
```

Windowsの場合

```
Include C:\Users\ユーザ名\.hcp\hcp-common.conf
```


## 共通設定ファイル(`~/.hcp/hcp-common.conf`)の設定例

HCP toolsは、公開鍵・秘密鍵によりユーザ認証を行います。

この場合の公開鍵・秘密鍵は遺伝研スパコンのSSHログインに用いる公開鍵・秘密鍵ファイルで構いません。
これらを用いる場合は、クライアントマシンのユーザディレクトリ(Windowsの場合は`C:\Users\ユーザ名\.ssh`)の下に秘密鍵ファイル(`id_rsa`)が置かれていることを確認してください。（[SSHの公開鍵の設定方法](/application/ssh_keys)に従うとすでに秘密鍵ファイルがここに置かれているはずです。）



### 暗号化なし、ファイルの完全性のチェックあり or なしの場合


```
PrivateKeyFile /home/ユーザ名/.ssh/id_rsa    # 秘密鍵指定
AcceptableCryptMethod   PLAIN              　# 暗号化:なし
AcceptableDigestMethod  SHA256               # ダイジェスト方式: SHA256
DisableDataIntegrityChecking yes             # ダイジェスト方式なしを許可
```

#### 例（ダウンロード）

ファイルの完全性のチェックを行う場合は`-y`オプションをつけて下さい。

```bash
hcp --user ユーザ名 --hpfp -y  \
    gwa.ddbj.nig.ac.jp:/home/your_account-pg/some_directory/your_file.txt \
    C:\Users\ユーザ名\your_file.txt
```

ファイルの完全性のチェックを行わない場合は場合は`-y`オプションを外して下さい。
転送速度が速くなります。

```bash
hcp --user ユーザ名 --hpfp  \
    gwa.ddbj.nig.ac.jp:/home/your_account-pg/some_directory/your_file.txt \
    C:\Users\ユーザ名\your_file.txt
```



### 暗号化あり、ファイルの完全性のチェックあり or なしの場合

転送速度は遅くなります。

```
PrivateKeyFile /home/ユーザ名/.ssh/id_rsa    # 秘密鍵指定
AcceptableCryptMethod   AES256/CTR/VMAC    　# 暗号化: AES256/CTR/VMAC
AcceptableDigestMethod  SHA256               　# ダイジェスト方式: SHA256
DisableDataIntegrityChecking yes             # ダイジェスト方式なしを許可
```

ダウンロード例は以下の通り。`-y`のありなしで完全性のチェックのありなしを切り替えられます。

```bash
hcp --user ユーザ名 --hpfp -y  \
    gwa.ddbj.nig.ac.jp:/home/your_account-pg/some_directory/your_file.txt \
    C:\Users\ユーザ名\your_file.txt
```

