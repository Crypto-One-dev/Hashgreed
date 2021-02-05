import React, {useContext} from 'react';
import cx from 'classnames';
import {Button} from '@chakra-ui/react';
import {Signer} from '@waves/signer';
import Provider from '@waves.exchange/provider-web';
import {Link as ReactRouterLink} from 'react-router-dom';

import ThemeContext from 'context/UserContext';
import Text from 'component/Text/Text';
import Step1 from 'assets/step1.svg';
import Step2 from 'assets/step2.svg';
import Step3 from 'assets/step3.svg';
import styles from './Account.module.scss';

export default function Account() {
  const {theme, userInfo, setUserInfo} = useContext(ThemeContext);

  const onSign = async () => {
    const signer = new Signer({
      // Specify URL of the node on Testnet
      NODE_URL: 'https://nodes.wavesnodes.com'
    });
    signer.setProvider(new Provider('https://waves.exchange/signer/'))
    const user = await signer.login();
    const balances = await signer.getBalance();
    console.log('balance', balances)
    console.log('user', user)
    setUserInfo({...user, balances});
  }

  const onManageAccount = () => {
    window.open('https://waves.exchange/sign-in');
  }

  const onSwitchAccount = () => {
    setUserInfo({});
    onSign();
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header} style={{backgroundColor: theme.primaryColor}}>FOLLOW THE STEPS TO USE OUR APPLICATION</div>
      <div className={styles.container}>
        <div className={cx(styles.item, userInfo.address && styles.blur)} style={{backgroundColor: theme.itemBackground}}>
          <div className={styles.itemMain}>
            <div className={styles.imgWrapper} style={{backgroundColor: theme.imgWrapper, color: theme.primaryText}}>
              <img src={Step1} alt="STEP1" />
            </div>
            <Text className={styles.stepText} style={{color: theme.highlightText}}>STEP 1:</Text>
            <Text className={styles.stepTitle} style={{color: theme.primaryText}}>Connection</Text>
            <Text className={styles.stepDescription} style={{color: theme.primaryText}}>
              Click on the <span className={styles.boldText} style={{color: theme.highlightText}}>SIGN IN</span> button below and enter your password or create a new account if you don't have one yet. If you already have an account or multiple accounts they will be listed in the next screen. Select one to connect.
            </Text>
          </div>
          <Button
            onClick={onSign}
            className={styles.clickable}
            style={{backgroundColor: theme.buttonBack}}
            disabled={userInfo.address}
          >
            SIGN IN
          </Button>
        </div>
        <div className={cx(styles.item, !userInfo.address && styles.blur)} style={{backgroundColor: theme.itemBackground}}>
          <div className={styles.itemMain}>
            <div className={styles.imgWrapper} style={{backgroundColor: theme.imgWrapper, color: theme.primaryText}}>
              <img src={Step2} alt="STEP2" />
            </div>
            <Text className={styles.stepText} style={{color: theme.highlightText}}>STEP 2:</Text>
            <Text className={styles.stepTitle} style={{color: theme.primaryText}}>You are ready!</Text>
            <Text className={styles.stepDescription} style={{color: theme.primaryText}}>
              You're now connected and able to <span className={styles.boldText}>use the application.</span> We recommend <span className={styles.boldText}>going to step 3</span> to make a backup for your account if you just created one.
            </Text>
          </div>
          <Button
            as={ReactRouterLink}
            to={'/certify'}
            className={styles.clickable}
            style={{backgroundColor: theme.buttonBack}}
            disabled={!userInfo.address}
          >
            CERTIFY NOW
          </Button>
          { userInfo.address && <Button className={styles.switchAccount} onClick={onSwitchAccount}>SWITCH ACCOUNT</Button>}
        </div>
        <div className={cx(styles.item, !userInfo.address && styles.blur)} style={{backgroundColor: theme.itemBackground}}>
          <div className={styles.itemMain}>
            <div className={styles.imgWrapper} style={{backgroundColor: theme.imgWrapper, color: theme.primaryText}}>
              <img src={Step3} alt="STEP3" />
            </div>
            <Text className={styles.stepText} style={{color: theme.highlightText}}>STEP 3:</Text>
            <Text className={styles.stepTitle} style={{color: theme.primaryText}}>Backup Account(s)</Text>
            <Text className={styles.stepDescription} style={{color: theme.primaryText}}>
              For every newly created account we recommend you to follow these steps. Click on "Manage accounts" below to access <span className={styles.boldText}>waves.exchange</span> and get your account recovery seed. Write it down and keep it safe.
            </Text>
          </div>
          <Button
            onClick={onManageAccount}
            className={styles.clickable}
            style={{backgroundColor: theme.buttonBack}}
            disabled={!userInfo.address}
          >
            MANAGE ACCOUNTS
          </Button>
        </div>
      </div>
      <div className={styles.bottomText}>
        <Text className={styles.text} style={{color: theme.primaryText}}>
          Our application is using Waves Signer to connect your account and sign all transactions.
        </Text>
        <Text className={styles.text} style={{color: theme.primaryText}}>
          To import an existing account, add it first in <span className={styles.primaryText}>waves.exchange</span>
        </Text>
        <Text className={styles.text} style={{color: theme.primaryText}}>
          Our Web Application will never have any access to your private key or secret seed, all your accounts should be managed at <span className={styles.primaryText}>waves.exchange</span>. Never enter your private key or secret seed in any 3rd party application.
        </Text>
      </div>
    </div>
  )
}
