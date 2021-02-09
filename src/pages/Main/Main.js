import React, {useContext, useEffect, useState} from 'react';
import {FaCertificate} from "react-icons/all";

import logo from 'assets/logo.png';
import Balances from 'component/Balances/Balances';
import ColorModeSwitcher from 'component/ColorModeSwitcher/ColorModeSwitcher';
import Header from 'component/Header/Header';
import MenuButton from 'component/MenuButton/MenuButton';
import ThemeContext from 'context/UserContext';
import Account from 'pages/Account/Account';
import Certify from 'pages/Certify/Certify';
import Overview from 'pages/Overview/Overview';
import VerificationExplorer from 'pages/VerificationExplorer/VerificationExplorer';
import walletContainer from 'redux/containers/wallet'
import WavesUtils from 'utils/waves'
import styles from './Main.module.scss';

function Main({walletState, walletActions}) {
  const {theme, setTheme, activeMenu, setActiveMenu} = useContext(ThemeContext);
  const [isHamburgerOpen, openHamburger] = useState(false);

  const openMenu = (menuItem) => {
    setActiveMenu(menuItem);
    openHamburger(false);
  }

  useEffect(() => {
    let interval = -1
    if(walletState.address) {
      interval = setInterval(() => {
        WavesUtils.getBalance(walletActions.setBalance, walletActions.lockWallet)
      }, 1000)
    }
  
    return () => {
      if(interval > -1) {
        clearInterval(interval)
      }
    }
  }, [walletState.address, walletActions])
  
  return (
    <div className={styles.main} style={{backgroundColor: theme.background}}>
      <Header openHamburger={openHamburger} />
      <div className={styles.leftPanel} style={{display: isHamburgerOpen ? 'flex' : 'none'}}>
        <div
          className={styles.menu}
          style={{backgroundColor: theme.itemBackground}}
        >
          <img src={logo} alt="logo" className={styles.logo} />
          {
            walletState.address ?
              <>
                <MenuButton active={activeMenu === 'OVERVIEW'} onClick={() => openMenu('OVERVIEW')}>Overview</MenuButton>
              </>
            :
              null
          }
          <MenuButton active={activeMenu === 'VERIFICATION'} onClick={() => openMenu('VERIFICATION')}>Verification Explorer</MenuButton>
          <MenuButton active={!activeMenu} onClick={() => openMenu('')}>Account</MenuButton>
          <ColorModeSwitcher theme={theme} setTheme={setTheme} className={styles.colorModeSwitcher} />

          <div className={styles.balances} style={{color: theme.hamburger}}>
            {walletState.address ? (
              <div className={styles.balance}>
                <span className={styles.title}>CREDIT</span>
                <span className={styles.amount}>
                  <FaCertificate className={styles.creditIcon}/>
                  {walletState.credit}
                </span>
              </div>
            ) : null}
            {walletState.address ? (
              <div className={styles.balance}>
                <span className={styles.title}>HASH Balance</span>
                <span className={styles.amount}>
                  <img src={logo} alt="logo" style={{height: 15}} />
                  {walletState.token_balance}
                </span>
              </div>
            ) : null}
            {walletState.address ? (
              <div className={styles.balance}>
                <span className={styles.title}>WAVES Balance</span>
                <span className={styles.amount}>
                  <div className={styles.wavesIcon}></div>
                  {walletState.waves_balance}
                </span>
              </div>
            ) : null}
          </div>
        </div>
        <div
          className={styles.closemenu}
          onClick={() => openHamburger(false)}
        >
        </div>
      </div>
      <div className={styles.rightPanel} style={{background: theme.secondaryBack}}>
        {
          walletState.address ? <Balances /> : null
        }
        {
          activeMenu === 'OVERVIEW' ? <Overview /> : null
        }
        {
          activeMenu === 'CERTIFY' ? <Certify /> : null
        }
        {
          activeMenu === 'VERIFICATION' ? <VerificationExplorer /> : null
        }
        {
          !activeMenu ? <Account /> : null
        }
      </div>
    </div>
  )
}

export default walletContainer(Main)