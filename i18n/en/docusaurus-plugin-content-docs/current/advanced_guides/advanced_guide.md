---
id: advanced_guide
title: "最新のトピック"
---
---

## DFAST

2021.10.02

DFASTは原核生物ゲノムの自動アノテーションツールです。DDBJへのゲノム塩基配列登録用のファイルを生成することもできます。ファイルをアップロードするだけで利用可能なウェブ版 https://dfast.ddbj.nig.ac.jp とコマンド操作で実行するスタンドアローン版があります。

<table>
<tr>
<td width="400">

![](dfast.png)
</td>
<td valign="top">
スタンドアローン版をスパコンで実行する場合、<a href="https://github.com/nigyta/dfast_core/">https://github.com/nigyta/dfast_core/ </a>からソースコードを取得してインストールする方法 (Python 3.6以降 + Biopythonが必要) とスパコンで提供されているsingularityコンテナを利用する方法 (参考: <a href="https://qiita.com/nigyta/items/e1de21f6ece65d69ec1d">https://qiita.com/nigyta/items/e1de21f6ece65d69ec1d</a>) があります。
</td>
</tr>
</table>

---

## Rhelixa RNAseqパイプライン

2020.09.08

国立遺伝学研究所と包括連携協定を結ぶ[株式会社Rhelixa](https://www.rhelixa.com/)（代表取締役：仲木 竜）より、RNA-seq解析パイプラインが提供され、スーパーコンピュータシステムに実装されました。

本パイプラインは、RNA-seqアプリケーションにより得られた単一サンプルのシーケンスリードデータを参照ゲノムにマッピングし、遺伝子領域ごとに集計し、全遺伝子の発現量を計算するものです。

<table>
<tr>
<td width="400">

![](Rhelixa_RNAseq1.png)

</td>
<td valign="top">
Rhelixa RNAseqパイプラインはSingularityコンテナイメージとしての形で遺伝研スパコン上にインストールされています。
Singularityコンテナイメージの遺伝研スパコン外での利用はできません。
利用方法は下記リンクをご参照ください。<br />
<br />

- [Rhelixa RNAseqパイプラインの紹介](/advanced_guides/Rhelixa_RNAseq)
- [Rhelixa RNAseqパイプライン 利用マニュアル](/advanced_guides/Rhelixa_RNAseq_manual)

</td>
</tr>
</table>



