---
slug: 2024-07-08-news_medium-ubuntu-q
title: "July 8, 2024: Partial migration of Medium nodes to Ubuntu Linux and establishment of new Gride Engine queue (medium-ubuntu.q)"
tags:
  - news
date: 2024-07-08
---



Medium nodes have been running on CentOS 7.9, but since Cent OS 7 is no longer supported (EOL) at the end of June, they are being migrated to Ubuntu Linux 22.04 in turn.

<!-- truncate -->

For the Medium node, there are users who want to use the existing analysis environment as it is, and users who want to quickly migrate to Ubuntu Linux and unify the environment with the Thin computation node, so the Grid Engine queue (`medium.q`) of Cent OS7 will be used for the entire current year, We will operate both the Grid Engine queue (`medium-ubuntu.q`) on Cent OS7 and the Grid Engine queue (`medium-ubuntu.q`) on Ubuntu Linux 22.04 for the rest of the year.

To submit a job to `medium-ubuntu.q`, specify `-l medium-ubuntu` when specifying the resource with the qsub command.

(Example.)

```
$ qsub -l medium-ubuntu example.sh
```

The `medium.q` is a queue that has existed so far, and to submit a job to `medium.q`, specify `-l medium` when specifying resources as before.

