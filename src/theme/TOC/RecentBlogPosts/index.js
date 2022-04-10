import React from 'react'
import Link from '@docusaurus/Link'
import Translate from '@docusaurus/Translate'

import styles from './styles.module.css'

import {
  useNewsPosts,
  useTroublereportPosts
} from './hooks'

const RECENT_POST_COUNT = 5

function ListItem ({ post }) {
  return (
    <li className={styles.recentBlogPosts__listItem}>
      <Link className={styles.recentBlogPosts__listItemLink} to={post.metadata.permalink}>{post.metadata.title}</Link>
    </li>
  )
}

export default function RecentBlogPosts () {
  const newsPosts = useNewsPosts()
  const troubleReportPosts = useTroublereportPosts()

  const recentNewsPosts = newsPosts.slice(0, RECENT_POST_COUNT)
  const recentTroubleReportPosts = troubleReportPosts.slice(0, RECENT_POST_COUNT)

  return (
    <div className={styles.recentBlogPosts}>
      <section className={styles.recentBlogPosts__section}>
        <h2 className={styles.recentBlogPosts__title}>
          <Translate id="themes.recentBlogPosts.recentNewsPosts">最近のお知らせ</Translate>
        </h2>
        <ul className={styles.recentBlogPosts__list}>
          {recentNewsPosts.map(post => (
            <ListItem key={post.id} post={post} />
          ))}
          <li className={styles.recentBlogPosts__listItem}>
            <Link to="/blog/tags/news" className={styles.recentBlogPosts__listItemLink}>
              <Translate id="themes.recentBlogPosts.moreNewsPosts">すべてのお知らせを見る</Translate>
            </Link>
          </li>
        </ul>
      </section>
      <section className={styles.recentBlogPosts__section}>
        <h2 className={styles.recentBlogPosts__title}>
          <Translate id="themes.recentBlogPosts.recentTroubleReportPosts">最近の障害報告</Translate>
        </h2>
        <ul className={styles.recentBlogPosts__list}>
          {recentTroubleReportPosts.map(post => (
            <ListItem key={post.id} post={post} />
          ))}
          <li className={styles.recentBlogPosts__listItem}>
            <Link to="/blog/tags/troublereport" className={styles.recentBlogPosts__listItemLink}>
              <Translate id="themes.recentBlogPosts.moreTroubleReportPosts">すべての障害報告を見る</Translate>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}
