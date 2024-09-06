---
id: software_update_frequency
title: Software Update Frequency
---


- For nodes under the shared job scheduler, software will be updated every year around May-June and during regular maintenance associated with legal power outages around November. In addition to updating the entire system by executing `apt upgrade`, etc. when updating, we will also update commercial packages and software that is not managed by `apt`. 
- For occupied nodes, it will be updated every year only during regular maintenance.
    - Software updates generally involve node shutdown and system updates, and all storage on the node is initialised when a system update is performed, so for occupied nodes it will be performed only during regular maintenance. If you would like to update around May-June separately, please let us know.
- Software that is updated rapidly, such as CUDA, can be irregularly updated.
- [BioContainers Apptainer (Singularity) Images](/software/BioContainers) is updated weekly.
