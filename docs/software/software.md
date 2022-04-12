---
id: software
title: ソフトウェア
---

各ソフトウェアの使い方についてはソフトウェア名のリンク先を参照してください。

## ジョブスケジューラ

<table>
<tr>
<th width="300">名称</th>
<th width="300">一般解析区画</th>
<th width="300">個人ゲノム解析区画</th>
</tr>
<tr>
<td width="300">

[Grid Engine](/software/grid_engine)
</td>
<td width="300">インストール済み</td>
<td width="300">要申請</td>
</tr>
<tr>
<td width="300">

Slurm
</td>
<td width="300">☓</td>
<td width="300">要申請</td>
</tr>
</table>

ジョブスケジューラを利用する際に、リソース量の指定が不適当なためにジョブがいつまで経っても実行されないというケースが見受けられます。そのため Univa Grid Engine へのジョブ投入時に予め警告を表示する`qsub_beta`というツールを用意しました。[利用方法はこちらをご覧ください。](qsub_beta)


## コンテナ・解析パイプライン

<table>
<tr>
<th width="300">名称</th>
<th width="300">一般解析区画</th>
<th width="300">個人ゲノム解析区画</th>
</tr>
<tr>
<td width="300">

[Singularity](Singularity)
</td>
<td width="300">インストール済み</td>
<td width="300">インストール済み</td>
</tr>
<tr>
<td width="300"><a href="https://sc.ddbj.nig.ac.jp/advanced_guides/Rhelixa_RNAseq">Rhelixa RNAseq パイプライン</a></td>
<td width="300">インストール済み</td>
<td width="300">要申請</td>
</tr>
<tr>
<td width="300"><a href="https://sc.ddbj.nig.ac.jp/advanced_guides/advanced_guide#dfast">DFAST</a></td>
<td width="300">利用可能</td>
<td width="300">利用可能</td>
</tr>
</table>


## バイオインフォマティックスツール


<table border="0">
<tr>
<td width="300">

![](biocontainers_top.png)

</td>
<td>
<h4>Biocontainers Singularity Images</h4>

BioContainers project が作成した Singularity コンテナイメージ(2 千種類を超える解析ソフトウェア、バージョンの違いを含め 9 万個を超える Singularity イメージファイル）を、遺伝研スパコンの`/usr/local/biotools/`ディレクトリ以下に配置してあります。

各ソフトウェアの内容、使い方については [BioContainers の公式サイト](https://biocontainers.pro)の[Registory](https://biocontainers.pro/registry )のページをご参照ください。

</td>
</tr>
</table>






## データ転送・データ共有

<table>
<tr>
<th width="300">名称</th>
<th width="300">一般解析区画</th>
<th width="300">個人ゲノム解析区画</th>
</tr>
<tr>
<td width="300">

[Aspera](./aspera/aspera.md)

</td>
<td width="300">利用可能</td>
<td width="300">☓</td>
</tr>
<tr>
<td width="300">

[HCPtools](./HCPtools/hcptools.md)

</td>
<td width="300">☓</td>
<td width="300">要申請</td>
</tr>
</table>



## 開発環境・ライブラリ

開発環境の多くはシステムにプリインストールされていますが、
解析の再現などの目的で特定のバージョンが必要な場合、
解析環境の多くはユーザー権限でインストール可能なのでユーザー自身でインストールするか、
Singularity コンテナを利用してください。


<table>
<tr>
<th width="300">名称</th>
<th width="300">一般解析区画</th>
<th width="300">個人ゲノム解析区画</th>
</tr>
<tr>
<td width="300">

[Python](python)

</td>
<td width="300">利用可能</td>
<td width="300">利用可能</td>
</tr>
<tr>
<td width="300">

[R](R)

</td>
<td width="300">利用可能</td>
<td width="300">利用可能</td>
</tr>
<tr>
<td width="300">

[Jupyter Notebook](jupyter_notebook)

</td>
<td width="300">利用可能</td>
<td width="300">利用可能</td>
</tr>
<tr>
<td width="300">

[Jupyter Lab](jupyter_lab)

</td>
<td width="300">利用可能</td>
<td width="300">利用可能</td>
</tr>
<tr>
<td width="300">

R Studio Server

</td>
<td width="300">利用可能</td>
<td width="300">利用可能</td>
</tr>

<tr>
<td width="300">

[Java](java)

</td>

<td width="300">利用可能</td>
<td width="300">利用可能</td>
</tr>
<tr>
<td width="300">

[Node.JS, TypeScript](typescript)
</td>
<td width="300">利用可能</td>
<td width="300">利用可能</td>
</tr>
<tr>
<td width="300">

[Rust](rust)

</td>
<td width="300">利用可能</td>
<td width="300">利用可能</td>
</tr>
<tr>
<td width="300">

C/C++ (GCC)

</td>
<td width="300">利用可能</td>
<td width="300">利用可能</td>
</tr>
<tr>
<td width="300">

C/C++ (Intel Compiler)

</td>
<td width="300">利用可能</td>
<td width="300">☓</td>

</tr>
<tr>
<td width="300">

C/C++ (PGI Compiler)

</td>
<td width="300">利用可能</td>
<td width="300">☓</td>
</tr>
<tr>
<td width="300">

[CUDA](/software/cuda)
</td>
<td width="300">利用可能</td>
<td width="300">利用可能</td>
</tr>
<tr>
<td width="300">OpenMP</td>
<td width="300">利用可能</td>
<td width="300">利用可能</td>
</tr>
<tr>
<td width="300">MPICH</td>
<td width="300">利用可能</td>
<td width="300">利用可能</td>
</tr>

</table>
