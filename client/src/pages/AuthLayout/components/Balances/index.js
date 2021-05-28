import React, {useContext} from 'react'

import Balance from '../Balance'
import styles from './Balances.module.scss'
import HASH from 'assets/icons/HASH.svg'
import RKMT from 'assets/icons/RKMT.svg'
import USDT from 'assets/icons/USDT.svg'
import WAVES from 'assets/icons/WAVES.svg'
import WALLET from 'assets/icons/WALLET.svg'
import priceContainer from 'redux/containers/price'
import walletContainer from 'redux/containers/wallet'
import {ThemeContext} from 'context/ThemeContext'
function Balances({walletState, priceState}) {
  const {theme} = useContext(ThemeContext)
  return (
    <div className={styles.balances} >
      <Balance title={'HASH Balance'} icon={HASH} value={walletState.hash_balance} price={priceState.hash_price} />
      <Balance title={'RKMT Balance'} icon={RKMT} value={walletState.rkmt_balance} price={priceState.rkmt_price} />
      <Balance title={'USDT Balance'} icon={USDT} value={walletState.usdt_balance} price={priceState.usdt_price} />
      <Balance title={'WAVES Balance'} icon={WAVES} value={walletState.waves_balance} price={priceState.waves_price} />
      <Balance title={'Your Address'} icon={WALLET} value={walletState.address} />
    </div>
  )
}

export default priceContainer(walletContainer(Balances))