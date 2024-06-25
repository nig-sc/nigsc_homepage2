---
id: software
title: ソフトウェア
---

各ソフトウェアの使い方についてはソフトウェア名のリンク先を参照してください。

## ジョブスケジューラ

ジョブスケジューラは、多数のユーザーが利用している環境で各ユーザに自動的に計算リソース（CPU コアやメモリ）を割り当てるものです。 クラスタ計算機全体を一つの計算機と見たときの Operating System に相当する働きをします。

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

[Slurm](/software/Slurm/Slurm.md)

</td>
<td width="300">☓</td>
<td width="300">要申請</td>
</tr>
</table>


## パッケージマネージャ

以下のパッケージマネージャはユーザ権限だけで利用可能です。開発・解析環境の構築が容易になります。

<table>


<tr>
<th width="300">名称</th>
<th width="300">一般解析区画</th>
<th width="300">個人ゲノム解析区画</th>
</tr>


<tr>
<td width="300">

[Environmental Modules](/software/environmental_modules)
</td>
<td width="300">X</td>
<td width="300">X (CentOS 7 環境のみ）</td>
</tr>

<tr>
<td width="300">

[Spack](/software/spack/install_spack)
</td>
<td width="300">利用可能</td>
<td width="300">利用可能</td>
</tr>



</table>



## コンテナ

<table>

<tr>
<th width="300">名称</th>
<th width="300">一般解析区画</th>
<th width="300">個人ゲノム解析区画</th>
</tr>


<tr>
<td width="300">

[Apptainer (Singularity)](/software/Apptainer)
</td>
<td width="300">インストール済み</td>
<td width="300">インストール済み</td>
</tr>


<tr>
<td width="300">

[BioContainers Apptainer (Singularity) Images](/software/BioContainers)
</td>
<td width="300">インストール済み</td>
<td width="300">インストール済み</td>
</tr>


</table>


## 解析パイプライン

<table>

<tr>
<th width="300">名称</th>
<th width="300">一般解析区画</th>
<th width="300">個人ゲノム解析区画</th>
</tr>


<tr>
<td width="300">

[DFAST](/advanced_guides/advanced_guide_2020-2022#dfast)

</td>
<td width="300">利用可能</td>
<td width="300">利用可能</td>
</tr>


<tr>
<td width="300">

[NBDC-DDBJ インピュテーションサーバ (beta)](/advanced_guides/imputation_server)
</td>
<td width="300">利用不可(※デモ利用機能準備中)</td>
<td width="300">要申請</td>
</tr>


<tr>
<td width="300">

[NVIDIA Parabricks](/advanced_guides/parabricks/)
</td>
<td width="300">☓</td>
<td width="300">要申請</td>
</tr>


<tr>
<td width="300">

[Rhelixa RNAseq パイプライン](/advanced_guides/Rhelixa_RNAseq)
</td>
<td width="300">インストール済み</td>
<td width="300">要申請</td>
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

[Archaea tools(旧 HCPtools)](/software/Archaea_tools/Archaea_tools.md)

</td>
<td width="300">☓</td>
<td width="300">利用可能</td>
</tr>

<tr>
<td width="300">

[Aspera](./aspera/aspera.md)

</td>
<td width="300">利用可能</td>
<td width="300">☓</td>
</tr>
</table>



## 開発環境・ライブラリ

開発環境の多くはシステムにプリインストールされていますが、
解析の再現などの目的で特定のバージョンが必要な場合、
(1)ユーザー自身で tarball からインストールする(2)ユーザ権限で利用可能なパッケージマネージャを利用する(3)Singularity コンテナを利用する、といった方法があります。


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

[R Studio Server](R/r_studio_server)

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

[C/C++ (GCC)](/software/gcc)

</td>
<td width="300">インストール済み</td>
<td width="300">インストール済み</td>
</tr>
<tr>
<td width="300">

[C/C++ (Intel Compiler)](/software/intel_compiler)

</td>
<td width="300">インストール済み</td>
<td width="300">☓</td>

</tr>
<tr>
<td width="300">

[C/C++ (PGI Compiler)](/software/pgi_compiler)

</td>
<td width="300">インストール済み</td>
<td width="300">☓</td>
</tr>
<tr>
<td width="300">

[CUDA](/software/cuda)
</td>
<td width="300">インストール済み</td>
<td width="300">インストール済み</td>
</tr>
<tr>
<td width="300">

[Go](/software/go)
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
