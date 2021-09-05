---
id: hardware
title: "ハードウェア"
---

## システム全体
<table>
<tbody>
<tr>
    <th colspan="3">機器分類</th>
    <th>機器諸元</th>
</tr>
<tr>
    <td rowspan="6">
    計算ノード
    <br /><br/><br/><br />
	総CPUコア数: 15,424<br />
	合計演算性能 933.560 TFLOPS<br />
	(CPU: 434.360 TFLOPS, GPU: 499.2 TFLOPS)<br />
	総メモリ容量 153.088 TB
    </td>	
	<td rowspan="4">
    Thin計算ノード
    </td>
    <td>
    Type 1a<br />
	CPUにAMD EPYC 7501を搭載<br />
    </td>
    <td>
    ノード数: 136台<br />
	総CPUコア数: 8,704<br />
	合計演算性能: 139.264 TFLOPS<br />
	総メモリ容量 69.632 TB（コアあたり8GB）<br/>
    </td>
</tr>
<tr>
    <td>
    Type 1b<br />
	CPUにAMD EPYC 7702を搭載（2020年4月増設
    </td>
	<td>
    ノード数: 28台<br />
	総CPUコア数: 3,584<br />
	合計演算性能: 57.344 TFLOPS<br />
	総メモリ容量 14.336 TB（コアあた4GB)
    </td>
</tr>
<tr>
    <td>
    Type 2a<br />
	CPUにIntel Xeonを搭載
    </td>
    <td>
    ノード数: 52台<br />
	総CPUコア数: 1,664<br />
	合計演算性能 111.800 TFLOPS<br />
	総メモリ容量 19.968 TB (コアあたり12GB)
    </td>
</tr>
<tr>
    <td>
    Type 2b<br />
	GPGPU搭載
    </td>
	<td>ノード数: 16台<br />
	総CPUコア数: 384<br />
	合計演算性能: 536.064 TFLOPS<br />
	(CPU: 36.864 TFLOPS, GPU: 499.2 TFLOPS)<br />
	総メモリ容量 6.144 TB (コアあたり16GB)
    </td>
</tr>
<tr>
    <td colspan="2">
    Medium計算ノード<br />
	3TBの共有メモリ搭載
    </td>
	<td>
    ノード数: 10台<br />
	総CPUコア数: 800<br />
	合計演算性能 61.440 TFLOPS<br />
	総メモリ容量 30.72 TB (コアあたり 38.4GB)
    </td>
</tr>
    <tr>
	<td colspan="2">Fat計算ノード<br />
	2ノードを接続し12TBの共有メモリを構成</td>
	<td>ノード数 2台<br />
	総CPUコア数: 288<br />
	合計演算性能 27.648 TFLOPS<br />
	総メモリ容量 12.288 TB (コアあたり42.7GB)
    </td>
</tr>
<tr>
    <td rowspan="2">
    ストレージ
    <br /><br />
    総ストレージ容量 43.8PB
    </td>
	<td colspan="2">
    大容量高速ストレージ<br />
	解析用ストレージ領域(※1)
    </td>
	<td>Lustreファイルシステム<br />
	合計容量：16.8PB</td>
</tr>
<tr>
    <td colspan="2">
    大容量アーカイブストレージ<br />
	DB用ストレージ領域(※2)
    </td>
	<td>SpectrumScaleファイルシステム+テープ<br />
	合計容量：30PB (15PBディスク、15PBテープの階層ストレージ)
    </td>
</tr>
<tr>
			<td colspan="3">ノード間相互結合網</td>
			<td>
            InfiniBand 4×EDR 100Gbps fat tree<br />
            (ストレージに対してはfull bi-section、
            計算ノードに対しては、上流SWへの接続帯域：下流SWへの接続帯域 = 1:4)
            </td>
		</tr>
	</tbody>
</table>

- ※1. 解析用ストレージ領域：一般解析区画および個人ゲノム解析区画におけるユーザホーム領域
- ※2. DB用ストレージ領域：DRA等のDDBJデータベースを格納している領域。データベースは一般解析区画から参照可能。


## 計算ノード

### Thin計算ノード Type 1a (HPE ProLiant DL385 Gen10; 136台)

CPUとしてAMD EPYC 7501プロセッサを搭載した計算ノードです。

![](Thin1a.png)
<br />

HPE ProLiant DL385 Gen10
(ホスト名: at001 -- at136)
	

| 構成要素 | 型番                                              | 員数 | ノードあたりの性能など         |
|----------|---------------------------------------------------|------|--------------------------------|
| CPU      | AMD EPYC 7501 (32 cores)  Base 2.0GHz, Max 3.0GHz |    2 | 合計64コア                     |
| Memory   | 32GB DDR4-2666                                    |   16 | 合計 512GB (CPUコアあたり 8GB) |
| Storage  | 1.6TB NVMe SSD x1, 3.2TB NVMe SSDx1               |      |                                |
| Network  | InfiniBand 4xEDR                                  |    1 | 100Gbps                        |


 
### Thin計算ノード Type 1b (DELL PowerEdge R6525; 28台)

CPUとしてAMD EPYC 7702プロセッサを搭載した計算ノードです。

![](Thin1b.png)


DELL PowerEdge R6525
(ホスト名: at137 -- at164)

| 構成要素 | 型番                                               | 員数 | ノードあたりの性能など         |
|----------|----------------------------------------------------|------|--------------------------------|
| CPU      | AMD EPYC 7702 (64 cores)  Base 2.0GHz, Max 3.35GHz |    2 | 合計 128コア                   |
| Memory   | 32GB DDR4-2666                                     |   16 | 合計 512GB (CPUコアあたり 4GB) |
| Storage  | 1.6TB NVMe SSD x1, 900GB SAS HDDx1                 |      |                                |
| Network  | InfiniBand 4xEDR                                   |    1 | 100Gbps                        |

 
### Thin計算ノード Type 2a (HPE Apollo 2000 Gen10; 52台)

CPUとしてIntel Xeonプロセッサを搭載した計算ノードです。

![](Thin2a.png)


HPE Apollo 2000 Gen10
(ホスト名: it001 -- it052)


| 構成要素 | 型番                                                    | 員数 | ノードあたりの性能など          |
|----------|---------------------------------------------------------|------|---------------------------------|
| CPU      | Intel Xeon Gold 6130 (16 cores) Base 2.1GHz, Max 3.7GHz |    2 | 合計 32コア                     |
| Memory   | 32GB DDR4-2666                                          |   12 | 合計 386GB (CPUコアあたり 12GB) |
| Storage  | 1.6TB NVMe SSD x1, 3.2TB NVMe SSDx1                     |      |                                 |
| Network  | InfiniBand 4xEDR                                        |    1 | 100Gbps                         |


 
### Thin計算ノード Type 2b (HPE Apollo 6500 Gen10; 16台)

NVIDIA Tesla V100 GPUを各ノードに4基搭載した計算ノードです。

![](Thin2b.png)

HPE Apollo 6500 Gen10
(ホスト名: igt001 -- igt016)
	

| 構成要素 | 型番                                                    | 員数 | ノードあたりの性能など          |
|----------|---------------------------------------------------------|------|---------------------------------|
| CPU      | Intel Xeon Gold 6136 (12 cores) Base 3.0GHz, Max 3.7GHz |    2 | 合計 24コア                     |
| Memory   | 32GB DDR4-2666                                          |   12 | 合計 386GB (CPUコアあたり 16GB) |
| GPU      | NVIDIA Tesla V100 SXM2                                  |    4 |                                 |
| Storage  | 1.6TB NVMe SSD x1, 3.2TB NVMe SSDx1                     |      |                                 |
| Network  | InfiniBand 4xEDR                                        |    1 | 100Gbps                         |


 
#### (参考）GPUの仕様

|  属性名                         |  値                      |
|--------------------------------|-------------------------|
| 名称                           | NVIDIA Tesla V100 SXM2  |
| コア数(個)                     | 640                     |
| クロック速度                   | 1,455MHz                |
| 単精度浮動小数点演算ピーク性能 | 15TFLOPS                |
| 倍精度浮動小数点演算ピーク性能 | 7.5TFLOPS               |
| 単体コア理論性能               | 1.3GLOPS                |
| メモリサイズ                   | 6GB(GDDR5)              |
| メモリバンド幅                 | 900GB/sec               |
| 1GFLOPS毎のメモリバンド幅      | 266GB/sec               |
| 接続帯域                       | 8 (PCIe2.0 x16)GB/sec   |


### Medium計算ノード (HPE ProLiant DL560 Gen10; 10台)

3TBの物理メモリを搭載した80コアを搭載した計算ノードです。De novoアセンブラなど大規模なメモリを必要とするようなプログラムを実行するのに向いています。UGE配下のためジョブ投入により利用可能です。


![](Medium.png)


HPE ProLiant DL560 Gen10
(ホスト名: m01 -- m10)


| 構成要素 | 型番                                                    | 員数 | ノードあたりの性能など              |
|----------|---------------------------------------------------------|------|-------------------------------------|
| CPU      | Intel Xeon Gold 6148 (20 cores) Base 2.4GHz, Max 3.7GHz |    4 | 合計 80コア                         |
| Memory   | 32GB DDR4-2666                                          |   48 | 合計 3,072GB (CPUコアあたり 38.4GB) |
| Storage  | 1TB SATA HDD                                            |    2 | 1TB (RAID1)                         |
| Network  | InfiniBand 4xEDR                                        |    1 | 100Gbps                             |

 
### Fat計算ノード (HPE Superdome Flex; 1台)

複数の計算ノードを接続して大規模な共有メモリー型の計算機を構築するNUMA(Non Uniformed Memory Access)アーキテクチャの計算ノードです。 

FATノードはUGE配下ではなく、申請制での利用となります。

![](Fat.png) 

HPE Superdome Flex
(ホスト名: fat1)
	
| 構成要素 | 型番                                                    | 員数 | ノードあたりの性能など               |
|----------|---------------------------------------------------------|------|--------------------------------------|
| CPU      | Intel Xeon Gold 6148 (20 cores) Base 2.4GHz, Max 3.7GHz |   16 | 合計 288コア                         |
| Memory   | 32GB DDR4-2666                                          |  192 | 合計 12,288GB (CPUコアあたり 47.2GB) |
| Storage  | 1.2TB SAS HDD                                           |    2 | 1.2TB (RAID1)                        |
| Network  | InfiniBand 4xEDR                                        |    1 | 100Gbps                              |


## ストレージ

### 高速ストレージ Lustreファイルシステム


| アクセスパス | 実効容量 | 用途                           | ピーク性能 | 構成                                             |
|--------------|----------|--------------------------------|------------|--------------------------------------------------|
| /lustre6     | 3.8PB    | DDBJ業務                       | 35GB/sec   | DDN SFA14KXE+SS8462, DDN 1U server, DDN SFA7700X |
| /lustre7     | 8.0PB    | 一般解析区画のホーム領域       | 35GB/sec以上 | DDN SFA14KXE+SS9012, DDN 1U server, DDN SFA7700X |
| /lustre8     | 5.0PB    | 個人ゲノム解析区画のホーム領域 | 35GB/sec以上 | DDN SFA14KXE+SS9012, DDN 1U server, DDN SFA7700X |



### 大容量アーカイブストレージ


DRA等のDDBJデータベースを格納するなどDDBJの業務に利用しており、一般ユーザには公開していません。
容量をかせぐため、高速なディスクシステムと容量単価の安いテープシステムを用いた階層ストレージシステムとなっています。


| 構成要素                   | 型番                            | 実効容量・性能など                    |
|----------------------------|---------------------------------|---------------------------------------|
| 大容量ディスクシステム     | IBM Elastic Storage Server GL6S | 12.9PB, read 36.6GB/s, write 29.0GB/s |
| 大容量テープシステム       | IBM TS4500テープライブラリ      | 15PB (非圧縮時)                       |
| テープカートリッジ 	     | IBM 3592JDカートリッジ          |                                       |
| テープドライブ 	         | IBM TS1155 (x8台) 	           | 1台当たりread, writeとも360MB/s       |
| 階層ストレージ管理システム | SpectrumScaleサーバ             |                                       |


