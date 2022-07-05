---
id: install_spack
title: Installing spack
---

Spack is a package manager available with user permission.

For example, spack allows installation and using various packages with the specification version by executing the simple command as follows.

```
spack install r@4.0.5
spack load r@4.0.5
```

References

- [Spack Official Web Site](https://spack.readthedocs.io/en/latest/#)
- [Spack github repository](https://github.com/spack/spack)
- [Spack packages](https://spack.readthedocs.io/en/latest/package_list.html) (search site for packages available in spack)


## spack installation procedure Overview

The procedure for installing spack

1. Get the spack system
2. Set up the environment variables
3. Prepare the C compiler to be used

Now ready to use spack.


## 1. Get the spack system

At first, clone the spack system from the github repository to user's home directory using this command.

```
cd $HOME
git clone -c feature.manyFiles=true https://github.com/spack/spack.git
```
This will create a directory called `spack` on the home directory.


## 2. Set up the environment variables

Executing the following command will set up the environment variables. (Add it to `~ / .bashrc` so that it will be called automatically the next time you login.)

```
export SPACK_ROOT=/home/your_account/spack
source $SPACK_ROOT/share/spack/setup-env.sh
```

## 3. Prepare the C compiler to be used

Spack is installed by compiling the package from the source code.
The compiler to be used must be registered in spack before installing.

Process

- i) Make spack aware of the compiler installed on the supercomputer in advance.
- ii) Install the compiler (gcc is good) that will be used by default in the future using the compiler that already exists in the supercomputer.
- iii) Register the compiler to be used by default in spack in the future.


### i) Make spack aware of the compiler installed on the supercomputer in advance.

By executing the following command, spack will search for compilers that is pre-installed on the supercomputer.

```
spack compiler find
```

This will create a `$ HOME / .spack / linux / compilers.yaml` file and the recognized information will be stored.

However, when these compilers are used directly, you will often get errors by `spack install package name` when installing the package. 
Follow the processes ii) and iii) below. 

### ii) Install the compiler (gcc is good) that will be used by default in the future using the compiler that already exists in the supercomputer.

For example, by executing the following command, install the compiler that will be used mainly in the future with spack using the compiler that already exists in the supercomputer.

```
spack install -j 4 gcc@8.5.0
spack load gcc@8.5.0
```

`-j 4` specifies the number of parallel processes of make to speed up compilation.





### iii) Register the compiler to be used by default in spack in the future.

You need to edit the configuration file of the compiler installed in ii) and register it in spack. 

Edit `$HOME/.spack/linux/compilers.yaml`

Add the `- compiler: ` item as follows and register the compiler that you just installed (`gcc@8.5.0` in the current example) to spack.


- Here, the path described in `cc:`, `cxx:`, `f77:`, `fc:` describes the output result of `which gcc`,` which g ++ `,` which gfortran`.
- indentation should be written with space characters, not tab characters because it is in YAML format, .


```yaml
compilers:
- compiler:
    spec: gcc@8.5.0
    paths:
      cc: /lustre7/home/lustre4/youraccount/spack/opt/spack/linux-centos7-x86_64_v3/gcc-4.8.5/gcc-8.5.0-a4dcd4j7uq23aax4n6ri6amzt7hp4lxc/bin/gcc
      cxx: /lustre7/home/lustre4/youraccount/spack/opt/spack/linux-centos7-x86_64_v3/gcc-4.8.5/gcc-8.5.0-a4dcd4j7uq23aax4n6ri6amzt7hp4lxc/bin/g++
      f77: /lustre7/home/lustre4/youraccount/spack/opt/spack/linux-centos7-x86_64_v3/gcc-4.8.5/gcc-8.5.0-a4dcd4j7uq23aax4n6ri6amzt7hp4lxc/bin/gfortran
      fc: /lustre7/home/lustre4/youraccount/spack/opt/spack/linux-centos7-x86_64_v3/gcc-4.8.5/gcc-8.5.0-a4dcd4j7uq23aax4n6ri6amzt7hp4lxc/bin/gfortran
    flags: {}
    operating_system: centos7
    target: x86_64
    modules: []
    environment: {}
    extra_rpaths: []
- compiler:
    spec: dpcpp@2021.4.0
    paths:
      cc: /lustre7/software/intel/oneapi/compiler/2021.4.0/linux/bin/icx
      cxx: /lustre7/software/intel/oneapi/compiler/2021.4.0/linux/bin/dpcpp
      f77: /lustre7/software/intel/oneapi/compiler/2021.4.0/linux/bin/ifx
      fc: /lustre7/software/intel/oneapi/compiler/2021.4.0/linux/bin/ifx
    flags: {}
    operating_system: centos7
    target: x86_64
    modules: []
    environment: {}
    extra_rpaths: []
- compiler:
    spec: gcc@4.8.5
    paths:
      cc: /usr/bin/gcc
      cxx: /usr/bin/g++
      f77: /usr/bin/gfortran
      fc: /usr/bin/gfortran
    flags: {}
    operating_system: centos7
    target: x86_64
    modules: []
    environment: {}
    extra_rpaths: []

... (以下略)
```



Creat the `$HOME/.spack/packages.yaml` file

Creat the `$HOME/.spack/packages.yaml` file with the following contents.

```yaml
packages:
  all:
    compiler: [gcc@8.5.0]
```

Now ready to use spack.

## Uninstalling spack

To uninstall spack, execute this command line.

```
spack uninstall --all
```

