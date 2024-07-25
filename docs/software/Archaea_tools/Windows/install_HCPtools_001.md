---
id: install_HCPtools_001
title: "HCPtoolsのインストール(Windowsの場合)"
---

## インストーラの入手 {#get-the-installer}

以下のリンクからインストーラがダウンロード可能です。

- <a href="https://github.com/nig-sc/HCPtools/raw/main/1.3.0R-45/Windows/HCP_Tools_Client.msi">HCP_Tools_Client.msi</a>
- <a href="https://github.com/nig-sc/HCPtools/tree/main/1.3.0R-45/Windows">HCP_Tools_Client.md5sum</a>


過去のバージョンなどは<a href="https://github.com/nig-sc/HCPtools">こちらからダウンロード可能です。</a>



## HCP toolsクライアントソフトウェアのインストール {#install-hcptools}

`HCP_Tools_Client.msi`をダブルクリックします。

![](HCPtools_p1.png)


「使用許諾契約書に同意します(A)」にチェックを入れ、「インストール(I)」ボタンをクリックします。

![](HCPtools_1.png)

デバイスの変更許可に「はい」と応えると、インストールが開始します。

![](HCPtools_2.png)

インストールが完了すると、下記の画面が表示されるので、「完了」ボタンをクリックします。

![](HCPtools_p3.png)


インストール後、実行コマンドが`C:\Program Files`の下に、設定ファイルが`C:\ProgramData`の下に存在することを確認して下さい。

- 実行コマンド : 'C:\Program Files\Clealink\HCP Tools\hcp.exe'
- 設定ファイル: 'C:\ProgramData\Clealink\HCP Tools\hcp.conf'

## 設定ファイルの設置 {#locat-configfile}

HCP toolsは、ユーザのクライアント計算機がWindowsの場合、ユーザディレクトリ(`C:\Users\your_name`)直下の`_hcp`ディレクトリの中にある設定ファイルを参照します。

Windows PowerShellで以下のコマンドを実行すると、設定ファイルの雛形をコピーできます。

```bash
mkdir C:\Users\your_name\_hcp
cp "C:\ProgramData\Clealink\HCP Tools\*.conf" C:\Users\your_name\.hcp
```


## 設定ファイルの編集 {#edit-configfile}

HCP toolsの設定ファイルをユーザディレクトリに設置し、ユーザ認証のための公開鍵の設定を追記します。

手順については[設定ファイルの書き方](/software/Archaea_tools/hcptools_conf)を参照して下さい。

