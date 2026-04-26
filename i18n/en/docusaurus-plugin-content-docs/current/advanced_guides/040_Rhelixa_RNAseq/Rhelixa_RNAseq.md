---
id: Rhelixa_RNAseq
title: Introduction
---

The RNA-seq*1 analysis pipeline has been provided by Rhelixa Corporation (CTO: Ryu Nakaki), which has a comprehensive collaboration agreement with the National Institute of Genetics, and implemented on the NIG supercomputer system.

*1: RNA-seq is a method for comprehensive analysis of gene expression using next generation sequencers. Unlike microarrays, which capture specific RNA sequences, RNA-seq can detect transcripts comprehensively. It is highly versatile as a method to obtain a large amount of RNA information, including unknown mRNA isoforms and splicing, by examining the sequence of the entire transcript. Therefor, it is used in a wide range of research fields to identify gene profiles in cells and narrow down genes with specific changes in expression.


## What is the Rhelixa's RNA-seq analysis pipeline {#rhelixa_rna_seq_pipeline}

This pipeline maps the Sequence Read Archive of a single sample obtained by the RNA-seq application to a reference genome, aggregates them by gene region and calculates the expression levels of all genes.

In this pipeline, the following processes can be executed collectively by simple command line operations.

- FastQC: Assess the quality of sequence reads contained in fastq files.
- Trimmomatic: Trim fastq files based on quality information.
- RSeQC: Get library strand information from fastq files.
- Hisat2: maps sequence reads in the fastq file to a reference genome*2.
- Samtools: Convert sam files obtained after mapping to bam files.
- featureCounts: Calculates the counts of the mapped reads for each gene.

*2: Only human (hg19, hg38) and mouse (mm9, mm10) reference genomes are supported.

![](Rhelixa_RNAseq1_EN.png)


## How to use this analysis pipeline

Any user of the NIG supercomputer system can use this pipeline free of charge. If you require more advanced analysis, contact Rhelixa Co., Ltd.


## About use

[User manual](/advanced_guides/Rhelixa_RNAseq/Rhelixa_RNAseq_manual)

## Contact Rhelixa

customer-service@rhelixa.com

## About Rhelixa Co., Ltd.

|Company Name            |Rhelixa Co., Ltd.                                        |
|------------------------|---------------------------------------------------------|
|Date of Establishment   |February 2015                                            |
|Head Office             |KDX Ginza East Building 5F, 3-7-2 Irifune, Chuo-ku, Tokyo|
|Representative          |Ryu Nakaki                                               |
|Main Business Activities|Consulting services for genomics and epigenetics research and business development using epigenomic data. |

