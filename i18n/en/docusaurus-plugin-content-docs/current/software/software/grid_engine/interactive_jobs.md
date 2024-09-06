---
id: interactive_jobs
title: Interactive Jobs (interactive job)
---

When you execute the `qlogin` command on the gateway node, a free login node will be allocated.


```
$ ssh gw.ddbj.nig.ac.jp
Enter passphrase for key '/home/your_account/.ssh/id_rsa': 
Last login: Sat Apr  9 16:53:55 2022 from XXX.XXX.XXX.XXX
---------------------------------------------------------------------
Thank you for using NIG supercomputer system.
This is the gateway node, do not run program here.
Please use 'qlogin' to login to a login node.
---------------------------------------------------------------------

$ qlogin -l s_vmem=16G -l mem_req=16G
Your job 15193768 ("QLOGIN") has been submitted
waiting for interactive job to be scheduled ...
Your interactive job 15193768 has been successfully scheduled.
Establishing /home/geadmin/UGER/utilbin/lx-amd64/qlogin_wrapper session to host at137 ...

$
```

In this example, the login node at137 is allocated to the user, and you will see the prompt for at137 at the end.
You can execute commands interactively from this prompt.

- You can specify the amount of memory available by adding the `-l s_vmem`,` -l mem_req` options to the `qlogin` command. (On the general analysis division, 4GB memory will be allocated when you specify no options. On the personal genome analysis division, allocated memory depend on the configuration to use.)
- The upper limit for memory that can be specified on the interactive node is approximately 96 GB. If you need larger than this, run a batch job on the compute node using the qsub command or contact ![](sc-helpdesk.png). Also, depending on the congestion of the interactive node, you may be asked to conserve memory.
