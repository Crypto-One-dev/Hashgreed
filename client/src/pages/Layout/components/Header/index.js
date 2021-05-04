import React from 'react'
import cx from 'classnames'

import styles from './Header.module.scss'
import Logo from 'assets/images/Header.svg'

import walletContainer from "redux/containers/wallet";

function Header({walletState, walletActions}) {
  return (
    <div className={styles.header}>
      <div className={styles.image}>
        <img src={Logo} alt="" />
      </div>
      <div className={styles.about}>
        <a>About</a>
        <a>F.A.Q.</a>
        <a>UseCase</a>
      </div>
      <div className={styles.menu}>
        <a className={styles.explorer}>Verification Explorer</a>
        <a className={cx(styles.account, styles.filled)}>Account</a>
        <a className={styles.lang}>EN</a>
      </div>
    </div>
  )
}
export default walletContainer(Header)