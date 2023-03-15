import React from 'react'
import Translate, { translate } from '@docusaurus/Translate'
import styles from './style.module.css'
import { STATUS_UNSETTLED, STATUS_CONSENTED, useConsentedStatus } from './hooks'

export default function ConsentCookie () {
  const { status, setStatus } = useConsentedStatus()

  const consent = () => {
    // eslint-disable-next-line no-undef
    gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted'
    })
    setStatus(STATUS_CONSENTED)
  }

  if (status !== STATUS_UNSETTLED) return null

  return (
    <div className={styles.consentCookie}>
      <div className={styles.consentCookie__container}>
        <div className={styles.consentCookie__messages}>
          <Translate>
            当ウェブサイトでは、お客様により良いサービスを提供するため、クッキーを利用しています。
            クッキーの利用に同意いただける場合は「同意する」をクリックしてください。
          </Translate>
        </div>
        <div className={styles.consentCookie__actions}>
          <a target="_blank" href={translate({
            id: 'cookiePolicyUrl',
            message: 'https://www.ddbj.nig.ac.jp/policies.html#4-%E3%82%AF%E3%83%83%E3%82%AD%E3%83%BC-cookie'
          })} rel="noreferrer">
            <Translate>クッキーポリシー</Translate>
          </a>
          <button type="button" className={styles.consentCookie__button} onClick={consent}>
            <Translate>同意する</Translate>
          </button>
        </div>
      </div>
    </div>
  )
}
