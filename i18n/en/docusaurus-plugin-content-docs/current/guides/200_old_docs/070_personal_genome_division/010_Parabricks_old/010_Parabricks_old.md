---
id: Parabricks_old
title: GPUノード上でのParabricksの使い方
---

:::danger This is an outdated document

This document pertains to the former NIG Supercomputer (2019) and is retained for reference purposes only.

Please note that it does not reflect the behavior or configuration of the current NIG Supercomputer (2025).

:::

## Using Parabricks with Apptainer {#usage-with-apptainer}

The following procedure demonstrates how to run Parabricks v4.0 using an Apptainer image file.
(For details on Apptainer itself, please refer to [Using Apptainer (Singularity)](/guides/software/Container/Apptainer).)

You can use a Parabricks image either prepared by yourself or available under `/opt/pkg/nvidia/parabricks` on the NIG Supercomputer.

### Logging in to the Slurm GPU Queue Interactive Node and Submitting a Job {#slurm}

A front-end server `at022vm02` is available for job submission.

Prerequisite:

- You are already logged in to `gwa.ddbj.nig.ac.jp`.

Log in to the Slurm GPU queue interactive node:

```
$ ssh at022vm02
```

Download the sample dataset (assuming you are in `/home/$(id -un)/`):

```
$ wget -O parabricks_sample.tar.gz "https://s3.amazonaws.com/parabricks.sample/parabricks_sample.tar.gz"
```

Extract the downloaded file and confirm that the `parabricks_sample` directory is created:

```
$ tar -zxf parabricks_sample.tar.gz
$ ls
................    parabricks_sample    ................   ................   ................ 
```

Create a job script. In this example, save the script as `test.sh` with the following content:

- Job script: `test.sh`

```bash
#!/bin/bash
#
#SBATCH --partition=all  # Use "all" partition
#SBATCH --job-name=test
#SBATCH --output=res.txt
#SBATCH --mem=384000     # Memory in MB; reserves all 384 GB of GPU node memory

apptainer exec --nv --bind /home/$(id -un):/input_data /opt/pkg/nvidia/parabricks/clara-parabricks_4.0.0-1.sif \
  pbrun fq2bam \
    --ref /input_data/parabricks_sample/Ref/Homo_sapiens_assembly38.fasta \
    --in-fq /input_data/parabricks_sample/Data/sample_1.fq.gz /input_data/parabricks_sample/Data/sample_2.fq.gz \
    --out-bam /input_data/parabricks_sample/fq2bam_output.bam
```

The available partitions (equivalent to queues in traditional AGE) are `igt009`, `igt016`, and `all`:

```
$ sinfo -l
Mon Mar 13 10:44:04 2023
PARTITION AVAIL  TIMELIMIT   JOB_SIZE ROOT OVERSUBS     GROUPS  NODES       STATE NODELIST
igt009       up   infinite 1-infinite   no       NO        all      1    reserved igt009
igt016       up   infinite 1-infinite   no       NO        all      1    reserved igt016
all*         up   infinite 1-infinite   no       NO        all      2    reserved igt[009,016]
```

Submit the job:

```
$ sbatch test.sh
```

Verify that the job has been submitted:

```
$ squeue 
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
                56       all     test  pg-user PD       0:00      1 (ReqNodeNotAvail, May be reserved for other job)
```

After the job completes, check the output log and result files:

```
$ cat res.txt
$ ls parabricks_sample/
Data   Ref   fq2bam_output.bam   fq2bam_output.bam.bai   fq2bam_output_chrs.txt
```

- `res.txt`: Output log
- `fq2bam_output.bam`, `fq2bam_output.bam.bai`, `fq2bam_output_chrs.txt`: Result files



## Using Parabricks with Rootless Docker {#usage-rootless-docker}

This section explains how to run Parabricks using Rootless Docker.

1. Log in to each worker (GPU) node and start Rootless Docker.
2. Log in to the Slurm GPU queue interactive node and submit the job.

### Step 1: Start Rootless Docker on Each GPU Node {#worker}

Rootless Docker is a version of Docker that can be run by non-root users.
This procedure prepares the environment to run the Parabricks container.

Reference: [https://docs.nvidia.com/clara/parabricks/4.0.0/GettingStarted.html#gettingstarted](https://docs.nvidia.com/clara/parabricks/4.0.0/GettingStarted.html#gettingstarted)

Prerequisites:

- You are already logged in to `gwa.ddbj.nig.ac.jp`.
- Target GPU nodes: `igt009` and `igt016`.

Create the necessary directories and configuration files in your Lustre-based home directory:

```bash
$ mkdir -p /home/$(id -un)/.docker/run_igt009
$ mkdir -p /home/$(id -un)/.docker/run_igt016
$ mkdir -p /home/$(id -un)/.config/docker
$ cat <<EOF > /home/$(id -un)/.config/docker/daemon.json
{"data-root":"/data1/rootless-docker-$(id -un)"}
EOF
```

Log in to each GPU node (`igt009` or `igt016`) and perform the setup:

```bash
$ ssh <GPU node name: igt009 or igt016>
```

Create the working directory for Rootless Docker on the GPU node's NVMe area (`/data1`):

```bash
$ mkdir /data1/rootless-docker-$(id -un)
$ chmod 750 /data1/rootless-docker-$(id -un)/
```

Start Rootless Docker:

```bash
$ dockerd-rootless.sh --experimental --storage-driver vfs &
```

Pull the Parabricks Docker image (version 4.0.0-1 in this example):

```bash
$ docker pull nvcr.io/nvidia/clara/clara-parabricks:4.0.0-1
```

Log out of the GPU node:

```bash
$ exit
```



### Step 2: Submit a Job from the Slurm GPU Queue Interactive Node {#slurm-gpu}

Use the front-end server `at022vm02` for job submission.

Prerequisites:

- You are logged in to `gwa.ddbj.nig.ac.jp`.
- Rootless Docker has been started on the target GPU node, as described above.

Log in to the Slurm GPU interactive node:

```bash
$ ssh at022vm02
```

Download the sample dataset (assuming `/home/$(id -un)/`):

```bash
$ wget -O parabricks_sample.tar.gz "https://s3.amazonaws.com/parabricks.sample/parabricks_sample.tar.gz"
```

Extract the file and confirm that the directory exists:

```bash
$ tar -zxf parabricks_sample.tar.gz
$ ls
................    parabricks_sample    ................   ................   ................ 
```

Create the job script `test.sh` as follows.
Note: `source /etc/profile.d/rootless-docker.sh` is required to define environment variables for Rootless Docker.

- Job script: `test.sh`

```bash
#!/bin/bash
#
#SBATCH --partition=all  # Use "all" partition
#SBATCH --job-name=test
#SBATCH --output=res.txt

source /etc/profile.d/rootless-docker.sh

docker run --gpus all --rm --volume /home/$(id -un):/input_data nvcr.io/nvidia/clara/clara-parabricks:4.0.0-1 \
  pbrun fq2bam \
    --ref /input_data/parabricks_sample/Ref/Homo_sapiens_assembly38.fasta \
    --in-fq /input_data/parabricks_sample/Data/sample_1.fq.gz /input_data/parabricks_sample/Data/sample_2.fq.gz \
    --out-bam /input_data/parabricks_sample/fq2bam_output.bam
```

Check available partitions:

```bash
$ sinfo -l
Mon Mar 13 10:44:04 2023
PARTITION AVAIL  TIMELIMIT   JOB_SIZE ROOT OVERSUBS     GROUPS  NODES       STATE NODELIST
igt009       up   infinite 1-infinite   no       NO        all      1    reserved igt009
igt016       up   infinite 1-infinite   no       NO        all      1    reserved igt016
all*         up   infinite 1-infinite   no       NO        all      2    reserved igt[009,016]
```

Submit the job:

```bash
$ sbatch test.sh
```

Check job status:

```bash
$ squeue 
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
                56       all     test  pg-user PD       0:00      1 (ReqNodeNotAvail, May be reserved for other job)
```

Once the job completes, check the output and result files:

```bash
$ cat res.txt
$ ls parabricks_sample/
Data   Ref   fq2bam_output.bam   fq2bam_output.bam.bai   fq2bam_output_chrs.txt
```

- `res.txt`: Output log
- `fq2bam_output.bam`, `fq2bam_output.bam.bai`, `fq2bam_output_chrs.txt`: Result files


