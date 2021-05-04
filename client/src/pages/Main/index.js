import React from 'react'
import cx from 'classnames'

import Steps from './components/Steps'
import styles from './Main.module.scss'

import walletContainer from 'redux/containers/wallet'

function Main({walletState, walletActions}) {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        Do more with secured <br />
        contracts and signatures!
      </div>
      <div className={styles.subheader}>
        Our application is using Waves Signer to connect your account <br />
        and sign all transactions. <br />
        To import an existing account, add it first in waves.exchange
      </div> 
      <div className={styles.startnow}>
        <a className={cx(styles.start, styles.filled)}>Start now</a>
      </div>
      <Steps />
    </div>
  )
} 

export default walletContainer(Main)