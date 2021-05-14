import React from 'react'

import styles from './Explorer.module.scss'
import Auction from './component/Auction/Auction'
import LatestAuction from 'components/LatestAuction/LatestAuction'

function Explorer(){
    return (
        <div className = {styles.explorer}>
            <div className = {styles.auctionarea}>
                <Auction title={'Live Auction'} auction={'live'} />
            </div>
            {/* <div className = {styles.expiredarea}>
                <Auction title={'Expired Auction'} auction={'expired'} />
            </div>
            <div className = {styles.soldoutarea} >
                <Auction title={'Soldout Auction'} auction={'soldout'} />
            </div> */}
            {/* <LatestAuction/> */}
        </div>
    )
}

export default Explorer