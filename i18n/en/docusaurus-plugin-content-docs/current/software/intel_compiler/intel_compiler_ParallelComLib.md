---
id: intel_compiler_ParallelComLib
title: "Parallel Computing Library"
---



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

