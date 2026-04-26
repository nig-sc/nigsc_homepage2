---
sidebar_position: 10
---

# インストール方法（利用許諾書に同意が必要）

**注意: インストールしますと[利用許諾書](./FireDucks_EULA_nigsc.pdf)に同意したものとみなされます．ご確認の上インストールを行ってください。**


遺伝研スーパーコンピュータシステムでは、以下の共有フォルダにFireDucksをインストールするためのwheelファイルが置かれています。

```
/foo/bar/fireducks-enterprise-2026.03.0
```

pipコマンドでこのフォルダを指定してPython仮想環境にインストールして下さい。


```
$ pip install -f /foo/bar/fireducks-enterprise-2026.03.0 fireducks-enterprise
```

本コマンドの最後のパッケージ名は`fireducks-enterprise`としてください。`fireducks`とするとコミュニティ版がインストールされますのでご注意ください。

