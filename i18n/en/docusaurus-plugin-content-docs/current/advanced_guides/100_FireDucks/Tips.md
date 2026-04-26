---
title: Tips
sidebar_position: 30
---

# Tips for using FireDucks

This document introduces tips for getting the best performance out of FireDucks.

## Avoiding fallback

For pandas APIs not yet supported by FireDucks, there is a mechanism called fallback that internally calls pandas to handle them. This mechanism makes FireDucks appear fully compatible with pandas from the user program's perspective, but it introduces data-conversion overhead when pandas is called internally. If you are not seeing the performance improvement you expected after switching to FireDucks, fallback is often the cause.

You can check whether fallback is occurring by running your program with the environment variable `FIREDUCKS_FLAGS="-Wfallback"` as shown below:

```python
$ FIREDUCKS_FLAGS="-Wfallback" python -mfireducks.pandas sample.py
sample.py:3: FallbackWarning: pandas.read_csv 0.006366 sec getobj 0.000001 getattr 0.000010 args 0.000020 call 0.005656 unsupported encoding: shift_jis
  df = pd.read_csv("test.csv", encoding="shift_jis")
```

In this example, fallback is triggered because FireDucks does not support `shift_jis` as a value for the `encoding` option of `read_csv`. The `0.006366 sec` portion of the warning message shows how long this fallback took, and the cause is displayed at the end of the line. In this case, you can avoid the fallback by converting the CSV file to a different encoding beforehand.

If a fallback is difficult to avoid and has a significant performance impact, please contact us and we will consider adding support in FireDucks.

## Avoid the apply method and for loops

Extracting and processing data row by row or element by element using the `apply` method or `for` loops on a DataFrame or Series introduces substantial overhead. Write your code using combinations of DataFrame and Series APIs wherever possible (this applies to pandas as well).

For example, the following loop processes a DataFrame one row at a time:

```python
s = 0
for i in range(len(df)):
    if df["A"][i] > 2:
        s += df["B"][i]
```

This can be rewritten using DataFrame APIs as follows:

```python
s = df[df["A"] > 2]["B"].sum()
```

## Avoid numpy-based acceleration

A common pandas optimization technique is to convert a DataFrame or Series to a numpy array and process it with numpy. However, since FireDucks targets pandas for acceleration, converting to numpy eliminates opportunities for FireDucks to improve performance. When using FireDucks, avoid numpy and write your code with pandas APIs to maximize performance gains.

## Final note

To fully leverage FireDucks, it is also important to identify which parts of your program use pandas and reduce the execution time of the non-pandas parts.

If you need advice on profiling execution time, reducing non-pandas bottlenecks, or modifying your program to get the most out of FireDucks, please feel free to contact us.
