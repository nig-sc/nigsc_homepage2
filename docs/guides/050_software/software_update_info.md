---
id: software_update_info
title: ソフトウェア更新情報
---


## ソフトウェア更新頻度 {#software-update-frequency}

- 共用ノードの場合
    - 年に2回、ソフトウェアの更新を行います。（毎年6月ごろ、および12月ごろの法定停電に伴う定期メンテナンス時。）
- 占有ノードの場合
    - 年に1回、定期メンテナンス時(12月ごろ)のみ、ソフトウェアの更新を行います。


## ソフトウェア更新内容 {#software-update-details}

- 定期メンテナンス時には、Ubuntu Linuxの`apt upgrade`で全体のアップグレードを行うとともに、`apt`の管理外のソフトウェアのアップデートを行います。
- 毎年6月ごろのソフトウェアアップデートは、CUDAなどの更新の速いソフトウェアについてのみソフトウェアのアップデートを行います。

:::info 

ソフトウェアの更新により解析結果が変わってしまうことが問題になる場合、以下の方法をご検討下さい。
- [BiocontaierのApptainerコンテナを使う。](/guides/software/Container/BioContainers)
- [Conda](/guides/software/DevelopmentEnvironment/python/#miniconda)や[spack](/guides/software/Container/spack/install_spack/)等を用いてユーザ自身で解析ソフトウェアをインストールしバージョンを管理する。

:::

:::info

`apt`でインストールされているソフトウェアの一覧は、`apt list --installed`で確認することができます。

:::


## 更新履歴 {#update-history}

以下、`apt`以外でインストールされているソフトウェアの更新日とバージョンについて記載します。


### 1. CUDA

ディレクトリパス: /usr/local/cuda* 

<table>
<tr>
<th width="120">更新日</th>
<th width="200">
バージョン<br />
(一般解析区画)
</th>
<th width="200">
バージョン<br />
(個人ゲノム解析区画)
</th>
<th width="100">現在利用可能なバージョン</th>
<th width="300">備考</th>
</tr>

<tr>
<td>2024.12.17</td>
<td align="center">12.6.3</td>
<td align="center">12.6.3</td> 
<td align="center">〇</td>
<td></td> 
</tr>

<tr>
<td>2024.10.08</td>
<td align="center">12.4</td>
<td align="center">12.4</td> 
<td align="center">〇</td>
<td></td> 
</tr>

<tr>
<td>2023.11.30</td>
<td align="center">12.1</td>
<td align="center">12.1</td> 
<td align="center">〇</td>
<td>
2023 年度の定期メンテナンスでダウングレード。*Ubuntu Linux 22.04 LTS GA カーネルの対応バージョンが 12.1 であるため、12.2 からダウングレード。
</td> 
</tr>

<tr>
<td>2023.09.06</td>
<td>CUDA Version: 12.2 NVIDIA-SMI 535.54.03 Driver Version: 535.54.03 (GPU キュー)</td>
<td>CUDA Version: 12.2 NVIDIA-SMI 535.54.03 Driver Version: 535.54.03 (Slurm GPU パーティション)</td>
<td align="center">×</td>
<td>CUDA Version: 11.6       NVIDIA-SMI 510.47.03    Driver Version: 510.47.03 から更新。GPU インタラクティブノードは現在更新中 (2023.09.06)</td>
</tr>

</table>


### 2. Apptainer

ディレクトリパス: /opt/pkg/apptainer

<table>
<tr>
<th width="120">更新日</th>
<th width="200">
バージョン<br />
(一般解析区画)
</th>
<th width="200">
バージョン<br />
(個人ゲノム解析区画)
</th>
<th width="100">現在利用可能なバージョン</th>
<th width="300">備考</th>
</tr>

<tr>
<td align="center">2024.12.18</td>
<td align="center">1.3.5</td>
<td align="center">1.3.5</td>
<td align="center">〇</td>
<td></td>
</tr>

<tr>
<td align="center">2024.07.02</td>
<td align="center">1.3.2</td>
<td align="center">1.3.2</td>
<td align="center">〇</td>
<td></td>
</tr>

<tr>
<td align="center">2023.11.30</td>
<td align="center">1.2.4</td>
<td align="center">1.2.4</td>
<td align="center">〇</td>
<td>1.1 から更新</td>
</tr>

</table>


### 3. SingularityCE

ディレクトリパス: /opt/pkg/singularity-ce

<table>
<tr>
<th width="120">更新日</th>
<th width="200">
バージョン<br />
(一般解析区画)
</th>
<th width="200">
バージョン<br />
(個人ゲノム解析区画)
</th>
<th width="100">現在利用可能なバージョン</th>
<th width="300">備考</th>
</tr>

<tr>
<td align="center">2024.12.18</td>
<td align="center">4.2.1</td>
<td align="center">4.2.1</td>
<td align="center">〇</td>
<td></td>
</tr>

<tr>
<td align="center">2024.07.02</td>
<td align="center">4.1.3</td>
<td align="center">4.1.3</td>
<td align="center">〇</td>
<td></td>
</tr>

<tr>
<td align="center">2023.11.30</td>
<td align="center">4.0.0</td>
<td align="center">4.0.0</td>
<td align="center">〇</td>
<td>3.10.2 から更新</td>
</tr>

</table>



### 4. NVIDIA HPC SDK (旧 PGI コンパイラ) {#4-nvidia-hpc-sdk}

ディレクトリパス: /opt/pkg/nvidia/hpc_sdk/Linux_x86_64

<table>
<tr>
<th width="120">更新日</th>
<th width="200">
バージョン<br />
(一般解析区画)
</th>
<th width="200">
バージョン<br />
(個人ゲノム解析区画)
</th>
<th width="100">現在利用可能なバージョン</th>
<th width="300">備考</th>
</tr>

<tr>
<td align="center">2024.12.18</td>
<td align="center">24.11</td>
<td align="center">24.11</td>
<td align="center">〇</td>
<td></td>
</tr>

<tr>
<td align="center">2024.07.02</td>
<td align="center">24.3</td>
<td align="center">24.3</td>
<td align="center">〇</td>
<td></td>
</tr>

<tr>
<td align="center">2023.11.30</td>
<td align="center">23.7</td>
<td align="center">23.7</td>
<td align="center">〇</td>
<td>22.9 から更新</td>
</tr>

</table>



### 5. Intel OneAPI

ディレクトリパス: /opt/pkg/intel_2024/intel_ubuntu_2024/oneapi

<table>
<tr>
<th width="120">更新日</th>
<th width="200">
バージョン<br />
(一般解析区画)
</th>
<th width="200">
バージョン<br />
(個人ゲノム解析区画)
</th>
<th width="100">現在利用可能なバージョン</th>
<th width="300">備考</th>
</tr>

<tr>
<td align="center">2024.12.18</td>
<td align="center">2025.0.0</td>
<td align="center">2025.0.0</td> 
<td align="center">〇</td>
<td></td>
</tr>

<tr>
<td align="center">2024.07.02</td>
<td align="center">2024.1.0</td>
<td align="center">2024.1.0</td> 
<td align="center">〇</td>
<td></td>
</tr>

<tr>
<td align="center">2023.11.30</td>
<td align="center">2023.2.0</td>
<td align="center">2023.2.0</td> 
<td align="center">×</td>
<td>2022.2.0 から更新</td>
</tr>

</table>


### 6. Altair Grid Engine

ディレクトリパス: /home/geadmin/AGER

<table>
<tr>
<th width="120">更新日</th>
<th width="200">
バージョン<br />
(一般解析区画)
</th>
<th width="200">
バージョン<br />
(個人ゲノム解析区画)
</th>
<th width="100">現在利用可能なバージョン</th>
<th width="300">備考</th>
</tr>

<tr>
<td align="center">2023.11.30</td>
<td align="center">2023.1.1</td>
<td align="center">2023.1.1</td> 
<td align="center">〇</td>
<td>8.6.19/8.6.4 から更新</td>
</tr>

</table>


### 7. Slurm server

<table>
<tr>
<th width="120">更新日</th>
<th width="200">
バージョン<br />
(一般解析区画)
</th>
<th width="200">
バージョン<br />
(個人ゲノム解析区画)
</th>
<th width="100">現在利用可能なバージョン</th>
<th width="300">備考</th>
</tr>

<tr>
<td align="center">2023.11.30</td>
<td align="center">21.08</td>
<td align="center">21.08</td> 
<td align="center">〇</td>
<td>21.08.8から更新</td>
</tr>

</table>


### 8. Archaea tools　(旧 HCPtools) server {#8-archaea-tools-server}

<table>
<tr>
<th width="120">更新日</th>
<th width="200">
バージョン<br />
(一般解析区画)
</th>
<th width="200">
バージョン<br />
(個人ゲノム解析区画)
</th>
<th width="100">現在利用可能なバージョン</th>
<th width="300">備考</th>
</tr>

<tr>
<td align="center">2024.07.22</td>
<td align="center">1.5.5_28</td>
<td align="center">1.5.5_28</td>
<td align="center">〇</td>
<td>1.4.6-2から更新</td>
</tr>

</table>

### 9. Archaea tools　(旧 HCPtools) client {#9-archaea-tools-client}

[今後インストールする予定です。](/guides/software/CopyTool/Archaea_tools)


### 10. NVIDIA Clara Parabricks

ディレクトリパス: /opt/pkg/nvidia/parabricks

<table>
<tr>
<th width="120">更新日</th>
<th width="200">
バージョン<br />
(一般解析区画)
</th>
<th width="200">
バージョン<br />
(個人ゲノム解析区画)
</th>
<th width="100">現在利用可能なバージョン</th>
<th width="300">備考</th>
</tr>

<tr>
<td align="center">2024.12.18</td>
<td align="center">4.4.0</td>
<td align="center">4.4.0</td>
<td align="center">〇</td>
<td></td>
</tr>

<tr>
<td align="center">2024.07.02</td>
<td align="center">4.3.1</td>
<td align="center">4.3.1</td>
<td align="center">〇</td>
<td></td>
</tr>

<tr>
<td align="center">2023.08.07</td>
<td align="center">4.1</td>
<td align="center">4.1</td>
<td align="center">〇</td>
<td></td>
</tr>

</table>


### 11. Aspera server

<table>
<tr>
<th width="120">更新日</th>
<th width="200">
バージョン<br />
(一般解析区画)
</th>
<th width="200">
バージョン<br />
(個人ゲノム解析区画)
</th>
<th width="100">現在利用可能なバージョン</th>
<th width="300">備考</th>
</tr>

<tr>
<td align="center">2017.03.01</td>
<td align="center">4.1.0</td>
<td align="center">利用不可</td>
<td align="center">〇</td> 
<td></td>
</tr>

</table>


### 12. Aspera client


[今後インストールする予定です。](/guides/software/CopyTool/aspera_client)


### 13. AMD Optimizing C/C++ and Fortran Compilers (AOCC) {#13-aocc}

ディレクトリパス: /opt/pkg/aocc

<table>
<tr>
<th width="120">更新日</th>
<th width="200">
バージョン<br />
(一般解析区画)
</th>
<th width="200">
バージョン<br />
(個人ゲノム解析区画)
</th>
<th width="100">現在利用可能なバージョン</th>
<th width="300">備考</th>
</tr>

<tr>
<td align="center">2024.12.18</td>
<td align="center">5.0</td>
<td align="center">5.0</td>
<td align="center">〇</td>
<td></td>
</tr>

<tr>
<td align="center">2024.07.02</td>
<td align="center">4.2.0</td>
<td align="center">4.2.0</td>
<td align="center">×</td>
<td>新規導入</td>
</tr>

</table>


### 14. Apache Guacamole {#14-guacamole}

<table>
<tr>
<th width="120">更新日</th>
<th width="200">
バージョン<br />
(一般解析区画)
</th>
<th width="200">
バージョン<br />
(個人ゲノム解析区画)
</th>
<th width="100">現在利用可能なバージョン</th>
<th width="300">備考</th>
</tr>

<tr>
<td align="center">2021.05.14</td>
<td align="center">利用不可</td>
<td align="center">1.4.0</td>
<td align="center">〇</td>
<td></td>
</tr>

</table>
