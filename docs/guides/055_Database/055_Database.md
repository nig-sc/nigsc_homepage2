---
id: Database
title: Database
---

## ヒトゲノム研究データセットアーカイブ {#human-genome-datasets-archive}

<table>
  <tr>
    <th width="100">データセット</th>
    <th width="800">概要</th>
  </tr>
  
  <tr>
    <td>[Japanese Genotype-phenotype Archive (JGA)](https://www.ddbj.nig.ac.jp/jga/index.html)</td>
    <td>
		<p>日本やアジア等の研究者らが取得したヒト全ゲノムシークエンスデータ、エクソームシークエンスデータ、遺伝型インピュテーションパネル等のデータセットが登録されている。制限公開データベースであり、データセットにアクセスするためにはデータ利用申請が必要。[利用可能な研究データ一覧](https://humandbs.dbcls.jp/data-use/all-researches)からデータセット一覧を閲覧可能。[データ利用方法](https://humandbs.dbcls.jp/data-use)を確認の上、[データ利用申請システム](https://humandbs.ddbj.nig.ac.jp/nbdc/application/)から利用申請が可能</p>
		<p>NCBIのカウンターパートサービス：[The database of Genotypes and Phenotypes (dbGaP)](https://www.ncbi.nlm.nih.gov/gap/) </p>
		<p>EBIのカウンターパートサービス：[European Genome-Phenome Archive (EGA)](https://ega-archive.org/)</p>
	</td>
  </tr>
  
  <tr>
	<td>[Japanese Genotype-phenotype Archive Metadata (JGA-metadata)](https://ddbj.nig.ac.jp/public/jga/)</td>
	<td>
		<p>JGAデータベースのメタデータのレポジトリ。メタデータは公開情報であり、データ利用申請の必要なくアクセス可能。</p>
		<p>ダウンロードURL: https://ddbj.nig.ac.jp/public/jga/ </p>
		<p>遺伝研スパコンファイルパス: /usr/local/shared_data/jga </p>
	</td>
  </tr>
  
  <tr>
	<td>[公開ヒトゲノムデータセット再解析結果](https://ddbj.nig.ac.jp/public/public-human-genomes/)</td>
	<td>
		<p>公的に利用可能なヒト全ゲノムシーケンスデータセット（1000Genomes、HGDP、KPGP、SGDP）の再解析結果。GRCh38 assemblyに基づくアライメント結果(cram)・バリアント検出結果(gVCF, aggregate VCF)と、CHM13 assemblyに基づくアライメント結果(cram)・バリアント検出結果(gVCF)が公開されている。</p>
		<p>ダウンロードURL: https://ddbj.nig.ac.jp/public/public-human-genomes/ </p>
		<p>遺伝研スパコンファイルパス: /usr/local/shared_data/public-human-genomes/ </p>
	</td>
  </tr>
</table>


## ヒトゲノム多型データベース {#human-genome-variation-databases}
<table>
  <tr>
    <th width="100">データセット</th>
    <th width="800">概要</th>
  </tr>

  <tr>
    <td>[TogoVar-repository](https://www.ddbj.nig.ac.jp/togovar/index.html)</td>
    <td>
	<p>TogoVar-repository はヒトのバリアント、アリル頻度、遺伝子型のための公的データベースです。ヒトのバリアントに対してアクセッション番号が発番され、データはNCBI [dbSNP](https://www.ncbi.nlm.nih.gov/snp/), NCBI [dbVar](https://www.ncbi.nlm.nih.gov/dbvar/), EBI [European Variation Archive](https://www.ebi.ac.uk/eva/)と交換されています。</p>
	<p>ダウンロードURL: https://ddbj.nig.ac.jp/public/togovar/ </p>
	<p>遺伝研スパコンファイルパス: /usr/local/shared_data/togovar/ </p>
	<p>NCBIのカウンターパート(50bp以下の小さな多型 [1塩基多型、マイクロサテライト、短い挿入と欠失] が対象)：[The Single Nucleotide Polymorphism Database (dbSNP)](https://www.ncbi.nlm.nih.gov/snp/)</p>
	<p>NCBIのカウンターパート(50bpを超える構造多型 [挿入、欠失、重複、逆位、転移因子、転座、複合多型] が対象)：[The Database of Genomic Structural Variation (dbVar)](https://www.ncbi.nlm.nih.gov/dbvar/) </p>
	<p>EBIのカウンターパート(ヒト以外の生物種も対象)：[European Variation Archive (EVA)](https://www.ebi.ac.uk/eva/) </p>
    </td>
  </tr>
  
</table>


## 注釈付き配列データベース {#annotated-sequence-databases}
<table>
  <tr>
    <th width="100">データセット</th>
    <th width="800">概要</th>
  </tr>
  
  <tr>
    <td>[DDBJ Annotated/Assembled Sequences](https://www.ddbj.nig.ac.jp/ddbj/index.html)</td>
    <td>
		<p>アノテーションが付与されたゲノム、遺伝子、転写産物の塩基配列のデータベース。DDBJ（DNA Data Bank of Japan）は国際塩基配列データベースを共同構築する [INSDC](https://www.ddbj.nig.ac.jp/insdc/index.html) (International Nucleotide Sequence Database Collaboration) の一員として、アノテーションが付与された/アセンブルされた塩基配列データを共有しています。</p>
		<p>ダウンロードURL: https://ddbj.nig.ac.jp/public/ddbj_database/ddbj/</p>
		<p>遺伝研スパコンファイルパス: TBD</p>
		<p>NCBIのカウンターパート：[NCBI GenBank](https://www.ncbi.nlm.nih.gov/genbank/)</p>
		<p>NCBIのカウンターパート(非冗長なデータセット)：[NCBI RefSeq](https://www.ncbi.nlm.nih.gov/refseq/)</p>
		<p>EBIのカウンターパート(アノテーションが付与された配列と生配列の両方が対象)：[European Nucleotide Archive (ENA)](https://www.ebi.ac.uk/ena/)</p>
	</td>
  </tr>

  <tr>
    <td>[NCBI GenBank (mirror)](https://ddbj.nig.ac.jp/public/mirror_database/ftp.ncbi.nih.gov/genbank/)</td>
    <td>
		<p>DDBJが提供する、NCBI GenBankデータミラー</p>
		<p>ダウンロードURL: https://ddbj.nig.ac.jp/public/mirror_database/ftp.ncbi.nih.gov/genbank/</p>
		<p>遺伝研スパコンファイルパス: TBD</p>
	</td>

  </tr>
  
  <tr>
    <td>[NCBI RefSeq (mirror)](https://ddbj.nig.ac.jp/public/mirror_database/ftp.ncbi.nih.gov/ncbi_refseq/)</td>
    <td>
		<p>DDBJが提供する、NCBI RefSeqデータミラー</p>
		<p>ダウンロードURL: https://ddbj.nig.ac.jp/public/mirror_database/ftp.ncbi.nih.gov/ncbi_refseq/</p>
		<p>遺伝研スパコンファイルパス: TBD</p>
	</td>
  </tr>

  <tr>
    <td>[ENA (mirror)](https://ddbj.nig.ac.jp/public/mirror_database/ftp.ebi.ac.uk/)</td>
    <td>
		<p>DDBJが提供する、ENAデータミラー</p>
		<p>ダウンロードURL: https://ddbj.nig.ac.jp/public/mirror_database/ftp.ebi.ac.uk/</p>
		<p>遺伝研スパコンファイルパス: TBD</p>
	</td>
  </tr>
</table>


## 生配列データベース {#raw-sequence-databases}

<table>
  <tr>
    <th width="100">データセット</th>
    <th width="800">概要</th>
  </tr>
  <tr>
    <td>[DDBJ Sequence Read Archive (DRA)](https://www.ddbj.nig.ac.jp/dra/index.html)</td>
    <td>
		<p>高性能シークエンス装置からの生配列データとアライメント情報を格納するデータベース</p>
		<p>ダウンロードURL: https://ddbj.nig.ac.jp/public/ddbj_database/dra/</p>
		<p>遺伝研スパコンファイルパス: /usr/local/shared_data/dra/</p>
		<p>NCBIのカウンターパート: [NCBI Sequence Read Archive (SRA)](https://www.ncbi.nlm.nih.gov/sra)</p>
		<p>EBIのカウンターパート(アノテーションが付与された配列と生配列の両方が対象): [European Nucleotide Archive (ENA)](https://www.ebi.ac.uk/ena/)</p>
	</td>
  </tr>
</table>


## 機能ゲノミクスデータベース {#functional-genomics-databases}

<table>
  <tr>
    <th width="100">データセット</th>
    <th width="800">概要</th>
  </tr>
  <tr>
    <td>[Genomic Expression Archive (GEA)](https://www.ddbj.nig.ac.jp/gea/index.html)</td>
    <td>
		<p>[MIAME(the Minimum Information About a Microarray Experiment)](https://pubmed.ncbi.nlm.nih.gov/11726920/) に準拠したアレイと配列ベースの機能ゲノミクスデータのレポジトリ</p>
		<p>ダウンロードURL: https://ddbj.nig.ac.jp/public/ddbj_database/gea/</p>
		<p>遺伝研スパコンファイルパス: /usr/local/shared_data/gea/</p>
	</td>
  </tr>
</table>

## タンパク質配列と生体高分子立体構造データベース {#protein-sequence-and-biomolecular-structure-databases}

<table>
  <tr>
    <th width="100">データセット</th>
    <th width="800">概要</th>
  </tr>
  
  <tr>
    <td>[Uniprot mirror](https://ddbj.nig.ac.jp/public/mirror_database/ftp.uniprot.org/)</td>
    <td>
		<p>DDBJが提供する、[Uniprot](https://www.uniprot.org/)のデータミラー</p>
		<p>タンパク質配列と機能情報のリソース。[ELIXER](https://elixir-europe.org/about-us/who-we-are)が提供。</p>
		<p>ダウンロードURL: https://ddbj.nig.ac.jp/public/mirror_database/ftp.uniprot.org/</p>
		<p>遺伝研スパコンファイルパス: TBD</p>
	</td>
  </tr>

  <tr>
    <td>[Protein Data Bank Japan (PDBj) mirror](https://ddbj.nig.ac.jp/public/mirror_database/ftp.pdbj.org/)</td>
    <td>
		<p>DDBJが提供する、[PDBj](https://pdbj.org/)のデータミラー</p>
		<p>生体高分子の構造データベース。[大阪大学蛋白質研究所](http://www.protein.osaka-u.ac.jp/)が提供</p>
		<p>ダウンロードURL: https://ddbj.nig.ac.jp/public/mirror_database/ftp.pdbj.org/</p>
		<p>遺伝研スパコンファイルパス: TBD</p>
	</td>
  </tr>

  <tr>
    <td>[World Wide Protein Data Bank (wwPDB) mirror](https://ddbj.nig.ac.jp/public/mirror_database/pdb/)</td>
    <td>
		<p>DDBJが提供する、[wwPDB](https://www.wwpdb.org/)のデータミラー</p>
		<p>生体高分子（タンパク質、DNA、RNA）の3次元構造データのアーカイブ。[wwPDB](https://www.wwpdb.org/)提供</p>
		<p>ダウンロードURL: https://ddbj.nig.ac.jp/public/mirror_database/pdb/</p>
		<p>遺伝研スパコンファイルパス: TBD</p>
	</td>
  </tr>

</table>
  

## メタボロミクスデータベース {#metabolomics-databases}

<table>
  <tr>
    <th width="100">データセット</th>
    <th width="800">概要</th>
  </tr>

  <tr>
    <td>[MetaboBank](https://www.ddbj.nig.ac.jp/metabobank/index.html)</td>
    <td>
		<p>メタボロミクスデータの登録を受付ける公共リポジトリ</p>
		<p>ダウンロードURL: https://ddbj.nig.ac.jp/public/metabobank/</p>
		<p>遺伝研スパコンファイルパス: /usr/local/shared_data/metabobank/</p>
	</td>
  </tr>
</table>


## 生物タクソノミーデータベース {#biological-taxonomy-databases}

<table>
  <tr>
    <th width="100">データセット</th>
    <th width="800">概要</th>
  </tr>

  <tr>
    <td>[NCBI Taxonomy mirror](https://ddbj.nig.ac.jp/public/mirror_database/ftp.ncbi.nih.gov/ncbi_taxonomy/)</td>
    <td>
		<p>DDBJが提供する、[NCBI Taxonomy](https://www.ncbi.nlm.nih.gov/taxonomy)データミラー</p>
		<p>GenBank、ENA (EMBL)、DDBJデータベースからなる国際塩基配列データベース共同体(INSDC)の標準命名・分類リポジトリ。INSDCのヌクレオチドおよびタンパク質配列データベースに登録されている各列の生物名と分類系統を含む。</p>
		<p>ダウンロードURL: https://ddbj.nig.ac.jp/public/mirror_database/ftp.ncbi.nih.gov/ncbi_taxonomy/</p>
		<p>遺伝研スパコンファイルパス: TBD</p>
	</td>
  </tr>
</table>


## メタデータデータベース {#metadata-databases}

<table>
  <tr>
    <th width="100">データセット</th>
    <th width="800">概要</th>
  </tr>

  <tr>
	<td>[DDBJ BioProject](https://www.ddbj.nig.ac.jp/bioproject/index.html)</td>
	<td>
		<p>研究プロジェクトとプロジェクトに由来するデータをまとめるためのデータベース。データが BioProject アクセッション番号を引用することで、データがプロジェクト単位でまとめられる。DDBJ BioProject は登録されたプロジェクトに対してプレフィックス ‘PRJDB’ のアクセッション番号を発行している。公開されたプロジェクトデータは EBI と NCBI と共有される。</p>
		<p>ダウンロードURL: https://ddbj.nig.ac.jp/public/ddbj_database/bioproject/</p>
		<p>遺伝研スパコンファイルパス: /usr/local/shared_data/bioproject/</p>
		<p>NCBIのカウンターパート: [NCBI BioProject](https://www.ncbi.nlm.nih.gov/bioproject/)</p>
	</td>
  </tr>

  <tr>
    <td>[NCBI BioProject (mirror)](https://ddbj.nig.ac.jp/public/mirror_database/ftp.ncbi.nih.gov/ncbi_bioproject/)</td>
    <td>
		<p>DDBJが提供する、[NCBI BioProject](https://www.ncbi.nlm.nih.gov/bioproject/)のデータミラー</p>
		<p>ダウンロードURL: https://ddbj.nig.ac.jp/public/mirror_database/ftp.ncbi.nih.gov/ncbi_bioproject/</p>
		<p>遺伝研スパコンファイルパス: TBD</p>
	</td>
  </tr>

  <tr>
	<td>[DDBJ BioSsample](https://www.ddbj.nig.ac.jp/biosample/index.html)</td>
	<td>
		<p>DDBJ の一次データベースに登録されている実験データを得るのに使われた生物学的な試料 (サンプル) についての情報を集中して管理するデータベース。BioSample の例としてはセルライン,組織の生検,生物個体や環境サンプルなどが挙げられる。サンプルデータは EBI と NCBI BioSample データベース間で共有される。</p>
		<p>ダウンロードURL: https://ddbj.nig.ac.jp/public/ddbj_database/biosample/</p>
		<p>遺伝研スパコンファイルパス: /usr/local/shared_data/biosample/</p>
		<p>NCBIのカウンターパート: [NCBI BioSample](https://www.ncbi.nlm.nih.gov/biosample)</p>
	</td>
  </tr>

  <tr>
    <td>[NCBI BioSample mirror](https://ddbj.nig.ac.jp/public/mirror_database/ftp.ncbi.nih.gov/ncbi_biosample/)</td>
    <td>
		<p>DDBJが提供する、[NCBI BioSample](https://www.ncbi.nlm.nih.gov/biosample)のデータミラー</p>
		<p>ダウンロードURL: https://ddbj.nig.ac.jp/public/mirror_database/ftp.ncbi.nih.gov/ncbi_biosample/</p>
		<p>遺伝研スパコンファイルパス: TBD</p>
	</td>
  </tr>

</table>


## データ間の関連性データベース {#databases-for-data-linkage}

<table>
  <tr>
    <th width="100">データセット</th>
    <th width="800">概要</th>
  </tr>

  <tr>
    <td>[DDBJ, Linked Data (DDBJ-LD)](https://ddbj.nig.ac.jp/public/rdf/)</td>
    <td>
		<p>DDBJ センターのlinked data</p>
		<p>ダウンロードURL: https://ddbj.nig.ac.jp/public/rdf/</p>
		<p>遺伝研スパコンファイルパス: /usr/local/shared_data/rdf/</p>
	</td>
  </tr>

</table>


