import React, {useImperativeHandle,forwardRef, useContext, useState} from 'react'

import{Modal, ModalOverlay, ModalContent, ModalHeader,ModalBody,ModalFooter,useDisclosure, Input} from '@chakra-ui/react'
import styles from './BidModal.module.scss'
import {ThemeContext} from "context/ThemeContext"
import picture from 'assets/images/picture.png'
import {AiOutlineClose} from 'react-icons/all'

const BidModal = ({bidData}, ref) => {
  const {theme} = useContext(ThemeContext);
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [art, setArt] = useState(true)
  const [hashDealz, setHashDealz] = useState(false)
  const [sport, setSport] = useState(false)

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
              <img src={picture} className={styles.image}/>
            </div>
            <div className={styles.dataArea} style={{backgroundColor:theme.stepBackground}}>
              <div className={styles.closeButton}>
                  <AiOutlineClose className={styles.icon} onClick={() => onClose()}/>
              </div>
              <div className={styles.assetArea}>
                <div className={styles.assetDataArea}>
                  <div className ={styles.nameArea}>
                    <div className={styles.title} style={{color:theme.commentText}}>Name of Asset</div>
                    <div className={styles.value} style={{color: theme.primaryText}}>Philips SHB 9250/00</div>
                  </div>
                  <div className ={styles.aboutArea}>
                    <div className={styles.title} style={{color:theme.commentText}}>About this Asset</div>
                    <div className={styles.about} style={{color: theme.primaryText}}>NFT stands for non-fungible token. Non-fungible is an economic term that you could use to describe things like your furniture, or your computer.</div>
                  </div>
                  <div className ={styles.priceArea}>
                    <div className={styles.minPriceArea}>
                      <div className={styles.title} style={{color:theme.commentText}}>Starting/Min price</div>
                      <div className={styles.value} style={{color: theme.primaryText}}>USDT 100</div>
                    </div>
                    <div className={styles.currentBidArea}>
                      <div className={styles.title} style={{color:theme.commentText}}>Current Bid</div>
                      <div className={styles.value} style={{color: theme.primaryText}}>USDT 500</div>
                    </div>
                  </div>
                  <div className={styles.typeArea}>
                    <div className={art ? styles.enabledNFT : styles.disabledNFT} style={{color: art? theme.primaryText:theme.commentText, borderColor:art? theme.buttonBack: null}}>Art NFTs</div>
                    <div className={hashDealz ? styles.enabledNFT : styles.disabledNFT} style={{color: hashDealz? theme.primaryText:theme.commentText, borderColor:hashDealz? theme.buttonBack: null}}>HashDealz</div>
                    <div className={sport ? styles.enabledNFT : styles.disabledNFT} style={{color: sport? theme.primaryText:theme.commentText, borderColor:sport? theme.buttonBack: null}}>Sport NFTs</div>
                  </div>
                </div>
                <div className={styles.assetIdArea}>
                  <div className={styles.idArea}>
                    <div className={styles.title} style={{color:theme.commentText}}>NFT Asset amount</div>
                    <div className={styles.idInput} style={{color: theme.primaryText}}>30</div>
                  </div>
                  <div className={styles.idArea}>
                    <div className={styles.title} style={{color:theme.commentText}}>Price Asset ID</div>
                    <div className={styles.idInput} style={{color: theme.primaryText}}>8sh8hajasjhsd8uakaku8WSk88879w</div>
                  </div>
                  <div className={styles.idArea}>
                    <div className={styles.title} style={{color:theme.commentText}}>NFT Asset ID</div>
                    <div className={styles.idInput} style={{color: theme.primaryText}}>8sh8hajasjhsd8uakaku8WSk88879w</div>
                  </div>
                  <div className={styles.idArea}>
                    <div className={styles.title} style={{color:theme.commentText}}>Current Winner</div>
                    <div className={styles.idInput} style={{color: theme.primaryText}}>8sh8hajasjhsd8uakaku8WSk88879w</div>
                  </div>
                  <div className={styles.idArea}>
                    <div className={styles.title} style={{color:theme.commentText}}>Duration in block</div>
                    <div className={styles.value} style={{color: theme.primaryText}}><b>60</b>d  <b>14</b>h  <b>12</b>m  <b>54</b>s</div>
                  </div>
                </div>
              </div>
              <div className={styles.buttonArea}>
                  <div className={styles.inputTitle}>USDT </div>
                  <Input variant="unstyled" className={styles.inputBox}/>
                  <div className={styles.button} style={{backgroundColor:theme.buttonBack}}>Place Bid</div>
              </div>
              <div className={styles.comment}><div style={{color:theme.commentText}}>A 10% royalty goes to the creator for future resale</div></div>
            </div>
          </div>
      </ModalContent>
    </Modal>

  )
}

export default forwardRef(BidModal)