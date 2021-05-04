import React from 'react'

import Balance from '../Balance'
import styles from './Balances.module.scss'
import HASH from 'assets/icons/HASH.svg'
import RKMT from 'assets/icons/RKMT.svg'
import USDT from 'assets/icons/USDT.svg'
import WAVES from 'assets/icons/WAVES.svg'
import WALLET from 'assets/icons/WALLET.svg'
import walletContainer from 'redux/containers/wallet'

function Balances({walletState}) {
  return (
    <div className={styles.balances}>
      <Balance title={'HASH Balance'} icon={HASH} value={0} price={23} />
      <Balance title={'RKMT Balance'} icon={RKMT} value={0} price={0.0009} />
      <Balance title={'USDT Balance'} icon={USDT} value={0} price={0.98} />
      <Balance title={'WAVES Balance'} icon={WAVES} value={0} price={17.98} />
      <Balance title={'Your Address'} icon={WALLET} value={walletState.address} />
    </div>
  )
}

export default walletContainer(Balances)