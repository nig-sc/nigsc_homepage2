---
id: intel_compiler_NumCalc
title: "数値計算"
---


## Intel oneMKL （マス・カーネル・ライブラリ） {#intel_one-math-kernel-lib}

遺伝研スパコンでは、Intel Math Kernel Libraryを利用可能です。MKLでは線形代数、高速フーリエ変換、ベクトル演算などの数学処理ルーチンを高速化します。

- BLASとLAPACKの密線形代数ルーチン
- スパースBLAS疎線形代数ルーチン
- 乱数生成器
- ベクトル演算用に最適化されたベクトル数学ルーチン
- 高速フーリエ変換(FFT)

```
/lustre7/software/intel_ubuntu/oneapi/mkl/2023.2.0/lib/intel64
```

以下のサイトをご参照ください。

- [販売元のドキュメントサイト](https://www.xlsoft.com/jp/products/intel/perflib/mkl/index.html)
- [Intelの製品情報サイト](https://www.intel.com/content/www/us/en/developer/tools/oneapi/onemkl.html#gs.545toc)
- [Intelのデベロッパーズガイド](https://jp.xlsoft.com/documents/intel/mkl/2024/onemkl-developerguide-linux.pdf)

- [コミュニティサポートのフォーラムサイト](https://community.intel.com/t5/Intel-oneAPI-Math-Kernel-Library/bd-p/oneapi-math-kernel-library)

MKLを利用する場合のリンクオプションの指定の仕方については、以下の Link Line Advisorを利用してみてください。

[Intel oneAPI Math Kernel Library Link Line Advisor](https://www.intel.com/content/www/us/en/developer/tools/oneapi/onemkl-link-line-advisor.html#gs.4cdbls)


## Intel IPP(インテグレーテッド・パフォーマンス・プリミティブ) {#intel_ipp}

画像処理ライブラリです。画像処理、信号処理、データ圧縮、暗号化処理等の各関数ライブラリです。

- [販売元の製品ページ](https://www.xlsoft.com/jp/products/intel/perflib/ipp/index.html)
- [デベロッパーズガイド(英語)](https://jp.xlsoft.com/documents/intel/ipp/2021/intel-ipp-developer-guide-reference.pdf)

遺伝研スパコンでは以下のディレクトリがLD_LIBRARY_PATHに含まれているかを確認してください。
```
/lustre7/software/intel_ubuntu/oneapi/ipp/2021.9.0/lib/intel6
```

