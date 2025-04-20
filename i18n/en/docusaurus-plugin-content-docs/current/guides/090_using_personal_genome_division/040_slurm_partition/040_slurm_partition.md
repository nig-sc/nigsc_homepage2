---
id: slurm_partition
title: Configuration of Slurm Partitions
---

In the personal genome analysis section, for the computing nodes configuration applied for, a Slurm partition called Parabricks partition is set as the default partition, which includes all the computing nodes applied for.

#### Overview of Partition Settings (Especially when no specific settings are requested) {#overview-of-partition-settings}
| Partition Name | Nodes Included | Max Job Runtime | Max Available CPUs | Max Available Memory | Max Available GPUs |
|----------------|----------------|-----------------|--------------------|----------------------|--------------------|
| parabricks     | All applied computing nodes | Unlimited | Sum of CPU cores in the node | Sum of installed memory in the nodes | Sum of GPUs installed in the nodes |

- No individual limits or permissions are set for users.
- The `squeue` command is configured to display a list of all user jobs submitted to the partition. (This can be changed)

Please check the detailed settings provided by the application contact point upon completion of your application. If you desire a configuration other than the default, such as:

- The necessity for nodes for interactive (login) jobs, and the settings for Slurm's interactive partition accordingly
- Requests for additional partition settings besides the Parabricks partition (default)
- Requests for additional restriction settings on each partition
- Individual restrictions or permission settings for specific users (if necessary)

please specify and consult at the time of the new application. Detailed setting information will be notified after the completion of the application. Custom settings requests may take time until the completion of the application due to the complexity of the settings.

Upon completion, in addition to the provided information, please refer to the usage of commands to check the partition configuration with [other commands](/guides/software/JobScheduler/Slurm/other_commands#showpartitions), and check the actual settings of the partition after logging in.
