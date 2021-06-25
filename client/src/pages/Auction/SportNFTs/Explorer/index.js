import React, {useEffect, useState, useContext} from 'react'

import styles from './Explorer.module.scss'
import Auction from 'components/SportAuction/Auction/Auction'

import ApiUtils from 'utils/api'
import walletContainer from 'redux/containers/wallet'
import {ThemeContext} from 'context/ThemeContext'

function Explorer({walletState}){
    
    const [auctions, setAuctions] = useState([])
    const [priceAssetId, setPriceAssetId] = useState(0)
    const {theme} = useContext(ThemeContext)

    useEffect(() => {
      let interval = -1
      if(walletState.address) {
        const proc =  async () => {
          await ApiUtils.getSportAuctions( setAuctions, setPriceAssetId);
        }
        proc()
        interval = setInterval(proc, 60000)
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
                <div className={styles.enabledNFT} style={{color: theme.primaryText, borderColor:theme.buttonBack}}>Sport NFTs</div>
            </div>
            {
              auctions && auctions.length>0 &&
              <div className = {styles.auctionarea}>
                  <Auction data={auctions} priceAssetId={priceAssetId} customer={walletState.address}/>
              </div>
            }
        </div>
    )
}

export default walletContainer(Explorer)