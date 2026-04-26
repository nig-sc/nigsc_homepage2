---
id: Alphafold_2_3
title: alphafold 2.3
---


## Introduction

The NIG supercomputer provides the apptainer singularity image with alphafold 2.3.2 installed and the database for [alphafold 2.3.2](https://github.com/deepmind/alphafold) on /lustre10/software/alphafold/2.3.2/.

Protein structure prediction by alphafold 2.3 is performed in the following steps.

1. Input amino acid sequence search for uniref90 database by jackhmmer (using CPU)
2. Input amino acid sequence search for mgnify database by jackhmmer (using CPU)
3. Input amino acid sequences search for the pdb70 database (for monomers) or the pdb_seqres database (for multimers) by hhsearch (using CPU)
4. Input amino acid sequence search for bfd database and uniref30 database by hhblits (using CPU)
5. Structure templates search from the pdb_mmcif database (using CPU)
6. Input amino acid sequence search for uniprot database (for multimers) by jackhmmer (using CPU)
7. Predict 3D structure by machine learning (using CPU or GPU)
8. Structure optimisation with OpenMM (using CPU or GPU)

If the input amino acid sequence is a multimer, steps 1-6 are executed for each amino acid sequence of the subunits that make up the multimer.

Steps 7 and 8 are executed five times because the default setting is to predict the structure of five models.  In addition, steps 7 and 8 can use GPUs in addition to CPUs, so singularity images for CPUs and GPUs are prepared respectively.

And, from 2.2, the structure prediction for complexes is set to 5 structure predictions per sequence by default, so a total of 25 predicted structures are output for sequences of up to 5 subunits.
 
### Approximate execution time

- Step 1: 10 min
- Step 2: 20 min
- Step 3: 5 min
- Step 4: 6 hour
- Step 5: 1 min
- Step 6: 15 min
- Step 7: 2 hour with 200aa（using 64CPU core）, 2 min with 200aa, 20 min with 900aa（using GPU）
- Step 8: 1 min with 200aa（using 64CPU core）, 0.3 min with 200aa, 3 min with 900aa（using GPU）


## Prepare input files

Prepare the amino acid sequence of the protein for which the 3D structure is to be predicted in fasta format in a single file. If the target protein is a multimer, enter the amino acid sequences of all its constituent subunits in a single file. If the same subunit is included multiple times, enter the amino acid sequences of the corresponding subunits for that number.

The fasta file below is an example of an EcoRI homodimer.

```
>EcoRI
SNKKQSNRLTEQHKLSQGVIGIFGDYAKAHDLAVGEVSKLVKKALSNEYPQLSFRYRDSIKKTEINEALK
KIDPDLGGTLFVSNSSIKPDGGIVEVKDDYGEWRVVLVAEAKHQGKDIINIRNGLLVGKRGDQDLMAAGN
AIERSHKNISEIANFMLSESHFPYVLFLEGSNFLTENISITRPDGRVVNLEYNSGILNRLDRLTAANYGM
PINSNLCINKFVNHKDKSIMLQAASIYTQGDGREWDSKIMFEIMFDISTTSLRVLGRDLFEQLTSK
>EcoRI
SNKKQSNRLTEQHKLSQGVIGIFGDYAKAHDLAVGEVSKLVKKALSNEYPQLSFRYRDSIKKTEINEALK
KIDPDLGGTLFVSNSSIKPDGGIVEVKDDYGEWRVVLVAEAKHQGKDIINIRNGLLVGKRGDQDLMAAGN
AIERSHKNISEIANFMLSESHFPYVLFLEGSNFLTENISITRPDGRVVNLEYNSGILNRLDRLTAANYGM
PINSNLCINKFVNHKDKSIMLQAASIYTQGDGREWDSKIMFEIMFDISTTSLRVLGRDLFEQLTSK
```


## Prepare job scripts

There are sample job scripts on /lustre10/software/alphafold/2.3.2/. Download this to your own home directory and use it, modifying it accordingly.


### example_job_script_cpu.sh

Job scripts without GPU
```
#!/bin/bash
#SBATCH -p rome
#SBATCH --mem-per-cpu=8g
#SBATCH -c 16

FASTAFILE="${HOME}/input/test.fasta"
OUTPUTDIR="${HOME}/output"
DATE="2099-12-31"
MODEL="monomer"
PRED=5
VERSION="2.3.2"
RELAX_MODE="all"    # all, best or none

export OPENMM_CPU_THREADS=16
export XLA_FLAGS="--xla_cpu_multi_thread_eigen=false intra_op_parallelism_threads=16"

singularity exec \
-B /lustre10/software/alphafold/database:/lustre7/software/alphafold/database \
-B /lustre10/software/alphafold/${VERSION}/database:/data1/database \
/lustre10/software/alphafold/${VERSION}/alphafold-${VERSION}-CPU.sif \
/opt/alphafold/bin/alphafold \
--fasta_paths=${FASTAFILE} \
--output_dir=${OUTPUTDIR} \
--model_preset=${MODEL} \
--max_template_date=${DATE} \
--use_gpu_relax=false \
--num_multimer_predictions_per_model=${PRED} \
--models_to_relax=${RELAX_MODE}
```

#### Correction point

```
#SBATCH -p rome
```

Specify the Slurm partition to use. Please choose either 'rome' or 'epyc'."

```
#SBATCH -c 16
```

```
export OPENMM_CPU_THREADS=16
```

```
export XLA_FLAGS="--xla_cpu_multi_thread_eigen=false intra_op_parallelism_threads=16"
```
Enter the number of CPU cores to be used between 16 and 128. Enter the same number in both lines.

This value determines the number of CPU cores to use in step 8. The higher this value, the faster step 8 will be processed.


```
#SBATCH --mem-per-cpu=8g
```

Please enter `128g / < -c value >`.

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
DATE="2099-12-31"
```
Specify an upper limit for the release date of the PDB structural data used for 3D structure prediction. Structural data released later than this date will not be used.


```
MODEL="monomer"
```
According to the contents of the input file, enter monomer for monomeric protein structure prediction or multimer for multimeric protein structure prediction.

```
PRED=5
```

When MODEL="multimer" is specified, this specifies the number of prediction structures to be output for a single array. The default value is 5, which outputs a total of 25 predictions for an array of up to 5 subunits. This value is ignored when MODEL="monomer" is specified.


```
RELAX_MODE="all"
```

If RELAX_MODE="all" is specified, the relaxation step is executed for all predictive models. If RELAX_MODE="best" is specified, only the model with the best pLDDT value will be executed for the relaxation step.

### example_job_script_gpu.sh

Currently, there are no nodes available for GPU usage in the general analysis division. [AlphaFold3](/advanced_guides/AlphaFold/Alphafold_3_0_1) is set up in the personal genome analysis division, where GPUs are available.
