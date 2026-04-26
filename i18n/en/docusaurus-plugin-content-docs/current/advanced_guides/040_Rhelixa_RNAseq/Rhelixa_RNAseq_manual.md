---
id: Rhelixa_RNAseq_manual
title: User manual
---

Rhelixa Co., Ltd. <br />
13 Aug 2020 First edition.


## 1. Configuration and Use

### 1. 1 Execution

Specify the following four arguments to execute this analysis pipeline with the command line.

- Argument 1: Output data name (used for the directory name of the output destination and the first string of the file name)
- Argument 2: Reference genome (hg19, hg38, mm9 and mm10 can be selected)
- Argument 3: fastq file for read 1
- Argument 4: (Optional) fastq file for read 2

* Only Argument 3 must be specified for single-end data, and both Arguments 3 and 4 must be specified for paired-end data.


#### 1.1.1 Command Execution

Follow the steps below to execute the command. Note that closing the terminal terminates the process.

```bash
$ export GEA_HOME=/lustre7/singularity/images/gene_expression_analysis
$ export GEA_SINGULARITY=/lustre7/singularity/3.7.1/bin/singularity
$ ${GEA_SINGULARITY} exec \
-B ${GEA_HOME}/refs:${GEA_HOME}/refs \
${GEA_HOME}/gene_expression_analysis.sif \
GeneExpressionAnalysisSingle.sh [引数]
```

For example,

```bash
$ export GEA_HOME=/lustre7/singularity/images/gene_expression_analysis
$ export GEA_SINGULARITY=/lustre7/singularity/3.7.1/bin/singularity
$ ${GEA_SINGULARITY} exec \
-B ${GEA_HOME}/refs:${GEA_HOME}/refs \
${GEA_HOME}/gene_expression_analysis.sif \
GeneExpressionAnalysisSingle.sh \
Sample \
hg19 \
Sample_R1.fastq.gz \
Sample_R2.fastq.gz
```

*This command overwrites the file without a confirmation message even if the file exists in the output directory, so check that there are no problems before executing it.

*The Rhelixa's RNA-seq analysis pipeline is provided in the form of a singularity container. Therefore, the singularity command can only be executed with a specific singularity binary on the NIG supercomputer. Therefore, the singularity command should be specified with the full path /lustre7/singularity/3.7.1/bin/singularity. 

Note: The Rhelixa's RNA-seq analysis pipeline cannot be executed with the normal singularity command.


#### 1.1.2 Executing commands with qsub (for batch execution) {#112-qsub_batch_execution}

If the process takes a long time, it is recommended to use qsub and execute the commands in batch.
Create a shell for execution in advance and execute it with qsub. To specify an execution queue, add an option such as -l epyc or -l short to line 4.

Example:

gene_expression_analysis.sh

```bash
#!/bin/sh
#$ -S /bin/sh
#$ -cwd
#$ -l s_vmem=8G -l mem_req=8G
#$ -pe def_slot 4
#$ -o out.log
#$ -e error.log

export GEA_HOME=/lustre7/singularity/images/gene_expression_analysis
export GEA_SINGULARITY=/lustre7/singularity/3.7.1/bin/singularity
${GEA_SINGULARITY} exec \
-B ${GEA_HOME}/refs:${GEA_HOME}/refs \
${GEA_HOME}/gene_expression_analysis.sif \
GeneExpressionAnalysisSingle.sh \
Sample \
hg19 \
Sample_R1.fastq.gz \
Sample_R2.fastq.gz
```

Register the batch process according to the following instructions.

```bash
$ qsub gene_expression_analysis.sh
```


## 2. Process

In this pipeline, the following processes can be executed collectively by simple command line operations.

- FastQC: Assess the quality of sequence reads contained in fastq files.
- Trimmomatic: Trim fastq files based on quality information.
- RSeQC: Get library strand information from fastq files.
- Hisat2: maps sequence reads in the fastq file to a reference genome*2.
- Samtools: Convert sam files obtained after mapping to bam files.
- featureCounts: Calculates the counts of the mapped reads for each gene.


## 3. Result

When a calculation is performed with the following arguments, the folders and files after [File structure] are generated.

- Argument１：Sample
- Argument２：hg19
- Argument３：Sample_R1.fastq.gz
- Argument４：Sample_R2.fastq.gz

```bash
$ export GEA_HOME=/lustre7/singularity/images/gene_expression_analysis
$ export GEA_SINGULARITY=/lustre7/singularity/3.7.1/bin/singularity
$ ${GEA_SINGULARITY} exec -B ${GEA_HOME}/refs:${GEA_HOME}/refs \
${GEA_HOME}/gene_expression_analysis.sif \
GeneExpressionAnalysisSingle.sh \
Sample \
hg19 \
Sample_R1.fastq.gz \
Sample_R2.fastq.gz
```

[File structure]

```
Sample ## Output data folder
├── analysis_summary.txt ## Summary of analysis contents
├── fastqc ## FastQC output data folder
│ ├── Sample_R1_fastqc.html ## Read1 fastq data quality information
│ ├── Sample_R1_fastqc.zip ## Image data in Sample_R1_fastqc.html
│ ├── Sample_R2_fastqc.html ## Read2 fastq data quality information
│ └── Sample_R2_fastqc.zip ## Image data in Sample_R2_fastqc.html
├── featureCounts ## Output data folder for featureCounts
│ ├── Sample_count.txt ## Read counts for each gene
│ ├── Sample_count.txt.summary ## Mapping information to genes
│ └── Sample.featureCounts.log ## Execution log of featureCounts
├── hisat2 ## HISAT2 output data folder
│ ├── Sample.bam ## bam data of sequence reads after mapping
│ ├── Sample.hisat2.log ## Mapping information to the reference genome
│ ├── Sample.sam ## Sam data of post-mapped sequence reads
│ ├── Sample.sort.bam ## bam data after sorting
│ └── Sample.sort.bam.bai ## Index of Sample.sort.bam
└── trimmomatic ## Trimmomatic output data folder
    ├── Sample_R1_paired.fastq ## Read1 sequence read with pairs
    ├── Sample_R1_unpaired.fastq ## Sequence read of Read1 without pairs
    ├── Sample_R2_paired.fastq ## Sequence read of Read2 with pairs
    ├── Sample_R2_unpaired.fastq ## Sequence read of Read2 without pairs
    └── Sample.trimmomatic.log ## Trimmomatic execution log
```

- After "##" are the contents of the folder or file.

In analysis_summary.txt, [Version of tool used] contains the version information of the programme used in this analysis pipeline, [Phase.1~6] contains the commands executed in each phase and [Data information] contains reference data and the number of reads per processing phase. 

[Contents of analysis_summary.txt]

```
[Version of tool used]
 - FastQC v0.11.7
 - Trimmomatic v0.38
 - HISAT2 v2.1.0
 - Samtool v1.9
 - RSeQC (infer_experiment.py) v3.0.1
 - featureCounts v1.6.3

[Phase.1] Quality check of sequence data with FastQC
fastqc --nogroup -o Sample/fastqc/ Sample_Fr-firststrand_R1.fq.gz
fastqc --nogroup -o Sample/fastqc/ Sample_Fr-firststrand_R2.fq.gz
 
[Phase.2] Trimming sequence data with Trimmomatic
java -jar /usr/local/bioinfo_tools/src/Trimmomatic-0.38/trimmomatic-0.38.jar PE -threads 4 Sample_Fr-firststrand_R1.fq.gz Sample_Fr-firststrand_R2.fq.gz Sample/trimmomatic/Sample_R1_paired.fastq Sample/trimmomatic/Sample_R1_unpaired.fastq Sample/trimmomatic/Sample_R2_paired.fastq Sample/trimmomatic/Sample_R2_unpaired.fastq ILLUMINACLIP:/usr/local/bioinfo_tools/src/Trimmomatic-0.38/adapters/paired_end.fa:2:30:10 LEADING:20 TRAILING:20 SLIDINGWINDOW:4:15 MINLEN:36

[Phase.3] Getting strand information by RSeQC (infer_experiment.py)...
infer_experiment.py -r /data/share/reference/hg19/ucsc/refGene_hg19.bed -i Sample/hisat2/Sample.sort.bam
 
[Phase.4] Mapping sequence data with HISAT2...
hisat2 --rna-strandness RF --dta -p 4 -x /data/share/reference/hg19/Hisat2/hg19 -1 Sample/trimmomatic/Sample_R1_paired.fastq -2 Sample/trimmomatic/Sample_R2_paired.fastq -S Sample/hisat2/Sample.sam
 
[Phase.5] Creating bam files with SAMtools...
samtools view -bS Sample/hisat2/Sample.sam > Sample/hisat2/Sample.bam
samtools sort Sample/hisat2/Sample.bam > Sample/hisat2/Sample.sort.bam
samtools index Sample/hisat2/Sample.sort.bam
 
[Phase.6] featureCountsによる遺伝子にマッピングされるシーケンスリードの集計...
featureCounts -p -s 2 -T 4 -F GTF -t exon -g gene_id -a /data/share/reference/hg19/gtf/Homo_sapiens.GRCh37.87.processed.gtf -o Sample/featureCounts/Sample_count.txt Sample/hisat2/Sample.sort.bam

[Phase.6] Aggregation of sequence reads mapped to genes by featureCounts...
featureCounts -p -s 2 -T 4 -F GTF -t exon -g gene_id -a /data/share/reference/hg19/gtf/Homo_sapiens.GRCh37.87.processed.gtf -o Sample/featureCounts/Sample_count.txt Sample/hisat2/Sample.sort.bam
 
[data info].
 - Reference genome: hg19
 - Reference gene: Homo_sapiens.GRCh37.87.gtf
 - Library type: fr-firststrand
 - Num. of total read pairs: 1000000
 - Num. of trimmed read pairs: 981403
 - Num. of mapped reads: 1928834
 
[Source: Rhelixa Corporation (https://www.rhelixa.com/)]
For questions on how to use the pipeline or to discuss further analysis, please contact customer-service@rhelixa.com.
 
Rhelixa Inc. offers contract services to meet diverse bioinformatics needs.
 - Speedy, illustrated basic analysis (Basic Plan)
 - Tailor-made higher-order comparative analysis (Standard Plan)
 - Pathway analysis by IPA
 - Sequence-only requests are also available at a reasonable price.
 
▼ For more information and enquiries about our services, contact here ▼
https://www.rhelixa.com/service/
```


## 4. Disclaimer

This pipeline has been developed on the assumption that it will be used entirely for research purposes. Note that we cannot be held responsible for any loss or damage resulting from the use of analysis results obtained using this pipeline for any purpose other than research purposes.


## 5. About Acknowledgements

When your paper using this analysis pipeline is accepted, include in the acknowledgements with the following example.

Example:

```
RNA-seq analyses were performed by the pipeline provided by Rhelixa, Inc.
```


## 6. Contact Rhelixa

If you questions on how to use this pipeline or to discuss a developmental analysis, contact `customer-service@rhelixa.com`.


## About Rhelixa Co., Ltd.

|Company Name            |Rhelixa Co., Ltd.                                        |
|------------------------|---------------------------------------------------------|
|Date of Establishment   |February 2015                                            |
|Head Office             |KDX Ginza East Building 5F, 3-7-2 Irifune, Chuo-ku, Tokyo|
|Representative          |Ryu Nakaki                                               |
|Main Business Activities|Consulting services for genomics and epigenetics research and business development using epigenomic data. |

