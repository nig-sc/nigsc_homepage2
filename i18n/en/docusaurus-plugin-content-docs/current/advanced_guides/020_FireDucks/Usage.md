---
sidebar_position: 20
---

# Usage

This section explains how to use FireDucks in your programs. There are two approaches: explicit import and import hook.

## Explicit import

This approach rewrites the import statement in your program. Change it as follows:

```
# import pandas as pd
import fireducks.pandas as pd
```

The variable `pd` will now refer to FireDucks' pandas-compatible module (`fireducks.pandas`), so any part of your program that calls pandas via `pd` will automatically use FireDucks instead.

You can also import pandas as `pd` and FireDucks as `fd` simultaneously to compare the two.

## Import hook

This approach automatically replaces pandas with FireDucks without modifying your program. Use either a Python command-line option or a Jupyter Notebook magic command.

### Command-line option

```python
$ python -m fireducks.pandas your_program.py
```

Import statements in your program are intercepted, and pandas imports are replaced with FireDucks. This approach is convenient when your program consists of multiple files with multiple import statements, as no rewriting is required.

### Jupyter Notebook

```
%load_ext fireducks.pandas
import pandas as pd
```

After running the magic command (the `%load_ext` line), subsequent pandas imports are replaced with FireDucks. Typically, run this magic command in the first cell of your notebook.
