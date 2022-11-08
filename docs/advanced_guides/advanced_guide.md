---
id: advanced_guide
title: "最新のトピック"
---

---

## NBDC-DDBJ Imputation Server (beta)

2022.10.18

**インピュテーションサーバ（Imputation Server）** は、SNP アレイデータのインピュテーション解析を支援するサービスです。**[ミシガン大学のインピュテーションサーバ](https://imputationserver.sph.umich.edu/)** や **[TOPMed プロジェクトのインピュテーションサーバ](https://imputation.biodatacatalyst.nhlbi.nih.gov/)** が公開されています。これらのサーバは日本国外に設置されており、利用のためにゲノムデータ（SNP アレイデータ）を国外のサーバにアップロードする必要がありました。

そこで、**[国立研究開発法人科学技術振興機構 NBDC 事業推進部](https://biosciencedbc.jp)** では日本の研究者が利用しやすい日本版インピュテーションサーバとして、**NBDC-DDBJ インピュテーションサーバ**のシステムを開発しました。現在このシステムは、**[国立遺伝学研究所スーパーコンピュータシステム](https://sc.ddbj.nig.ac.jp)** の **[個人ゲノム解析区画](https://sc.ddbj.nig.ac.jp/personal_genome_division/pg_introduction/)** で利用可能です。


本サーバで使用しているインピュテーションのワークフローは、以下の AMED 事業において国立国際医療研究センターが検討した情報（インピュテーションソフトウェアの選定・パラメータの設定）の提供を受け、その情報を参考に NBDC 事業推進部がウェブサービスとして改変・実装したものです。 事業名：ゲノム医療実現推進プラットフォーム事業（国際的データシェアリングに関する課題解決のための調査研究及び開発研究） 課題名：「クラウド計算環境を利用したゲノム医科学研究の倫理・技術課題の調査と実践」

<table>
<tr>
<td width="400">


![](/img/advanced_guides/imputationserver.Fig1-work.png)

</td>
<td valign="top">

NBDC-DDBJ インピュテーションサーバ（ベータ版）（以下、本システム）は、遺伝研スパコンの個人ゲノム解析区画で利用可能です。研究者（利用者）はご自身のゲノムデータをサーバにアップロードし、Web ユーザインターフェースを介してインピュテーション解析ワークフローを実行することができます。

- [NBDC-DDBJ Imputation Server の概要](/advanced_guides/imputation_server)
- [インストールマニュアル](/advanced_guides/imputation_server_install)
- [チュートリアル](/advanced_guides/imputation_server_tutorial)


</td>
</tr>
</table>





---
## PortablePipeline

2022.05.10

東京大学大学院農学生命科学研究科水圏生物科学専攻水圏生物工学研究室の吉武和敏先生により、NGS 解析パイプラインについて、PortablePipeline というツールが開発されました。

ツールの実行手順等は、<a href="https://www.suikou.fs.a.u-tokyo.ac.jp/blog/2022/04/28/%e9%81%ba%e4%bc%9d%e7%a0%94%e3%81%ae%e3%82%b9%e3%83%91%e3%82%b3%e3%83%b3%e3%81%a7%e6%89%8b%e8%bb%bd%e3%81%abngs%e8%a7%a3%e6%9e%90%e3%82%92%e5%ae%9f%e8%a1%8c%e3%81%99%e3%82%8b%e6%89%8b%e9%a0%86/">水圏生物工学研究室のページ</a>をご参照ください。

<table>
<tr>
<td width="400">

![](/img/advanced_guides/portablepipeline.png)
</td>
<td valign="top">
「Windows や Mac から遺伝研のスパコンにお手軽に NGS 解析ジョブを投げるツールとして PortablePipeline を開発しました。当研究室で使用頻度の高い解析パイプラインが実行できます。解析サーバとしては python3 と docker もしくは singularity がインストールされていればスパコンでなくても実行できます。」（水圏生物工学研究室のページより）
</td>
</tr>
</table>


---

## DFAST

2021.10.02

DFASTは、国立遺伝学研究所 情報研究系中村研究室・大量遺伝情報研究室の谷澤靖洋先生により作られた原核生物ゲノムの自動アノテーションツールです。DDBJ へのゲノム塩基配列登録用のファイルを生成することもできます。ファイルをアップロードするだけで利用可能なウェブ版 https://dfast.ddbj.nig.ac.jp とコマンド操作で実行するスタンドアローン版があります。

<table>
<tr>
<td width="400">

![](/img/advanced_guides/dfast.png)
</td>
<td valign="top">
スタンドアローン版をスパコンで実行する場合、<a href="https://github.com/nigyta/dfast_core/">https://github.com/nigyta/dfast_core/ </a>からソースコードを取得してインストールする方法 (Python 3.6 以降 + Biopython が必要) とスパコンで提供されている singularity コンテナを利用する方法 (参考: <a href="https://qiita.com/nigyta/items/e1de21f6ece65d69ec1d">https://qiita.com/nigyta/items/e1de21f6ece65d69ec1d</a>) があります。
</td>
</tr>
</table>

---

## Rhelixa RNAseq パイプライン

2020.09.08

国立遺伝学研究所と包括連携協定を結ぶ[株式会社 Rhelixa](https://www.rhelixa.com/)（代表取締役：仲木 竜）より、RNA-seq 解析パイプラインが提供され、スーパーコンピュータシステムに実装されました。

本パイプラインは、RNA-seq アプリケーションにより得られた単一サンプルのシーケンスリードデータを参照ゲノムにマッピングし、遺伝子領域ごとに集計し、全遺伝子の発現量を計算するものです。

<table>
<tr>
<td width="400">

![](Rhelixa_RNAseq1.png)

</td>
<td valign="top">
Rhelixa RNAseq パイプラインは Singularity コンテナイメージとしての形で遺伝研スパコン上にインストールされています。
Singularity コンテナイメージの遺伝研スパコン外での利用はできません。
利用方法は下記リンクをご参照ください。<br />
<br />

- [Rhelixa RNAseq パイプラインの紹介](/advanced_guides/Rhelixa_RNAseq)
- [Rhelixa RNAseq パイプライン 利用マニュアル](/advanced_guides/Rhelixa_RNAseq_manual)

</td>
</tr>
</table>



