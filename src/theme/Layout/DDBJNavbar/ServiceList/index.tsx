import React from 'react'

import s from './styles.module.css'

export function ServiceListItem ({ href, children }) {
  return (
    <li className={s.DDBJServiceList__Item}>
      <a className={s.DDBJServiceList__Link} href={href} >
        {children}
      </a>
    </li>
  )
}

export default function ServiceList ({ children }) {
  return (
    <ul className={s.DDBJServiceList}>{children}</ul>
  )
}
