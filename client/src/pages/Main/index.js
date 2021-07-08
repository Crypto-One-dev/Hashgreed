import React, {useCallback, useRef, useContext} from 'react'
import cx from 'classnames'
import {useHistory} from 'react-router-dom'

import Steps from './components/Steps'
import styles from './Main.module.scss'

import walletContainer from 'redux/containers/wallet'
import WavesUtils from 'utils/waves'
import LoginModal from 'components/LoginModal/LoginModal'
import {ThemeContext} from "context/ThemeContext";

function Main({walletState, walletActions}) {
  const history = useHistory()
  const loginMdl = useRef(null)
  const {theme} = useContext(ThemeContext);

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
      <div className={styles.header} style={{color: theme.primaryText}}>
        Do more with smart<br />
        contracts and signatures!
      </div>
      <div className={styles.subheader} style={{color: theme.commentText}}>
        Our application uses Waves Signer tool to connect your account and sign all transactions.<br/>
        To import an existing acount, do it first at <a href="https://waves.exchange/" style={{color: theme.buttonBack}}>waves.exchange</a>
      </div> 
      <div className={styles.startnow}>
        <a className={cx(styles.start, styles.filled)} onClick={walletState.address ? gotoOverview : login} style={{backgroundColor: theme.buttonBack}}>Start now</a>
      </div>
      <Steps login={login} />
    </div>
  )
} 

export default walletContainer(Main)