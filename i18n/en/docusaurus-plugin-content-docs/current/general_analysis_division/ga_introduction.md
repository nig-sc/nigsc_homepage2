---
id: ga_introduction
title: "Introduction（The General Analysis division)"
---


## System configuration of the general analysis division

The general analysis division of NIG supercomputer is a cluster configuration of bundling of many computers called nodes.

A job scheduler is a program that assigns an appropriate computer on a cluster computer system to a computation request from a user. The NIG supercomputer uses Grid Engine, the successor to Sun Grid Engine, which has been widely used in bioinformatics, as a job scheduler.

All nodes managed by Grid Engine mounts a Analysis storage system (Lustre FS) and users' home directories are equally accessible from all nodes.


![](GA_division_EN.png)
