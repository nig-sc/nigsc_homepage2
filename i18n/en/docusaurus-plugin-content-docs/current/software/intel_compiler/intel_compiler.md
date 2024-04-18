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




