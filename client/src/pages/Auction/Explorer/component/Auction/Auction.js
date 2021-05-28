import React, {useRef, useContext} from 'react'
import Carousel from '../Carousel/Carousel'

import Prev from 'assets/images/prev.svg'
import Next from 'assets/images/next.svg'
import styles from './Auction.module.scss'
import {ThemeContext} from 'context/ThemeContext'

function Auction({title, auction, data, height}){
  const carousel = useRef(null)
  const {theme} = useContext(ThemeContext)

  return(
    <>
      <img src = {Prev} className = {styles.leftIcon} onClick={()=>{carousel.current.prev()}} alt = ""/>
      <div className = {styles.container}>
        <div className = {styles.titlearea}>
          <div className = {styles.explorerTitle} style={{color: theme.primaryText}}>{title}</div>
        </div>
        <hr className = {styles.border}></hr>
        <Carousel  ref={carousel} category={auction} data={data} height={height}/>
      </div>
      <img src = {Next} className = {styles.rightIcon} onClick={()=>{carousel.current.next()}} alt = ""/>
    </>
  )
}
export default Auction