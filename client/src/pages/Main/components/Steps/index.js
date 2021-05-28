import React, {useContext} from 'react'

import Step from '../Step'
import styles from './Steps.module.scss'
import Step1Logo from 'assets/images/Step1.png'
import Step2Logo from 'assets/images/Step2.png'
import Step3Logo from 'assets/images/Step3.png'

import walletContainer from 'redux/containers/wallet'
import {ThemeContext} from "context/ThemeContext";

const Step1Content = "Click on the SIGN IN buttonbelow and enter your password or create a new account if you don't have an account or multiple accounts they will be listed in the next screen. Select one to connect."
const Step2Content = "You're now connected and able to use the application. We recommend going to step 3 to make a backup for your account if you just created one."
const Step3Content = 'For every newly created account we recommend you to follow these steps. Click on "Manage accounts" below to access waves.exchange and get your account recovery seed. Write it down and keep it safe.'

function Steps({walletState, login}) {
  const {theme} = useContext(ThemeContext);

  return (
    <div className={styles.steps}>
      <div className={styles.header} style={{color: theme.primaryText}}>FOLLOW THE STEPS TO USE OUR APPLICATION</div>
      <div className={styles.body}>
        <Step index={1} title={'Connection'} image={Step1Logo} content={Step1Content} isDisabled={walletState.address} login={login} />
        <Step index={2} title={'You are ready!'} image={Step2Logo} content={Step2Content} isDisabled={!walletState.address}  login={login}/>
        <Step index={3} title={'Backup Account(s)'} image={Step3Logo} content={Step3Content} isDisabled={!walletState.address} />
      </div>
    </div>
  )
}

export default walletContainer(Steps)