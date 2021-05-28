import React, {useContext, useEffect, useState}from 'react'

import {useDropzone} from 'react-dropzone'
import {Input, Button,Box, Textarea} from '@chakra-ui/react'
import {BsPlusCircle} from 'react-icons/all'

import cx from 'classnames'
import styles from './Create.module.scss'
import ApiUtils from 'utils/api'
import WavesUtils from 'utils/waves'
import AlertUtils from 'utils/alert'
import walletContainer from 'redux/containers/wallet'
import {ThemeContext} from 'context/ThemeContext'

function Create({walletState}){

    const [auctions, setAuctions] = useState([])
    const [height, setHeight] = useState(0)
    const certFee = 100
    const transactionFee = 0.001
    const [art, setArt] = useState(true)
    const [hashDealz, setHashDealz] = useState(false)
    const [sport, setSport] = useState(false)
    const {theme} = useContext(ThemeContext)

    const changeNFT = (name) => {
        if(name === 'art'){
            setArt(true)
            setHashDealz(false)
            setSport(false)
        }
        else if(name === 'hashDealz'){
            setArt(false)
            setHashDealz(true)
            setSport(false)
        }
        else if(name === 'sport'){
            setArt(false)
            setHashDealz(false)
            setSport(true)
        }
    }

    useEffect(() => {
      let interval = -1
      if(walletState.address) {
        const proc = () => {
          ApiUtils.getAuctions(walletState.address, setAuctions, setHeight)
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

    const [duration, setDuration] = useState('')
    const [price, setPrice] = useState('')
    const [assetName, setAssetName] = useState('')
    const [assetComment, setAssetComment] = useState('')
    const [priceID, setPriceID] = useState('')
    const [nftID, setNFTID] = useState('')
    const [nftAmount, setNFTAmount] = useState('')
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({ accept: 'image/jpeg, image/png' })
    const [uploading, setUploading] = useState(false)

    const startAuction = async () => {
        if(isNaN(price) || price <= 0) {
            AlertUtils.SystemAlert('Starting Price is not valid')
            return
        }
        if(isNaN(nftAmount) || nftAmount <= 0) {
            AlertUtils.SystemAlert('NFT Asset Amount is not valid')
            return
        }
        if(isNaN(duration) || duration <= 0) {
            AlertUtils.SystemAlert('Duration in blocks is not valid')
            return
        }
        if(acceptedFiles.length !== 1) {
            AlertUtils.SystemAlert('You must upload 1 image for NFT')
            return
        }
        const tx = await WavesUtils.StartAuction(parseInt(duration), parseFloat(price), priceID, nftID, parseFloat(nftAmount))
        if(tx) {
            setUploading(true)
            await ApiUtils.auctionUpload(acceptedFiles[0], tx.id)
        }
        setDuration('')
        setPrice('')
        setPriceID('')
        setNFTID('')
        setNFTAmount('')
        acceptedFiles.splice(0, acceptedFiles.length)
        setUploading(false)
        AlertUtils.SystemAlert('Auction was successfully started')
    }

    return(
        <div className = {styles.create}>
            <div className = {styles.container}>
                <div className={styles.certifyTitle}>Create an Auction</div>
                <hr className = {styles.border}/>
                <div {...getRootProps()} className = {styles.dropzone}>
                    <BsPlusCircle size={40} style={{color: theme.dropZone}}/>
                    <input {...getInputProps()} />
                    <p className={styles.upload} style={{color: theme.dropZone}}>
                    {
                        acceptedFiles.length === 1 ?
                            acceptedFiles[0].path
                        :
                            "Click to select or drag and drop a file here"
                    }
                    </p>
                    <p className={styles.uploadComment} style={{color: theme.commentText}}>Max files size: 10GB</p>
                </div>
                <div className = {styles.datasarea}>
                    <div className ={styles.assetData}>
                        <div className = {styles.inputarea}>
                            <div className = {styles.inputTitle} style={{color: theme.commentText}}>Name of Asset</div>
                            <Input className = {styles.inputValue} style={{color: theme.primaryText}} value={assetName} onChange={(e) => setAssetName(e.target.value)} variant= 'flushed' placeholder = ''/>
                        </div>
                        <div className = {styles.inputarea}>
                            <div className = {styles.inputTitle} style={{color: theme.commentText}}>About this asset</div>
                            <Textarea className = {styles.messagezone} style={{color: theme.primaryText}} size={5} value={assetComment} onChange={e => setAssetComment(e.target.value)}/>
                        </div>
                    </div>
                    <div className = {styles.assetIds}>
                        <div className = {styles.inputarea}>
                            <div className = {styles.inputTitle} style={{color: theme.commentText}}>Price asset ID</div>
                            <Input className = {styles.inputValue} style={{color: theme.primaryText}}value={priceID} onChange={(e) => setPriceID(e.target.value)} variant= 'flushed' placeholder = ''/>
                        </div>
                        <div className = {styles.inputarea}>
                            <div className = {styles.inputTitle} style={{color: theme.commentText}}>NFT asset ID</div>
                            <Input className = {styles.inputValue} style={{color: theme.primaryText}} value={nftID} onChange={(e) => setNFTID(e.target.value)} variant= 'flushed' placeholder = ''/>
                        </div>
                        <div className = {styles.inputarea}>
                            <div className = {styles.inputTitle} style={{color: theme.commentText}}>Select NFT Type</div>
                            <div className ={styles.nftType}>
                                <div className={art ? styles.enabledNFT : styles.disabledNFT} style={{color: art? theme.primaryText:theme.commentText, borderColor:art? theme.buttonBack: null}} onClick={() => changeNFT('art')}>Art NFTs</div>
                                <div className={hashDealz ? styles.enabledNFT : styles.disabledNFT} style={{color: hashDealz? theme.primaryText:theme.commentText, borderColor:hashDealz? theme.buttonBack: null}} onClick={() => changeNFT('hashDealz')}>HashDealz</div>
                                <div className={sport ? styles.enabledNFT : styles.disabledNFT} style={{color: sport? theme.primaryText:theme.commentText, borderColor:sport? theme.buttonBack: null}} onClick={() => changeNFT('sport')}>Sport NFTs</div>
                            </div>
                        </div>
                    </div>
                    <div className = {styles.auctionDatas}>
                        <div className = {styles.inputarea}>
                            <div className = {styles.inputTitle} style={{color: theme.commentText}}>Starting price</div>
                            <Input className = {styles.inputValue} style={{color: theme.primaryText}} value={price} onChange={(e) => setPrice(e.target.value)} variant= 'flushed' placeholder = ''/>
                        </div>
                        <div className = {styles.inputarea}>
                            <div className = {styles.inputTitle} style={{color: theme.commentText}}>NFT asset amount</div>
                            <Input className = {styles.inputValue} style={{color: theme.primaryText}} value={nftAmount} onChange={(e) => setNFTAmount(e.target.value)} variant= 'flushed' placeholder = ''/>
                        </div>
                        <div className = {styles.inputarea}>
                            <div className = {styles.inputTitle} style={{color: theme.commentText}}>Duration in block</div>
                            <Input className = {styles.inputValue} style={{color: theme.primaryText}} value={duration} onChange={(e) => setDuration(e.target.value)} variant= 'flushed' placeholder = ''/>
                        </div>
                    </div>
                </div>
                <div className = {styles.feearea}>
                    <div className = {styles.certification} style={{color: theme.feeText}}>
                        <div className = {styles.feeTitle} style={{color: theme.feeText}}>Certification fee:</div>
                        <div className = {styles.fee} style={{color: theme.feeText}}>{certFee} RKMT</div>
                    </div>
                    <div className = {styles.transaction} >
                        <div className = {styles.feeTitle} style={{color: theme.feeText}}>Transaction fee:</div>
                        <div className = {styles.fee} style={{color: theme.feeText}}>{transactionFee} Waves</div>
                    </div>
                </div>
                <div className = {styles.confirmarea}>
                    <a className={cx(styles.button, styles.filled)} onClick={startAuction} style={{backgroundColor: theme.buttonBack}}>Start Auction</a>
                    <div className = {styles.subcomment} style={{color: theme.commentText}}>
                        This transaction is secure and will open waves Signer
                    </div>
                </div>
            </div>

        </div>
    )
}

export default walletContainer(Create)