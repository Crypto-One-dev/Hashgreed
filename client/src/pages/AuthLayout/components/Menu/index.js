import React, {useCallback} from 'react'
import cx from 'classnames'
import {useHistory, useLocation} from 'react-router-dom'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react"

import styles from './Menu.module.scss'

function Menu() {
  const location  = useLocation()
  const path = location.pathname.split('/')

  const history = useHistory()
  const gotoPage = useCallback((link) => history.push(link), [history])

  const Overview = () => {
    return (
      <div className={cx(styles.menuitem, path[1] === 'overview' ? styles.activeitem : null)} onClick={() => gotoPage('/overview')}>
        Overview
      </div>
    )
  }

  const Manage = () => {
    return (
      <Popover>
        <PopoverTrigger>
          <div className={cx(styles.menuitem, path[1] === 'manage' ? styles.activeitem : null)}>
            Manage Token
          </div>
        </PopoverTrigger>
        <PopoverContent bg='rgba(0, 4, 81, 0.4)'>
          <div className={styles.submenu}>
            <div className={styles.subitem} onClick={() => gotoPage('/manage/receive')}>Receive</div>
            <div className={styles.subitem} onClick={() => gotoPage('/manage/send')}>Send</div>
            <div className={styles.subitem} onClick={() => gotoPage('/manage/mass')}>Mass Send</div>
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  const Certification = () => {
    return (
      <Popover>
        <PopoverTrigger>
          <div className={cx(styles.menuitem, path[1] === 'certify' ? styles.activeitem : null)}>
            Certification Tools
          </div>
        </PopoverTrigger>
        <PopoverContent bg='rgba(0, 4, 81, 0.4)'>
          <div className={styles.submenu}>
            <div className={styles.subitem} onClick={() => gotoPage('/certify/file')}>File Certification</div>
            <div className={styles.subitem} onClick={() => gotoPage('/certify/email')}>Email Certification</div>
            <div className={styles.subitem} onClick={() => gotoPage('/certify/mutual')}>Mutual Certification</div>
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  const Auction = () => {
    return (
      <Popover>
        <PopoverTrigger>
          <div className={cx(styles.menuitem, path[1] === 'auction' ? styles.activeitem : null)}>
            NFT Auctions
          </div>
        </PopoverTrigger>
        <PopoverContent bg='rgba(0, 4, 81, 0.4)'>
          <div className={styles.submenu}>
            <div className={styles.subitem} onClick={() => gotoPage('/auction/explorer')}>Explorer</div>
            <div className={styles.subitem} onClick={() => gotoPage('/auction/create')}>Create</div>
                     </div>
        </PopoverContent>
      </Popover>
    )
  }

  const Stake = () => {
    return (
      <div className={cx(styles.menuitem, path[1] === 'stake' ? styles.activeitem : null)} onClick={() => gotoPage('/stake')}>
        Stake
      </div>
    )
  }

  return (
    <div className={styles.menu}>
      <Overview />
      <Manage />
      <Certification />
      <Auction />
      <Stake />
    </div>
  )
}

export default Menu