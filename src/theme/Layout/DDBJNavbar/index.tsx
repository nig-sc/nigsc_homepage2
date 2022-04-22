import React from 'react'
import Translate from '@docusaurus/Translate'

import ServiceList, { ServiceListItem } from './ServiceList'

import DdbjBrand from '@site/static/img/ddbj-brand.svg';

import s from './styles.module.css'

export default function DDBJNavbar (): JSX.Element {
  return (
    <nav className={s.DDBJNavbar}>
      <a className={s.DDBJNavbar__Brand} href="https://www.ddbj.nig.ac.jp/index.html" title="DDBJ">
        <DdbjBrand className={s.DDBJNavbar__BrandImage}  />
      </a>
      <div className={s.DDBJNavbar__Contents}>
        <ServiceList>
          <ServiceListItem href="https://www.ddbj.nig.ac.jp/ddbj/index.html">
            <Translate id="theme.DDBJNavbar.データ登録">データ登録</Translate>
          </ServiceListItem>
          <ServiceListItem href="https://www.ddbj.nig.ac.jp/services/index.html">
            <Translate id="theme.DDBJNavbar.データベース">データベース</Translate>
          </ServiceListItem>
          <ServiceListItem href="https://sc.ddbj.nig.ac.jp/">
            <Translate id="theme.DDBJNavbar.スパコン">スパコン</Translate>
          </ServiceListItem>
          <ServiceListItem href="https://www.ddbj.nig.ac.jp/activities/index.html">
            <Translate id="theme.DDBJNavbar.活動">活動</Translate>
          </ServiceListItem>
          <ServiceListItem href="https://www.ddbj.nig.ac.jp/about/index.html">
            <Translate id="theme.DDBJNavbar.センターについて">センターについて</Translate>
          </ServiceListItem>
        </ServiceList>
      </div>
    </nav>
  )
}
