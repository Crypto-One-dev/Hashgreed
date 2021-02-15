import React, {useContext} from 'react';

import hash from 'assets/hash.png';
import krosscoin from 'assets/krosscoin.png';
import ThemeContext from 'context/UserContext';
import walletContainer from 'redux/containers/wallet';
import styles from './Balances.module.scss';

const Balances = ({ walletState }) => {
  const {theme} = useContext(ThemeContext);

  return (
    <div className={styles.balances} style={{backgroundColor: theme.balancesBack, color: theme.primaryText}}>
      {walletState.address ? (
        <div className={styles.balance}>
          <span className={styles.title}>HASH Balance</span>
          <span className={styles.amount}>
            <img src={hash} alt="logo" style={{height: 15}} />
            {walletState.hash_balance}
          </span>
        </div>
      ) : null}
      {walletState.address ? (
        <div className={styles.balance}>
          <span className={styles.title}>RKMT Balance</span>
          <span className={styles.amount}>
            <img src={krosscoin} alt="logo" className={styles.krosscoinIcon} style={{height: 15}} />
            {walletState.rkmt_balance}
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