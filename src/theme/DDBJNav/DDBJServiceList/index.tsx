import React from 'react'

import { default as s } from './styles.module.css'

function DDBJServiceListItem ({ href, children }) {
  return (
    <li className={s.DDBJServiceList__Item}>
      <a className={s.DDBJServiceList__Link} href={href} >
        {children}
      </a>
    </li>
  )
}

export default function DDBJServiceList () {
  return (
    <ul className={s.DDBJServiceList}>
      <DDBJServiceListItem href="https://www.ddbj.nig.ac.jp/ddbj/index.html">
          Data Submission
      </DDBJServiceListItem>
      <DDBJServiceListItem href="https://www.ddbj.nig.ac.jp/services/index.html">
          Database
      </DDBJServiceListItem>
      <DDBJServiceListItem href="https://sc.ddbj.nig.ac.jp/">
          Supercomputer
      </DDBJServiceListItem>
      <DDBJServiceListItem href="https://www.ddbj.nig.ac.jp/activities/index.html">
          Activities
      </DDBJServiceListItem>
      <DDBJServiceListItem href="https://www.ddbj.nig.ac.jp/about/index.html">
          About Us
      </DDBJServiceListItem>
    </ul>
  )
}
