import React, {useRef, useContext, useState, useEffect} from 'react'
import Carousel from '../Carousel/Carousel'
import {Input} from '@chakra-ui/react'
import {FaSearch} from 'react-icons/all';

import Prev from 'assets/images/prev.svg'
import Next from 'assets/images/next.svg'
import styles from './Auction.module.scss'
import {ThemeContext} from 'context/ThemeContext'

function Auction({data, priceAssetId, customer}){
  const carousel = useRef(null)
  const {theme} = useContext(ThemeContext)
  const [dataList, setDataList] = useState()

  console.log(data.length)

  // useEffect(() => {
  //   setDataList(data)
  // }, [data])

  // if(!data){
  //   data={}
  // }

  const searchAuction= (searchVal) => {
    let newData = []
    for(let i = 0; i<data.length; i++){
      if(data[i].name.includes(searchVal) || data[i].id.includes(searchVal)){
        newData.push(data[i])
      }
    }
    if(searchVal !== ''){
     setDataList(newData)
    }
  }

  return(
    <>
      <img src = {Prev} className = {styles.leftIcon} onClick={()=>{carousel.current.prev()}} alt = ""/>
      <div className = {styles.container}>
        <div className = {styles.titlearea}>
          <div className = {styles.explorerTitle} style={{color: theme.primaryText}}>Live Auction</div>
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
        <Carousel ref={carousel} data={data} priceAssetId={priceAssetId} customer={customer}/>
      </div>
      <img src = {Next} className = {styles.rightIcon} onClick={()=>{carousel.current.next()}} alt = ""/>
    </>
  )
}
export default Auction