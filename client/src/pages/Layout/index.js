import React from 'react'
import {BrowserRouter} from 'react-router-dom'

import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import styles from './Layout.module.scss'

import walletContainer from 'redux/containers/wallet'

function Layout({walletState, walletActions}) {
  return (
    <BrowserRouter>
      <div className={styles.mainLayout}>
        <Header />
        <div className={styles.mainBody}>
          <Content />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default walletContainer(Layout)