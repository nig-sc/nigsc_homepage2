---
id: python
title: "Python"
---

Python処理系のインストールはユーザー権限で可能なので、各自必要なバージョンを自分のホームディレクトリにインストールしてください。

 
 
 MInicondaによるインストール例 
 公式マニュアルの手順に従ってください。 [Installing on Linux conda 4.10.3.post11+888309718 documentation](https://conda.io/projects/conda/en/latest/user-guide/install/linux.html)
 
 公式ページからダウンロードしたMinicondaを適当な場所に置き、以下のように実行してください。後はインストーラの指示に従ってください。
 
 ```
 cd ~/local/src
 bash Miniconda3-py39_4.10.3-Linux-x86_64.sh
 ```
 
 インストール中、conda initを実行するか聞かれるので、NOを選択してください。
 インストール後、HOME直下にMiniconda3フォルダができます。
 
 下記の２行を実行してください。~/.bashrcにも追記してください。
 
 ```
 export PATH=~/miniconda3/bin:$PATH
 source ~/miniconda3/etc/profile.d/conda.sh
 ```
  
conda-forgeレポジトリをデフォルトに設定し、.condarcのトップに追加されたことを確認してください。

```
$ conda config --add channels conda-forge
$ conda config --set channel_priority strict
$ sudo vim /home/imo/.condarc
```

動作確認

```
$ python --version 
Python 3.9.5 

$ python3 --version 
Python 3.9.5 
```

参考:  [Miniconda Install 備忘録 - Qiita](https://qiita.com/Ihmon/items/11074e1a4c0e397d934f)

