import React, {useContext} from 'react';
import {FaCertificate} from "react-icons/all";

import logo from 'assets/logo.png';
import ThemeContext from 'context/UserContext';
import walletContainer from 'redux/containers/wallet';
import styles from './Balances.module.scss';

const Balances = ({ walletState }) => {
  const {theme} = useContext(ThemeContext);

  return (
    <div className={styles.balances} style={{backgroundColor: theme.balancesBack, color: theme.primaryText}}>
      {walletState.address ? (
        <div className={styles.balance}>
          <span className={styles.title}>CREDIT</span>
          <span className={styles.amount}>
            <FaCertificate className={styles.creditIcon}/>
            {walletState.credit}
          </span>
        </div>
      ) : null}
      {walletState.address ? (
        <div className={styles.balance}>
          <span className={styles.title}>HASH Balance</span>
          <span className={styles.amount}>
            <img src={logo} alt="logo" style={{height: 15}} />
            {walletState.token_balance}
          </span>
        </div>
      ) : null}
      {walletState.address ? (
        <div className={styles.balance}>
          <span className={styles.title}>WAVES Balance</span>
          <span className={styles.amount}>
            <div className={styles.wavesIcon}></div>
            {walletState.waves_balance}
          </span>
        </div>
      ) : null}
      {walletState.address ? (
        <div className={styles.balance}>
          <span className={styles.title}>Your address</span>
          <span className={styles.amount}>{walletState.address}</span>
        </div>
      ) : null}
    </div>
  )
}

export default walletContainer(Balances);