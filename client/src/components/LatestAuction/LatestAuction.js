import React from 'react'

import RKMT from 'assets/icons/RKMT.svg'
import styles from './LatestAuction.module.scss'

function LatestAuction (){

    return(
        <div className = {styles.latestAuction}>
            <div className = {styles.title}>
                Latest Auction
            </div>
            <hr className = {styles.line}/>
            <div className = {styles.dataarea}>
                <img src = {RKMT} className = {styles.img} alt = ""/>
                <div className = {styles.data}>
                    Thursday May, 1 2021  16:45:10  GMT+0100
                    <br/>
                    Transfer from: 3P6fcVrbDqziZZkUHQxmRRmQpZBjS2KZdEM
                    <br/>
                    NTF ID:  ysh7wiwuin233P6fcVrbDqziZZkUHQxmRRmQpZBjS2KZdEM
                </div>
                <div className = {styles.price}>
                    20,000.0000
                </div>
            </div>
        </div>
    )
}

export default LatestAuction