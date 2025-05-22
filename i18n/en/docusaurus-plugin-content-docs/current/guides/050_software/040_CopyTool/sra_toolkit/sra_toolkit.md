---
id: sratoolkit
title: How to use SraToolkit
---

## Introduction {#introduction}
prefetch is par of the SRA Tools provided by NCBI and is a command line tool for pre-downloading sequence data (SRA accessions). In this documsnt, we show the user procedure for downloading data to the NIG using prefetch while logged in to the NIG supercomputer.  
Note: The commands prefetch and vdb-config, which are used below, are already installed in the general analysis section of the NIG.  
Note2: For more detailed instructions, please refer to the following site of ncbi,  
```https://github.com/ncbi/sra-tools/wiki/08.-prefetch-and-fasterq-dump```

## 1. Basic Usage

- 1. Check the size of the downloaded file using the vdb-dump command (it will be displayed in the size: field). If it is larger than 20 GB, specify a number greater than the required size in the --max-size option when using the prefetch command.  
- 2. Next, use the prefetch command to download the directory corresponding to the SRA accession.
- 3. Finally, use the fastq-dump command to extract the fastq files. Note that the free HDD space should be approximately 17 times the accession size.
    

Below is the case of downloading SRR000001 (size is less than 20 GB), and downloaded to . /path/to/be/used..

```
  $ vdb-dump SRR1951777 --info
  $ prefetch SRR000001 -O ./path/to/be/used
  $ cd ./path/to/be/used
  $ fasterq-dump SRR000001
```

The following is another example of downloading SRR1951777 (size is over then 20GB), and downloaded to current directory (./).
```
  $ vdb-dump SRR1951777 --info
  $ prefetch SRR1951777 --max-size 420000000000 -O ./
  $ fasterq-dump SRR1951777
```

