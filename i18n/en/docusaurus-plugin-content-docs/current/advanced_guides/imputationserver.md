---
id: imputation_server
title: NBDC-DDBJ Imputation Server
---

The **Imputation Server** is a service to support imputation analysis of SNP array data. **[Michigan Imputation Server](https://imputationserver.sph.umich.edu/)** and **[TOPMed Project Imputation Server](https://imputation.biodatacatalyst.nhlbi.nih.gov/#!)** are public. These servers are located outside Japan and genomic data (SNP array data) had to be uploaded to the servers outside Japan for use.

Therefore, **[the Department of NBDC Program of the Japan Science and Technology Agency](https://biosciencedbc.jp/en/)** has developed **the NBDC-DDBJ Imputation Server** system as a Japanese version of the imputation server that is easy for Japanese researchers to use. This system is currently available in **[the Personal Genome Analysis Section](https://sc.ddbj.nig.ac.jp/en/personal_genome_division/pg_introduction)** of **[the NIG supercomputer system](https://sc.ddbj.nig.ac.jp/en/)**.

The imputation workflow used in this server was modified and implemented as a web service by the Department of NBDC Program with reference to the information (selection of imputation software and setting of parameters) provided by the National Center for Global Health and Medicine in the following AMED project The NBDC Business Promotion Department has modified and implemented it as a web service using this information as a reference. 

Project name: **Platform Program for Promotion of Genome Medicine (Research and development research to resolve issues related to international data sharing)**

Subject name: **"Investigation and practice of ethical and technical issues in genomic medical science research using cloud computing environment"**

## Introduction

The NBDC-DDBJ Imputation Server (beta version) (hereafter referred to as 'this system') is available in the Personal Genome Analysis section of the NIG supercomputer. Researchers(users) can upload their own genomic data to the server and execute the imputation analysis workflow via the web user interface. After the workflow calculations are completed, the imputed genomic data, which are the results of the calculations, can be downloaded. This system can be used securely by using a virtual private network (SSL-VPN) with encrypted communication.

![](/img/advanced_guides/imputationserver.Fig1-work.png)


**System Diagram of the NBDC-DDBJ Imputation Server**
Researcher illustration were created by TogoTV (©2016 DBCLS TogoTV / CC-BY-4.0).


### Available Imputation Algorithms
This system uses the following programmes for imputation analysis.

- Use **[conform-gt (version 24May16)](https://faculty.washington.edu/browning/conform-gt.html)** to convert the reference / alternative allele of the input SNP array data to match the reference panel data.
- Use **[Beagle 5.2 (version 21Apr21.304)](https://faculty.washington.edu/browning/beagle/b5_2.html)** for fading and imputation analysis.
- Index the genomic data (VCF file) after imputation using **[bcftools (version 1.9)](http://samtools.github.io/bcftools/bcftools.html)**.

A series of workflows are implemented in **[Common Workflow Language (CWL)](https://www.commonwl.org)** and published as an **[input-server workflow](https://github.com/ddbj/imputation-server-wf)**.


### Main input files
The following two datasets are inputs to the imputation workflow.
- **Target genotype dataset:** A dataset genotyped with SNP microarrays. It is assumed that you upload the data yourself to the server. The file format VCF is supported. (PLINK format is currently not).
- **Reference panel dataset:** A dataset containing phased haplotypes. Six ready-to-use reference panels are available.


### Main input files
- **Imputed genotype dataset:** Post-imputation genotype dataset. The file format is VCF. The allele dosage data resulting from imputation is output to a DS tag. The estimated allele frequency and imputation quality (dosage R2) are output in the INFO column.


### Available reference panel types.
In this system, six types of reference panels are currently available. If you use a reference panel for unrestricted data, it is not necessary to apply to use the data. But for restricted public data, you need to **apply to NBDC for data usage** of the reference panel data.

| リファレンスパネルの名前 | 概要 | アクセスレベル | アセンブリバージョン |
| Reference Panel Name | Overview | Access Level | Assembly Version |
| --- | --- | --- | --- |
| **GRCh37.1KGP** | Reference panel '[The 1000 Genomes Project](https://www.internationalgenome.org)'. Includes 2,504 samples belonging to several ancestries | Unrestricted publication | hg19, GRCh37 |
| **GRCh37.1KGP_EAS** | Reference panel '[The 1000 Genomes Project](https://www.internationalgenome.org)'. Includes 504 samples belonging to East Asian ancestry | Unrestricted publication | hg19, GRCh37 |
| **GRCh38.1KGP** | Reference panel '[The 1000 Genomes Project](https://www.internationalgenome.org)'. Includes 2,548 samples belonging to several ancestries | Unrestricted publication | GRCh38 |
| **GRCh38.1KGP_EAS** | Reference panel '[The 1000 Genomes Project](https://www.internationalgenome.org)'. Includes 508 samples belonging to East Asian ancestry | Unrestricted publication | GRCh38 |
| **BBJ1K+GRCh37.1KGP** | Reference panel obtained by cross-imputing the reference panel '[BioBank Japan project](https://biobankjp.org)' with the reference panel '[The 1000 Genomes Project](https://www.internationalgenome.org)'. Includes 1,037 samples from the BioBank Japan project and 2,504 samples from several ancestries of the 10,000 Genomes Project (3,541 in total) | restricted publication | hg19, GRCh37 |
| **BBJ1K+GRCh37.1KGP_EAS** | Reference panel obtained by cross-imputing the reference panel '[BioBank Japan project](https://biobankjp.org)' with the reference panel '[1000 Genomes Project](https://www.internationalgenome.org)'. Includes 1,037 samples from the BioBank Japan project and 504 samples belonging to the East Asian ancestry of the 10,000 Genomes Project (1,541 in total) | restricted publication | hg19, GRCh37 |

A result comparing the imputation accuracy of different reference panels showed that the restricted public data, **BBJ1K+GRCh37.1KGP reference panel**, was rated as the most accurate. Details are given in the paper under submission. This page will be updated when the paper is published.


### Notes on using this system to prepare papers.
- Cite the paper in this system.
    - Hachiya T, Ishii M, Kawai Y, Khor SS, Kawashima M, Toyo-Oka L, et al., The NBDC-DDBJ imputation server facilitates the use of controlled access reference panel datasets in Japan. *submitted*. 
- Describe the use of the NIG supercomputer in an acknowledgement letter or similar. ([Sample text](https://www.ddbj.nig.ac.jp/faq/ja/acknowledge-nig-supercomputer.html)).
- If you have used restricted public data,  include the accession number of the dataset used in your paper. In addition, cite the paper in which the dataset was reported (the paper prepared by the data provider of the dataset using the dataset as the basis for the data), or provide the content of [the example text](https://humandbs.biosciencedbc.jp/faq#faq-23) as an acknowledgement.


## How to use the NBDC-DDBJ Imputation Server (beta)

This system is for users who use the Personal Genome Analysis Section. For information on how to apply for use of it, refer to the **[Steps from user account application to start of use](https://sc.ddbj.nig.ac.jp/en/personal_genome_division/pg_application/#steps-from-user-account-application-to-start-of-use)** page in the Personal Genome Analysis Section. Users of the personal genome analysis section can use this system according to the following procedure. It is strongly recommended to use a virtual environment with one guacamole per user when using the system.

1. Send an application email to the application desk for the use of this system (**imputation-server@ddbj.nig.ac.jp**)
2. The **supercomputer administrator** will cut out a part of the computer node and start a virtual machine of this system. The remote desktop environment user manual will also be sent to you.
3. Log in to the Remote Desktop Environment according to the Remote Desktop Environment User Manual.
4. **[Install Manual](./imputation_server_install)** to complete the setup.
5. Use **[Tutorial](./imputation_server_tutorial)** to learn how to use the Imputation Server with publicly available genomic and reference data
6. After completing the above steps, you can upload your genomic data (SNP array data), perform an imputation analysis and download the results of the imputation analysis.


text:Example of NBDC-DDBJ Imputation Server usage application email
```
I request the use of the NBDC-DDBJ Imputation Server (beta version).
I would appreciate it if you could create a new virtual machine environment using guacamole.

Account name for the personal genome analysis section: ________ （e.g. youraccount-pg)
Machine name to start guacamle: ________ (e.g. at001)
Number of cores: ______ (recommended: 16 or more)
RAM: ______ (recommended: 128 GB or more)
Directory to mount: __________ (e.g. /home/ddbjshare-pg [required], /home/youraccount-pg [required])
```


## Applying for data use of restricted public data
Restricted Public Reference Panels are registered in the **[Japanese Genotype-phenotype Archive (JGA)](https://www.ddbj.nig.ac.jp/jga/index.html)**. For how to apply for use of JGA data, see **[NBDC Human Database - Data Usage](https://humandbs.biosciencedbc.jp/data-use)**. Refer to the following table for the accession code required when applying.

| Reference Panel Name | Research ID | Dataset ID |
| --- | --- | --- |
| **BBJ1K+GRCh37.1KGP** | hum0014 | JGAD000679 |
| **BBJ1K+GRCh37.1KGP_EAS** | hum0014 | JGAD000679 |

## Contact us

For any queries regarding this system, contact **imputation-server@ddbj.nig.ac.jp**.

