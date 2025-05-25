---
id: software
title: Software
---

Refer to the links for each software for detailed usage instructions.

## Job Scheduler {#job-scheduler}

A job scheduler automatically allocates computational resources (CPU cores and memory) to each user in an environment where many users share cluster computers.

<table>

<tr>
<th width="300">Name</th>
<th width="300">General Analysis Division</th>
<th width="300">Personal Genome Analysis Division</th>
</tr>

<tr>
<td width="300">

[Slurm](/guides/software/JobScheduler/Slurm)

</td>
<td width="300">Installed</td>
<td width="300">Installed</td>
</tr>
</table>

## Package Managers {#package-managers}

The following package managers can be used with user permissions only,
making it easier to set up development and analysis environments.

<table>

<tr>
<th width="300">Name</th>
<th width="300">General Analysis Division</th>
<th width="300">Personal Genome Analysis Division</th>
</tr>

<tr>
<td width="300">

[Spack](/guides/software/Container/spack/install_spack)
</td>
<td width="300">Available</td>
<td width="300">Available</td>
</tr>

</table>

## Container {#container}

<table>

<tr>
<th width="300">Name</th>
<th width="300">General Analysis Division</th>
<th width="300">Personal Genome Analysis Division</th>
</tr>

<tr>
<td width="300">

[Apptainer (formerly Singularity)](/guides/software/Container/Apptainer)
</td>
<td width="300">Installed</td>
<td width="300">Installed</td>
</tr>

<tr>
<td width="300">

Singularity CE (formerly Singularity)
</td>
<td width="300">Installed</td>
<td width="300">Installed</td>
</tr>

<tr>
<td width="300">

[BioContainers Apptainer (formerly Singularity)
Images](/guides/software/Container/BioContainers)
</td>
<td width="300">Installed</td>
<td width="300">Installed</td>
</tr>

</table>

## Analysis Pipeline {#analysis-pipeline}

<table>

<tr>
<th width="300">Name</th>
<th width="300">General Analysis Division</th>
<th width="300">Personal Genome Analysis Division</th>
</tr>

<tr>
<td width="300">

[DFAST](/advanced_guides/topics/advanced_guide_2020-2022/#dfast)

</td>
<td width="300">Available</td>
<td width="300">Available</td>
</tr>

<tr>
<td width="300">

[TogoImputation (beta)](/advanced_guides/TogoImputation/imputation_server)

</td>
<td width="300">Unavailable (Demo feature in preparation)</td>
<td width="300">Requires Application</td>
</tr>

<tr>
<td width="300">

[Rhelixa RNAseq Pipeline](/advanced_guides/Rhelixa_RNAseq/Rhelixa_RNAseq)
</td>
<td width="300">Installed</td>
<td width="300">☓</td>
</tr>

</table>

## Commercial analytics pipeline {#commercial-analysis-pipeline}

<table>

<tr>
<th width="300">Name</th>
<th width="300">General Analysis Division</th>
<th width="300">Personal Genome Analysis Division</th>
</tr>

<tr>
<td width="300">

[NVIDIA Parabricks](/advanced_guides/parabricks)
</td>
<td width="300">☓</td>
<td width="300">Installed</td>
</tr>

<tr>
<td width="300">

sentieon

</td>
<td width="300">☓</td>
<td width="300">Installed</td>
</tr>

<tr>
<td width="300">

NVIDIA AI Enterprise

</td>
<td width="300">☓</td>
<td width="300">Installed</td>
</tr>


</table>

## Data Transfer & Sharing {#data-transfer}

Aspera and Archaea are software tools optimized for large-scale data transfers over long distances, offering advantages over protocols like SCP, SFTP, and FTP.
- Aspera can be used to download data from sources such as EBI and DDBJ to supercomputers or users' personal computers. (Up to a total bandwidth of 10 Gbps)
	- Currently, Aspera is not available at NCBI; use of the [SRA-toolkit](/guides/050_software/040_CopyTool/sra_toolkit/sra_toolkit.md) is recommended.
- Archaea tools are available for transferring data between the user's home directory on the supercomputer and their personal computer. (No bandwidth limit)

For more details, please refer to:
- [Data file transfer（The general analysis division）](/guides/using_general_analysis_division/ga_data_transfer/)
- [Data file transfer（The Personal Genome Analysis division）](/guides/using_personal_genome_division/pg_data_transfer/)

<table>

<tr>
<th width="300">Name</th>
<th width="300">General Analysis Division</th>
<th width="300">Personal Genome Analysis Division</th>
</tr>

<tr>
<td width="300">

[Archaea tools](/guides/software/CopyTool/Archaea_tools)

</td>
<td width="300">Installed</td>
<td width="300">Installed</td>
</tr>


<tr>
<td width="300">

[Aspera](/guides/software/CopyTool/aspera_client)

</td>
<td width="300">Available</td>
<td width="300">Available</td>
</tr>

<tr>
<td width="300">

scp, sftp, ftp (Client)

</td>
<td width="300">Installed</td>
<td width="300">Installed</td>
</tr>

</table>

## Development Environment & Libraries {#dev-environment-and-libraries}

Most development environments are pre-installed in the system. For
specific versions needed for reproducibility of analyses, users can
(1) install from tarball themselves, (2) use package managers
available with user permissions, or (3) use Singularity containers.

<table>

<tr>
<th width="300">Name</th>
<th width="300">General Analysis Division</th>
<th width="300">Personal Genome Analysis Division</th>
</tr>

<tr>
<td width="300">

[Python](/guides/software/DevelopmentEnvironment/python)

</td>
<td width="300">Installed</td>
<td width="300">Installed</td>
</tr>
<tr>
<td width="300">

[R](/guides/software/DevelopmentEnvironment/R)

</td>
<td width="300">Installed</td>
<td width="300">Installed</td>
</tr>
<tr>
<td width="300">

[Jupyter Notebook](/guides/software/DevelopmentEnvironment/jupyter_notebook)

</td>
<td width="300">Available</td>
<td width="300">Available</td>
</tr>
<tr>
<td width="300">

[Jupyter Lab](/guides/software/DevelopmentEnvironment/jupyter_lab)

</td>
<td width="300">Available</td>
<td width="300">Available</td>
</tr>
<tr>
<td width="300">

[R Studio Server](/guides/software/DevelopmentEnvironment/R/r_studio_server)

</td>
<td width="300">Available</td>
<td width="300">Available</td>
</tr>

<tr>
<td width="300">

[Java](/guides/software/DevelopmentEnvironment/java)

</td>
<td width="300">Available</td>
<td width="300">Available</td>
</tr>
<tr>
<td width="300">

[Node.JS, TypeScript](/guides/software/DevelopmentEnvironment/TypeScript)

</td>
<td width="300">Available</td>
<td width="300">Available</td>
</tr>
<tr>
<td width="300">

[Rust](/guides/software/DevelopmentEnvironment/Rust)

</td>
<td width="300">Available</td>
<td width="300">Available</td>
</tr>
<tr>
<td width="300">

[C/C++ (GCC)](/guides/software/DevelopmentEnvironment/gcc)

</td>
<td width="300">Installed</td>
<td width="300">Installed</td>
</tr>

<tr>
<td width="300">

AMD Optimizing C/C++ and Fortran Compilers (AOCC)

</td>
<td width="300">Installed</td>
<td width="300">Installed</td>
</tr>

<tr>
<td width="300">

[C/C++ (Intel Compiler)](/guides/software/DevelopmentEnvironment/intel_compiler)

</td>
<td width="300">Installed</td>
<td width="300">☓</td>
</tr>

<tr>
<td width="300">

[C/C++ (PGI Compiler)](/guides/software/DevelopmentEnvironment/pgi_compiler)

</td>
<td width="300">Installed</td>
<td width="300">☓</td>
</tr>
<tr>
<td width="300">

[CUDA](/guides/software/DevelopmentEnvironment/CUDA)

</td>
<td width="300">Installed</td>
<td width="300">Installed</td>
</tr>
<tr>
<td width="300">

[Go](/guides/software/DevelopmentEnvironment/go)

</td>
<td width="300">Available</td>
<td width="300">Available</td>
</tr>

</table>


## Commercial Compiler{#commercila-compilar}

<table>

<tr>
<th width="300">Name</th>
<th width="300">General Analysis Division</th>
<th width="300">Personal Genome Analysis Division</th>
</tr>

<tr>
<td width="300">

[C/C++ (Intel Compiler)](/guides/software/DevelopmentEnvironment/intel_compiler)

</td>
<td width="300">Installed</td>
<td width="300">☓</td>
</tr>

<tr>
<td width="300">

AMD Optimizing C/C++ and Fortran Compilers (AOCC)

</td>
<td width="300">Installed</td>
<td width="300">Installed</td>
</tr>

<tr>
<td width="300">

[C/C++ (PGI Compiler)](/guides/software/DevelopmentEnvironment/pgi_compiler)

</td>
<td width="300">Installed</td>
<td width="300">☓</td>
</tr>

</table>
