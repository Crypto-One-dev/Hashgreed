import React, {useContext} from 'react'

import {FaFacebookF, FaGooglePlusG, FaTwitter} from 'react-icons/all'

import styles from './Footer.module.scss'
import Logo from 'assets/images/Footer.svg'
import {ThemeContext} from "context/ThemeContext";

import walletContainer from 'redux/containers/wallet'

function Footer({walletState, walletActions}) {
  const {theme} = useContext(ThemeContext);

  return (
    <div className={styles.footer} style={{backgroundColor: theme.footerBackground}}>
      <div className={styles.description}>
        Our application is using Waves Signer to connect your account and sign all transactions. To import an existing account, add it first in <a href="https://waves.exchange">waves.exchange</a>. Our Web Application will never have any access to your private key or secret seed, all your accounts should be managed at <a href="https://waves.exchange">waves.exchange</a>. Never enter your private key or secret seed in any 3rd party application.
      </div>
      <div className={styles.logoNlink}>
        <div>
          <img src={Logo} alt="" />
        </div>
        <div className={styles.links}>
          <a>Privacy Policy</a>
          <a>Terms</a>
          <a><FaTwitter size='16px' /></a>
          <a><FaFacebookF size='16px' /></a>
          <a><FaGooglePlusG size='24px' /></a>
        </div>
      </div>
      <hr className={styles.border} />
      <div className={styles.linkNinfo}>
        <div className={styles.links}>
          <a>About</a>
          <a>FAQ</a>
          <a>Use Case</a>
          <a>Contacts</a>
        </div>
        <div>
          © 2021 Hsahgreed. Powered by krosscoin | All rights reserved.
        </div>
      </div>
    </div>
  )
}
export default walletContainer(Footer)