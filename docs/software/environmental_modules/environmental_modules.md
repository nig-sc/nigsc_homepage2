---
id: environmental_modules
title: "Environmental Modules"
---

<table>
<td>
Environmental Modulesは、遺伝研スパコンのCentOS 7 の環境のみで有効です。Ubuntu Linuxの環境では使用できません。
</td>
</table>

使用する C/C++コンパイラ等のバージョンをユーザ権限で切り替えるためのツールです。


参考資料

- [Environmental Modules 公式サイト](http://modules.sourceforge.net/)
- [Bright Cluster Manager (BCM) Getting Started Guide](https://www.brightcomputing.com/bcm-getting-started-guide)




## 利用可能なモジュールを表示する

`module avail`コマンドで、利用可能なパッケージの一覧を表示できます。

```
$ module avail
------------------------------------------------------------------------- /cm/local/modulefiles -------------------------------------------------------------------------
cluster-tools/8.2  dot             gcc/9.2.0        java/1.6.0_45   java/11.0.3  module-info  openmpi/mlnx/gcc/64/4.0.3rc4  r/3.5.2     ruby/2.6.5         
cmd                freeipmi/1.6.2  git/2.26.2       java/1.8.0_45   lua/5.3.5    null         python/3.7.2                  ruby/1.9.3  shared             
docker/18.09.8     gcc/8.2.0       ipmitool/1.8.18  java/1.8.0_202  module-git   openldap     python2                       ruby/2.6.0  singularity/3.4.1  

------------------------------------------------------------------------ /cm/shared/modulefiles -------------------------------------------------------------------------
blacs/openmpi/gcc/64/1.1patch03  cuda91/profiler/9.1.85                       intel/compiler/64/16.0.4/2016.4.258  keras-py27-cuda10.1-gcc/2.3.1          
blas/gcc/64/3.8.0                cuda91/toolkit/9.1.85                        intel/compiler/64/2017/17.0.8        keras-py36-cuda10.1-gcc/2.3.1          
bonnie++/1.97.3                  cuda92/blas/9.2.88                           intel/compiler/64/2018/18.0.5        keras/2.3.1                            
chainer-py27-cuda10.1-gcc/6.5.0  cuda92/fft/9.2.88                            intel/daal/64/2016.4/2016.4.258      lapack/gcc/64/3.8.0                    
chainer-py36-cuda10.1-gcc/7.0.0  cuda92/nsight/9.2.88                         intel/daal/64/2017/8.262             ml-pythondeps-py27-cuda10.1-gcc/3.0.0  
chainer/6.5.0                    cuda92/profiler/9.2.88                       intel/daal/64/2018/4.274             ml-pythondeps-py36-cuda10.1-gcc/3.0.0  
cm-eigen3/3.3.7                  cuda92/toolkit/9.2.88                        intel/gdb/64/7.8.0/2016.4.258        mpich/ge/gcc/64/3.3                    
cm-ml-python3deps/3.0.0          cudnn/7.0                                    intel/gdb/64/2017/8.262              mvapich2/gcc/64/2.3                    
cm-ml-pythondeps/3.0.0           cudnn/7.5.1                                  intel/gdb/64/2018/5.274              mxnet-py27-cuda10.1-gcc/1.5.1          
cm-pmix3/3.1.4                   cudnn7.6-cuda10.1/7.6.5.32                   intel/ipp/64/9.0.4/2016.4.258        mxnet-py36-cuda10.1-gcc/1.5.1          
cub-cuda10.1/1.8.0               default-environment                          intel/ipp/64/2017/8.262              mxnet/1.5.1                            
cub/1.8.0                        dynet-py27-cuda10.1-gcc/2.1                  intel/ipp/64/2018/4.274              nccl/1.3.4                             
cuda10.0/blas/10.0.130           dynet-py36-cuda10.1-gcc/2.1                  intel/itac/2017/8.034                nccl2-cuda10.1-gcc/2.5.6               
cuda10.0/fft/10.0.130            fastai-py36-cuda10.1-gcc/1.0.60              intel/itac/2018/4.025                nccl2/2.5.6                            
cuda10.0/nsight/10.0.130         fftw2/openmpi/gcc/64/double/2.1.5            intel/mkl/64(default)                netcdf/gcc/64/4.6.1                    
cuda10.0/profiler/10.0.130       fftw2/openmpi/gcc/64/float/2.1.5             intel/mkl/64/11.3.4/2016.4.258       netperf/2.7.0                          
cuda10.0/toolkit/10.0.130        fftw3/openmpi/gcc/64/3.3.8                   intel/mkl/64/2017/8.262              openblas/dynamic(default)              
cuda10.1/blas/10.1.243           gcc5/5.5.0                                   intel/mkl/64/2018/4.274              openblas/dynamic/0.2.20                
cuda10.1/fft/10.1.243            gcc8/8.2.0                                   intel/mkl/mic/11.3.4/2016.4.258      opencv3-py27-cuda10.1-gcc/3.4.8        
cuda10.1/nsight/10.1.243         gdb/8.2                                      intel/mkl/mic/2017/8.262             opencv3-py36-cuda10.1-gcc/3.4.8        
cuda10.1/profiler/10.1.243       globalarrays/openmpi/gcc/64/5.7              intel/mpi/32/2017/8.262              openmpi/cuda/64/3.1.4                  
cuda10.1/toolkit/10.1.243        hdf5/1.10.1                                  intel/mpi/32/2018/4.274              openmpi/gcc/64/1.10.7                  
cuda11.2/blas/11.2.0             hdf5_18/1.8.20                               intel/mpi/64(default)                pgi/64/19.4                            
cuda11.2/fft/11.2.0              horovod-mxnet-py27-cuda10.1-gcc/0.18.2       intel/mpi/64/5.1.3/2016.4.258        protobuf/3.7.1                         
cuda11.2/toolkit/11.2.0          horovod-mxnet-py36-cuda10.1-gcc/0.18.2       intel/mpi/64/2017/8.262              protobuf3-gcc/3.7.1                    
cuda80/blas/8.0.61               horovod-pytorch-py27-cuda10.1-gcc/0.18.2     intel/mpi/64/2018/4.274              protobuf3-gcc8/3.7.1                   
cuda80/fft/8.0.61                horovod-pytorch-py36-cuda10.1-gcc/0.18.2     intel/mpi/mic/5.1.3/2016.4.258       pytorch-py27-cuda10.1-gcc/1.3.1        
cuda80/nsight/8.0.61             horovod-tensorflow-py27-cuda10.1-gcc/0.18.2  intel/mpi/mic/2017/8.262             pytorch-py36-cuda10.1-gcc/1.3.1        
cuda80/profiler/8.0.61           horovod-tensorflow-py36-cuda10.1-gcc/0.18.2  intel/tbb/32/4.4.6/2016.4.258        pytorch/1.3.1                          
cuda80/toolkit/8.0.61            horovod/0.18.2                               intel/tbb/32/2017/8.262              scalapack/openmpi/gcc/64/2.0.2         
cuda90/blas/9.0.176              hpcx/2.4.0                                   intel/tbb/32/2018/4.274              tensorflow-py27-cuda10.1-gcc/1.14.0    
cuda90/fft/9.0.176               hpl/2.2                                      intel/tbb/64(default)                tensorflow-py36-cuda10.1-gcc/1.14.0    
cuda90/nsight/9.0.176            hwloc/1.11.11                                intel/tbb/64/4.4.6/2016.4.258        tensorflow2-py36-cuda10.1-gcc/2.0.0    
cuda90/profiler/9.0.176          intel-tbb-oss/ia32/2019_20191006oss          intel/tbb/64/2017/8.262              tensorrt-cuda10.1-gcc/6.0.1.5          
cuda90/toolkit/9.0.176           intel-tbb-oss/intel64/2019_20191006oss       intel/tbb/64/2018/4.274              theano-py27-cuda10.1-gcc/1.0.4         
cuda91/blas/9.1.85               intel/compiler/32/2017/17.0.8                intel/tbb/mic/4.4.6/2016.4.258       theano-py36-cuda10.1-gcc/1.0.4         
cuda91/fft/9.1.85                intel/compiler/32/2018/18.0.5                intel/tbb/mic/2017/8.262             theano/1.0.4                           
cuda91/nsight/9.1.85             intel/compiler/64(default)                   iozone/3_482                         xgboost-py36-cuda10.1-gcc/0.90         

$ 

```

## モジュールを利用する

### module load

何もしていない状態では CentOS7 付属の gcc version 4 系が使える状態になっています。

```
$ gcc --version
gcc (GCC) 4.8.5 20150623 (Red Hat 4.8.5-28)
Copyright (C) 2015 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

`module load`コマンドを使うことで、例えば gcc version 8 系に切り替えることが可能です。

```
$ module load gcc8

$ gcc --version
gcc (GCC) 8.2.0
Copyright (C) 2018 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

### module unload

`module unload`コマンドにより元の状態に戻すことができます。

```
$ module unload gcc8

$ gcc --version
gcc (GCC) 4.8.5 20150623 (Red Hat 4.8.5-28)
Copyright (C) 2015 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

$ 
```
