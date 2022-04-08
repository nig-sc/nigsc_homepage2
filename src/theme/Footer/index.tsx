import React from 'react';
// import clsx from 'clsx';
// import Link from '@docusaurus/Link';

import { useThemeConfig } from '@docusaurus/theme-common';
// import useBaseUrl from '@docusaurus/useBaseUrl';
// import isInternalUrl from '@docusaurus/isInternalUrl';
// import ThemedImage from '@theme/ThemedImage';
// import IconExternalLink from '@theme/IconExternalLink';

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
        {serviceGroups.map(serviceGroup => (
          <ServiceGroup key={serviceGroup.title}>
            <ServiceGroupTitle>{serviceGroup.title}</ServiceGroupTitle>
            <ServiceList>
              {serviceGroup.items.map(item => (
                <ServiceListItem href={item.href}>{item.label}</ServiceListItem>
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
