import React, {useImperativeHandle,forwardRef, useContext, useState, useEffect} from 'react'

import{Modal, ModalOverlay, ModalContent,useDisclosure, Input} from '@chakra-ui/react'
import styles from './BidModal.module.scss'
import {ThemeContext} from "context/ThemeContext"
import {AiOutlineClose} from 'react-icons/all'
import ApiUtils from 'utils/api'
import WavesUtils from 'utils/waves'
import AlertUtils from 'utils/alert'
import cx from 'classnames'
import photo from 'assets/images/photo.png'

const BidModal = ({auctionData, priceAssetId, customer}, ref) => {
  auctionData = auctionData? auctionData: {}

  if(!auctionData.bid){
    auctionData.bid = 0
  }
  const {theme} = useContext(ThemeContext);
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [bid, setBid] = useState('')

  const [price, setPrice] = useState({
      name: '',
      decimals: 0,
      description: ''
  })

  const Bid = () => {
    if(isNaN(bid) || bid <= 0) {
      AlertUtils.SystemAlert('Bid amount is not valid');
        return;
    }
    AlertUtils.SystemAlert('Buying and Selling NFT are subject to risk so better you will do your own research before buying. Be aware of scam assets as we are only a platform to provide services')
    WavesUtils.BidAuction(auctionData.id, bid, auctionData.price_id)
    AlertUtils.SystemAlert("You have successfully placed a bid. When someone else places a higher bid, your bid will be returned back to you")
  }

  useEffect(() => {
    ApiUtils.getAssetInfo(priceAssetId, setPrice)
  }, [priceAssetId])

  useImperativeHandle(ref, () => ({
    openModal() {
       onOpen()
    },
    closeModal(){
        onClose()
    }
  }
  ))

  return(
    <Modal onClose={onClose} size={'5xl'}  isOpen={isOpen} isCentered >
      <ModalOverlay />
      <ModalContent style ={{ borderRadius: '16px', boxShadow:' 0px 20px 20px rgba(0, 0, 0, 0.15)', backgroundColor: '#F7F9FA'}}>
          <div className={styles.modalArea} style={{backgroundColor:theme.bidModalBackground}}>
            <div className ={styles.imageArea}>
              <img src={photo} className={styles.image}/>
            </div>
            <div className={styles.dataArea} style={{backgroundColor:theme.stepBackground}}>
              <div className={styles.closeButton}>
                  <AiOutlineClose className={styles.icon} onClick={() => onClose()}/>
              </div>
              <div className={styles.assetArea}>
                <div className={styles.assetDataArea}>
                  <div className ={styles.nameArea}>
                    <div className={styles.title} style={{color:theme.commentText}}>Name of Asset</div>
                    <div className={styles.value} style={{color: theme.primaryText}}>{auctionData.name}</div>
                  </div>
                  <div className ={styles.aboutArea}>
                    <div className={styles.title} style={{color:theme.commentText}}>About this Asset</div>
                    <div className={styles.about} style={{color: theme.primaryText}}>{auctionData.assetComment}</div>
                  </div>
                  <div className ={styles.priceArea}>
                    <div className={styles.minPriceArea}>
                      <div className={styles.title} style={{color:theme.commentText}}>Starting/Min price</div>
                      <div className={styles.value} style={{color: theme.primaryText}}>{price.name} {auctionData.startValue / (10 ** price.decimals)}</div>
                    </div>
                    <div className={styles.currentBidArea}>
                      <div className={styles.title} style={{color:theme.commentText}}>Current Bid</div>
                      <div className={styles.value} style={{color: theme.primaryText}}>{price.name} {auctionData.winAmount ? auctionData.winAmount/ (10 ** price.decimals) : 0}</div>
                    </div>
                  </div>
                  <div className={styles.typeArea}>
                    <div className={styles.enabledNFT} style={{color:theme.primaryText, borderColor:theme.buttonBack}}>Sport NFTs</div>
                  </div>
                </div>
                <div className={styles.assetIdArea}>
                  <div className={styles.idArea}>
                    <div className={styles.title} style={{color:theme.commentText}}>NFT Asset amount</div>
                    <div className={styles.idInput} style={{color: theme.primaryText}}>{auctionData.nft_amount ? auctionData.nft_amount / (10 ** price.decimals) : 0}</div>
                  </div>
                  <div className={styles.idArea}>
                    <div className={styles.title} style={{color:theme.commentText}}>Price Asset ID</div>
                    <div className={styles.idInput} style={{color: theme.primaryText}}>{auctionData.price_id}</div>
                  </div>
                  <div className={styles.idArea}>
                    <div className={styles.title} style={{color:theme.commentText}}>NFT Asset ID</div>
                    <div className={styles.idInput} style={{color: theme.primaryText}}>{auctionData.nft_id}</div>
                  </div>
                  <div className={styles.idArea}>
                    <div className={styles.title} style={{color:theme.commentText}}>Current Winner</div>
                    <div className={styles.idInput} style={{color: theme.primaryText}}>{auctionData.winner? auctionData.winner : ''}</div>
                  </div>
                  <div className={styles.idArea}>
                    <div className={styles.title} style={{color:theme.commentText}}>Base Value</div>
                    <div className={styles.value} style={{color: theme.primaryText}}>{price.name} {auctionData.startValue / (10 ** price.decimals)}</div>
                  </div>
                </div>
              </div>
              <div className={styles.buttonArea} >
                <div className={styles.inputTitle}>{price.name} </div>
                <Input variant="unstyled" className={styles.inputBox} value={bid} onChange={(e) => setBid(e.target.value)}/>
                <a className={styles.button} style={{backgroundColor:theme.buttonBack}} onClick={Bid}>Place Bid</a>
              </div>
              <div className={styles.comment}><div style={{color:theme.commentText}}>A 10% royalty goes to the creator for future resale</div></div>
            </div>
          </div>
      </ModalContent>
    </Modal>

  )
}

export default forwardRef(BidModal)