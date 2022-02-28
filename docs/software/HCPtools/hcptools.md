---
id: hcptools
title: HCPtoolsの使い方
---


# 1. HCPtoolsとは

遺伝研スパコンとユーザの計算機との間でファイル転送を行う場合は、ファイル転送ソフトウェアを使ってファイルを転送します。
一般解析区画ではAspera、個人ゲノム解析区画ではHCPtoolsというファイル転送ソフトウェアを使います。
HCPtools は、多数ファイルおよび大容量ファイル、またはその両方を安全にかつ極めて高い伝送効率で転送できるファイル転送・同期ツールです。海外拠点との不安定な回線や、広帯域高遅延ネットワーク (LFN：Long Fat Network) 等においても高速ファイル転送を実現します。

スパコン間での大規模データのコピー、または海外にあるクラウドサーバからのデータコピーに効果を発揮します。


#### マニュアル
- HCPtoolsコマンド導入ガイド ([日本語版](/pdf/HCPtools_Guide_ja.pdf) / [英語版](/pdf/HCPtools_Guide_en.pdf))
- HCPtoolsコマンド概要説明 ([日本語版](/pdf/HCPtools_overview_ja.pdf) / [英語版](/pdf/HCPtools_overview_en.pdf))
- HCPtoolsコマンドリファレンス ([日本語版](/pdf/HCPtools_CommandReference.pdf))


# 2. HCPtoolsクライアントソフトウェアのインストール方法

## 2.1. インストーラの入手

以下のリンクから、HCPtoolsクライアントソフトウェアのzipファイルを入手して下さい。

リンクは準備中です。順次掲載いたします。

<ul>
    <li>CentOS 7 または Redhat Linux 7
        <ul>
            <li>hcp-tools-1.3.0-42.el7.centos.zip</li>
            <li>hcp-tools-1.3.0-42.el7.centos.md5sum</li>
        </ul>
    </li>
    <li>Ubuntus16.04
        <ul>
            <li>hcp_1.3.0-42_amd64.zip</li>
            <li>hcp_1.3.0-42_amd64.md5sum</li>
        </ul>
    </li>
    <li>Ubuntus18.04
        <ul>
            <li>hcp_1.3.0-42_amd64.zip</li>
            <li>hcp_1.3.0-42_amd64.md5sum</li>
        </ul>
    </li>
    <li>Ubuntus20.04
        <ul>
            <li>hcp_1.3.0-42_amd64.zip</li>
            <li>hcp_1.3.0-42_amd64.md5sum</li>
        </ul>
    </li>
<li>Windows
        <ul>
            <li>HCP_Tools_Client.msi</li>
            <li>HCP_Tools_Client.md5sum</li>
        </ul>
    </li>
</ul>


## 2.2. Linuxの場合
CentOS7を例に、説明します。

zipファイルを解凍します。
```
$ unzip hcp-tools-1.3.0-42.el7.centos.zip
```

以下のファイルが同梱されています。
```
hcp-tools-1.3.0-42/
├bin/*.rpm    # コマンドパッケージ
├conf/*.conf  # 設定ファイル
└license/*    # ライセンス文書
```


hcpコマンドのパッケージ hcp-<バージョン>.rpmをインストールします。
```
$ cd hcp-tools-1.3.0-42/bin
$ rpm -ivh hcp-1.3.0-42.el7.centos.x86_64.rpm
$ hcp --version
hcp client (hcp) 1.3.0_42 / Linux (HpFP2 2.0.0.91_16 WSAPI 0.0.1.23)
```

HCP toolsに必要な設定ファイルを、ホームディレクトリにコピーします。
```
$ cp -rp ~/ hcp-tools-1.3.0-42/conf/ ~/.hcp
```

公開鍵の登録
公開鍵(~/.ssh/id_rsa.pub)を、サーバ(gwa.ddbj.nig.ac.jp)の「~/.ssh/authorized_keys」に登録して下さい。
```
[nig01@gw3 ~]$ cat ./id_rsa.pub >> ~/.ssh/authorized_keys
```

(参考) 公開鍵(*.pub)がない場合は、以下のコマンドで作成して下さい。
```
$ ssh-keygen -t rsa
```

## 2.3. Windowsの場合
インストーラ<font color="blue">HCP_Tools_Client.msi</font> をダブルクリックして起動します。

「使用許諾契約書に同意します(A)」にチェックを入れ、「インストール(I)」ボタンをクリックして下さい。

![](HCPtools_1.png)

デバイスの変更許可に「はい」と応えると、インストールが開始します。

![](HCPtools_2.png)

インストール後、以下のファイルが存在することを確認して下さい。

- 実行コマンド

　　C:\Program Files\Clealink\HCP Tools¥hcp.exe

-  設定ファイル

　　C:¥ProgramData¥Clealink¥HCP Tools\hcp.conf

HCP toolsに必要な設定ファイルを、<ホームディレクトリ>/_hcp/配下にコピーします。

※Windowsのホームディレクトリは、「C:\Users\<ユーザ名>」です。

**コピー元**

　C:¥ProgramData¥Clealink¥HCP Tools\*.conf

**コピー先**

　<ホームディレクトリ(C:\Users\<ユーザ名>)>/_hcp/

公開鍵の登録

公開鍵(<ホームディレクトリ>/.ssh/id_rsa.pub)を、サーバ(gwa.ddbj.nig.ac.jp)の「~/.hcp/authorized_keys」に登録して下さい。

 (参考) 公開鍵(*.pub)がない場合は、コマンドプロンプトから、以下のコマンドで作成して下さい。
 ```
> ssh-keygen -t rsa
```

# 3. 設定

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


# 4. SSL-VPN接続を行う

遺伝研スパコン個人ゲノム解析区画でHCP toolsを利用する際には、事前にFortiClient(SSL-VPNクライアントソフトウェア)をインストールしてSSL-VPN接続を行う必要があります。

下記サイトに、<font color="blue">VPNクライアントのインストール</font>および<font color="blue">VPNへの接続方法</font>が掲載されています。

「Windowsの場合」「Macの場合」「Linuxの場合」に分かれている箇所は、自分のOSにあった内容にしたがって下さい。

[ログイン方法（個人ゲノム解析区画）](/personal_genome_division/pg_login/)



# 5. ファイル転送例

## 5.1. アップロード

[例1] ユーザー「nig001」が、ユーザーの計算機から、遺伝研スパコンの個人ゲノム解析区画にあるユーザーのホームディレクトリの下へ、ファイルをコピーします。

- ユーザーの計算機のホームディレクトリにあるfileX.txt「/home/ユーザ名/fileX.txt」を、遺伝研スパコンの個人ゲノム解析区画にあるユーザーのホームディレクトリ「/home/ユーザ名-pg/」の下へコピーしたい場合
```
$ hcp --user nig001 fileX.txt gwa.ddbj.nig.ac.jp:fileX.txt
```

- コピー先のディレクトリを指定したい場合
ユーザーの計算機のホームディレクトリにあるfileX.txt「/home/ユーザ名/fileX.txt」を、遺伝研スパコンの個人ゲノム解析区画にある「/home/ユーザ名-pg/document/」の下にコピーしたい場合は、以下のように実行します。
```
$ hcp --user nig001 fileX.txt gwa.ddbj.nig.ac.jp:/home/ユーザー名-pg/document/fileX.txt
```

ユーザーの計算機のホームディレクトリにあるfileX.txt「/home/ユーザ名/fileX.txt」を、遺伝研スパコンの個人ゲノム解析区画にある「/home/ユーザ名-pg/study/」というディレクトリの下にコピー先を指定したい場合は、以下のように実行します。
```
$ hcp --user nig001 fileX.txt gwa.ddbj.nig.ac.jp:/home/ユーザー名-pg/study/fileX.txt
```


- コピー元とコピー先の両方のディレクトリを指定したい場合
ユーザーの計算機にあるファイル「/home/ユーザ名/download/file.X.txt」を、遺伝研スパコンの個人ゲノム解析区画の指定したディレクトリ/home/ユーザ名-pg/tools/」の下にコピーしたい場合は、以下のように実行します。
```
$ hcp --user nig001 /home/ユーザ名/download/fileX.txt gwa.ddbj.nig.ac.jp:/home/ユーザー名-pg/tools/fileX.txt
```


[例2] 「--hpfp」オプションで、UDP(HpFP2)プロトコルによるコピーをします。コピー元とコピー先は「アップロード[例１]」と同じです。
```
$ hcp --user nig001 --hpfp fileX gwa.ddbj.nig.ac.jp:fileX
```

[例3] 「-R」オプションを付けると、フォルダ「/home/ユーザー名/dir/」配下が、遺伝研スパコンの個人ゲノム解析区画のユーザーのホームディレクトリ「/home/nig001/」配下に、再帰的にコピーされます。
```
$ hcp --user nig001 -R dir/ gwa.ddbj.nig.ac.jp:/home/nig001/
```

## 5.2. ダウンロード

[例1] ユーザ「nig001」が、遺伝研スパコンの個人ゲノム解析区画にあるユーザーのホームディレクトリにあるfileX.txt「/home/ユーザ名-pg/fileX.txt」を、ユーザーの計算機のホームディレクトリ「/home/ユーザ名/」の下にコピーします。
```
$ hcp --user nig001 gwa.ddbj.nig.ac.jp:fileX.txt fileX.txt
```

[例2] 「--hpfp」オプションで、UDP(HpFP2)プロトコルによるコピーをします。コピー元とコピー先は「ダウンロード[例１]」と同じです。
```
$ hcp --user nig001 --hpfp gwa.ddbj.nig.ac.jp:fileX fileX
```

[例3] 「-R」オプションを付けると、遺伝研スパコンの個人ゲノム解析区画のユーザーのホームディレクトリの下にあるディレクトリdir「/home/nig001/dir/」配下を、ユーザーの計算機の「/home/ユーザー名/」配下に、再帰的にコピーされます。
```
$ hcp --user nig001 -R gwa.ddbj.nig.ac.jp:/home/nig001/dir/ .
```

# 6. お問合せ先
お問い合わせ頂く前に、ページTOPにある[マニュアル](/software/HCPtools/hcptools#マニュアル)をご確認下さい。

HCP toolsの設定・操作方法・不具合などに関するご質問につきましては、以下のお問合せフォームにお願いします。

<a href= "https://clealink.jp/hcp/contact/">https://clealink.jp/hcp/contact/</a>


