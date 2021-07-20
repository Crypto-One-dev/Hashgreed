import React, {useContext} from 'react'

import {FaFacebookF, FaTelegram, FaTwitter} from 'react-icons/all'

import styles from './Footer.module.scss'
import Logo from 'assets/images/Footer.svg'
import {ThemeContext} from "context/ThemeContext";

import walletContainer from 'redux/containers/wallet'
import Pdf from 'assets/usecase.pdf';

function Footer({walletState, walletActions}) {
  const {theme} = useContext(ThemeContext);

  return (
    <div className={styles.footer} style={{backgroundColor: theme.footerBackground}}>
      <div className={styles.description}>
        Our application uses Waves Signer to connect your account and sign all transactions. To import an existing account, do it first at <a href="https://waves.exchange/">waves.exchange</a>. Our Web Application never has any access to your private key or secret seed words, all your accounts should be managed at <a href="https://waves.exchange/">waves.exchange</a>. Never enter your private key or secret seed words in any 3rd party application.
      </div>
      <div className={styles.logoNlink}>
        <div className={styles.logo}>
          <img src={Logo} alt="" />
        </div>
        <div className={styles.links}>
          <a href="https://clique.krosscoin.io/images/Terms-and-Conditions.pdf" target="_blank" rel="noreferrer">Terms of use</a>
          <a href="https://twitter.com/hashgreed" target="_blank" rel="noreferrer"><FaTwitter size='16px' /></a>
          <a href="https://facebook.com/krosscoin" target="_blank" rel="noreferrer"><FaFacebookF size='16px' /></a>
          <a href="https://t.me/krosscoin_kss" target="_blank" rel="noreferrer"><FaTelegram size='24px' /></a>
        </div>
      </div>
      <hr className={styles.border} />
      <div className={styles.linkNinfo}>
        <div className={styles.links}>
          <a href="/about"> About</a>
          <a href="/faq">FAQ</a>
          {/* <a  href={Pdf} target="_blank">Use Cases</a> */}
          <a  href="/usecase">Use Cases</a>
          <a href="/contact">Contacts</a>
        </div>
        <div>
          © 2021 Hashgreed. Powered by krosscoin | All rights reserved.
        </div>
      </div>
    </div>
  )
}
export default walletContainer(Footer)