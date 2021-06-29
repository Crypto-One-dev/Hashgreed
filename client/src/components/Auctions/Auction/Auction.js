import React, {useRef, useContext, useState, useEffect} from 'react'
import Carousel from '../Carousel/Carousel'
import {Input} from '@chakra-ui/react'
import {FaSearch} from 'react-icons/all';

import Prev from 'assets/images/prev.svg'
import Next from 'assets/images/next.svg'
import styles from './Auction.module.scss'
import {ThemeContext} from 'context/ThemeContext'

function Auction({title, auctionType, auction, data, height, customer}){
  const carousel = useRef(null)
  const {theme} = useContext(ThemeContext)
  const [dataList, setDataList] = useState([])
  useEffect(() => {
    setDataList(data)
  }, [data])

  const searchAuction= (searchVal) => {
    let newData = []
    for(let i = 0; i<data.length; i++){
      if(data[i].assetName.includes(searchVal) || data[i].nft_id.includes(searchVal) || data[i].price_id.includes(searchVal)){
        newData.push(data[i])
      }
    }
    if(searchVal !== '' && searchVal){
      setDataList(newData)
    } else {
      setDataList(data)
    }
  }

  return(
      dataList && dataList.length>0 ?
      <>
      <img src = {Prev} className = {styles.leftIcon} onClick={()=>{carousel.current.prev()}} alt = ""/>
      <div className = {styles.container}>
        <div className = {styles.titlearea}>
          <div className = {styles.explorerTitle} style={{color: theme.primaryText}}>{title}</div>
          <div className = {styles.searchArea}>
              <div className={styles.searchIcon}>
                <FaSearch/>
              </div>
              <Input variant="unstyled" placeholder="Search" className={styles.search} _placeholder={{ color: '#000451', paddingLeft:'90px' }} onChange={(e) => searchAuction(e.target.value)}/>
          </div>
          {/* <div className = {styles.viewTitle}>View all</div> */}
          <div className = {styles.viewTitle}> </div>
        </div>
        <hr className = {styles.border}></hr>
        <Carousel  ref={carousel} category={auction} auctionType={auctionType} data={dataList} height={height} customer={customer}/>
      </div>
      <img src = {Next} className = {styles.rightIcon} onClick={()=>{carousel.current.next()}} alt = ""/>
      </>
      :
      null
  )
}
export default Auction