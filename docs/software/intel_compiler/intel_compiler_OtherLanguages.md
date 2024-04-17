---
id: intel_compiler_OtherLanguages
title: "他の言語"
---

## Intel Fortran コンパイラ
IntelのFortranコンパイラです。

- Fortran 2023 標準規格サポートが追加されています。
- OpenMP5.0,5.1,5.2の対応が強化されました。OpenMp6.0標準規格に準拠しています。



- [販売元の製品ページ](https://www.xlsoft.com/jp/products/intel/compilers/fortran/index.html)
- [インテルのデベロッパーズガイド（英語）](https://www.intel.com/content/www/us/en/docs/fortran-compiler/developer-guide-reference/2024-0/overview.html)

### コンパイラコマンド形式

|言語 |コマンド |実行形式|
|-----|--------|-------|
|Fortran | ifx   | ifx [オプション] ファイル名 |


## Intel Distribution for Python

以下の特長をもつPythonです。GIL(Global Interpreter Lock)を持つCpythonに比較してパフォーマンス向上を図っています。

- インテル® MKL と Python* 計算パッケージ (NumPy、SciPy および scikit-learn) でパフォーマンスを強化
- Python* パッケージとしてインテル® TBB ライブラリーを使い、スレッドのスケジューリングを合理化
- ジャストインタイム（JIT）コンパイルを通して、Numba でコード実行を高速化
- mpi4py と Cythonおよびインテル® MPI ライブラリーを通して、パフォーマンスを向上
- pyDAAL を通じて、インテル® DAAL との強力なデータ分析とニューラルネットワーク機能を実装
- conda* と PIP を使用して簡単にインストール可能

- [Intelの製品情報のページ](https://www.intel.com/content/www/us/en/developer/tools/oneapi/distribution-for-python.html#gs.5k74sy)
- [Numbaのドキュメントサイト](https://numba.readthedocs.io/en/stable/)


### 環境導入手順

ここでは、ユーザの個別の環境にIntel Distribution for Pythonを導入する方法について説明します。
本手順は以下のサイトの記載に従っています。

- [AI Tools Selector](https://www.intel.com/content/www/us/en/developer/tools/oneapi/ai-tools-selector.html)

condaを利用する方法とオフラインインストーラを利用する方法の２方法について以下で説明します。

#### condaでの環境導入手順

ここでは、condaでIntel Distribution for Python環境を導入する手順を説明します。

condaで仮想環境を作成します。

```
conda create -n intelpython3 python=3.10 -y
conda activate intelpython3 
 
```
intelpython3_fullというメタパッケージを指定してインストールコマンドを投入します。

```
(intelpython3) yxxxx@igt001:~$ conda install -c intel intelpython3_full
Channels:
 - intel
 - conda-forge
 - defaults
Platform: linux-64
Collecting package metadata (repodata.json): done
Solving environment: done

## Package Plan ##

  environment location: /home/yxxxx/miniconda3/envs/intelpython3

  added / updated specs:
    - intelpython3_full


The following packages will be downloaded:

    package                    |            build
    ---------------------------|-----------------
    asn1crypto-1.5.1           |     pyhd8ed1ab_0          79 KB  intel
    brotli-1.1.0               |       hd590300_1          19 KB  intel
    brotli-bin-1.1.0           |       hd590300_1          19 KB  intel
    brotli-python-1.1.0        |  py310hc6cd4ac_1         341 KB  intel
    brotlipy-0.7.0             |py310h2372a71_1006         310 KB  intel
    c-ares-1.21.0              |       hd590300_0         119 KB  intel
    certifi-2023.7.22          |     pyhd8ed1ab_0         150 KB  intel
    cffi-1.16.0                |  py310h2fee648_0         236 KB  intel
    chardet-5.2.0              |  py310hff52083_1         241 KB  intel
    charset-normalizer-3.3.2   |     pyhd8ed1ab_0          46 KB  intel
    colorama-0.4.6             |     pyhd8ed1ab_0          25 KB  intel
    common_cmplr_lib_rt-2024.0.3|      intel_49895          21 KB  intel
    common_cmplr_lic_rt-2024.0.3|      intel_49895          21 KB  intel
    conda-package-streaming-0.9.0|     pyhd8ed1ab_0          19 KB  intel
    cryptography-41.0.5        |  py310h75e40e8_0         1.9 MB  intel
    cycler-0.12.1              |     pyhd8ed1ab_0          13 KB  intel
    cython-3.0.2               |  py310h3fd9d12_0         3.3 MB  intel
    daal4py-2024.1.0           |  py310_intel_299         8.5 MB  intel
    dal-2024.1.0               |        intel_299        49.3 MB  intel
    dpcpp-llvm-spirv-2024.0.0  |py310haaad0e5_49588        12.5 MB  intel
    dpctl-0.15.0               | py310h9daa3b9_42         7.7 MB  intel
    dpnp-0.13.0                |py310ha1a3bb5_171         9.6 MB  intel
    fortran_rt-2024.0.3        |      intel_49895          21 KB  intel
    freetype-2.12.1            |       h267a509_2         620 KB  intel
    funcsigs-1.0.2             |             py_3          14 KB  intel
    future-0.18.3              |     pyhd8ed1ab_0         357 KB  intel
    gtest-1.14.0               |       h00ab1b0_1         395 KB  intel
    icu-73.2                   |       h59595ed_0        11.5 MB  intel
    idna-3.4                   |     pyhd8ed1ab_0          55 KB  intel
    impi_rt-2021.11.0          |      intel_49493        32.0 MB  intel
    intel-fortran-rt-2024.0.3  |      intel_49895        1022 KB  intel
    intelpython3_core-2024.0.0 |          py310_1           8 KB  intel
    intelpython3_full-2024.0.0 |          py310_0           6 KB  intel
    ipp-2021.10.0              |        intel_653       132.3 MB  intel
    joblib-1.3.2               |     pyhd8ed1ab_0         216 KB  intel
    jsonpatch-1.33             |     pyhd8ed1ab_0          17 KB  intel
    jsonpointer-2.4            |  py310hff52083_3          16 KB  intel
    kiwisolver-1.4.5           |  py310hd41b1e2_1          71 KB  intel
    level-zero-1.15.1          |       h00ab1b0_0         224 KB  intel
    libabseil-20230802.1       | cxx17_h59595ed_0         1.2 MB  intel
    libbrotlicommon-1.1.0      |       hd590300_1          68 KB  intel
    libbrotlidec-1.1.0         |       hd590300_1          32 KB  intel
    libbrotlienc-1.1.0         |       hd590300_1         276 KB  intel
    libevent-2.1.12            |       hf998b51_1         417 KB  intel
    libgfortran-ng-13.2.0      |       h69a702a_2          23 KB  intel
    libgfortran5-13.2.0        |       ha4646dd_2         1.4 MB  intel
    libiconv-1.17              |       h166bdaf_0         1.4 MB  intel
    libllvm14-14.0.6           |       hcd5def8_4        30.0 MB  intel
    libpng-1.6.39              |       h753d276_0         276 KB  intel
    libprotobuf-4.24.4         |       hf27288f_0         2.4 MB  intel
    libxml2-2.11.5             |       h232c23b_1         689 KB  intel
    llvm-14.0.6                |       h32600fe_4          53 KB  intel
    llvm-spirv-14.0.0          |       h2bc3f7f_0         1.4 MB  intel
    llvmlite-0.40.1            |  py310h76e7cf5_0         3.1 MB  intel
    mkl-dpcpp-2024.0.0         |      intel_49656          12 KB  intel
    numba-0.57.1               |  py310h0f6aa51_0         4.0 MB  intel
    numba-dpex-0.21.4          |  py310hce084a9_0         374 KB  intel
    onemkl-sycl-blas-2024.0.0  |      intel_49656        14.6 MB  intel
    onemkl-sycl-datafitting-2024.0.0|      intel_49656         758 KB  intel
    onemkl-sycl-dft-2024.0.0   |      intel_49656         5.9 MB  intel
    onemkl-sycl-lapack-2024.0.0|      intel_49656         8.0 MB  intel
    onemkl-sycl-rng-2024.0.0   |      intel_49656        16.9 MB  intel
    onemkl-sycl-sparse-2024.0.0|      intel_49656        15.9 MB  intel
    onemkl-sycl-stats-2024.0.0 |      intel_49656         3.5 MB  intel
    onemkl-sycl-vm-2024.0.0    |      intel_49656        34.5 MB  intel
    opencl_rt-2024.0.3         |      intel_49895          21 KB  intel
    packaging-23.2             |     pyhd8ed1ab_0          48 KB  intel
    platformdirs-3.11.0        |     pyhd8ed1ab_0          20 KB  intel
    pluggy-1.3.0               |     pyhd8ed1ab_0          22 KB  intel
    pooch-1.8.0                |     pyhd8ed1ab_0          51 KB  intel
    pycparser-2.21             |     pyhd8ed1ab_0         100 KB  intel
    pyopenssl-23.3.0           |     pyhd8ed1ab_0         124 KB  intel
    pyparsing-3.1.1            |     pyhd8ed1ab_0          87 KB  intel
    pysocks-1.7.1              |     pyha2e5f31_6          19 KB  intel
    python-dateutil-2.8.2      |     pyhd8ed1ab_0         240 KB  intel
    python_abi-3.10            |          2_cp310           4 KB  intel
    pyyaml-6.0.1               |  py310h2372a71_1         167 KB  intel
    requests-2.31.0            |     pyhd8ed1ab_0          55 KB  intel
    ruamel.yaml-0.17.40        |  py310h2372a71_0         196 KB  intel
    ruamel.yaml.clib-0.2.7     |  py310h2372a71_2         132 KB  intel
    scikit-learn-1.3.1         |  py310h1fdf081_1         8.0 MB  intel
    scikit-learn-intelex-2024.1.0|  py310_intel_299          54 KB  intel
    scipy-1.10.1               |  py310h6681978_8        29.4 MB  intel
    six-1.16.0                 |     pyh6c4a22f_0          14 KB  intel
    smp-0.1.5                  | py310h8271ca5_21          19 KB  intel
    snappy-1.1.10              |       h9fff704_0          38 KB  intel
    spirv-tools-2023.2         |       h00ab1b0_4         1.9 MB  intel
    threadpoolctl-3.2.0        |     pyha21a80b_0          20 KB  intel
    toolz-0.12.0               |     pyhd8ed1ab_0          48 KB  intel
    typing-extensions-4.8.0    |       hd8ed1ab_0          10 KB  intel
    typing_extensions-4.8.0    |     pyha770c72_0          34 KB  intel
    urllib3-2.0.7              |     pyhd8ed1ab_0          96 KB  intel
    xgboost-1.7.3              |0_gade498py310_25         6.3 MB  intel
    yaml-0.2.5                 |       h7f98852_2          87 KB  intel
    zlib-1.2.13                |       hd590300_5          91 KB  intel
    zstandard-0.22.0           |  py310h1275a96_0         395 KB  intel
    zstd-1.5.5                 |       hfc55251_0         532 KB  intel
    ------------------------------------------------------------
                                           Total:       468.5 MB

The following NEW packages will be INSTALLED:

  asn1crypto         intel/noarch::asn1crypto-1.5.1-pyhd8ed1ab_0 
  brotli             intel/linux-64::brotli-1.1.0-hd590300_1 
  brotli-bin         intel/linux-64::brotli-bin-1.1.0-hd590300_1 
  brotli-python      intel/linux-64::brotli-python-1.1.0-py310hc6cd4ac_1 
  brotlipy           intel/linux-64::brotlipy-0.7.0-py310h2372a71_1006 
  c-ares             intel/linux-64::c-ares-1.21.0-hd590300_0 
  certifi            intel/noarch::certifi-2023.7.22-pyhd8ed1ab_0 
  cffi               intel/linux-64::cffi-1.16.0-py310h2fee648_0 
  chardet            intel/linux-64::chardet-5.2.0-py310hff52083_1 
  charset-normalizer intel/noarch::charset-normalizer-3.3.2-pyhd8ed1ab_0 
  colorama           intel/noarch::colorama-0.4.6-pyhd8ed1ab_0 
  common_cmplr_lib_~ intel/linux-64::common_cmplr_lib_rt-2024.0.3-intel_49895 
  common_cmplr_lic_~ intel/linux-64::common_cmplr_lic_rt-2024.0.3-intel_49895 
  conda-package-str~ intel/noarch::conda-package-streaming-0.9.0-pyhd8ed1ab_0 
  cryptography       intel/linux-64::cryptography-41.0.5-py310h75e40e8_0 
  cycler             intel/noarch::cycler-0.12.1-pyhd8ed1ab_0 
  cython             intel/linux-64::cython-3.0.2-py310h3fd9d12_0 
  daal4py            intel/linux-64::daal4py-2024.1.0-py310_intel_299 
  dal                intel/linux-64::dal-2024.1.0-intel_299 
  dpcpp-llvm-spirv   intel/linux-64::dpcpp-llvm-spirv-2024.0.0-py310haaad0e5_49588 
  dpctl              intel/linux-64::dpctl-0.15.0-py310h9daa3b9_42 
  dpnp               intel/linux-64::dpnp-0.13.0-py310ha1a3bb5_171 
  fortran_rt         intel/linux-64::fortran_rt-2024.0.3-intel_49895 
  freetype           intel/linux-64::freetype-2.12.1-h267a509_2 
  funcsigs           intel/noarch::funcsigs-1.0.2-py_3 
  future             intel/noarch::future-0.18.3-pyhd8ed1ab_0 
  gtest              intel/linux-64::gtest-1.14.0-h00ab1b0_1 
  icu                intel/linux-64::icu-73.2-h59595ed_0 
  idna               intel/noarch::idna-3.4-pyhd8ed1ab_0 
  impi_rt            intel/linux-64::impi_rt-2021.11.0-intel_49493 
  intel-fortran-rt   intel/linux-64::intel-fortran-rt-2024.0.3-intel_49895 
  intelpython3_core  intel/linux-64::intelpython3_core-2024.0.0-py310_1 
  intelpython3_full  intel/linux-64::intelpython3_full-2024.0.0-py310_0 
  ipp                intel/linux-64::ipp-2021.10.0-intel_653 
  joblib             intel/noarch::joblib-1.3.2-pyhd8ed1ab_0 
  jsonpatch          intel/noarch::jsonpatch-1.33-pyhd8ed1ab_0 
  jsonpointer        intel/linux-64::jsonpointer-2.4-py310hff52083_3 
  kiwisolver         intel/linux-64::kiwisolver-1.4.5-py310hd41b1e2_1 
  level-zero         intel/linux-64::level-zero-1.15.1-h00ab1b0_0 
  libabseil          intel/linux-64::libabseil-20230802.1-cxx17_h59595ed_0 
  libbrotlicommon    intel/linux-64::libbrotlicommon-1.1.0-hd590300_1 
  libbrotlidec       intel/linux-64::libbrotlidec-1.1.0-hd590300_1 
  libbrotlienc       intel/linux-64::libbrotlienc-1.1.0-hd590300_1 
  libevent           intel/linux-64::libevent-2.1.12-hf998b51_1 
  libgfortran-ng     intel/linux-64::libgfortran-ng-13.2.0-h69a702a_2 
  libgfortran5       intel/linux-64::libgfortran5-13.2.0-ha4646dd_2 
  libiconv           intel/linux-64::libiconv-1.17-h166bdaf_0 
  libllvm14          intel/linux-64::libllvm14-14.0.6-hcd5def8_4 
  libpng             intel/linux-64::libpng-1.6.39-h753d276_0 
  libprotobuf        intel/linux-64::libprotobuf-4.24.4-hf27288f_0 
  libxml2            intel/linux-64::libxml2-2.11.5-h232c23b_1 
  llvm               intel/linux-64::llvm-14.0.6-h32600fe_4 
  llvm-spirv         intel/linux-64::llvm-spirv-14.0.0-h2bc3f7f_0 
  llvmlite           intel/linux-64::llvmlite-0.40.1-py310h76e7cf5_0 
  mkl-dpcpp          intel/linux-64::mkl-dpcpp-2024.0.0-intel_49656 
  numba              intel/linux-64::numba-0.57.1-py310h0f6aa51_0 
  numba-dpex         intel/linux-64::numba-dpex-0.21.4-py310hce084a9_0 
  onemkl-sycl-blas   intel/linux-64::onemkl-sycl-blas-2024.0.0-intel_49656 
  onemkl-sycl-dataf~ intel/linux-64::onemkl-sycl-datafitting-2024.0.0-intel_49656 
  onemkl-sycl-dft    intel/linux-64::onemkl-sycl-dft-2024.0.0-intel_49656 
  onemkl-sycl-lapack intel/linux-64::onemkl-sycl-lapack-2024.0.0-intel_49656 
  onemkl-sycl-rng    intel/linux-64::onemkl-sycl-rng-2024.0.0-intel_49656 
  onemkl-sycl-sparse intel/linux-64::onemkl-sycl-sparse-2024.0.0-intel_49656 
  onemkl-sycl-stats  intel/linux-64::onemkl-sycl-stats-2024.0.0-intel_49656 
  onemkl-sycl-vm     intel/linux-64::onemkl-sycl-vm-2024.0.0-intel_49656 
  opencl_rt          intel/linux-64::opencl_rt-2024.0.3-intel_49895 
  packaging          intel/noarch::packaging-23.2-pyhd8ed1ab_0 
  platformdirs       intel/noarch::platformdirs-3.11.0-pyhd8ed1ab_0 
  pluggy             intel/noarch::pluggy-1.3.0-pyhd8ed1ab_0 
  pooch              intel/noarch::pooch-1.8.0-pyhd8ed1ab_0 
  pycparser          intel/noarch::pycparser-2.21-pyhd8ed1ab_0 
  pyopenssl          intel/noarch::pyopenssl-23.3.0-pyhd8ed1ab_0 
  pyparsing          intel/noarch::pyparsing-3.1.1-pyhd8ed1ab_0 
  pysocks            intel/noarch::pysocks-1.7.1-pyha2e5f31_6 
  python_abi         intel/linux-64::python_abi-3.10-2_cp310 
  pyyaml             intel/linux-64::pyyaml-6.0.1-py310h2372a71_1 
  requests           intel/noarch::requests-2.31.0-pyhd8ed1ab_0 
  ruamel.yaml        intel/linux-64::ruamel.yaml-0.17.40-py310h2372a71_0 
  ruamel.yaml.clib   intel/linux-64::ruamel.yaml.clib-0.2.7-py310h2372a71_2 
  scikit-learn       intel/linux-64::scikit-learn-1.3.1-py310h1fdf081_1 
  scikit-learn-inte~ intel/linux-64::scikit-learn-intelex-2024.1.0-py310_intel_299 
  scipy              intel/linux-64::scipy-1.10.1-py310h6681978_8 
  smp                intel/linux-64::smp-0.1.5-py310h8271ca5_21 
  snappy             intel/linux-64::snappy-1.1.10-h9fff704_0 
  spirv-tools        intel/linux-64::spirv-tools-2023.2-h00ab1b0_4 
  threadpoolctl      intel/noarch::threadpoolctl-3.2.0-pyha21a80b_0 
  toolz              intel/noarch::toolz-0.12.0-pyhd8ed1ab_0 
  typing-extensions  intel/noarch::typing-extensions-4.8.0-hd8ed1ab_0 
  typing_extensions  intel/noarch::typing_extensions-4.8.0-pyha770c72_0 
  urllib3            intel/noarch::urllib3-2.0.7-pyhd8ed1ab_0 
  xgboost            intel/linux-64::xgboost-1.7.3-0_gade498py310_25 
  yaml               intel/linux-64::yaml-0.2.5-h7f98852_2 
  zlib               intel/linux-64::zlib-1.2.13-hd590300_5 
  zstandard          intel/linux-64::zstandard-0.22.0-py310h1275a96_0 
  zstd               intel/linux-64::zstd-1.5.5-hfc55251_0 

The following packages will be SUPERSEDED by a higher-priority channel:

  ca-certificates    conda-forge::ca-certificates-2024.2.2~ --> intel::ca-certificates-2023.7.22-hbcca054_0 
  libgcc-ng          conda-forge::libgcc-ng-13.2.0-h807b86~ --> intel::libgcc-ng-13.2.0-h807b86a_2 
  libgomp            conda-forge::libgomp-13.2.0-h807b86a_5 --> intel::libgomp-13.2.0-h807b86a_2 
  libsqlite          conda-forge::libsqlite-3.45.1-h279700~ --> intel::libsqlite-3.44.0-h2797004_0 
  openssl             conda-forge::openssl-3.2.1-hd590300_0 --> intel::openssl-3.1.4-hd590300_0 
  pip                    conda-forge::pip-24.0-pyhd8ed1ab_0 --> intel::pip-23.3.1-pyhd8ed1ab_0 
  setuptools         conda-forge::setuptools-69.1.1-pyhd8e~ --> intel::setuptools-68.2.2-pyhd8ed1ab_0 
  tzdata               conda-forge::tzdata-2024a-h0c530f3_0 --> intel::tzdata-2023c-h71feb2d_0 
  wheel              conda-forge::wheel-0.42.0-pyhd8ed1ab_0 --> intel::wheel-0.41.3-pyhd8ed1ab_0 

The following packages will be DOWNGRADED:

  python-dateutil                        2.8.2-pyhd3eb1b0_0 --> 2.8.2-pyhd8ed1ab_0 
  six                                   1.16.0-pyhd3eb1b0_1 --> 1.16.0-pyh6c4a22f_0 


Proceed ([y]/n)? y
```
`Proceed([y]/n)?`と確認メッセージが表示されるのでよければyで回答します。
インストールが開始されます。

```
Downloading and Extracting Packages:
                                                                                               
Preparing transaction: done                                                                    
Verifying transaction: done                                                                    
Executing transaction: done                                                                    
yxxxx@igt001:~$ conda list                                                       
# packages in environment at /home/yxxxx/miniconda3/envs/intelpython3:                          
#                                                                                              
# Name                    Version                   Build  Channel                             
_libgcc_mutex             0.1                 conda_forge    conda-forge                       
_openmp_mutex             4.5                       2_gnu    conda-forge                       
asn1crypto                1.5.1              pyhd8ed1ab_0    intel                             
brotli                    1.1.0                hd590300_1    intel                             
brotli-bin                1.1.0                hd590300_1    intel                             
brotli-python             1.1.0           py310hc6cd4ac_1    intel                             
brotlipy                  0.7.0           py310h2372a71_1006    intel                          
bzip2                     1.0.8                hd590300_5    conda-forge                       
c-ares                    1.21.0               hd590300_0    intel                             
ca-certificates           2023.7.22            hbcca054_0    intel                             
certifi                   2023.7.22          pyhd8ed1ab_0    intel                             
cffi                      1.16.0          py310h2fee648_0    intel                             
chardet                   5.2.0           py310hff52083_1    intel                             
charset-normalizer        3.3.2              pyhd8ed1ab_0    intel                             
colorama                  0.4.6              pyhd8ed1ab_0    intel                             
common_cmplr_lib_rt       2024.0.3            intel_49895    intel                             
common_cmplr_lic_rt       2024.0.3            intel_49895    intel                             
conda-package-streaming   0.9.0              pyhd8ed1ab_0    intel                             
cryptography              41.0.5          py310h75e40e8_0    intel                             
cycler                    0.12.1             pyhd8ed1ab_0    intel                             
cython                    3.0.2           py310h3fd9d12_0    intel                             
daal4py                   2024.1.0        py310_intel_299    intel                             
dal                       2024.1.0              intel_299    intel                             
dpcpp-cpp-rt              2024.0.3            intel_49895    intel                             
dpcpp-llvm-spirv          2024.0.0        py310haaad0e5_49588    intel                         
dpcpp_cpp_rt              2024.0.3            intel_49895    intel                             
dpctl                     0.15.0          py310h9daa3b9_42    intel                            
dpnp                      0.13.0          py310ha1a3bb5_171    intel                           
fortran_rt                2024.0.3            intel_49895    intel                             
freetype                  2.12.1               h267a509_2    intel                             
funcsigs                  1.0.2                      py_3    intel                             
future                    0.18.3             pyhd8ed1ab_0    intel                             
gtest                     1.14.0               h00ab1b0_1    intel                             
icc_rt                    2024.0.3            intel_49895    intel                             
icu                       73.2                 h59595ed_0    intel                             
idna                      3.4                pyhd8ed1ab_0    intel                             
impi_rt                   2021.11.0           intel_49493    intel                             
intel-cmplr-lib-rt        2024.0.3            intel_49895    intel                             
intel-cmplr-lic-rt        2024.0.3            intel_49895    intel                             
intel-fortran-rt          2024.0.3            intel_49895    intel                             
intel-opencl-rt           2024.0.3            intel_49895    intel                             
intel-openmp              2024.0.3            intel_49895    intel                             
intelpython               2024.0.0                      0    intel
intelpython3_core         2024.0.0                py310_1    intel
intelpython3_full         2024.0.0                py310_0    intel
ipp                       2021.10.0             intel_653    intel
joblib                    1.3.2              pyhd8ed1ab_0    intel
jsonpatch                 1.33               pyhd8ed1ab_0    intel
jsonpointer               2.4             py310hff52083_3    intel
kiwisolver                1.4.5           py310hd41b1e2_1    intel
ld_impl_linux-64          2.40                 h41732ed_0    conda-forge
level-zero                1.15.1               h00ab1b0_0    intel
libabseil                 20230802.1      cxx17_h59595ed_0    intel
libbrotlicommon           1.1.0                hd590300_1    intel
libbrotlidec              1.1.0                hd590300_1    intel
libbrotlienc              1.1.0                hd590300_1    intel
libevent                  2.1.12               hf998b51_1    intel
libffi                    3.4.2                h7f98852_5    conda-forge
libgcc-ng                 13.2.0               h807b86a_2    intel
libgfortran-ng            13.2.0               h69a702a_2    intel
libgfortran5              13.2.0               ha4646dd_2    intel
libgomp                   13.2.0               h807b86a_2    intel
libiconv                  1.17                 h166bdaf_0    intel
libllvm14                 14.0.6               hcd5def8_4    intel
libnsl                    2.0.1                hd590300_0    conda-forge
libpng                    1.6.39               h753d276_0    intel
libprotobuf               4.24.4               hf27288f_0    intel
libsqlite                 3.44.0               h2797004_0    intel
libstdcxx-ng              13.2.0               h7e041cc_2    intel
libuuid                   2.38.1               h0b41bf4_0    conda-forge
libxcrypt                 4.4.36               hd590300_1    conda-forge
libxml2                   2.11.5               h232c23b_1    intel
libzlib                   1.2.13               hd590300_5    conda-forge
llvm                      14.0.6               h32600fe_4    intel
llvm-spirv                14.0.0               h2bc3f7f_0    intel
llvmlite                  0.40.1          py310h76e7cf5_0    intel
mkl                       2024.0.0            intel_49656    intel
mkl-dpcpp                 2024.0.0            intel_49656    intel
mkl-service               2.4.0           py310h3539a15_41    intel
mkl_fft                   1.3.6           py310h1d81ff8_61    intel
mkl_random                1.2.2           py310h5a378b4_81    intel
mkl_umath                 0.1.1           py310h2b1685c_91    intel
ncurses                   6.4                  h59595ed_2    conda-forge
numba                     0.57.1          py310h0f6aa51_0    intel
numba-dpex                0.21.4          py310hce084a9_0    intel
numpy                     1.24.3          py310ha320b8e_5    intel
numpy-base                1.24.3          py310hbac2b65_5    intel
onemkl-sycl-blas          2024.0.0            intel_49656    intel
onemkl-sycl-datafitting   2024.0.0            intel_49656    intel
onemkl-sycl-dft           2024.0.0            intel_49656    intel
onemkl-sycl-lapack        2024.0.0            intel_49656    intel
onemkl-sycl-rng           2024.0.0            intel_49656    intel
onemkl-sycl-sparse        2024.0.0            intel_49656    intel
onemkl-sycl-stats         2024.0.0            intel_49656    intel
onemkl-sycl-vm            2024.0.0            intel_49656    intel
opencl_rt                 2024.0.3            intel_49895    intel
openssl                   3.1.4                hd590300_0    intel
packaging                 23.2               pyhd8ed1ab_0    intel
pandas                    1.5.2           py310h385cf95_0    intel
pip                       23.3.1             pyhd8ed1ab_0    intel
platformdirs              3.11.0             pyhd8ed1ab_0    intel
pluggy                    1.3.0              pyhd8ed1ab_0    intel
pooch                     1.8.0              pyhd8ed1ab_0    intel
pycparser                 2.21               pyhd8ed1ab_0    intel
pyopenssl                 23.3.0             pyhd8ed1ab_0    intel
pyparsing                 3.1.1              pyhd8ed1ab_0    intel
pysocks                   1.7.1              pyha2e5f31_6    intel
python                    3.10.13              h4499717_0    intel
python-dateutil           2.8.2              pyhd8ed1ab_0    intel
python_abi                3.10                    2_cp310    intel
pytz                      2023.3.post1       pyhd8ed1ab_0    intel
pyyaml                    6.0.1           py310h2372a71_1    intel
readline                  8.2                  h8228510_1    conda-forge
requests                  2.31.0             pyhd8ed1ab_0    intel
ruamel.yaml               0.17.40         py310h2372a71_0    intel
ruamel.yaml.clib          0.2.7           py310h2372a71_2    intel
scikit-learn              1.3.1           py310h1fdf081_1    intel
scikit-learn-intelex      2024.1.0        py310_intel_299    intel
scipy                     1.10.1          py310h6681978_8    intel
setuptools                68.2.2             pyhd8ed1ab_0    intel
six                       1.16.0             pyh6c4a22f_0    intel
smp                       0.1.5           py310h8271ca5_21    intel
snappy                    1.1.10               h9fff704_0    intel
spirv-tools               2023.2               h00ab1b0_4    intel
tbb                       2021.11.0           intel_49513    intel
tbb4py                    2021.11.0       py310_intel_49513    intel
threadpoolctl             3.2.0              pyha21a80b_0    intel
tk                        8.6.13          noxft_h4845f30_101    conda-forge
toolz                     0.12.0             pyhd8ed1ab_0    intel
typing-extensions         4.8.0                hd8ed1ab_0    intel
typing_extensions         4.8.0              pyha770c72_0    intel
tzdata                    2023c                h71feb2d_0    intel
urllib3                   2.0.7              pyhd8ed1ab_0    intel
wheel                     0.41.3             pyhd8ed1ab_0    intel
xgboost                   1.7.3           0_gade498py310_25    intel
xz                        5.2.6                h166bdaf_0    conda-forge
yaml                      0.2.5                h7f98852_2    intel
zlib                      1.2.13               hd590300_5    intel
zstandard                 0.22.0          py310h1275a96_0    intel
zstd                      1.5.5                hfc55251_0    intel

```
インストールが完了します。


#### オフラインインストーラで環境導入する手順

次に、ユーザ環境にオフラインインストーラでIntel Distribution for Python環境を導入する手順を説明します。

wgetでオフラインインストーラをダウンロードします。

```
wget https://registrationcenter-download.intel.com/akdlm/IRC_NAS/eb21f0d0-bb7a-44b3-84d1-6489b0138b2e-2/l_AITools.2024.0.2.1.sh
```
以下のファイルがダウンロードされたことを確認します。
```
$ ls -l l_AITools.2024.0.2.1.sh 
-rw-r--r-- 1 yxxxx xxxxx 2068849631 Dec 20 21:28 l_AITools.2024.0.2.1.sh
```
一般ユーザ権限で以下のコマンドを実行します。
```
(base) yxxxx@igt003:~$ sh ./l_AITools.2024.0.2.1.sh 
```
以下のメッセージが出力されます。End User Agreementが表示されるので一読してください。
Enter keyとスペースキーを何回か押してスクロールしてください。

```
Welcome to AITools 2024.0.2

In order to continue the installation process, please review the license
agreement.
Please, press ENTER to continue
>>> 
Intel End User License Agreement for Developer Tools (Version October 2021)

IMPORTANT NOTICE - PLEASE READ AND AGREE BEFORE DOWNLOADING, INSTALLING, COPYING
OR USING

This Agreement is between you, or the company or other legal entity that you
represent and warrant you have the legal authority to bind, (each, "You" or
"Your") and Intel Corporation and its subsidiaries (collectively, "Intel")
regarding Your use of the Materials. By downloading, installing, copying or
using the Materials, You agree to be bound by the terms of this Agreement. If
You do not agree to the terms of this Agreement, or do not have legal authority
or required age to agree to them, do not download, install, copy or use the
Materials.

（長いので省略）

12.4 SEVERABILITY. The parties intend that if a court holds that any provision
     or part of this Agreement is invalid or unenforceable under applicable law, 
     the court will modify the provision to the minimum extent necessary to make 
     it valid and enforceable, or if it cannot be made valid and enforceable, 
     the parties intend that the court will sever and delete the provision or 
     part from this Agreement. Any change to or deletion of a provision or part 
     of this Agreement under this Section will not affect the validity or 
     enforceability of the remainder of this Agreement, which will continue in 
     full force and effect.

```
ライセンスへの許諾が求められるので、yesで回答してください。
```
Do you accept the license terms? [yes|no]
>>>   yes
```
インストールするディレクトリを確認されます。特別の理由で変更する必要がなければそのままEnterを押してください。
```
AITools will now be installed into this location:
/home/yxxxx/intel/oneapi/intelpython

  - Press ENTER to confirm the location
  - Press CTRL-C to abort the installation
  - Or specify a different location below

[/home/yxxxx/intel/oneapi/intelpython] >>> 
```
インストールが開始されます。しばらく時間がかかります。
```
PREFIX=/home/yxxxx/intel/oneapi/intelpython
Unpacking payload ...
                                                                                         
Installing base environment...


Downloading and Extracting Packages:

（省略）

Installing pytorch-gpu environment...

（省略）

Installing pytorch environment...


Downloading and Extracting Packages:

（省略）

Installing tensorflow-gpu environment...


Downloading and Extracting Packages:

（省略）

Installing tensorflow environment...


Downloading and Extracting Packages:


Downloading and Extracting Packages:

Preparing transaction: done
Executing transaction: done


Thanks for installing the Intel(R) AI Tools Bundle, the default path is <home_path>/intel/oneapi/intelpython. If you set up the installation path with -p tag, we recomend to add /intel/oneapi/intelpython, i.e. <path>/intel/oneapi/intelpython. 

1. After installing, initialize your installed AI Tool with the following command: 
 $ source <home_path>/intel/oneapi/intelpython/bin/activate 

2. Next conda environments are included: 
 - intelpython (base) 
 - tensorflow for CPU and GPU 
 - pytorch for CPU and GPU 
 - modin 

You can then activate different conda environments as needed via the following command: 
 $ conda activate <conda environment> 

3. AI Reference Models for Intel(R) Architecture can be found in your installation of Intel(R) AI Tool, typically found at: 
 <home_path>/intel/oneapi/ai_reference_models 

```
インストールが完了すると、インストールした環境が自動的にcondaで使えるようにするため、shellの環境に変更を
加えるかの確認メッセージが表示されます。ユーザの好みですが、ここでは変更を加えないようにnoを選択します。

```
Do you wish to update your shell profile to automatically initialize conda?
This will activate conda on startup and change the command prompt when activated.
If you'd prefer that conda's base environment not be activated on startup,
   run the following command when conda is activated:

conda config --set auto_activate_base false

You can undo this by running `conda init --reverse $SHELL`? [yes|no]
[no] >>> 

You have chosen to not have conda modify your shell scripts at all.
To activate conda's base environment in your current shell session:

eval "$(/home/yxxxx/intel/oneapi/intelpython/bin/conda shell.YOUR_SHELL_NAME hook)" 

To install conda's shell functions for easier access, first activate, then:

conda init

Thank you for installing AITools!
```
インストールが完了します。メッセージに表示された環境の読み込みコマンドを投入します。ここでは
ログインシェルはbashにして入力しています。

```
eval "$(/home/yxxxx/intel/oneapi/intelpython/bin/conda shell.bash hook)"

```
インストールした環境をcondaで確認するとIntelのパッケージが導入されていることがわかります。

```
(base) yxxxx@at138:~$ conda list
# packages in environment at /home/yxxxx/intel/oneapi/intelpython:
#
# Name                    Version                   Build  Channel
_libgcc_mutex             0.1                 conda_forge    intel
_openmp_mutex             4.5                       2_gnu    intel
archspec                  0.2.2              pyhd8ed1ab_0    conda-forge
boltons                   23.0.0             pyhd8ed1ab_0    conda-forge
brotli                    1.1.0                hd590300_1    intel
brotli-bin                1.1.0                hd590300_1    intel
brotli-python             1.1.0            py39h3d6467e_1    intel
bzip2                     1.0.8                h7f98852_4    intel
c-ares                    1.20.1               hd590300_0    intel
ca-certificates           2023.7.22            hbcca054_0    intel
certifi                   2023.7.22          pyhd8ed1ab_0    intel
cffi                      1.16.0           py39h7a31438_0    intel
charset-normalizer        3.3.0              pyhd8ed1ab_0    intel
colorama                  0.4.6              pyhd8ed1ab_0    intel
conda                     23.9.0           py39hf3d152e_2    conda-forge
conda-libmamba-solver     23.11.1            pyhd8ed1ab_0    conda-forge
conda-package-handling    2.2.0              pyh38be061_0    intel
conda-package-streaming   0.9.0              pyhd8ed1ab_0    intel
contourpy                 1.0.7            py39h4b4f3f3_0    intel
cryptography              41.0.4           py39hd4f0224_0    intel
cycler                    0.12.1             pyhd8ed1ab_0    intel
daal4py                   2024.0.0        py39_intel_49530    intel
dal                       2024.0.0            intel_49530    intel
dpcpp-cpp-rt              2024.0.0            intel_49795    intel
dpcpp-llvm-spirv          2024.0.0        py39haaad0e5_49588    intel
dpcpp_cpp_rt              2024.0.0            intel_49795    intel
dpctl                     0.15.0          py39h9daa3b9_42    intel
dpnp                      0.13.0          py39ha1a3bb5_170    intel
fmt                       10.1.1               h00ab1b0_1    conda-forge
fonttools                 4.39.4           py39hd1e30aa_0    intel
fortran_rt                2024.0.0            intel_49795    intel
freetype                  2.12.1               h267a509_2    intel
icc_rt                    2024.0.0            intel_49795    intel
icu                       73.2                 h59595ed_0    intel
idna                      3.4                pyhd8ed1ab_0    intel
importlib-resources       5.12.0             pyhd8ed1ab_0    intel
importlib_resources       5.12.0             pyhd8ed1ab_0    intel
intel-cmplr-lib-rt        2024.0.0            intel_49795    intel
intel-cmplr-lic-rt        2024.0.0            intel_49795    intel
intel-fortran-rt          2024.0.0            intel_49795    intel
intel-opencl-rt           2024.0.0            intel_49795    intel
intel-openmp              2024.0.0            intel_49795    intel
intelpython               2024.0.0                      0    intel
ipp                       2021.10.0             intel_555    intel
joblib                    1.3.2              pyhd8ed1ab_0    intel
jsonpatch                 1.33               pyhd8ed1ab_0    intel
jsonpointer               2.4              py39hf3d152e_3    intel
keyutils                  1.6.1                h166bdaf_1    intel
kiwisolver                1.4.5            py39h7633fee_1    intel
krb5                      1.21.2               h659d440_0    intel
lcms2                     2.16                 hb7c19ff_0    conda-forge
lerc                      4.0.0                h27087fc_1    intel
level-zero                1.14.0               h00ab1b0_2    intel
libarchive                3.7.2                h039dbb9_0    conda-forge
libbrotlicommon           1.1.0                hd590300_1    intel
libbrotlidec              1.1.0                hd590300_1    intel
libbrotlienc              1.1.0                hd590300_1    intel
libcurl                   8.4.0                hca28451_0    intel
libdeflate                1.19                 hd590300_0    intel
libedit                   3.1.20221030         h5eee18b_1    intel
libev                     4.33                 h516909a_2    intel
libffi                    3.4.2                h7f98852_5    intel
libgcc-ng                 13.2.0               h807b86a_2    intel
libgomp                   13.2.0               h807b86a_2    intel
libiconv                  1.17                 h166bdaf_0    intel
libjpeg-turbo             3.0.0                hd590300_1    intel
libllvm14                 14.0.6               hcd5def8_4    intel
libmamba                  1.5.4                had39da4_0    conda-forge
libmambapy                1.5.4            py39h10defb6_0    conda-forge
libnghttp2                1.57.0               h47da74e_0    intel
libnsl                    2.0.1                hd590300_0    intel
libpng                    1.6.39               h753d276_0    intel
libsolv                   0.7.27               hfc55251_0    conda-forge
libsqlite                 3.43.2               h2797004_0    intel
libssh2                   1.11.0               h0841786_1    intel
libstdcxx-ng              13.2.0               h7e041cc_2    intel
libtiff                   4.6.0                ha9c0a0a_2    intel
libuuid                   2.38.1               h0b41bf4_0    intel
libwebp-base              1.3.2                hd590300_0    intel
libxcb                    1.15                 h0b41bf4_1    intel
libxml2                   2.11.5               h232c23b_1    intel
libzlib                   1.2.13               hd590300_5    intel
llvmlite                  0.40.1           py39h76e7cf5_0    intel
lz4-c                     1.9.4                hcb278e6_0    intel
lzo                       2.10              h516909a_1000    intel
matplotlib-base           3.7.1            py39he190548_0    intel
mkl                       2024.0.0            intel_49630    intel
mkl-dpcpp                 2024.0.0            intel_49630    intel
mkl-service               2.4.0           py39h3539a15_40    intel
mkl_fft                   1.3.6           py39h1d81ff8_61    intel
mkl_random                1.2.2           py39h5a378b4_81    intel
mkl_umath                 0.1.1           py39h2b1685c_91    intel
munkres                   1.1.4              pyh9f0ad1d_0    intel
ncurses                   6.4                  hcb278e6_0    intel
numba                     0.57.1           py39hb75a051_0    intel
numba-dpex                0.21.4           py39hce084a9_0    intel
numpy                     1.24.3           py39ha320b8e_5    intel
numpy-base                1.24.3           py39hbac2b65_5    intel
onemkl-sycl-blas          2024.0.0            intel_49630    intel
onemkl-sycl-datafitting   2024.0.0            intel_49630    intel
onemkl-sycl-dft           2024.0.0            intel_49630    intel
onemkl-sycl-lapack        2024.0.0            intel_49630    intel
onemkl-sycl-rng           2024.0.0            intel_49630    intel
onemkl-sycl-sparse        2024.0.0            intel_49630    intel
onemkl-sycl-stats         2024.0.0            intel_49630    intel
onemkl-sycl-vm            2024.0.0            intel_49630    intel
openjpeg                  2.5.0                h488ebb8_3    intel
openssl                   3.2.0                hd590300_1    conda-forge
packaging                 23.2               pyhd8ed1ab_0    intel
pandas                    2.1.3            py39hddac248_0    intel
pillow                    10.0.1           py39had0adad_2    intel
pip                       23.3               pyhd8ed1ab_0    intel
platformdirs              3.11.0             pyhd8ed1ab_0    intel
pluggy                    1.3.0              pyhd8ed1ab_0    intel
pooch                     1.7.0              pyhd8ed1ab_4    intel
pthread-stubs             0.4               h36c2ea0_1002    intel
pybind11-abi              4                    hd8ed1ab_3    conda-forge
pycosat                   0.6.6            py39hd1e30aa_0    intel
pycparser                 2.21               pyhd8ed1ab_0    intel
pyopenssl                 23.2.0             pyhd8ed1ab_1    intel
pyparsing                 3.1.1              pyhd8ed1ab_0    intel
pysocks                   1.7.1              pyha2e5f31_6    intel
python                    3.9.18               h4499717_0    intel
python-dateutil           2.8.2              pyhd8ed1ab_0    intel
python-tzdata             2023.3             pyhd8ed1ab_0    intel
python_abi                3.9                      2_cp39    intel
pytz                      2023.3.post1       pyhd8ed1ab_0    intel
pyyaml                    6.0.1            py39hd1e30aa_1    intel
readline                  8.2                  h8228510_1    intel
reproc                    14.2.4.post0         hd590300_1    conda-forge
reproc-cpp                14.2.4.post0         h59595ed_1    conda-forge
requests                  2.31.0             pyhd8ed1ab_0    intel
ruamel.yaml               0.17.36          py39hd1e30aa_0    intel
ruamel.yaml.clib          0.2.7            py39hd1e30aa_2    intel
scikit-learn              1.3.1            py39ha22ef79_1    intel
scikit-learn-intelex      2024.0.0        py39_intel_49530    intel
scipy                     1.10.1           py39h6681978_6    intel
setuptools                68.2.2             pyhd8ed1ab_0    intel
six                       1.16.0             pyh6c4a22f_0    intel
tbb                       2021.11.0           intel_49403    intel
tbb4py                    2021.11.0       py39_intel_49403    intel
threadpoolctl             3.2.0              pyha21a80b_0    intel
tk                        8.6.13               h2797004_0    intel
tqdm                      4.66.1             pyhd8ed1ab_0    intel
typing-extensions         4.8.0                hd8ed1ab_0    intel
typing_extensions         4.8.0              pyha770c72_0    intel
tzdata                    2023c                h71feb2d_0    intel
unicodedata2              15.0.0           py39hb9d737c_0    intel
urllib3                   2.0.7              pyhd8ed1ab_0    intel
wheel                     0.41.2             pyhd8ed1ab_0    intel
xgboost                   1.7.3           0_gade498py39_25    intel
xorg-libxau               1.0.11               hd590300_1    intel
xorg-libxdmcp             1.1.3                h7f98852_1    intel
xz                        5.2.6                h166bdaf_0    intel
yaml                      0.2.5                h7f98852_2    intel
yaml-cpp                  0.8.0                h59595ed_0    conda-forge
zipp                      3.17.0             pyhd8ed1ab_0    intel
zstandard                 0.21.0           py39h6e5214e_1    intel
zstd                      1.5.5                hfc55251_0    intel
```
numpy、scipy、scikit-learnなどもIntelチャネルから導入されていることがわかります。

### サンプルプログラムによる基本動作確認

Intelが配布するサンプルプログラムを利用して環境の確認をしてみます。

 - [oneAPI Samples](https://github.com/oneapi-src/oneAPI-samples)

 上記のサンプル集の中の、以下のサンプルを動作させてみます。

 - [Intel® Extension for PyTorch* Getting Started Sample](https://github.com/oneapi-src/oneAPI-samples/tree/master/AI-and-Analytics/Getting-Started-Samples/Intel_Extension_For_PyTorch_GettingStarted)

 このサンプルは、Intel Extension for PytorchというIntel開発のOSSを利用します。以下を参照してください。

 - [Intel® Extension for PyTorch* Documentation](https://intel.github.io/intel-extension-for-pytorch/index.html#installation?platform=cpu&version=v2.2.0%2Bcpu)

 まず、condaで仮想環境を作ります。

 ```
$ conda create -n pytorch python=3.10
Channels:
 - conda-forge
 - defaults
Platform: linux-64
Collecting package metadata (repodata.json): done
Solving environment: done

## Package Plan ##

  environment location: /home/yxxxx/miniconda3/envs/pytorch

  added / updated specs:
    - python=3.10


The following packages will be downloaded:

    package                    |            build
    ---------------------------|-----------------
    _libgcc_mutex-0.1          |      conda_forge           3 KB  conda-forge
    _openmp_mutex-4.5          |            2_gnu          23 KB  conda-forge
    libffi-3.4.2               |       h7f98852_5          57 KB  conda-forge
    libnsl-2.0.1               |       hd590300_0          33 KB  conda-forge
    libuuid-2.38.1             |       h0b41bf4_0          33 KB  conda-forge
    libzlib-1.2.13             |       hd590300_5          60 KB  conda-forge
    ncurses-6.4                |       h59595ed_2         864 KB  conda-forge
    readline-8.2               |       h8228510_1         275 KB  conda-forge
    tk-8.6.13                  |noxft_h4845f30_101         3.2 MB  conda-forge
    ------------------------------------------------------------
                                           Total:         4.5 MB

The following NEW packages will be INSTALLED:

  _libgcc_mutex      conda-forge/linux-64::_libgcc_mutex-0.1-conda_forge 
  _openmp_mutex      conda-forge/linux-64::_openmp_mutex-4.5-2_gnu 
  bzip2              conda-forge/linux-64::bzip2-1.0.8-hd590300_5 
  ca-certificates    conda-forge/linux-64::ca-certificates-2024.2.2-hbcca054_0 
  ld_impl_linux-64   conda-forge/linux-64::ld_impl_linux-64-2.40-h41732ed_0 
  libffi             conda-forge/linux-64::libffi-3.4.2-h7f98852_5 
  libgcc-ng          conda-forge/linux-64::libgcc-ng-13.2.0-h807b86a_5 
  libgomp            conda-forge/linux-64::libgomp-13.2.0-h807b86a_5 
  libnsl             conda-forge/linux-64::libnsl-2.0.1-hd590300_0 
  libsqlite          conda-forge/linux-64::libsqlite-3.45.1-h2797004_0 
  libuuid            conda-forge/linux-64::libuuid-2.38.1-h0b41bf4_0 
  libxcrypt          conda-forge/linux-64::libxcrypt-4.4.36-hd590300_1 
  libzlib            conda-forge/linux-64::libzlib-1.2.13-hd590300_5 
  ncurses            conda-forge/linux-64::ncurses-6.4-h59595ed_2 
  openssl            conda-forge/linux-64::openssl-3.2.1-hd590300_0 
  pip                conda-forge/noarch::pip-24.0-pyhd8ed1ab_0 
  python             conda-forge/linux-64::python-3.10.13-hd12c33a_1_cpython 
  readline           conda-forge/linux-64::readline-8.2-h8228510_1 
  setuptools         conda-forge/noarch::setuptools-69.1.1-pyhd8ed1ab_0 
  tk                 conda-forge/linux-64::tk-8.6.13-noxft_h4845f30_101 
  tzdata             conda-forge/noarch::tzdata-2024a-h0c530f3_0 
  wheel              conda-forge/noarch::wheel-0.42.0-pyhd8ed1ab_0 
  xz                 conda-forge/linux-64::xz-5.2.6-h166bdaf_0 


Proceed ([y]/n)? y


Downloading and Extracting Packages:
                                                                                               
Preparing transaction: done                                                                    
Verifying transaction: done                                                                    
Executing transaction: done                                                                    
#                                                                                              
# To activate this environment, use                                                            
#                                                                                              
#     $ conda activate pytorch                                                                 
#                                                                                              
# To deactivate an active environment, use
#
#     $ conda deactivate
```
作成した仮想環境をactivateして、その環境上でIntel Distribution for Pythonを導入します。

```
$ conda activate pytorch
$ mamba install -c intel intelpython3_full

Looking for: ['intelpython3_full']

(Intel Distribution for Pythonとしては導入内容は前述と変わらないので省略)

Downloading and Extracting Packages:

Preparing transaction: done
Verifying transaction: done
Executing transaction: done

 ```
pipでpytorchをインストールします。(Intel Extension for Pytorchをcondaのパッケージが無く、condaで導入する手段が無いように見え、その前提の
pytorchのバージョン整合性を取るのもcondaでは煩雑になった為、やむをえずこの手順にしています。)

```
$ python -m pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu 
Looking in indexes: https://download.pytorch.org/whl/cpu
Collecting torch
  Downloading https://download.pytorch.org/whl/cpu/torch-2.2.1%2Bcpu-cp310-cp310-linux_x86_64.whl (186.8 MB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 186.8/186.8 MB 22.7 MB/s eta 0:00:00
Collecting torchvision
  Downloading https://download.pytorch.org/whl/cpu/torchvision-0.17.1%2Bcpu-cp310-cp310-linux_x86_64.whl (1.6 MB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1.6/1.6 MB 42.0 MB/s eta 0:00:00
Collecting torchaudio
  Downloading https://download.pytorch.org/whl/cpu/torchaudio-2.2.1%2Bcpu-cp310-cp310-linux_x86_64.whl (1.7 MB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1.7/1.7 MB 19.1 MB/s eta 0:00:00
Collecting filelock (from torch)
  Downloading https://download.pytorch.org/whl/filelock-3.9.0-py3-none-any.whl (9.7 kB)
Requirement already satisfied: typing-extensions>=4.8.0 in /lustre7/home/yxxxx/miniconda3/envs/pytorch/lib/python3.10/site-packages (from torch) (4.8.0)
Collecting sympy (from torch)
  Downloading https://download.pytorch.org/whl/sympy-1.12-py3-none-any.whl (5.7 MB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 5.7/5.7 MB 57.9 MB/s eta 0:00:00
Collecting networkx (from torch)
  Downloading https://download.pytorch.org/whl/networkx-3.2.1-py3-none-any.whl (1.6 MB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1.6/1.6 MB 20.8 MB/s eta 0:00:00
Collecting jinja2 (from torch)
  Downloading https://download.pytorch.org/whl/Jinja2-3.1.2-py3-none-any.whl (133 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 133.1/133.1 kB 5.7 MB/s eta 0:00:00
Collecting fsspec (from torch)
  Downloading https://download.pytorch.org/whl/fsspec-2023.4.0-py3-none-any.whl (153 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 154.0/154.0 kB 6.0 MB/s eta 0:00:00
Requirement already satisfied: numpy in /lustre7/home/yxxxx/miniconda3/envs/pytorch/lib/python3.10/site-packages (from torchvision) (1.24.3)
Collecting pillow!=8.3.*,>=5.3.0 (from torchvision)
  Downloading https://download.pytorch.org/whl/pillow-10.2.0-cp310-cp310-manylinux_2_28_x86_64.whl (4.5 MB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 4.5/4.5 MB 52.2 MB/s eta 0:00:00
Collecting MarkupSafe>=2.0 (from jinja2->torch)
  Downloading https://download.pytorch.org/whl/MarkupSafe-2.1.3-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (25 kB)
Collecting mpmath>=0.19 (from sympy->torch)
  Downloading https://download.pytorch.org/whl/mpmath-1.3.0-py3-none-any.whl (536 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 536.2/536.2 kB 17.9 MB/s eta 0:00:00
Installing collected packages: mpmath, sympy, pillow, networkx, MarkupSafe, fsspec, filelock, jinja2, torch, torchvision, torchaudio
Successfully installed MarkupSafe-2.1.3 filelock-3.9.0 fsspec-2023.4.0 jinja2-3.1.2 mpmath-1.3.0 networkx-3.2.1 pillow-10.2.0 sympy-1.12 torch-2.2.1+cpu torchaudio-2.2.1+cpu torchvision-0.17.1+cpu
```

続いて intel-extension-for-pytorchをpipでインストールします。

```
(pytorch) yxxxx@igt003:~/src/oneAPI-samples/AI-and-Analytics/Getting-Started-Samples/Intel_Extension_For_PyTorch_GettingStarted$ python -m pip install intel-extension-for-pytorch oneccl_bind_pt --extra-index-url https://pytorch-extension.intel.com/release-whl/stable/cpu/us/ 
Looking in indexes: https://pypi.org/simple, https://pytorch-extension.intel.com/release-whl/stable/cpu/us/
Collecting intel-extension-for-pytorch
  Downloading https://intel-extension-for-pytorch.s3.amazonaws.com/ipex_stable/cpu/./intel_extension_for_pytorch-2.2.0%2Bcpu-cp310-cp310-linux_x86_64.whl (52.7 MB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 52.7/52.7 MB 14.2 MB/s eta 0:00:00
Collecting oneccl_bind_pt
  Downloading https://intel-extension-for-pytorch.s3.amazonaws.com/ipex_stable/cpu/./oneccl_bind_pt-2.2.0%2Bcpu-cp310-cp310-linux_x86_64.whl (39.8 MB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 39.8/39.8 MB 11.9 MB/s eta 0:00:00
Collecting psutil (from intel-extension-for-pytorch)
  Using cached psutil-5.9.8-cp36-abi3-manylinux_2_12_x86_64.manylinux2010_x86_64.manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (21 kB)
Requirement already satisfied: numpy in /lustre7/home/yxxxx/miniconda3/envs/pytorch/lib/python3.10/site-packages (from intel-extension-for-pytorch) (1.24.3)
Requirement already satisfied: packaging in /lustre7/home/yxxxx/miniconda3/envs/pytorch/lib/python3.10/site-packages (from intel-extension-for-pytorch) (23.2)
Using cached psutil-5.9.8-cp36-abi3-manylinux_2_12_x86_64.manylinux2010_x86_64.manylinux_2_17_x86_64.manylinux2014_x86_64.whl (288 kB)
Installing collected packages: oneccl_bind_pt, psutil, intel-extension-for-pytorch
Successfully installed intel-extension-for-pytorch-2.2.0+cpu oneccl_bind_pt-2.2.0+cpu psutil-5.9.8
```
インストール状態を確認します。pypiから導入されたもの、conda forgeから導入されたもの、Intelチャネルから導入されたものがあるのがわかります。

```
(pytorch)$ mamba list
# packages in environment at /home/yxxxx/miniconda3/envs/pytorch:
#
# Name                    Version                   Build  Channel
_libgcc_mutex             0.1                 conda_forge    conda-forge
_openmp_mutex             4.5                       2_gnu    conda-forge
asn1crypto                1.5.1              pyhd8ed1ab_0    intel
brotli                    1.1.0                hd590300_1    intel
brotli-bin                1.1.0                hd590300_1    intel
brotli-python             1.1.0           py310hc6cd4ac_1    intel
brotlipy                  0.7.0           py310h2372a71_1006    intel
bzip2                     1.0.8                hd590300_5    conda-forge
c-ares                    1.21.0               hd590300_0    intel
ca-certificates           2023.7.22            hbcca054_0    intel
certifi                   2023.7.22          pyhd8ed1ab_0    intel
cffi                      1.16.0          py310h2fee648_0    intel
chardet                   5.2.0           py310hff52083_1    intel
charset-normalizer        3.3.2              pyhd8ed1ab_0    intel
colorama                  0.4.6              pyhd8ed1ab_0    intel
common_cmplr_lib_rt       2024.0.3            intel_49895    intel
common_cmplr_lic_rt       2024.0.3            intel_49895    intel
conda-package-streaming   0.9.0              pyhd8ed1ab_0    intel
cryptography              41.0.5          py310h75e40e8_0    intel
cycler                    0.12.1             pyhd8ed1ab_0    intel
cython                    3.0.2           py310h3fd9d12_0    intel
daal4py                   2024.1.0        py310_intel_299    intel
dal                       2024.1.0              intel_299    intel
dpcpp-cpp-rt              2024.0.3            intel_49895    intel
dpcpp-llvm-spirv          2024.0.0        py310haaad0e5_49588    intel
dpcpp_cpp_rt              2024.0.3            intel_49895    intel
dpctl                     0.15.0          py310h9daa3b9_42    intel
dpnp                      0.13.0          py310ha1a3bb5_171    intel
filelock                  3.9.0                    pypi_0    pypi
fortran_rt                2024.0.3            intel_49895    intel
freetype                  2.12.1               h267a509_2    intel
fsspec                    2023.4.0                 pypi_0    pypi
funcsigs                  1.0.2                      py_3    intel
future                    0.18.3             pyhd8ed1ab_0    intel
gtest                     1.14.0               h00ab1b0_1    intel
icc_rt                    2024.0.3            intel_49895    intel
icu                       73.2                 h59595ed_0    intel
idna                      3.4                pyhd8ed1ab_0    intel
impi_rt                   2021.11.0           intel_49493    intel
intel-cmplr-lib-rt        2024.0.3            intel_49895    intel
intel-cmplr-lic-rt        2024.0.3            intel_49895    intel
intel-extension-for-pytorch 2.2.0+cpu                pypi_0    pypi
intel-fortran-rt          2024.0.3            intel_49895    intel
intel-opencl-rt           2024.0.3            intel_49895    intel
intel-openmp              2024.0.3            intel_49895    intel
intelpython               2024.0.0                      0    intel
intelpython3_core         2024.0.0                py310_1    intel
intelpython3_full         2024.0.0                py310_0    intel
ipp                       2021.10.0             intel_653    intel
jinja2                    3.1.2                    pypi_0    pypi
joblib                    1.3.2              pyhd8ed1ab_0    intel
jsonpatch                 1.33               pyhd8ed1ab_0    intel
jsonpointer               2.4             py310hff52083_3    intel
kiwisolver                1.4.5           py310hd41b1e2_1    intel
ld_impl_linux-64          2.40                 h41732ed_0    conda-forge
level-zero                1.15.1               h00ab1b0_0    intel
libabseil                 20230802.1      cxx17_h59595ed_0    intel
libbrotlicommon           1.1.0                hd590300_1    intel
libbrotlidec              1.1.0                hd590300_1    intel
libbrotlienc              1.1.0                hd590300_1    intel
libevent                  2.1.12               hf998b51_1    intel
libffi                    3.4.2                h7f98852_5    conda-forge
libgcc-ng                 13.2.0               h807b86a_2    intel
libgfortran-ng            13.2.0               h69a702a_2    intel
libgfortran5              13.2.0               ha4646dd_2    intel
libgomp                   13.2.0               h807b86a_2    intel
libiconv                  1.17                 h166bdaf_0    intel
libllvm14                 14.0.6               hcd5def8_4    intel
libnsl                    2.0.1                hd590300_0    conda-forge
libpng                    1.6.39               h753d276_0    intel
libprotobuf               4.24.4               hf27288f_0    intel
libsqlite                 3.44.0               h2797004_0    intel
libstdcxx-ng              13.2.0               h7e041cc_2    intel
libuuid                   2.38.1               h0b41bf4_0    conda-forge
libxcrypt                 4.4.36               hd590300_1    conda-forge
libxml2                   2.11.5               h232c23b_1    intel
libzlib                   1.2.13               hd590300_5    conda-forge
llvm                      14.0.6               h32600fe_4    intel
llvm-spirv                14.0.0               h2bc3f7f_0    intel
llvmlite                  0.40.1          py310h76e7cf5_0    intel
markupsafe                2.1.3                    pypi_0    pypi
mkl                       2024.0.0            intel_49656    intel
mkl-dpcpp                 2024.0.0            intel_49656    intel
mkl-service               2.4.0           py310h3539a15_41    intel
mkl_fft                   1.3.6           py310h1d81ff8_61    intel
mkl_random                1.2.2           py310h5a378b4_81    intel
mkl_umath                 0.1.1           py310h2b1685c_91    intel
mpmath                    1.3.0                    pypi_0    pypi
ncurses                   6.4                  h59595ed_2    conda-forge
networkx                  3.2.1                    pypi_0    pypi
numba                     0.57.1          py310h0f6aa51_0    intel
numba-dpex                0.21.4          py310hce084a9_0    intel
numpy                     1.24.3          py310ha320b8e_5    intel
numpy-base                1.24.3          py310hbac2b65_5    intel
oneccl-bind-pt            2.2.0+cpu                pypi_0    pypi
onemkl-sycl-blas          2024.0.0            intel_49656    intel
onemkl-sycl-datafitting   2024.0.0            intel_49656    intel
onemkl-sycl-dft           2024.0.0            intel_49656    intel
onemkl-sycl-lapack        2024.0.0            intel_49656    intel
onemkl-sycl-rng           2024.0.0            intel_49656    intel
onemkl-sycl-sparse        2024.0.0            intel_49656    intel
onemkl-sycl-stats         2024.0.0            intel_49656    intel
onemkl-sycl-vm            2024.0.0            intel_49656    intel
opencl_rt                 2024.0.3            intel_49895    intel
openssl                   3.1.4                hd590300_0    intel
packaging                 23.2               pyhd8ed1ab_0    intel
pillow                    10.2.0                   pypi_0    pypi
pip                       23.3.1             pyhd8ed1ab_0    intel
platformdirs              3.11.0             pyhd8ed1ab_0    intel
pluggy                    1.3.0              pyhd8ed1ab_0    intel
pooch                     1.8.0              pyhd8ed1ab_0    intel
psutil                    5.9.8                    pypi_0    pypi
pycparser                 2.21               pyhd8ed1ab_0    intel
pyopenssl                 23.3.0             pyhd8ed1ab_0    intel
pyparsing                 3.1.1              pyhd8ed1ab_0    intel
pysocks                   1.7.1              pyha2e5f31_6    intel
python                    3.10.13              h4499717_0    intel
python-dateutil           2.8.2              pyhd8ed1ab_0    intel
python_abi                3.10                    2_cp310    intel
pytz                      2023.3.post1       pyhd8ed1ab_0    intel
pyyaml                    6.0.1           py310h2372a71_1    intel
readline                  8.2                  h8228510_1    conda-forge
requests                  2.31.0             pyhd8ed1ab_0    intel
ruamel.yaml               0.17.40         py310h2372a71_0    intel
ruamel.yaml.clib          0.2.7           py310h2372a71_2    intel
scikit-learn              1.3.1           py310h1fdf081_1    intel
scikit-learn-intelex      2024.1.0        py310_intel_299    intel
scipy                     1.10.1          py310h6681978_8    intel
setuptools                68.2.2             pyhd8ed1ab_0    intel
six                       1.16.0             pyh6c4a22f_0    intel
smp                       0.1.5           py310h8271ca5_21    intel
snappy                    1.1.10               h9fff704_0    intel
spirv-tools               2023.2               h00ab1b0_4    intel
sympy                     1.12                     pypi_0    pypi
tbb                       2021.11.0           intel_49513    intel
tbb4py                    2021.11.0       py310_intel_49513    intel
threadpoolctl             3.2.0              pyha21a80b_0    intel
tk                        8.6.13          noxft_h4845f30_101    conda-forge
toolz                     0.12.0             pyhd8ed1ab_0    intel
torch                     2.2.1+cpu                pypi_0    pypi
torchaudio                2.2.1+cpu                pypi_0    pypi
torchvision               0.17.1+cpu               pypi_0    pypi
typing-extensions         4.8.0                hd8ed1ab_0    intel
typing_extensions         4.8.0              pyha770c72_0    intel
tzdata                    2023c                h71feb2d_0    intel
urllib3                   2.0.7              pyhd8ed1ab_0    intel
wheel                     0.41.3             pyhd8ed1ab_0    intel
xgboost                   1.7.3           0_gade498py310_25    intel
xz                        5.2.6                h166bdaf_0    conda-forge
yaml                      0.2.5                h7f98852_2    intel
zlib                      1.2.13               hd590300_5    intel
zstandard                 0.22.0          py310h1275a96_0    intel
zstd                      1.5.5                hfc55251_0    intel

```
作成した仮想環境を利用してサンプルプログラムを動作させてみます。

```
$ python ./Intel_Extension_For_PyTorch_Hello_World.py 
onednn_verbose,info,oneDNN v3.3.4 (commit f240e12a29cff8ec1f37e5907971aa4315d30f1e)
onednn_verbose,info,cpu,runtime:OpenMP,nthr:24
onednn_verbose,info,cpu,isa:Intel AVX-512 with AVX512BW, AVX512VL, and AVX512DQ extensions
onednn_verbose,info,gpu,runtime:none
onednn_verbose,info,graph,backend,0:compiler_backend
onednn_verbose,info,graph,backend,1:dnnl_backend
onednn_verbose,primitive,info,template:operation,engine,primitive,implementation,prop_kind,memory_descriptors,attributes,auxiliary,problem_desc,exec_time
onednn_verbose,graph,info,template:operation,engine,partition_id,partition_kind,op_names,data_formats,logical_tensors,fpmath_mode,backend,exec_time
onednn_verbose,primitive,exec,cpu,reorder,jit:uni,undef,src_f32::blocked:acdb::f0 dst_f32:p:blocked:Acdb16a::f0,attr-scratchpad:user ,,6x3x3x3,0.00488281
onednn_verbose,primitive,exec,cpu,convolution,brgconv:avx512_core,forward_training,src_f32::blocked:acdb::f0 wei_f32:ap:blocked:Acdb16a::f0 bia_f32:a:blocked:a::f0 dst_f32::blocked:acdb::f0,attr-scratchpad:user ,alg:convolution_direct,mb50_ic3oc6_ih112oh110kh3sh1dh0ph0_iw112ow110kw3sw1dw0pw0,1.32788
onednn_verbose,primitive,exec,cpu,convolution,jit:avx512_core,backward_weights,src_f32::blocked:acdb::f0 wei_f32:ap:blocked:Acdb16a::f0 bia_f32:a:blocked:a::f0 dst_f32::blocked:acdb::f0,attr-scratchpad:user ,alg:convolution_direct,mb50_ic3oc6_ih112oh110kh3sh1dh0ph0_iw112ow110kw3sw1dw0pw0,0.819092
onednn_verbose,primitive,exec,cpu,convolution,brgconv:avx512_core,forward_training,src_f32::blocked:acdb::f0 wei_f32:ap:blocked:Acdb16a::f0 bia_f32:a:blocked:a::f0 dst_f32::blocked:acdb::f0,attr-scratchpad:user ,alg:convolution_direct,mb50_ic3oc6_ih112oh110kh3sh1dh0ph0_iw112ow110kw3sw1dw0pw0,0.50708
onednn_verbose,primitive,exec,cpu,convolution,jit:avx512_core,backward_weights,src_f32::blocked:acdb::f0 wei_f32:ap:blocked:Acdb16a::f0 bia_f32:a:blocked:a::f0 dst_f32::blocked:acdb::f0,attr-scratchpad:user ,alg:convolution_direct,mb50_ic3oc6_ih112oh110kh3sh1dh0ph0_iw112ow110kw3sw1dw0pw0,0.781006
onednn_verbose,primitive,exec,cpu,convolution,brgconv:avx512_core,forward_training,src_f32::blocked:acdb::f0 wei_f32:ap:blocked:Acdb16a::f0 bia_f32:a:blocked:a::f0 dst_f32::blocked:acdb::f0,attr-scratchpad:user ,alg:convolution_direct,mb10_ic3oc6_ih112oh110kh3sh1dh0ph0_iw112ow110kw3sw1dw0pw0,0.155029
onednn_verbose,primitive,exec,cpu,convolution,brgconv:avx512_core,forward_training,src_f32::blocked:acdb::f0 wei_f32:ap:blocked:Acdb16a::f0 bia_f32:a:blocked:a::f0 dst_f32::blocked:acdb::f0,attr-scratchpad:user ,alg:convolution_direct,mb10_ic3oc6_ih112oh110kh3sh1dh0ph0_iw112ow110kw3sw1dw0pw0,0.141846
[CODE_SAMPLE_COMPLETfED_SUCCESFULLY]
 ```
基本的な動作ですが、Intel Extension for Pytorch->Intel OneDNNを利用してサンプルプログラムがマルチスレッド環境やAVX512を認識して動作していることがわかります。

次にCPU負荷の若干高い例題をバッチジョブとして計算ノードに投入して計算させて見ます。

- [Optimize PyTorch Models using Intel® Extension for PyTorch* Quantization](https://github.com/oneapi-src/oneAPI-samples/tree/master/AI-and-Analytics/Features-and-Functionality/IntelPytorch_Quantization)

condaで仮想環境を読み込んで環境を切り替え、例題を実行するには以下のようにconda.shを読み込んで作成したPyTorchの環境をactivateします。
```
#!/bin/bash
#$ -cwd
#$ -V
#$ -l short
#$ -l d_rt=00:50:00
#$ -l s_rt=00:50:00
#$ -l s_vmem=50G
#$ -l mem_req=50G
#$ -N short
#$ -S /bin/bash

export OMP_NUM_THREADS=4
source /home/ymuna/miniconda3/etc/profile.d/conda.sh
conda activate pytorch
python ./IntelPytorch_Quantization.py
```
MKLを利用したPythonモジュールがマルチスレッド動作をする為、上のスクリプトでは、OMP_NUM_THREADSで
利用CPUコア数を制限しています。
```
Files already downloaded and verified
Inference with FP32
Inference ...
Inference Time Avg:  0.38231764554977415
Inference with Static INT8
Inference ...
Inference Time Avg:  0.07147334575653076
Inference with Dynamic INT8
Inference ...
Inference Time Avg:  0.07396594524383544
Summary
FP32 inference time: 0.382
INT8 static quantization inference time: 0.071
INT8 dynamic quantization inference time: 0.074
Staic INT8 5.35X faster than FP32
Dynamic INT8 5.17X faster than FP32
[CODE_SAMPLE_COMPLETED_SUCCESFULLY]
```
上記のように、計算ノード上でPyTorch環境を認識して動作することがわかります。


