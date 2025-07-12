---
id: parabricks_fq2bam
title: Parabricksを用いたfq2bamの実行
---


NVIDIA Parabricksの公式のチュートリアル ( https://docs.nvidia.com/clara/parabricks/latest/tutorials/fq2bam_tutorial.html )
では、fq2bamはParabricsのDockerコンテナを用いて以下のように実行するように書かれています。


```
 docker run \
      --gpus all \
      --rm \
      --volume $(pwd):/workdir \
      --volume $(pwd):/outputdir \
    nvcr.io/nvidia/clara/clara-parabricks:4.5.1-1 \
    pbrun fq2bam \
      --ref /workdir/parabricks_sample/Ref/Homo_sapiens_assembly38.fasta \
      --in-fq /workdir/parabricks_sample/Data/sample_1.fq.gz /workdir/parabricks_sample/Data/sample_2.fq.gz \
      --out-bam /outputdir/fq2bam_output.bam
```

- 計算ノードが持つGPUすべてを使う指定となっています。
- カレントディレクトリにリファレンスゲノムおよびペアエンドリードデータが置かれていることが仮定されています。

これに対応するapptainerでの呼び出し方は以下のようになります。

```
apptainer exec \
  --nv \
  --bind "$(pwd)":/workdir \
  --bind "$(pwd)":/outputdir \
  clara-parabricks.sif \
  pbrun fq2bam \
    --ref /workdir/parabricks_sample/Ref/Homo_sapiens_assembly38.fasta \
    --in-fq /workdir/parabricks_sample/Data/sample_1.fq.gz /workdir/parabricks_sample/Data/sample_2.fq.gz \
    --out-bam /outputdir/fq2bam_output.bam
    --num-gpus 8
```

- `--nv` はapptainerコンテナがNVIDIA GPUを用いるという意味です。デフォルトではノードに存在しているすべてのGPUを使おうとするので、
  実際使用する時にはには使用するGPU数を`--num-gpus`オプションにて明示的に指定するのがよいです。
- `clara-parabricks.sif`は先ほどビルドしたapptainerコンテナイメージです。


これを遺伝研スパコンのGPUノード上で実行するには、slurmを介してジョブを投入する必要があります。

## slurm sbatchコマンドによるジョブの実行

slurmのバッチジョブとしてparabricksのfq2bamを実行するために、以下のようなジョブスクリプト(`run_fq2bam.sh`)を作成します。

:::info
この例ではGPUは1本だけ使うように指定しています。
:::

```
#!/bin/bash
#SBATCH --job-name=fq2bam
#SBATCH --output=fq2bam_%j.out
#SBATCH --error=fq2bam_%j.err
#SBATCH --partition=l40s
#SBATCH --account=l40s
#SBATCH --gres=gpu:1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=16
#SBATCH --mem=94G
#SBATCH --time=01:00:00


apptainer exec \
  --nv \
  --bind "$(pwd)":/workdir \
  --bind "$(pwd)":/outputdir \
  clara-parabricks.sif \
  pbrun fq2bam \
    --ref /workdir/parabricks_sample/Ref/Homo_sapiens_assembly38.fasta \
    --in-fq /workdir/parabricks_sample/Data/sample_1.fq.gz /workdir/parabricks_sample/Data/sample_2.fq.gz \
    --out-bam /outputdir/fq2bam_output.bam \
    --num-gpus 1

```

- ここではslurmパーティションに`l40s`を指定しています。同時に`--account=l40s`も指定する必要があります。


このジョブスクリプトを以下のように`sbatch`コマンドから呼よぶと実行されます。

```
sbatch run_fq2bam.sh
```


:::info ジョブスクリプトで指定するリソース量の目安


使用するGPU数と、L40S計算ノード(アクセラレータ最適化ノードType 2)で指定するパラメータの対応について以下の表にまとめました。
（あくまで目安なので、ジョブが入りにくいようなら適宜調整してください。)

<table cellpadding="6" cellspacing="0">
  <thead>
    <tr>
      <th rowspan="2">GPU数</th>
      <th colspan="3">アクセラレータ最適化ノード Type 2 (L40Sノード)での推奨指定</th>
      <th colspan="2">ParabricksのSystem Requirements</th>

    </tr>
    <tr>
      <th>CPUスレッド数<br /> (`--cpus-per-task`)</th>
      <th>CPU RAM <br />(`--mem`)</th>
      <th>(参考)CPUコア数</th>
      <th>CPUスレッド数</th>
      <th>CPU RAM</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">1</td>
      <td align="center">16</td>
      <td align="center">94GB</td>
      <td align="center">8</td>
      <td align="center">---</td>
      <td align="center">---</td>
    </tr>
    <tr>
      <td align="center">2</td>
      <td align="center">32</td>
      <td align="center">188GB</td>
      <td align="center">16</td>
      <td align="center">24</td>
      <td align="center">100GB</td>
    </tr>
    <tr>
      <td align="center">4</td>
      <td align="center">64</td>
      <td align="center">376GB</td>
      <td align="center">32</td>
      <td align="center">32</td>
      <td align="center">196GB</td>
    </tr>
    <tr>
      <td align="center">8</td>
      <td align="center">128</td>
      <td align="center">752GB</td>
      <td align="center">64</td>
      <td align="center">48</td>
      <td align="center">392GB</td>
    </tr>
  </tbody>
</table>


Parabricksの公式ドキュメント https://docs.nvidia.com/clara/parabricks/4.5.1/gettingstarted/installationrequirements.html によると
必要なリソース量は以下のとおり。

System Requirements:

- A 2 GPU system should have at least 100GB CPU RAM and at least 24 CPU threads.
- A 4 GPU system should have at least 196GB CPU RAM and at least 32 CPU threads.
- A 8 GPU system should have at least 392GB CPU RAM and at least 48 CPU threads.

ここでthreadsとはCPUの物理コア数ではなく、CPUのハイパースレッディング機能をONにしたときの論理スレッド数であることに注意。
たとえばL40S計算ノード(アクセラレータ最適化ノードType 2)では、1ノードあたりCPU物理コア数64なので論理スレッド数はその2倍、ノードあたり128threads存在する。




:::



実際の実行結果は以下のとおり。



```
$ sbatch run_fq2bam.sh
Submitted batch job 741068
you-pg@at022vm02:~/workdir003 (2025-07-12 00:32:19)
$ squeue
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
            741068      l40s   fq2bam      you  R       0:03      1 l40s-02
```


終了時の出力は以下のとおり。

```
$ cat fq2bam_741068.out 

[Parabricks Options Mesg]: Checking argument compatibility
[Parabricks Options Mesg]: Set --bwa-options="-K #" to produce compatible pair-ended results with previous versions of
fq2bam or BWA MEM.
[Parabricks Options Mesg]: Automatically generating ID prefix
[Parabricks Options Mesg]: Read group created for /workdir/parabricks_sample/Data/sample_1.fq.gz and
/workdir/parabricks_sample/Data/sample_2.fq.gz
[Parabricks Options Mesg]: @RG\tID:HK3TJBCX2.1\tLB:lib1\tPL:bar\tSM:sample\tPU:HK3TJBCX2.1
Please visit https://docs.nvidia.com/clara/#parabricks for detailed documentation


you-pg@at022vm02:~/workdir003 (2025-07-12 00:35:23)
$ cat fq2bam_741068.err
[PB Info 2025-Jul-12 00:32:23] ------------------------------------------------------------------------------
[PB Info 2025-Jul-12 00:32:23] ||                 Parabricks accelerated Genomics Pipeline                 ||
[PB Info 2025-Jul-12 00:32:23] ||                              Version 4.5.1-1                             ||
[PB Info 2025-Jul-12 00:32:23] ||                      GPU-PBBWA mem, Sorting Phase-I                      ||
[PB Info 2025-Jul-12 00:32:23] ------------------------------------------------------------------------------
[PB Info 2025-Jul-12 00:32:23] Mode = pair-ended-gpu
[PB Info 2025-Jul-12 00:32:23] Running with 1 GPU(s), using 4 stream(s) per device with 16 worker threads per GPU
[PB Info 2025-Jul-12 00:32:33] # 10  0  0  0  0   0 pool:  0 0 bases/GPU/minute: 0.0 
[PB Info 2025-Jul-12 00:32:43] # 10 12  2  4  0   0 pool:  1 354330711 bases/GPU/minute: 2125984266.0 
[PB Info 2025-Jul-12 00:32:53] # 10 10  4  2  0   0 pool:  3 942362178 bases/GPU/minute: 3528188802.0 
[PB Info 2025-Jul-12 00:33:03] # 10 12  2  4  0   0 pool:  1 1643474682 bases/GPU/minute: 4206675024.0 
[PB Info 2025-Jul-12 00:33:13] # 10 10  4  2  0   0 pool:  3 2435060043 bases/GPU/minute: 4749512166.0 
[PB Info 2025-Jul-12 00:33:23] # 10 11  3  3  0   0 pool:  2 3241717297 bases/GPU/minute: 4839943524.0 
[PB Info 2025-Jul-12 00:33:33] # 10 10  4  2  0   0 pool:  3 4040834355 bases/GPU/minute: 4794702348.0 
[PB Info 2025-Jul-12 00:33:43] # 10 10  4  2  0   0 pool:  3 4817334089 bases/GPU/minute: 4658998404.0 
[PB Info 2025-Jul-12 00:33:53] # 10 10  4  2  0   0 pool:  3 5631531253 bases/GPU/minute: 4885182984.0 
[PB Info 2025-Jul-12 00:33:56] Time spent reading: 9.243947 seconds
[PB Info 2025-Jul-12 00:34:03] Rate stats (based on sampling every 10 seconds):
	min rate: 0.0 bases/GPU/minute
	max rate: 4885182984.0 bases/GPU/minute
	avg rate: 3754354168.7 bases/GPU/minute
[PB Info 2025-Jul-12 00:34:03] Time spent monitoring (multiple of 10): 100.625
[PB Info 2025-Jul-12 00:34:03] bwalib run finished in 99.909 seconds
[PB Info 2025-Jul-12 00:34:03] ------------------------------------------------------------------------------
[PB Info 2025-Jul-12 00:34:03] ||        Program:                    GPU-PBBWA mem, Sorting Phase-I        ||
[PB Info 2025-Jul-12 00:34:03] ||        Version:                                           4.5.1-1        ||
[PB Info 2025-Jul-12 00:34:03] ||        Start Time:                       Sat Jul 12 00:32:23 2025        ||
[PB Info 2025-Jul-12 00:34:03] ||        End Time:                         Sat Jul 12 00:34:03 2025        ||
[PB Info 2025-Jul-12 00:34:03] ||        Total Time:                            1 minute 40 seconds        ||
[PB Info 2025-Jul-12 00:34:03] ------------------------------------------------------------------------------
[PB Info 2025-Jul-12 00:34:06] ------------------------------------------------------------------------------
[PB Info 2025-Jul-12 00:34:06] ||                 Parabricks accelerated Genomics Pipeline                 ||
[PB Info 2025-Jul-12 00:34:06] ||                              Version 4.5.1-1                             ||
[PB Info 2025-Jul-12 00:34:06] ||                             Sorting Phase-II                             ||
[PB Info 2025-Jul-12 00:34:06] ------------------------------------------------------------------------------
[PB Info 2025-Jul-12 00:34:06] progressMeter - Percentage
[PB Info 2025-Jul-12 00:34:06] 0.0
[PB Info 2025-Jul-12 00:34:11] Sorting and Marking: 5.001 seconds
[PB Info 2025-Jul-12 00:34:11] ------------------------------------------------------------------------------
[PB Info 2025-Jul-12 00:34:11] ||        Program:                                  Sorting Phase-II        ||
[PB Info 2025-Jul-12 00:34:11] ||        Version:                                           4.5.1-1        ||
[PB Info 2025-Jul-12 00:34:11] ||        Start Time:                       Sat Jul 12 00:34:06 2025        ||
[PB Info 2025-Jul-12 00:34:11] ||        End Time:                         Sat Jul 12 00:34:11 2025        ||
[PB Info 2025-Jul-12 00:34:11] ||        Total Time:                                      5 seconds        ||
[PB Info 2025-Jul-12 00:34:11] ------------------------------------------------------------------------------
[PB Info 2025-Jul-12 00:34:11] ------------------------------------------------------------------------------
[PB Info 2025-Jul-12 00:34:11] ||                 Parabricks accelerated Genomics Pipeline                 ||
[PB Info 2025-Jul-12 00:34:11] ||                              Version 4.5.1-1                             ||
[PB Info 2025-Jul-12 00:34:11] ||                         Marking Duplicates, BQSR                         ||
[PB Info 2025-Jul-12 00:34:11] ------------------------------------------------------------------------------
[PB Info 2025-Jul-12 00:34:12] Using PBBinBamFile for BAM writing
[PB Info 2025-Jul-12 00:34:12] progressMeter -	Percentage
[PB Info 2025-Jul-12 00:34:22] 30.3
[PB Info 2025-Jul-12 00:34:32] 57.8
[PB Info 2025-Jul-12 00:34:42] 84.2
[PB Info 2025-Jul-12 00:34:52] 100.0
[PB Info 2025-Jul-12 00:34:52] BQSR and writing final BAM:  40.108 seconds
[PB Info 2025-Jul-12 00:34:52] ------------------------------------------------------------------------------
[PB Info 2025-Jul-12 00:34:52] ||        Program:                          Marking Duplicates, BQSR        ||
[PB Info 2025-Jul-12 00:34:52] ||        Version:                                           4.5.1-1        ||
[PB Info 2025-Jul-12 00:34:52] ||        Start Time:                       Sat Jul 12 00:34:11 2025        ||
[PB Info 2025-Jul-12 00:34:52] ||        End Time:                         Sat Jul 12 00:34:52 2025        ||
[PB Info 2025-Jul-12 00:34:52] ||        Total Time:                                     41 seconds        ||
[PB Info 2025-Jul-12 00:34:52] ------------------------------------------------------------------------------
you-pg@at022vm02:~/workdir003 (2025-07-12 00:35:26)
$ 

```



:::note `Set --bwa-options="-K #" to produce compatible pair-ended results with previous versions of ...`について

```
[Parabricks Options Mesg]: Set --bwa-options="-K #" to produce compatible pair-ended results with previous versions of
fq2bam or BWA MEM.
```

Parabricks の `fq2bam` は BWA MEM の GPU 実装（`bwa-mem-gpu`）を内部で使用しており、従来の BWA MEM の出力と完全に一致させるには、同じ `-K` オプションが必要です。
Parabricks ではこの互換性のために `--bwa-options="-K <NUM>"` を渡せるようにしており、メッセージとしてそれが表示されます。

次のようなケースでは 明示的に指定した方がよいです：

- 従来の BWA MEM を使っていた解析パイプラインと同じ結果を再現したいとき
- 異なるツールやワークフロー間で出力の差異をなくしたいとき
- ソート順の違いが後続処理（特に比較やバイナリ検証）に影響する場合

```
pbrun fq2bam \
  --ref /workdir/ref.fa \
  --in-fq sample_1.fq.gz sample_2.fq.gz \
  --out-bam out.bam \
  --num-gpus 1 \
  --bwa-options="-K 10000000"
```

:::

## ローカルストレージ(SSD)へのデータのステージング

データをローカルストレージに置くと、処理速度が向上します。

これを行うにはデータをローカルストレージにコピーするジョブ、実際の解析を行うジョブ、ローカルストレージ上のデータを削除するジョブを作り、
順に実行するとよいです。

その際に、すべての計算ノードから見えている共有ストレージではなく、特定の計算ノードからしか見えないローカルストレージを使っているため、
ジョブがその特定の計算ストレージ上で動作するように指定する必要があります。

これは以下の手順で実現できます。

### ステージング用ジョブスクリプトの作成

以下のジョブスクリプト(`stage_fq2bam.sh`)は、Parabricksのチュートリアルで配られているデータが入っている`parabricks_sample`ディレクトリを、
計算ノードのローカルストレージにコピーします。


```
#!/bin/bash
#SBATCH --job-name=stage_fq2bam
#SBATCH --output=stage_fq2bam_%j.out
#SBATCH --error=stage_fq2bam_%j.err
#SBATCH --partition=l40s
#SBATCH --account=l40s
#SBATCH --time=00:20:00


LOCAL_BASE=/data1/$USER/workdir
mkdir -p "$LOCAL_BASE"
cp -r "$SLURM_SUBMIT_DIR/parabricks_sample" "$LOCAL_BASE/"

```

- 環境変数`$SLURM_SUBMIT_DIR`は`sbatch`すると自動的に値が代入されます。特に指定しなければカレントディレクトリのパスが代入されます。
- 遺伝研スパコンの各計算ノードには`/data1`という名前でローカルストレージ(NVMe SSD)がマウントされています。

### 解析実行用ジョブスクリプトの作成

以下の内容で`run_fq2bam.sh`ジョブスクリプトを作成します。
`INPUT_DIR`, `OUTPUT_DIR`にローカルストレージを指定しているところがこれまでとの違いとなります。

```
#!/bin/bash
#SBATCH --job-name=run_fq2bam
#SBATCH --output=run_fq2bam_%j.out
#SBATCH --error=run_fq2bam_%j.err
#SBATCH --partition=l40s
#SBATCH --account=l40s
#SBATCH --gres=gpu:1
#SBATCH --cpus-per-task=16
#SBATCH --mem=94G
#SBATCH --time=01:00:00

LOCAL_BASE=/data1/$USER/workdir
INPUT_DIR=$LOCAL_BASE/parabricks_sample
OUTPUT_DIR=$LOCAL_BASE/results

mkdir -p "$OUTPUT_DIR"
cd "$SLURM_SUBMIT_DIR"

apptainer exec \
  --nv \
  --bind "$INPUT_DIR":/workdir/parabricks_sample \
  --bind "$OUTPUT_DIR":/outputdir \
  clara-parabricks.sif \
  pbrun fq2bam \
    --ref /workdir/parabricks_sample/Ref/Homo_sapiens_assembly38.fasta \
    --in-fq /workdir/parabricks_sample/Data/sample_1.fq.gz /workdir/parabricks_sample/Data/sample_2.fq.gz \
    --out-bam /outputdir/fq2bam_output.bam \
    --num-gpus 1

# Optionally copy result to submit directory
cp "$OUTPUT_DIR/fq2bam_output.bam" "$SLURM_SUBMIT_DIR/"

```


### ローカルストレージのクリーンアップ用ジョブスクリプトの作成

以下のジョブスクリプト(`clean_fq2bam.sh`)を作成します。
これは、計算ノードのローカルストレージに作成した`workdir`を削除します。


```
#!/bin/bash
#SBATCH --job-name=clean_fq2bam
#SBATCH --output=clean_fq2bam_%j.out
#SBATCH --error=clean_fq2bam_%j.err
#SBATCH --partition=l40s
#SBATCH --account=l40s
#SBATCH --time=00:05:00

rm -rf /data1/$USER/workdir
# rm -rf /data1/$USER
```


### ステージング、実行、クリーンアップ

以下のシェルスクリプト(`run_fq2bam_with_local_staging.sh`)を作って実行します。

このシェルスクリプトは3つのジョブをslurmに投入します。
その際、これらのジョブに依存関係(`--dependency`)が指定されているため、
ステージングのジョブ(`jid1`)が終了したら、解析のジョブの実行が始まり、
解析のジョブ(`jid2`)が終了したらクリーンアップのジョブの実行が開始されます。

計算ノードのローカルストレージデータをステージングするのだから、これら3つのジョブが同じ計算ノード上で実行されなければなりません。
そのために`sbatch`コマンドの`--nodelist`オプションにより特定の計算ノード名を指定しています。
（この計算ノードが空いていないとジョブは流れないことに注意が必要です。）

```
NODE=l40s-02

jid1=$(sbatch --nodelist=$NODE stage_fq2bam.sh | awk '{print $4}')
jid2=$(sbatch --nodelist=$NODE --dependency=afterok:$jid1 run_fq2bam.sh | awk '{print $4}')
sbatch --nodelist=$NODE --dependency=afterok:$jid2 clean_fq2bam.sh
```

これを以下のように実行します。

```
bash run_fq2bam_with_local_staging.sh
```


実行状態の確認の例

以下の実行例は、ジョブは3つ投入されており、ステージング中なので解析とクリーンアップのジョブは依存関係により待たされていることを示しています。

```
you-pg@at022vm02:~/workdir003 (2025-07-12 08:42:00)
$ squeue
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
            754966      l40s run_fq2b oogasawa PD       0:00      1 (Dependency)
            754967      l40s clean_fq oogasawa PD       0:00      1 (Dependency)
            754965      l40s stage_fq oogasawa  R       0:04      1 l40s-02
```


### GPUノードのローカルストレージの内容の確認


ジョブを投入しているノードが`at022vm02`で、実行しているノードがl40s-02なのだから、GPUノードのローカルストレージの状態を確認するには`sbatch`か`srun`を使う必要があります。


#### sbatchによる方法

確認ジョブスクリプト（例：`check_cleanup.sh`）を用意

```bash
#!/bin/bash
#SBATCH --job-name=check_cleanup
#SBATCH --output=check_cleanup_%j.out
#SBATCH --error=check_cleanup_%j.err
#SBATCH --partition=l40s
#SBATCH --account=l40s
#SBATCH --time=00:05:00

tree /data1/$USER/workdir
```

このジョブスクリプトは `/data1/<ユーザー名>/workdir` が存在するかどうかを確認します。

投入コマンド

```bash
sbatch --nodlist=l40s-02 check_cleanup.sh
```


ジョブの標準出力（`check_cleanup_<jobid>.out`）を確認：

```bash
cat check_cleanup_*.out
```



#### srunによる方法

`srun`コマンドを使うとインタラクティブに確認することもできます：

```bash
srun --partition=l40s --account=l40s --nodelist=l40s-02 --pty bash
```

その後、ログイン先で：

```bash
tree /data1/$USER/workdir
```

必要に応じてローカルストレージ上のデータを削除

```bash
rm -Rf /data1/$USER/workdir
```

シェルから`exit`を実行すると`srun`で開始されたインタラクティブジョブが終了します。
