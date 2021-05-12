import React, {useCallback} from 'react'
import cx from 'classnames'
import {useHistory} from 'react-router-dom'

import styles from './Header.module.scss'
import Logo from 'assets/images/Header.svg'

import walletContainer from "redux/containers/wallet";

function Header({walletState, walletActions}) {
  const history = useHistory()
  
  // const account = useCallback(() => history.push('/certify/file'), [history])
  const account = () => {}
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
        <a className={cx(styles.account, styles.filled)} onClick={account}>Account</a>
        <a className={styles.lang}>EN</a>
      </div>
    </div>
  )
}
export default walletContainer(Header)