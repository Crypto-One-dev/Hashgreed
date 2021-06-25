import React, {useState, useEffect, useContext} from 'react'

import photo from 'assets/images/photo.png'
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
    ApiUtils.getAssetInfo(priceAssetId, setPrice)

    // useEffect(() => {
    //   }, [priceAssetId])

    return(
        <div className = {styles.auctionCell} key={auction.id} style={{backgroundColor: theme.stepBackground}}>
            <div className = {styles.title} style={{color: theme.commentText}}>{auction.id}</div>
            <div className = {styles.clientName} style={{color: theme.primaryText}}>{auction.name}</div>
            <div className = {styles.photo}>
                <img src={photo} alt="" />
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