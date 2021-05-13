import React, {useRef, useState, useEffect} from 'react'
import Carousel from '../Carousel/Carousel'

import Prev from 'assets/images/prev.svg'
import Next from 'assets/images/next.svg'
import ApiUtils from 'utils/api'
import styles from './Auction.module.scss'
import walletContainer from 'redux/containers/wallet'

function Auction({title, auction, walletState}){
  const carousel = useRef(null)
  const [auctions, setAuctions] = useState([]);
  const [height, setHeight] = useState(0);

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

  return(
    <>
    <img src = {Prev} className = {styles.leftIcon} onClick={()=>{carousel.current.prev()}} alt = ""/>
    <div className = {styles.container}>
      <div className = {styles.titlearea}>
        <div className = {styles.explorerTitle}>{title}</div>
        <div className = {styles.viewTitle}>View all</div>
      </div>
      <hr className = {styles.border}></hr>
      <Carousel  ref={carousel} category={auction}/>
    </div>
    <img src = {Next} className = {styles.rightIcon} onClick={()=>{carousel.current.next()}} alt = ""/>
    </>
  )
}
export default walletContainer(Auction)