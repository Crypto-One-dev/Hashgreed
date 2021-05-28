import React, {useContext, useState, useRef} from 'react'

import "owl.carousel/dist/assets/owl.carousel.css"
import "owl.carousel/dist/assets/owl.theme.green.css"
import OwlCarousel from 'react-owl-carousel'
import styles from './Transaction.module.scss'
import {ThemeContext} from 'context/ThemeContext'
import TransactionCell from './TransactionCell/TransactionCell'
import Prev from 'assets/images/prev.svg'
import Next from 'assets/images/next.svg'

function Transaction ({transactions, owner}){
  const carousel = useRef(null)
  const {theme} = useContext(ThemeContext)

    return(
      (transactions && transactions.length>0) ?
        (<div className={styles.transactions}>
          <div className={styles.CarouselArea}>
            <div className={styles.header}>
              <div className={styles.title} style={{color: theme.primaryText}}>
                Transactions
              </div>
              <hr className = {styles.line}/>
            </div>
            <div className={styles.mainCarousel}>
              <img src = {Prev} className = {styles.leftIcon} style={{color: theme.primaryText}} onClick={()=>{carousel.current.prev()}} alt = ""/>
              <OwlCarousel style={{width: 'calc(100% - 80px)'}} className="owl-theme" items={1} responsiveClass={true} margin={0} dots={false} ref={carousel} >
                  {
                      transactions && transactions.map((transaction) =>
                          <TransactionCell transaction={transaction} owner={owner} />
                      )
                  }
              </OwlCarousel>
              <img src = {Next} className = {styles.rightIcon} onClick={()=>{carousel.current.next()}} alt = ""/>
            </div>
          </div>
        </div>
        )
        : null
    )
}

export default Transaction