import React from 'react'

import s from './styles.module.css'

export function ServiceGroupsContainer ({ children }) {
  return <div className={s.ServiceGroupContainer}>{children}</div>
}

export function ServiceGroup ({ children }) {
  return <section className={s.ServiceGroup}>{children}</section>
}

export function ServiceGroupTitle ({ children }) {
  return <h1 className={s.ServiceGroup__Title}>{children}</h1>
}

export function ServiceList ({ children }) {
  return <ul className={s.ServiceList}>{children}</ul>
}

export function ServiceListItem ({ href, children }) {
  return (
    <li className={s.ServiceList__Item}>
      <a className={s.ServiceList__Link} href={href}>
        {children}
      </a>
    </li>
  )
}
