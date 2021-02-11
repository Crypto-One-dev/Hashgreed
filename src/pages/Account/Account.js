import React, {useContext, useState} from 'react';
import cx from 'classnames';
import {Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody} from '@chakra-ui/react';

import Step1 from 'assets/step1.svg';
import Step2 from 'assets/step2.svg';
import Step3 from 'assets/step3.svg';
import Text from 'component/Text/Text';
import WavesConfig from 'config/waves';
import ThemeContext from 'context/UserContext';
import walletContainer from 'redux/containers/wallet';
import WavesUtils from 'utils/waves'
import styles from './Account.module.scss';

function Account({walletState, walletActions}) {
  const {theme, setActiveMenu} = useContext(ThemeContext);
  const [isSignModalOpen, showSignModal] = useState(false);

  const onManageAccount = () => {
    window.open(WavesConfig.ACCOUNT_URL);
  }

  const onSign = () => {
    showSignModal(true);
  }

  const onSignMethod = (link) => {
    showSignModal(false);
    WavesUtils.unlockWallet(link, walletActions.unlockWallet, walletActions.lockWallet)
  }

  const onSwitchAccount = () => {
    walletActions.lockWallet();
    onSign();
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header} style={{backgroundColor: theme.primaryColor}}>FOLLOW THE STEPS TO USE OUR APPLICATION</div>
        <div className={styles.container}>
          <div className={cx(styles.item, walletState.address && styles.blur)} style={{backgroundColor: theme.itemBackground}}>
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
              disabled={walletState.address}
            >
              SIGN IN
            </Button>
          </div>
          <div className={cx(styles.item, !walletState.address && styles.blur)} style={{backgroundColor: theme.itemBackground}}>
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
              onClick={() => setActiveMenu('CERTIFY')}
              className={styles.clickable}
              style={{backgroundColor: theme.buttonBack}}
              disabled={!walletState.address}
            >
              CERTIFY NOW
            </Button>
            { walletState.address && <Button className={styles.switchAccount} onClick={onSwitchAccount}>SWITCH ACCOUNT</Button>}
          </div>
          <div className={cx(styles.item, !walletState.address && styles.blur)} style={{backgroundColor: theme.itemBackground}}>
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
              disabled={!walletState.address}
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
      <Modal closeOnOverlayClick={false} isCentered isOpen={isSignModalOpen} onClose={() => showSignModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} style={{display: 'flex', flexDirection: 'column'}}>
            <Button onClick={() => onSignMethod('SEED')} style={{margin: '10px 0'}}>Waves Exchange Seed</Button>
            <Button onClick={() => onSignMethod('CLOUD')} style={{margin: '10px 0'}}>Waves Exchange Email</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default walletContainer(Account);