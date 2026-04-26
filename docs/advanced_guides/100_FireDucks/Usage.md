---
sidebar_position: 20
---

# 利用方法

ここではプログラム中でのFireDucksの利用方法を説明します。明示的なimportとimport hookの二通りの利用方法があります。

## 明示的なimport

プログラム中のimport文を書き換える方法です。以下のように変更してください。

```
# import pandas as pd
import fireducks.pandas as pd
```

pdがFireDucksのpandas互換モジュール（fireducks.pandas）になりますので、プログラム中でpd経由でpandasを呼び出している部分が、FireDucksの呼び出しに変更されます。

また、例えばpandasをpdとしてimportし、fireducksをfdとしてimportして両者を比較することも可能です。

## import hook

プログラム中のpandasを自動的にFireDucksに変更する方法です。pythonコマンドのオプションもしくはJupyter Notebookのマジックコマンドを利用します。

### コマンドラインオプションの場合

```python
$ python -m fireducks.pandas your_program.py
```

プログラム中のimport文がフックされ、pandasのimportがFireDucksに置き換えられます。プログラムが複数のファイルからなり、複数のimport分がある場合は、書き換えが不要なこちらの方法が便利です。


### Jupyter Notebookの場合

```
%load_ext fireducks.pandas
import pandas as pd
```

マジックコマンド（`%load_ext`行）の実行後のpandasのimportがFireDucksに置き換えられます。典型的にはNotebookの最初のセルでこのマジックコマンドを実行します。

