import React, {useCallback, useContext, useEffect, useState} from 'react'
import cx from 'classnames'
import {useHistory} from 'react-router-dom'

import styles from './Overview.module.scss'

import WavesUtils from 'utils/waves'
import walletContainer from 'redux/containers/wallet'
import priceContainer from 'redux/containers/price'
import {ThemeContext} from 'context/ThemeContext'
import Price from 'components/Price/Price'
import ApiUtils from 'utils/api'
import WavesConfig from 'config/waves';
import Transaction from 'components/Transaction/Transaction'
import rkmt from 'assets/icons/RKMT.svg'
import waves from 'assets/icons/WAVES.svg'
import usdt from 'assets/icons/USDT.svg'
import Balances from '../AuthLayout/components/Balances'

function Overview({walletState, walletActions, priceState, priceActions}) {
  const history = useHistory()
  const {theme} = useContext(ThemeContext)
  const [transactions, setTransactions] = useState([]);

  const onSwitch = () => {
    walletActions.lockWallet()
    WavesUtils.unlockWallet('CLOUD', walletActions.unlockWallet, walletActions.lockWallet)
  }
  const onCertify = useCallback(() => history.push('/certify/file'), [history])

  useEffect(() => {
    if(walletState.address) {
      const proc = () => {
        priceActions.setPrice('RKMT', 0);
        ApiUtils.getPrice(WavesConfig.WAVES_ID, 'WAVES', priceActions.setPrice);
        ApiUtils.getPrice(WavesConfig.RKMT_ID, 'RKMT', priceActions.setPrice);
        ApiUtils.getTransactions(walletState.address, setTransactions);
      }
      proc()
    }
  }, [walletState.address, priceActions])

  return (
    <div className={styles.overview}>
      <div className={styles.prices}>
        <Price Coin="RKMT" Imgurl={rkmt} Description="Current Price" Price={priceState.rkmt_price + '$'} Decimals={8} />
        <Price Coin="WAVES" Imgurl={waves} Description="Current Price" Price={priceState.waves_price + '$'} Decimals={2} />
        <Price Coin="USDT" Imgurl={usdt} Description="Total RKMT Balance" Price={priceState.rkmt_price * walletState.rkmt_balance} Decimals={4} />
      </div>
      <div className={styles.overviewHeader} style={{color: theme.primaryText}}>
        You are Ready!
      </div>
      <div className={styles.overviewBody} style={{color: theme.commentText}}>
      You're now connected and able to use the application. We recommend going to step 3 to make a backup for your account if you just created one.
      </div>
      <Balances/>
      <div className={styles.buttons}>
        <a className={cx(styles.button, styles.filled)} onClick={onCertify} style={{backgroundColor: theme.buttonBack}}>Certify Now</a>
        <a className={cx(styles.button, styles.outline)} onClick={onSwitch} style={{borderColor: theme.buttonBack}}>Switch Account</a>
      </div>
      <div className={styles.transactionList}>
        <Transaction transactions={transactions} title="History" owner={walletState.address} />
      </div>
    </div>
  )
}

export default priceContainer(walletContainer(Overview))