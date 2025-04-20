---
id: software_update_info
title: Software Update Information
---


## Software update frequency

- For shared nodes.
    - Twice a year, the software is updated. (around June each year and during scheduled maintenance following legal power outages around December each year.)
- For occupied nodes.
    - Once a year only during routine maintenance (around December), the software is updated.


## Software update details

- During scheduled maintenance, an overall upgrade is performed by `apt upgrade` of Ubuntu Linux and software updates outside the control of `apt` are performed.
- Around June each year, software updates are performed only for software such as CUDA.

:::info 

If it is a problem that the analysis results change due to software updates, please consider the following options.
- [Use Biocontaier's Apptainer container.](/guides/software/Container/BioContainers)
- Use [Conda](/guides/software/DevelopmentEnvironment/python/#miniconda), [spack](/guides/software/Container/spack/install_spack/), etc. to install the analysis software by yourself and manage the version.

:::

:::info

You can check the list of software installed with `apt` using `apt list --installed`.

:::


## Update history

The following table describes the update dates and versions of software installed except for `apt`.


### 1. CUDA

Directory path: /usr/local/cuda* 

<table>
<tr>
<th width="120">Update Date</th>
<th width="200">
Version<br />
(The General Analysis Division)
</th>
<th width="200">
Version<br />
(The Personal Genome Analysis Division)
</th>
<th width="100">Currently Available Versions</th>
<th width="300">notes</th>
</tr>

<tr>
<td>17/12/2024</td>
<td align="center">12.6.3</td>
<td align="center">12.6.3</td> 
<td align="center">〇</td>
<td></td> 
</tr>

<tr>
<td>08/10/2024</td>
<td align="center">12.4</td>
<td align="center">12.4</td> 
<td align="center">〇</td>
<td></td> 
</tr>

<tr>
<td>30/11/2023</td>
<td align="center">12.1</td>
<td align="center">12.1</td> 
<td align="center">〇</td>
<td>
Downgraded at scheduled maintenance in 2023. *Downgrade from 12.2 as the supported version of the Ubuntu Linux 22.04 LTS GA kernel is 12.1.
</td> 
</tr>

<tr>
<td>06/09/2023</td>
<td>CUDA Version: 12.2 NVIDIA-SMI 535.54.03 Driver Version: 535.54.03 (GPU queues)</td>
<td>CUDA Version: 12.2 NVIDIA-SMI 535.54.03 Driver Version: 535.54.03 (Slurm GPU partitions)</td>
<td align="center">×</td>
<td>Updated from CUDA Version: 11.6 NVIDIA-SMI 510.47.03 Driver Version: 510.47.03. GPU interactive nodes are currently being updated (2023.09.06).</td>
</tr>

</table>


### 2. Apptainer

Directory path: /opt/pkg/apptainer

<table>
<tr>
<th width="120">Update Date</th>
<th width="200">
Version<br />
(The General Analysis Division)
</th>
<th width="200">
Version<br />
(The Personal Genome Analysis Division)
</th>
<th width="100">Currently Available Versions</th>
<th width="300">notes</th>
</tr>

<tr>
<td align="center">18/12/2024</td>
<td align="center">1.3.5</td>
<td align="center">1.3.5</td>
<td align="center">〇</td>
<td></td>
</tr>

<tr>
<td align="center">02/07/2024</td>
<td align="center">1.3.2</td>
<td align="center">1.3.2</td>
<td align="center">〇</td>
<td></td>
</tr>

<tr>
<td align="center">30/11/2023</td>
<td align="center">1.2.4</td>
<td align="center">1.2.4</td>
<td align="center">〇</td>
<td>Updated from 1.1</td>
</tr>

</table>


### 3. SingularityCE

Directory path: /opt/pkg/singularity-ce

<table>
<tr>
<th width="120">Update Date</th>
<th width="200">
Version<br />
(The General Analysis Division)
</th>
<th width="200">
Version<br />
(The Personal Genome Analysis Division)
</th>
<th width="100">Currently Available Versions</th>
<th width="300">notes</th>
</tr>

<tr>
<td align="center">18/12/2024</td>
<td align="center">4.2.1</td>
<td align="center">4.2.1</td>
<td align="center">〇</td>
<td></td>
</tr>

<tr>
<td align="center">02/07/2024</td>
<td align="center">4.1.3</td>
<td align="center">4.1.3</td>
<td align="center">〇</td>
<td></td>
</tr>

<tr>
<td align="center">30/11/2023</td>
<td align="center">4.0.0</td>
<td align="center">4.0.0</td>
<td align="center">〇</td>
<td>Updated from 3.10.2.</td>
</tr>

</table>



### 4. NVIDIA HPC SDK (旧 PGI コンパイラ) {#4-nvidia-hpc-sdk}

Directory path: /opt/pkg/nvidia/hpc_sdk/Linux_x86_64

<table>
<tr>
<th width="120">Update Date</th>
<th width="200">
Version<br />
(The General Analysis Division)
</th>
<th width="200">
Version<br />
(The Personal Genome Analysis Division)
</th>
<th width="100">Currently Available Versions</th>
<th width="300">notes</th>
</tr>

<tr>
<td align="center">Scheduled for 16-17/12/2024</td>
<td align="center">24.11</td>
<td align="center">24.11</td>
<td align="center">〇</td>
<td></td>
</tr>

<tr>
<td align="center">02/07/2024</td>
<td align="center">24.3</td>
<td align="center">24.3</td>
<td align="center">〇</td>
<td></td>
</tr>

<tr>
<td align="center">30/11/2023</td>
<td align="center">23.7</td>
<td align="center">23.7</td>
<td align="center">〇</td>
<td>Updated from 22.9</td>
</tr>

</table>



### 5. Intel OneAPI

Directory path: /opt/pkg/intel_2024/intel_ubuntu_2024/oneapi

<table>
<tr>
<th width="120">Update Date</th>
<th width="200">
Version<br />
(The General Analysis Division)
</th>
<th width="200">
Version<br />
(The Personal Genome Analysis Division)
</th>
<th width="100">Currently Available Versions</th>
<th width="300">notes</th>
</tr>

<tr>
<td align="center">18/12/2024</td>
<td align="center">2025.0.0</td>
<td align="center">2025.0.0</td> 
<td align="center">〇</td>
<td></td>
</tr>

<tr>
<td align="center">02/07/2024</td>
<td align="center">2024.1.0</td>
<td align="center">2024.1.0</td> 
<td align="center">〇</td>
<td></td>
</tr>

<tr>
<td align="center">30/11/2023</td>
<td align="center">2023.2.0</td>
<td align="center">2023.2.0</td> 
<td align="center">×</td>
<td>Updated from 2022.2.0</td>
</tr>

</table>


### 6. Altair Grid Engine

Directory path: /home/geadmin/AGER

<table>
<tr>
<th width="120">Update Date</th>
<th width="200">
Version<br />
(The General Analysis Division)
</th>
<th width="200">
Version<br />
(The Personal Genome Analysis Division)
</th>
<th width="100">Currently Available Versions</th>
<th width="300">notes</th>
</tr>

<tr>
<td align="center">30/11/2023</td>
<td align="center">2023.1.1</td>
<td align="center">2023.1.1</td> 
<td align="center">〇</td>
<td>Updated from 8.6.19/8.6.4</td>
</tr>

</table>


### 7. Slurm server

<table>
<tr>
<th width="120">Update Date</th>
<th width="200">
Version<br />
(The General Analysis Division)
</th>
<th width="200">
Version<br />
(The Personal Genome Analysis Division)
</th>
<th width="100">Currently Available Versions</th>
<th width="300">notes</th>
</tr>

<tr>
<td align="center">30/11/2023</td>
<td align="center">21.08</td>
<td align="center">21.08</td> 
<td align="center">〇</td>
<td>Updated from 21.08.8</td>
</tr>

</table>


### 8. Archaea tools　(formerly HCPtools) server {#8-archaea-tools-server}

<table>
<tr>
<th width="120">Update Date</th>
<th width="200">
Version<br />
(The General Analysis Division)
</th>
<th width="200">
Version<br />
(The Personal Genome Analysis Division)
</th>
<th width="100">Currently Available Versions</th>
<th width="300">notes</th>
</tr>

<tr>
<td align="center">22/07/2024</td>
<td align="center">1.5.5_28</td>
<td align="center">1.5.5_28</td>
<td align="center">〇</td>
<td>Updated from 1.4.6-2</td>
</tr>

</table>

### 9. Archaea tools　(formerly HCPtools) client {#9-archaea-tools-client}

[It will be installed in the future.](/guides/software/CopyTool/Archaea_tools)


### 10. NVIDIA Clara Parabricks

Directory path: /opt/pkg/nvidia/parabricks

<table>
<tr>
<th width="120">Update Date</th>
<th width="200">
Version<br />
(The General Analysis Division)
</th>
<th width="200">
Version<br />
(The Personal Genome Analysis Division)
</th>
<th width="100">Currently Available Versions</th>
<th width="300">notes</th>
</tr>

<tr>
<td align="center">Scheduled for 16-17/12/2024</td>
<td align="center">4.4.0</td>
<td align="center">4.4.0</td>
<td align="center">〇</td>
<td></td>
</tr>

<tr>
<td align="center">02/07/2024</td>
<td align="center">4.3.1</td>
<td align="center">4.3.1</td>
<td align="center">〇</td>
<td></td>
</tr>

<tr>
<td align="center">07/08/2023</td>
<td align="center">4.1</td>
<td align="center">4.1</td>
<td align="center">〇</td>
<td></td>
</tr>

</table>


### 11. Aspera server

<table>
<tr>
<th width="120">Update Date</th>
<th width="200">
Version<br />
(The General Analysis Division)
</th>
<th width="200">
Version<br />
(The Personal Genome Analysis Division)
</th>
<th width="100">Currently Available Versions</th>
<th width="300">notes</th>
</tr>

<tr>
<td align="center">01/03/2017</td>
<td align="center">4.1.0</td>
<td align="center">unavailable</td>
<td align="center">〇</td> 
<td></td>
</tr>

</table>


### 12. Aspera client

[It will be installed in the future.](/guides/software/CopyTool/aspera_client)


### 13. AMD Optimizing C/C++ and Fortran Compilers (AOCC) {#13-aocc}

Directory path: /opt/pkg/aocc

<table>
<tr>
<th width="120">Update Date</th>
<th width="200">
Version<br />
(The General Analysis Division)
</th>
<th width="200">
Version<br />
(The Personal Genome Analysis Division)
</th>
<th width="100">Currently Available Versions</th>
<th width="300">notes</th>
</tr>

<tr>
<td align="center">Scheduled for 18/12/2024</td>
<td align="center">5.0</td>
<td align="center">5.0</td>
<td align="center">〇</td>
<td></td>
</tr>

<tr>
<td align="center">02/07/2024</td>
<td align="center">4.2.0</td>
<td align="center">4.2.0</td>
<td align="center">〇</td>
<td>newly introduced</td>
</tr>

</table>


### 14. Apache Guacamole {#14-guacamole}

<table>
<tr>
<th width="120">Update Date</th>
<th width="200">
Version<br />
(The General Analysis Division)
</th>
<th width="200">
Version<br />
(The Personal Genome Analysis Division)
</th>
<th width="100">Currently Available Versions</th>
<th width="300">notes</th>
</tr>

<tr>
<td align="center">14/05/2021</td>
<td align="center">unavailable</td>
<td align="center">1.4.0</td>
<td align="center">〇</td>
<td></td>
</tr>

</table>
