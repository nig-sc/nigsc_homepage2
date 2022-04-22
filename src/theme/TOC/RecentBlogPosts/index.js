import React from 'react'
import Link from '@docusaurus/Link'
import Translate from '@docusaurus/Translate'

import styles from './styles.module.css'

import {
  useNewsPosts,
  useMaintenancePosts
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
  const maintenancePosts = useMaintenancePosts()

  const recentNewsPosts = newsPosts.slice(0, RECENT_POST_COUNT)
  const recentMaintenancePosts = maintenancePosts.slice(0, RECENT_POST_COUNT)

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
          <Translate id="themes.recentBlogPosts.recentMaintenancePosts">メンテナンス情報</Translate>
        </h2>
        <ul className={styles.recentBlogPosts__list}>
          {recentMaintenancePosts.map(post => (
            <ListItem key={post.id} post={post} />
          ))}
          <li className={styles.recentBlogPosts__listItem}>
            <Link to="/blog/tags/maintenance" className={styles.recentBlogPosts__listItemLink}>
              <Translate id="themes.recentBlogPosts.moreMaintenancePosts">すべてのメンテナンス情報を見る</Translate>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}
