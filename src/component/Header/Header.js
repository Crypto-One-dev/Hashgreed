import React, {useContext} from 'react';
import {GiHamburgerMenu} from 'react-icons/all';

import logo from 'assets/logo.png';
import ThemeContext from 'context/UserContext';
import walletContainer from 'redux/containers/wallet';
import styles from './Header.module.scss';

const Header = ({openHamburger, walletState}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <div className={styles.header} style={{backgroundColor: theme.primaryBack}}>
      <GiHamburgerMenu className={styles.hamburger} onClick={() => openHamburger(true)} color={theme.hamburger}/>
      <div className={styles.logo}>
        <img src={logo} alt="logo" style={{height: 77}} />
        {
          walletState.address && <div className={styles.amount} style={{color: theme.primaryText}}>{walletState.address}</div>
        }
      </div>
      <div></div>
    </div>
  )
}

export default walletContainer(Header);