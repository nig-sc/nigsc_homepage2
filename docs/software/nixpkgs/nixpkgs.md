---
id: nixpkgs
title: nix の使い方
---

## <<このドキュメントは準備中です>>

NixOS は関数型パッケージマネージャ`nix`を使った Linux ディストリビューションである。

この`nix`コマンドは、NixOS 以外の、例えば CentOS や Ubuntu Linux といった Linux ディストリビューション上でも利用することができる。
その際に root 権限は必要なく、ユーザ権限だけでパッケージマネージャを使えるという特徴がある。
Nixpkgs は`nix`パッケージマネージャで管理されたパッケージコレクションのことである。


参考資料

- Nix Pills : https://nixos.org/guides/nix-pills/index.html
    - 開発者のブログ。Nixpkgs のチュートリアルとなっており最初にここを読むべき。
- Nixpkgs Manual : https://nixos.org/manual/nixpkgs/stable/#nixpkgs-manual
- NixOS Wiki : https://nixos.wiki/wiki/Main_Page
- NIX Usage : http://ciment.ujf-grenoble.fr/wiki/index.php/NIX_usage


## The Nix Package collection (Nixpkgs)

以下の URL でパッケージの検索ができる。

https://search.nixos.org/packages?channel=21.11&from=0&size=50&sort=relevance&type=packages

![](Screenshot_220410.png)

遺伝研スパコン(CentOS7)に`nix`を使ってパッケージをインストールする際のコマンドは"On non-NixOS"タブを選択すると表示される。（on NIxOS ではない事に注意）

## nix のインストール

遺伝研スパコンなど共用計算機にインストールするには以下の一行を実行すれば良い。(Single-user installation)

```
$ sh <(curl -L https://nixos.org/nix/install) --no-daemon
```


参考: https://nixos.org/download.html#nix-install-linux


## nix のアンインストール


1. `~/.profile`や`~/.bash_profile`の中の `$HOME/.nix-profile/etc/profile.d/nix.sh`と書かれた行を削除する。 
2. 次に以下のコマンドを実行する。

```
rm -rf $HOME/{.nix-channels,.nix-defexpr,.nix-profile,.config/nixpkgs}
```

参考: https://github.com/NixOS/nix/issues/1402
