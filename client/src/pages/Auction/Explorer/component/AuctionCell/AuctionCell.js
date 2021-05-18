import React from 'react'

import photo from 'assets/images/photo.png'
import styles from './AuctionCell.module.scss'

const AuctionCell = ({auction}) =>{
    return(
        <div className = {styles.auctionCell} key={auction.id}>
            <div className = {styles.title}>Headphones {auction.id}</div>
            <div className = {styles.clientName}>Philips SHB 9250/00</div>
            <div className = {styles.photo}>
                <img src={photo} alt="" />
            </div>
            <div className = {styles.bidarea}>
                <div className ={styles.value}>$149</div>
                <a className = {styles.button}>Bid Now</a>
            </div>
        </div>
    )
}

export default AuctionCell