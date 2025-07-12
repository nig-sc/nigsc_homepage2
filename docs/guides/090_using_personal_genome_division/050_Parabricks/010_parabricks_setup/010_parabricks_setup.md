---
id: parabricks_setup
title: Parabricksを使用するための準備
---

## 利用申請について

Parabricksの実行にはGPU計算ノードが必要です。
現在GPUノードは、計算機の台数が限られていることから、個人ゲノム解析区画に設置されています。
解析対象が個人ゲノムでない場合でも個人ゲノム区画のアカウントを作成の上、利用計画表の作成と提出をお願いしております。



## インタラクティブノードへのSSHログイン

GPUノードを使うときには、まず`at022vm02`ノードにログインします。

```
ssh at022vm02
```


## チュートリアルの実行に必要なデータファイルのダウンロード


参考資料
- https://docs.nvidia.com/clara/parabricks/latest/tutorials/stepbysteptutorials.html


次に、例としてチュートリアルにしたがいリファレンスゲノムデータ等のダウンロードを行います。

```
wget -O parabricks_sample.tar.gz "https://s3.amazonaws.com/parabricks.sample/parabricks_sample.tar.gz"
```


データファイルを展開します。

```
$ tar zxvf parabricks_sample.tar.gz
```

実際の実行例は以下のとおり。

```
you-pg@at022vm02:~/workdir001 (2025-07-01 19:39:30)
$ wget -O parabricks_sample.tar.gz \
"https://s3.amazonaws.com/parabricks.sample/parabricks_sample.tar.gz"
you-pg@at022vm02:~/workdir001 (2025-07-01 19:51:44)
$ tar zxvf parabricks_sample.tar.gz 
parabricks_sample/
parabricks_sample/Data/
parabricks_sample/Data/markdup_input.bam
parabricks_sample/Data/sample_2.fq.gz
parabricks_sample/Data/sample_1.fq.gz
parabricks_sample/Data/single_ended.bam
parabricks_sample/Ref/
parabricks_sample/Ref/Homo_sapiens_assembly38.fasta.sa
parabricks_sample/Ref/Homo_sapiens_assembly38.known_indels.vcf.gz.tbi
parabricks_sample/Ref/Homo_sapiens_assembly38.dict
parabricks_sample/Ref/Homo_sapiens_assembly38.fasta
parabricks_sample/Ref/Homo_sapiens_assembly38.fasta.fai
parabricks_sample/Ref/Homo_sapiens_assembly38.fasta.pac
parabricks_sample/Ref/Homo_sapiens_assembly38.known_indels.vcf.gz
parabricks_sample/Ref/Homo_sapiens_assembly38.fasta.bwt
parabricks_sample/Ref/Homo_sapiens_assembly38.fasta.amb
you-pg@at022vm02:~/workdir001 (2025-07-01 19:53:15)
$ 

```

- ダウンロード速度は18MB/s (144Mbps) 程度。ダウンロード時間は11分程度。ファイルサイズは11GB程度

## ParabricksのApptainerコンテナイメージのビルド

ParabricksのプログラムはDockerコンテナイメージとして無償で配布されています。
しかし共用計算機のセキュリティーの観点からDockerコマンドをスパコンユーザに直接利用させることは行っておりません。

:::note
Dockerの実行権限をユーザに与えることは事実上ルート権限を与えていることと同等の効果になってしまいます。
:::

このNVIDIAから配布されているDockerコンテナイメージをApptainerコンテナイメージに変換することで簡単にチュートリアルと同じ計算を実行できます。
DockerコンテナイメージをApptainerコンテナイメージに変換することは一般ユーザ権限で可能です。


以下のコマンドによりapptainerコンテナイメージをビルドできます。
実行するのはSSHログインした`at022vm02`上で構いません。

```
apptainer build clara-parabricks.sif docker://nvcr.io/nvidia/clara/clara-parabricks:4.5.1-1
```


実際の実行例は以下のとおり。

```
you-pg@at022vm02:~/workdir003 (2025-07-11 17:20:37)
$ apptainer build clara-parabricks-test.sif docker://nvcr.io/nvidia/clara/clara-parabricks:4.5.1-1
INFO:    Starting build...
Copying blob e1a89dea01a6 skipped: already exists  
Copying blob b4d600b97743 skipped: already exists  
Copying blob 1bba15468fcc skipped: already exists  
Copying blob 435792bbded5 skipped: already exists  
Copying blob 01a77ecc44d6 skipped: already exists  
Copying blob 5ada09cfb5af skipped: already exists  
Copying blob c3c0066eeb70 skipped: already exists  
Copying blob 940d6e4c383f skipped: already exists  
Copying blob 68c758a9e77e skipped: already exists  
Copying blob ce396821fa62 skipped: already exists  
Copying blob 70685e5cf7cf skipped: already exists  
Copying blob 5d1671fdc578 skipped: already exists  
Copying config 65144997d2 done   | 
Writing manifest to image destination
2025/07/11 17:23:05  info unpack layer: sha256:e1a89dea01a683f6764b4ee6ef39f7f378ad6e208fb50463e87fd71ecd4f2f6e
2025/07/11 17:23:06  info unpack layer: sha256:5ada09cfb5af365e37f3ac41858d0e72994953474937dbc460ae5ed1b2d9bba3
2025/07/11 17:23:06  info unpack layer: sha256:b4d600b977438c1e74729cafa7158dfe98928d53ec5a0eb189fcd3739752cc20
2025/07/11 17:23:07  info unpack layer: sha256:01a77ecc44d681faf2e4514567d1ec0733a24aa52177c3ad36883df1e1e6eb16
2025/07/11 17:23:07  info unpack layer: sha256:1bba15468fcc82586ce921fdc422649a192dcc635f587390cd01beb95ca6dfb5
2025/07/11 17:23:07  info unpack layer: sha256:435792bbded5f84fb40be61217d65e8c0c05933cf7163b9aad4354e9231a709d
2025/07/11 17:23:07  info unpack layer: sha256:c3c0066eeb703a9ea0661d2ef8feab8ec713165cb0ed2213f8fd241c828274f3
2025/07/11 17:23:08  info unpack layer: sha256:68c758a9e77e2bbde6e00f4c9e081bdf4f5bd366141432a024f780e89c1ec6f4
2025/07/11 17:23:14  info unpack layer: sha256:940d6e4c383ff8dfd38bc94abab02e2c8fee955f63bae4d8efc4679e8ad8ac0a
2025/07/11 17:23:14  info unpack layer: sha256:ce396821fa625e40cdf246c182236efc6c55a930ddf37cee3e326ed0224808dd
2025/07/11 17:23:30  info unpack layer: sha256:70685e5cf7cf73906d234e35c6c98df98d4ab69d45c0cab241e8af7924279356
2025/07/11 17:23:30  info unpack layer: sha256:5d1671fdc5780f437ba70eb40dc9038a123e4d92cf3d2e7637ab44f6eac2ba19
INFO:    Creating SIF file...
INFO:    Build complete: clara-parabricks-test.sif
you-pg@at022vm02:~/workdir003 (2025-07-11 17:24:18)
$ 
```

