---
id: faq_grid_engine
title: "FAQ (Grid Engine)"
---


## Is there anything I should be careful about when the job is re-run, e.g. due to a failure of the compute node?

When the job is re-run, then.

1. the standard output and standard error output of the job are appended to the file before re-run.
2. Depending on the submitted job, the existence of the file output in the first run may cause an error or make the second run inappropriate. If you are concerned that a problem may occur,  delete the intermediate and result files and resubmit the job.
3. if necessary, add a procedure in the job to prepare for re-run. For example, in the case of shell scripts, you can avoid problems by adding the following processing.


Example: for a job that outputs an intermediate file and uses it as input to output a result file)

```bash
#!/bin/sh
#$ -S /bin/sh
tmpfile=/home/user/tmpdir/tmpfile.txt　                        #Specify an intermediate file
outfile=/home/user/outdir/outfile.txt                                #Specify a result file

###追記内容##########################
if [ -ｆ ${tmpfile} ] ; then　　　　　　　　    　             #If an intermediate file exists, delet it
rm ${tmpfile}
fi
if [ -ｆ ${outfile} ] ; then　　　　　　　　　   　           #If a result file exists, delet it
rm ${outfile}
fi
#####################################
```


