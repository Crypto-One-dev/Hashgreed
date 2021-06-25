import React, {useCallback, useEffect, useState, useContext} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
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
  }, [isOpen])

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
        <div className={styles.link} onClick={() => gotoPage('/overview')}>Overview</div>
        <div className={cx(styles.navs, activeMenu === 'manage' ? styles.activemenu: null)}>
          <span onClick={() => openSubMenu('manage')}>Manage Token</span>
          <div className={cx(styles.link, activeMenu === 'manage' ? styles.opennav : styles.closenav)}>
            <div className={styles.link} onClick={() => gotoPage('/manage/receive')}>Receive</div>
            <div className={styles.link} onClick={() => gotoPage('/manage/send')}>Send</div>
            <div className={styles.link} onClick={() => gotoPage('/manage/mass')}>Mass Send</div>
          </div>
        </div>
        <div className={cx(styles.navs, activeMenu === 'certify' ? styles.activemenu: null)}>
          <span onClick={() => openSubMenu('certify')}>Certification Tools</span>
          <div className={cx(styles.link, activeMenu === 'certify' ? styles.opennav : styles.closenav)}>
            <div className={styles.link} onClick={() => gotoPage('/certify/file')}>File Certification</div>
            <div className={styles.link} onClick={() => gotoPage('/certify/email')}>Email Certification</div>
            <div className={styles.link} onClick={() => gotoPage('/certify/mutual')}>Mutual Certification</div>
          </div>
        </div>
        <div className={cx(styles.navs, activeMenu === 'auction' ? styles.activemenu: null)}>
          <span onClick={() => openSubMenu('auction')}>NFT Auctions</span>
          <div className={cx(styles.link, activeMenu === 'auction' ? styles.opennav : styles.closenav)}>
            <span onClick={() => openAuctionSubMenu('ArtNFTs')}>Art NFTs</span>
            <div className={cx(styles.subnavs, activeSubMenu === 'ArtNFTs' ? styles.opennav : styles.closenav)}>
              <div className={styles.sublink} onClick={() => gotoPage('/auction/artnfts/create')}>Create</div>
              <div className={styles.sublink} onClick={() => gotoPage('/auction/artnfts/explorer')}>Explore</div>
            </div>
            <span onClick={() => openAuctionSubMenu('HashDealz')}>HashDealz</span>
            <div className={cx(styles.subnavs, activeSubMenu === 'HashDealz' ? styles.opennav : styles.closenav)}>
              <div className={styles.sublink} onClick={() => gotoPage('/auction/hashdealz/create')}>Create</div>
              <div className={styles.sublink} onClick={() => gotoPage('/auction/hashdealz/explorer')}>Explore</div>
            </div>
            <span onClick={() => openAuctionSubMenu('SportNFTs')}>Sport NFTs</span>
            <div className={cx(styles.subnavs, activeSubMenu === 'SportNFTs' ? styles.opennav : styles.closenav)}>
              <div className={styles.sublink} onClick={() => gotoPage('/auction/artnfts/create')}>Create</div>
              <div className={styles.sublink} onClick={() => gotoPage('/auction/artnfts/explorer')}>Explore</div>
            </div>
            <span onClick={() => openAuctionSubMenu('MusicEventsNFTs')}>Music/Events NFTs</span>
            <div className={cx(styles.subnavs, activeSubMenu === 'MusicEventsNFTs' ? styles.opennav : styles.closenav)}>
              <div className={styles.sublink} onClick={() => gotoPage('/auction/musiceventsnfts/create')}>Create</div>
              <div className={styles.sublink} onClick={() => gotoPage('/auction/musiceventsnfts/explorer')}>Explore</div>
            </div>
            <span onClick={() => openAuctionSubMenu('GameNFTs')}>Game NFTs</span>
            <div className={cx(styles.subnavs, activeSubMenu === 'GameNFTs' ? styles.opennav : styles.closenav)}>
              <div className={styles.sublink} onClick={() => gotoPage('/auction/gamenfts/create')}>Create</div>
              <div className={styles.sublink} onClick={() => gotoPage('/auction/gamenfts/explorer')}>Explore</div>
            </div>
            <span onClick={() => openAuctionSubMenu('ForexNFTs')}>Forex NFTs</span>
            <div className={cx(styles.subnavs, activeSubMenu === 'ForexNFTs' ? styles.opennav : styles.closenav)}>
              <div className={styles.sublink} onClick={() => gotoPage('/auction/forexnfts/create')}>Create</div>
              <div className={styles.sublink} onClick={() => gotoPage('/auction/forexnfts/explorer')}>Explore</div>
            </div>
          </div>
        </div>
        <div className={cx(styles.navs, activeMenu === 'defi' ? styles.activemenu: null)}>
          <span onClick={() => openSubMenu('defi')}>DeFi</span>
          <div className={cx(styles.link, activeMenu === 'defi' ? styles.opennav : styles.closenav)}>
            <div className={styles.link} onClick={() => gotoPage('/defi/stake')}>Stake</div>
            <div className={styles.link} onClick={() => gotoPage('/defi/loan')}>Loans</div>
          </div>
        </div>
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
    >
      <DrawerOverlay />
      <DrawerContent style={{backgroundColor: theme.itemBackground, color: theme.menuText}}>
        <DrawerCloseButton />
        <DrawerHeader>Hashgreed</DrawerHeader>
        <DrawerBody>
          <div className={styles.routes}>
            {walletState.address && <AuthRoutes />}
            <div className={styles.link} onClick={() => gotoPage('/explorer')}>Cerification Explorer</div>
          </div>
          <ColorModeSwitcher theme={theme} setTheme={setTheme} className={styles.colorModeSwitcher} />
          <div className={styles.balances}>
            {walletState.address && <Balances />}
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default walletContainer(HashgreedDrawer)