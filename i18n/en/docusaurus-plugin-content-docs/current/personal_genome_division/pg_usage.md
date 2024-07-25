---
id: pg_usage
title: "Usage（The Personal Genome Analysis division）"
---


## Introduction

At present, all services of the personal genome analysis division are charged for and the nodes are rented.
Development and analysis work can be performed on the node as a normal Linux system.

Grid Engine or Slurm can be installed and delivered as a job scheduler for the node.


- For information on how to use the job scheduler Grid Engine, refer to [<u>System Configuration > Software > Grid Engine</u>](/software/grid_engine/).
- For information on how to use the job scheduler Slurm, refer to [<u>System configuration > Software > Slurm</u>](/software/slurm).
- For information on other available software, see [<u>System configuration > Software</u>](../software/software.md) for available software.
- You can get infotmation about specific analysis methods, etc. on the "[<u>Advances Guides</u>](/advanced_guides/advanced_guide_2023)" page.


## Security precautions

When you perform analysis with Python etc., repositories such as PyPI may contain malicious code.
In order to minimise the damage caused by this, it is recommended to use analysis programs via containers that run only with user permissions, such as the [<u>BioContainers Apptainer (Singularity) Images</u>](/software/BioContainers). 

References
- &#x1f517;<u>https://news.mynavi.jp/techplus/article/20230605-2695874/</u>
- &#x1f517;<u>https://www.reversinglabs.com/blog/when-python-bytecode-bites-back-who-checks-the-contents-of-compiled-python-files</u>


## How to use NVIDIA Parabricks {#usage-nvidia-parabrics}

Refer [<u>the page "How to use NVIDIA Clara Parabricks"</u>](/advanced_guides/parabricks/).
