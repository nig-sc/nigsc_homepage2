---
id: aspera_client
title: How to use Aspera client(ascp)
---

:::danger This is an old document

This document is a former NIG supercomputer (2019) document and is kept for reference purposes.

Please note that it does not work in the same way on the current NIG supercomputer (2025).
:::


:::info
Instructions on how to write the configuration file can be found in the official documentation at the following link. Refer to the official documentation for the most up-to-date information.

- https://support.bytix.tech/docs/archaea/tools/1.5_en/G_configurationRef/G03_conffile_client

:::

## Overview {#introduction}

Aspera is a high-speed data transfer software.
It can be used to download data from major repositories such as EBI to the NIG supercomputer.
This document outlines the user procedures for downloading data to the NIG supercomputer using Aspera.
If you are using it for the first time, please begin with "1. Environment Setup".
After that, refer to the steps in "2. Downloading Data from EBI".


## 1. Environment Setup {#settings}

Execute the following commands to configure the Aspera client environment on the NIG supercomputer.

```
$ cd /path/to/workdir/
$ git clone https://github.com/nig-sc/apptainer_ascp3.git
$ cd apptainer_ascp3
$ apptainer exec ascp3_ubuntu22.sif bash ibm-aspera-connect-3.9.5.172984-linux-g2.12-64.sh
```

As a result, the executable file `${HOME}/.aspera/connect/bin/ascp` and a private key under `${HOME}/.aspera/connect/etc` will be created.
You can then execute the Aspera command (`ascp`) using Apptainer as follows:

```
$ cd /path/to/workdir/apptainer_ascp3
$ apptainer exec ascp3_ubuntu22.sif ~/.aspera/connect/bin/ascp --help
```


## 2. Downloading Data from EBI {#aspera_download_from_ebi}

### 2-1. Check the file path on the EBI server {#check-file-path-of-ebi}

You can view the list of downloadable files from EBI at the following URL:

https://ftp.sra.ebi.ac.uk/

Below is an example of downloading `/vol1/fastq/SRR144/004/SRR1448774/SRR1448774.fastq.gz` (2.7 GB).

### 2-2. Download files from the EBI server {#downliad-file-from-ebi}

You can run the `ascp` command as follows to download the file:

```
$ apptainer exec ./ascp3_ubuntu22.sif ~/.aspera/connect/bin/ascp -P33001 -i ~/.aspera/connect/etc/asperaweb_id_dsa.openssh era-fasp@fasp.sra.ebi.ac.uk:/vol1/fastq/SRR144/004/SRR1448774/SRR1448774.fastq.gz /path/to/download_dir/
```

- `-i ~/.aspera/connect/etc/asperaweb_id_dsa.openssh` specifies the private key required for downloading.
- `-P33001` sets the TCP port used to initiate the FASP session. When downloading from EBI, be sure to specify `-P33001`.
- `era-fasp@fasp.sra.ebi.ac.uk:/vol1/fastq/SRR144/004/SRR1448774/SRR1448774.fastq.gz` specifies the file to be downloaded. Modify the path as needed.
- `/path/to/download_dir/` specifies the destination path for the downloaded file.

On the NIG supercomputer, download speeds from EBI using Aspera are typically around 30–60 Mb/s.
Downloading the 2.7 GB file `SRR1448774.fastq.gz` takes approximately 6 to 12 minutes.


## 3. Options for the `ascp` Command {#ascp-command-options}

You can find the available options for the `ascp` command at the following URL:

https://download.asperasoft.com/download/docs/ascp/3.5.2/html/dita/ascp_usage.html

Here, we introduce the `-k` option.
By specifying the `-k` option, you can enable resumption of partially transferred files (default: 0).
This must be specified during the initial transfer; otherwise, it will not work for subsequent transfers.

Resume levels:
- `-k 0`: Always retransmit the entire file.
- `-k 1`: Check file attributes and resume if the current attributes match the original.
- `-k 2`: Check file attributes and perform a sparse file checksum. Resume if both attributes and checksum match the original.
- `-k 3`: Check file attributes and perform a full file checksum. Resume if both attributes and checksum match the original.

Note:
If a complete file already exists at the destination (i.e., without a `.aspx` file), the source file size will be compared to the destination file size.
If a partial file and a valid `.aspx` file exist at the destination, the source file size will be compared with the file size recorded in the `.aspx` file.

Please be aware that the larger the value specified for `-k`, the longer it will take to perform checks before the transfer begins.


