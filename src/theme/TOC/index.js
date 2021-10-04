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
                News / お知らせ
              </td>
            </tr>
            <tr>
              <td class="tableBody">
              <a href="/news/N2021_1112_scheduledMaintainance">
                【定期メンテナンス】11月12日～11月18日 定期メンテナンスのお知らせ</a><br /> <br />

              <a href="/news/2021_0512_shortQ">
                2021年5月13日(木) 一般解析区画short.qの設定変更</a><br /><br />
               <a href="/news/past_news">■ 過去のお知らせ一覧</a><br />
              </td>
            </tr>

            <tr>
              <td class="tableHeader">
                Failure Reports / 障害情報
              </td>
            </tr>
            <tr>
              <td class="tableBody">
               <a href="/news2/M2021_1004_lustre6">
                【メンテナンス】2021年10月04日(月)10:30～10:45 Lustre6障害対応によるアクセス不可</a><br /><br />

                <a href="/news2/M2021_0915_lustre6-3">
                Lustre6 ディスク障害のお詫び</a><br /><br />

                <a href="/news2/M2021_0915_lustre6-2">
                【障害】【続報】2021年9月15日(水) Lustre6のディスク障害のお知らせ</a><br />
              <br />
                <a href="/news2/past_maintainance_info">■ 過去の障害情報一覧</a>
              </td>
            </tr>

          </table>

        </div>
    );
}

export default TOC;
