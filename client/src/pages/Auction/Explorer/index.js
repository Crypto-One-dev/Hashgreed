import React, {useEffect, useState, useContext} from 'react'

import styles from './Explorer.module.scss'
import Auction from './component/Auction/Auction'

import ApiUtils from 'utils/api'
import walletContainer from 'redux/containers/wallet'
import {ThemeContext} from 'context/ThemeContext'

function Explorer({walletState}){
    
    const [auctions, setAuctions] = useState([])
    const [height, setHeight] = useState(0)
    const [art, setArt] = useState(true)
    const [hashDealz, setHashDealz] = useState(false)
    const [sport, setSport] = useState(false)
    const {theme} = useContext(ThemeContext)
    
    const changeNFT = (name) => {
        if(name === 'art'){
            setArt(true)
            setHashDealz(false)
            setSport(false)
        }
        else if(name === 'hashDealz'){
            setArt(false)
            setHashDealz(true)
            setSport(false)
        }
        else if(name === 'sport'){
            setArt(false)
            setHashDealz(false)
            setSport(true)
        }
    }

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
            <div className ={styles.nftType}>
                <div className={art ? styles.enabledNFT : styles.disabledNFT} style={{color: art? theme.primaryText:theme.commentText, borderColor:art? theme.buttonBack: null}} onClick={() => changeNFT('art')}>Art NFTs</div>
                <div className={hashDealz ? styles.enabledNFT : styles.disabledNFT} style={{color: hashDealz? theme.primaryText:theme.commentText, borderColor:hashDealz? theme.buttonBack: null}} onClick={() => changeNFT('hashDealz')}>HashDealz</div>
                <div className={sport ? styles.enabledNFT : styles.disabledNFT} style={{color: sport? theme.primaryText:theme.commentText, borderColor:sport? theme.buttonBack: null}} onClick={() => changeNFT('sport')}>Sport NFTs</div>
            </div>
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