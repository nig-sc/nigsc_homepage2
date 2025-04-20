---
id: software
title: Software
---

各ソフトウェアの使い方についてはソフトウェア名のリンク先を参照してください。

## ジョブスケジューラ {#job-scheduler}

ジョブスケジューラは、クラスタ計算機を多数のユーザーが利用している環境で各ユーザに自動的に計算リソース（CPU コアやメモリ）を割り当てるものです。 

<table>

<tr>
<th width="300">名称</th>
<th width="300">一般解析区画</th>
<th width="300">個人ゲノム解析区画</th>
</tr>


<tr>
<td width="300">

[Slurm](/guides/software/JobScheduler/Slurm)

</td>
<td width="300">インストール済み</td>
<td width="300">インストール済み</td>
</tr>
</table>


## パッケージマネージャ {#package-managers}

以下のパッケージマネージャはユーザ権限だけで利用可能です。開発・解析環境の構築が容易になります。

<table>


<tr>
<th width="300">名称</th>
<th width="300">一般解析区画</th>
<th width="300">個人ゲノム解析区画</th>
</tr>

<tr>
<td width="300">

[Spack](/guides/software/Container/spack/install_spack)
</td>
<td width="300">利用可能</td>
<td width="300">利用可能</td>
</tr>



</table>



## コンテナ {#container}

<table>

<tr>
<th width="300">名称</th>
<th width="300">一般解析区画</th>
<th width="300">個人ゲノム解析区画</th>
</tr>

<tr>
<td width="300">

[Apptainer (旧Singularity)](/guides/software/Container/Apptainer)
</td>
<td width="300">インストール済み</td>
<td width="300">インストール済み</td>
</tr>


<tr>
<td width="300">

Singularity CE (旧Singularity)
</td>
<td width="300">インストール済み</td>
<td width="300">インストール済み</td>
</tr>


<tr>
<td width="300">

[BioContainers Apptainer (旧Singularity) Images](/guides/software/Container/BioContainers)
</td>
<td width="300">インストール済み</td>
<td width="300">インストール済み</td>
</tr>


</table>


## 解析パイプライン {#analysis-pipeline}

<table>

<tr>
<th width="300">名称</th>
<th width="300">一般解析区画</th>
<th width="300">個人ゲノム解析区画</th>
</tr>

<tr>
<td width="300">

[DFAST](/advanced_guides/topics/advanced_guide_2020-2022/#dfast)

</td>
<td width="300">利用可能</td>
<td width="300">利用可能</td>
</tr>


<tr>
<td width="300">

[TogoImputation (beta)](/advanced_guides/TogoImputation/imputation_server)

</td>
<td width="300">利用不可(※デモ利用機能準備中)</td>
<td width="300">要申請</td>
</tr>

<tr>
<td width="300">

[Rhelixa RNAseq パイプライン](/advanced_guides/Rhelixa_RNAseq/Rhelixa_RNAseq)
</td>
<td width="300">インストール済み</td>
<td width="300">☓</td>

</tr>


</table>

## 商用解析パイプライン {#commercial-analysis-pipeline}

<table>

<tr>
<th width="300">名称</th>
<th width="300">一般解析区画</th>
<th width="300">個人ゲノム解析区画</th>
</tr>

<tr>
<td width="300">

[NVIDIA Parabricks](/advanced_guides/parabricks)
</td>
<td width="300">☓</td>
<td width="300">インストール済み</td>
</tr>


<tr>
<td width="300">

sentieon

</td>
<td width="300">☓</td>
<td width="300">インストール済み</td>

</tr>


<tr>
<td width="300">

NVIDIA AI Enterprise

</td>
<td width="300">☓</td>
<td width="300">インストール済み</td>

</tr>


</table>



## データ転送・データ共有 {#data-transfer}

AsperaおよびArchaeaはscp, sftp, ftpなどに比べて長距離の大規模データ転送に適したソフトウェアです。
- AsperaはNCBI/EBI/DDBJなどからデータをスパコンやユーザのパソコンにダウンロードする際に利用できます。(合計10Gbps上限)
- Archaea toolsはスパコンのユーザホーム領域とユーザのパソコンとの間のデータ転送に利用できます。(帯域上限なし)

詳細は[データ転送(一般解析区画)](/guides/using_general_analysis_division/ga_data_transfer/)
および[データ転送(個人ゲノム解析区画)](/guides/using_personal_genome_division/pg_data_transfer/)
をご参照ください。

<table>

<tr>
<th width="300">名称</th>
<th width="300">一般解析区画</th>
<th width="300">個人ゲノム解析区画</th>

</tr>


<tr>
<td width="300">

[Archaea tools](/guides/software/CopyTool/Archaea_tools)
</td>
<td width="300">インストール済み</td>
<td width="300">インストール済み</td>

</tr>


<tr>
<td width="300">

[Aspera](/guides/software/CopyTool/aspera_client)

</td>
<td width="300">利用可能</td>
<td width="300">利用可能</td>

</tr>


<tr>
<td width="300">

scp, sftp, ftp（クライアント）

</td>
<td width="300">インストール済み</td>
<td width="300">インストール済み</td>
</tr>



</table>




## 開発環境・ライブラリ {#dev-environment-and-libraries}

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

[Python](/guides/software/DevelopmentEnvironment/python)

</td>
<td width="300">インストール済み</td>
<td width="300">インストール済み</td>

</tr>
<tr>
<td width="300">

[R](/guides/software/DevelopmentEnvironment/R)

</td>
<td width="300">インストール済み</td>
<td width="300">インストール済み</td>
</tr>
<tr>
<td width="300">

[Jupyter Notebook](/guides/software/DevelopmentEnvironment/jupyter_notebook)

</td>
<td width="300">利用可能</td>
<td width="300">利用可能</td>

</tr>
<tr>
<td width="300">

[Jupyter Lab](/guides/software/DevelopmentEnvironment/jupyter_lab)

</td>
<td width="300">利用可能</td>
<td width="300">利用可能</td>

</tr>
<tr>
<td width="300">

[R Studio Server](/guides/software/DevelopmentEnvironment/R/r_studio_server)

</td>
<td width="300">利用可能</td>
<td width="300">利用可能</td>

</tr>

<tr>
<td width="300">

[Java](/guides/software/DevelopmentEnvironment/java)

</td>

<td width="300">利用可能</td>
<td width="300">利用可能</td>

</tr>
<tr>
<td width="300">

[Node.JS, TypeScript](/guides/software/DevelopmentEnvironment/TypeScript)
</td>
<td width="300">利用可能</td>
<td width="300">利用可能</td>

</tr>
<tr>
<td width="300">

[Rust](/guides/software/DevelopmentEnvironment/Rust)

</td>
<td width="300">利用可能</td>
<td width="300">利用可能</td>

</tr>
<tr>
<td width="300">

[C/C++ (GCC)](/guides/software/DevelopmentEnvironment/gcc)

</td>
<td width="300">インストール済み</td>
<td width="300">インストール済み</td>

</tr>

<tr>
<td width="300">

AMD Optimizing C/C++ and Fortran Compilers (AOCC)

</td>
<td width="300">インストール済み</td>
<td width="300">インストール済み</td>

</tr>


<tr>
<td width="300">

[C/C++ (Intel Compiler)](/guides/software/DevelopmentEnvironment/intel_compiler)

</td>
<td width="300">インストール済み</td>
<td width="300">☓</td>

</tr>

<tr>
<td width="300">

[C/C++ (PGI Compiler)](/guides/software/DevelopmentEnvironment/pgi_compiler)

</td>
<td width="300">インストール済み</td>
<td width="300">☓</td>

</tr>
<tr>


<td width="300">

[CUDA](/guides/software/DevelopmentEnvironment/CUDA)
</td>
<td width="300">インストール済み</td>
<td width="300">インストール済み</td>
</tr>
<tr>
<td width="300">

[Go](/guides/software/DevelopmentEnvironment/go)
</td>
<td width="300">利用可能</td>
<td width="300">利用可能</td>

</tr>

</table>


## 商用コンパイラ {#commercial-compiler}


<table>

<tr>
<th width="300">名称</th>
<th width="300">一般解析区画</th>
<th width="300">個人ゲノム解析区画</th>
</tr>

<tr>
<td width="300">

[C/C++ (Intel Compiler)](/guides/software/DevelopmentEnvironment/intel_compiler)

</td>
<td width="300">インストール済み</td>
<td width="300">☓</td>

</tr>

<tr>
<td width="300">

AMD Optimizing C/C++ and Fortran Compilers (AOCC)

</td>
<td width="300">インストール済み</td>
<td width="300">インストール済み</td>

</tr>

<tr>
<td width="300">

[C/C++ (PGI Compiler)](/guides/software/DevelopmentEnvironment/pgi_compiler)

</td>
<td width="300">インストール済み</td>
<td width="300">☓</td>

</tr>

</table>

