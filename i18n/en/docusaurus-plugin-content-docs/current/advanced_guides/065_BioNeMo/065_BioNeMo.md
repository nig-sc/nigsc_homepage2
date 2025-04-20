---
id: bionemo
title: "NVIDIA BioNeMo"
---


## Overview {#introduction}
BioNeMo is a drug discovery support platform developed by NVIDIA, which enables efficient molecular design and property prediction using large generative AI models. BioNeMo Framework is an open-source framework based on BioNeMo, designed to allow users to conduct research using their own molecular data and models. NVIDIA provides the following official manual for BioNeMo Framework:

https://docs.nvidia.com/bionemo-framework/1.10/initialization-guide.html

This document explains how to execute one of the official BioNeMo Framework tutorials on the NIG supercomputer system. The tutorial proceeds through the following steps:

1. Creating an NGC account
2. Preparing the BioNeMo Framework container
3. Data preprocessing (pretrain.py)
4. Pretraining the model (pretrain.py)
5. Downloading the model (download_artifacts.py)
6. Performing inference using Jupyter Lab (inference_interactive.ipynb)

As of December 2024, there are both version 1.x and version 2.x of BioNeMo Framework. This tutorial assumes the use of version 1.8, which belongs to the 1.x series.
The sources referenced in this guide include the following official manuals from NVIDIA:
- For 1.x series:
https://docs.nvidia.com/bionemo-framework/1.10/initialization-guide.html
- For 2.x series:
https://docs.nvidia.com/bionemo-framework/2.0/user-guide/
- As well as the following technical blog:
https://developer.nvidia.com/ja-jp/blog/an-easy-way-to-building-cutting-edge-protein-language-models-with-bionemo-framework/

Please note that this document does not describe how to log in to the NIG supercomputer.
For information on how to log in via SSH, please refer to [Login Overview](https://sc.ddbj.nig.ac.jp/en/guides/account_activation/).
In this tutorial, the home directory is used as the working directory. If you use a different directory for actual work, please adjust the paths accordingly.

### Preliminary Notes
#### Note 1.
This tutorial uses a container provided by NVIDIA, which already includes all necessary Python libraries.
If you encounter an error, it is highly likely that the version of CUDA being bound via the `singularity shell` command (using the `--bind` or `-B` option) is not appropriate.
When using BioNeMo Framework version 1.8, the following bind option is recommended, and the same is used in the commands within this tutorial:

```
$ singularity shell --nv -e -B bionemo:/workspace/bionemo
```

#### Note 2.
The official tutorial assumes that you have write access to directories and files under `/work`.
In practice, you may not have write permissions for these paths.
Therefore, you should modify paths to refer to the `work` directory under the `Bionemo-framework_1.8` directory inside the downloaded container.
This tutorial does not use anything under `/work`.


## 1. Creating an NGC Account

### 1-1. Visit the official NVIDIA website below and create an account by clicking on "Create Account" {#1-1-visit-nvidia-website-and-create-account}
https://login.nvgs.nvidia.com/v1/help

After creating your account, log in and select “Set up” from your account icon at the top right of the scree
Then generate an API Key from the "Generate API Key" section and make sure to save it for later use.


## 2. Preparing the Container

### 2-1. Move into the working directory
In this tutorial, the home directory is used as the working directory.

```
 $ cd ~/
```


### 2-2. Download the Singularity `.sif` file of the BioNeMo Framework container {#2-2-download-sif-file}
This step is required only the first time. You can skip it on subsequent runs.
This assumes an environment where Docker is not available, but Singularity is.

```
singularity pull --docker-login docker://nvcr.io/nvidia/clara/bionemo-framework:1.8
```

For the username, enter `$oauthtoken`. For the password, paste the API key created in "1. Creating an NGC Account".


```
Enter Docker Username: $oauthtoken
Enter Docker Password: 
```


The file `bionemo-framework_1.8.sif` will be downloaded locally.


### 2-3. Build the BioNeMo Framework container from the downloaded `.sif` file {#2-3-build-the-bionemo-framework-container}
This step is required only the first time. You can skip it on subsequent runs.

```
$ singularity build --sandbox bionemo-framework_1.8 bionemo-framework_1.8.sif
```

This operation may take 10–20 minutes. When finished, a sandbox container will be created in a directory named `bionemo-framework_1.8`, as specified by the `--sandbox` option.


### 2-4. Enter the container

```
$ singularity shell --nv -e bionemo-framework_1.8.sif
```

After executing `singularity shell`, you will be inside the sandbox container.
The prompt will change to something like: `Singularity>`.


### 2-5. Copy the `work` directory inside the container
This step is required only the first time. You can skip it on subsequent runs.
To avoid write permission errors, copy the directory to your own working directory.

```
Singularity> cp -R $BIONEMO_HOME $HOME/bionemo-framework_1.8/workspace/bionemo
Singularity> cd ~/bionemo-framework_1.8
```


### 2-6. Extract the sample data inside the container
This step is required only the first time. You can skip it on subsequent runs.
As shown below, the sample file `uniref202104_esm2_qc_test200_val200.zip` has not yet been extracted.

```
Singularity> ls ~/bionemo-framework_1.8/workspace/bionemo/examples/tests/test_data/
dna	  preprocessing  reaction
molecule  protein	 uniref202104_esm2_qc_test200_val200.zip
```

Use the `unzip` command to extract the file.
(Be sure to extract it under `./workspace` in `bionemo-framework_1.8`, not the root `/workspace`.)

```
Singularity> cd ~/bionemo-framework_1.8/workspace/bionemo/examples/tests/test_data/
Singularity> unzip uniref202104_esm2_qc_test200_val200.zip
Singularity> exit
```

## 3. Data Preprocessing

### 3-1. Enter the container and run the desired Python script {#3-1-enter-container-and-run-python-script}

In this case, we will run `pretrain.py` from `esm2nv`.
Make sure that the container is launched with the `-B` option binding `bionemo:/workspace/bionemo`.

```
$ cd ~/
$ singularity shell --nv -e -B bionemo:/workspace/bionemo/ bionemo-framework_1.8.sif
```


Now you are inside the container.
(If copying and pasting the following multi-line command doesn't work, use the one-line version provided just below.)

```
Singularity> cd ~/bionemo-framework_1.8
Singularity> python ./workspace/bionemo/examples/protein/esm2nv/pretrain.py\  ./
 --config-path=conf\  
 --config-name=pretrain_esm2_650M\  
 ++do_training=False\  
 ++model.data.val_size=500\  
 ++model.data.test_size=100\  
 ++model.data.uf50_datapath=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/uniref50_train_filt.fasta\  
 ++model.data.uf90_datapath=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/ur90_ur50_sampler.fasta\  
 ++model.data.cluster_mapping_tsv=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/mapping.tsv\  
 ++model.data.dataset_path=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/uf50\  
 ++model.data.uf90.uniref90_path=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/uf90\  
 ++model.data.train.uf50_datapath=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/uniref50_train_filt.fasta\  
 ++model.data.train.uf90_datapath=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/ur90_ur50_sampler.fasta\  
 ++model.data.train.cluster_mapping_tsv=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/mapping.tsv\  
 ++model.data.val.uf50_datapath=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/uniref50_train_filt.fasta\  
 ++model.data.test.uf50_datapath=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/uniref50_train_filt.fasta  
```


One-line version (for copy-pasting easily):
```
Singularity> python ./workspace/bionemo/examples/protein/esm2nv/pretrain.py --config-path=conf --config-name=pretrain_esm2_650M ++do_training=False ++model.data.val_size=500 ++model.data.test_size=100 ++model.data.uf50_datapath=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/uniref50_train_filt.fasta ++model.data.uf90_datapath=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/ur90_ur50_sampler.fasta ++model.data.cluster_mapping_tsv=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/mapping.tsv ++model.data.dataset_path=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/uf50 ++model.data.uf90.uniref90_path=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/uf90 ++model.data.train.uf50_datapath=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/uniref50_train_filt.fasta ++model.data.train.uf90_datapath=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/ur90_ur50_sampler.fasta ++model.data.train.cluster_mapping_tsv=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/mapping.tsv ++model.data.val.uf50_datapath=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/uniref50_train_filt.fasta ++model.data.test.uf50_datapath=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/uniref50_train_filt.fasta
```


- Parameters starting with `--` are command-line arguments passed to `pretrain.py`, and their paths are relative to the script.
- Parameters starting with `++` can be specified in the YAML configuration file.

The preprocessed data will be saved under:
`./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/uf50/`
inside the container directory (in this case `bionemo-framework_1.8`).


## 4. Model Pretraining

### 4-1. Run the following command to begin pretraining {#4-1-run-command-to-begin-pretraining}

Continue working inside the container.
(If copying and pasting the multi-line command below doesn't work, please use the one-line version provided afterward.)

```
Singularity> cd  ~/bionemo-framework_1.8/workspace
``` 

```
Singularity> python ./bionemo/examples/protein/esm2nv/pretrain.py \
 --config-path=conf \
 --config-name=pretrain_esm2_650M \
 ++do_training=True \
 ++do_testing=False \ ++model.data.dataset_path=examples/tests/test_data/uniref202104_esm2_qc_test200_val200/uf50 \ ++model.data.uf90.uniref90_path=examples/tests/test_data/uniref202104_esm2_qc_test200_val200/uf50/uf90 \
 ++trainer.devices=2 \
 ++model.tensor_model_parallel_size=2 \
 ++model.micro_batch_size=8 \
 ++trainer.max_steps=50 \
 ++trainer.val_check_interval=5 \
 ++exp_manager.create_wandb_logger=True \
 ++exp_manager.checkpoint_callback_params.save_top_k=5
```


One-line version for easier copy-paste:
```
Singularity> python ./bionemo/examples/protein/esm2nv/pretrain.py --config-path=conf --config-name=pretrain_esm2_650M ++do_training=True ++do_testing=False ++model.data.dataset_path=examples/tests/test_data/uniref202104_esm2_qc_test200_val200/uf50 ++model.data.uf90.uniref90_path=examples/tests/test_data/uniref202104_esm2_qc_test200_val200/uf50/uf90 ++trainer.devices=2 ++model.tensor_model_parallel_size=2 ++model.micro_batch_size=8 ++trainer.max_steps=50 ++trainer.val_check_interval=5 ++exp_manager.create_wandb_logger=True ++exp_manager.checkpoint_callback_params.save_top_k=5
```

Once the process completes successfully, exit the sandbox container:
```
Singularity> exit
```

The training results will be saved under:
`./workspace/bionemo/results/nemo_experiments/`
within the container directory (in this case, `bionemo-framework_1.8`).


## 5. Model Fine-tuning

Sample data can be found in the following folder:
`/workspace/bionemo/examples/tests/test_data/protein/downstream/`
When running `downstream_flip.py`, specify this path using `++model.data.dataset_path`.


### 5-1. Download the pretrained model
To download a pretrained model, you need to install `ngc` and configure it with `ngc config`.

```
$ wget -q -O /tmp/ngccli_linux.zip --content-disposition https://api.ngc.nvidia.com/v2/resources/nvidia/ngc-apps/ngc_cli/versions/3.38.0/files/ngccli_linux.zip && unzip -o /tmp/ngccli_linux.zip -d /tmp && chmod u+x /tmp/ngc-cli/ngc && rm /tmp/ngccli_linux.zip
```

### 5-2. Run `ngc config set` as shown below: {#5-2-run-ngc-config-set}

```
/tmp/ngc-cli/ngc config set 
# Enter the API key, CLI output format, org, team, and ace in order. Input your NGC API key. Choose an org other than 'no-org'; for other entries, simply press "Enter" to accept the default values.
```

Finally, run the following command to download all models.
(Starting from BioNeMo v1.5, model download uses `download_artifacts.py` as shown below.)

```
$ singularity shell --nv -e -B bionemo:/workspace/bionemo/ bionemo-framework_1.8.sif
```

Add `ngc` to your path:

```
Singularity> export PATH=/tmp/ngc-cli/:$PATH 
```

Use `download_artifacts.py` to download the desired model (in this case, `esm2nv_650m`):

```
Singularity> cd ~/bionemo-framework_1.8/workspace/bionemo
```

```
Singularity> python download_artifacts.py --models esm2nv_650m --model_dir ~/bionemo-framework_1.8/workspace/bionemo/models
```

You can check available model names in:

```
artifacts_paths.yaml
```

The downloaded model will be saved as a `.nemo` file under:
`/workspace/bionemo/models`

Next, run the fine-tuning process.
BioNeMo Framework v1.4 introduced a new fine-tuning technique called **LoRa**, which efficiently fine-tunes large language models by adjusting two small matrices that approximate the large weight matrix, instead of tuning all weights directly.

Re-enter the sandbox container:
```
singularity shell --nv -e -B bionemo:/workspace/bionemo/ bionemo-framework_1.8.sif
```

```
Singularity> cd ~/bionemo-framework_1.8/workspace/bionemo
```

Run `downstream_flip.py` to fine-tune the model.
(If copying and pasting the multi-line command below doesn't work, please use the one-line version afterward.)

```
Singularity> python examples/protein/downstream/downstream_flip.py\
 --config-path="../esm2nv/conf"\
 --config-name=downstream_sec_str_LORA\
 ++model.data.dataset_path=/workspace/bionemo/examples/tests/test_data/protein/downstream/
```


One-line version:
```
Singularity> python examples/protein/downstream/downstream_flip.py --config-path="../esm2nv/conf" --config-name=downstream_sec_str_LORA ++model.data.dataset_path=/workspace/bionemo/examples/tests/test_data/protein/downstream/
```


## 6. Inference

### 6-1. Update the YAML file
Open the following YAML file:

```
/workspace/bionemo/examples/protein/esm2nv/conf/infer.yaml
```

Update the following entry.
You can use either a pretrained model provided by NVIDIA or one you trained yourself.

```
downstream_task:
 restore_from_path: "${oc.env:BIONEMO_HOME}/models/protein/esm2nv/esm2nv_650M_converted.nemo" # Path to the pretrained model
```

### 6-2. Inference using Jupyter Lab
From this step onward, Jupyter Lab is required.
Start Jupyter Lab. In this example, port 8888 is specified.

```
Singularity> jupyter lab --ip=`hostname` --port=8888 --no-browser
```

This command starts a Jupyter server.
To stop the server, press `Control + c`. The following prompt will appear:

```
Shut down this Jupyter server (y/[n])? n
```

Type `y` to stop the server and return to the `Singularity>` prompt.
While the server is running, this terminal cannot be used for other commands.

So, open a new terminal on your local machine and run the following command:
(In this example, port 18888 is used on the local machine.)

```
ssh -i ~/.ssh/<your id_rsa> -L 18888:igt008:8888 <your NIG account>@gw.ddbj.nig.ac.jp
```

On your local machine, open a web browser and go to:
http://localhost:18888

Then open the following Jupyter Notebook:

```
./workspace/bionemo/examples/protein/esm2nv/nbs/inference_interactive.ipynb
```

Click the gray folder icon in the top left corner of the Jupyter screen to navigate to your home directory.
Then follow the path under `bionemo-framework_1.8`, and proceed step by step through `workspace` to the `.ipynb` file.
Click `inference_interactive.ipynb`, and a set of code cells will appear on the right side.

Execute the cells sequentially from the top:

- Double-click the `inference_interactive.ipynb` file in the Jupyter Notebook.
- On the right, code cells will be displayed. Select each one in order (the selected cell will show a blue bar on the left), and click the triangular "Run" button at the top.
- A `[*]` next to a cell means it is currently running.
- Once it changes to a number like `[1]`, you can proceed to the next cell.

If everything runs successfully, the following will be displayed at the end:

```
embeddings.shape=torch.Size([2, 1280])
```

### 6-3. Additional operation

To better understand the inference process in Jupyter Lab, try modifying the input `seqs` data from two amino acid sequences to three, as shown below:

```
seqs = [
 'MSLKRKNIALIPAAGIGVRFGADKPKQYVEIGSKTVLEHVL',
 'MIQSQINRNIRLDLADAILLSKAKKDLSFAEIADGTGLA',
 'MIQSYTYLGGGQINRNIRLDLADAKDLSFAEIADGTGLA',
 ]
```

Just change the input as above, proceed through the notebook, and if everything completes without errors,
type `embeddings` into a new cell at the end of the Jupyter notebook and run it.
If successful, a 3-row by 1280-column tensor (e.g., `tensor([[0.0373, ....])`) will be displayed.


## 7. Next Steps

The BioNeMo Framework provides sample code for three downstream tasks:

1. Predicting the subcellular localization of proteins (10 different compartments)
2. Predicting protein melting temperature
3. Predicting protein secondary structure (three-state classification)

This tutorial has focused on the third task as an example.
Specifically, for each amino acid in a sequence, the model predicts whether it belongs to a helix, sheet, or coil.

### About downstream tasks
The generated embeddings can be used as feature vectors for predictive models (e.g., for secondary structure or residue conservation).
For more on downstream analysis pipelines and applications, refer to the following official tutorials:

- https://docs.nvidia.com/bionemo-framework/1.10/notebooks/esm2_FLIP_finetuning.html  
- https://docs.nvidia.com/bionemo-framework/1.10/notebooks/esm2_oas_inferencing.html  
- https://docs.nvidia.com/bionemo-framework/1.10/notebooks/protein-esm2nv-clustering.html


## 8. Supplementary Notes

If operations in Jupyter Lab do not go as expected, it's recommended to identify where the error occurred.
For example, try entering `embeddings` into a new cell at the end of the Jupyter Lab notebook and executing it.
If everything is working correctly, a 2-row × 1280-column tensor like `tensor([[ 0.0373, ....])` should be displayed
If not, you may see an error like the following:

```
NameError: name 'embeddings' is not defined
```


Similarly, you can check the contents of the variables used in the Jupyter Lab notebook.
Try entering `seqs` into a new cell and run it:

```
['MSLKRKNIALIPAAGIGVRFGADKPKQYVEIGSKTVLEHVL',
 'MIQSQINRNIRLDLADAILLSKAKKDLSFAEIADGTGLA']
```

In most cases, this will work correctly.
If nothing is displayed, you may have mistyped the variable name `seqs`, or Jupyter Lab may not be functioning properly.


Next, try entering `cfg` and running the cell:

```
{'name': 'ESM2nv_Inference', 'desc': 'Minimum configuration for initializing a ESM2nv model for inference.',..... }
```

Or enter `inferer` and run the cell:

```
ESM1nvInference(
  (model): ESM2nvModel(
    (model): ESMnvBertModel(
 ...
```

If neither of these outputs appears, it is likely that an earlier step before running Jupyter Lab failed.
One possibility is a failure during model download.

Try re-running step 5-2, where you execute `python download_artifacts.py`.
The download process should take several tens of minutes.
If it completes immediately or returns an error, check for typos in the command and try again.

