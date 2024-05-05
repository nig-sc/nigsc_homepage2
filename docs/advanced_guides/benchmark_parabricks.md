---
id: benchmark_parabricks
title: ベンチマーク(NVIDIA Parabricks)
---

## 概要
本ページでは、NVIDIA Parabricks (以降 Parabricks と呼ぶ) というゲノム解析ツールの性能を，最新の NVIDIA H100 SXM 80GB GPU を 8 基搭載したハードウェア環境で詳細に検証した結果を掲載する.
我々の実験では，臨床研究で用いられる典型的な全ゲノムシークエンスデータセットを使用し，計算時間 と出力結果の妥当性を評価した.その結果，NVIDIA H100 GPU を搭載したシステムでは，従来の V100 を搭載したシステムと比べて計算速度を 2.3 倍以上倍高速化できる と示された.

## 検証GPU環境
アプリケーションの実効性能比較のために，H100 搭載 ノードの他に V100 搭載ノードも用いて性能評価を行った. 検証対象の H100 搭載ノードは，さくらインターネットが 提供する高火力 PHY のベアメタルサーバ*2 (以降 高火力 PHY) で実行され，V100 搭載ノードは，遺伝研スーパー コンピュータシステムが提供する Thin 計算ノード (Type 2b)*3 (以降 遺伝研 igt) で実行した. いずれも，単体のノー ドとして使用され，複数台のノード構成によるアプリケー ション性能評価は行っていない.
この二つの異なる環境下で運用されるノード間で，GPU 関連ドライバー等のバージョン違いなどに起因する実行性 能への影響を防ぐ目的で，これまで対象アプリケーション の実行実績のある遺伝研 igt の環境設定を検証条件として 採用し，高火力 PHY 上での環境構築を行った. 検証に利 用した遺伝研 igt と高火力 PHY の GPU ノードのハード ウェア環境およびソフトウェア環境を表 1 に示す.

表 1 検証ノード構成
| | 遺伝研igt | 高火力PHY|
|----|----|----|
|利用環境|マネージドクラスター|ベアメタルサーバ|
|Hardware構成|
|CPU (総コア数)|Intel Xeon Gold 6136 3.0GHz x 2 基 (24)|Intel Xeon Platinum 8480 2.0GHz x 2 基 (112)|
|メモリー|DDR4 384GB|DDR5 2.0TB|
|GPU (FP64)|NVIDIA V100 SXM2 16GB (7.8 TFlops) x 4 基|NVIDIA H100 SXM5 80GB (33.5 Tflops ) x 8 基|
|GPU 間接続|NVLink Hybid Cube Mesh|NVSwitch Fabric|
|システムディスク|NVMe SSD 1.6TB x 1 枚|NVMe SSD 960GB x 2 枚 (RAID1 構成)|
|データディスク|NVMe SSD 3.2TB x 1 枚|NVMe 7.68TB x 4 枚|
|Software 構成 |
|OS|Ubuntu Server 22.04 LTS|Ubuntu Server 22.04 LTS |
|GPU ドライバー|530.30.02|530.30.02|
|CUDA|12.1|12.1|
|Fabric Manager|N/A|UP|
|Singularity CE|4.0.0|4.0.0|

\begin{table*}[tb] 
%\caption{V100搭載マシンのハードウェア構成}
\caption{検証ノード構成}
\ecaption{Node configuration of a machine}
\label{tab:node-info}
\hbox to\hsize{\hfil
\begin{tabular}{l|l|l}
\hline\hline
& \textbf{遺伝研igt} & \textbf{高火力PHY} \\
\hline\hline
利用環境 & マネージドクラスター
        & ベアメタルサーバ \\
\hline\hline
\multicolumn{3}{l}{Hardware構成} \\
\hline
CPU (総コア数) & Intel Xeon Gold 6136 3.0GHz x 2基 (24) 
    & Intel Xeon Platinum 8480 2.0GHz x 2基 (112)\\
メモリー & DDR4 384GB
       & DDR5 2.0TB\\
GPU (FP64) & NVIDIA V100 SXM2 16GB (7.8 TFlops) x 4基 
     & NVIDIA H100 SXM5 80GB (33.5 Tflops ) x 8基 \\
GPU間接続 & NVLink Hybid Cube Mesh 
         & NVSwitch Fabric \\
システムディスク & NVMe SSD 1.6TB x 1枚,  
             & NVMe SSD 960GB x 2枚 (RAID1構成) \\
データディスク & NVMe SSD 3.2TB x 1枚 
        & NVMe 7.68TB x 4枚 \\
\hline
\hline
\multicolumn{3}{l}{Software構成} \\
\hline
OS  & Ubuntu Server 22.04 LTS
    & Ubuntu Server 22.04 LTS \\
GPUドライバー & 530.30.02 
           & 530.30.02          \\
CUDA   & 12.1  
       & 12.1       \\
Fabric Manager & N/A  & UP \\ 
Singularity CE & 4.0.0 & 4.0.0 \\
\hline
\hline
\end{tabular}\hfil}
\end{table*}

 
### ハードウェア構成
基本構成の違いとして，遺伝研 igt では 24 コアを持つ
CPU に DDR4 の 384GB のメモリを採用しているのに対 して，高火力 PHY では，112 コアに，2TB のメモリと 強化されている. 加えて GPU に関しては，遺伝研 igt で は，Volta GV100 アーキテクチャを採用した V100 SXM2 16GB をノード内に 4 枚収容し，NVLink Hybid Cube Mesh で GPU 間が相互に接続した構成に対して，高火力 PHY で は，Hopper GH100 アーキテクチャを採用した H100 SXM5 80GB をノード内に 8 枚収容し，NVSwitch により 8 基の GPU 間を相互に高速接続している.

### ソフトウェア構成
検証環境で構成される OS のディストリビューション，
GPU を利用する際に不可欠なドライバー，管理ツール等 のソフトウェアスタックを，遺伝研 igt と高火力 PHY に おいて可能な限り一致させる事で，対象とするアプリケー ションの実装上の違い以外の差異を最小限に抑えた. 性能 評価対象の高火力 PHY がベアメタルサーバであるのに対 して，遺伝研 igt はマネージドクラスターでもあり，容易 に OS 等と密接に関連したドライバーの変更はマネージドクラスターの運用に関わる事でもあるため，比較的柔軟に 対応できるベアメタルサーバである高火力 PHY 側を遺伝 研 igt のソフトウェア構成に合わせた.ソフトウェアの実 行には実際の分野研究で使われているワークフロー環境で の実績を重視して，Singularity コンテナのプラットフォー ム上での評価環境を構築した.

## ストレージ環境
Parabricks および Dorado の実行には，十分なサイズの データセットを格納でき，高速に読み書きできるストレージ 環境の確保は不可欠である. 遺伝研 igt および高火力 PHY は，高速な NVMe SSD をローカルストレージとして備え ている事から，各アプリケーションの入出力用のストレー ジ領域として利用した. 検証に利用した遺伝研 igt と高火力 PHY の搭載されているストレージ構成と，fio コマンド*4 に よるファイルのシーケンシャルな READ/WRITE による I/O 性能測定結果を表 2 に示す. 測定対象にある/tmp は， システムディスク上の NVMe SSD を指している. 遺伝研 igt では/data 領域での性能に差は少なかった.一方で，高 火力 PHY では約 7 倍の性能差があった.

表 2 検証環境のストレージ構成とシーケンシャル I/O 性能
\begin{table}[tb] 
\caption{検証環境のストレージ構成とシーケンシャルI/O性能}
\ecaption{Storage configuration and sequential I/O performance of the verification environment}
\label{tab:storage-info}
\hbox to\hsize{\hfil
\begin{tabular}{l|l|l|l}\hline\hline
        & 測定対象 & READ  & WRITE  \\
\hline
\hline
遺伝研igt& /tmp & 533MiB/s  & 531MiB/s \\
        & /data & 607MiB/s & 605MiB/s \\
\hline
高火力PHY & /tmp & 145MiB/s &  153MiB/s   \\
         & /data & 1052MiB/s & 1111MiB/s \\
\hline
\end{tabular}\hfil}
\end{table}

## ゲノム解析ソフトウェア
NCGM WGSpipeline *5は，ヒト個人の全ゲノムシーク エンス (whole-genome sequencing; WGS) データを入力と して多型検出を行う汎用的なワークフローである.この ワークフローは，複数のコンポーネントから構成されてお り，参照ゲノム配列へのマッピング，マップされた配列か ら多型を検出するバリアントコールなどのプロセスが含ま れている.ゲノム多型解析の入力データとして単一の研究 プロジェクトだけでも数十万人分の WGS データを扱うこ ともあるため，効率的に多型解析の計算を実行することは バイオインフォマティクス分野における重要な課題である.
NCGM WGSpipeline は，GPU を活用する NVIDIA 社 の Parabricks *6 を主なゲノム解析ソフトウェアとして利用 しており，従来の CPU ベースの Genome Analysis Toolkit
(GATK) [1] をゲノム解析ソフトウェアとして利用する 場合と比較して，10 倍以上高速にデータ加工を実施する ことができる.FPGA を用いたアクセラレータを利用す る手法も提案されているが [2]，Parabricks の利点のひと つは，汎用の GPU を使用できるため計算機資源をより柔 軟に活用できる面にある.ワークフローの可搬性と可用性 を高めるため NCGM WGSpipeline は Common Workflow Language (CWL) [3] を用いて実装されており，異なる計算機環境であっても容易に実行が可能である.

## 性能評価
性能評価では高火力 PHY および遺伝研 igt 上で，以下 のバージョンの Parabricks ソフトウェアを用いた NCGM WGSpipeline で解析を行った.
• v4.1.0 • v4.1.1 • v4.2.0 • v4.2.1
実行パラメータとして，GPU RAM の使用量を抑える ‘–low-memory’ オプションを指定した場合と指定しない場 合の両方について計算時間を評価した *8.
入力として 1000 人ゲノムプロジェクト [4] から 20 サンプ ル (NA18941，NA18945, NA18946, NA18952, NA18953, NA18957, NA18960, NA18964, NA18969, NA18971, NA18972, NA18976, NA18983, NA18988, NA18990, NA18991, NA18995，NA19001, NA19002, NA19006) を 選択して解析を行なった.Parabricks v4.2.0 および v4.2.1 において 2 サンプル (NA18941, NA18995) は実行エラーが 生じ計算速度測定を行えなかった.そのため，18 サンプル の計算時間の平均を比較した.
各サンプルの入力データは 20 個程度の圧縮済 fastq ファ イルに分割収容されており，各サンプルにおける入力デー タの総データ量は圧縮下で約 43GB から 55GB であった.

### ノードおよびバージョンごとの解析時間
表 3 にノードおよび Parabricks のバージョンごとの解 析時間を示す.
今回の性能評価では，同一ノード上であれば Parabricks のバージョンで解析時間はほとんど変わらなかった.ま た遺伝研 igt では GPU RAM 容量が 16GB であり ‘–low- memory’ オプション無しでは実行できないことが分かって いたため ‘–low-memory’ オプション有りでのみ実行した.
‘–low-memory’ オプション有りの結果を比較すると，い ずれのバージョンでも，高火力 PHY は遺伝研 igt の 2.3 倍以上高速に解析を完了できた.解析が高速だった要因とし て GPU の性能や GPU の搭載数の差が考えられるが，ど の要素が支配的かは今回の評価では判断できなかった.ま た高火力 PHY のいずれのバージョンでも，‘–low-memory’ オプションの有無で解析速度にほとんど差は出なかった.

表 3 ノードおよび Parabricks バージョンごとの解析時間
\begin{table*}[tb] 
\caption{ノードおよびParabricksバージョンごとの解析時間}
\ecaption{Comparison of analysis time for each machine and each Parabricks version}
\label{tab:parabricks-comparison-speed}
\hbox to\hsize{\hfil
\begin{tabular}{cc|rr}\hline\hline
GPU & Parabricks & 解析時間（分） & 解析時間（分）\\
    & version    & w/ low memory & w/o low memory\\\hline
%%%%%
          & v4.1.0 & 37.65 & 38.42\\
高火力 PHY & v4.1.1 & 38.15 & 37.93\\
(H100x8)  & v4.2.0 & 36.17 & 36.78\\
          & v4.2.1 & 37.87 & 36.38\\\hline
%%%%%
          & v4.1.0 & 88.00 & –\\
遺伝研 igt & v4.1.1 & 88.42 & –\\
(V100x4)  & v4.2.0 & 89.13 & –\\
          & v4.2.1 & 90.05 & –\\\hline
\hline
\end{tabular}\hfil}
\end{table*}

### 解析結果の妥当性
表 4 に Parabricks v4.0.0 と今回評価した各バージョン の Parabricks の計算結果の多型検出結果の一致率 (geno- type concordance) を示す. 一致率は多型の種類を考慮し SNP(一塩基置換) と INDEL(塩基配列の挿入・欠失) を区 別して計算した.多型の種類にかかわらず，v4.1.0 および v4.1.1 の解析結果は v4.0.0 と完全に一致した.v4.2.0 お よび v4.2.1 では v4.0.0 の解析結果と完全一致ではないも のの，非常に高い一致率を示しほとんど完全に一致して いた.v4.0.0, v4.1.0, v4.1.1 は GATK v4.2.0.0 と互換とな るよう実装されており，v4.2.0, v4.2.1 は GATK v4.3.0.0 と互換になるよう実装されている.この点が Parabricks v4.2.0 および v4.2.1 の結果が v4.0.0 と完全一致しなかっ た原因と考えられる.全てのバージョンにおいて解析結果 は Parabricks v4.0.0 の結果と非常に高い一致率を示し，解 析結果は妥当だと考えられる.

\begin{table}[tb] 
\caption{Parabricks v4.0.0 と評価に用いた各Parabricksバージョンごとの変異ごとのgenotype concordance}
\ecaption{Comparison of SNP and INDEL genotype concordance between Parabricks v4.0.0 and for each Parabricks version}
\label{tab:parabricks-comparison-genotype}
\hbox to\hsize{\hfil
\begin{tabular}{l|rrrr}\hline\hline
      & v4.1.0 & v4.1.1 & v4.2.0 & v4.2.1\\\hline
%%%%%
SNP   & 1.0000000 & 1.0000000 & 0.9999979 & 0.9999979\\
%%%%%
INDEL & 1.0000000 & 1.0000000 & 0.9999932 & 0.9999932\\\hline
\hline
\end{tabular}\hfil}
\end{table}


### GPU 利用率などを用いた考察
図 1，図 2および図 3に，高火力PHYでNCGM WGSPipeline (Parabricks v4.2.1) を 用 い て NA18945 を 解析した時の GPU，CPU およびディスク使用率の推移を 示す.解析開始から 21:10 頃まではマッピング処理，21:21 以降はバリアントコールの GPU，CPU およびディスク利 用率の推移を表している.
マッピング処理時では GPU を効率的に使えていないこ とがわかるが，これはマッピング処理およびその後処理で ファイルの圧縮および書き込みを並行して行っているのが 理由だと考えられる.またマッピングおよびその後処理で は CPU コアを一部しか使えていないことがわかるが，こ れがアルゴリズム的な制約なのか，実装やオプション設定 の問題なのかは今後調査が必要である.
NCGM WGSpipeline では合計 5 種類のバリアントコー ルが実行される.21:21 から 21:30 までは常染色体に対す るバリアントコールで，他のバリアントコールよりも時間 がかかっていることがわかる.その他のバリアントコール はすべて一分以内に終了しており，解析全体と比較すると 時間がほとんどかかっていないこともわかる. またバリア ントコール時に GPU および CPU 使用率が特定の値から 増加していないように見えることから，GPU および CPU コアを一部しか使えていない可能性がある.
