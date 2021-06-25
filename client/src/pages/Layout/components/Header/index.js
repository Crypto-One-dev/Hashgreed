import React, {useCallback, useContext} from 'react'
import cx from 'classnames'
import {useHistory} from 'react-router-dom'
import {FaBars} from 'react-icons/all'
import {useDisclosure} from '@chakra-ui/react'

import Drawer from '../Drawer'
import styles from './Header.module.scss'
import Logo from 'assets/images/Header.svg'
import {ThemeContext} from "context/ThemeContext";
import ColorModeSwitcher from 'components/ColorModeSwitcher/ColorModeSwitcher'

import walletContainer from 'redux/containers/wallet'

function Header({walletState, walletActions}) {
  const history = useHistory()
  const account = useCallback(() => history.push('/'), [history])
  const { isOpen, onClose, onOpen } = useDisclosure()
  const {theme, setTheme} = useContext(ThemeContext);
  
  const verification = useCallback(() => history.push('/explorer'), [history])
  

  return (
    <div className={styles.header}  style={{backgroundColor: theme.balancesBack, color: theme.primaryText}}>
      <div className={styles.image} >
        <FaBars className={styles.drawer} onClick={() => onOpen()}/>
        <img src={Logo} alt="" />
      </div>
      <div className={styles.about} style={{color: theme.commentText}}>
        <a>About</a>
        <a>F.A.Q.</a>
        <a>UseCase</a>
      </div>
      <div className={styles.menu} >
        <ColorModeSwitcher theme={theme} setTheme={setTheme} className={styles.colorModeSwitcher} />
        <a className={styles.explorer} onClick={walletState.address != null? verification : null} style={{color: theme.verificationColor}}>Cerification Explorer</a>
        <a className={cx(styles.account, styles.filled)} onClick={account} style={{backgroundColor: theme.buttonBack}}>Account</a>
        <a className={styles.lang} style={{color: theme.commentText}}>EN</a>
      </div>
      <Drawer isOpen={isOpen} onClose={onClose} />
    </div>
  )
}
export default walletContainer(Header)