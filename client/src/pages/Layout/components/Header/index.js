import React, {useCallback} from 'react'
import {Redirect} from 'react-router-dom'
import cx from 'classnames'
import {useHistory} from 'react-router-dom'
import {FaBars} from 'react-icons/all'
import {useDisclosure} from '@chakra-ui/react'

import Drawer from '../Drawer'
import styles from './Header.module.scss'
import Logo from 'assets/images/Header.svg'

import walletContainer from 'redux/containers/wallet'

function Header({walletState, walletActions}) {
  const history = useHistory()
  const account = useCallback(() => history.push('/'), [history])
  const { isOpen, onClose, onOpen } = useDisclosure()
  
  const verification = useCallback(() => history.push('/explorer'), [history])
  

  return (
    <div className={styles.header}>
      <div className={styles.image}>
        <FaBars className={styles.drawer} onClick={() => onOpen()}/>
        <img src={Logo} alt="" />
      </div>
      <div className={styles.about}>
        <a>About</a>
        <a>F.A.Q.</a>
        <a>UseCase</a>
      </div>
      <div className={styles.menu} >
        <a className={styles.explorer} onClick={walletState.address != null? verification : null}>Verification Explorer</a>
        <a className={cx(styles.account, styles.filled)} onClick={account}>Account</a>
        <a className={styles.lang}>EN</a>
      </div>
      <Drawer isOpen={isOpen} onClose={onClose} />
    </div>
  )
}
export default walletContainer(Header)