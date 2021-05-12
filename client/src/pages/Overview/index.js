import React, {useCallback} from 'react'
import cx from 'classnames'
import {useHistory} from 'react-router-dom'

import styles from './Overview.module.scss'

import WavesUtils from 'utils/waves'
import walletContainer from 'redux/containers/wallet'

function Overview({walletActions}) {
  const history = useHistory()

  const onSwitch = () => {
    walletActions.lockWallet();
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
    </div>
  )
}

export default walletContainer(Overview)