import React from 'react'
import clsx from 'clsx'
import ErrorBoundary from '@docusaurus/ErrorBoundary'
import {
  PageMetadata,
  ThemeClassNames
} from '@docusaurus/theme-common'
import SkipToContent from '@theme/SkipToContent'
import AnnouncementBar from '@theme/AnnouncementBar'
import Navbar from '@theme/Navbar'
import Footer from '@theme/Footer'
import LayoutProviders from '@theme/Layout/Provider'

import type { Props } from '@theme/Layout'
import ErrorPageContent from '@theme/ErrorPageContent'
import DDBJNavbar from './DDBJNavbar'

import './styles.css'

export default function Layout (props: Props): JSX.Element {
  const {
    children,
    noFooter,
    wrapperClassName,
    // not really layout-related, but kept for convenience/retro-compatibility
    title,
    description
  } = props

  return (
    <LayoutProviders>
      <PageMetadata title={title} description={description} />

      <SkipToContent />

      <AnnouncementBar />

      <DDBJNavbar />

      <Navbar />

      <div className={clsx(ThemeClassNames.wrapper.main, wrapperClassName)}>
        <ErrorBoundary fallback={ErrorPageContent}>{children}</ErrorBoundary>
      </div>

      {!noFooter && <Footer />}
    </LayoutProviders>
  )
}
