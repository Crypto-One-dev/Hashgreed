import React, {useCallback, useEffect, useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
} from "@chakra-ui/react"
import cx from 'classnames'

import styles from './Drawer.module.scss'

import walletContainer from "redux/containers/wallet"

function HashgreedDrawer({isOpen, onClose, walletState}) {
  const location  = useLocation()
  const path = location.pathname.split('/')
  
  const [activeMenu, setActiveMenu] = useState('')

  const history = useHistory()
  const gotoPage = useCallback((link) => history.push(link), [history])

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
            <div className={styles.link} onClick={() => gotoPage('/auction/explorer')}>Explorer</div>
            <div className={styles.link} onClick={() => gotoPage('/auction/create')}>Create</div>
          </div>
        </div>
        <div className={styles.link} onClick={() => gotoPage('/stake')}>Stake</div>
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
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Hashgreed</DrawerHeader>
        <DrawerBody>
          <div className={styles.routes}>
            {walletState.address && <AuthRoutes />}
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default walletContainer(HashgreedDrawer)