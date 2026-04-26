---
title: Tips
sidebar_position: 30
---

# FireDucksに関するTIPS

本ドキュメントでは、FireDucksを利用して性能を出すためのTipsを紹介します。

## Fallbackの回避

現時点でFireDucksがサポートしていないpandas APIは、FireDucksの内部でpandasを呼び出して実行するfallbackという仕組みがあります。
この仕組みにより、ユーザープログラムから見るとFireDucksがそのAPIをサポートしているように見えるため、pandasとの互換性が高まります。
一方で、性能の観点ではpandasを呼び出すためのデータ変換のオーバヘッドがかかります。
FireDucksを用いた際に、思ったほど性能が上がらな場合はfallbackが原因であることが多くあります。

FireDucksの内部でfallbackが起こっているかどうかは、以下のように環境変数`FIREDUCKS_FLAGS="-Wfallback"`を指定して実行することで確認できます。

```python
$ FIREDUCKS_FLAGS="-Wfallback" python -mfireducks.pandas sample.py
sample.py:3: FallbackWarning: pandas.read_csv 0.006366 sec getobj 0.000001 getattr 0.000010 args 0.000020 call 0.005656 unsupported encoding: shift_jis
  df = pd.read_csv("test.csv", encoding="shift_jis")
```

この例では、`read_csv`メソッドの`encoding`オプションの値として`shift_jis`をFireDucksがサポートしていないためにfallbackが起こっています。Warningメッセージ中の`0.006366 sec`の部分がこのfallbackにかかった時間を示しており、この行の最後にfallbackが起こった原因が表示されています。 この例ではcsvファイルのエンコーディングを変えることなどで、このfallbackを回避することが可能です。

回避することが困難で性能への影響が大きい場合は、FireDucksでの対応を検討しますのでご相談下さい。

## applyメソッドやforループを避ける

DataFrameやSeriesからapplyメソッドやforループなどで、1行や1要素単位でデータを取り出しながら処理を行うと大きなオーバーヘッドが発生します。できる限りDataFrameやSeriesのAPIを組み合わせて記述して下さい（これはpandasでも同様です）。

例えば以下のループではDataFrameを一行ずつ処理しています。

```python
s = 0
for i in range(len(df)):
    if df["A"][i] > 2:
        s += df["B"][i]
```

これはDataFrameのAPIを用いると以下のように書き換えることができます。

```python
s = df[df["A"] > 2]["B"].sum()
```

## numpyを利用した高速化を避ける

pandasの高速化テクニックとして、pandasのDataFrameやSeriesをnumpyの配列に変換し、numpyで処理するという方法が取られることがあります。
FireDucksはpandasを高速化の対象としていますので、numpyに変換してしまうと、性能向上の機会を失ってしまうことになります。
FireDucksを利用する場合は、numpyの利用を避け、pandas APIで記述するほうが性能が向上しやすくなります。

## 最後に

FireDucksを用いて高速化するためには、プログラム中のpandasを利用している部分とそれ以外を切り分けて、pandas以外の部分の実行時間を削減することも重要です。

処理時間のプロファイリング、pandas以外の部分を削減するための検討、FireDucksの性能を引き出すためのプログラム変更など、高速化に関するご相談がございましたら、お気軽にご連絡下さい。
