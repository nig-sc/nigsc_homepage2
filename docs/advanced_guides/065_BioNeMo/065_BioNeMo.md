---
id: bionemo
title: "NVIDIA BioNeMo"
---


## 概略 {#introduction}
BioNemo は、NVIDIA社が開発した創薬支援プラットフォームで、大規模な生成AIモデルを活用して分子設計や特性予測を効率的に行うことができます。BioNemo-framework は、このBioNemoを基盤としたオープンソースフレームワークで、ユーザーが独自の分子データやモデルを利用して研究を進められるように設計されています。 NVIDIA社は、BioNemo-frameworkについて、以下のマニュアルを用意してくれています。

https://docs.nvidia.com/bionemo-framework/1.10/initialization-guide.html

本解説文では、公式によるBioNemo-frameworkの利用方法チュートリアルの一つを、遺伝研スーパーコンピュータシステムで実行する方法を解説しています。チュートリアルは次のステップで進みます。


1. NGC アカウントの取得
2. bionemo-frameworkコンテナの準備
3. データの前処理 (pretrain.py)
4. モデルの事前学習(pretrain.py)
5. モデルのダウンロード(download_artifacts.py)
6. Jupyter Labを用いての推論(inference_interactive.ipynb)
   
   
なおBioNemo-frameworkは、現在(2024年12月)までに1.0系と2.0系があり、以下の説明は1.0系である1.8の利用を想定して説明しています。
この解説の元としたのは、NVIDIA社の以下の公式マニュアル
1.0系
https://docs.nvidia.com/bionemo-framework/1.10/initialization-guide.html
2.0系
https://docs.nvidia.com/bionemo-framework/2.0/user-guide/
及び、下記の技術ブログになります。
https://developer.nvidia.com/ja-jp/blog/an-easy-way-to-building-cutting-edge-protein-language-models-with-bionemo-framework/


下記では遺伝研スーパーコンピューターへのログイン方法については解説をしていません。
遺伝研スーパーコンピューターへのsshによるログイン方法については[ログイン方法の概要](https://sc.ddbj.nig.ac.jp/guides/account_activation/)を参考にしてください。
また、ログイン後、ホームディレクトリを作業ディレクトリとしています。実際の作業ディレクトリを別に作る場合は、パスを適宜読み替えてください。

### 事前の注意事項 {#preliminary-notes}
#### Note 1. {#note-1}
この記事のチュートリアルでは、NVIDIA社の提供するコンテナを利用しており、必要なpythonライブラリ等は、すでに全てコンテナ内に準備されています。エラーが出た場合、singularity shell を行うときに（オプション -bind もしくは -Bによって)bindするcudaのバージョンが適切でない可能性が高いです。Bionemo-framework:1.8を用いる場合は、次のようなbindを推奨しており、下記チュートリアル内でもそのようにコマンドを記載しています。
```
$ singularity shell --nv -e -B bionemo:/workspace/bionemo
```

#### Note 2. {#note-2}
この記事の元となる公式のチュートリアル等では、/work以下のディレクトリやファイルにもアクセス権限があることが前提となっているようです。実際には書き込み権限を持たないことが多いと思いますので、ダウンロードしたコンテナ内のBionemo-framework_1.8ディレクトリ内のworkディレクトリ以下へパスを書き換えるようにしてください。この記事でも、/work以下は利用していません。

## 1. NGCアカウントの作成 {#1-creating-an-ngc-account}
### 1-1. 下記 NVIDIA公式サイトにアクセスし、Create Accountから、アカウントを作成する {#1-1-visit-nvidia-website-and-create-account}
https://login.nvgs.nvidia.com/v1/help

作成したアカウントでログインし、画面右上のご自身のアカウントからSet upを選択し、"Generate API Key"の項目からAPI Keyを作成して、記録しておいてください。



## 2. コンテナの準備 {#2-preparing-the-container}

### 2-1. 作業ディレクトリに入る {#2-1-move-into-the-working-directory}
ここではホームディレクトリを作業ディレクトリとしています。
```
 $ cd ~/
```

### 2-2. BioNemo-Frameworkのsingularityコンテナのsifファイルをダウンロード {#2-2-download-sif-file}
 この作業は最初の1回のみ。2回目からは不要。
 下記では、dockerは利用できないがsingularityが利用できる環境を想定しています。

```
singularity pull --docker-login docker://nvcr.io/nvidia/clara/bionemo-framework:1.8
```
Usernameには$oauthtokenと記載します。Passwordは、上記"1. NGCアカウントの作成"で作成したPasswordをペーストしてください。

```
Enter Docker Username: $oauthtoken
Enter Docker Password: 
```
ローカルにbionemo-framework_1.8.sifがダウンロードされます。


### 2-3. ダウンロードしたsifファイルを利用して、bionemo-frameworkのコンテナをビルド {#2-3-build-the-bionemo-framework-container}
この作業は最初の1回のみ。2回目からは不要。

```
$ singularity build --sandbox bionemo-framework_1.8 bionemo-framework_1.8.sif
```
この操作には10-20分ほどかかることがあります。終了すると、上記のコマンドの--sandboxオプションの引数として指定した名前(今回はbionemo-framework_1.8)のディレクトリに、サンドボックスコンテナがビルドされます。

### 2-4. コンテナ内部に入る {#2-4-enter-the-container}

```
$ singularity shell --nv -e bionemo-framework_1.8.sif
```
上記のように"singularity shell"をした後は、sandboxコンテナの内部に入っているので、プロンプトが下記のように"Singularity>" になります。

### 2-5. コンテナ内で、Workディレクトリをコピーする。 {#2-5-copy-the-work-directory-inside-the-container}
この作業は最初の1回のみ。2回目からは不要です。
書き込みエラーとならないように、自分の作業ディレクトリに書き込むようにする
```
Singularity> cp -R $BIONEMO_HOME $HOME/bionemo-framework_1.8/workspace/bionemo
Singularity> cd ~/bionemo-framework_1.8
```

### 2-6. コンテナ内のサンプルデータを解凍。 {#2-6-extract-the-sample-data-inside-the-container}
この作業は最初の1回のみ。2回目からは不要です。
下記のように、サンプルデータuniref202104_esm2_qc_test200_val200.zipは解凍されていません。
```
Singularity> ls ~/bionemo-framework_1.8/workspace/bionemo/examples/tests/test_data/
dna	  preprocessing  reaction
molecule  protein	 uniref202104_esm2_qc_test200_val200.zip
```

unzipコマンドでuniref202104_esm2_qc_test200_val200.zipを解凍する。
(ルート下の/workspace ではなく、書き込み権限のあるbionemo-framework:1.8の下の、./workspaceであることに注意してください。)
```
Singularity> cd ~/bionemo-framework_1.8/workspace/bionemo/examples/tests/test_data/
Singularity> unzip uniref202104_esm2_qc_test200_val200.zip
Singularity> exit
```

## 3. データの前処理 {#3-data-preprocessing}
### 3-1. コンテナ内部に入り、実行したいpythonプログラム（ ここではesm2nvの'pretrain.py' ）を実行 {#3-1-enter-container-and-run-python-script}

この際 -Bオプションで bionemo:/workspace/bionemo/ をbindしていることに注意。
```
$ cd ~/
$ singularity shell --nv -e -B bionemo:/workspace/bionemo/ bionemo-framework_1.8.sif
```

ここからはコンテナ内部
 (下記をそのままコピーするとうまくペーストできない場合がありますので、コピーアンドペースト用にはすぐしたの1行表記を利用してください。)
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

(上記コマンドのコピーアンドペースト用には下記を利用してください。）
```
Singularity> python ./workspace/bionemo/examples/protein/esm2nv/pretrain.py --config-path=conf --config-name=pretrain_esm2_650M ++do_training=False ++model.data.val_size=500 ++model.data.test_size=100 ++model.data.uf50_datapath=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/uniref50_train_filt.fasta ++model.data.uf90_datapath=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/ur90_ur50_sampler.fasta ++model.data.cluster_mapping_tsv=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/mapping.tsv ++model.data.dataset_path=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/uf50 ++model.data.uf90.uniref90_path=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/uf90 ++model.data.train.uf50_datapath=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/uniref50_train_filt.fasta ++model.data.train.uf90_datapath=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/ur90_ur50_sampler.fasta ++model.data.train.cluster_mapping_tsv=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/mapping.tsv ++model.data.val.uf50_datapath=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/uniref50_train_filt.fasta ++model.data.test.uf50_datapath=./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/uniref50_train_filt.fasta
```

-- で始まるパラメーターは、コマンドライン引数として pretrain.pyに渡されます。このパスは pretrain.py に対して相対的です。

++で始まるパラメーターは、YAML ファイルで設定可能です。

前処理されたデータは コンテナディレクトリ(今回はbionemo-framework_1.8)の下、./workspace/bionemo/examples/tests/test_data/uniref202104_esm2_qc_test200_val200/uf50/ に出力されます。


## 4. モデルの事前学習 {#4-model-pretraining}

### 4-1. 下記コマンドで事前学習 {#4-1-run-command-to-begin-pretraining}

引き続きコンテナ内部。
 (下記をそのままコピーするとうまくペーストできない場合がありますので、コピーアンドペースト用にはすぐ下の1行表記を利用してください。)

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
(上記コマンドのコピーアンドペースト用には下記を利用してください。）

```
Singularity> python ./bionemo/examples/protein/esm2nv/pretrain.py --config-path=conf --config-name=pretrain_esm2_650M ++do_training=True ++do_testing=False ++model.data.dataset_path=examples/tests/test_data/uniref202104_esm2_qc_test200_val200/uf50 ++model.data.uf90.uniref90_path=examples/tests/test_data/uniref202104_esm2_qc_test200_val200/uf50/uf90 ++trainer.devices=2 ++model.tensor_model_parallel_size=2 ++model.micro_batch_size=8 ++trainer.max_steps=50 ++trainer.val_check_interval=5 ++exp_manager.create_wandb_logger=True ++exp_manager.checkpoint_callback_params.save_top_k=5
```

無事終了したら、一度sandboxコンテナから出てください。
```
Singularity> exit
```

トレーニングされた結果がコンテナディレクトリ(今回はbionemo-framework_1.8)の下、./workspace/bionemo/results/nemo_experiments/ に保存される。

## 5. モデルのファインチューニング {#5-model-fine-tuning}


サンプル データは下記のフォルダーにあります。
/workspace/bionemo/examples/tests/test_data/protein/downstream/
この後のdownstream_flip.pyを利用する際に、++model.data.dataset_pathに引き渡します。

### 5-1. モデルのダウンロード {#5-1-download-the-pretrained-model}

事前学習済みモデルをダウンロードします。モデルをダウンロードするため、ngc をインストールして、ngc config を設定する必要があります。

```
$ wget -q -O /tmp/ngccli_linux.zip --content-disposition https://api.ngc.nvidia.com/v2/resources/nvidia/ngc-apps/ngc_cli/versions/3.38.0/files/ngccli_linux.zip && unzip -o /tmp/ngccli_linux.zip -d /tmp && chmod u+x /tmp/ngc-cli/ngc && rm /tmp/ngccli_linux.zip
```

### 5-2. 下記のように ngc config set を実行する {#5-2-run-ngc-config-set}

```
/tmp/ngc-cli/ngc config set 
<順番に API キー、CLI output format, org, team, ace を入力してください。API キーは NGC の API キーを入力してください。Org は ’no-org’以外のものを選択して、その他は「Enter」でデフォルト値を入力すれば大丈夫です>
```

最後に、下記のコマンドを入力すれば、すべてのモデルをダウンロードできます。(BioNeMo v1.5以降のバージョンから、モデルのダウンロードコマンドは下記の通りdownload_artifacts.pyになっています。)

```
$ singularity shell --nv -e -B bionemo:/workspace/bionemo/ bionemo-framework_1.8.sif
```

コマンドngcへのパスを通します。

```
Singularity> export PATH=/tmp/ngc-cli/:$PATH 
```

`download_artifacts.py`を用いて、希望するモデル（ここでは`esm2nv_650m`)をダウンロードします。
）

```
Singularity> cd ~/bionemo-framework_1.8/workspace/bionemo
```

```
Singularity> python download_artifacts.py --models esm2nv_650m --model_dir ~/bionemo-framework_1.8/workspace/bionemo/models
```

モデル名の一覧は下記のファイルでご確認できます。

```
artifacts_paths.yaml
```

ダウンロードされたモデルは `.nemo` というファイルで、`/workspace/bionemo/models` に保存されます。

そして、下記のコマンドでファインチューニングを実行します。BioNemo Framework v1.4 は新たな機能として、**LoRa** というファインチューニングの手法を追加しました。LoRa は事前学習済み大規模言語モデルのすべての重みをファインチューニングするのではなく、大規模な重み行列を近似する 2 つの小規模な行列をファインチューニングする効率的な手法です。

再度、sandboxコンテナに入ります。
```
singularity shell --nv -e -B bionemo:/workspace/bionemo/ bionemo-framework_1.8.sif
```

```
Singularity> cd ~/bionemo-framework_1.8/workspace/bionemo
```

`downstream_flip.py`を利用して、モデルをダウンロードします。  
(下記をそのままコピーするとうまくペーストできない場合がありますので、コピーアンドペースト用にはすぐ下の1行表記を利用してください。)

```
Singularity> python examples/protein/downstream/downstream_flip.py\
 --config-path="../esm2nv/conf"\
 --config-name=downstream_sec_str_LORA\
 ++model.data.dataset_path=/workspace/bionemo/examples/tests/test_data/protein/downstream/
```
(上記コマンドのコピーアンドペースト用には下記を利用してください。)

```
Singularity> python examples/protein/downstream/downstream_flip.py --config-path="../esm2nv/conf" --config-name=downstream_sec_str_LORA ++model.data.dataset_path=/workspace/bionemo/examples/tests/test_data/protein/downstream/
```


## 6. 推論 {#6-inference}

### 6-1.YAMLファイルの更新 {#6-1-update-the-yaml-file}

下記の YAML ファイルを開いて、

```
/workspace/bionemo/examples/protein/esm2nv/conf/infer.yaml
```

以下の情報を更新してください。提供する事前学習済みモデルを使用するか、自分でトレーニングしたモデルを使用することができます。

```
downstream_task:
 restore_from_path: "${oc.env:BIONEMO_HOME}/models/protein/esm2nv/esm2nv_650M_converted.nemo" # 事前学習済みモデルのパス
```

### 6-2. Jupyter Labを用いた推論 {#6-2-inference-using-jupyter-lab}

これ以降はJupyter Labが必要になります。
Jupyter Lab を起動します。 portは、ここでは8888を指定しました。

```
Singularity> jupyter lab --ip=`hostname` --port=8888 --no-browser
```

上記のコマンドによってJupyter Serverが起動します。
Serverを停止するためには、`Control + c` を押します。そうするとターミナル末尾に下記のように表示されますので、

```
Shut down this Jupyter server (y/[n])? n
```

と表示されますので、`y`を押すとJupyter Serverが停止し、`Singularity>` のプロンプトに戻ります。サーバー起動中は、このターミナルはコマンドを打つためには利用できません。

そこでローカルのパソコンから別のターミナルを開き、下記のコマンドをうちます。
ローカルのポートは、ここでは18888を指定しました。

```
ssh -i ~/.ssh/<あなたのid_rsa> -L 18888:igt008:8888  <あなたの遺伝研アカウント>@gw.ddbj.nig.ac.jp
```

ローカルのパソコンで適当なウェブブラウザを立ち上げ、http://localhost:18888 に接続します。


下記の Jupyter Notebook を開きます。

```
./workspace/bionemo/examples/protein/esm2nv/nbs/inference_interactive.ipynb
```

画面左上のグレーのディレクトリマークを押すと、あなたのホームに移動しますので、それ以降は順次`bionemo-framework_1.8`以下、上記のパスに沿ってworkspaceから`.ipynb`ファイルまで、順に降りていき、`inference_interactive.ipynb`をクリックすると、右側に、コマンドが書かれたセルがいくつか並びます。

セルを上から順次実行します。
- Jupyter Notebook上の`inference_interactive.ipynb`ファイルをダブルクリック。
- 画面右にコマンドが書かれたセルが表示されるので、順に指定して(左に青い線が表示されているセルが指定されているセルになります)、画面上部の三角形の実行マークを押す。
- `[*]`マークが表示されている間は、計算中。
- `[*]` が数字に( `[1]`のように )置き換わったら、次のコマンドを実行する。


全てのコマンドを実行し、最終的に下記のように表示されたら無事チュートリアルは終了です。
```
embeddings.shape=torch.Size([2, 1280])

```

### 6-3. 追加操作 {#6-3-additional-operation}

このJupyter Labでのチュートリアル部分を理解するために、下記のようにseqsの入力データを二つのアミノ酸配列から、三つのアミノ酸配列に変更してみてください。

```
seqs = [
 'MSLKRKNIALIPAAGIGVRFGADKPKQYVEIGSKTVLEHVL',
 'MIQSQINRNIRLDLADAILLSKAKKDLSFAEIADGTGLA',
 'MIQSYTYLGGGQINRNIRLDLADAKDLSFAEIADGTGLA',
 ]
```
上記のように入力データだけ変更して、最後までプログラムを進め、無事に終了したら、Jupyter Lab末尾の新しいセルにembeddingsと記入して、実行してください。うまく動いている場合は、`tensor([[ 0.0373, ....])`という、3行1280列のマトリックスが表示されるはずです。

## 7. これ以降の操作 {#next-steps}
BioNemo Framework のサンプル コードは 3 つの下流タスクを提供しています。1 つ目はタンパク質の 10 の細胞内局在部位を予測すること、2 つ目はタンパク質の融解温度を予測すること、3つ目はタンパク質の 3 状態構造を予測することです。本記事では 3 つ目のタスクを例として説明してきました。具体的には、シーケンスの各アミノ酸について、それがヘリックス、シート、またはコイルのどれにあるかを予測します。

### ダウンストリームタスクについて {#about-downstream-tasks}

出力されたembeddingは、Predictive Models（例：Secondary StructureやResidue Conservation）の特徴量として使用することができます。
この後の解析パイプラインや応用については、以下のチュートリアルをご参考ください。

https://docs.nvidia.com/bionemo-framework/1.10/notebooks/esm2_FLIP_finetuning.html  
https://docs.nvidia.com/bionemo-framework/1.10/notebooks/esm2_oas_inferencing.html  
https://docs.nvidia.com/bionemo-framework/1.10/notebooks/protein-esm2nv-clustering.html  


## 8. 補足 {#8-supplementary-notes}
Jupyter Labでの操作がうまくいかなかったら、どこでエラーが出たのかを調べることをお勧めします。
例えば、Jupyter Lab末尾の新しいセルにembeddingsと記入して、実行してください。うまく動いている場合は、`tensor([[ 0.0373, ....)`という2行1280列のマトリックスが表示されるはずです。うまくいっていない場合は、下記のように表示されます。

```
NameError: name 'embeddings' is not defined
```

同様に、Jypyter Labのプログラムで用いた変数の中身をチェックすると良いでしょう。
末尾の新しいセルにseqsと記入して実行してください。
```
['MSLKRKNIALIPAAGIGVRFGADKPKQYVEIGSKTVLEHVL',
 'MIQSQINRNIRLDLADAILLSKAKKDLSFAEIADGTGLA']
```
これは、ほとんどの場合うまくいくと思います。これが表示されない場合は、seqsのスペルを間違っている、もしくはJupyter Labが正しく動いていないと思われます。


次に、cfgと記入して、実行してください。

```
{'name': 'ESM2nv_Inference', 'desc': 'Minimum configuration for initializing a ESM2nv model for inference.',..... }
```

と表示されます。もしくは、infererと記入して、実行してください。

```
ESM1nvInference(
  (model): ESM2nvModel(
    (model): ESMnvBertModel(
 ...
```

と表示されます。
これらこの表示が出ない場合は、Jupyter Labを利用する以前の操作のどこかでエラーが発生していると思われます。
一つは、モデルのダウンロードで失敗している可能性を考えてみてください。

5-2の`python download_artifacts.py`の実行のところをやり直してみてください。このダウンロードには数10分以上かかるはずですので、そうならないでエラーが出ている場合は、コマンドにスペルミスがなかったかなどを確認してください。


