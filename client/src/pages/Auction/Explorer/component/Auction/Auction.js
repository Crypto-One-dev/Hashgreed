import React, {useRef, useState} from 'react'
import Carousel from '../Carousel/Carousel'

import Prev from 'assets/images/prev.svg'
import Next from 'assets/images/next.svg'
import styles from './Auction.module.scss'

function Auction({title}){
  const carousel = useRef(null)

  return(
    <>
    <img src = {Prev} className = {styles.leftIcon} onClick={()=>{carousel.current.prev()}} alt = ""/>
    <div className = {styles.container}>
      <div className = {styles.titlearea}>
        <div className = {styles.explorerTitle}>{title}</div>
        <div className = {styles.viewTitle}>View all</div>
      </div>
      <hr className = {styles.border}></hr>
      <Carousel  ref={carousel}/>
    </div>
    <img src = {Next} className = {styles.rightIcon} onClick={()=>{carousel.current.next()}} alt = ""/>
    </>
  )
}
export default Auction