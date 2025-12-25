---
id: batch_jobs
title: バッチジョブ
---


## バッチジョブの使い方 {#usage_batch_job}


CPU コアを 1 コアだけ使用し長時間実行するプログラムを少数実行する場合は、バッチジョブとして実行してください。Slurmではバッチジョブの投入にはsbatchコマンドを利用します。

- [sbatchコマンドのオンラインマニュアル](https://slurm.schedmd.com/sbatch.html)



## 典型的な実行例 {#job_sub_expln}
 
`sbatch`コマンドは以下のように実行します。
 
 
```
sbatch job_script.sh
```

ここで`job_script.sh`は、Slurmの実行条件を指定するスクリプトで、点検系的には以下のような内容になります。
 
 
```
#!/bin/bash
#SBATCH -p epyc
#SBATCH -t 0-00:10:00
#SBATCH --mem-per-cpu 4g
#SBATCH -J an_example
 
your-program
```

- Slurmの場合、デフォルト動作として、sbatchコマンドを実行した際のカレントワーキングディレクトリを投入したジョブのカレントワーキングディレクトリとしてジョブを実行します。その他のディレクトリでジョブを実行したい場合は、--chdirオプションを利用して指定してください。
- Slurmの場合、sbatch実行時のシェルの環境変数をジョブの起動シェルにデフォルト動作で全て引き継ぎます。特定の環境変数のみを引き継ぎたい（引き継ぎたくない）場合は、--exportオプションを利用してください。詳細についてはオンラインマニュアルを参照してください。


### -p パーティション名

バッチジョブを投入する待ち行列(パーティション Partition)の種類を指定します。

パーティションの種類については以下を参照してください。

- [一般解析区画のパーティション一覧](/guides/using_general_analysis_division/ga_slurm_partition/)
- 個人ゲノム区画のパーティション一覧
 
 
### -t バッチジョブの上限時間

バッチジョブの実行上限時間。
 
バッチジョブの実行開始からこの実行上限時間をすぎるとバッチジョブは強制終了させられます。

遺伝研スパコンではこのパラメータを何も指定しないと3日間となります。（shortパーティションは1時間）
 
バッチジョブの実行上限時間の書き方の詳細は[こちら](/guides/software/JobScheduler/Slurm/slurm_time#slurm-batch-time-detail)を参照してください。
 
 
### --mem-per-cpu 使用するメモリ量

ジョブに割り当てられたCPUコア（タスク）1個あたりに割り当てられるメモリ量を指定します。単位は G,M,K が使えます。省略時は単位はMとして解釈されます。
 
### -J ジョブ名

ジョブ名の指定です。ジョブの一覧表示や依存関係付き実行の際に「どの処理のどの段階のジョブか」を人間が即座に識別できるようにするための名前を付ける指定です。
 
 
例えば、
- align_NA12878_step1
- qc_sampleA
- fq2bam_chr1

のような名前を付けます。
 
 
 
### 実行コマンド（計算ノードで実行する処理）

job_script.sh の末尾には、計算ノード上で実行したいコマンドを 1 行以上で記述します。
ここに書いたコマンドは、ログインノードではなく Slurm により割り当てられた計算ノード上で実行されます。

指定できるのは通常の Linux コマンドとして実行できるもので、例えば以下が利用できます：

- シェルスクリプト（bash）
- Python プログラム
- コンパイル済みの C/C++ 実行ファイル
- その他、任意のコマンド（R、Java、Singularity、etc）

以下では、「Slurm ジョブとして何が起きているか」が分かる最小例として、bash / Python / C の例を示します。



bash スクリプトを実行する例：

[job_script.sh（抜粋）]

```
#!/bin/bash
#SBATCH -p epyc
#SBATCH -t 0-00:10:00
#SBATCH --mem-per-cpu 1g
#SBATCH -J bash_example
./run_analysis.sh
```

[run_analysis.sh]
```
#!/bin/bash

ls /usr/local/biotools > $1
```

この例では、run_analysis.sh という通常のシェルスクリプトを計算ノード上で実行しています。


Python プログラムを実行する例：

[job_script.sh（抜粋）]

```
#!/bin/bash
#SBATCH -p epyc
#SBATCH -t 0-00:10:00
#SBATCH --mem-per-cpu 2g
#SBATCH -J python_example
python analysis.py
```

[analysis.py]
```
import time
import socket
print(f"Running on host: {socket.gethostname()}")
for i in range(5):
    print(f"Step {i}")
    time.sleep(5)
print("Done")
```

この例では、analysis.py が計算ノード上の Python インタプリタで実行されます。
Python の標準出力は Slurm によりジョブログとして保存され、対話的実行は行われません。

C プログラム（コンパイル済み実行ファイル）を実行する例:

事前に行うコンパイル（ログインノード）

```
gcc -O2 -o hello hello.c
```

[hello.c]
```
#include <stdio.h>
#include <unistd.h>
int main(void) {
    char hostname[256];
    gethostname(hostname, sizeof(hostname));
    printf("Hello from %s\n", hostname);
    sleep(10);
    printf("Finished\n");
    return 0;
}
```

[job_script.sh（抜粋）]
```
#!/bin/bash
#SBATCH -p epyc
#SBATCH -t 0-00:10:00
#SBATCH --mem-per-cpu 1g
#SBATCH -J c_example
./hello
```

この例では、事前にコンパイルした hello という実行ファイルを計算ノード上で直接起動しています。
実行ファイルは、ジョブ投入時のカレントディレクトリ、または PATH の通った場所に置く必要があります。
