---
id: peft_llama2_launcher01
title: "NeMo Megatron Launcherを利用したllama2のPEFT(parameter-efficient fine-tuning)の実行例"
---

Megatron Launcherを利用したファインチューニング例について以下に示します。

Megatron Launcherの実行環境については、[nemo-megatron-launcherの環境設定](/software/nemo#nemo-megatron-launcherの環境設定llm用)を参照して環境を設定してください。Megatron Launcherがホームディレクトリ下のいずれかのワークディレクトリにコピーされていることを前提とします。

コンテナの中のものをローカルディレクトリにコピーするには以下の様にします。遺伝研スパコンのSlurmでは以下のコマンドラインで実施します。
```
srun -N 1 --mem-per-cpu=50g --container-mounts=コンテナ外のコピー先ディレクトリ:/workspace/mount_dir --container-image=nvcr.io/nvidia/nemo:24.03.framework bash -c "cp -r /opt/NeMo-Megatron-Launcher /workspace/mount_dir"
```
## Hugging Faceからのモデルのダウンロード

まず、大元になるLlama2のモデルファイルをHugging Faceからダウンロードします。
以下の様なスクリプトを作成して、HFフォーマットのモデルのファイル一式をダウンロードします。
```python
import os
from huggingface_hub import snapshot_download
MODEL_DIR = "./models"
os.makedirs(MODEL_DIR, exist_ok=True)
snapshot_download(
   repo_id="meta-llama/Llama-2-7b-hf",
   local_dir=f"{MODEL_DIR}/Llama-2-7b-hf",
   local_dir_use_symlinks=False
)
```
スクリプトではhuggingface_hubのモジュールを利用している為、これが同梱されているNeMoフレームワークのコンテナ環境を利用します。
コンテナは前述の例などでダウンロード済みであるとして、起動します。
```
$ singularity run --nv ~/nemo_24.03.sif 
13:4: not a valid test operator: (
13:4: not a valid test operator: 545.23.06

===================
== NeMo Megatron ==
===================

NVIDIA Release  (build 82611821)
Container image Copyright (c) 2024, NVIDIA CORPORATION & AFFILIATES. All rights reserved.
Copyright (c) 2014-2024 Facebook Inc.
Copyright (c) 2011-2014 Idiap Research Institute (Ronan Collobert)
Copyright (c) 2012-2014 Deepmind Technologies    (Koray Kavukcuoglu)
Copyright (c) 2011-2012 NEC Laboratories America (Koray Kavukcuoglu)
Copyright (c) 2011-2013 NYU                      (Clement Farabet)
Copyright (c) 2006-2010 NEC Laboratories America (Ronan Collobert, Leon Bottou, Iain Melvin, Jason Weston)
Copyright (c) 2006      Idiap Research Institute (Samy Bengio)
Copyright (c) 2001-2004 Idiap Research Institute (Ronan Collobert, Samy Bengio, Johnny Mariethoz)
Copyright (c) 2015      Google Inc.
Copyright (c) 2015      Yangqing Jia
Copyright (c) 2013-2016 The Caffe contributors
All rights reserved.

Various files include modifications (c) NVIDIA CORPORATION & AFFILIATES.  All rights reserved.

This container image and its contents are governed by the NVIDIA Deep Learning Container License.
By pulling and using the container, you accept the terms and conditions of this license:
https://developer.nvidia.com/ngc/nvidia-deep-learning-container-license

Singularity>　python3 download.py
```
ダウンロードが完了すると以下のファイル群がダウンロードされています。
```
LICENSE.txt		   model-00001-of-00002.safetensors  special_tokens_map.json
README.md		   model-00002-of-00002.safetensors  tokenizer.json
Responsible-Use-Guide.pdf  model.safetensors.index.json      tokenizer.model
USE_POLICY.md		   pytorch_model-00001-of-00002.bin  tokenizer_config.json
config.json		   pytorch_model-00002-of-00002.bin
generation_config.json	   pytorch_model.bin.index.json
```
## フォーマットのコンバージョン処理(HF→nemoフォーマット)

次に、NeMoフレームワークで処理可能にする為、上記のHugging face形式のファイル群をnemoフォーマットに変換します。
Megatron Launcherのパラメータ設定を調整して実行することで、変換の為のslurmのジョブスクリプトファイルを生成、
自動実行することができます。

NeMo Megatron Launcherのconfディレクトリ内の各configuration fileを以下の様に設定していきます。bcm.yamlなどの基本的な
環境設定は、すでに設定されていることを前提にします。

`conf/config.yaml` ファイルの変更点

```
defaults:
  - conversion_hf2nemo: hf_llama2/convert_llama2_nemo
  - peft: llama/squad

stages:
  - conversion_hf2nemo
#  - peft
```
stageの conversion_hf2nemoが、Hugging FaceのフォーマットからNemoフォーマットへの変換処理になります。コメントアウトを外します。
設定したら、launcher_scriptのベースディレクトリで以下のコマンドラインを実行します。

```
python3 main.py
```
処理が実行されると`results/hf_llama2/convert_hf_llama2_to_nemo`ディレクトリ下にnemoフォーマットへのコンバージョン処理の処理ファイルとログ等が出力されます。`convert_hf_llama2_to_nemo`ディレクトリ下にはコンバート処理を実行する為のslurm用のジョブスクリプトも自動生成されて出力されます。出力後、これがlauncherによってslurmに自動的に投入されます。squeueコマンドなどで投入状態が確認できます。

```sh
#!/bin/bash

# Parameters
#SBATCH --dependency=singleton
#SBATCH --error=/home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts/results/hf_llama2/convert_hf_llama2_to_nemo/log-nemo-megatron-convert_hf_llama2_%j.err
#SBATCH --exclusive
#SBATCH --gpus-per-node=4
#SBATCH --job-name=nemo-megatron-convert_hf_llama2
#SBATCH --mem=0
#SBATCH --nodes=1
#SBATCH --ntasks-per-node=1
#SBATCH --output=/home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts/results/hf_llama2/convert_hf_llama2_to_nemo/log-nemo-megatron-convert_hf_llama2_%j.out

# setup
export TRANSFORMERS_OFFLINE=1
export TORCH_NCCL_AVOID_RECORD_STREAMS=1
export NCCL_NVLS_ENABLE=0
export NVTE_DP_AMAX_REDUCE_INTERVAL=0
export NVTE_ASYNC_AMAX_REDUCTION=1
export NVTE_FUSED_ATTN=0

# command 1
srun --output /home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts/results/hf_llama2/convert_hf_llama2_to_nemo/log-nemo-megatron-convert_hf_llama2_%j.out --error /home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts/results/hf_llama2/convert_hf_llama2_to_nemo/log-nemo-megatron-convert_hf_llama2_%j.err --container-image nvcr.io/nvidia/nemo:24.03 --container-mounts /home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts:/home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts,/home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts/data:/home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts/data,/home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts/results:/home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts/results --no-container-mount-home bash -c "
   "


# command 2
srun --output /home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts/results/hf_llama2/convert_hf_llama2_to_nemo/log-nemo-megatron-convert_hf_llama2_%j.out --error /home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts/results/hf_llama2/convert_hf_llama2_to_nemo/log-nemo-megatron-convert_hf_llama2_%j.err --container-image nvcr.io/nvidia/nemo:24.03 --container-mounts /home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts:/home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts,/home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts/data:/home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts/data,/home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts/results:/home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts/results --no-container-mount-home bash -c "
  python3 -u /opt/NeMo/scripts/checkpoint_converters/convert_llama_hf_to_nemo.py \
  --in-file=/home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts/data/hf_ckpt/ \
  --out-file=/home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts/data/results/llama2_7b.nemo "
```
しかしなんらかのバグが原因であると推測しますが、自動生成されたジョブスクリプトの中でのconvert_llama_hf_to_nemo.pyのコマンドラインオプションが間違っていてジョブの実行自体がしばらくするとエラーになります。（コンテナが起動されてスクリプトの処理が始まるとエラーになりそれより先に処理が進まない。）
```sh
 python3 -u /opt/NeMo/scripts/checkpoint_converters/convert_llama_hf_to_nemo.py \
  --in-file=/home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts/data/hf_ckpt/ \
  --out-file=/home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts/data/results/llama2_7b.nemo
```
この為、slurmに投入されたジョブを一回全てキャンセルして、上記を以下の様に修正してください。（オプションの指定子が違っている。指定されている内容はそのままで良い）
```sh
  python3 -u /opt/NeMo/scripts/checkpoint_converters/convert_llama_hf_to_nemo.py \
  --input_name_or_path=/home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts/data/hf_ckpt/ \
  --output_path=/home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts/data/results/llama2_7b.nemo 
```
上記の様にジョブスクリプトを修正したらこれをsbatchで手動でslurmに投入してください。

```
sbatch nemo-megatron-squad_llama2_7b_submission.sh
```
コンバートが正常に完了すれば以下の様なログがジョブの標準出力ファイルに出力されます。

```
[NeMo I 2024-06-10 16:28:16 tokenizer_utils:187] Getting SentencePiece with model: /home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts/data/hf_ckpt/tokenizer.model
[NeMo I 2024-06-10 16:28:16 megatron_base_model:580] Padded vocab_size: 32000, original vocab_size: 32000, dummy tokens: 0.
[NeMo I 2024-06-10 16:30:04 convert_llama_hf_to_nemo:283] NeMo model saved to: /home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts/data/results/llama2_7b.nemo
```

## PEFT処理の実行

nemoフォーマットへのコンバージョン処理が完了したら、PEFTをV100で実行する為の調整を行います（A100/H100 8GPU構成であれば不要な調整です）。`conf/peft/llama/squad.yaml`ファイルを編集します。ハイライト部分が変更箇所です。micro_batch_sizeとtensor_parallel_sizeは遺伝研スパコンのGPUがV100 4基である為調整しています。調整の仕方はこれ一通りではなく、その他の調整も可能とは思います。以下の調整は極力１ノード4GPUでV100のメモリ溢れを起こさない様に調整するとこうなる。という一例です。また計算時間の上限(time_limit)が最初4時間に設定されていますが、そのままだとSlurmによって計算が中断されてしまうので、400時間に緩和しておきます。
```js
name: megatron_llama_peft_tuning-${peft.model.peft.peft_scheme}

run:
  name: ${.task_name}_${.model_train_name}
  //highlight-next-line
  time_limit: "400:00:00"
  dependency: "singleton"
  convert_name: convert_nemo
  model_train_name: llama2_7b
  convert_dir: ${base_results_dir}/${.model_train_name}/${.convert_name}
  task_name: "squad"
  results_dir: ${base_results_dir}/${.model_train_name}/peft_${.name}

trainer:
//highlight-next-line
  devices: 4
  accelerator: gpu
  num_nodes: 1
  precision: bf16
  logger: False # logger provided by exp_manager
  enable_checkpointing: False
  use_distributed_sampler: False
//highlight-start
  max_epochs: 1999
  max_steps: 2000 # consumed_samples = global_step * micro_batch_size * data_parallel_size * accumulate_grad_batches
//highlight-end
  log_every_n_steps: 10 # frequency with which training steps are logged 
  val_check_interval: 200 # If is an int n > 1, will run val every n training steps, if a float 0.0 - 1.0 will run val every epoch fraction, e.g. 0.25 will run val every quarter epoch
  gradient_clip_val: 1.0

exp_manager:
  explicit_log_dir: ${peft.run.results_dir}/results
  exp_dir: null
  name: ${peft.name}
  create_wandb_logger: False
  wandb_logger_kwargs:
    project: nemo_llama2_${peft.run.task_name}
    name: ${peft.run.name}
  resume_if_exists: True
  resume_ignore_no_checkpoint: True
  create_checkpoint_callback: True
  checkpoint_callback_params:
    monitor: validation_${peft.model.data.validation_ds.metric.name}
    save_top_k: 1
    mode: min
    save_nemo_on_train_end: True
    filename: '${peft.name}--{${peft.exp_manager.checkpoint_callback_params.monitor}:.3f}-{step}-{consumed_samples}'
    model_parallel_size: ${peft.model.tensor_model_parallel_size}
    always_save_nemo: False
    save_best_model: True
  create_early_stopping_callback: True
  early_stopping_callback_params:
    monitor: "val_loss"
    mode: "min"
    min_delta: 0.001
    patience: 10
    verbose: True
    strict: False # Should be False to avoid a runtime error where EarlyStopping says monitor is unavailable, which sometimes happens with resumed training.

model:
  seed: 1234
//highlight-next-line
  tensor_model_parallel_size: 4 # intra-layer model parallelism
  pipeline_model_parallel_size: 1 # inter-layer model parallelism

  global_batch_size: 128
//highlight-next-line
  micro_batch_size: 1
//highlight-next-line
  restore_from_path: /home/xxxx/llama/NeMo-Megatron-Launcher/launcher_scripts/data/results/megatron_llama.nemo # Path to an existing .nemo model you wish to add new tasks to or run inference with
  resume_from_checkpoint: null # The path to a checkpoint file to continue the training, restores the whole state including the epoch, step, LR schedulers, apex, etc.
  save_nemo_on_validation_end: False # Saves an inference ready .nemo file every time a checkpoint is saved during training. 
  sync_batch_comm: False
  megatron_amp_O2: False
  mcore_gpt: True

  ## Sequence Parallelism
  # Makes tensor parallelism more memory efficient for LLMs (20B+) by parallelizing layer norms and dropout sequentially
  # See Reducing Activation Recomputation in Large Transformer Models: https://arxiv.org/abs/2205.05198 for more details.
  sequence_parallel: False

  ## Activation Checkpoint 
  activations_checkpoint_granularity: null # 'selective' or 'full' 
  activations_checkpoint_method: null # 'uniform', 'block', not used with 'selective'
  # 'uniform' divides the total number of transformer layers and checkpoints the input activation
  # of each chunk at the specified granularity
  # 'block' checkpoints the specified number of layers per pipeline stage at the specified granularity
  activations_checkpoint_num_layers: null # not used with 'selective'
  activations_checkpoint_layers_per_pipeline: null
  answer_only_loss: True
  gradient_as_bucket_view: False

  hidden_dropout: 0.0
  attention_dropout: 0.0
  ffn_dropout: 0.0

  # FSDP
  fsdp: False # Enable training with torch FSDP.
  fsdp_sharding_strategy: 'full' # Method to shard model states. Available options are 'full', 'hybrid', and 'grad'.
  fsdp_grad_reduce_dtype: 'bf16' # Gradient reduction data type.
  fsdp_sharded_checkpoint: False # Store and load FSDP shared checkpoint.
  fsdp_use_orig_params: False # Set to True to use FSDP for specific peft scheme.

  peft:
    peft_scheme: "lora"  # can be either adapter, ia3, lora, or ptuning
    restore_from_path: null

    # Used for adapter peft training
    adapter_tuning:
      type: 'parallel_adapter' # this should be either 'parallel_adapter' or 'linear_adapter'
      adapter_dim: 32
      adapter_dropout: 0.0
      norm_position: 'pre' # This can be set to 'pre', 'post' or null, 'pre' is normally what is used.
      column_init_method: 'xavier' # IGNORED if linear_adapter is used, options: xavier, zero or normal
      row_init_method: 'zero' # IGNORED if linear_adapter is used, options: xavier, zero or normal
      norm_type: 'mixedfusedlayernorm' # IGNORED if layer_adapter is used,  options are ['layernorm', 'mixedfusedlayernorm']
      layer_selection: null  # selects in which layers to add adapters, e.g. [1,12] will add adapters to layer 1 (lowest) and 12. null will apply adapters to all layers
      weight_tying: False
      position_embedding_strategy: null # used only when weight_tying is True

    lora_tuning:
      adapter_dim: 32
      adapter_dropout: 0.0
      column_init_method: 'xavier' # IGNORED if linear_adapter is used, options: xavier, zero or normal
      row_init_method: 'zero' # IGNORED if linear_adapter is used, options: xavier, zero or normal
      layer_selection:  null  # selects in which layers to add lora adapters. e.g. [1,12] will add lora to layer 1 (lowest) and 12. null will apply adapters to all layers
      weight_tying: False
      position_embedding_strategy: null # used only when weight_tying is True

    # Used for p-tuning peft training
    p_tuning:
      virtual_tokens: 10  # The number of virtual tokens the prompt encoder should add at the start of the sequence
      bottleneck_dim: 1024  # the size of the prompt encoder mlp bottleneck
      embedding_dim: 1024  # the size of the prompt encoder embeddings
      init_std: 0.023

    ia3_tuning:
      layer_selection:  null  # selects in which layers to add ia3 adapters. e.g. [1,12] will add lora to layer 1 (lowest) and 12. null will apply adapters to all layers

  data:
    train_ds:
      # Example of how to specify paths to multiple datasets
      # file_names: 
      #   - /path/to/squad.jsonl
      #   - /path/to/mnli.jsonl
      #   - /path/to/boolq.jsonl
      # Example of how each dataset is formatted
      # {'input': 'John von Neumann\nVon Neumann made fundamental contributions .... Q: What did the math of artificial viscosity do?', 'output': 'smoothed the shock transition without sacrificing basic physics'}
      file_names:
      - ${data_dir}/squad_data/v1.1/train-v1.1_gpt.json # Path to a list of JSONL files corresponding to the source data.
      global_batch_size: ${peft.model.global_batch_size}
      micro_batch_size: ${peft.model.micro_batch_size}
      shuffle: True
//highlight-next-line
      num_workers: 6
      memmap_workers: 2
      pin_memory: True
      max_seq_length: 4096
      min_seq_length: 1
      drop_last: True
      # Example of how to specify concat_sampling_probabilities
      # concat_sampling_probabilities:
      #   - 0.5
      #   - 0.25
      #   - 0.25
      concat_sampling_probabilities:
      - 1.0 # When providing a list of datasets, this arg defines the sampling probabilities from each dataset when strategy='random'
      context_key: 'input'
      label_key: 'output'
      add_eos: True
      add_sep: False
      add_bos: True
      separate_prompt_and_response_with_newline: False
      truncation_field: "context" # Options: ['context', 'answer']
      index_mapping_dir: null # Path to a directory to write index mapping files.
      prompt_template: "{input} {output}" # fstring to use for assistant prompt. Example: "Q: {input}\nA: {output}"

    validation_ds:
      file_names: 
      - ${data_dir}/squad_data/v1.1/dev-v1.1_gpt.json # Path to a list of JSONL files corresponding to the source data. Data format is identical to train_ds.
      names:
      - ${peft.run.task_name} # Names of the corresponding datasets used to log metrics.
      global_batch_size: ${peft.model.global_batch_size}
      micro_batch_size: ${peft.model.micro_batch_size}
      shuffle: False
//highlight-next-line
      num_workers: 6
      memmap_workers: ${peft.model.data.train_ds.memmap_workers}
      pin_memory: True
      max_seq_length: ${peft.model.data.train_ds.max_seq_length}
      min_seq_length: ${peft.model.data.train_ds.min_seq_length}
      drop_last: False
      context_key: 'input'
      label_key: 'output'
      add_eos: ${peft.model.data.train_ds.add_eos}
      add_sep: ${peft.model.data.train_ds.add_sep}
      add_bos: ${peft.model.data.train_ds.add_bos}
      separate_prompt_and_response_with_newline: ${peft.model.data.train_ds.separate_prompt_and_response_with_newline}
      write_predictions_to_file: False
      output_file_path_prefix: null # Prefix of the file to write predictions to.
      truncation_field: "context" # Options: ['context', 'answer']
      index_mapping_dir: null # Path to a directory to write index mapping files.
      prompt_template: ${peft.model.data.train_ds.prompt_template} # fstring to use for assistant prompt. Example: "Q: {input}\nA: {output}"
      tokens_to_generate: 32 # decide how many tokens we want to generate to evaluate performance with string metrics
      metric:
        name: "loss" # Name of the evaluation metric to use. Options: ['exact_string_match', 'loss']
        average: null # Average the metric over the dataset. Options: ['macro', 'micro']. Works only for 'F1', 'accuracy' etc. Refer to torchmetrics for metrics where this is supported.
        num_classes: null
    test_ds:
        file_names: ${peft.model.data.validation_ds.file_names} # Path to a list of JSONL files corresponding to the source data. Data format is identical to train_ds.
        names: null # Names of the corresponding datasets used to log metrics.
        global_batch_size: ${peft.model.global_batch_size}
        micro_batch_size: ${peft.model.micro_batch_size}
        shuffle: False
//highlight-next-line
        num_workers: 6
        memmap_workers: ${peft.model.data.train_ds.memmap_workers}
        pin_memory: True
        max_seq_length: ${peft.model.data.train_ds.max_seq_length}
        min_seq_length: ${peft.model.data.train_ds.min_seq_length}
        drop_last: False
        context_key: 'input'
        label_key: 'output'
        add_eos: ${peft.model.data.train_ds.add_eos}
        add_sep: ${peft.model.data.train_ds.add_sep}
        add_bos: ${peft.model.data.train_ds.add_bos}
        separate_prompt_and_response_with_newline: ${peft.model.data.train_ds.separate_prompt_and_response_with_newline}
        write_predictions_to_file: False
        output_file_path_prefix: null # Prefix of the file to write predictions to.
        truncation_field: "context" # Options: ['context', 'answer']
        index_mapping_dir: null # Path to a directory to write index mapping files.
        prompt_template: ${peft.model.data.train_ds.prompt_template}
        tokens_to_generate: 32 # decide how many tokens we want to generate to evaluate performance with string metrics
        metric:
          name: "loss" # Name of the evaluation metric to use. Options: ['exact_string_match', 'loss']
          average: null # Average the metric over the dataset. Options: ['macro', 'micro']. Works only for 'F1', 'accuracy' etc. Refer to torchmetrics for metrics where this is supported.
          num_classes: null

  optim:
    name: fused_adam
    lr: 1e-4
    weight_decay: 0.01 
    betas: 
    - 0.9
    - 0.98
    sched:
      name: CosineAnnealing
      warmup_steps: 50
      min_lr: 0.0 # min_lr must be 0.0 for prompt learning when pipeline parallel > 1
      constant_steps: 0 # Constant steps should also be 0 when min_lr=0
      monitor: val_loss
      reduce_on_plateau: false

```
上記の設定の中で、`sequence_parallel`については、大規模なパラメータ数のLLMのGPUメモリ利用量の効率をあげる為の設定とのことで、設定して確認しました。効果はあったのですが、計算の過程でやはりメモリ溢れを起こすのでFalseに戻して計算を実施しました。その他のパラメータについては上記のハイライト部分を確認願います。


上記の設定では訓練,評価用のQAデータセットとしてはSQuADというものがデフォルトでは使われています。

[SQuAD(The Stanford Question Answering Datasets)](https://rajpurkar.github.io/SQuAD-explorer/)
は質問型応答データセットとして有名なデータセットで、機械がパッセージを読み、それに関する質問に対して答える能力をテストする為に利用されます。

自分のデータでLLMをカスタマイズしたい場合はこのSQuADのデータセットではなく、自分のデータを利用してファインチューニングをかけることになると考えますが、ここでは例としてLauncherの初期設定のままで実行します。

この処理では前述のHF->Nemoフォーマットのコンバート処理で生成したllama2_7Bのnemoフォーマットファイルを入力にファインチューニング処理を実行します。上記ファイルの変更箇所のうち、`restore_from_path:`の部分でパスを指定しています。環境に合わせて変更してください。

上記の準備ができたら、以下の様にコメントアウトを外してください。
```
stages:
#  - conversion_hf2nemo
  - peft
```
以下のコマンドラインを入力してPEFT処理を実行します。
```
python3 main.py
```
`results/llama2_7b/peft_squad_llama2_7b`ディレクトリ下にPEFTの処理ファイルとログが出力され、ジョブがslurmに投入されます。

本体の処理が起動されたら、nvidia-smiなどでGPUメモリ溢れが起きないかをしばらく見てください。Slurmの場合は、srunコマンドを以下の様に投入すれば
ジョブが投入されているノード上でnvidia-smiを実行することができます。

```
srun --jobid=確認したいJOBのJobID nvidia-smi
```
メモリ溢れが起きていれば、4つ起動されているはずのpythonスクリプトのプロセスが4つ無かったり、4つのプロセスの中で一つだけGPUメモリの使用量が少ないものがあったりします。またその場合ジョブのエラー出力にもメモリ溢れが起きたことを示すログが出力されています。そのような場合は、scancelでジョブをキャンセルし、パラメータの見直しを行なってから再実行してください。上記のパラメータ設定でのGPUメモリの利用状態は以下の様になります。

```js
Sat Jun 15 10:27:47 2024       
+---------------------------------------------------------------------------------------+
| NVIDIA-SMI 545.23.06              Driver Version: 545.23.06    CUDA Version: 12.3     |
|-----------------------------------------+----------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |         Memory-Usage | GPU-Util  Compute M. |
|                                         |                      |               MIG M. |
|=========================================+======================+======================|
|   0  Tesla V100-SXM2-16GB           Off | 00000000:15:00.0 Off |                    0 |
| N/A   62C    P0             262W / 300W |  15139MiB / 16384MiB |    100%      Default |
|                                         |                      |                  N/A |
+-----------------------------------------+----------------------+----------------------+
|   1  Tesla V100-SXM2-16GB           Off | 00000000:16:00.0 Off |                    0 |
| N/A   72C    P0             285W / 300W |  15103MiB / 16384MiB |    100%      Default |
|                                         |                      |                  N/A |
+-----------------------------------------+----------------------+----------------------+
|   2  Tesla V100-SXM2-16GB           Off | 00000000:3A:00.0 Off |                    0 |
| N/A   61C    P0             265W / 300W |  15211MiB / 16384MiB |    100%      Default |
|                                         |                      |                  N/A |
+-----------------------------------------+----------------------+----------------------+
|   3  Tesla V100-SXM2-16GB           Off | 00000000:3B:00.0 Off |                    0 |
| N/A   78C    P0             291W / 300W |  15151MiB / 16384MiB |    100%      Default |
|                                         |                      |                  N/A |
+-----------------------------------------+----------------------+----------------------+
                                                                                         
+---------------------------------------------------------------------------------------+
| Processes:                                                                            |
|  GPU   GI   CI        PID   Type   Process name                            GPU Memory |
|        ID   ID                                                             Usage      |
|=======================================================================================|
//highlight-start
|    0   N/A  N/A   1833610      C   python3                                   15132MiB |
|    1   N/A  N/A   1833611      C   python3                                   15096MiB |
|    2   N/A  N/A   1833612      C   python3                                   15204MiB |
|    3   N/A  N/A   1833613      C   python3                                   15144MiB |
//highlight-end
+---------------------------------------------------------------------------------------+

```
PEFT処理が正常に進行している場合は、以下の様に、処理ステップが表示されていきます。reduced_train_loss,val_lossが傾向として減少していく方向であることを
確認してください。この数値が十分に小さく収束すれば学習は完了します。このval_lossがある程度大きな数値のまま停滞してしまった場合は学習が停滞してしまっていることが疑われます。（ただ一概には絶対そうとも言えない場合もあるようです。）
```
Epoch 0: : 100%|██████████| 2000/2000 [43:24:54<00:00, reduced_train_loss=0.139, global_step=2e+3, consumed_samples=2.56e+5, train_step_timing in s=68.70, val_loss=0.212][NeMo I 2024-06-17 08:36:41 nlp_overrides:480] Removing checkpoint: /home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts/results/llama2_7b/peft_squad_llama2_7b/results/checkpoints/mp_rank_00/megatron_llama_peft_tuning-lora--validation_loss=0.211-step=1800-consumed_samples=230400.0-last.ckpt
^MEpoch 0: : 100%|██████████| 2000/2000 [43:24:54<00:00, reduced_train_loss=0.139, global_step=2e+3, consumed_samples=2.56e+5, train_step_timing in s=68.70, val_loss=0.212]^MEpoch 0: : 100%|██████████| 2000/2000 [43:24:54<00:00, reduced_train_loss=0.139, global_step=2e+3, consumed_samples=2.56e+5, train_step_timing in s=68.70, val_loss=0.212]
```
何回か試行するとval_lossが0.211-0.212以上改善しない傾向があり、過学習を避けるため、ステップ数を抑えました。

## 評価処理の実行

ファインチューニングの状況を確認する為に評価処理を実行してみます。以下の様に設定します。

```js
run:
  name: eval_${.task_name}_${.model_train_name}
//highlight-next-line
  time_limit: "100:00:00"
  dependency: "singleton"
  convert_name: convert_nemo
  model_train_name: llama2_7b
  task_name: "squad"  # SQuAD v1.1
  convert_dir: ${base_results_dir}/${.model_train_name}/${.convert_name}
  fine_tuning_dir: ${base_results_dir}/${.model_train_name}/peft_${.task_name}
  results_dir: ${base_results_dir}/${.model_train_name}/peft_${.task_name}_eval

trainer:
//highlight-next-line
  devices: 4
  num_nodes: 1
  accelerator: gpu
  precision: bf16
  logger: False # logger provided by exp_manager
  enable_checkpointing: False
  use_distributed_sampler: False
  log_every_n_steps: 10


exp_manager:
  explicit_log_dir: ${evaluation.run.results_dir}/results
  exp_dir: null
  name: megatron_t5_${evaluation.run.task_name}_eval
  create_checkpoint_callback: False

model:
  seed: 1234
  tensor_model_parallel_size: 4
  pipeline_model_parallel_size: 1

  global_batch_size: 32
  micro_batch_size: 4
#  restore_from_path: ${evaluation.run.convert_dir}/results/megatron_llama.nemo # Path to converted llama .nemo file
//highlight-next-line
  restore_from_path: /home/yxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts/data/results/megatron_llama.nemo # Path to converted llama .nemo file
  resume_from_checkpoint: null
  save_nemo_on_validation_end: True
  sync_batch_comm: False
  megatron_amp_02: False

  sequence_parallel: False

  activations_checkpoint_granularity: null
  activations_checkpoint_method: null
  activations_checkpoint_num_layers: null
  activations_checkpoint_layers_per_pipeline: null
  answer_only_loss: False
  gradient_as_bucket_view: False

  hidden_dropout: 0.0
  attention_dropout: 0.0
  ffn_dropout: 0.0

  peft:
#    peft_scheme: "ptuning"  # can be either adapter,ia3, or ptuning
//highlight-next-line
    peft_scheme: "lora"  # can be either adapter,ia3, or ptuning
#    restore_from_path: ${evaluation.run.fine_tuning_dir}/${.peft_scheme}/megatron_llama_peft_tuning-${.peft_scheme}/checkpoints/megatron_llama_peft_tuning-{.peft_scheme}.nemo
//highlight-next-line
    restore_from_path: /home/xxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts/results/llama2_7b/peft_squad_llama2_7b/results/checkpoints/megatron_llama_peft_tuning-lora.nemo
    restore_from_ckpt_name: null
    restore_from_hparams_path: null

    # Used for adapter peft training
    adapter_tuning:
      type: 'parallel_adapter' # this should be either 'parallel_adapter' or 'linear_adapter'
      adapter_dim: 32
      adapter_dropout: 0.0
      norm_position: 'pre' # This can be set to 'pre', 'post' or null, 'pre' is normally what is used.
      column_init_method: 'xavier' # IGNORED if linear_adapter is used, options: xavier, zero or normal
      row_init_method: 'zero' # IGNORED if linear_adapter is used, options: xavier, zero or normal
      norm_type: 'mixedfusedlayernorm' # IGNORED if layer_adapter is used,  options are ['layernorm', 'mixedfusedlayernorm']
      layer_selection: null  # selects in which layers to add adapters, e.g. [1,12] will add adapters to layer 1 (lowest) and 12. null will apply adapters to all layers
      weight_tying: False
      position_embedding_strategy: null # used only when weight_tying is True

    lora_tuning:
      adapter_dim: 32
      adapter_dropout: 0.0
      column_init_method: 'xavier' # IGNORED if linear_adapter is used, options: xavier, zero or normal
      row_init_method: 'zero' # IGNORED if linear_adapter is used, options: xavier, zero or normal
      layer_selection:  null  # selects in which layers to add lora adapters. e.g. [1,12] will add lora to layer 1 (lowest) and 12. null will apply adapters to all layers
      weight_tying: False
      position_embedding_strategy: null # used only when weight_tying is True

    # Used for p-tuning peft training
    p_tuning:
      virtual_tokens: 10  # The number of virtual tokens the prompt encoder should add at the start of the sequence
      bottleneck_dim: 1024  # the size of the prompt encoder mlp bottleneck
      embedding_dim: 1024  # the size of the prompt encoder embeddings
      init_std: 0.023

    ia3_tuning:
      layer_selection:  null  # selects in which layers to add ia3 adapters. e.g. [1,12] will add lora to layer 1 (lowest) and 12. null will apply adapters to all layers 

  data:
    test_ds:
      file_names: 
        - ${data_dir}/squad_data/v1.1/dev-v1.1_gpt.json
      test_names:
        - squad
      global_batch_size: 32
      micro_batch_size: 4
      shuffle: False
      num_workers: 4
      pin_memory: True
      max_seq_length: 2048
      min_seq_length: 1
      drop_last: False
      context_key: 'input'
      label_key: 'output'   
      add_eos: True
      add_sep: False
      add_bos: False
      write_predictions_to_file: True
      output_file_path_prefix: ${evaluation.run.results_dir}/results/predictions
      truncation_field: "context"
      index_mapping_dir: null
      prompt_template: "{input} {output}"
      tokens_to_generate: 20
      truncation_method: 'right'

      metric:
        name: "exact_string_match" # Name of the evaluation metric to use.
        average: null # Average the metric over the dataset. Options: ['macro', 'micro']. Works only for 'F1', 'accuracy' etc. Refer to torchmetrics for metrics where this is supported.
        num_classes: null

inference:
  greedy: True # Whether or not to use sampling ; use greedy decoding otherwise
  top_k: 0  # The number of highest probability vocabulary tokens to keep for top-k-filtering.
  top_p: 0.9 # If set to float < 1, only the most probable tokens with probabilities that add up to top_p or higher are kept for generation.
  temperature: 1.0 # sampling temperature
  all_probs: False  # whether return the log prob for all the tokens in vocab
  repetition_penalty: 1.2  # The parameter for repetition penalty. 1.0 means no penalty.
  min_tokens_to_generate: 0  # The minimum length of the sequence to be generated.
  compute_logprob: False  # a flag used to compute logprob of all the input text, a very special case of running inference, default False
  outfile_path: output.txt
  compute_attention_mask: True

# server-related configs
server: False  # whether launch the API server
port: 5555 # the port number for the inference server
web_server: False # whether launch the web inference server
share: True  # whether create a public URL
username: test # user name for web client
password: test2  # password for web client
web_port: 9889 # the port number of the web server 1058
chat: False # use the chat interface
chatbot_config:
  value: False   # whether to inject the value attributes
  attributes:
    - name: Quality
      min: 0
      max: 4
      key: quality
      type: int
      default: 4
    - name: Toxicity
      min: 0
      max: 4
      key: toxcity
      type: int
      default: 0
    - name: Humor
      min: 0
      max: 4
      key: humor
      type: int
      default: 0
    - name: Creativity
      min: 0
      max: 4
      key: creativity
      type: int
      default: 0
    - name: Violence
      min: 0
      max: 4
      key: violence
      type: int
      default: 0
    - name: Helpfulness
      min: 0
      max: 4
      key: helpfulness
      type: int
      default: 4
    - name: Not_Appropriate
      min: 0
      max: 4
      key: not_appropriate
      type: int
      default: 0
    - name: Language
      choices: ['ar', 'bg', 'bn', 'ca', 'cs', 'da', 'de', 'el', 'en', 'eo', 'es', 'eu', 'fa', 'fi', 'fr', 'gl', 'he', 'hu', 'id', 'it', 'ja', 'ko', 'nb', 'nl', 'pl', 'pt', 'ro', 'ru', 'sk', 'sv', 'th', 'tr', 'uk', 'vi', 'zh']
      key: lang
      type: list
      default: en
   
  user: User
  assistant: Assistant
  system: "A chat between a curious human and an artificial intelligence assistant. The assistant gives helpful, detailed, and polite answers to the human's questions.\n\n"
```
設定をしたら、launcherのベースディレクトリで以下の様にコマンドを実行します。

```
python3 main.py
```
ジョブがslurmに登録されるのでsqueueコマンドなどで確認して下さい。ジョブの実行が完了すると以下の様なメッセージが出力されます。
```
[NeMo I 2024-06-17 11:16:04 megatron_gpt_sft_model:548] test exact_string_match: 0.6505203247070312
[NeMo I 2024-06-17 11:16:04 megatron_gpt_sft_model:555] Total deduplicated inference data size: 10592 to 10570
[NeMo I 2024-06-17 11:16:04 megatron_gpt_sft_model:706] Predictions saved to /home/yxxxx-pg/llama/NeMo-Megatron-Launcher/launcher_scripts/results/llama2_7b/peft_squad_eval/results/predictions_test_dataloader0_inputs_preds_labels.jsonl
Testing DataLoader 0: 100%|██████████| 331/331 [2:28:21<00:00,  0.04it/s]
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃             Test metric             ┃            DataLoader 0             ┃
┡━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩
│       test_exact_string_match       │         0.6505203247070312          │
│ test_exact_string_match_dataloader0 │         0.6505203247070312          │
│              test_loss              │         3.2306129932403564          │
│        test_loss_dataloader0        │         3.2306129932403564          │
│              val_loss               │         3.2306129932403564          │
└─────────────────────────────────────┴─────────────────────────────────────┘
```
#### test_exact_string_match
 テストデータに対する厳密な文字列一致率を示します。数値としては比較的高いですが改善が必要な数値と考えられます。
#### test_loss
 テストデータに対する損失値です。損失が低いほどモデルの精度が高いとされます。今回の数値は改善が必要です。
#### val_loss
 検証データに対する損失地です。テストデータに対する損失値と同一値なので、モデルの過学習は起きていないことを表しています。

何回かパラメータを変更して試行し改善をはかろうとしましたが、V100ですとGPUメモリ溢れを起こしてしまい本記事の執筆時にはこれを回避できていません。

改善の手段としては以下の様なことが考えられます。

- ハイパーパラメータの調整
　　学習率やバッチサイズの調整を行うことで改善をはかります。(ただし、MBSの大きさがGPUメモリの使用量に関係する為試行錯誤しています。）

申し訳ありませんが、あくまでMegatron Launcherを利用した場合のファインチューニングの手順を示すという観点で参考にお示しします。



