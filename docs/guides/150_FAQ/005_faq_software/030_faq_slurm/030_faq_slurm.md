---
id: faq_slurm
title: "FAQ: Slurm"
---

## &#x1F180;  128コアを使用したいと申し込みましたが、実際に使われているのは32コアに見えます。{# exceeding_32-jobs_limit}

&#x1F150; Slurmマスターデーモン側で何も設定しないと、一人のユーザがジョブをたくさん流した場合すべての計算ノードのすべてのコアを埋めようとすることを避けることは不可能となります。

そこでパーティションあたり一人最大32ジョブだけしか流れない設定にしています。
この状態で例えば128コアを並列で使いたい場合は、並列ジョブを使うことによって実現できます。

#### 例1: 128コア分を1ジョブとして流す方法(実際には実行終了時間が似たプログラムをまとめることで適切にジョブスクリプトを分割してください)

```
#!/bin/bash
#SBATCH --job-name=multi_prog
#SBATCH --ntasks=128
#SBATCH --cpus-per-task=1
#SBATCH --time=00:10:00
#SBATCH --partition=normal

# コマンド配列（128個分のコマンドを格納）
commands=(
    "python3 prog_000.py --foo 1"
    "python3 prog_001.py --bar 2"
    "python3 prog_002.py input.txt"
    "bash run_analysis.sh sampleA"
    # ... 以降も追加して最大128個まで並べる
)

# 各コマンドをバックグラウンドでsrun実行
for i in "${!commands[@]}"; do
    srun --exclusive -N1 -n1 bash -c "${commands[i]}" &
done

wait
```


#### 例2:  128個のジョブからなるアレイジョブの例

元々のアレイジョブのジョブスクリプトが以下のようになっていたとします。

```
#!/bin/bash
#SBATCH --job-name=arrayjob
#SBATCH --array=0-127
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --time=00:10:00
#SBATCH --partition=normal

INPUT_FILE=$(printf "input_%03d.txt" ${SLURM_ARRAY_TASK_ID})
python3 process.py "$INPUT_FILE"
```

これを並列ジョブを使って128並列で流すには以下のようにします。(これはSlurmでは1ジョブと数えられます。)

```
#!/bin/bash
#SBATCH --job-name=paralleljob
#SBATCH --ntasks=128
#SBATCH --cpus-per-task=1
#SBATCH --time=00:10:00
#SBATCH --partition=normal

# 各コアに一つずつ処理を割り当てる（バックグラウンドで起動し wait）
for i in $(seq 0 127); do
    INPUT_FILE=$(printf "input_%03d.txt" $i)
    srun --exclusive -N1 -n1 python3 process.py "$INPUT_FILE" &
done

wait  # 全てのバックグラウンド処理が終わるのを待つ
```
