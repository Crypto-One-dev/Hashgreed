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
import Receive from 'pages/Receive/Receive';
import Send from 'pages/Send/Send';
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

  const [manageTokenShow, ShowManageToken] = useState(false);
  const toggleManageToken = () => {
    ShowManageToken(!manageTokenShow);
  }

  const [certificationToolsShow, ShowCertificationTools] = useState(false);
  const toggleCertificationTools = () => {
    ShowCertificationTools(!certificationToolsShow);
  }
  
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
          {
            walletState.address ?
              <>
                <MenuButton onClick={() => toggleManageToken()}>Manage Token</MenuButton>
                {
                  manageTokenShow ?
                    <>
                      <MenuButton active={activeMenu === 'RECEIVE'} sub={true} onClick={() => openMenu('RECEIVE')}>Receive</MenuButton>
                      <MenuButton active={activeMenu === 'SEND'} sub={true} onClick={() => openMenu('SEND')}>Send</MenuButton>
                      <MenuButton active={activeMenu === 'MASS'} sub={true} onClick={() => openMenu('MASS')}>Mass Send</MenuButton>
                    </>
                  :
                    null
                }
              </>
            :
              null
          }
          {
            walletState.address ?
              <>
                <MenuButton onClick={() => toggleCertificationTools()}>Certification Tools</MenuButton>
                {
                  certificationToolsShow ?
                    <>
                      <MenuButton active={activeMenu === 'FILE'} sub={true} onClick={() => openMenu('FILE')}>File Certification</MenuButton>
                      <MenuButton active={activeMenu === 'EMAIL'} sub={true} onClick={() => openMenu('EMAIL')}>Email Certification</MenuButton>
                      <MenuButton active={activeMenu === 'MUTUAL'} sub={true} onClick={() => openMenu('MUTUAL')}>Mutual Certification</MenuButton>
                    </>
                  :
                    null
                }
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
          walletState.address && activeMenu === 'OVERVIEW'      ? <Overview /> :
          walletState.address && activeMenu === 'CERTIFY'       ? <Certify /> :
          walletState.address && activeMenu === 'RECEIVE'       ? <Receive /> :
          walletState.address && activeMenu === 'SEND'          ? <Send /> :
                                 activeMenu === 'VERIFICATION'  ? <VerificationExplorer /> :
                                                                  <Account />
        }
      </div>
    </div>
  )
}

export default walletContainer(Main)