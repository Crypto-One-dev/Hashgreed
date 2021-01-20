import React from 'react';

import styles from './Balances.module.scss';

const Balances = ({ userInfo }) => {
  return (
    <div className={styles.balances}>
      {userInfo.balances ? (
        userInfo.balances.map(balance => {
          console.log('amount', balance.amount, balance.decimals, balance.amount / Math.pow(10, balance.decimals))
          return (
          <div key={balance.assetId} className={styles.balance}>
            <span className={styles.title}>{balance.assetName}</span>
            <span className={styles.amount}>{balance.amount / Math.pow(10, balance.decimals)}</span>
          </div>
        )})
      ) : null}
      {userInfo.address ? (
        <div className={styles.balance}>
          <span className={styles.title}>Your address</span>
          <span className={styles.amount}>{userInfo.address}</span>
        </div>
      ) : null}
    </div>
  )
}

export default Balances;