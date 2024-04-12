---
id: intel_compiler
title: C/C++ (Intel Compiler)
---

The NIG supercomputer system has installed the ***Intel oneAPI Base & HPC Toolkit Multi-node***, enabling the use of the following tools. For details about each product, please refer to the following sites:

- [List of products and features included in the suite product (vendor site)](https://www.xlsoft.com/jp/products/intel/oneapi/bundle.html)
- [oneAPI programming guide](https://www.intel.com/content/www/us/en/docs/oneapi/programming-guide/2023-0/overview.html)
- [Intel oneAPI specification](https://spec.oneapi.io/versions/latest/index.html)

You may consider using Intel's compiler, libraries, and development environments over open-source compilers such as gcc in the following cases:

- When you want to build and optimize open-source numerical libraries by yourself, especially if you want to build libraries written in FORTRAN.
  - [(Example)Using oneMKL with R](https://www.intel.com/content/www/us/en/developer/articles/technical/using-onemkl-with-r.html)
- When building programs that use multi-threading programming standards like OpenMP, especially for FORTRAN.
- When you want to use Python modules like numpy, scikit-learn, and scipy, which are fast and use Intel MKL internally (Intel Distribution for Python).
  - [Intel's overview document on Python acceleration (2018, a bit old but good for an overview)](https://jp.xlsoft.com/documents/intel/python/2018/greeneltch_fastpython.pdf)
- When you want to develop programs using various mathematical functions supported by Intel MKL.
- When you want to use libraries optimized for Intel hardware features and generate optimized code with detailed compiler options.
- When you want to fine-tune or debug programs using OpenMP, MPI, etc., with tools like VTune Profiler and TraceAnalyzer.

The table below provides an overview of the components available on the NIG supercomputer.

#### Components Available on the NIG Supercomputer

| Product Name | Overview |
|--------------|----------|
| Intel oneAPI DPC++/C++ Compiler | C/C++ compiler with advanced optimization and speed-up options for Intel hardware. |
| Intel MPI Library | Intel's MPI library that can be integrated with Intel's development tools. |
| Intel oneAPI DPC++ Library (oneDPL) | Basic and template library for C++ (parallel compatible). |
| Intel oneMKL | Numerical library with linear algebra, various mathematical functions, FFT, random number generation, etc., with a long history of use on Intel hardware for potential speed-ups. |
| Intel oneDAL | Library to accelerate big data analytics applications and distributed computing. |
| Intel IPP | Library for image processing, signal processing, data compression, cryptography, etc. (more for IoT and embedded device processors). |
| Intel OneTBB | C++ multi-threading library compatible with thread parallelism and IntelMPI. |
| Intel OneCCL | High-performance communication library for distributed deep learning, usable with Horovod, etc. |
| Intel OneDNN | Library for deep learning applications, optimized using Intel hardware features (e.g., AVX512). |
| Intel Advisor | Tool for vectorization/threading prototyping and tuning for developers of C, C++, C#, Fortran software. |
| Intel VTune Profiler | Performance analysis tool for advanced profiling, capable of debugging across multiple compute nodes. |
| Intel Distribution GDB | GDB enhanced by Intel for debugging on Intel CPU, GPU, FPGA. |
| Intel Fortran Compiler | Fortran compiler by Intel capable of generating highly optimized code for Intel hardware. |
| Intel Distribution for Python | Python ecosystem accelerated by Intel, including MKL-compatible modules like numpy. |
| Intel Inspector | Debugger for detecting memory/thread errors. |
| Intel Trace Analyzer & Collector | Tool for performance analysis and tuning of MPI applications. |

Furthermore, according to Intel's policy, Intel software development tools are available for free for both commercial and academic use (support is paid).

- [Conditions on the domestic distributor's support quotation page](https://www.xlsoft.com/jp/products/intel/purchase/prices.html?type=ac)
- [Download site for Intel oneAPI Base Toolkit](https://www.intel.com/content/www/us/en/developer/tools/oneapi/base-toolkit-download.html)
- [Download site for Intel oneAPI HPC Toolkit](https://www.intel.com/content/www/us/en/developer/tools/oneapi/hpc-toolkit-download.html)

It is possible to install Intel's tools on your own computer for software creation and debugging, and then use the NIG supercomputer system for computations requiring large resources.

Below, we explain an overview and the basic usage of the components available on the NIG supercomputer. Please note that directory paths in execution logs, such as `2024.0`, indicate the situation at the time of article creation and may change

 with updates. Please interpret the actual situation accordingly.

## Intel® oneAPI DPC++/C++ Compiler

The NIG supercomputer allows the use of the Intel OneAPI DPC++/C++ compiler.

The Intel compiler is available by default.

```
 yxxxx@at138:~$ which icx
/lustre7/software/intel_ubuntu/oneapi/compiler/2024.0/bin/icx
 yxxxx@at138:~$ which icpx
/lustre7/software/intel_ubuntu/oneapi/compiler/2024.0/bin/icpx
```

To execute binaries with advanced optimizations, please run them on compute nodes equipped with Intel CPUs (they will also work on AMD CPUs). For the general division, please refer to the queue configuration.

- [Queue configuration in AGE](/general_analysis_division/ga_queue/)

### Compiler Command Formats

| Language | Command | Execution Format |
|----------|---------|------------------|
| C  | icx  | icx [options] filename |
| C++  | icpx  | icpx [options] filename |

### Main Options

Here are the summaries of the main options available with the Intel compiler:

| Option Name | Description |
|-------------|-------------|
| -o FILENAME | Specifies the name of the object file. |
| -mcmodel=medium | Allows memory usage exceeding 2GB. |
| -shared-intel | Dynamically links all libraries provided by Intel. |
| -qopenmp | Compiles with OpenMP directives enabled. |
| -qmkl | Links MKL library. |
| -parallel | Enables automatic parallelization. |
| -O0 / -O1 / -O2 / -O3 | Specifies the optimization level (default is -O2). |
| -fast | Optimizes to maximize program execution speed. Includes options: -ipo, -O3, -static, -fp-model fast=2 by default. |
| -ip | Optimizes procedures within a single file. |
| -ipo | Optimizes procedures across multiple files. May significantly increase compilation time. |
| -xCORE-AVX512 / -xCORE-AVX2 | Generates optimized code for specified instruction sets for Intel processors. |
| -static-intel | Static links libraries provided by Intel. |

The vendor recommends using the -fast option as a basic check.

For detailed options, refer to Intel's site:

[Intel's detailed compiler options on the documentation site](https://www.intel.com/content/www/us/en/docs/dpcpp-cpp-compiler/developer-guide-reference/2023-0/compiler-options.html)

### Using OpenMP
OpenMP is available with the Intel compiler.
For details about the OpenMP features supported by the Intel compiler, please refer to the information on Intel's site. As of 11/30/2023, the Intel Compiler installed on the system supports OpenMP 5.0 to 6.0 (partially).

[OpenMP* Features and Extensions Supported in Intel® oneAPI DPC++/C++ Compiler](https://www.intel.com/content/www/us/en/developer/articles/technical/openmp-features-and-extensions-supported-in-icx.html)

[A Survey of OpenMP* Features Implemented in Intel® Fortran and C++ Compilers](https://www.intel.com/content/www/us/en/developer/articles/technical/a-survey-of-openmp-features-implemented-in-intel-fortran-and-c-compilers.html)

## Intel MPI Library
Intel's MPI implementation.

- [Product page by the distributor](https://www.xlsoft.com/jp/products/intel/cluster/mpi/index.html)
- [Developer's guide by the distributor](https://jp.xlsoft.com/documents/intel/mpi/2021/mpi-devguide-linux-2021.11.pdf)

In the general division of the NIG supercomputer, the environment for using Intel MPI is set.

```
xxxxx@at139:~/mpitest$ env |grep I_MPI
I_MPI_ROOT=/lustre7/software/intel_ubuntu/oneapi/mpi/2021.11

xxxxx@at139:~/mpitest$ which mpiicx
/lustre7/software/intel_ubuntu/oneapi/mpi/2021.11/bin/mpiicx
```
Compilation is performed as follows:

```
xxxxx@at139:~/mpitest$ mpiicx mpi_test.c -o mpi_test
yxxxx@at139:~/mpitest$ ls
mpi_test  mpi_test.c  sample1.sh
```
Execution is done using a job script like the one below for AGE, and then running qsub. (For advanced optimization and detailed profiling, use the Intel queue. The example below is submitted to the epyc queue for easier execution due to its configuration.)

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

You execute as follows:

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

The execution result will look like this:

```
yxxxx@at139:~/mpitest$ more example.o25616887 
Hello world from processor at147, rank 2 out of 4 processors
Hello world from processor at155, rank 0 out of 4 processors
Hello world from processor at156, rank 3 out of 4 processors
Hello world from processor at144, rank 1 out of 4 processors
```

## Intel oneAPI DPC++ Library (oneDPL)

This component includes the following C++ base library:
- Parallel STL (Standard Template Library)
- An additional set of library classes and functions including:
  - Parallel algorithms
  - Iterators
  - Function object classes
  - Range-based APIs
- Tested standard C++ APIs
- Random number generators

Refer to the following for more details:
- [Intel's product page](https://www.intel.com/content/www/us/en/developer/tools/oneapi/dpc-library.html#gs.545ezq)
- [Intel's developer guide on GitHub](https://oneapi-src.github.io/oneDPL/index.html)
- [Intel's OPL samples on GitHub](https://github.com/oneapi-src/oneDPL/tree/main/examples)

## Intel oneMKL (Math Kernel Library)

The NIG supercomputer allows the use of the Intel Math Kernel Library (MKL), which accelerates mathematical processing routines such as linear algebra, fast Fourier transforms, and vector operations.

- Dense linear algebra routines from BLAS and LAPACK
- Sparse BLAS sparse linear algebra routines
- Random number generators
- Vector math routines optimized for vector operations
- Fast Fourier Transforms (FFT)

Please check the following directory:
```
/lustre7/software/intel_ubuntu/oneapi/mkl/2023.2.0/lib/intel64
```

For more information, refer to the following sites:
- [Distributor's documentation site](https://www.xlsoft.com/jp/products/intel/perflib/mkl/index.html)
- [Intel's product information site](https://www.intel.com/content/www/us/en/developer/tools/oneapi/onemkl.html#gs.545toc)
- [Intel's developer's guide](https://jp.xlsoft.com/documents/intel/mkl/2024/onemkl-developerguide-linux.pdf)
- [Community support forum](https://community.intel.com/t5/Intel-oneAPI-Math-Kernel-Library/bd-p/oneapi-math-kernel-library)

For linking options with MKL, consider using the Link Line Advisor:
[Intel oneAPI Math Kernel Library Link Line Advisor](https://www.intel.com/content/www/us/en/developer/tools/oneapi/onemkl-link-line-advisor.html#gs.4cdbls)

## Intel oneDAL (Data Analytics Library)

A library for accelerating big data analytics applications and distributed computing. Refer to the following for detailed information:
- [Distributor's product page](https://www.xlsoft.com/jp/products/intel/perflib/daal/index.html?tab=1)
- [Documentation site on GitHub](https://oneapi-src.github.io/oneDAL/)
- [OneDAL's documentation site](https://spec.oneapi.io/versions/latest/elements/oneDAL/source/index.html)
- [OneDAL tutorials](https://github.com/oneapi-src/oneAPI-samples/tree/master/Libraries/oneCCL/tutorials)

On the NIG supercomputer, ensure the following directory is included in your `LD_LIBRARY_PATH`:
```
/lustre7/software/intel_ubuntu/oneapi/dal/2023.2.0/lib/intel64
```

## Intel IPP (Integrated Performance Primitives)

A library for image processing functions, including image processing, signal processing, data compression, and encryption functions.
- [Distributor's product page](https://www.xlsoft.com/jp/products/intel/perflib/ipp/index.html)
- [Developer's guide (English)](https://jp.xlsoft.com/documents/intel/ipp/2021/intel-ipp-developer-guide-reference.pdf)

On the NIG supercomputer, ensure the following directory is included in your `LD_LIBRARY_PATH`:
```
/lustre7/software/intel_ubuntu/oneapi/ipp/2021.9.0/lib/intel64
```

## Intel OneTBB (Threading Building Blocks)

A multi-threaded C++ library providing the following functionalities for parallel programming on CPUs, in addition to those available through SYCL* and ISO C++:
- Generic parallel algorithms
- Concurrent containers
- Scalable memory allocator
- Low-level synchronization primitives

Refer to the following for detailed information:
- [Intel's product information site (English)](https://www.intel.com/content/www/us/en/developer/tools/oneapi/onetbb.html#gs.5a5xcc)
- [Distributor's product page](https://www.xlsoft.com/jp/products/intel/perflib/tbb/index.html)
- [Documentation site on GitHub](https://oneapi-src.github.io/oneTBB/)
- [Example codes on GitHub](https://github.com/oneapi-src/oneTBB/tree/master/examples)

The environment can be loaded using the module command:
```
$ module load tbb
Loading tbb version 202

1.10.0
$ module list
Currently Loaded Modulefiles:
 1) tbb/2021.10.0 
```

Check if the following path is included in your `LD_LIBRARY_PATH`:
```
/lustre7/software/intel_ubuntu/oneapi/tbb/2021.11/lib
```

## Intel OneCCL (Collective Communications Library)

A high-performance communication library for distributed deep learning, developed by Intel.
- [Intel's product page](https://www.intel.com/content/www/us/en/developer/tools/oneapi/oneccl.html#gs.4ojvjq)
- [Documentation on GitHub](https://oneapi-src.github.io/oneCCL/)

On the system, it's installed under `/lustre7/software/intel_ubuntu/oneapi/ccl/2021.10.0` with examples available in the examples directory.

## Intel OneDNN (Deep Neural Network Library)

Used for deep learning applications utilizing neural networks, optimized for Intel architecture-based processors and Intel Processor Graphics.
- [Intel's product page](https://www.intel.com/content/www/us/en/developer/tools/oneapi/onednn.html#gs.4ojwxo)
- [Developer's guide (English)](https://www.intel.com/content/www/us/en/docs/onednn/developer-guide-reference/2024-0/overview.html)
- [Documentation site on GitHub](https://oneapi-src.github.io/oneDNN/)
- [Code site on GitHub](https://github.com/oneapi-src/oneDNN)

## Intel Advisor

Intel Advisor is a high-performance vectorization and threading optimization tool for C, C++, C#, and Fortran software developers. It helps to efficiently and safely vectorize your code by identifying parts that can be parallelized. It is installed in the following directory on the NIG supercomputer:

```
/lustre7/software/intel_ubuntu/oneapi/advisor/2023.2.0/bin64/advisor
```

For more information, visit the following links:
- [Distributor's product page](https://www.xlsoft.com/jp/products/intel/advisor/index.html)
- [Older version of the Japanese User Guide](https://www.isus.jp/wp-content/uploads/advisor/2023/advisor_user_guide/index.htm)
- [Intel's tutorials](https://www.intel.com/content/www/us/en/docs/advisor/get-started-guide/2023-1/overview.html)

| Command | Description |
|---------|-------------|
| advisor | CLI version of Advisor |
| advisor-gui | GUI version of Advisor |

To use Advisor on the NIG supercomputer, you typically submit a performance evaluation job to a compute node as a batch job and then analyze the results on a login node using Advisor. The following explains this process step by step.

### Compiling the Executable

To collect evaluation information, you need to compile your program with the `-g` option.
```
icpx source_filename -g
```

### Gathering Analysis Information

Use the advisor command-line tool to gather analysis information. The example below uses a sample program named `vec_samples`.

```
(base) yxxxx@at137:~/advisor/vec_samples$ advisor --collect=survey --project-dir=./results -- ./vec_samples 
Intel(R) Advisor Command Line Tool
Copyright (C) 2009-2023 Intel Corporation. All rights reserved.
advisor: Collection started. To stop the collection, either press CTRL-C or enter from another console window: advisor -r /lustre7/home/yxxxx/advisor/vec_samples/results/e000/hs000 -command stop.

ROW:47 COL: 47
Execution time is 2.936 seconds
GigaFlops = 1.504849
Sum of result = 254364.540283
advisor: Collection stopped.
advisor: Opening result 99 % done                                              
advisor: Preparing frequently used data  0 % done                              
advisor: Preparing frequently used data 100 % done                             
advisor: Warning: Higher instruction set architecture (ISA) available 

Program Elapsed Time: 2.94s

CPU Time: 2.94s
Time in 2 Vectorized Loops: 0.85s
```
In the above process, analysis information is stored in the `./results` directory.

### Viewing Analysis Results via CLI

You can output the report file via CLI with the following command line specification.

```
advisor -report survey -project-dir ./result -format=text -report-output ./result/report.txt
```
The contents of `report.txt` will look something like this. You can add more content to the report by specifying additional options.

```
Intel(R) Advisor Command Line Tool
Copyright (C) 2009-2023 Intel Corporation. All rights reserved.
Survey Data version="1.1.0"

ID     Function Call Sites and Loops      Total Time   Self Time          Type           Why No Vectorization   Vector ISA   Compiler Estimated Gain   Transformations   Source Location     Module      
_________________________________________________________________________________________________________________________________________________________________________________________________________
 4   [loop in matvec at Multiply.c:69]        2.122s      2.122s                Scalar                                                                                     Multiply.c:69   vec_samples   
 9   [loop in matvec at Multiply.c:82]        0.710s      0.710s   Vectorized Versions                                 SSE                                                 Multiply.c:82   vec_samples   
 7   -[loop in matvec at Multiply.c:82]       0.566s      0.566s     Vectorized (Body)                                 SSE                                                 Multiply.c:82   vec_samples   
 2   -[loop in matvec at Multiply.c:82]       0.144s      0.144s                Scalar                                                                                     Multiply.c:82   vec_samples   
 3   [loop in matvec at Multiply.c:49]        3.448s      0.392s                Scalar                                                                                     Multiply.c:49   vec_samples   
 8   [loop in matvec at Multiply.c:60]        0.224s      0.224s   Vectorized Versions                                 SSE                                                 Multiply.c:60   vec_samples   
 6   -[loop in matvec at Multiply.c:60]       0.196s      0.196s     Vectorized (Body)                                 SSE                                                 Multiply.c:60   vec_samples   
 5   -[loop in matvec at Multiply.c:60]       0.028s      0.028s                Scalar                                                                                     Multiply.c:60   vec_samples   
 1   [loop in main at Driver.c:155]           3.460s          0s                Scalar                                                                                      Driver.c:155   vec_samples   

```

### Viewing Analysis Results via GUI

To launch and view results with the GUI version of Advisor, you need an X server environment set up on your local PC.

First, log in to the interactive node where you want to launch Advisor using `qlogin`, and note the host name.

Next, set up an SSH tunnel for X forwarding. Log in to the gateway node with the `-CX` option from your local terminal:
```
ssh -l username -CX gw.ddbj.nig.ac.jp
```
Then, log in to the node where Advisor is running with the `-CX` option:
```
ssh -CX login_node_name
```
Check the DISPLAY environment variable:
```
$ echo $DISPLAY
localhost:13.0
```
Keep this terminal open during your work. It's only used for setting up the SSH tunnel. Further operations should be done from another terminal where you logged in using `qlogin`.

Set the DISPLAY environment variable on the terminal where you logged in using `qlogin`:
```
export DISPLAY= localhost:13.0
echo $DISPLAY
localhost:13.0
```
Launch Advisor. Here, the argument specifies the directory where the analysis information is stored:
```
advisor-gui ./results
```
The following screen will appear on your local PC:

![Advisor GUI](advisor1.png)

Click the "show result" button. After a while, the result display screen will appear as shown below:

![Advisor Analysis](advisor2.png)

For how to use the profiler, please refer to the user guide.

## Intel VTune Profiler
A performance analysis tool.

- [Product page by the distributor](https://www.xlsoft.com/jp/products/intel/VTune/index.html)
- [Intel's User Guide (English)](https://jp.xlsoft.com/documents/intel/vtune/2024/vtune-profiler-user-guide.pdf)
- [Performance Analysis Cookbook translated by the distributor](https://jp.xlsoft.com/documents/intel/vtune/2021/Intel_VTune_Profiler_Performance_Analysis_Cookbook.pdf)

Here, we describe how to use VTune with a web server (vtune-backend) version, starting vtune-backend on a login node and connecting from a user PC.
The following description refers to the article by Intel:

- [Intel VTune Profiler Performance Analysis Cookbook](https://www.intel.com/content/www/us/en/docs/vtune-profiler/cookbook/2023-0/vtune-profiler-server-in-hpc.html)

First, on an interactive node logged in via qlogin, start vtune-backend.

```js
//highlight-next-line
vtune-backend --web-port=40507 --enable-server-profiling --data-directory=~/vtune-data --reset-passphrase
No TLS certificate was provided as a --tls-certificate command-line argument thus a self-signed certificate is generated to enable secure HTTPS transport for the web server: /home/yxxxx/.intel/vtune/settings/certificates/middleware.crt. 
//highlight-next-line
VTune Profiler GUI is accessible via https://127.0.0.1:40507/?one-time-token=c623b26caf9c08c12cf448c03ebb0a29
```
The options used for vtune-backend are as follows:
- `--web-port` Specifies the port number to launch vtune-backend. Here, 40507 is used as an example.
- `--enable-server-profiling` Enables server profiling. Always use this option.
- `--data-directory` Specifies the directory where the data files used for profiling are located.
- `--reset-passphrase` Requires a passphrase to access the web interface. At the first access, you will be asked to set a passphrase.

Next, create an SSH tunnel using SSH port forwarding.
Enter the following command in your local PC's terminal to login to the gateway node.
```
ssh -L 127.0.0.1:40507:127.0.0.1:40507 gw.ddbj.nig.ac.jp
```
Then, from the gateway node, SSH to the login node where vtune-backend is running.
```
ssh -L 127.0.0.1:40507:127.0.0.1:40507 login_node_name
```
Keep the terminal opened where you made this SSH connection. Closing the terminal will also end the SSH tunnel. For operations on the login node, please login using qlogin. This step is only performed to establish the SSH tunnel and should not be used for any other operations.

Launch a browser on your PC and go to:

`http://127.0.0.1:40507`

Then, add the one-time token displayed in the above screen

`?one-time-token=c623b26caf9c08c12cf448c03ebb0a29`

to the URL:

`http://127.0.0.1:40507/?one-time-token=c623b26caf9c08c12cf448c03ebb0a29`

This will display the following screen.

![figure](vtune_pass1.png)

You're requested to register a passphrase to access the profiler. After registering a passphrase of your choice, you will see the profiler's interface as below.

![figure](vtune_profiler.png)

Refer to the user guide for how to use the profiler.

## Intel Distribution for GDB
A version of GDB that includes additional features for debugging on Intel CPUs, GPUs, and FPGAs compared to standard GDB.

|Command|Description|
|-------|-----------|
|gdb-oneapi|oneapi's gdb|

- [Intel product page](https://www.intel.com/content/www/us/en/developer/tools/oneapi/distribution-for-gdb.html#gs.77dyc6)
- [Intel's Get Started site](https://www.intel.com/content/www/us/en/docs/distribution-for-gdb/get-started-guide-linux/2024-0/overview.html)

## Intel Fortran Compiler
Intel's Fortran compiler.

- Added support for the Fortran 2023 standard.
- Enhanced support for OpenMP 5.0, 5.1, and 5.2. Compliant with the OpenMp 6.0 standard.

- [Product page by the distributor](https://www.xlsoft.com/jp/products/intel/compilers/fortran/index.html)
- [Intel's Developer Guide (

English)](https://www.intel.com/content/www/us/en/docs/fortran-compiler/developer-guide-reference/2024-0/overview.html)

### Compiler Command Format

|Language|Command|Execution Format|
|--------|-------|----------------|
|Fortran | ifx   | ifx [options] file_name |

## Intel Distribution for Python

Intel Distribution for Python offers the following features, aiming for performance improvements compared to CPython, which uses the Global Interpreter Lock (GIL):

- Enhanced performance with Intel® MKL and Python* computational packages (NumPy, SciPy, and scikit-learn).
- Streamlined thread scheduling using Intel® TBB library as a Python* package.
- Accelerated code execution through Just-In-Time (JIT) compilation with Numba.
- Improved performance via mpi4py and Cython and Intel® MPI Library.
- Powerful data analytics and neural network functionalities implemented through pyDAAL and Intel® DAAL.
- Easily installed using conda* and PIP.

For more details, visit the following pages:
- [Intel's product information page](https://www.intel.com/content/www/us/en/developer/tools/oneapi/distribution-for-python.html#gs.5k74sy)
- [Numba's documentation site](https://numba.readthedocs.io/en/stable/)

### Environment Setup

This section explains how to install Intel Distribution for Python in your environment. The following steps are based on the information provided on this site:
- [AI Tools Selector](https://www.intel.com/content/www/us/en/developer/tools/oneapi/ai-tools-selector.html)

We will cover two methods of environment setup: using conda and using the offline installer.

#### Environment Setup with conda

Here, we describe the steps to install the Intel Distribution for Python environment using conda.

Create a virtual environment with conda:

```
conda create -n intelpython3 python=3.10 -y
conda activate intelpython3 
```

Install the `intelpython3_full` meta-package by entering the following command:

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

When prompted with `Proceed([y]/n)?`, respond with `y` to proceed with the installation.

After completion, you can check the installed packages with `conda list`. The installation includes a comprehensive set of packages enhanced for performance, including Intel® MKL, Intel® TBB, Numba, mpi4py, Cython, pyDAAL, and more, ensuring an optimized Python environment for computational tasks.

#### Steps for Environment Setup Using the Offline Installer

Next, we'll explain how to set up the Intel Distribution for Python environment in your user environment using the offline installer.

Download the offline installer using wget:

```
wget https://registrationcenter-download.intel.com/akdlm/IRC_NAS/eb21f0d0-bb7a-44b3-84d1-6489b0138b2e-2/l_AITools.2024.0.2.1.sh
```
Verify that the file has been downloaded:

```
$ ls -l l_AITools.2024.0.2.1.sh 
-rw-r--r-- 1 yxxxx xxxxx 2068849631 Dec 20 21:28 l_AITools.2024.0.2.1.sh
```
Execute the following command with regular user permissions:

```
(base) yxxxx@igt003:~$ sh ./l_AITools.2024.0.2.1.sh 
```
The following message will be displayed. The End User Agreement will appear, so please take a moment to read through it. Press the Enter key and the space key several times to scroll through the text:

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

(omitted for brevity)

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
You will be asked to accept the license terms. Please answer with yes:

```
Do you accept the license terms? [yes|no]
>>>   yes
```
You will be prompted to confirm the installation directory. If there's no special reason to change it, simply press Enter to proceed:

```
AITools will now be installed into this location:
/home/yxxxx/intel/oneapi/intelpython

  - Press ENTER to confirm the location
  - Press CTRL-C to abort the installation
  - Or specify a different location below

[/home/yxxxx/intel/oneapi/intelpython] >>> 
```
The installation will begin and take some time to complete:

```
PREFIX=/home/yxxxx/intel/oneapi/intelpython
Unpacking payload ...
                                                                                         
Installing base environment...


Downloading and Extracting Packages:

(omitted)

Installing pytorch-gpu environment...

(omitted)

Installing pytorch environment...


Downloading and Extracting Packages:

(omitted)

Installing tensorflow-gpu environment...


Downloading and Extracting Packages:

(omitted)

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

3. AI Reference Models for Intel(R) Architecture can be

 found in your installation of Intel(R) AI Tool, typically found at: 
 <home_path>/intel/oneapi/ai_reference_models 

```
After the installation is complete, you will be prompted whether you want to modify your shell environment to automatically initialize conda. This is a matter of personal preference, but here we choose not to by selecting no:

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
The installation is complete. Enter the command displayed in the message to load the environment. In this example, the login shell is bash:

```
eval "$(/home/yxxxx/intel/oneapi/intelpython/bin/conda shell.bash hook)"
```
You can verify the installed environment with conda, where you'll see Intel's packages have been installed, providing a fully optimized Python environment for your computational needs.


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

It is evident that packages such as numpy, scipy, and scikit-learn have also been introduced from the Intel channel.

### Basic Operation Check with Sample Programs

Let's use the sample programs distributed by Intel to check the environment.

- [oneAPI Samples](https://github.com/oneapi-src/oneAPI-samples)

Within this collection of samples, try running the following sample:

- [Intel® Extension for PyTorch* Getting Started Sample](https://github.com/oneapi-src/oneAPI-samples/tree/master/AI-and-Analytics/Getting-Started-Samples/Intel_Extension_For_PyTorch_GettingStarted)

This sample utilizes the Intel Extension for PyTorch, an open-source software developed by Intel. For reference, see:

- [Intel® Extension for PyTorch* Documentation](https://intel.github.io/intel-extension-for-pytorch/index.html#installation?platform=cpu&version=v2.2.0%2Bcpu)

First, create a virtual environment with conda:

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

(The rest of the package download and installation process is omitted for brevity.)

Proceed ([y]/n)? y
```

Activate the newly created virtual environment and install the Intel Distribution for Python on it:

```
$ conda activate pytorch
$ mamba install -c intel intelpython3_full

(Looking for 'intelpython3_full' and the subsequent download and installation process is omitted for brevity.)
```

Install PyTorch using pip. This step is necessary because the Intel Extension for PyTorch does not have a conda package, and managing version compatibility through conda can be cumbersome:

```
$ python -m pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu 
(Assuming installation success, details of packages installed via pip are shown.)
```

Next, install the intel-extension-for-pytorch using pip:

```
(pytorch) yxxxx@igt003:~/src/oneAPI-samples/AI-and-Analytics/Getting-Started-Samples/Intel_Extension_For_PyTorch_GettingStarted$ python -m pip install intel-extension-for-pytorch oneccl_bind_pt --extra-index-url https://pytorch-extension.intel.com/release-whl/stable/cpu/us/ 
(Assuming installation success, details of packages installed via pip are shown.)
```

You can verify the installation state. You will notice packages installed from PyPI, conda forge, and the Intel channel.

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
Let's try running a sample program using the virtual environment we created.

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
onednn_verbose,primitive,exec,cpu,convolution,brgconv:avx512_core,forward_training,src_f32::blocked:acdb::f0 wei_f32:ap:blocked:Acdb16a::f0 bia_f32:a:blocked:a::f0 dst_f32::blocked:acdb::f0,attr-scratchpad:user ,alg:convolution_direct,mb10_ic3oc6_ih112oh110kh3sh1dh

0ph0_iw112ow110kw3sw1dw0pw0,0.141846
[CODE_SAMPLE_COMPLETED_SUCCESFULLY]
 ```
This is a basic operation, but it demonstrates that the sample program is recognizing and operating in a multi-threaded environment and with AVX512 using Intel Extension for Pytorch -> Intel OneDNN.

Next, let's input a slightly more CPU-intensive example as a batch job to a compute node for computation.

- [Optimize PyTorch Models using Intel® Extension for PyTorch* Quantization](https://github.com/oneapi-src/oneAPI-samples/tree/master/AI-and-Analytics/Features-and-Functionality/IntelPytorch_Quantization)

To switch environments and run the example using conda, load the conda.sh and activate the PyTorch environment you created.
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
The script limits the number of CPU cores used by setting OMP_NUM_THREADS because Python modules utilizing MKL operate in a multi-threaded manner.
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
Static INT8 5.35X faster than FP32
Dynamic INT8 5.17X faster than FP32
[CODE_SAMPLE_COMPLETED_SUCCESFULLY]
```
As shown above, it is evident that the compute node recognizes and operates the PyTorch environment.


## Intel Inspector
A debugger for memory/threading issues. It facilitates the detection of memory errors and threading errors in C, C++, and Fortran applications.

- [Product page by the distributor](https://www.xlsoft.com/jp/products/intel/inspector/index.html)
- [Intel product page](https://www.intel.com/content/www/us/en/developer/tools/oneapi/inspector.html#gs.5a4vgi)
- [Inspector user guide (English)](https://www.intel.com/content/www/us/en/docs/inspector/user-guide-linux/2023-2/overview.html)
- [Command-line syntax](https://www.intel.com/content/www/us/en/docs/inspector/user-guide-linux/2023-2/command-syntax.html)

|Command|Description|
|-------|-----------|
|inspxe-cl|CLI version of the Inspector|
|inspxe-gui|GUI version of the Inspector|

In the supercomputer at the genetics research institute, the usage involves executing as a batch job on compute nodes to collect information, then analyzing the collected result files on the login node.

```
source /lustre7/software/intel_ubuntu/oneapi/inspector/2024.0/inspxe-vars.sh
inspxe-cl -collect mi1 -search-dir all=. -result-dir result_memory ./a.out  # For memory investigation
inspxe-cl -collect ti1 -search-dir all=. -result-dir result_thread ./a.out  # For threading investigation
```
To launch the GUI version of the inspector on the login node, since inspector is an X application, you need to set up an SSH tunnel between your local PC and the login node. The procedure is the same as for the Advisor, so please refer to the relevant section.

![figure](inspector1.png)

After running the two steps with inspxe-cl, `result_memory` and `result_thread` directories are created, and inside them, there are files with the extension `.inspexe`. Open these files using the menu option File > Open> Result. The following screen is displayed (this is merely a sample run for demonstration purposes).

![figure](inspexe-gui1.png)


## Intel Trace Analyzer & Collector
A performance analysis and tuning tool for MPI applications. It is used in conjunction with the Intel MPI Library to perform performance analysis and tuning based on trace information.

|Command|Description|
|-------|-----------|
|traceanalyzer|Trace Analyzer GUI version|

The basic usage involves running the

 program with the -trace option on the mpirun command during execution to capture MPI trace information into a trace file, then analyzing the trace file with traceanalyzer.

- [Product page by the distributor](https://www.xlsoft.com/jp/products/intel/cluster/tatc/index.html)
- [Intel product page](https://www.intel.com/content/www/us/en/docs/trace-analyzer-collector/get-started-guide/2021-10/overview.html)

Include the following command in your batch script to launch the job. Ensure that mpirun is from Intel MPI.

```
mpirun -trace your_program
```
After execution, a file named `your_program_name.stf` is created, which you load and analyze.

### CLI method for trace checking

You can generate a report file with the following command.

```
traceanalyzer --cli -o report.txt --messageprofile stf file name
```

### GUI method for trace checking

Since the traceanalyzer GUI is an X application, set up SSH X port forwarding before running:

```
traceanalyzer
```
This action displays the following screen.

![figure](traceanalyzer1.png)

In this screen, select Open from the File menu to load the stf file for analysis. This allows you to check the MPI communication pattern.

![figure](trace2.png)

For detailed usage, please refer to the Intel website mentioned above.
