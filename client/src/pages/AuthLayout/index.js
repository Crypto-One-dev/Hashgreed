import React from 'react'
import {Redirect} from 'react-router-dom'

import Routes from './routes'
import Balances from './components/Balances'
import Menu from './components/Menu'
import styles from './AuthLayout.module.scss'

import walletContainer from "redux/containers/wallet"

function Layout({walletState, walletActions}) {
  if(!walletState.address) {
    return <Redirect to='/' />
  }
  return (
    <div className={styles.authLayout}>
      <Balances />
      <Menu />
      <Routes />
    </div>
  )
}

export default walletContainer(Layout)