---
slug: 2026-10-22-security-alert
title: "Critical Security Vulnerabilities in PHP and Node.js, and Compromise of eMudhra Intermediate CA Private Keys"
tags:
  - maintenance
date: 2026-10-22
---

Three security issues requiring attention were disclosed between 20 and 21 October 2026:

1. Compromise of intermediate Certificate Authority (CA) private keys belonging to eMudhra (emSign)
2. Security vulnerabilities in Node.js
3. Security vulnerabilities in PHP and Apache Tomcat

Issue 1 affects all users. Please consider taking the measures described in Section 1, under "Recommended Actions".

Issue 2 affects users of Node.js. If you use Node.js, please consider taking the measures described in Section 2, under "Recommended Actions".

Further details of each security issue are provided below.

<!-- truncate -->

## 1. Compromise of eMudhra (emSign) Intermediate CA Private Keys

### Overview

The private keys associated with eight intermediate CA certificates issued by eMudhra have been compromised, potentially allowing unauthorised third parties to issue apparently legitimate certificates for arbitrary websites.

This could enable attackers to impersonate legitimate websites and intercept or tamper with communications.

Software that has not been updated to address this issue may fail to display certificate warnings when connecting to fraudulent websites, leaving users unable to detect the interception or modification of their communications.

### Recommended Actions

(1) Update your operating system to the latest version and restart your computer (using Windows Update or Software Update on macOS).

(2) Update your web browser (Chrome, Firefox, Edge or Safari) to the latest version and restart it.

### Additional Actions for NIG Supercomputer Users Who Have Installed Python, conda, R or Git in Their Home Directories or Other User-managed Locations

(1) If you use pip, run the following command:

```
$ pip install --upgrade pip certifi
```

If you use conda, run the following command in each conda environment:

```
$ conda update ca-certificates certifi
```

If you use uv, update it to version 0.13.4 or later.

### How to Verify That the Issue Has Been Addressed

Access the following URL. If a certificate error occurs, the affected certificate is being rejected as expected.

If the page loads normally without a certificate warning, the necessary measures may not yet have been applied.

- To check using a web browser:

  [https://dv-g3b-emudhra.we-have-a-problem.com/](https://dv-g3b-emudhra.we-have-a-problem.com/)

- To check using a command-line tool:

  ```
  $ curl https://dv-g3b-emudhra.we-have-a-problem.com/
  ```

  If you use Python, also run the following command and confirm that a certificate verification error occurs:

  ```
  $ python3 -c "import urllib.request; urllib.request.urlopen('https://dv-g3b-emudhra.we-have-a-problem.com/')"
  ```

## 2. Security Vulnerabilities in Node.js

### Overview

Security vulnerabilities in Node.js may allow a malicious remote server to execute arbitrary code when a vulnerable Node.js application connects to it and processes its response.

The risks are not limited to publicly accessible web servers. Scripts and tools that retrieve data from external APIs or websites may also be affected.

### Affected Users

NIG Supercomputer users who have installed and are using Node.js in their home directories or other user-managed locations.

### Recommended Actions

(1) Check your current Node.js version using the following command:

```
$ node -v
```

(2) Update Node.js to one of the following security-fixed versions, as appropriate for your release line:

- 22.23.4
- 24.22.1
- 26.12.1

(3) Security updates are available only for the 22.x, 24.x and 26.x release lines. If you are using another version, migrate as follows:

- 25.x: Migrate to 26.12.1.
- 23.x: Migrate to 24.22.1.
- 21.x, 20.x or earlier: Migrate to 24.22.1 or 26.12.1.

Node.js 22.x is scheduled to reach end of support in April 2027. We therefore do not recommend choosing this release line when migrating from an older version.

(4) If you use containers that include Node.js, pull the latest base image and rebuild the containers without using the build cache.

## 3. Security Vulnerabilities in PHP and Apache Tomcat

### Overview

Web servers running vulnerable versions of PHP or Apache Tomcat may be at risk of being compromised remotely without authentication.

The vulnerabilities are rated Critical, the highest severity level.

Details of exploitation techniques were leaked online before the security fixes were released. Administrators should therefore take urgent action on the assumption that exploitation attempts may already be under way.

If you have any questions, please [contact the NIG Supercomputer Helpdesk](/application/reference).

- References
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
