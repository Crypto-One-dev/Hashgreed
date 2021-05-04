import React, {useCallback} from 'react'
import cx from 'classnames'
import {useHistory} from 'react-router-dom'

import styles from './Step.module.scss'

import WavesConfig from 'config/waves'
import walletContainer from 'redux/containers/wallet'
import WavesUtils from 'utils/waves'

function Step({index, title, image, content, isDisabled, walletActions}) {
  const history = useHistory()

  const onSign = () => {
    WavesUtils.unlockWallet('CLOUD', walletActions.unlockWallet, walletActions.lockWallet)
  }
  const onSwitch = () => {
    walletActions.lockWallet();
    onSign()
  }
  const onCertify = useCallback(() => history.push('/certify/file'), [history])
  const onManageAccount = () => {
    window.open(WavesConfig.ACCOUNT_URL)
  }

  return (
    <div className={cx(styles.step, isDisabled ? null : styles.glow)}>
      <div className={styles.info}>
        <div className={styles.index}>STEP {index}:</div>
        <div className={isDisabled ? styles.disabled_title : styles.title}>{title}</div>
        <div className={styles.image}><img src={image} alt="" /></div>
        <div className={styles.content}>{content}</div>
      </div>
      <div className={styles.buttons}>
      {
        index === 1?
          <a className={cx(styles.button, isDisabled ? styles.disabled : styles.filled)} onClick={isDisabled ? null : onSign}>Sign in</a>
        : index === 2?
          <>
            <a className={cx(styles.button, isDisabled ? styles.disabled : styles.filled)} onClick={isDisabled ? null : onCertify}>Certify Now</a>
            <a className={cx(styles.button, isDisabled ? styles.disabled : styles.outline)} onClick={isDisabled ? null : onSwitch}>Switch Account</a>
          </>
        : index === 3?
          <a className={cx(styles.button, isDisabled ? styles.disabled : styles.filled)} onClick={isDisabled ? null : onManageAccount}>Manage Accounts</a>
        :
          null
      }
      </div>
    </div>
  )
}

export default walletContainer(Step)