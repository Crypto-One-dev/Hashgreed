import React, {useImperativeHandle,forwardRef, useContext, useState, useEffect} from 'react'

import{Modal, ModalOverlay, ModalContent,useDisclosure, Input} from '@chakra-ui/react'
import styles from './BidModal.module.scss'
import {ThemeContext} from "context/ThemeContext"
import {AiOutlineClose} from 'react-icons/all'
import ApiUtils from 'utils/api'
import WavesUtils from 'utils/waves'
import AlertUtils from 'utils/alert'
import cx from 'classnames'


const BidModal = ({auctionData, auctionType, category, height, customer}, ref) => {
  auctionData = auctionData? auctionData: {}
  if(!auctionData ){
    auctionData.assetComment = ''
    auctionData.assetName = ''
    auctionData.assetType = ''
    auctionData.end_block = 0
    auctionData.nft_amount = 0
    auctionData.nft_id = ''
    auctionData.organizer = ''
    auctionData.price = 0
    auctionData.price_id = ''
    auctionData.avatar = ''
    auctionData.id = ''
    auctionData.winner = ''
    auctionData.avatar = ''
  }
  if(!auctionData.bid){
    auctionData.bid = 0
  }
  const {theme} = useContext(ThemeContext);
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [bid, setBid] = useState('')
  
  let duration = auctionData.end_block - height
  if(duration < 0){
    duration = 0
  }

  let auctionTypeText = ''
  if(auctionType === 'ArtNFTs'){
    auctionTypeText = 'Art NFTs'
  }
  else if(auctionType === 'HashDealz'){
    auctionTypeText = 'HashDealz'
  }
  else if(auctionType === 'SportNFTs'){
    auctionTypeText = 'Sport NFTs'
  }
  else if(auctionType === 'MusicEventsNFTs'){
    auctionTypeText = 'Music/Events NFTs'
  }
  else if(auctionType === 'GameNFTs'){
    auctionTypeText = 'Game NFTs'
  }
  else if(auctionType === 'ForexNFTs'){
    auctionTypeText = 'Forex NFTs'
  }

  console.log(auctionData)
  const [nft, setNFT] = useState({
      name: '',
      decimals: 0,
      description: ''
  })
  const [price, setPrice] = useState({
      name: '',
      decimals: 0,
      description: ''
  })

  const Withdraw = () => {
    WavesUtils.WithdrawAuction(auctionData.id)
    AlertUtils.SystemAlert("NFT successfully withdraw")
  }

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
    ApiUtils.getAssetInfo(auctionData.nft_id, setNFT)
    ApiUtils.getAssetInfo(auctionData.price_id, setPrice)
  }, [auctionData.nft_id, auctionData.price_id])

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
              <img src={`https://ipfs.io/ipfs/${auctionData.avatar}`} className={styles.image}/>
            </div>
            <div className={styles.dataArea} style={{backgroundColor:theme.stepBackground}}>
              <div className={styles.closeButton}>
                  <AiOutlineClose className={styles.icon} onClick={() => onClose()}/>
              </div>
              {
                category === 'live' && customer === auctionData.winner ?
                <div className={styles.live}>
                  <a className={cx(styles.button, styles.filled, styles.button)} style={{backgroundColor: theme.runningButtonBack}} >Running</a>
                  <a className={cx(styles.button, styles.disabled, styles.button)} style={{backgroundColor:theme.disabledButtonBack}}>Withdraw</a>
                </div>
                :
                category === 'expired' && customer === auctionData.winner ?
                <div className={styles.expired}>
                  <a className={cx(styles.button, styles.disabled, styles.button)} style={{backgroundColor: theme.disabledButtonBack}} >Running</a>
                  <a className={cx(styles.button, styles.filled, styles.button)} style={{backgroundColor:theme.buttonBack}} onClick={Withdraw}>Withdraw</a>
                </div>
                :
                category === 'expired' && customer !== auctionData.winner && customer === auctionData.organizer ?
                <div className={styles.expired}>
                  <a className={cx(styles.button, styles.disabled, styles.button)} style={{backgroundColor: theme.disabledButtonBack}} >Running</a>
                  <a className={cx(styles.button, styles.filled, styles.button)} style={{backgroundColor:theme.disabledButtonBack}}>Withdraw</a>
                </div>
                :
                category === 'expired' && customer !== auctionData.winner && customer !== auctionData.organizer ?
                <div className={styles.expired} style = {{justifyContent:'flex-end'}}>
                  <a className={cx(styles.button, styles.filled, styles.button)} style={{backgroundColor:theme.disabledButtonBack }}>Withdrawn</a>
                </div>
                :
                category === 'soldout'?
                <div className={styles.soldout}>
                  <a className={cx(styles.button, styles.disabled, styles.button)} style={{backgroundColor: theme.disabledButtonBack}} >Soldout or Withdrawn</a>
                </div>
                :
                null
              }
              <div className={styles.assetArea}>
                <div className={styles.assetDataArea}>
                  <div className ={styles.nameArea}>
                    <div className={styles.title} style={{color:theme.commentText}}>Name of Asset</div>
                    <div className={styles.value} style={{color: theme.primaryText}}>{auctionData.assetName}</div>
                  </div>
                  <div className ={styles.aboutArea}>
                    <div className={styles.title} style={{color:theme.commentText}}>About this Asset</div>
                    <div className={styles.about} style={{color: theme.primaryText}}>{auctionData.assetComment}</div>
                  </div>
                  <div className ={styles.priceArea}>
                    <div className={styles.minPriceArea}>
                      <div className={styles.title} style={{color:theme.commentText}}>Starting/Min price</div>
                      <div className={styles.value} style={{color: theme.primaryText}}>{price.name} {auctionData.price / (10 ** price.decimals)}</div>
                    </div>
                    <div className={styles.currentBidArea}>
                      <div className={styles.title} style={{color:theme.commentText}}>Current Bid</div>
                      <div className={styles.value} style={{color: theme.primaryText}}>{price.name} {auctionData.bid/ (10 ** price.decimals)}</div>
                    </div>
                  </div>
                  <div className={styles.typeArea}>
                    <div className={styles.enabledNFT} style={{color:theme.primaryText, borderColor:theme.buttonBack}}>{auctionTypeText}</div>
                  </div>
                </div>
                <div className={styles.assetIdArea}>
                  <div className={styles.idArea}>
                    <div className={styles.title} style={{color:theme.commentText}}>NFT Asset amount</div>
                    <div className={styles.idInput} style={{color: theme.primaryText}}>{auctionData.nft_amount / (10 ** nft.decimals)}</div>
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
                    <div className={styles.title} style={{color:theme.commentText}}>Duration in block</div>
                    <div className={styles.value} style={{color: theme.primaryText}}>{duration}</div>
                  </div>
                </div>
              </div>
              {
                category === 'live' ?
                <>
                  <div className={styles.buttonArea} >
                    <div className={styles.inputTitle}>{price.name} </div>
                    <Input variant="unstyled" className={styles.inputBox} value={bid} onChange={(e) => setBid(e.target.value)}/>
                    <a className={styles.button} style={{backgroundColor:theme.buttonBack}} onClick={Bid}>Place Bid</a>
                  </div>
                  <div className={styles.comment}><div style={{color:theme.commentText}}>A 10% royalty goes to the creator for future resale</div></div>
                </>
                :
                category === 'expired' && customer === auctionData.winner ?
                <>
                  <div className={styles.buttonArea} style={{backgroundColor: '#C8C6C7'}} >
                    <div className={styles.inputTitle}>{price.name} </div>
                    <Input variant="unstyled" className={styles.inputBox}/>
                    <a className={styles.button} style={{backgroundColor:theme.disabledButtonBack}}>Place Bid</a>
                  </div>
                  <div className={styles.comment}><div style={{color:theme.commentText}}>A 10% royalty goes to the creator for future resale</div></div>
                </>
                :
                null
              }
            </div>
          </div>
      </ModalContent>
    </Modal>

  )
}

export default forwardRef(BidModal)