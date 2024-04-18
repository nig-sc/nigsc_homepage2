---
id: intel_compiler_ParallelComLib
title: "並列計算ライブラリ"
---



## Intel MPI ライブラリ
IntelのMPI実装です。

|コマンド|説明|
|------|----|
|mpicc|gcc用のCコンパイララッパー|
|mpiicx|Intel DCP/CのMPIコンパイララッパー|
|mpiicpx|Intel DPC/C++のMPIコンパイララッパー|
|mpiifx|Intel Fortran用コンパイララッパー|
|mpirun|mpiプログラムの起動スクリプト|

- [販売元の製品ページ](https://www.xlsoft.com/jp/products/intel/cluster/mpi/index.html)
- [販売元のデベロッパーガイド](https://jp.xlsoft.com/documents/intel/mpi/2021/mpi-devguide-linux-2021.11.pdf)

遺伝研スパコンの一般区画では、Intel MPIの利用環境が設定されています。

```
xxxxx@at139:~/mpitest$ env |grep I_MPI
I_MPI_ROOT=/lustre7/software/intel_ubuntu/oneapi/mpi/2021.11

xxxxx@at139:~/mpitest$ which mpiicx
/lustre7/software/intel_ubuntu/oneapi/mpi/2021.11/bin/mpiicx

```
コンパイルは以下のように行います。
```
xxxxx@at139:~/mpitest$ mpiicx mpi_test.c -o mpi_test
yxxxx@at139:~/mpitest$ ls
mpi_test  mpi_test.c  sample1.sh
```
実行はAGEの場合以下のようなジョブスクリプトを記述してqsubを実行します。（高度な最適化を施して、詳細なプロファイリングを行いたい場合は、Intelキューを利用してください。構成上実行されやすいepycキューに以下の例では投入しています。）
```
#!/bin/bash
#$ -cwd
#$ -V
#$ -l epyc
#$ -l d_rt=192:00:00
#$ -l s_rt=192:00:00
#$ -pe mpi 4
#$ -l s_vmem=20G
#$ -l mem_req=20G
#$ -N example

mpirun ./mpi_test
```
以下のように実行します。

```
yxxxx@at139:~/mpitest$ qsub ./sample1.sh 
Your job 25616887 ("example") has been submitted
yxxxx@at139:~/mpitest$ qstat
job-ID     prior   name       user         state submit/start at     queue                          jclass                         slots ja-task-ID 
------------------------------------------------------------------------------------------------------------------------------------------------
  25601953 0.25480 QLOGIN     yxxxx        r     02/27/2024 08:39:03 login.q@at139                                                     1        
  25604295 0.25384 QLOGIN     yxxxx        r     02/27/2024 11:20:07 login.q@at139                                                     1        
  25616887 0.25106 example    yxxxx        r     02/27/2024 22:06:02 epyc.q@at155                                                      4        
```
実行結果として以下のようになります。
```
yxxxx@at139:~/mpitest$ more example.o25616887 
Hello world from processor at147, rank 2 out of 4 processors
Hello world from processor at155, rank 0 out of 4 processors
Hello world from processor at156, rank 3 out of 4 processors
Hello world from processor at144, rank 1 out of 4 processors
```


## Intel oneAPI DPC++ ライブラリ(oneDPL)
以下のコンポーネントを含むC++用基本ライブラリです。
- Parallel STL(Standard Template Library)
- ライブラリクラスと関数の追加セット
  - 並列アルゴリズム
  - イテレータ
  - 関数オプジェクトクラス
  - 範囲ベースのAPI
- テスト済みの標準 C++ API
- 乱数ジェネレータ

- [Intelの製品ページ](https://www.intel.com/content/www/us/en/developer/tools/oneapi/dpc-library.html#gs.545ezq)
- [github内のIntelのデベロッパーガイド](https://oneapi-src.github.io/oneDPL/index.html)
- [Intelのgithub上のOPLのサンプル](https://github.com/oneapi-src/oneDPL/tree/main/examples)



## Intel oneDAL（データ・アナリティクス・ライブラリ）
ビッグデータ解析アプリケーションと分散計算を高速化するライブラリです。


詳細については以下のリンク先の資料を参照してください。

- [販売元の製品ページ](https://www.xlsoft.com/jp/products/intel/perflib/daal/index.html?tab=1)
- [github上のドキュメンテーションサイト](https://oneapi-src.github.io/oneDAL/)
- [OneDALのドキュメンテーションサイト](https://spec.oneapi.io/versions/latest/elements/oneDAL/source/index.html)
- [oneDALのチュートリアル](https://github.com/oneapi-src/oneAPI-samples/tree/master/Libraries/oneCCL/tutorials)

遺伝研スパコンでは以下のディレクトリがLD_LIBRARY_PATHに含まれているかを確認してください。

```
/lustre7/software/intel_ubuntu/oneapi/dal/2023.2.0/lib/intel64
```


## Intel OneTBB（スレッディング・ビルディング・ブロック）
C++のマルチスレッドライブラリです。このライブラリはSYCL*および、ISO C++で利用可能な機能の他に、CPU上での並列プログラミング向けに次の機能を提供します。

- 汎用並列アルゴリズム
- コンカレント・コンテナ
- スケーラブル・メモリ・アロケータ
- 低レベル同期プリミティブ


詳細については以下のリンク先の資料を参照してください。

- [インテルの製品情報サイト（英語）](https://www.intel.com/content/www/us/en/developer/tools/oneapi/onetbb.html#gs.5a5xcc)
- [販売元の製品ページ](https://www.xlsoft.com/jp/products/intel/perflib/tbb/index.html)
- [github上のドキュメンテーションサイト](https://oneapi-src.github.io/oneTBB/)
- [github上のexampleコード](https://github.com/oneapi-src/oneTBB/tree/master/examples)

環境はmoduleコマンドで読み込み可能です。
```
$ module load tbb
Loading tbb version 2021.10.0
$ module list
Currently Loaded Modulefiles:
 1) tbb/2021.10.0 
```

以下のパスがLD_LIBRARY_PATHに含まれているかを確認してください。
```
/lustre7/software/intel_ubuntu/oneapi/tbb/2021.11/lib
```
