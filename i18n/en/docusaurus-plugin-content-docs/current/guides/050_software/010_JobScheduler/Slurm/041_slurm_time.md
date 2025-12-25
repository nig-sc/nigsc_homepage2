---
id: slurm_time
title: Specifying Job Time in Slurm 
---


## Overview {#slurm-batch-time-overview}

In Slurm, you need to specify the job time limit yourself.

- If you do not specify the time limit, i.e., if you do not write `#SBATCH -t`, Slurm treats the default time limit as 3 days.
- The maximum value that can be specified with `-t` (i.e., the execution time limit per partition) is 124 days. Please note this is 124 days, not 124 hours.

For long-running computations, please specify the time limit when submitting the batch job.

For details on how to specify the time limit, please refer to [“Specifying Job Time in Slurm ” – “Details”](#slurm-batch-time-detail).


## Details {#slurm-batch-time-detail}

### 1. The time limit must be written in a fixed format {#slurm-time-format-rule}

In Slurm, you cannot write the time limit freely.

Only the following format is available:

```
days-hours:minutes:seconds
```

No other format exists.

### 2. Meaning of each part (order is fixed) {#slurm-time-format-parts}

```
days - hours : minutes : seconds
```

From left to right:

- days: how many days the job may run
- hours: how many hours
- minutes: how many minutes
- seconds: how many seconds


### 3. Only “days” can be omitted {#slurm-time-omit-days}

3.1 Full format example

```
#SBATCH -t 3-12:34:56
```

Meaning:

```
3 days + 12 hours + 34 minutes + 56 seconds
```

3.2 Example omitting “days”

```
#SBATCH -t 12:34:56
```

Meaning:

```
12 hours + 34 minutes + 56 seconds
```

This does not mean “12 minutes”.


### 4. How to convert commonly used durations directly {#slurm-time-examples}

4.1 10 minutes

Concept:

- days: 0
- hours: 0
- minutes: 10
- seconds: 0

Example:

```
#SBATCH -t 0-00:10:00
```

4.2 1 hour

- days: 0
- hours: 1
- minutes: 0
- seconds: 0

```
#SBATCH -t 0-01:00:00
```

4.3 3 days

- days: 3
- hours: 0
- minutes: 0
- seconds: 0

```
#SBATCH -t 3-00:00:00
```

4.4 1 week

1 week = 7 days

```
#SBATCH -t 7-00:00:00
```

4.5 3 months

Slurm does not understand “months”.

**Always convert to days.**

A safe beginner’s rule of thumb:

- 1 month = 30 days
- 3 months = 90 days

```
#SBATCH -t 90-00:00:00
```

### 5. Invalid examples (important) {#slurm-time-invalid}

5.1 Writing only minutes (invalid)

```
#SBATCH -t 10
```

❌ This will result in an error or be interpreted differently.

5.2 Writing “10:00” intending 10 minutes (actually 10 hours)

```
#SBATCH -t 10:00
```

❌ Slurm interprets this as:

```
10 hours + 0 minutes
```

5.3 Separating days and hours with colons (invalid)

```
#SBATCH -t 3:00:00:00
```

❌ This is not correct.

### 6. Copy-and-paste quick reference {#slurm-time-cheatsheet}

Purpose Time limit specification (Slurm)

| Purpose    | Time limit specification (Slurm) |
| ---------- | -------------------------------- |
| 10 minutes | `0-00:10:00`                     |
| 30 minutes | `0-00:30:00`                     |
| 1 hour     | `0-01:00:00`                     |
| 12 hours   | `0-12:00:00`                     |
| 1 day      | `1-00:00:00`                     |
| 3 days     | `3-00:00:00`                     |
| 1 week     | `7-00:00:00`                     |
| 3 months   | `90-00:00:00`                    |

