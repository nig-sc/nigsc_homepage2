---
id: batch_job2
title: バッチジョブの実行例
---
:::danger これは古いドキュメントです

本ドキュメントは旧遺伝研スパコン(2019)のドキュメントであり、参考のため残しているものです。

現行遺伝研スパコン(2025)ではこのとおりには動作しませんのでご注意ください。
:::


### 例 1: バイナリファイルの実行 {#ex1_run_binary_file}

以下の例は遺伝研スパコンでバッチジョブを実行する際の典型的なオプションの書き方を示しています。（オプションの全リストについては man qsub, man qlogin 等を参照してください。）

```
qsub -cwd -V \
	 -l short \
     -l d_rt=00:20:00 -l s_rt=00:20:00 \
	 -l s_vmem=1G -l mem_req=1G \
	 -N extract_flatfile \
     -b y \
     gzip -d ddbjvrt9.seq.gz
```

1 行目の `-cwd` と`-V` はジョブの実行環境に関係するオプションです。


<table>
<tr>
  <th width="300">Option</th><th width="300">Description</th>
 </tr>
 <tr>
    <td>-v environment</td><td>qsub を実行した環境の環境変数を一つジョブに引き継ぐ</td>
</tr>
<tr>
	<td>-v environment=value</td><td>ジョブに環境変数を 1 つずつ設定する。</td>
</tr>
<tr>
	<td>-V</td><td>qsub を実行した環境の環境変数を全てジョブに引き継ぐ。</td>
</tr>
<tr>
    <td>-cwd</td><td>ジョブは現在のディレクトリ上で実行される。（指定しないと$HOME ディレクトリ上で実行される。）</td>
	</tr>
</table>

2 行目はキューの種類を表しています。遺伝研スパコンではワーカーノードの計算機の種類ごとに待ち行列(Queue)を作成しています。キューを何も指定しないと epyc キューにジョブが投入されます。 (Type1b => Type1a の順で空いているワーカーノードを探します。)


<table>
<tr>
	<th width="300">キューの名称</th><th width="300">計算ノードの種類</th><th width="300">ジョブ実行時間の最大値</th><th width="300">利用可能メモリ量の初期値</th>
</tr>
<tr>
	<td>intel</td><td>Thin ノード Type2a</td><td>124 日</td><td>8GB</td>
</tr>
<tr>
	<td>epyc</td><td>Thin ノード Type1a, Type1b</td><td>124 日</td><td>Type1b の場合 4GB, Type1a の場合 8GB</td>
</tr>
<tr>
    <td>gpu</td><td>Thin ノード Type2b (GPU ノード)</td><td>124 日</td><td>   </td>
</tr>
<tr>
    <td>short</td><td>Thin ノード Type2b (GPU ノード)</td><td>1 時間</td><td>   </td>
</tr>
<tr>
    <td>medium</td><td>medium ノード</td><td>124 日</td><td>   </td>
</tr>
</table>


3 行目はジョブの実行上限時間です。

例えば 8 日以内にジョブが終了する見込みであるから最大 8 日間のジョブ実行枠を指定する、といった場合には `-l d_rt` オプション、 `-l s_rt` オプションに 192 時間(8 日×24 時間)を指定します。`-l d_rt` オプションおよび、`-l s_rt` オプションには同じ値を指定する必要があります。

```
qsub -l d_rt=192:00:00 -l s_rt=192:00:00 test.sh
```

ジョブは short キュー（最大 1 時間）を除き、最大 4 ヶ月間実行を継続することが可能となっています。しかしジョブスケジューリングを円滑に行うために、 `-l d_rt` オプション、 `-l s_rt` オプションを指定しないと Grid Engine はそのジョブは 3 日以内に終了するものと判断するよう遺伝研スパコンでは設定されています。したがって計算時間が 3 日を超える見込みである場合は必ず `-l d_rt` オプション、 `-l s_rt` オプションを指定してください。(正しいジョブスケジューリングのために、いつも`-l d_rt` オプション、 `-l s_rt` オプションを指定することを推奨します。実行上限時間が来るとプログラムの実行は強制終了されるので、見込みよりも少し長めに指定してください。)


4 行目は使用するメモリ量の指定である。`-l s_vmem`,  `-l mem_req`に同じ値を指定すること。単位は G,M,K 等が使えます。

5 行目はジョブ名の指定です。

6 行目は（シェルスクリプトなどではなく）バイナリの実行ファイルを実行しようとしていることを示しています。

7 行目は実際にワーカーノードで実行されるプログラムの呼び出しです。



### 例 2: シェルスクリプトなどの実行 {#ex2_run_shell_scripts}

```
qsub -cwd -V \
     -l epyc \
	 -l d_rt=192:00:00 -l s_rt=192:00:00 \
	 -l s_vmem=20G -l mem_req=20G \
	 -N an_example \
	 -S /bin/bash \
	 example.sh arg1 arg2
```


例 1 との違いは 6 行目と 7 行目である。bash や perl 等スクリプトを呼ぶときにはこのように書きます。


### 例 3: Job Script {#ex3_job_script}


上記の例 1,例 2 でたくさんのオプションを指定したが、オプションをスクリプトに書いておき、そのスクリプトを呼ぶことで呼び出しを簡略化することが出来ます。

以下のような job_script.sh を用意し、` qsub -S /bin/bash job_script.sh ` でサブミットすればよいです。
							   
```
#!/bin/bash

#$ -cwd 
#$ -V 
#$ -l epyc
#$ -l d_rt=192:00:00
#$ -l s_rt=192:00:00
#$ -l s_vmem=20G 
#$ -l mem_req=20G
#$ -N an_example
#$ -S /bin/bash


example.sh arg1 arg2
```
