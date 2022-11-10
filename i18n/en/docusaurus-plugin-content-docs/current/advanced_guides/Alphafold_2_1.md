---
id: Alphafold_2_1
title: alphafold 2.1
---


## Introduction

The NIG supercomputer provides the singularity image with alphafold 2.1 installed (<a href="https://gist.github.com/YoshitakaMo/">patched</a> by Yoshitaka Moriwaki) and the database for <a href="https://github.com/deepmind/alphafold">alphafold 2.1</a> on /lustre7/software/alphafold/2.1.1/.

Protein structure prediction by alphafold 2.1 is performed in the following steps.

1. Input amino acid sequence search for uniref90 database by jackhmmer (using CPU)
2. Input amino acid sequence search for mgnify database by jackhmmer (using CPU)
3. Input amino acid sequences search for the pdb70 database (for monomers) or the pdb_seqres database (for multimers) by hhsearch (using CPU)
4. Input amino acid sequence search for bfd database and uniclust30 database by hhblits (using CPU)
5. Structure templates search from the pdb_mmcif database (using CPU)
6. Input amino acid sequence search for uniprot database (for multimers) by jackhmmer (using CPU)
7. Predict 3D structure by machine learning (using CPU or GPU)
8. Structure optimisation with OpenMM (using CPU or GPU)

If the input amino acid sequence is a multimer, steps 1-6 are executed for each amino acid sequence of the subunits that make up the multimer.

Steps 7 and 8 are executed five times because the default setting is to predict the structure of five models.  In addition, steps 7 and 8 can use GPUs in addition to CPUs, so singularity images for CPUs and GPUs are prepared respectively.

(Approximate execution time)



## Prepare input files

Prepare the amino acid sequence of the protein for which the 3D structure is to be predicted in fasta format in a single file. If the target protein is a multimer, enter the amino acid sequences of all its constituent subunits in a single file. If the same subunit is included multiple times, enter the amino acid sequences of the corresponding subunits for that number.

（the Input file sample）


## Prepare job scripts

There are sample job scripts on /lustre7/software/alphafold/. Download this to your own home directory and use it, modifying it accordingly.

### example_job_script_cpu.sh

Job scripts without GPU
```
#!/bin/sh
#$ -S /bin/sh
#$ -cwd
#$ -l s_vmem=160G
#$ -l mem_req=8G
#$ -pe def_slot 16

FASTAFILE="${HOME}/input/test.fasta"
OUTPUTDIR="${HOME}/output"
DATE="2021-11-12"
MODEL="monomer"

export OPENMM_CPU_THREADS=16

singularity exec \
-B /lustre7/software/alphafold/database:/data1/database \
/lustre7/software/alphafold/alphafold-2.1-CPU.sif \
/opt/alphafold/bin/alphafold \
--fasta_paths=${FASTAFILE} \
--output_dir=${OUTPUTDIR} \
--model_preset=${MODEL} \
--max_template_date=${DATE}
```


#### Modification place

```
#$ -pe def_slot 16
```

```
export OPENMM_CPU_THREADS=16
```

Enter the number of CPU cores to be used between 16 and 128. Enter the same number in both lines.

This value determines the number of CPU cores to use in step 8. The higher this value, the faster step 8 will be processed.

``` 
#$ -l s_vmem=160G
```
Enter a value of 2560G / def_slot.


```
#$ -l mem_req=8G
```
Enter a value of 128G / def_slot.


``` 
FASTAFILE="${HOME}/input/test.fasta"
```
Enter the path of the input file.


``` 
OUTPUTDIR="${HOME}/output"
```
Enter the path of the directory where the results will be output.

A directory will be created in this directory with the name of the input file name excluding the extension, and the results will be output. If a directory with the same name already exists and contains the calculation results, the search for similar sequences (steps 1-6) will not be performed and only the prediction part of the 3D structure (steps 7 and 8) will be recalculated.


```
DATE="2021-11-12"
```
Specify an upper limit for the release date of the PDB structural data used for 3D structure prediction. Structural data released later than this date will not be used.

```
MODEL="monomer"
```
According to the contents of the input file, enter monomer for monomeric protein structure prediction or multimer for multimeric protein structure prediction.


### example_job_script_gpu.sh

You can use this job script for using a GPU. Run the job with gpu.q.

```
#!/bin/sh
#$ -S /bin/sh
#$ -cwd
#$ -l gpu
#$ -l cuda=1
#$ -l s_vmem=320G
#$ -l mem_req=16G
#$ -pe def_slot 8

FASTAFILE="${HOME}/input/test.fasta"
OUTPUTDIR="${HOME}/output"
DATE="2021-11-12"
MODEL="monomer"

singularity exec \
--nv \
-B /lustre7/software/alphafold/database:/data1/database \
/lustre7/software/alphafold/alphafold-2.1-GPU.sif \
/opt/alphafold/bin/alphafold \
--fasta_paths=${FASTAFILE} \
--output_dir=${OUTPUTDIR} \
--model_preset=${MODEL} \
--max_template_date=${DATE}
```

#### Modification place

```
#$ -l cuda=1
```
Up to a protein size of about 1000 amino acid residues for structure prediction can be run with cuda=1. If an error occurs due to insufficient memory on the GPU, increase the number.
 
```
FASTAFILE="${HOME}/input/test.fasta"
```
Enter the path of the input file.


```
OUTPUTDIR="${HOME}/output"
```
Enter the path of the directory where the results will be output.

A directory will be created in this directory with the name of the input file name excluding the extension, and the results will be output. If a directory with the same name already exists and contains the calculation results, the search for similar sequences (steps 1-6) will not be performed and only the prediction part of the 3D structure (steps 7 and 8) will be recalculated.

 
```
DATE="2021-11-12"
```
Specify an upper limit for the release date of the PDB structural data used for 3D structure prediction. Structural data released later than this date will not be used.


```
MODEL="monomer"
```
According to the contents of the input file, enter monomer for monomeric protein structure prediction or multimer for multimeric protein structure prediction.


## Running a job

Submit the job script to the UGE using the qsub command.

```
$ qsub example_job_script_cpu.sh
```

```
$ qsub example_job_script_gpu.sh
```


## Output Example

the input file

[test.fasta](test.fasta)

output files

[ranking_debug.txt](ranking_debug.txt)← Output in JSON files

[ranked_4.pdb](ranked_4.pdb)


[ranked_3.pdb](ranked_3.pdb)


[ranked_2.pdb](ranked_2.pdb)


[ranked_1.pdb](ranked_1.pdb)


[ranked_0.pdb](ranked_0.pdb)

PDB entries for proteins of the input file and the same amino acid sequence (closely related species).

<a href="https://www.rcsb.org/structure/3AS4"></a>

<a href="https://www.rcsb.org/structure/3AS5"></a>
