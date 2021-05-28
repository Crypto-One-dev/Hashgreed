import React, {useContext} from 'react'

import photo from 'assets/images/photo.png'
import styles from './AuctionCell.module.scss'
import {ThemeContext} from 'context/ThemeContext'

const AuctionCell = ({auction,bidOpen}) =>{
    const {theme} = useContext(ThemeContext)

    return(
        <div className = {styles.auctionCell} key={auction.id} style={{backgroundColor: theme.stepBackground}}>
            <div className = {styles.title} style={{color: theme.commentText}}>Headphones {auction.id}</div>
            <div className = {styles.clientName} style={{color: theme.primaryText}}>Philips SHB 9250/00</div>
            <div className = {styles.photo}>
                <img src={photo} alt="" />
            </div>
            <div className = {styles.bidarea}>
                <div className ={styles.value} style={{color: theme.commentText}}>$149</div>
                <a className = {styles.button} style={{color: theme.primaryText}} onClick={() => bidOpen('data')}>Bid Now</a>
            </div>
        </div>
    )
}

export default AuctionCell