import React, {useCallback, useContext, useEffect, useState} from 'react'
import cx from 'classnames'
import {useHistory} from 'react-router-dom'

import styles from './Overview.module.scss'

import WavesUtils from 'utils/waves'
import walletContainer from 'redux/containers/wallet'
import WavesConfig from 'config/waves';
import priceContainer from 'redux/containers/price';
import ApiUtils from 'utils/api';
import Transaction from 'components/Transaction/Transaction'

function Overview({walletState, walletActions}) {
  const history = useHistory()

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    let interval = -1
    if(walletState.address) {
      const proc = () => {
        ApiUtils.getTransactions(walletState.address, setTransactions);
      }
      proc()
      interval = setInterval(proc, 60000)
    }
  
    return () => {
      if(interval > -1) {
        clearInterval(interval)
      }
    }
  }, [walletState.address])

  const onSwitch = () => {
    walletActions.lockWallet()
    WavesUtils.unlockWallet('CLOUD', walletActions.unlockWallet, walletActions.lockWallet)
  }
  const onCertify = useCallback(() => history.push('/certify/file'), [history])

  return (
    <div className={styles.overview}>
      <div className={styles.overviewHeader}>
        You are Ready!
      </div>
      <div className={styles.overviewBody}>
      You're now connected and able to use the application. We recommend going to step 3 to make a backup for your account if you just created one.
      </div>
      <div className={styles.buttons}>
        <a className={cx(styles.button, styles.filled)} onClick={onCertify}>Certify Now</a>
        <a className={cx(styles.button, styles.outline)} onClick={onSwitch}>Switch Account</a>
      </div>

      {transactions.map((transfer, index) => (
          <Transaction key={index} detail={transfer} owner={walletState.address} />
      ))}

    </div>
  )
}

export default priceContainer(walletContainer(Overview))