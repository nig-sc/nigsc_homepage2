---
id: GPU_nodes_type2
title: "Using the Accelerator-optimised node Type 2 (L40S Node)"
---


The Accelerator-optimised node Type 2 is a compute node equipped with eight NVIDIA L40S GPUs.

The NVIDIA L40S offers excellent FP32 performance relative to its price, making it well-suited for genome analysis workloads.

While its memory capacity is smaller compared to GPUs designed specifically for AI tasks, it remains capable of handling AI computations, including those required by AlphaFold3.



:::info Appendix: GPU and Accelerator Performance Comparison



| Accerelater  | NVIDIA V100 | NVIDIA A100 | NVIDIA L40S | NVIDIA H100 | NVIDIA B200 | PEZY-SC3 | 
|--------------|-------------|-------------|-------------|-------------|-------------|----------|
| Benchmark Run Time of GATK Compatible Software [hh:mm:ss] | 3:07:29 | 2:06:14 | 1:45:05 | 1:56:24 | N/A    | 1:02:55      |
| Architecture | Volta       | Ampere      | Ada Lovelace| Hopper      | Blackwell   | PEZY     |
| Memory size [GB]       | 16 or 32 | 40 or 80 | 40         | 80 or 94   | N/D         |  32      | 
| Memory bandwidth [GB/s] | 900 | 2039 | 864         | 3352        | N/D         | 1200     |
| FP32 [TFlops]        | 15.7  | 19.5      | 91.6        | 66.9        | N/D         | 39.32    |

- N/A : Not Available, N/D : Not Disclosed
- Benchmark run times for GATK compatible software is the computing time when using the NA18945 sample from [the 1KGP 30x data set](https://www.internationalgenome.org/data-portal/data-collection/30x-grch38). For more details on the benchmark, check [the Benchmark(NVIDIA Parabriks) page on our website](https://sc.ddbj.nig.ac.jp/advanced_guides/benchmark_parabricks).

:::


## Logging in to Interactive Nodes


![](pg_gpu_slurm.png)


The L40S GPU nodes (Accelerator-optimised node Type 2) are limited in number. To prioritise efficient usage of these computing resources, access is provided exclusively via a shared Slurm job scheduler partition dedicated to GPU jobs.


<table>
<tr>
<th>Slurm Partition Name</th>
<th>Hardware Type</th>
<th>Number of Nodes / Total CPU Cores</th>
</tr>

<tr>
<td>l40s</td>
<td>
GPU node Type 2<br />
(AMD EPYC 9334, 64 CPU cores/node, <br />
12GB memory/CPU core), 8GPUs/node
</td>
<td>3 nodes / 192 CPU cores / 24 GPUs</td>
</tr>

</table>


:::info

For detailed instructions on how to use Slurm, please refer to [the Slurm page]](/guides/software/JobScheduler/Slurm/).

:::


To submit jobs to this Slurm partition, first connect to the gateway of the Personal Genome Analysis division via SSL-VPN.
Then, execute the following command to log in from the gateway to the dedicated GPU Slurm interactive node:



```
ssh at022vm02
```



## ジョブのSlurmへの投入方法 {#submit-job-to-slurm}


When submitting a job that uses GPUs, please include the `--partition=l40s` option along with the `--gres=gpu:n` option, where `n` specifies the number of GPUs to use (up to a maximum of 4).

For example, to use a single GPU, specify the options as follows:


```
username@l40s-03:~$ sbatch --partition=l40s --gres=gpu:1 gputest.sh
Submitted batch job 228259
```

Only the number of GPUs specified with `--gres=gpu:n` in your job submission will be accessible from within the job.

An example is shown below:


```
username@l40s-03:~$ cat gputest.sh
#!/usr/bin/bash



nvidia-smi



username@l40s-03:~$ cat slurm-228259.out
Tue Jun  3 14:13:25 2025
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 570.124.06             Driver Version: 570.124.06
CUDA Version: 12.8     |
|-----------------------------------------+------------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id          Disp.A |
Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage |
GPU-Util  Compute M. |
|                                         |                        |
            MIG M. |
|=========================================+========================+======================|
|   0  NVIDIA L40S                    On  |   00000000:25:00.0 Off |
                 0 |
| N/A   35C    P8             33W /  350W |       1MiB /  46068MiB |
   0%      Default |
|                                         |                        |
               N/A |
+-----------------------------------------+------------------------+----------------------+



+-----------------------------------------------------------------------------------------+
| Processes:
                   |
|  GPU   GI   CI              PID   Type   Process name
        GPU Memory |
|        ID   ID
        Usage      |
|=========================================================================================|
|  No running processes found
                   |
+-----------------------------------------------------------------------------------------+
```



