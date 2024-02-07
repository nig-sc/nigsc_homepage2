---
id: ssh_keys
title: SSH公開鍵の登録・変更
---

&#x26A0;アカウントの新規登録は完了しているが、SSH公開鍵を登録し忘れた、SSH公開鍵だけ変更したいという場合は、[<u>FAQ : 各種申請 > アカウントの新規登録</u>](/faq/faq_NewUser_registration#%F0%9F%86%80-%E3%82%A2%E3%82%AB%E3%82%A6%E3%83%B3%E3%83%88%E3%81%AE%E6%96%B0%E8%A6%8F%E7%99%BB%E9%8C%B2%E3%81%AE%E3%81%A8%E3%81%8D%E3%81%ABssh%E5%85%AC%E9%96%8B%E9%8D%B5%E3%81%AE%E7%99%BB%E9%8C%B2%E3%82%92%E3%81%97%E3%81%AA%E3%81%84%E3%81%BE%E3%81%BE%E7%99%BB%E9%8C%B2%E3%82%92%E5%AE%8C%E4%BA%86%E3%81%97%E3%81%A6%E3%81%97%E3%81%BE%E3%81%84%E3%81%BE%E3%81%97%E3%81%9Fssh%E5%85%AC%E9%96%8B%E9%8D%B5%E3%82%92%E7%99%BB%E9%8C%B2%E3%81%97%E3%81%9F%E3%81%84%E3%81%AE%E3%81%A7%E3%81%99%E3%81%8C%E3%81%A9%E3%81%86%E3%81%97%E3%81%9F%E3%82%89%E3%82%88%E3%81%84%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%81%8B)をご参照ください。


## SSH公開鍵の登録・変更の手順

安全なユーザー認証のために必要となる SSH 公開鍵・秘密鍵をユーザーの計算機上で作成します。
作成には Mac, Linux の場合ターミナルエミュレータ(Windows の場合は PowerShell など)を使います。

作業前にユーザーの計算機に OpenSSH がインストールされていることを確認して下さい。Windows PowerShell への OpenSSH のインストール方法はたとえば[&#x1f517;<u>Microsoft 社の該当ページ</u>](https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse)などを参照してください。


### 1. 公開鍵・秘密鍵の生成

SSH 公開鍵・秘密鍵の生成方法は、以下のリンクをご参照ください。
- [<u>SSH 公開鍵・秘密鍵の生成方法 (Windowsの場合)</u>](/application/ssh_keys_ssh-keygen_win)
- [<u>SSH 公開鍵・秘密鍵の生成方法 (Macの場合)</u>](/application/ssh_keys_ssh-keygen_mac)
- [<u>SSH 公開鍵・秘密鍵の生成方法 (Linuxの場合)</u>](/application/ssh_keys_ssh-keygen_linux)


### 2. 遺伝研スパコンへのSSH公開鍵の登録・変更方法

遺伝研スパコンへのSSH公開鍵の登録方法は、以下のリンクをご参照ください。
- [<u>遺伝研スパコンへのSSH公開鍵の登録・変更方法 (Windowsの場合)</u>](/application/ssh_keys_register_win)
- [<u>遺伝研スパコンへのSSH公開鍵の登録・変更方法 (Macの場合)</u>](/application/ssh_keys_register_mac)
- [<u>遺伝研スパコンへのSSH公開鍵の登録・変更方法 (Linuxの場合)</u>](/application/ssh_keys_register_linux)



### 3. 遺伝研スパコンへの接続

[<u>遺伝研スパコンへの接続</u>](/application/ssh_keys_connect_NIGsupercomputer)のページをご参照ください。

&#x1f4a1; [<u>アカウント申請システムのマイページへログインしたい場合は、「各種申請 > アカウント情報の変更」をご参照ください。</u>](/application/change_account_info)

## 参考文献

- &#x1f517;<u><a href="https://learn.microsoft.com/ja-jp/windows-server/administration/openssh/openssh_install_firstuse?source=recommendations">OpenSSHのインストール方法</a></u>

