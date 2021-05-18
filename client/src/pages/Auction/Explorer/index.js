import React, {useEffect, useState} from 'react'

import styles from './Explorer.module.scss'
import Auction from './component/Auction/Auction'

import ApiUtils from 'utils/api'
import walletContainer from 'redux/containers/wallet'

function Explorer({walletState}){
    
    const [auctions, setAuctions] = useState([])
    const [height, setHeight] = useState(0)
    useEffect(() => {
      let interval = -1
      if(walletState.address) {
        const proc = () => {
          ApiUtils.getAuctions(walletState.address, setAuctions, setHeight);
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
            {
                auctions && auctions.live && auctions.live.length > 0 &&
                <div className = {styles.auctionarea}>
                    <Auction title={'Live Auction'} auction={'live'} data={auctions.live} height={height} />
                </div>
            }
            {
                auctions && auctions.live && auctions.expired.length > 0 &&
                <div className = {styles.expiredarea}>
                    <Auction title={'Expired Auction'} auction={'expired'} data={auctions.expired} height={height} />
                </div>
            }
            {
                auctions && auctions.live && auctions.soldout.length > 0 &&
                <div className = {styles.soldoutarea}>
                    <Auction title={'Soldout Auction'} auction={'soldout'} data={auctions.soldout} height={height} />
                </div>
            }
        </div>
    )
}

export default walletContainer(Explorer)