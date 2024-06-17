---
id: peft_tutorial01
title: "Llama2-7bを利用したPEFTファインチューニング例"
---
本ページではNVIDIA社から例題として提供いただいた「シェルスクリプトマガジン 2024 June Vol90」 のファインチューニングの
チュートリアルを遺伝研スパコン上で実行した例を示します。

チュートリアルの中で利用しているモデルは、株式会社ELYZAがLlama2をベースにして日本語処理能力を拡張する為に事前追加学習を行ったELYZA-japanese-Llama2-7bになります。モデルの詳細については [このブログ](https://note.com/elyza/n/na405acaca130)に書かれているので参照してください。
この例は、ELYZA-japanese-Llama2-7bをベースのLLMとしてPEFT(Parameter-Efficient Fine-Tuning)というファインチューニング手法を適用しています。PEFTとは元のLLMのパラメータは固定して、少数のパラメータと階層を付加してカスタマイズ用データを追加で学習させる手法です。全体の再学習を実施するより少ない計算量でLLMをユーザ個別のデータでカスタマイズすることが可能です。以下、手順を追って示します。

## 環境準備

### 　NeMo flameworkのコンテナダウンロード

実施に必要なツール一式が含まれるNeMo FrameworkのコンテナイメージをNGCからダウンロードします。オリジナルの記事のなかではdockerを利用していますが、遺伝研スパコンの場合セキュリティの観点からdockerの利用ができない設定になっていますので、以下のようにsingularityにdocker imageをインポートして環境を利用してください。`--docker-login`オプションをつけて、NGCにアクセスする為にユーザ名`$oauthtoken`を入力し、パスワードとしては保存しているNGC API keyを入力してください。

また以降の手順は、GPUサーバにログインして実施してください。

```
$ singularity pull --docker-login docker://nvcr.io/nvidia/nemo:24.03
Enter Docker Username: $oauthtoken
Enter Docker Password: 
INFO:    Converting OCI blobs to SIF format
INFO:    Starting build...
Getting image source signatures
Copying blob ce8cc979c12e done   | 
Copying blob ce8cc979c12e done   | 
Copying blob ce8cc979c12e done   | 
Copying blob ce8cc979c12e done   | 
Copying blob b4655ab72d66 done   | 
(以下省略)
```
pullが成功すると以下のようにsifファイルが作成されます。

```
$ ls -l nemo_24.03.sif 
-rwxr-xr-x 1 yxxx xxxxx 17007312896 May  6 12:22 nemo_24.03.sif
```
`--nv`オプションをつけてGPUを利用可能な形でコンテナを実行します。nvidia-smiコマンドなどでコンテナ内の環境からGPU環境が参照できていることを
確認してください。

```
$ singularity run --nv ./nemo_24.03.framework.sif 
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

Singularity> 
```
また利用するスクリプトのディレクトリなどは/opt/NeMoの下に配置されているので確認してください。
作業用のディレクトリとして、例えばex01というディレクトリを作成して、その中に以下のスクリプトを配置します。

- モデルのダウンロード用スクリプト(download.py)

hugging face hubにアクセスしてモデルのダウンロードを実施します。
```python
import os
from huggingface_hub import snapshot_download
MODEL_DIR = "./models"
os.makedirs(MODEL_DIR, exist_ok=True)
snapshot_download(
   repo_id="elyza/ELYZA-japanese-Llama-2-7b",
   local_dir=f"{MODEL_DIR}/ELYZA-japanese-Llama-2-7b",
   local_dir_use_symlinks=False
)
```
モデルのダウンロードを実行してください。
```
download.py
```
しばらく時間がかかります。モデルのダウンロードが完了すると以下のディレクトリ構造ができます。
```
$ ls -lR ./models/
./models/:
total 4
drwxr-xr-x 3 yxxxx-pg co-xxx-pg 4096 Jun  6 15:23 ELYZA-japanese-Llama-2-7b

./models/ELYZA-japanese-Llama-2-7b:
total 26330564
-rw-r--r-- 1 yxxxx-pg co-xxx-pg 13478195200 Jun  6 15:24 ELYZA-japanese-Llama-2-7b.nemo
-rw-r--r-- 1 yxxxx-pg co-xxx-pg        7019 Jun  6 15:01 LICENCE.txt
-rw-r--r-- 1 yxxxx-pg co-xxx-pg        5161 Jun  6 15:01 README.md
-rw-r--r-- 1 yxxxx-pg co-xxx-pg         632 Jun  6 15:01 config.json
-rw-r--r-- 1 yxxxx-pg co-xxx-pg         154 Jun  6 15:01 generation_config.json
-rw-r--r-- 1 yxxxx-pg co-xxx-pg     4920287 Jun  6 15:01 key_visual.png
-rw-r--r-- 1 yxxxx-pg co-xxx-pg  9976634558 Jun  6 15:10 pytorch_model-00001-of-00002.bin
-rw-r--r-- 1 yxxxx-pg co-xxx-pg  3500315539 Jun  6 15:05 pytorch_model-00002-of-00002.bin
-rw-r--r-- 1 yxxxx-pg co-xxx-pg       26788 Jun  6 15:01 pytorch_model.bin.index.json
-rw-r--r-- 1 yxxxx-pg co-xxx-pg         437 Jun  6 15:01 special_tokens_map.json
-rw-r--r-- 1 yxxxx-pg co-xxx-pg     1842767 Jun  6 15:01 tokenizer.json
-rw-r--r-- 1 yxxxx-pg co-xxx-pg      499723 Jun  6 15:01 tokenizer.model
-rw-r--r-- 1 yxxxx-pg co-xxx-pg         725 Jun  6 15:01 tokenizer_config.json
```
次に、モデルをNeMo Frameworkで処理可能な形式(nemo)に変換を行います。以下のコマンドラインを実施してください。
```
Singularity> python /opt/NeMo/scripts/checkpoint_converters/convert_llama_hf_to_nemo.py \
--input_name_or_path=./models/ELYZA-japanese-Llama-2-7b \
--output_path=./models/ELYZA-japanese-Llama-2-7b/ELYZA-japanese-Llama-2-7b.nemo --precision="16"

[NeMo I 2024-06-06 15:18:33 convert_llama_hf_to_nemo:99] loading checkpoint ./models/ELYZA-japanese-Llama-2-7b
Loading checkpoint shards: 100%|██████████████████████████████████████████████████████████████████| 2/2 [03:03<00:00, 91.76s/it]
hf_config: {'vocab_size': 32000, 'max_position_embeddings': 4096, 'hidden_size': 4096, 'intermediate_size': 11008, 'num_hidden_layers': 32, 'num_attention_heads': 32, 'num_key_value_heads': 32, 'hidden_act': 'silu', 'initializer_range': 0.

（省略）

'./models/ELYZA-japanese-Llama-2-7b', '_commit_hash': None, '_attn_implementation_internal': 'sdpa', 'transformers_version': '4.30.2', 'model_type': 'llama', 'tokenizer_model': './models/ELYZA-japanese-Llama-2-7b/tokenizer.model'}
named parameters:
- model.embed_tokens.weight
- model.layers.0.self_attn.q_proj.weight
- model.layers.0.self_attn.k_proj.weight
- model.layers.0.self_attn.v_proj.weight
- model.layers.0.self_attn.o_proj.weight

(省略)

- model.layers.31.input_layernorm.weight
- model.layers.31.post_attention_layernorm.weight
- model.norm.weight
- lm_head.weight
[NeMo W 2024-06-06 15:21:39 nemo_logging:349] /usr/local/lib/python3.10/dist-packages/pytorch_lightning/_graveyard/precision.py:49: The `MixedPrecisionPlugin` is deprecated. Use `pytorch_lightning.plugins.precision.MixedPrecision` instead.
    
nemo_config: {'mcore_gpt': True, 'micro_batch_size': 4, 'global_batch_size': 8, 'tensor_model_parallel_size': 1, 'pipeline_model_parallel_size': 1, 'virtual_pipeline_model_parallel_size': None, 'encoder_seq_length': 4096, 

（省略）

tart_step': 10, 'end_step': 10, 'ranks': [0], 'gen_shape': False}, 'optim': {'name': 'fused_adam', 'lr': 0.0002, 'weight_decay': 0.01, 'betas': [0.9, 0.98], 'sched': {'name': 'CosineAnnealing', 'warmup_steps': 500, 'constant_steps': 50000, 'min_lr': 2e-05}}, 'rotary_base': 10000.0, 'precision': 16}
GPU available: True (cuda), used: False
TPU available: False, using: 0 TPU cores
IPU available: False, using: 0 IPUs
HPU available: False, using: 0 HPUs
[NeMo W 2024-06-06 15:21:41 nemo_logging:349] /usr/local/lib/python3.10/dist-packages/pytorch_lightning/trainer/setup.py:187: GPU available but not used. You can set it by doing `Trainer(accelerator='gpu')`.
    
converting layer 0
done layer 0
moe_token_dropping in its cfg. Add this key to cfg or config_mapping to make to make it configurable.
[NeMo W 2024-06-06 15:22:23 megatron_base_model:552] The model: MegatronGPTModel() does not have field.name: rotary_percent in its cfg. Add this key to cfg or config_mapping to make to make it configurable.
Initializing distributed: GLOBAL_RANK: 0, MEMBER: 1/1
----------------------------------------------------------------------------------------------------
distributed_backend=gloo
All distributed processes registered. Starting with 1 processes
----------------------------------------------------------------------------------------------------

[NeMo I 2024-06-06 15:24:12 convert_llama_hf_to_nemo:283] NeMo model saved to: ./models/ELYZA-japanese-Llama-2-7b/ELYZA-japanese-Llama-2-7b.nemo
Singularity> 
```
以下のファイルが作成されていることを確認します。
```
$ ls -l ELYZA-japanese-Llama-2-7b.nemo 
-rw-r--r-- 1 xxxxx-pg co-xxxx-pg 13478195200 Jun  6 15:24 ELYZA-japanese-Llama-2-7b.nemo
```

### PEFTに使用するデータの準備と前処理

PEFTを行う為のデータセットとしては、yahoo japanが公開しているJGLUEのJCommonsenseQAデータセットを利用しています。以下のサイト、ブログを参照してください。

- [JGLUEのgithub上のサイト](https://github.com/yahoojapan/JGLUE)
- [JGLUEについてのYohoo Tech Blogの記事](https://techblog.yahoo.co.jp/entry/2022122030379907/)

以下のようにデータセットをダウンロードします。

```
git clone https://github.com/yahoojapan/JGLUE.git
```

ダウンロードしたデータを以下のスクリプトで、PEFT用のjson形式のデータに変換します。
また学習用と評価用のデータセットに分割します。

```python
import json
import os
import random
INPUT_TRAIN = "./JGLUE/datasets/jcommonsenseqa-v1.1/train-v1.1.json"
INPUT_VALID = "./JGLUE/datasets/jcommonsenseqa-v1.1/valid-v1.1.json"
OUTPUT_DIR = "./data/jcommonsenseqa-v1.1"
random.seed(42)
os.makedirs(OUTPUT_DIR, exist_ok=True)
def write_jsonl(fname, json_objs):
   with open(fname, 'wt') as f:
      for o in json_objs:
         f.write(json.dumps(o, ensure_ascii=False)+"\n")
def form_question(obj):
   st = ""
   st += "### 指示:\n"
   st += " 与えられた選択肢の中から、最適な答えを選んでください。"
   st += " 出力は以下から選択してください：\n"
   st += f"- {obj['choice0']}\n"
   st += f"- {obj['choice1']}\n"
   st += f"- {obj['choice2']}\n"
   st += f"- {obj['choice3']}\n"
   st += f"- {obj['choice4']}\n"
   st += "### 入力:\n"
   st += f"{obj['question']}\n"
   st += "### 応答:"
   return st
def process(input_path, train=False):
   with open(input_path) as f:
      dataset = [json.loads(line) for line in f.readlines()]
   processed = []
   for data in dataset:
      prompt = form_question(data)
      answer = data[f"choice{data['label']}"]
      processed.append({"input": prompt, "output": f"{answer}"})
   if train:
      random.shuffle(processed)
      train_ds = processed[:-1000]
      valid_ds = processed[-1000:]
      write_jsonl(f"{OUTPUT_DIR}/train-v1.1.jsonl", train_ds)
      write_jsonl(f"{OUTPUT_DIR}/valid-v1.1.jsonl", valid_ds)
   else:
      write_jsonl(f"{OUTPUT_DIR}/test-v1.1.jsonl", processed)
   return
def main():
   process(INPUT_TRAIN, train=True)
   process(INPUT_VALID)
if __name__ == "__main__":
   main()
```
### PEFTの実施

PEFTを実施します。実施には長時間が必要になるので、バッチ管理システムにジョブとして登録して実施します。
遺伝研スパコンではslurmを利用してジョブ投入します。ジョブスクリプトとしては以下のように記述します。
オリジナル記事ではGPU環境としてA100を利用していますが、遺伝研スパコンではV100(GPUメモリ16GB)を利用する
ことになり、1GPUで処理させようとするとメモリ溢れを起こして計算がエラーになります。MBSをオリジナルより
小さくしてメモリ溢れを起こさないようにし、4GPUで処理させるようにします。その他、CPUメモリも大きめにとり
OOMが起きないようにします。ここでは以下のように指定しました。オリジナル記事からの変更箇所をハイライト表示します。

オリジナル記事の通り、ファインチューニング手法としては環境変数SCHEMEにptuingを指定しています。

```js
#!/bin/bash
#SBATCH -N 1
#SBATCH --cpus-per-task 1
#SBATCH --mem-per-cpu=32g
#SBATCH --gres=gpu:4

export EXP_DIR="/home/yxxxx-pg/ex01/results" 
export EXP_NAME="elyza_7b_ptuning" 
export MODEL="/home/yxxxx-pg/ex01/models/ELYZA-japanese-Llama-2-7b/ELYZA-japanese-Llama-2-7b.nemo" 
export SCHEME="ptuning" 
//highlight-next-line
export TP_SIZE=4 
export PP_SIZE=1 
export TRAIN_DS="[/home/yxxxx-pg/ex01/data/jcommonsenseqa-v1.1/train-v1.1.jsonl]" 
export VALID_DS="[/home/yxxxx-pg/ex01/data/jcommonsenseqa-v1.1/valid-v1.1.jsonl]" 
//highlight-next-line
singularity exec --nv /home/yxxxx-pg/nemo_24.03.sif torchrun --nproc_per_node=4 \
/opt/NeMo/examples/nlp/language_modeling/tuning/megatron_gpt_finetuning.py \
exp_manager.exp_dir=${EXP_DIR} \
exp_manager.name=${EXP_NAME} \
exp_manager.early_stopping_callback_params.patience=5 \
trainer.precision=bf16 \
//highlight-next-line
trainer.devices=4 \
trainer.num_nodes=1 \
trainer.max_epochs=-1 \
trainer.max_steps=10000 \
trainer.val_check_interval=0.05 \
trainer.gradient_clip_val=1.0 \
model.megatron_amp_O2=False \
++model.mcore_gpt=True \
model.restore_from_path=${MODEL} \
model.peft.peft_scheme=${SCHEME} \
model.data.train_ds.file_names=${TRAIN_DS} \
model.data.train_ds.concat_sampling_probabilities=[1.0] \
model.data.validation_ds.file_names=${VALID_DS} \
model.tensor_model_parallel_size=${TP_SIZE} \
model.pipeline_model_parallel_size=${PP_SIZE} \
model.global_batch_size=16 \
//highlight-next-line
model.micro_batch_size=4 \
model.data.validation_ds.tokens_to_generate=10 \
model.data.validation_ds.metric.name="loss" \
model.data.train_ds.num_workers=0 \
model.data.validation_ds.num_workers=0 \
model.optim.lr=1e-5
```
10000ステップ中6024ステップで学習状況の改善が収束して4時間半程度で学習がストップする結果となりました。
```
[A^MEpoch 0: :  60%|██████    | 6024/10000 [4:26:54<2:56:09, v_num=0, reduced_train_loss=0.0252, global_step=6023.0, consumed_samples=96384.0, train_step_timing in s=2.590, val_loss=0.0917][rank: 1] Monitored metric val_loss did not improve in the last 5 records. Best score: 0.074. Signaling Trainer to stop.
[rank: 3] Monitored metric val_loss did not improve in the last 5 records. Best score: 0.074. Signaling Trainer to stop.
[rank: 0] Monitored metric val_loss did not improve in the last 5 records. Best score: 0.074. Signaling Trainer to stop.
[rank: 2] Monitored metric val_loss did not improve in the last 5 records. Best score: 0.074. Signaling Trainer to stop.
Epoch 0, global step 6024: 'validation_loss' was not in top 1
[NeMo I 2024-06-06 20:32:41 nlp_overrides:480] Removing checkpoint: /home/yxxxx-pg/ex01/results/elyza_7b_p
tuning/checkpoints/mp_rank_00/megatron_gpt_peft_ptuning_tuning--validation_loss=0.091-step=5522-consumed_samples=88352.0-last.ckpt
^MEpoch 0: :  60%|██████    | 6024/10000 [4:26:54<2:56:10, v_num=0, reduced_train_loss=0.0252, global_step=6023.0, consumed_samples=96384.0, train_step_timing in s=2.590, val_loss=0.0917]^MEpoch 0: :  60%|██████    | 6024/10000 [4:26:54<2:56:10, v_num=0, reduced_train_loss=0.0252, global_step=6023.0, consumed_samples=96384.0, train_step_timing in s=2.590, val_loss=0.0917]
Restoring states from the checkpoint path at /home/yxxxx-pg/ex01/results/elyza_7b_ptuning/checkpoints/megatron_gpt_peft_ptuning_tuning--validation_loss=0.073-step=4016-consumed_samples=64256.0.ckpt
Restored all states from the checkpoint at /home/yxxxx-pg/ex01/results/elyza_7b_ptuning/checkpoints/megatron_gpt_peft_ptuning_tuning--validation_loss=0.073-step=4016-consumed_samples=64256.0.ckpt
```
### 推論、評価の実施
PEFTの結果を利用して推論をさせて評価させてみます。これもバッチジョブとして以下のようなジョブスクリプトファイルを記述してslurmに投入します。
```js
#!/bin/bash
#SBATCH -N 1
#SBATCH --cpus-per-task 1
#SBATCH --mem-per-cpu=32g
#SBATCH --gres=gpu:4

export MODEL="/home/yxxxx-pg/ex01/models/ELYZA-japanese-Llama-2-7b/ELYZA-japanese-Llama-2-7b.nemo" 
export PEFT_MODEL="/home/yxxxx-pg/ex01/results/elyza_7b_ptuning/checkpoints/elyza_7b_ptuning.nemo" 
export TEST_NAMES="[jcommonsenseqa-v1.1]" 
export TEST_DS="[/home/yxxxx-pg/ex01/data/jcommonsenseqa-v1.1/test-v1.1.jsonl]" 
export OUTPUT_PREFIX="/home/yxxxx-pg/ex01/results/elyza_7b_ptuning" 
export NVTE_FLASH_ATTN=0 
export NVTE_FUSED_ATTN=0 
singularity exec --nv /home/yxxxx-pg/nemo_24.03.sif python /opt/NeMo/examples/nlp/language_modeling/tuning/megatron_gpt_generate.py \
model.restore_from_path=${MODEL} \
model.peft.restore_from_path=${PEFT_MODEL} \
//highlight-next-line
trainer.devices=4 \
model.data.test_ds.file_names=${TEST_DS} \
model.data.test_ds.names=${TEST_NAMES} \
model.data.test_ds.global_batch_size=16 \
//highlight-next-line
model.data.test_ds.micro_batch_size=4 \
model.data.test_ds.tokens_to_generate=10 \
//highlight-next-line
model.tensor_model_parallel_size=4 \
inference.greedy=True \
model.data.test_ds.output_file_path_prefix=${OUTPUT_PREFIX} \
model.data.test_ds.write_predictions_to_file=True
```
ジョブは以下のような出力結果で終わります。

```
(省略)
[NeMo W 2024-06-07 12:57:19 nemo_logging:349] /usr/local/lib/python3.10/dist-packages/pytorch_lightning/trainer/connectors/logger_connector/result.py:441: It is recommended to use `self.log('val_loss', ..., sync_dist=True)` when logging on epoch level in distributed setting to accumulate the metric across devices.
    
[NeMo W 2024-06-07 12:57:19 nemo_logging:349] /usr/local/lib/python3.10/dist-packages/pytorch_lightning/trainer/connectors/logger_connector/result.py:441: It is recommended to use `self.log('test_loss_jcommonsenseqa-v1.1', ..., sync_dist=True)` when logging on epoch level in distributed setting to accumulate the metric across devices.
    
[NeMo W 2024-06-07 12:57:19 nemo_logging:349] /usr/local/lib/python3.10/dist-packages/pytorch_lightning/trainer/connectors/logger_connector/result.py:441: It is recommended to use `self.log('test_loss', ..., sync_dist=True)` when logging on epoch level in distributed setting to accumulate the metric across devices.
    
Testing DataLoader 0: 100%|██████████| 70/70 [15:34<00:00,  0.07it/s]
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃          Test metric          ┃         DataLoader 0          ┃
┡━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩
│           test_loss           │      0.05897359922528267      │
│ test_loss_jcommonsenseqa-v1.1 │      0.05897359922528267      │
│           val_loss            │      0.05897359922528267      │
└───────────────────────────────┴───────────────────────────────┘
```


評価データの推論結果は `results/elyza_7b_ptuning_test_jcommonsenseqa-v1.1_inputs_preds_labels.jsonl`に出力されています。json形式でUTF-8でエンコードされたテキストで出力されているので、デコードして表示する場合は、jqなどのコマンドを利用してください。以下のようになります。

```
$ cat elyza_7b_ptuning_test_jcommonsenseqa-v1.1_inputs_preds_labels.jsonl |jq . |more
{
  "input": "### 指示:\n 与えられた選択肢の中から、最適な答えを選んでください。 出力は以下から選択してください：\n- 
示板\n- パソコン\n- マザーボード\n- ハードディスク\n- まな板\n### 入力:\n電子機器で使用される最も主要な電子回路基板
事をなんと言う？\n### 応答:",
  "pred": "マザーボード",
  "label": "マザーボード"
}
{
  "input": "### 指示:\n 与えられた選択肢の中から、最適な答えを選んでください。 出力は以下から選択してください：\n- 
\n- 海\n- 田園\n- 地方\n- 牧場\n### 入力:\n田んぼが広がる風景を何という？\n### 応答:",
  "pred": "田園",
  "label": "田園"
}
{
  "input": "### 指示:\n 与えられた選択肢の中から、最適な答えを選んでください。 出力は以下から選択してください：\n- 
を下す\n- 座る\n- 仮眠を取る\n- 寝る\n- 起きる\n### 入力:\nしゃがんだりする様を何という？\n### 応答:",
  "pred": "腰を下す",
  "label": "腰を下す"
}
{
  "input": "### 指示:\n 与えられた選択肢の中から、最適な答えを選んでください。 出力は以下から選択してください：\n- 
口\n- ハンドル\n- 流し\n- 釘\n- 食器棚\n### 入力:\n水を出すときに捻るものは？\n### 応答:",
  "pred": "ハンドル",
  "label": "蛇口"
}

```



