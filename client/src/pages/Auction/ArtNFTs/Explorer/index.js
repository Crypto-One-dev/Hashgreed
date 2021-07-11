import React, {useEffect, useState, useContext} from 'react'

import styles from './Explorer.module.scss'
import Auction from 'components/Auctions/Auction/Auction'

import ApiUtils from 'utils/api'
import walletContainer from 'redux/containers/wallet'
import {ThemeContext} from 'context/ThemeContext'

function Explorer({walletState}){
    
    const [auctions, setAuctions] = useState([])
    const [height, setHeight] = useState(0)
    const {theme} = useContext(ThemeContext)
    const auctionType = 'ArtNFTs'

    useEffect(() => {
      let interval = -1
      if(walletState.address) {
        const proc = () => {
          ApiUtils.getAuctions(walletState.address, auctionType, setAuctions, setHeight);
        }
        proc()
        interval = setInterval(proc, 30000)
      }
  
      return () => {
        if(interval > -1) {
          clearInterval(interval)
        }
      }
    }, [walletState.address])

    return (
        <div className = {styles.explorer}>
            <div className ={styles.nftType}>
                <div className={styles.enabledNFT} style={{color: theme.primaryText, borderColor:theme.buttonBack}}>Art NFTs</div>
            </div>
            {
                auctions && auctions.live && auctions.live.length > 0 &&
                <div className = {styles.auctionarea}>
                    <Auction title={'Live Auction'} auctionType={'ArtNFTs'} auction={'live'} data={auctions.live} height={height} customer={walletState.address} />
                </div>
            }
            {
                auctions && auctions.live && auctions.expired.length > 0 &&
                <div className = {styles.expiredarea}>
                    <Auction title={'Expired Auction'} auctionType={'ArtNFTs'} auction={'expired'} data={auctions.expired} height={height} customer={walletState.address} />
                </div>
            }
            {
                auctions && auctions.live && auctions.soldout.length > 0 &&
                <div className = {styles.soldoutarea}>
                    <Auction title={'Soldout/Withdrawn Auction'} auctionType={'ArtNFTs'} auction={'soldout'} data={auctions.soldout} height={height} customer={walletState.address} />
                </div>
            }
        </div>
    )
}

export default walletContainer(Explorer)