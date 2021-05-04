import React from 'react'
import {Redirect} from 'react-router-dom'

import Routes from './routes'
import styles from './AuthLayout.module.scss'

import walletContainer from "redux/containers/wallet"

function Layout({walletState, walletActions}) {
  if(!walletState.address) {
    return <Redirect to='/' />
  }
  return (
    <div className={styles.authLayout}>
      Menu
      <Routes />
    </div>
  )
}

export default walletContainer(Layout)