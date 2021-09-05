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

      <div class="topnav">
          <a href="#"><img src="/img/ddbj_logo_mini.png" height="40"/></a>
          <a href="#submission">データ登録</a>
          <a href="#database">データベース</a>
          <a href="#supercomputer">スパコン</a>
          <a href="#activities">活動</a>
          <a href="#about">センターについて</a>
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
