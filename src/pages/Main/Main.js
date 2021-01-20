import React, {useContext, useState} from 'react';

import ThemeContext from 'context/UserContext';
import {ColorModeSwitcher} from 'component/ColorModeSwitcher';
import styles from './Main.module.scss';
import logo from 'assets/logo.png';
import MenuButton from 'component/MenuButton/MenuButton';
import Account from 'pages/Account/Account';
import VerificationExplorer from 'pages/VerificationExplorer/VerificationExplorer';

export default function Main() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [activeMenu, setActiveMenu] = useState(1);

  
  return (
    <div className={styles.main} style={{backgroundColor: theme.background}}>
      <div className={styles.leftPanel} style={{backgroundColor: theme.itemBackground}}>
        <img src={logo} alt="logo" style={{width: 200}} />
        <MenuButton active={activeMenu === 0} onClick={() => setActiveMenu(0)}>Verification Explorer</MenuButton>
        <MenuButton active={activeMenu === 1} onClick={() => setActiveMenu(1)}>Account</MenuButton>
        <ColorModeSwitcher theme={theme} setTheme={setTheme} className={styles.colorModeSwitcher} />
      </div>
      {
        activeMenu === 0 ? <VerificationExplorer /> : <Account />
      }
    </div>
  )
}