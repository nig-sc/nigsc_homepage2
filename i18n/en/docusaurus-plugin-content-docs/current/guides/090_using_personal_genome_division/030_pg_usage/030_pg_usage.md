---
id: pg_usage
title: "Usage（The Personal Genome Analysis division）"
---


## Introduction

At present, all services of the personal genome analysis division are charged for and the nodes are rented.
Development and analysis work can be performed on the node as a normal Linux system.

Grid Engine or Slurm can be installed and delivered as a job scheduler for the node.


- For information on how to use the job scheduler Grid Engine, refer to [System Configuration > Software > JobScheduler > Grid Engine Overview](/guides/old_docs/software/JobScheduler/grid_engine).
- For information on how to use the job scheduler Slurm, refer to [System configuration > Software > JobScheduler > Overview of Slurm](/guides/software/JobScheduler/Slurm).
- For information on other available software, see [System Architecture > Software](/guides/software) for available software.
- You can get infotmation about specific analysis methods, etc. on the "[Advances Guides](/advanced_guides/topics/advanced_guide_2020-2022)" page.


## Security precautions

When you perform analysis with Python etc., repositories such as PyPI may contain malicious code.
In order to minimise the damage caused by this, it is recommended to use analysis programs via containers that run only with user permissions, such as the [BioContainers Apptainer (Singularity) Images](/guides/software/Container/BioContainers). 

References
- &#x1f517;https://news.mynavi.jp/techplus/article/20230605-2695874/
- &#x1f517;https://www.reversinglabs.com/blog/when-python-bytecode-bites-back-who-checks-the-contents-of-compiled-python-files


## How to use NVIDIA Parabricks {#usage-nvidia-parabrics}

Refer [the page "How to use NVIDIA Clara Parabricks"](/advanced_guides/parabricks/).
