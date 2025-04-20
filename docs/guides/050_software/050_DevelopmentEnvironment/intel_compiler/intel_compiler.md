---
id: intel_compiler
title: "C/C++の使い方 (Intel Compiler)"
---

遺伝研スパコンでは、***インテル oneAPI ベース & HPCツールキット　マルチノード***　を導入しており以下のツールが利用可能となっています。各製品の詳細については以下のサイトを参照してください。

- [スイート製品に同梱される製品と機能一覧(販売元サイト)](https://www.xlsoft.com/jp/products/intel/oneapi/bundle.html)
- [oneAPI　プログラミングガイド](https://www.intel.co.jp/content/dam/www/central-libraries/jp/ja/documents/oneapi-programming-guide-jp.pdf)
- [Intel oneAPI specification](https://spec.oneapi.io/versions/latest/index.html)

gccなどオープンソースコンパイラと比較してインテルのコンパイラ、ライブラリ、開発環境を利用した方が良いと考えられる場合は以下のような場合が考えられます。

- オープンソースの数値計算ライブラリを自分でビルドして最適化、高速化を図りたい場合。特にFORTRANで記述された数値計算ライブラリをビルドしたい場合
  - [(例)Using oneMKL with R](https://www.intel.com/content/www/us/en/developer/articles/technical/using-onemkl-with-r.html)
- OpenMPなどマルチスレッドプログラミング規格を利用したプログラムをビルドする場合。特にFORTRANの場合。
- Intel MKLを内部で利用した高速なnumpy、scikit-learn、scipyなどPythonモジュールをPythonで利用したい場合(Intel Distribution for Python)
  - [IntelによるPythonの高速化概要説明資料（2018年の資料(古いが概要として))](https://jp.xlsoft.com/documents/intel/python/2018/greeneltch_fastpython.pdf)
- Intel MKLでサポートする各種数学関数群を利用したプログラムを開発したい場合
- インテルハードウェアの特性を利用した最適化された各種ライブラリを利用したい場合。最適化されたコードを詳細なコンパイルオプション指定で生成したい場合
- OpenMP、MPIなどを利用したプログラムを細かくチューニングしたりデバッグしたりしたい場合(VTune Profiler、TraceAnalyzerなど)

以下に利用可能なコンポーネントの概略表を示します。

#### 遺伝研スパコンで利用可能なコンポーネント {#available-components}

|製品名称 |概要|
|--------|---|
|インテル oneAPI DPC++/C++ コンパイラ|C/C++コンパイラ。インテルハードウェアに対応した各種の高度な最適化、高速化オプションを持ち、高度なオブジェクトコードを生成します。 |
|Intel MPI ライブラリ| Intel開発のMPIライブラリ。Intelの開発ツールとの連携が可能です。 |
|Intel oneAPI DPC++ ライブラリ(oneDPL)|C++用基本ライブラリ、テンプレートライブラリ（並列対応） |
|Intel oneMKL |線形代数、各種数学関数、FFT、乱数生成など、各種機能を持つ数値計算ライブラリ。Intelハードウェア上での長年の利用実績があり、適切な利用により高速化が期待できます。 |
|Intel oneDAL|ビッグデータ解析アプリケーションと分散計算を高速化するライブラリ |
|Intel IPP| 画像処理、信号処理、データ圧縮、暗号化処理等の各関数ライブラリ。（どちらかというとIoTや組込み機器用プロセッサ向け）|
|Intel OneTBB|C++のマルチスレッドライブラリ。スレッド並列に対応。IntelMPIとも併用|
|Intel OneCCL|分散深層学習の為のハイパフォーマンスなコミュニケーションライブラリ。Horovodなどと共に利用|
|ntel OneDNN|ディープラーニングアプリケーションで使用するライブラリ。内部でインテルハードウェアの特性(AVX512など) を利用した高速化を図っている|
|Intel Advisor| C,C++,C#,Fortranソフトウェア開発者向けの高性能ベクトル化／スレッド化プロトタイプ生成・チューニングツール|
|Intel VTune　プロファイラー| パフォーマンス分析ツール。高度なプロファイリングが可能。複雑にはなるが複数計算ノードでのデバッグにも対応|
|インテルディストリビューションのGDB|IntelのCPU,GPU,FPGA上のデバッグに対して機能追加をしたGDBです |
|Intel Fortran コンパイラ|IntelのFortranコンパイラ。Intelハードウェア向けの高度な最適化オブジェクトコードの生成が可能|
|Intel Distribution for Python|Intelが各種高速化を図ったPythonエコシステム。numpyなどのMKL対応したモジュール含む|
|Intel Inspector|メモリー／スレッドエラー検出の為のデバッガー|
|Intel Trace Analyzer & Collector| MPIアプリケーションのパフォーマンス分析・チューニング・ツール|

また、インテル社の方針により、現在、インテル ソフトウェア開発ツールは、商用およびアカデミック共に無償で利用可能になっています。（サポートは有償です）

- [国内販売元のサポート見積ページの条件](https://www.xlsoft.com/jp/products/intel/purchase/prices.html?type=ac)
- [Intel oneAPI Base Toolkitのダウンロードサイト](https://www.intel.com/content/www/us/en/developer/tools/oneapi/base-toolkit-download.html)
- [Intel oneAPI HPC Toolkitのダウンロードサイト](https://www.intel.com/content/www/us/en/developer/tools/oneapi/hpc-toolkit-download.html)

ユーザの手元の計算機でもインテル社製のツールを導入してソフトウェア作成、デバッグを実施して、その後、多量の計算資源を必要とする計算について
遺伝研スパコンシステムを利用頂くなどといった利用方法も可能と考えます。

以下に遺伝研スパコンで利用可能なコンポーネント製品について概略と基本的な利用方法について説明します。また実行ログの中にあるディレクトリパス内
の`2024.0`などの数値は記事作成時点の状況を示すものでありアップデートにより変わる可能性があります。実態に即して適宜読み替えてください。


## インテル® oneAPI DPC++/C++ コンパイラ {#intel-one-api-dpc-compailer}

遺伝研スパコンではIntel OneAPI DPC++/C++コンパイラが利用可能です。


Intelコンパイラにはデフォルトでパスが通っています。

```
 yxxxx@at138:~$ which icx
/lustre7/software/intel_ubuntu/oneapi/compiler/2024.0/bin/icx
 yxxxx@at138:~$ which icpx
/lustre7/software/intel_ubuntu/oneapi/compiler/2024.0/bin/icpx
```

高度な最適化を行ったバイナリを実行する場合は、インテルCPUを搭載した計算ノードで実行してください（AMD CPUでも動作はします）。一般区画に
ついては以下のキュー構成を参照してください。

- [AGEのキュー構成](/guides/old_docs/ga_grid_engine_queue/)

### コンパイラコマンド形式 {#intel-one-api-dpc-compailer#command-format}

|言語 |コマンド |実行形式|
|-----|--------|-------|
|C  | icx    | icx [オプション] ファイル名 |
|C++  | icpx    | icpx [オプション] ファイル名 |

### 主なオプション {#intel-one-api-dpc-compailer#main-option}

インテルコンパイラで利用可能な主なオプションの概要について以下に示します。

| オプション名 |説明|
|-------------|----|
|-o FILENAME | オブジェクトファイルの名前を指定します。 |
|-mcmodel=medium|2Gbyteを超えてメモリを利用できるようになります。|
|-shared-intel|インテルが提供するライブラリをすべて動的にリンクします。|
|-qopenmp | OpenMP指示子を有効にしてコンパイルします。|
|-qmkl | MKLライブラリをリンクします。 |
|-parallel | 自動並列化を行います。|
|-O0 / -O1 / -O2 / -O3 |最適化のレベルを指定します（デフォルトは-O2）。|
|-fast|プログラムの実行速度が最大になるように最適化します。-fast オプションにより、次のオプションが自動で付与されます。-ipo, -O3, -static, -fp-model fast=2  |
|-ip| 単一ファイル内で、手続き間の処理を最適化します。|
|-ipo| 複数ファイル間で、手続き間の処理を最適化します。コンパイルに要する時間が大幅に増加します。|
|-xCORE-AVX512  /  -xCORE-AVX2 |Intelプロセッサ向けに，指定した命令セットに対応した最適化コードを生成します。|
|-static-intel|インテルが提供するライブラリを静的にリンクします。|


基本的には-fastオプションをつけて状況を確認することがベンダ推奨となっています。

その他オプションの詳細は、インテルの以下のサイトから参照可能です。

[インテルのドキュメントサイトでのコンパイラオプションの詳細](https://www.intel.com/content/www/us/en/docs/dpcpp-cpp-compiler/developer-guide-reference/2023-0/compiler-options.html)

### OpenMPの利用 {#intel-one-api-dpc-compailer#openmp}

IntelコンパイラではOpenMPが利用可能です。
IntelコンパイラでサポートされているOpenMPの機能詳細については以下のIntelサイトの情報を参照して下さい。2023/11/30現在でシステムにインストールされているIntel CompilerでサポートされているのはOpenMP 5.0～6.0（一部）までがサポートされています。

[OpenMP* Features and Extensions Supported in Intel® oneAPI DPC++/C++ Compiler](https://www.intel.com/content/www/us/en/developer/articles/technical/openmp-features-and-extensions-supported-in-icx.html)

[A Survey of OpenMP* Features Implemented in Intel® Fortran and C++ Compilers](https://www.intel.com/content/www/us/en/developer/articles/technical/a-survey-of-openmp-features-implemented-in-intel-fortran-and-c-compilers.html)




