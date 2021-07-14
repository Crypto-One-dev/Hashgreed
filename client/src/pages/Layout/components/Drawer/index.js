import React, {useCallback, useEffect, useState, useContext} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@chakra-ui/react'
import cx from 'classnames'

import HASH from 'assets/icons/HASH.svg'
import RKMT from 'assets/icons/RKMT.svg'
import USDT from 'assets/icons/USDT.svg'
import WAVES from 'assets/icons/WAVES.svg'
import styles from './Drawer.module.scss'
import {ThemeContext} from 'context/ThemeContext';
import ColorModeSwitcher from 'components/ColorModeSwitcher/ColorModeSwitcher'

import walletContainer from 'redux/containers/wallet'

function HashgreedDrawer({isOpen, onClose, walletState}) {
  const location  = useLocation()
  const path = location.pathname.split('/')
  
  const [activeMenu, setActiveMenu] = useState('')
  const [activeSubMenu, setActiveSubMenu] = useState('')

  const history = useHistory()
  const gotoPage = useCallback((link) => history.push(link), [history])

  const {theme, setTheme} = useContext(ThemeContext);

  useEffect(() => {
    if(isOpen) { // onOpen
      setActiveMenu(path[1])
    }
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({pageLanguage: 'en', layout: 0}, 'google_translate_element')
      console.log( new window.google.translate.TranslateElement({pageLanguage: 'en', layout: 0}, 'google_translate_element'))
    }
    setTimeout(() => {
      googleTranslateElementInit();
    }, 2000);
  }, [isOpen,path])

  const openSubMenu = (active) => {
    if(active === activeMenu) {
      setActiveMenu('')
    } else {
      setActiveMenu(active)
    }
  }

  const openAuctionSubMenu = (active) => {
    if(active === activeSubMenu) {
      setActiveSubMenu('')
    } else {
      setActiveSubMenu(active)
    }
  }

  const AuthRoutes = () => {
    return (
      <>
        <div className={styles.link} onClick={() => { onClose(); gotoPage('/overview');}}>Overview</div>
        <hr className={styles.hr}/>
        <Popover>
          <PopoverTrigger>
            <div className={styles.link}>Manage Token</div>
          </PopoverTrigger>
          <PopoverContent bg='rgba(0, 4, 81, 0.4)' maxWidth='90%' marginLeft='7%'>
            <div className={styles.submenu}>
              <div className={styles.subitem} onClick={() => { onClose(); gotoPage('/manage/receive');}}>Receive</div>
              <div className={styles.subitem} onClick={() => { onClose(); gotoPage('/manage/send');}}>Send</div>
              <div className={styles.subitem} onClick={() => { onClose(); gotoPage('/manage/mass');}}>Mass Send</div>
            </div>
          </PopoverContent>
        </Popover>
        <hr className={styles.hr}/>
        <Popover>
          <PopoverTrigger>
            <div className={styles.link}>Certification Tools</div>
          </PopoverTrigger>
          <PopoverContent bg='rgba(0, 4, 81, 0.4)' maxWidth='90%' marginLeft='7%'>
            <div className={styles.submenu}>
              <div className={styles.subitem} onClick={() => { onClose(); gotoPage('/certify/file');}}>File Certification</div>
              <div className={styles.subitem} onClick={() => { onClose(); gotoPage('/certify/email');}}>Email Certification</div>
              <div className={styles.subitem} onClick={() => { onClose(); gotoPage('/certify/mutual');}}>Mutual Certification</div>
            </div>
          </PopoverContent>
        </Popover>
        <hr className={styles.hr}/>
        <Popover>
          <PopoverTrigger>
            <div className={styles.link}>NFT Auctions</div>
          </PopoverTrigger>
          <PopoverContent bg='rgba(0, 4, 81, 0.4)' maxWidth='90%' marginLeft='7%'>
            <div className={styles.submenu}>
            <Popover>
              <PopoverTrigger>
                <div className={styles.subitem}>Art NFTs</div>
              </PopoverTrigger>
              <PopoverContent bg='rgba(0, 4, 81, 0.4)' maxWidth='70%'> 
                <div className={styles.submenu}>
                  <div className={styles.subitem} onClick={() => { onClose(); gotoPage('/auction/artnfts/create');}}>Create</div>
                  <div className={styles.subitem} onClick={() => { onClose(); gotoPage('/auction/artnfts/explorer');}}>Explore</div>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger>
                <div className={styles.subitem}>HashDeals</div>
              </PopoverTrigger>
              <PopoverContent bg='rgba(0, 4, 81, 0.4)' maxWidth='70%'> 
                <div className={styles.submenu}>
                  <div className={styles.subitem} onClick={() => { onClose(); gotoPage('/auction/hashdealz/create');}}>Create</div>
                  <div className={styles.subitem} onClick={() => { onClose(); gotoPage('/auction/hashdealz/explorer');}}>Explore</div>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger>
                <div className={styles.subitem}>Sport NFTs</div>
              </PopoverTrigger>
              <PopoverContent bg='rgba(0, 4, 81, 0.4)' maxWidth='70%'> 
                <div className={styles.submenu}>
                  <div className={styles.subitem} onClick={() => { onClose(); gotoPage('/auction/sportnfts/create');}}>Create</div>
                  <div className={styles.subitem} onClick={() => { onClose(); gotoPage('/auction/sportnfts/explorer');}}>Explore</div>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger>
                <div className={styles.subitem}>Music/Events NFTs</div>
              </PopoverTrigger>
              <PopoverContent bg='rgba(0, 4, 81, 0.4)' maxWidth='70%'> 
                <div className={styles.submenu}>
                  <div className={styles.subitem} onClick={() => { onClose(); gotoPage('/auction/musiceventsnfts/create');}}>Create</div>
                  <div className={styles.subitem} onClick={() => { onClose(); gotoPage('/auction/musiceventsnfts/explorer');}}>Explore</div>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger>
                <div className={styles.subitem}>Game NFTs</div>
              </PopoverTrigger>
              <PopoverContent bg='rgba(0, 4, 81, 0.4)' maxWidth='70%'> 
                <div className={styles.submenu}>
                  <div className={styles.subitem} onClick={() => { onClose(); gotoPage('/auction/gamenfts/create');}}>Create</div>
                  <div className={styles.subitem} onClick={() => { onClose(); gotoPage('/auction/gamenfts/explorer');}}>Explore</div>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger>
                <div className={styles.subitem}>Services NFTs</div>
              </PopoverTrigger>
              <PopoverContent bg='rgba(0, 4, 81, 0.4)' maxWidth='70%'> 
                <div className={styles.submenu}>
                  <div className={styles.subitem} onClick={() => { onClose(); gotoPage('/auction/servicesnfts/create');}}>Create</div>
                  <div className={styles.subitem} onClick={() => { onClose(); gotoPage('/auction/servicesnfts/explorer');}}>Explore</div>
                </div>
              </PopoverContent>
            </Popover>
            </div>
          </PopoverContent>
        </Popover>
        <hr className={styles.hr}/>
        <Popover>
          <PopoverTrigger>
            <div className={styles.link}>DeFi</div>
          </PopoverTrigger>
          <PopoverContent bg='rgba(0, 4, 81, 0.4)' maxWidth='90%' marginLeft='7%'>
            <div className={styles.submenu}>
              <div className={styles.subitem} onClick={() => { onClose(); gotoPage('/defi/stake');}}>Stake</div>
              <div className={styles.subitem} onClick={() => { onClose(); gotoPage('/defi/loan');}}>Loans</div>
              <div className={styles.subitem} onClick={() => { onClose(); gotoPage('/auction/create');}}>
                <div>Forex</div>
                <div className={styles.subcomment}>Coming soon</div>
                </div>
              <div className={styles.subitem}>
                <div>Freelance</div>
                <div className={styles.subcomment}>Coming soon</div>
              </div>
              <div className={styles.subitem}>
                <div>Escrow</div>
                <div className={styles.subcomment}>Coming soon</div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <hr className={styles.hr}/>
      </>
    )
  }

  const Balance = ({title, icon, value}) => {
    return (
      <div className={styles.balance}>
        <span>{title}</span>
        <div className={styles.info}>
          <img src={icon} alt="" />
          <div className={styles.value}>{isNaN(value) ? value : parseFloat(value).toFixed(4)}</div>
        </div>
      </div>
    )
  }
  const Balances = () => {
    return (
      <>
        <Balance title={'HASH Balance'} icon={HASH} value={walletState.hash_balance} />
        <Balance title={'RKMT Balance'} icon={RKMT} value={walletState.rkmt_balance} />
        <Balance title={'USDT Balance'} icon={USDT} value={walletState.usdt_balance} />
        <Balance title={'WAVES Balance'} icon={WAVES} value={walletState.waves_balance} />
        <Balance title={'Your Address'} value={walletState.address} />
      </>
    )
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      style={{width: '100%'}}
    >
      <DrawerOverlay />
      <DrawerContent style={{backgroundColor: theme.menuBackground, color:'white', opacity:'0.9', width: '100%', maxWidth: '500px'}}>
        <DrawerCloseButton marginRight="15px"/>
        <DrawerBody>
          <div className={styles.routes}>
            <div className={styles.link} onClick={() => { onClose(); gotoPage('/');}}>Account</div>
            <hr className={styles.hr}/>
            <div className={styles.link} onClick={() => { onClose(); gotoPage('/explorer');}}>Cerification Explorer</div>
            <hr className={styles.hr}/>
            {walletState.address && <AuthRoutes />}
            <div className={styles.link} onClick={() => { onClose(); gotoPage('/explorer');}}>About</div>
            <hr className={styles.hr}/>
            <div className={styles.link} onClick={() => { onClose(); gotoPage('/explorer');}}>F.A.Q.</div>
            <hr className={styles.hr}/>
            <div className={styles.link} onClick={() => { onClose(); gotoPage('/explorer');}}>Use Case</div>
            <hr className={styles.hr}/>
          </div>
          <ColorModeSwitcher theme={theme} setTheme={setTheme} className={styles.colorModeSwitcher} />
          <div className={styles.translate} id="google_translate_element"></div>
          <div className={styles.balances}>
            {walletState.address && <Balances />}
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default walletContainer(HashgreedDrawer)