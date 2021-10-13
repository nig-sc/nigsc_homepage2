/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import SkipToContent from '@theme/SkipToContent';
import AnnouncementBar from '@theme/AnnouncementBar';
import Navbar from '@theme/Navbar';
import Footer from '@theme/Footer';
import LayoutProviders from '@theme/LayoutProviders';
import LayoutHead from '@theme/LayoutHead';
import type {Props} from '@theme/Layout';
import useKeyboardNavigation from '@theme/hooks/useKeyboardNavigation';
import {ThemeClassNames} from '@docusaurus/theme-common';
import './styles.css';

function Layout(props: Props): JSX.Element {
  const {children, noFooter, wrapperClassName, pageClassName} = props;

  useKeyboardNavigation();

  return (
    <LayoutProviders>
      <LayoutHead {...props} />

      <SkipToContent />

      <AnnouncementBar />

      <div className="topnav">
          <a href="https://www.ddbj.nig.ac.jp/index.html"><img src="/img/ddbj_logo_mini.png" height="40"/></a>
          <a href="https://www.ddbj.nig.ac.jp/ddbj/index.html">Data Submission</a>
          <a href="https://www.ddbj.nig.ac.jp/services/index.html">Database</a>
          <a href="https://sc.ddbj.nig.ac.jp/">Supercomputer</a>
          <a href="https://www.ddbj.nig.ac.jp/activities/index.html">Activities</a>
          <a href="https://www.ddbj.nig.ac.jp/about/index.html">About Us</a>
      </div>


      <Navbar />

      <div
        className={clsx(
          ThemeClassNames.wrapper.main,
          wrapperClassName,
          pageClassName,
        )}>
        {children}
      </div>

      {!noFooter && <Footer />}
    </LayoutProviders>
  );
}

export default Layout;
