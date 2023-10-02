---
id: 010_PubmedTable_230731_oo01
title: "発行済み査読付き論文の表の作成"
---


## 定義

1. 津村さんが作った Excel の表 を「論文一覧.xlsx」と呼ぶ。
2. 「論文一覧.xlsx」を UTF-8 テキスト形式にした表を 「paper_list.utf8.txt」 と呼ぶ。
3. 「paper_list.utf8.txt」 をソートした表を、「paper_list.sorted.txt」 と呼びましょう。
4. 「paper_list.sorted.txt」 の pubmed ID から生成した表を 「paper_pmid.txt」 と呼びましょう。
5. 「paper_list.sorted.txt」 から勝又さんの方で DOI をもとに pmid を追加した表を 「paper_list2.xslx」 と呼びましょう。
「paper_list2.xslx」 の行の並び順が、「paper_list.sorted.txt」 と変わってしまっているので、そうするとこれら二つを比較するのが面倒になるので、「paper_list.sorted.txt」 と同じ並び順で pubmed ID だけ埋めた表を作れませんか？
多分 「paper_list.sorted.txt」 の分類 2, 3 のところをひたすら pubmed で検索すれば（例えば DOI の文字列を pubmed の検索フォームに入れれば、論文が表示されるのでそこから pubmed ID をコピペしてくればいい。\
DOI がないなら、論文タイトルを pubmed の検索フォームに入れれば、論文が表示されるのでそこから pubmed ID をコピペしてくればいい。
まずそれをやったらよいと思います。



## 入力データを取得する

1. Excel からデータを TSV 形式で保存する(`paper_list.txt`)。

2. `paper_list.txt`を Linux の計算機に`scp`したものを、以下のコマンドを実行して、 UTF-8 に変換する(`paper_list.utf8.txt`)。

```
cat paper_list.txt | iconv -f SHIFT_JIS-2004 -t UTF-8 > paper_list.utf8.txt
```

上記のコマンドを実行したときに、以下のようなエラーが出た場合は、「iconvコマンドでエラーが出た場合の対応方法」を参照。

```
iconv: failed to start conversion processing: No such file or directory
```


## データをクオリティ順にソートする。

ユーザに手入力されたフィールドは間違いや表記ゆれを含んでいることが多いので、人手での確認作業の手間を減らすために以下の 3 種類にデータを分けて、1,2,3 の順に並べた表を作る。


1. Pubmed ID が書かれているデータ。(ここから最終の表を自動作成可能)
2. Pubmed ID はないが、DOI が書かれているデータ。
3. 上記以外

- 同一カテゴリ内のデータの並び順 : 同じ論文が違うユーザから複数登録されていた場合を確認できるようにするため以下のようにする。
    - 1.に関しては PubMed ID の順番にソートする。
    - 2.に関しては DOI の順にソートする。
    - 3.に関しては並び順は規定しない（どんな並び順でも良い）

この UTF-8 のファイルを以下のようにして処理する。

```
java -jar Utility-sc-fat.jar paper:sort --input paper_list.utf8.txt > paper.sorted.txt
```

## PubMed ID を持ったデータから、最終的な表を TSV 形式で自動生成する。


```
java -jar Utility-sc-fat.jar paper:pmid_table --input paper.sorted.txt > pmid_table.txt
```

あるいは、HTML 形式で出力する。

```
java -jar Utility-sc-fat.jar paper:pmid_table --format html --input paper.sorted.txt > pmid_table.html
```


## PubMed ID を持っていないデータについては、エディタを使って手作業で表にデータを埋める。


単に paper_list.sorted.txt を Excel に読み込んで、行の順番を変えずに (完璧には集まらないけど、情報が取れない、わからない論文が下の方に集まってくれるので、順番に意味がある。下の方にいくほど情報が少ない論文になっていく。)、 
1. DOI の文字列を pubmed の検索フォームに入れれば、論文が表示されるのでそこから pubmed ID をコピペしてくればいい。
2. DOI がないなら、論文タイトルを pubmed の検索フォームに入れれば、論文が表示されるのでそこから pubmed ID をコピペしてくればいい。
3. 無いものは Google で検索してみる。
4. それでも見当たらない論文は、本人にメールで連絡する。（その前に何件あるかを確認する。）

pubmed idが取れたら、それ以上の情報を頑張って取る必要はなく、プログラムで作業を行う。
