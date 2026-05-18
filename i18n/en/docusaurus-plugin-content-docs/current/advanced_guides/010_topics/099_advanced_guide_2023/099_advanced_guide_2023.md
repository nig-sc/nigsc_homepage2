---
id: advanced_guide_2023
title: "Topics in 2023"
---

---
## The omics data graphing tool RIAS®️ Visualization is now available. {#rias_omics_viz_available}

:::danger

This service ended on 31 October 2025 (Friday).

For more information, please refer to the information below.
- [" Notice of Discontinuation of Rhelixa Graphing Tool (RIAS Visualisation) by October 2025 "](/blog/2025-09-29-news_Rhelixa-rias-visualisation-end-october-2025)

:::

26 Oct 2023.

An omics data graphing tool Visualization has been provided by Rhelixa Corporation (CTO: Ryu Nakaki), which has a comprehensive collaboration agreement with the National Institute of Genetics, and is available for free trial for NIG supercomputer users.


### Overview of Visualization


By using Visualization, omics data such as RNA-seq data can be easily graphed without complicated settings or programming. In addition to grasping the overall trend of the data, you can also visualise signal trends focusing on specific factors (e.g. genes).

You can freely use the created graphs in your papers and research publications.

There are 15 types of graphs that can be created, as follows:
- Violin Plot 
- Box Plot
- Heatmap
- Complex Heatmap
- Venn Diagram 
- 2D PCA Scatter Plot
- 3D PCA Scatter Plot
- Hierarchical Clustering
- Linear Regression
- Rotatable Scatter Plot
- Correlation Matrix
- Volcano Plot
- MA Plot
- Chord Diagram
- Network Analysis


### How to use

Select "Rhelixa Graphing Tool" from the menu on the left side of "Advances Guides".


---

## Reanalysis dataset of public data of human whole genome analysis {#reanalysis_human_wga_public}

5 Jun 2023.

We will share Reanalysed human whole genome analysis data that have been published in public databases as open access data on the NIG supercomputer.

These data were downloaded from public databases for analysis in the Ministry of Education, Culture, Sports, Science and Technology-JAPAN(MEXT)'s Grant-in-Aid for Scientific Research on Innovative Areas "Elucidation of the origin and establishment of the Yaponesians using genome sequences as a core" (Yaponesians genome) and re-analysed on the NIG supercomputer.
These data will be stored as shared data for the users of the NIG supercomputer so that they can be widely used for research after the research group finishes (from April 2023).

All data are all open access registered with SRA. 
For sample background and conditions of use, refer to the original papers and use at user's own risk.

We share files in CRAM format mapped to GRCh38 and files in gVCF format analysed with the GATK4 or Parabricks HaplotypeCaller algorithm.

You can get a pipeline with equivalent analysis content at https://github.com/NCGM-genome/WGSpipeline

Also, you can get the dataset from the NIG supercomputer in the following way.

 - For all compute nodes in the general analysis division, the datasets are mounted under `/usr/local/shared_data/public-human-genomes/GRCh38/` and can be accessed and used directly from the analysis programmes in the NIG supercomputer .
    - The personal genome analysis division is currently being prepared.
- HTTPS: https://ddbj.nig.ac.jp/public/public-human-genomes/GRCh38/ 
- FTP: ftp.ddbj.nig.ac.jp/public-human-genomes/GRCh38

<table>
<tr>
<td>DATASET</td>
<td>DATA SOURCE</td>
<td>URL</td>
</tr>
<tr>
<td>International 1000Genomes Project</td>
<td>https://www.ebi.ac.uk/ena/browser/view/PRJEB31736</td>
<td>https://doi.org/10.1016/j.cell.2022.08.004</td>
</tr>
<tr>
<td>Human Genome Diversity Project</td>
<td>https://www.ebi.ac.uk/ena/browser/view/PRJEB6463</td>
<td>https://doi.org/10.1126/science.aay5012</td>
</tr>
<tr>
<td>Simons Genome Diversity Project</td>
<td>https://www.ebi.ac.uk/ena/browser/view/PRJEB9586</td>
<td>https://doi.org/10.1038/nature18964</td>
</tr>
<tr>
<td>Korean Personal Genomics Project</td>
<td>https://www.ebi.ac.uk/ena/browser/view/PRJNA284338</td>
<td>https://doi.org/10.1038/s41598-018-23837-x</td>
</tr>
</table>


---

## Archaea tools(formerly HCPtools)

10 Jan 2023.

In October 2022, the HCPtools software provider launched the brand name 'Bytix' as a brand name for data transfer systems and the product name was changed from 'HCPtools' to 'Archaea tools'.

For more information on the change, [&#x1f517;refer to the Bytix official page 'Product name change etc.'](https://support.bytix.tech/important/)

After the product name change, you can still use the same commands that you have been using for HCPtools.

In addition to Windows and Linux, also available for macOS. If you would like to know more, [&#x1f517;refer to the Bytix official page 'Supported Platforms'](https://support.bytix.tech/docs/archaea/tools/1.4_en/A_overview/A09_platforms).


For information on how to use Archaea tools (formerly HCPtools), [&#x1f517;see the official Bytix page 'Documents'](https://support.bytix.tech/document/).


<table>
<tr>
<td width="400">

![](Archaea_tools_document.png)
</td>
<td valign="top">
When you transfer files to and from the NIG supercomputer, you can use `scp` or `sftp`, which are widely used as the file transfer software. But their transfer speed is slow when a large numbers of files are transfered over long distances.

For high-speed file transfer over long distances, the file transfer software Aspera is available on the general analysis division, and Archaea tools(formerly HCPtools) is available on the personal genome analysis division on the NIG supercomputer.

</td>
</tr>
</table>
