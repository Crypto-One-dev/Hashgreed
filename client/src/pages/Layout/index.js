import React from 'react'

import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import styles from './Layout.module.scss';

import walletContainer from "redux/containers/wallet"

function Layout({walletState, walletActions}) {
  return (
    <div className={styles.mainLayout}>
      <Header />
      <Content />
      <Footer />
    </div>
  )
}

export default walletContainer(Layout)