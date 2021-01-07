import React from 'react';
import cx from 'classnames';
import { Button } from '@chakra-ui/react';

import {ColorModeSwitcher} from 'component/ColorModeSwitcher';
import styles from './Main.module.scss';
import {ReactComponent as Step1} from 'assets/step1.svg';
import {ReactComponent as Step2} from 'assets/step2.svg';
import {ReactComponent as Step3} from 'assets/step3.svg';

export default function Main() {
  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.header}>FOLLOW THE STEPS TO USE OUR APPLICATION</div>
        <ColorModeSwitcher />
        <div className={styles.container}>
          <div className={styles.item}>
            <div className={styles.itemMain}>
              <Step1 width="100" height="100" />
              <div className={styles.stepText}>Step1:</div>
              <div className={styles.stepTitle}>Connection</div>
              <div className={styles.stepDescription}>
                Click on the <span className={styles.boldText}>SIGN IN</span> button below and enter your password or create a new account if you don't have one yet. If you already have an account or multiple accounts they will be listed in the next screen. Select one to connect.
              </div>
            </div>
            <Button>SIGN IN</Button>
          </div>
          <div className={cx(styles.item, styles.blur)}>
            <div className={styles.itemMain}>
              <Step2 width="100" height="100" />
              <div className={styles.stepText}>Step2:</div>
              <div className={styles.stepTitle}>You are ready!</div>
              <div className={styles.stepDescription}>
                You're now connected and able to <span className={styles.boldText}>use the application.</span> We recommend <span className={styles.boldText}>going to step 3</span> to make a backup for your account if you just created one.
              </div>
            </div>
            <Button disabled>CERTIFY NOW</Button>
          </div>
          <div className={cx(styles.item, styles.blur)}>
            <div className={styles.itemMain}>
              <Step3 width="100" height="100" />
              <div className={styles.stepText}>Step3:</div>
              <div className={styles.stepTitle}>Backup Account(s)</div>
              <div className={styles.stepDescription}>
                For every newly created account we recommend you to follow these steps. Click on "Manage accounts" below to access <span className={styles.boldText}>waves.exchange</span> and get your account recovery seed. Write it down and keep it safe.
              </div>
            </div>
            <Button disabled>MANAGE ACCOUNTS</Button>
          </div>
        </div>
        <div className={styles.bottomText}>
          <div className={styles.text}>
            Our application is using Waves Signer to connect your account and sign all transactions.
          </div>
          <div className={styles.text}>
            To import an existing account, add it first in <span className={styles.primaryText}>waves.exchange</span>
          </div>
          <div className={styles.text}>
            Our Web Application will never have any access to your private key or secret seed, all your accounts should be managed at <span className={styles.primaryText}>waves.exchange</span>. Never enter your private key or secret seed in any 3rd party application.
          </div>
        </div>
      </div>
    </div>
  )
}