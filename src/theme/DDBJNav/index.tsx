import React from 'react'

import DDBJServiceList from './DDBJServiceList'

import { default as s } from "./styles.module.css"

export default function DDBJNav (): JSX.Element {
  return (
    <nav className={s.DDBJNav}>
      <a className={s.DDBJNav__Brand} href="https://www.ddbj.nig.ac.jp/index.html">
        <img className={s.DDBJNav__BrandImage} src="/img/ddbj-brand.svg" />
      </a>
      <div className={s.DDBJNav__Contents}>
        <DDBJServiceList />
      </div>
    </nav>
  )
}
