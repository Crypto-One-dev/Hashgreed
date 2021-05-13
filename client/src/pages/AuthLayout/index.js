import React, {useEffect} from 'react'
import {Redirect} from 'react-router-dom'

import Routes from './routes'
import Balances from './components/Balances'
import Menu from './components/Menu'
import styles from './AuthLayout.module.scss'

import WavesConfig from 'config/waves'
import ApiUtils from 'utils/api'
import WavesUtils from 'utils/waves'
import priceContainer from 'redux/containers/price'
import walletContainer from 'redux/containers/wallet'

function Layout({walletState, walletActions, priceActions}) {
  useEffect(() => {
    let interval = -1
    if(walletState.address) {
      const proc = () => {
        WavesUtils.getBalance(walletActions.setBalance, walletActions.lockWallet)
        ApiUtils.getPrice(WavesConfig.WAVES_ID, 'WAVES', priceActions.setPrice)
        ApiUtils.getPrice(WavesConfig.RKMT_ID, 'RKMT', priceActions.setPrice)
        ApiUtils.getPrice(WavesConfig.USDT_ID, 'USDT', priceActions.setPrice)
        ApiUtils.getPrice(WavesConfig.HASH_ID, 'HASH', priceActions.setPrice)
      }
      proc()
      interval = setInterval(proc, 60000)
    }
  
    return () => {
      if(interval > -1) {
        clearInterval(interval)
      }
    }
  }, [walletState.address, walletActions, priceActions])

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

export default priceContainer(walletContainer(Layout))