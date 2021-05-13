import React, {useCallback, useRef} from 'react'
import cx from 'classnames'
import {useHistory} from 'react-router-dom'

import Steps from './components/Steps'
import styles from './Main.module.scss'

import walletContainer from 'redux/containers/wallet'
import WavesUtils from 'utils/waves'
import LoginModal from 'components/LoginModal/LoginModal'

function Main({walletState, walletActions}) {
  const history = useHistory()
  const loginMdl = useRef(null)

  const sign = () => {
    WavesUtils.unlockWallet('CLOUD', walletActions.unlockWallet, walletActions.lockWallet)
  }

  const login = () => {
    loginMdl.current.openModal()
  }

  const onSignMethod = (str) => {
    loginMdl.current.closeModal()
    WavesUtils.unlockWallet(str, walletActions.unlockWallet, walletActions.lockWallet)
  }

  const gotoOverview = useCallback(() => history.push('/overview'), [history])
  return (
    <div className={styles.main}>
      <LoginModal ref={loginMdl} onSignMethods = {(str) => onSignMethod(str)}/>
      <div className={styles.header}>
        Do more with secured <br />
        contracts and signatures!
      </div>
      <div className={styles.subheader}>
        Our application is using Waves Signer to connect your account <br />
        and sign all transactions. <br />
        To import an existing account, add it first in waves.exchange
      </div> 
      <div className={styles.startnow}>
        <a className={cx(styles.start, styles.filled)} onClick={walletState.address ? gotoOverview : login}>Start now</a>
      </div>
      <Steps login={login} />
    </div>
  )
} 

export default walletContainer(Main)