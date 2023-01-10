/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import styles from './styles.module.css'

import { useTagLabel } from '../hooks'

function Tag ({ permalink, label, count }) {
  const displayName = useTagLabel(label)
  return (
    <Link
      href={permalink}
      className={clsx(styles.tag, {
        [styles.tagRegular]: !count,
        [styles.tagWithCount]: count
      })}>
      {displayName}
      {count && <span>{count}</span>}
    </Link>
  )
}

export default Tag
