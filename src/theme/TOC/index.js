/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import useTOCHighlight from '@theme/hooks/useTOCHighlight';
import styles from './styles.module.css';
const LINK_CLASS_NAME = 'table-of-contents__link';
const TOC_HIGHLIGHT_PARAMS = {
    linkClassName: LINK_CLASS_NAME,
    linkActiveClassName: 'table-of-contents__link--active',
};
/* eslint-disable jsx-a11y/control-has-associated-label */

export function TOCHeadings({toc, isChild}) {
    if (!toc.length) {
        return null;
    }

    return (
        <ul
          className={
              isChild ? '' : 'table-of-contents table-of-contents__left-border'
          }>
          {toc.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className={LINK_CLASS_NAME} // Developer provided the HTML, so assume it's safe.
              // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                      __html: heading.value,
                  }}
                />
                <TOCHeadings isChild toc={heading.children} />
              </li>
          ))}
        </ul>
    );
}



function TOC({toc}) {
    useTOCHighlight(TOC_HIGHLIGHT_PARAMS);
    return (
        <div className={clsx(styles.tableOfContents, 'thin-scrollbar')}>
          <TOCHeadings toc={toc} />
          <br /><br />

          <table>
            <tr>
              <td class="tableHeader">
                お知らせ
              </td>
            </tr>
            <tr>
              <td class="tableBody">
                2021年5月13日(木) 一般解析区画short.qの設定変更<br />
                <br />
                ■ 過去のお知らせ一覧<br />
              </td>
            </tr>

            <tr>
              <td class="tableHeader">
                障害情報
              </td>
            </tr>
            <tr>
              <td class="tableBody">
                (復旧)2021年7月22日（木) qlogin等の障害のお知らせ<br />
                (終了) 2021年7月6日(火) 富士市内での電気通信設備の移転実施に伴う通信断のお知らせ<br />
              <br />
                ■ 過去の障害情報一覧
              </td>
            </tr>

          </table>

        </div>
    );
}

export default TOC;
