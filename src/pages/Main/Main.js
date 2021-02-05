import React, {useContext, useState} from 'react';

import ThemeContext from 'context/UserContext';
import {ColorModeSwitcher} from 'component/ColorModeSwitcher/ColorModeSwitcher';
import styles from './Main.module.scss';
import logo from 'assets/logo.png';
import Header from 'component/Header/Header';
import MenuButton from 'component/MenuButton/MenuButton';
import Account from 'pages/Account/Account';
import VerificationExplorer from 'pages/VerificationExplorer/VerificationExplorer';

export default function Main() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [activeMenu, setActiveMenu] = useState(1);
  const [isHamburgerOpen, openHamburger] = useState(false);

  const openMenu = (menuItem) => {
    setActiveMenu(menuItem);
    openHamburger(false);
  }
  
  return (
    <div className={styles.main} style={{backgroundColor: theme.background}}>
      <Header openHamburger={openHamburger} />
      <div className={styles.leftPanel} style={{display: isHamburgerOpen ? 'flex' : 'none'}}>
        <div
          className={styles.menu}
          style={{backgroundColor: theme.itemBackground}}
        >
          <img src={logo} alt="logo" style={{height: 77}} />
          <MenuButton active={activeMenu === 0} onClick={() => openMenu(0)}>Verification Explorer</MenuButton>
          <MenuButton active={activeMenu === 1} onClick={() => openMenu(1)}>Account</MenuButton>
          <ColorModeSwitcher theme={theme} setTheme={setTheme} className={styles.colorModeSwitcher} />
        </div>
        <div
          className={styles.closemenu}
          onClick={() => openHamburger(false)}
        >
        </div>
      </div>
      <div className={styles.rightPanel} style={{background: theme.secondaryBack}}>
        {
          activeMenu === 0 ? <VerificationExplorer /> : null
        }
        {
          activeMenu === 1 ? <Account /> : null
        }
      </div>
    </div>
  )
}