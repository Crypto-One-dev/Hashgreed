import React, {useCallback, useContext, useEffect, useRef} from 'react'
import cx from 'classnames'
import {useHistory} from 'react-router-dom'
import {FaBars} from 'react-icons/all'
import {useDisclosure} from '@chakra-ui/react'

import Drawer from '../Drawer'
import styles from './Header.module.scss'
import Logo from 'assets/images/Header.svg'
import {ThemeContext} from "context/ThemeContext";
import ColorModeSwitcher from 'components/ColorModeSwitcher/ColorModeSwitcher'
import Pdf from 'assets/usecase.pdf';

import walletContainer from 'redux/containers/wallet'

function Header({walletState, walletActions}) {
  const history = useHistory()
  const account = useCallback(() => history.push('/'), [history])
  const { isOpen, onClose, onOpen } = useDisclosure()
  const {theme, setTheme} = useContext(ThemeContext);
  const ref = useRef(null)
  
  const verification = useCallback(() => history.push('/explorer'), [history])
  useEffect(() => {
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({pageLanguage: 'en', layout: 0}, 'google_translate_element')
    }
    setTimeout(() => {
      googleTranslateElementInit();
    }, 2000);
  }, [ref.current]);

  return (
    <div className={styles.header}  style={{backgroundColor: theme.balancesBack, color: theme.primaryText}} ref={ref}>
      <div className={styles.image} >
        <FaBars className={styles.drawer} onClick={() => onOpen()}/>
        <img src={Logo} alt="" />
      </div>
      <div className={styles.about} style={{color: theme.commentText}}>
        <a href="/about">About</a>
        <a href="/faq">F.A.Q.</a>
        <a href={Pdf} target="_blank">Use Cases</a>
      </div>
      <div className={styles.menu} >
        <ColorModeSwitcher theme={theme} setTheme={setTheme} className={styles.colorModeSwitcher} />
        <a className={styles.explorer} onClick={walletState.address != null? verification : null} style={{color: theme.verificationColor}}>Certification Explorer</a>
        <a className={cx(styles.account, styles.filled)} onClick={account} style={{backgroundColor: theme.buttonBack}}>Account</a>
      </div>
      <div>
        <a className={styles.lang} style={{color: theme.commentText}} id="google_translate_element"></a>
        <FaBars className={styles.drawer} onClick={() => onOpen()}/>
      </div>
      <Drawer isOpen={isOpen} onClose={onClose} />
    </div>
  )
}
export default walletContainer(Header)