---
id: BioContainers
title: "BioContainers Apptainer (Singularity) Images の使い方"
---

## 概要 {#introduce}


<table border="0">
<tr>
<td width="300">

![](biocontainers_top.png)

</td>
<td>
<h4>Biocontainers Singularity Images</h4>

遺伝研スパコンでは、解析ソフトウェアのインストールの手間を軽減するために、
BioContainers project が作成した Singularity コンテナイメージ(2 千種類を超える解析ソフトウェア、バージョンの違いを含め 9 万個を超える Singularity イメージファイル）を、遺伝研スパコンの`/usr/local/biotools/`ディレクトリ以下に配置してあります。

各ソフトウェアの内容、使い方の詳細については [BioContainers の公式サイト](https://biocontainers.pro)の[Registory](https://biocontainers.pro/registry )のページをご参照ください。

</td>
</tr>
</table>


## スパコン上に設置してある Apptainer (Sigularity) イメージを使う {#use-singularity-image-of-nig-supercom}
 

使用例は以下の通りです。
```
# コマンドが長くなるのを防ぐため alias を設定するとよい。
$ alias singR="singularity exec /usr/local/biotools/r/r-base:3.5.1 R"

$ singR --no-save < example.R
> attach(mtcars)
> plot(wt, mpg)
> abline(lm(mpg~wt))
> title("Regression of MPG on Weight")
>

```

（引用）上記コード例は以下のサイトを参考にしました。

[R Tutorial For Beginners](https://www.statmethods.net/r-tutorial/index.html)

実行結果(Rplots.pdf)は以下の通りです。

![figure](singurarity.PNG)


