---
id: GPU_nodes_type2
title: アクセラレータ最適化ノード Type 2 (L40Sノード)の使い方
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
- GATK互換ソフトのベンチマーク実行時間は1KGP 30xデータセット(https://www.internationalgenome.org/data-portal/data-collection/30x-grch38) のNA18945サンプルを使った時の計算時間。ベンチマーク詳細はこちらのページ(https://sc.ddbj.nig.ac.jp/advanced_guides/benchmark/benchmark_parabricks/) をご参照ください。

:::


## 利用申請について

現在GPUノードは、計算機の台数が限られていることから、個人ゲノム解析区画に設置されています。
解析対象が個人ゲノムでない場合でも個人ゲノム区画のアカウントを作成の上、利用計画表の作成と提出をお願いしております。




## インタラクティブノードへのログイン {#logging-ininteractive-node}


GPUノードは計算機の台数が特に限られているため、計算機の利用効率向上を優先する目的で
共用のGPU専用のSlurmジョブスケジューラを介して使っていただく形とさせていただいております。

このSlurmパーティションにジョブを投入するには、個人ゲノム解析区画のゲートウェイにSSL-VPN経由でログインした後、まず以下のコマンドを実行してゲートウェイからGPU専用Slurmインタラクティブノードにログインしてください。

```
ssh at022vm02
```


![](pg_gpu_slurm.png)


:::info
- ハードウェア構成の詳細は 
[遺伝研スパコン(2025)ハードウェア](/guides/hardware/hardware2025/)のページを参照してください。
- Slurmの使い方の詳しい説明は[Slurmの使い方](/guides/software/JobScheduler/Slurm/)のページを参照してください。

:::



## ジョブのSlurmへの投入方法 {#submit-job-to-slurm}

L40S GPUを使用してジョブを実行する場合は、以下のSlurmオプションを指定する必要があります：

- `--partition=l40s --account=l40s`: L40S GPU用のパーティションを指定
- `--gres=gpu:N`: 使用するGPUの数（`N` は1～8の範囲で指定可能）

### ジョブスクリプトの作成

以下は、GPUの状態確認用の簡易ジョブスクリプトの例です。任意のファイル名（たとえば `gputest.sh`）で保存してください。

```bash
#!/usr/bin/bash
# Simple GPU test script

nvidia-smi
```

### sbatchによるジョブ投入

たとえば、GPUを1つ使用して `gputest.sh` を実行するには、次のように `sbatch` コマンドを使用します：

```bash
you-pg@at022vm02:~$ sbatch --partition=l40s --account=l40s --gres=gpu:1 gputest.sh
Submitted batch job 228259
```

### 実行結果の確認

ジョブが完了すると、カレントディレクトリに `slurm-<ジョブID>.out` というファイルが出力されます。内容を確認することで、GPUの状態が取得できていることを確認できます：

```bash
you-pg@at022vm02:~$ cat slurm-228259.out
Tue Jun  3 14:13:25 2025
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 570.124.06             Driver Version: 570.124.06       CUDA Version: 12.8  |
|-----------------------------------------+------------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |
|                                         |                        |            MIG M.     |
|=========================================+========================+======================|
|   0  NVIDIA L40S                    On  |   00000000:25:00.0 Off |                 0     |
| N/A   35C    P8             33W /  350W |       1MiB /  46068MiB |   0%      Default     |
+-----------------------------------------+------------------------+----------------------+

+-----------------------------------------------------------------------------------------+
| Processes:                                                                              |
|  GPU   GI   CI              PID   Type   Process name                        GPU Memory |
|        ID   ID                                                             Usage        |
|=========================================================================================|
|  No running processes found                                                           |
+-----------------------------------------------------------------------------------------+
```

この出力により、指定したGPUノード上でジョブが正常に実行されたことが確認できます。

