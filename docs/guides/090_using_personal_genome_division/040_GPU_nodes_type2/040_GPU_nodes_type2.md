---
id: GPU_nodes_type2
title: アクセラレータ最適化ノード Type 2 (NVIDIA L40Sノード)の使い方
---

アクセラレータ最適化ノード Type 2は、NVIDIA L40Sを1台に8本搭載した計算ノードです。

NVIDIA L40Sは価格に対してFP32性能が高く、ゲノム解析に適したGPUです。

AI用に設計されたGPUに比べてメモリサイズが小さいですが、Alphafold3などを含むAI計算も可能です。


:::info 参考 GPU, アクセラレータの性能比較

| Accerelater  | NVIDIA V100 | NVIDIA A100 | NVIDIA L40S | NVIDIA H100 | NVIDIA B200 | PEZY-SC3 | 
|--------------|-------------|-------------|-------------|-------------|-------------|----------|
| GATK互換ソフトのベンチマーク実行時間 [hh:mm:ss] | 3:07:29 | 2:06:14 | 1:45:05 | 1:56:24 | N/A    | 1:02:55      |
| Architecture | Volta       | Ampere      | Ada Lovelace| Hopper      | Blackwell   | PEZY     |
| Memory size [GB]       | 16 or 32 | 40 or 80 | 40         | 80 or 94   | 192         |  32      | 
| Memory bandwidth [GB/s] | 900 | 2039 | 864         | 3352        | 8,000         | 1200     |
| FP32 [TFlops]        | 15.7  | 19.5      | 91.6        | 66.9        | 80         | 39.32    |
| TF32 tensor core [TFlops] | 125     | 312         | 366         | 989         | 2,200         | N/A      |

- N/A : Not Available, N/D : Not Disclosed
- GATK互換ソフトのベンチマーク実行時間は1KGP 30xデータセット(https://www.internationalgenome.org/data-portal/data-collection/30x-grch38) のNA18945サンプルを使った時の計算時間。ベンチマーク詳細はこちらのページ (https://sc.ddbj.nig.ac.jp/advanced_guides/benchmark_parabricks) をご参照ください。

:::


## インタラクティブノードへのログイン


![](pg_gpu_slurm.png)


L40S GPUノード(アクセラレータ最適化ノード Type 2)は計算機の台数が特に限られているため、計算機の利用効率向上を優先するため共用のGPU専用のSlurmジョブスケジューラを介して使っていただく形とさせていただいております。


<table>
<tr>
<th>Slurmパーティションの名称</th>
<th>ハードウェア種別</th>
<th>台数・合計コア数</th>
</tr>

<tr>
<td>l40s</td>
<td>
GPUノード Type 2<br />
(AMD EPYC 9334, 64 CPU cores/node, <br />
12GB memory/CPU core), 8GPUs/node
</td>
<td>3 台・合計192 コア・合計24 GPU</td>
</tr>

</table>


:::info

Slurmの使い方の詳しい説明は[Slurmの使い方](/guides/software/JobScheduler/Slurm/)のページを参照してください。

:::


このSlurmパーティションにジョブを投入するには、個人ゲノム解析区画のゲートウェイにSSL-VPN経由でログインした後、まず以下のコマンドを実行してゲートウェイからGPU専用Slurmインタラクティブノードにログインしてください。

```
ssh at022vm02
```



## ジョブのSlurmへの投入方法 {#submit-job-to-slurm}


GPUを使用するジョブを投入する場合、`--partition=l40s` オプションと `--gres=gpu:n` (nは使用するGPU数を指定。上限は`4`)オプションを付与してください。


例えば1つのGPUを使用する場合、以下のように指定します。

```
username@l40s-03:~$ sbatch --partition=l40s --gres=gpu:1 gputest.sh
Submitted batch job 228259
```

GPUはジョブから、`--gres=gpu:n`で指定した数だけ参照可能です。



実行例は以下のとおり。

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



