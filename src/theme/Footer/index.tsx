import React from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';

import {
  ServiceGroupsContainer,
  ServiceGroup, ServiceGroupTitle,
  ServiceList, ServiceListItem
} from './Services'

import { default as s } from './styles.module.css';

export default function Footer () {
  const { footer: { copyright, links: serviceGroups } } = useThemeConfig()

  return (
    <footer className={s.Footer}>
      <div className={s.Footer__Contents}>
      <ServiceGroupsContainer>
        {serviceGroups.map((serviceGroup, i) => (
          <ServiceGroup key={i}>
            <ServiceGroupTitle>{serviceGroup.title}</ServiceGroupTitle>
            <ServiceList>
              {serviceGroup.items.map((item, i) => (
                <ServiceListItem key={i} href={item.href}>{item.label}</ServiceListItem>
              ))}
            </ServiceList>
          </ServiceGroup>
        ))}
      </ServiceGroupsContainer>
      </div>
      <div className={s.Footer__CopyRight}>
        <p className={s.Footer__CopyRightBody}>{copyright}</p>
      </div>
    </footer>
  )
};
