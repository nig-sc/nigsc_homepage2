---
id: pg_overview
title: 個人ゲノム区画の利用方法概要
---


- 個人ゲノム解析区画は現在のところ他のユーザのジョブの状態などが見えないようにセキュリティー上の観点から基本的にはノード占有の形で利用していただくこととなっています。


- 一方で、L40S GPUノード(アクセラレータ最適化ノード Type 2)は計算機の台数が特に限られているため、計算機の利用効率向上を優先するため共用のGPU専用のSlurmジョブスケジューラを介して使っていただく形とさせていただいております。


---


1. どちらの場合も、まずはSSL-VPNで個人ゲノム解析区画のゲートウェイへログインします。
2. L40S GPUノード以外の場合は、ゲートウェイから、各ユーザの占有計算ノードにSSHログインして利用します。占有計算ノードからSlurmにて自分の占有計算ノードにジョブを投入することも可能です。
3. L40S GPUノード(アクセラレータ最適化ノード Type 2)を利用する場合は、L40S GPUノード用のインタラクティブノードにSSHログインして利用します。
