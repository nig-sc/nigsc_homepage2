---
id: faq1
title: "よくある質問(FAQ)"
---



## 公開鍵による認証ができません。

ホームディレクトリのgroup,otherにwrite権限が付与されている場合、公開鍵による認証は失敗します。
また、`~/.ssh`および`~/.ssh/authorized_keys`に、owner以外の権限が付与されている場合も公開鍵認証に失敗します。
以下の3つのディレクトリ・ファイルのパーミッションをご確認願います。

パーミッションはchmodコマンドで変更できます。

```
（例）
chmod 750 ~/
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```



## 新スパコンにSShログインできない場合の対応


遺伝研スパコンにログインしようとした際、下記のようなメッセージが表示されてログインできない場合があります。

```
$ ssh gw.ddbj.nig.ac.jp
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@       WARNING: POSSIBLE DNS SPOOFING DETECTED!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
The RSA host key for gw.ddbj.nig.ac.jp has changed,
and the key for the corresponding IP address 133.39.228.101
is unknown. This could either mean that
DNS SPOOFING is happening or the IP address for the host
and its host key have changed at the same time.
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the RSA key sent by the remote host is
SHA256:xkyH37QZowWjidMSCIbOZa7Vw1p46Dxt4nF9nFJG+hk.
Please contact your system administrator.
Add correct host key in /home/username/.ssh/known_hosts to get rid of this message.
Offending RSA key in /home/username/.ssh/known_hosts:X
RSA host key for gw.ddbj.nig.ac.jp has changed and you have requested strict checking.
Host key verification failed.
```


その場合は、`.ssh/known_hosts`ファイルの該当行を削除、もしくは`.ssh/known_hosts`ファイル自体を削除する。
また、`ssh-keygen -R gw.ddbj.nig.ac.jp` を使用して該当行を削除してください。


## 計算ノードの障害等によりジョブが再実行された際に、注意する点はありますか。

ジョブが再実行された場合は、

１．ジョブの標準出力、標準エラー出力は再実行前のファイルに追記されます。
２．投入しているジョブによっては1度目の実行で出力されたファイルの存在により、
　　2度目の実行がエラーもしくは不適切になる場合があります。問題の発生が
　　懸念される場合は、中間ファイルや結果ファイルを削除した上で、ジョブを
　　再投入して頂けるよう、お願いします。
３．必要に応じてジョブ内で再実行に備えた処置を加えて頂けるようお願いします。
　　例えばシェルスクリプトの場合ですと以下のような処理を加えることで問題を回避できます。

 

例（一つの中間ファイルを出力し、それを入力として結果ファイルを出力するジョブの場合）

```bash
#!/bin/sh
#$ -S /bin/sh
tmpfile=/home/user/tmpdir/tmpfile.txt　                        #中間ファイルを指定
outfile=/home/user/outdir/outfile.txt                                #結果ファイルを指定

###追記内容##########################
if [ -ｆ ${tmpfile} ] ; then　　　　　　　　    　             #中間ファイルが存在すれば削除
rm ${tmpfile}
fi
if [ -ｆ ${outfile} ] ; then　　　　　　　　　   　           #結果ファイルが存在すれば削除
rm ${outfile}
fi
#####################################
```



## 共同研究しているユーザ間でのデータ共有（アクセス権の許可）は可能でしょうか


ユーザ登録時に入力された研究責任者の情報が組織・責任者ともに一致するユー ザの間では、 特に追加で申請いただくことなく、ユーザ間でのデータ共有が可能です。 ユーザが所属するグループは研究責任者情報の組織・責任者により決定します。本スーパーコンピュータシステム環境ではデフォルトの設定で、同一グループのユーザのホームディレ クトリを閲覧できる設定となっております。 従って、同一の研究責任者のもとで登録されているユーザの間では、相互に情報を閲覧できます。 ユーザが所属しているグループは以下のコマンドで確認可能です。 $ id username uid=＊＊＊(username) gid=＊＊＊(groupname) 所属グループ=＊＊＊(groupname) 上記に該当しない場合のデータ共有を望まれる場合は別途お問い合わせ願います。


## 研究責任者が異なるユーザ間でのデータ共有は可能でしょうか


グループの責任者を決めていただき、責任者となる方に「プロジェクト用アカウント」を申請していただきます。ユーザはこのアカウントの作成に伴い作成されるグループに所属していただくことで、情報の共有が可能となります。 


