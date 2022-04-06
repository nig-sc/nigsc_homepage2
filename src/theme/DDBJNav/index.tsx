import React from 'react'
import "./styles.css"

export default function DDBJNav (): JSX.Element {
  return (
    <div className="topnav">
      <a href="https://www.ddbj.nig.ac.jp/index.html">
        <img src="/img/ddbj_logo_mini.png" height="40"/>
      </a>
      <a href="https://www.ddbj.nig.ac.jp/ddbj/index.html">Data Submission</a>
      <a href="https://www.ddbj.nig.ac.jp/services/index.html">Database</a>
      <a href="https://sc.ddbj.nig.ac.jp/">Supercomputer</a>
      <a href="https://www.ddbj.nig.ac.jp/activities/index.html">Activities</a>
      <a href="https://www.ddbj.nig.ac.jp/about/index.html">About Us</a>
    </div>
  )
}
