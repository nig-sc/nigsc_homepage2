---
slug: 2026-10-23-security-issues
title: "[Important Notice] Critical Vulnerabilities in PHP and Node.js, and the eMudhra Intermediate CA Key Leak"
tags:
  - maintenance
date: 2026-10-23
---

Published: 23 October 2026<br/>
Last updated: 23 October 2026

Four security issues that require action were published between 20 and 21 October.

1. Leak of intermediate CA keys of the certificate authority eMudhra (emSign)
2. Vulnerability in Node.js
3. Vulnerability in PHP
4. Vulnerability in Apache Tomcat

<!-- truncate -->

Issue 1 affects all users. Please consider the actions under 1. [What to do].<br/>
If you use Node.js, please consider the actions under 2. [What to do] for issue 2.

For each issue, please see the details below.

## 1. Leak of intermediate CA keys of eMudhra (emSign)

### [Overview]

For eight intermediate certificates of the certificate authority operated by eMudhra, a third party was able to create genuine certificates that impersonate any website.<br/>
With them, an attacker can impersonate any website and tamper with its content.<br/>
Software that has not been updated shows no warning when it connects to a fake site, so eavesdropping on or tampering with the communication cannot be detected.

### [What to do]

1. Update your OS to the latest version and restart your PC (Windows Update, macOS Software Update).
2. Update your browser (Chrome, Firefox, Edge, Safari) to the latest version and restart it.

### [What to do if you have installed Python, conda, R or git in your home area or elsewhere on the NIG supercomputer]

If you use pip, run the following command.

```
$ pip install --upgrade pip certifi
```

If you use conda, run the following command in each environment.

```
$ conda update ca-certificates certifi
```

If you use uv, update it to version 0.13.4 or later.

### [How to check]

Connect to the following URL. If you get a certificate error, the action has taken effect. If the page is displayed normally, the actions above may not be complete.

To open it in a browser:

```
https://dv-g3b-emudhra.we-have-a-problem.com/
```

To check on the command line:

```
$ curl https://dv-g3b-emudhra.we-have-a-problem.com/
```

If you use Python, also confirm that the following command ends with an error.

```
$ python3 -c "import urllib.request; urllib.request.urlopen('https://dv-g3b-emudhra.we-have-a-problem.com/')"
```

## 2. Vulnerability in Node.js

### [Overview]

A Node.js program can have arbitrary code executed by a malicious server merely by connecting to an external server and receiving its response.<br/>
Not only programs published as web servers are affected, but also scripts and tools that fetch external APIs or web pages.

### [Who is affected]

Users who have installed Node.js in their home area or elsewhere on the NIG supercomputer.

### [What to do]

1. Check your Node.js version with the following command.

   ```
   $ node -v
   ```

2. Update to one of the fixed versions: 22.23.4, 24.22.1 or 26.12.1.
3. Fixed versions are released only for the 22.x, 24.x and 26.x lines. If you use any other version, move as follows.
   - If you use 25.x, move to 26.12.1.
   - If you use 23.x, move to 24.22.1.
   - If you use 21.x, 20.x or earlier, move to 24.22.1 or 26.12.1.

   Support for 22.x is scheduled to end in April 2027, so we do not recommend it as a new destination.
4. For containers that include Node.js, pull the latest base image again and rebuild without using the cache.

## 3. Vulnerability in PHP

### [Overview]

A web server running on PHP can be taken over from outside without authentication.

## 4. Vulnerability in Apache Tomcat

### [Overview]

In systems that use Apache Tomcat, information may be leaked or tampered with in communication over HTTP/2, and unauthorized access that abuses the authentication function may occur.

## References

- [eMudhra Intermediate CA Compromise](https://emudhra.we-have-a-problem.com/)
- [Node.js v24.22.1 fixes four HIGH CVEs](https://lilting.ch/en/articles/nodejs-tls-dns-brotli-security-release)
- [Node.js - Wednesday, October 21, 2026 Security Releases](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases)
- [PHP2Shell, Leaked Critical PHP Vulnerabilities (Huntress)](https://www.huntress.com/blog/php2shell-leaked-critical-php-vulnerabilities)
- [PHP2Shell (Wikipedia)](https://en.wikipedia.org/wiki/PHP2Shell)
- [Major security alert: PHP vulnerable to critical RCE (Patchstack)](https://patchstack.com/articles/php-major-vulnerability-alert-10-2026/)
- [JVNVU#93110597 Multiple vulnerabilities in Apache Tomcat (20 October 2026)](https://jvn.jp/vu/JVNVU93110597/)
