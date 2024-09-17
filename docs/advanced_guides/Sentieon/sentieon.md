---
id: sentieon
title: "Sentieon の利用方法"
---


## システム概要

Sentieon は xxxです。
xxxできます。


参考資料

- [&#x1f517;<u>Sentieon 公式サイト</u>](https://support.sentieon.com/manual/)


xxx

![](slurm_in_personal_genome_section.png)

- xxx

## Sentieonの実行方法 
### 実行環境にログイン
- SSL-VPNに接続
- sshで遺伝研スパコン個人ゲノム解析区画のゲートウェイにログイン
- sshで計算ノードにログイン　※ノード貸しで借りた計算ノードを指定する
```
ssh <計算ノード>
```
### Sentieonライセンスサーバーをexport
- 指定されたライセンスサーバーをexport
```
export SENTIEON_LICENSE=<指定されたライセンスサーバー>
```
### Sentieonのバイナリファイルのダウンロード
- [Sentieon 公式サイトのリリースノート](https://support.sentieon.com/manual/appendix/releasenotes/?highlight=aws)を確認し、最新のバージョンをダウンロード
```
curl https://s3.amazonaws.com/sentieon-release/software/sentieon-genomics-202308.tar.gz -o sentieon-genomics-202308.tar.gz
tar -zxvf sentieon-genomics-202308.tar.gz
```
### Sentieonのインストールディレクトリを指定
- 解凍したSentieonのバイナリファイルのパスを指定。
- path/to/sentieon は /home からのパスを記載
```
SENTIEON_INSTALL_DIR=path/to/sentieon/sentieon-genomics-202308
```
### jemallocのインストール
- Sentieon 公式サイトより、jemallocの使用が推奨されています。
- [INSTALL.md](https://github.com/jemalloc/jemalloc/blob/dev/INSTALL.md)に従ってインストールしてください
- 詳しい内容は[using-jemalloc-to-optimize-memory-allocation](https://support.sentieon.com/appnotes/jemalloc/#using-jemalloc-to-optimize-memory-allocation)をご確認ください

### コマンド実行
- 下記のようにSentieonコマンドを実行（ヘルプの例）します。
```
$SENTIEON_INSTALL_DIR/bin/sentieon driver -h
Usage: path/to/sentieon/sentieon-genomics-202308/libexec/driver [options] --algo <algo_name> [algo_options]

Options:
  -r, --reference       Reference file (FASTA)
  -i, --input           Read sequence input file (BAM/CRAM)
  -q, --qual_cal        Base quality calibration table
  -t, --thread_count    Number of threads
      --interval        Interval string or file (BED/Picard)
      --interval_padding
                        Amount to pad all intervals
      --skip_no_coor    Skip unmapped reads
      --temp_dir        Directory for temporary files
      --cram_read_options
                        CRAM read options
      --version         Display version string
  -h, --help            Display help information
      --read_filter     Read filter name and params

For algo or other help information, type
  driver --help algo
  driver --help cram_read_options
  driver --help cram_write_options
  driver --help read_filter
  driver --help read_flag_bits
```

