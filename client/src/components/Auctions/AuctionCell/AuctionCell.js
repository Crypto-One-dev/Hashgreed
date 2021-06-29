import React, {useState, useEffect, useContext} from 'react'

import photo from 'assets/images/photo.png'
import styles from './AuctionCell.module.scss'
import WavesConfig from 'config/waves';
import WavesUtils from 'utils/waves';
import ApiUtils from 'utils/api';
import AlertUtils from 'utils/alert';
import {ThemeContext} from 'context/ThemeContext'
import walletContainer from 'redux/containers/wallet';

const AuctionCell = ({category, auction, height, bidOpen, walletState}) => {
    const {theme} = useContext(ThemeContext)
    const owner = walletState.address
    const isOwner = auction.winner ? owner === auction.winner : owner === auction.organizer
    
    const [price, setPrice] = useState({
        name: '',
        decimals: 0,
        description: ''
    })
    
    // ApiUtils.getAssetInfo(auction.price_id, setPrice)

    useEffect(() => {
        if(auction.price_id){
            ApiUtils.getAssetInfo(auction.price_id, setPrice)
        }
      }, [auction.price_id])

    return(
        <div className = {styles.auctionCell} key={auction.id} style={{backgroundColor: theme.stepBackground}}>
            <div className = {styles.title} style={{color: theme.commentText}}>{auction.assetName}</div>
            <div className = {styles.clientName} style={{color: theme.primaryText}}>{auction.assetName}</div>
            <div className = {styles.photo}>
                <img src={`https://ipfs.io/ipfs/${auction.avatar}`} alt="" className={styles.img} />
            </div>
            <div className = {styles.bidarea}>
                <div className={styles.startPrice}>
                  <div className ={styles.value} style={{color: theme.primaryText}}>{price.name} {auction.price / (10 ** price.decimals)}</div>
                  <div className ={styles.starttitle} style={{color: theme.commentText}}>Starting From</div>
                </div>
                
                <a className = {styles.button} style={{color: theme.primaryText}} onClick={() => bidOpen(auction)}>
                {
                    (category === 'live' && !isOwner)?
                    'Bid Now'
                    :
                    (category === 'live' && isOwner)?
                    'Withdraw'
                    :
                    (category === 'solout' && auction.organizer === auction.winner)?
                    'WithDrawn'
                    :
                    (category === 'solout' && auction.organizer !== auction.winner)?
                    'SoldOut'
                    :
                    'view'
                }
                </a>
            </div>
        </div>
    )
}

export default walletContainer(AuctionCell)