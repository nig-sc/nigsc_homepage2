---
id: faq_hcptools
title: Archaea tools(旧HCPtools)
---


## &#x1F180; ファイル転送のとき、転送元と転送先は、必ず絶対パスで指定しなければいけないのでしょうか。{#available-relative-path}

&#x1F150; ユーザの計算機のパスには、絶対パスでも相対パスでも、指定することができます。

しかし、個人ゲノム解析区画のパスには、相対パスで指定することはできません。絶対パスで指定してください。


下記は、ユーザの計算機のパスの入力例です。

入力例1と2は、どちらも同じ意味ですので、お好きな方で実行できます。


- ユーザの計算機のホームディレクトリにあるファイル`upload_ex1.txt`を、個人ゲノム解析区画のユーザのホームディレクトリにアップロードする

入力例1：絶対パスで指定する場合
```
hcp --user youraccountname C:\Users\youraccountname\upload_ex1.txt gwa.ddbj.nig.ac.jp:upload_ex1.txt
```

入力例2：相対パスで指定する場合
```
hcp --user youraccountname upload_ex1.txt gwa.ddbj.nig.ac.jp:upload_ex1.txt
```

- ディレクトリを指定してファイルをアップロードする

入力例1：絶対パスで指定する場合
```
hcp --user youraccountname C:\Users\youraccountname\HCP_upload\upload_ex1.txt gwa.ddbj.nig.ac.jp:/home/youraccountname/HCP_upload/upload_ex1.txt
```

入力例2：相対パスで指定する場合
```
hcp --user youraccountname .\HCP_upload\upload_ex1.txt gwa.ddbj.nig.ac.jp:/home/youraccountname/HCP_upload/upload_ex1.txt
```

- 個人ゲノム解析区画のユーザのホームディレクトリにあるファイル`download_ex1.txt`を、ユーザの計算機のホームディレクトリの下にダウンロードする

入力例1：絶対パスで指定する場合
```
hcp --user youraccountname gwa.ddbj.nig.ac.jp:download_ex1.txt C:\Users\youraccountname\download_ex1.txt
```

入力例2：相対パスで指定する場合
```
hcp --user youraccountname gwa.ddbj.nig.ac.jp:download_ex1.txt .\download_ex1.txt
```

- ディレクトリを指定してファイルをダウンロードする

入力例1：絶対パスで指定する場合
```
hcp --user youraccountname gwa.ddbj.nig.ac.jp:/home/youraccountname/HCP_upload/upload_ex1.txt C:\Users\youraccountname\HCP_upload\upload_ex1.txt
```

入力例2：相対パスで指定する場合
```
hcp --user youraccountname gwa.ddbj.nig.ac.jp:/home/youraccountname/HCP_upload/upload_ex1.txt .\HCP_upload\upload_ex1.txt
```

## &#x1F180; ディレクトリを指定してファイル転送をしたいのですが、可能でしょうか。{#transfer-specifed-directory}

&#x1F150; はい、可能です。下記はディレクトリを指定した場合のアップロードの実行例です。

ダウンロードの場合も、アップロードの時と同じように指定すれば、ディレクトリを指定してファイル転送ができます。

- 送信元のディレクトリを指定したい場合
```
hcp --user youraccountname C:\Users\youraccountname\HCPtools_upload_test\upload_ex1.txt gwa.ddbj.nig.ac.jp:upload_ex1.txt
```

- アップロード先のディレクトリを指定したい場合
```
hcp --user youraccountname C:\Users\youraccountname\upload_ex1.txt gwa.ddbj.nig.ac.jp:/home/youraccountname/HCPtools_upload/upload_ex1.txt
```

- 送信元とアップロード先の両方でディレクトリを指定したい場合
```
hcp --user youraccountname C:\Users\youraccountname\HCPtools_upload_test\upload_ex1.txt gwa.ddbj.nig.ac.jp:/home/youraccountname/HCPtools_upload/upload_ex1.txt
```

## &#x1F180; アップロード先またはダウンロード先を指定する時、ファイル名の指定は不要なのではないでしょうか。 {#transfer-specifed-filename}

&#x1F150; 必要です。ファイル名を指定しない場合、下記のようなエラーメッセージが出力され、ファイル転送できません。

```
2022/03/11 14:28:54 00006070:INFO :Negotiation error is set (A001).
2022/03/11 14:28:54 00006070:INFO :A response on negotiation has an error. So it was finished in failure.
2022/03/11 14:28:54 00006070:INFO :An information exchange for operation was failed.
2022/03/11 14:28:54 00006070:INFO :File is not found.hcp::node:HcpnException @ hcp::node::HcpnEndPointTransfer:L454 :  > hcp::proto::HcppException @ hcp::proto::HcppSession:L1209 :
```

## &#x1F180; Windows 11では利用できないのでしょうか。{#available-windows11}

&#x1F150; [<u>コマンド概要説明 p.12</u>](/pdf/HCPtools_overview_ja.pdf)には、Windows 10しか対応していないと書いてありますが、Windows 11でも、ご利用になれます。



