import React, {useContext, useEffect, useState} from 'react';

import hash from 'assets/hash.png';
import krosscoin from 'assets/krosscoin.png';
import usdt from 'assets/usdt.svg';
import logo from 'assets/logo.png';
import Balances from 'component/Balances/Balances';
import ColorModeSwitcher from 'component/ColorModeSwitcher/ColorModeSwitcher';
import Header from 'component/Header/Header';
import MenuButton from 'component/MenuButton/MenuButton';
import ThemeContext from 'context/UserContext';
import Account from 'pages/Account/Account';
import Email from 'pages/Email/Email';
import File from 'pages/File/File';
import MassSend from 'pages/MassSend/MassSend';
import Mutual from 'pages/Mutual/Mutual';
import Overview from 'pages/Overview/Overview';
import Receive from 'pages/Receive/Receive';
import Send from 'pages/Send/Send';
import VerificationExplorer from 'pages/VerificationExplorer/VerificationExplorer';
import walletContainer from 'redux/containers/wallet'
import WavesUtils from 'utils/waves'
import styles from './Main.module.scss';

function Main({walletState, walletActions, match}) {
  const {theme, setTheme, activeMenu, setActiveMenu} = useContext(ThemeContext);
  const [isHamburgerOpen, openHamburger] = useState(false);

  const openMenu = (menuItem) => {
    setActiveMenu(menuItem);
    openHamburger(false);
  }

  useEffect(() => {
    let interval = -1
    if(walletState.address) {
      const proc = () => {
        WavesUtils.getBalance(walletActions.setBalance, walletActions.lockWallet)
      }
      proc()
      interval = setInterval(proc, 10000)
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

  useEffect(() => {
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({pageLanguage: 'en', layout: 0}, 'google_translate_element')
    }
    setTimeout(() => {
      googleTranslateElementInit();
    }, 2000);
  }, []);

  const [query, setQuery] = useState('');
  useEffect(() => {
    if(match.path === '/explorer') {
      setActiveMenu('VERIFICATION')
    }
    if(match.path === '/explorer/:txid') {
      setActiveMenu('VERIFICATION')
      setQuery(match.params.txid)
    }
  }, [setActiveMenu, setQuery, match]);
  
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
          <MenuButton active={activeMenu === 'STAKE'} onClick={() => openMenu('STAKE')}>Stake n Earn Waves Tokens</MenuButton>
          <MenuButton active={activeMenu === 'VERIFICATION'} onClick={() => openMenu('VERIFICATION')}>Verification Explorer</MenuButton>
          <MenuButton active={!activeMenu} onClick={() => openMenu('')}>Account</MenuButton>
          <ColorModeSwitcher theme={theme} setTheme={setTheme} className={styles.colorModeSwitcher} />

          <div className={styles.balances} style={{color: theme.hamburger}}>
            {walletState.address ? (
              <div className={styles.balance}>
                <span className={styles.title}>HASH Balance</span>
                <span className={styles.amount}>
                  <img src={hash} alt="logo" style={{height: 15}} />
                  {walletState.hash_balance}
                </span>
              </div>
            ) : null}
            {walletState.address ? (
              <div className={styles.balance}>
                <span className={styles.title}>RKMT Balance</span>
                <span className={styles.amount}>
                  <img src={krosscoin} alt="logo" className={styles.iconGap} style={{height: 15}} />
                  {walletState.rkmt_balance}
                </span>
              </div>
            ) : null}
            {walletState.address ? (
              <div className={styles.balance}>
                <span className={styles.title}>USDT Balance</span>
                <span className={styles.amount}>
                  <img src={usdt} alt="logo" className={styles.iconGap} style={{height: 15}} />
                  {walletState.usdt_balance}
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
          <div id="google_translate_element"></div>
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
          walletState.address && activeMenu === 'RECEIVE'       ? <Receive /> :
          walletState.address && activeMenu === 'SEND'          ? <Send /> :
          walletState.address && activeMenu === 'MASS'          ? <MassSend /> :
          walletState.address && activeMenu === 'FILE'          ? <File /> :
          walletState.address && activeMenu === 'EMAIL'         ? <Email /> :
          walletState.address && activeMenu === 'MUTUAL'        ? <Mutual /> :
          walletState.address && activeMenu === 'STAKE'         ? <Mutual /> :
                                 activeMenu === 'VERIFICATION'  ? <VerificationExplorer query={query}/> :
                                                                  <Account />
        }
      </div>
    </div>
  )
}

export default walletContainer(Main)