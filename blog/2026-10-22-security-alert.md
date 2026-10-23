---
slug: 2026-10-22-security-alert
title: "PHP/Node.jsの重大な脆弱性、およびeMudhra中間CA鍵漏洩のお知らせ"
tags:
  - maintenance
date: 2026-10-22
---


10月20日から21日にかけて、対応が必要なセキュリティ問題が3件公表されました。
1. 認証局 eMudhra（emSign）の中間CA鍵漏洩
2. Node.js の脆弱性
3. PHP および Apache Tomcat の脆弱性

1 に関しては、すべてのユーザが対象となりますので、1.【対処法】の対応をご検討ください。

2 に関しては、Node.js を使っている方は 2.【対処法】の対応をご検討ください。

それぞれのセキュリティ問題については、以下をご確認ください。

<!-- truncate -->

## 1. 認証局 eMudhra（emSign）の中間CA鍵漏洩

### 【概要】

eMudhra が運営する認証局の中間証明書8件について、第三者が、任意の Web サイトになりすますための正規の証明書を作れる状態でした。
これにより、攻撃者が任意の Web サイトに成りすましたり、改ざんなどをすることが可能です。
対策していないソフトウェアでは、偽のサイトに接続しても警告が出ず、通信内容の盗聴や改ざんを見抜くことができません。

### 【対処法】

(1) OS を最新の状態に更新し、PC を再起動してください（Windows Update、macOS のソフトウェアアップデート）。

(2) ブラウザ（Chrome、Firefox、Edge、Safari）を最新版に更新し、再起動してください。

### 【遺伝研スパコン内で、ホーム領域などに Python、conda、R、git をインストールして使っている方の対処法】

(1) pip を使っている場合は、次のコマンドを実行してください。

```
$ pip install --upgrade pip certifi
```

  conda を使っている場合は、各環境で次のコマンドを実行してください。

 ```
 $ conda update ca-certificates certifi
 ```

  uv を使っている場合は 0.13.4 以降に更新してください。

### 【確認方法】

次の URL に接続して、証明書エラーになれば対処済みです。正常に表示されてしまう場合は、上記の作業が完了していない可能性があります。

- ブラウザで開く場合：

  [https://dv-g3b-emudhra.we-have-a-problem.com/](https://dv-g3b-emudhra.we-have-a-problem.com/)

- コマンドで確認する場合：

  ```
  $ curl https://dv-g3b-emudhra.we-have-a-problem.com/
  ```
  
  Python を使っている方は、以下コマンドもエラーになることを確認してください。
  
  ```
  $ python3 -c "import urllib.request; urllib.request.urlopen('https://dv-g3b-emudhra.we-have-a-problem.com/')"
  ```


## 2. Node.js の脆弱性

### 【概要】

Node.js のプログラムが外部のサーバに接続して応答を受け取るだけで、悪意あるサーバから任意のコードを実行される可能性があります。
Web サーバとして公開しているものだけでなく、外部の API や Web ページを取得するスクリプトやツールも対象です。

### 【対象者】

遺伝研スパコン内で、ホーム領域などに Node.js をインストールして使っている方

### 【対処法】

(1) 次のコマンドで Node.js のバージョンを確認してください。

```
$ node -v
```

(2) 修正版の 22.23.4、24.22.1、26.12.1 のいずれかに更新してください。

(3) 修正版が出るのは 22.x、24.x、26.x の3系統だけです。それ以外のバージョンを使っている場合は、次のように移行してください。

  - 25.x を使っている場合 → 26.12.1 に移行
  - 23.x を使っている場合 → 24.22.1 に移行
  - 21.x、20.x、それ以前を使っている場合 → 24.22.1 または 26.12.1 に移行

22.x は2027年4月でサポートが終了する予定のため、新たに移行する先としてはおすすめしません。

(4) Node.js を含むコンテナは、最新のベースイメージを取得しなおし、キャッシュを使わずに再ビルドしてください。


## 3. PHP および Apache Tomcat の脆弱性

### 【概要】

PHP で動作している Web サーバおよび、Apache Tomcat で動作している Web サーバは認証なしで外部から乗っ取られる可能性があります。
深刻度は最高ランクの Critical で、攻撃方法が修正版の公開前にインターネット上に流出しているため、すでに攻撃が始まっている前提で対応する必要があります。

不明な点は [問い合わせ先窓口](/application/reference) までお問い合わせください。

- 参考情報
  - PHP2Shell, Leaked Critical PHP Vulnerabilities (Huntress)

    [https://www.huntress.com/blog/php2shell-leaked-critical-php-vulnerabilities](https://www.huntress.com/blog/php2shell-leaked-critical-php-vulnerabilities)

  - PHP2Shell (Wikipedia)

    [https://en.wikipedia.org/wiki/PHP2Shell](https://en.wikipedia.org/wiki/PHP2Shell)

  - Major security alert: PHP vulnerable to critical RCE (Patchstack)

    [https://patchstack.com/articles/php-major-vulnerability-alert-10-2026/](https://patchstack.com/articles/php-major-vulnerability-alert-10-2026/)

  - Node.js – Wednesday, October 21, 2026 Security Releases

    [https://nodejs.org/en/blog/vulnerability/october-2026-security-releases](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases)

  - Node.js v24.22.1 fixes four HIGH CVEs

    [https://lilting.ch/en/articles/nodejs-tls-dns-brotli-security-release](https://lilting.ch/en/articles/nodejs-tls-dns-brotli-security-release)

  - eMudhra Intermediate CA Compromise

    [https://emudhra.we-have-a-problem.com/](https://emudhra.we-have-a-problem.com/)
