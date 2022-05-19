---
id: gfree
title: "GPUノードの稼働状況確認方法"
---

## gfreeコマンドの説明

遺伝研スパコンではGPUノードの利用状況を表示するために`gfree`というコマンドを提供しています。


![figure](gfree.png)

出力内容の説明は以下の通りです。

<table>
<tr>
	<th width="300">項目</th><th width="300">説明</th>
</tr>
<tr>
	<td>qname</td><td>キューの名前</td>
</tr>
<tr>
    <td>node</td><td>ノード名</td>
</tr>
<tr>
	<td>used</td><td>現在使用されているGPUスロット数</td>
</tr>
<tr>
	<td>all</td><td>ノードの搭載するGPUスロット数</td>
</tr>
<tr>
	<td>executable jobnums</td><td>要求GPUスロット数(1GPU、4GPU)ごとの実行可能なジョブ数</td>
</tr>
</table>

GPUノードの場合GPUスロット数 = GPUの本数です。各GPUノードにGPUが4本ずつ搭載されています。
