import React, {useState, useCallback, useEffect} from 'react'
import cx from 'classnames'
import {useHistory, useLocation} from 'react-router-dom'
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@chakra-ui/react'

import styles from './Menu.module.scss'

function Menu() {
  const [isOpen, setIsOpen] = useState(false)
  const open = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)
  const location  = useLocation()
  const path = location.pathname.split('/')

  const history = useHistory()
  const gotoPage = useCallback((link) => {
    return history.push(link)
  }, [history])

  
  let stakePopup = null
  useEffect(() => {
    if(location.pathname === '/defi') {
      setTimeout(function() {
        if(stakePopup)
          stakePopup.click();
      }, 300)
    }
  }, [location, stakePopup])

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
          <div className={cx(styles.menuitem, path[1] === 'certify' ? styles.activeitem : null)} >
            Certification Tools
          </div>
        </PopoverTrigger>
        <PopoverContent bg='rgba(0, 4, 81, 0.4)' className={styles.certificationContent}>
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
            Marketplaces
          </div>
        </PopoverTrigger>
        <PopoverContent bg='rgba(0, 4, 81, 0.4)'>
          <div className={styles.submenu}>
          <Popover
            returnFocusOnClose={false}
            placement="right"
            closeOnBlur={true}
            trigger="click"
          >
            <PopoverTrigger>
              <div className={styles.subitem}>Art NFTs</div>
            </PopoverTrigger>
            <PopoverContent bg='rgba(0, 4, 81, 0.4)'  className={styles.auctionContent}> 
              <div className={styles.nftsubmenu}>
                <div className={styles.subitem} onClick={() => gotoPage('/auction/artnfts/create')}>Create</div>
                <div className={styles.subitem} onClick={() => gotoPage('/auction/artnfts/explorer')}>Explore</div>
              </div>
            </PopoverContent>
          </Popover>
          <Popover
            returnFocusOnClose={false}
            placement="right"
            closeOnBlur={true}
            trigger="click"
          >
            <PopoverTrigger>
              <div className={styles.subitem}>HashDealz</div>
            </PopoverTrigger>
            <PopoverContent bg='rgba(0, 4, 81, 0.4)'  className={styles.auctionContent}> 
              <div className={styles.nftsubmenu}>
                <div className={styles.subitem} onClick={() => gotoPage('/auction/hashdealz/create')}>Create</div>
                <div className={styles.subitem} onClick={() => gotoPage('/auction/hashdealz/explorer')}>Explore</div>
              </div>
            </PopoverContent>
          </Popover>
          <Popover
            returnFocusOnClose={false}
            placement="right"
            closeOnBlur={true}
            trigger="click"
          >
            <PopoverTrigger>
              <div className={styles.subitem}>Sport NFTs</div>
            </PopoverTrigger>
            <PopoverContent bg='rgba(0, 4, 81, 0.4)'  className={styles.auctionContent}> 
              <div className={styles.nftsubmenu}>
                <div className={styles.subitem} onClick={() => gotoPage('/auction/sportnfts/explorer')}>Explore</div>
              </div>
            </PopoverContent>
          </Popover>
          <Popover
            returnFocusOnClose={false}
            placement="right"
            closeOnBlur={true}
            trigger="click"
          >
            <PopoverTrigger>
              <div className={styles.subitem}>Music/Events NFTs</div>
            </PopoverTrigger>
            <PopoverContent bg='rgba(0, 4, 81, 0.4)'  className={styles.auctionContent}> 
              <div className={styles.nftsubmenu}>
                <div className={styles.subitem} onClick={() => gotoPage('/auction/musiceventsnfts/create')}>Create</div>
                <div className={styles.subitem} onClick={() => gotoPage('/auction/musiceventsnfts/explorer')}>Explore</div>
              </div>
            </PopoverContent>
          </Popover>
          <Popover
            returnFocusOnClose={false}
            placement="right"
            closeOnBlur={true}
            trigger="click"
          >
            <PopoverTrigger>
              <div className={styles.subitem}>Game NFTs</div>
            </PopoverTrigger>
            <PopoverContent bg='rgba(0, 4, 81, 0.4)'  className={styles.auctionContent}> 
              <div className={styles.nftsubmenu}>
                <div className={styles.subitem} onClick={() => gotoPage('/auction/gamenfts/create')}>Create</div>
                <div className={styles.subitem} onClick={() => gotoPage('/auction/gamenfts/explorer')}>Explore</div>
              </div>
            </PopoverContent>
          </Popover>
          <Popover
            returnFocusOnClose={false}
            placement="right"
            closeOnBlur={true}
            trigger="click"
          >
            <PopoverTrigger>
              <div className={styles.subitem} style={{borderBottom:'none'}}>Services NFTs</div>
            </PopoverTrigger>
            <PopoverContent bg='rgba(0, 4, 81, 0.4)'  className={styles.auctionContent}> 
              <div className={styles.nftsubmenu}>
                <div className={styles.subitem} onClick={() => gotoPage('/auction/servicesnfts/create')}>Create</div>
                <div className={styles.subitem} onClick={() => gotoPage('/auction/servicesnfts/explorer')}>Explore</div>
              </div>
            </PopoverContent>
          </Popover>
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  const Stake = () => {
    return (
      <>
        <div className={cx(styles.menuitem, path[1] === 'defi' ? styles.activeitem : null)} onClick={() => { gotoPage('/defi')}}>
          {/* <div className={cx(styles.menuitem, path[1] === 'defi' ? styles.activeitem : null)}> */}
            DeFi
        </div>
        <Popover>
          <PopoverTrigger>
            <div ref={pop => {stakePopup = pop}}></div>
          </PopoverTrigger>
          <PopoverContent bg='rgba(0, 4, 81, 0.4)'>
            <div className={styles.submenu}>
              <div className={styles.subitem} onClick={() => gotoPage('/defi/stake')}>Stake</div>
              <div className={styles.subitem} onClick={() => gotoPage('/defi/loan')}>Loans</div>
              <div className={styles.subitem} onClick={() => gotoPage('/auction/create')}>
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
      </>
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