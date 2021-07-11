import React, {useState, useEffect, useContext} from 'react'

import styles from './AuctionCell.module.scss'
import ApiUtils from 'utils/api';
import {ThemeContext} from 'context/ThemeContext'

const AuctionCell = ({auction, priceAssetId, bidOpen}) => {
    const {theme} = useContext(ThemeContext)
    const [price, setPrice] = useState({
        name: '',
        decimals: 0,
        description: ''
    })
    const [imgLink, setImgLink] = useState()

    const [nft, setNFT] = useState({
      name: '',
      decimals: 0,
      description: ''
    })

    useEffect(() => {
      ApiUtils.getAssetInfo(priceAssetId, setPrice)
      ApiUtils.getAssetInfo(auction.id, setNFT)

      let linkstart = 0
      let linkend = 0
      let nftDescription = nft.description
      linkstart = nftDescription.search('https://ipfs.io')
      linkend = nftDescription.search('Hash:')
      setImgLink(nftDescription.slice(linkstart, linkend))
      }, [priceAssetId, auction.id, nft.description])

    return(
        <div className = {styles.auctionCell} key={auction.id} style={{backgroundColor: theme.stepBackground}}>
            <div className = {styles.title} style={{color: theme.commentText}}>{auction.id}</div>
            <div className = {styles.clientName} style={{color: theme.primaryText}}>{auction.name}</div>
            <div className = {styles.photo}>
                <img src={imgLink} className={styles.img} alt="" />
            </div>
            <div className = {styles.bidarea}>
                <div className={styles.startPrice}>
                  <div className ={styles.value} style={{color: theme.primaryText}}>{price.name} {auction.startValue / (10 ** price.decimals)}</div>
                  <div className ={styles.starttitle} style={{color: theme.commentText}}>Starting From</div>
                </div>
                
                <a className = {styles.button} style={{color: theme.primaryText}} onClick={() => bidOpen(auction)}>
                    Bid now
                </a>
            </div>
        </div>
    )
}

export default AuctionCell