import React, {useCallback, useContext} from 'react'
import cx from 'classnames'
import {useHistory} from 'react-router-dom'

import styles from './Step.module.scss'

import WavesConfig from 'config/waves'
import walletContainer from 'redux/containers/wallet'
import {ThemeContext} from "context/ThemeContext";
import { shadow } from '@chakra-ui/styled-system'

function Step({index, title, image, content, isDisabled, walletActions, login}) {
  const history = useHistory()
  const {theme} = useContext(ThemeContext);

  const onSwitch = () => {
    walletActions.lockWallet()
    login()
  }
  const onCertify = useCallback(() => history.push('/certify/file'), [history])
  const onManageAccount = () => {
    window.open(WavesConfig.ACCOUNT_URL)
  }

  return (
    <div className={cx(styles.step, isDisabled ? styles.nonglow : styles.glow)} style={{backgroundColor: theme.stepBackground,  boxShadow: isDisabled ? theme.nonglow: theme.glow}}>
      <div className={styles.info}>
        <div className={styles.index} style={{color: theme.commentText}} >STEP {index}:</div>
        <div className={isDisabled ? styles.disabled_title : styles.title} style={{color: isDisabled ? 'rgba(21, 20, 57, 0.4)' : theme.primaryText}}>{title}</div>
        <div className={styles.image}><img src={image} alt="" /></div>
        <div className={styles.content} style={{color: theme.commentText}}>{content}</div>
      </div>
      <div className={styles.buttons}>
      {
        index === 1?
          <a className={cx(styles.button, isDisabled ? styles.disabled : styles.filled)} onClick={isDisabled ? null : login} style={{backgroundColor: isDisabled ?  theme.disabledButtonBack : theme.buttonBack}}>Sign in</a>
        : index === 2?
          <>
            <a className={cx(styles.button, isDisabled ? styles.disabled : styles.filled)} onClick={isDisabled ? null : onCertify} style={{backgroundColor: isDisabled ?  theme.disabledButtonBack : theme.buttonBack}}>Certify Now</a>
            <a className={cx(styles.button, isDisabled ? styles.disabled : styles.outline)} onClick={isDisabled ? null : onSwitch} style={{borderColor: isDisabled ?  theme.disabledButtonBack : theme.buttonBack}}>Switch Account</a>
          </>
        : index === 3?
          <a className={cx(styles.button, isDisabled ? styles.disabled : styles.filled)} onClick={isDisabled ? null : onManageAccount} style={{backgroundColor: isDisabled ?  theme.disabledButtonBack : theme.buttonBack}}>Manage Accounts</a>
        :
          null
      }
      </div>
    </div>
  )
}

export default walletContainer(Step)