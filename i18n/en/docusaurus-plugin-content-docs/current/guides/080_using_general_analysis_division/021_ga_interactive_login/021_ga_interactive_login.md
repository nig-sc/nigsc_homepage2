---
id: 021_ga_interactive_login
title: "How to Login to the Interactive node (The general analysis division)"
---

## Introduction

:::caution
The following procedure is temporary, due to the transition to the Next-Generation Supercomputer.

The updated instructions will be announced later on our website.
:::

![](GA_division_interactive.png)



## How to Log In to an Interactive Node {#login-interactive-node}

After logging in to the gateway node via SSH, connect to one of the interactive nodes a001, a002, or a003 using SSH.

For example, to log in to interactive node a001, execute the following command:

```
ssh a001
```

Enter "yes" to continue connecting if the following message is displayed after entering your password.

```
Are you sure you want to continue connecting (yes/no)?
```

## Example

```
you@gw2:~ (2025-06-18 15:07:52)
$ ssh a001
Welcome to Ubuntu 24.04.1 LTS (GNU/Linux ●●●●●●●●●● x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

 System information as of Wed Jun 18 15:08:05 JST 2025

  System load:  ●●.●●               Temperature:                 ●●● C
  Usage of /:   23.2% of 878.65GB   Processes:                   ●●●●
  Memory usage: ●●%                 Users logged in:             ●●
  Swap usage:   100%                IPv4 address for ibp●●●●●●: ●●●.●●.●●.●

  => There are ●● zombie processes.

 * Strictly confined Kubernetes makes edge and IoT secure. Learn how MicroK8s
   just raised the bar for easy, resilient and secure K8s cluster deployment.

   https://ubuntu.com/engage/secure-kubernetes-at-the-edge

Expanded Security Maintenance for Applications is not enabled.

●●● updates can be applied immediately.
●●● of these updates are standard security updates.
To see these additional updates run: apt list --upgradable

●● additional security updates can be applied with ESM Apps.
Learn more about enabling ESM Apps service at https://ubuntu.com/esm

Last login: Wed Jun 18 08:44:27 2025 from ●●●.●●.●●.●
you@a001:~ (2025-06-18 15:08:12)
$ 
```
