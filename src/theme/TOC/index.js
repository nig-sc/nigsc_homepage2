import React from 'react';
import OriginalTOC from '@theme-original/TOC';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

export default function TOCWrapper(props) {
  const location = useLocation();
  const isEnglish = location.pathname.startsWith('/en/'); // URLが /en/ なら英語
  const rssUrl = isEnglish ? '/rss-en.xml' : '/rss.xml';
  const jsonUrl = isEnglish ? '/feed-en.json' : '/feed.json';

  return (
    <div className={styles.tocContainer}>
      {/* 元の TOC を表示 */}
      <OriginalTOC {...props} />

      {/* RSS & JSON Feed リンクを追加 (言語対応) */}
      <div className={styles.feedIcons}>
        <a href={rssUrl} target="_blank" rel="noopener noreferrer">
          <img src="/img/rss_feed.png" alt="RSS Feed" className={styles.icon} />
        </a>
        <a href={jsonUrl} target="_blank" rel="noopener noreferrer">
          <img src="/img/json_feed.png" alt="JSON Feed" className={styles.icon} />
        </a>
      </div>
    </div>
  );
}
