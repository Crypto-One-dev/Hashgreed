import React, {useContext} from 'react'

import Step from '../Step'
import styles from './Steps.module.scss'
import Step1Logo from 'assets/images/Step1.png'
import Step2Logo from 'assets/images/Step2.png'
import Step3Logo from 'assets/images/Step3.png'

import walletContainer from 'redux/containers/wallet'
import {ThemeContext} from "context/ThemeContext";

const Step1Content = "Click on the SIGN IN button, enter your password or create a new account. If you have multiple accounts, they will be shown to you and you can select one to connect."
const Step2Content = "Congratulations! You are connected and ready to Hashgreed. We recommend going to step 3 to confirm backup of your account if it’s a new one."
const Step3Content = 'If you just created a new account, kindly click on \"Manage Accounts\" below to access your waves.exchange account and retrieve your seed words. Write it and keep it safe.'

function Steps({walletState, login}) {
  const {theme} = useContext(ThemeContext);

  return (
    <div className={styles.steps}>
      <div className={styles.header} style={{color: theme.primaryText}}>FOLLOW THE STEPS TO USE <br/> OUR APPLICATION</div>
      <div className={styles.body}>
        <Step index={1} title={'Connection'} image={Step1Logo} content={Step1Content} isDisabled={walletState.address} login={login} />
        <Step index={2} title={'You are ready!'} image={Step2Logo} content={Step2Content} isDisabled={!walletState.address}  login={login}/>
        <Step index={3} title={'Backup Account(s)'} image={Step3Logo} content={Step3Content} isDisabled={!walletState.address} />
      </div>
    </div>
  )
}

export default walletContainer(Steps)