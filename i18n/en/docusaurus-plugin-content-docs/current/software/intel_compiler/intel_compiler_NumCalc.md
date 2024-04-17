---
id: intel_compiler_NumCalc
title: "Numeric Calculation"
---


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


## Intel IPP (Integrated Performance Primitives)

A library for image processing functions, including image processing, signal processing, data compression, and encryption functions.
- [Distributor's product page](https://www.xlsoft.com/jp/products/intel/perflib/ipp/index.html)
- [Developer's guide (English)](https://jp.xlsoft.com/documents/intel/ipp/2021/intel-ipp-developer-guide-reference.pdf)

On the NIG supercomputer, ensure the following directory is included in your `LD_LIBRARY_PATH`:
```
/lustre7/software/intel_ubuntu/oneapi/ipp/2021.9.0/lib/intel64
```

