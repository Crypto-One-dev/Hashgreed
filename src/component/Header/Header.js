import React, {useContext} from 'react';
import {GiHamburgerMenu} from 'react-icons/all';

import logo from 'assets/logo.png';
import ThemeContext from 'context/UserContext';
import styles from './Header.module.scss';

const Header = ({openHamburger}) => {
  const {userInfo, theme} = useContext(ThemeContext);
  return (
    <div className={styles.header} style={{backgroundColor: theme.primaryBack}}>
      <GiHamburgerMenu className={styles.hamburger} onClick={() => openHamburger(true)} color={theme.hamburger}/>
      <div className={styles.logo}>
        <img src={logo} alt="logo" style={{height: 77}} />
        {
          userInfo && <div className={styles.amount} style={{color: theme.primaryText}}>{userInfo.address}</div>
        }
      </div>
      <div></div>
    </div>
  )
}

export default Header;