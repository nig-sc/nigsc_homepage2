---
id: qsub_beta
title: qsub_beta の使い方
---

## ツールの概要

`qsub_beta` は [Grid Engine](/software/grid_engine) でバッチジョブを実行する際に、ジョブの要求リソースに誤りがないか、事前にチェックし Grid Engine にサブミットするツールです。

要求リソースをどの計算ノードでも満たせない値を指定しサブミットした場合、そのジョブは qw 状態 (待ち状態) となりますが、実行可能な計算ノードがないため要求リソースを修正しない限り実行されません。

`qsub_beta` を介してジョブを Grid Engine にサブミットすることで、バッチジョブ実行時点で要求リソース指定の誤りに気が付くことができ、無用な待ち時間を減らすことができます。

## 使い方

### qsub_betaを介したバッチジョブの実行

サブミット方法は以下の通りで、Grid Engine オリジナルの qsub と同様です。

```
$ qsub_beta –l intel,s_vmem=8G,mem_req=8G job.sh
Your job XXXXXXX ("job.sh") has been submitted
```

### エラー時の出力

要求リソースに誤りがあった場合は、エラー原因と要求リソースを修正する際に参考となるURLを表示します。
この時、終了ステータスは `1` でエラー終了します。

以下の例では、オプション `-pe def_slot 40` で同一計算ノード上に 40 個の CPU コアを確保するよう指定し、オプション `-l intel.q` で intel.q の計算ノードでジョブを実行するよう指定しています。
しかし、 intel.q の計算ノードのCPUコア数は32コアであるため、ジョブは実行されず、エラーとなります。

```
$ qsub_beta -pe def_slot 40 -l intel job_script.sh
Unable to run job: resource "def_slot" is out of range.
Refer to : https://sc.ddbj.nig.ac.jp/ja/guide/usage-for-general-analysis-environment/uge
Exiting.
```

### チェック対象のリソース

要求リソースのチェック対象は以下の通りです。なお、現在は mpi ジョブのチェックには対応していません。

<table>
	<tr>
		<th width="300">チェック対象</th>
		<th width="300">説明</th>
	</tr>
	<tr>
		<td>スロット数</td>
		<td>指定されたスロット数が各ノードで許容された範囲内か判定する。</td>
	</tr>
	<tr>
		<td>メモリサイズ</td>
		<td>指定された要求メモリサイズが許容された範囲内か判定する。</td>
	</tr>
	<tr>
		<td>実行可能時間</td>
		<td>指定された実行可能時間が許容された範囲内か判定する。</td>
	</tr>
	<tr>
		<td>GPU数</td>
		<td>指定されたGPU数が許容された範囲内か判定する。</td>
	</tr>
	<tr>
		<td>メモリサイズ不整合</td>
		<td>要求メモリサイズ（mem_req）とメモリサイズ上限値（s_vmem）が一致するか確認する。</td>
	</tr>
	<tr>
		<td>キュー指定</td>
		<td>qsubのhardオプションに複数のキューが指定されていないか、また、hardおよびsoftの何れにもキューが指定されていないか判定する。</td>
	</tr>
</table>
