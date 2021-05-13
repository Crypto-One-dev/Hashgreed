import React, {useContext, useEffect, useState}from 'react'

import {useDropzone} from 'react-dropzone'
import {Input} from '@chakra-ui/react'
import {BsPlusCircle} from 'react-icons/all'

import cx from 'classnames'
import styles from './Create.module.scss'
import ApiUtils from 'utils/api'
import WavesUtils from 'utils/waves'
import AlertUtils from 'utils/alert'
import WavesConfig from 'config/waves'
import walletContainer from 'redux/containers/wallet'

function Create({walletState}){

    const [isTransferFormOpen, openTransferForm] = useState(false)
    const [auctions, setAuctions] = useState([])
    const [height, setHeight] = useState(0)
    const certFee = 100
    const transactionFee = 0.001

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
                    <BsPlusCircle size={40}/>
                    <input {...getInputProps()} />
                    <p className={styles.upload}>
                    {
                        acceptedFiles.length === 1 ?
                            acceptedFiles[0].path
                        :
                            "Click to select or drag and drop a file here"
                    }
                    </p>
                    <p className={styles.uploadComment}>Max files size: 10GB</p>
                </div>
                <div className = {styles.datasarea}>
                    <div className = {styles.assetIds}>
                        <div className = {styles.inputarea}>
                            <div className = {styles.inputTitle}>Price asset ID</div>
                            <Input className = {styles.inputValue} value={priceID} onChange={(e) => setPriceID(e.target.value)} variant= 'flushed' placeholder = ''/>
                        </div>
                        <div className = {styles.inputarea}>
                            <div className = {styles.inputTitle}>NFT asset ID</div>
                            <Input className = {styles.inputValue} value={nftID} onChange={(e) => setNFTID(e.target.value)} variant= 'flushed' placeholder = ''/>
                        </div>
                    </div>
                    <div className = {styles.auctionDatas}>
                        <div className = {styles.inputarea}>
                            <div className = {styles.inputTitle}>Starting price</div>
                            <Input className = {styles.inputValue}  value={price} onChange={(e) => setPrice(e.target.value)} variant= 'flushed' placeholder = ''/>
                        </div>
                        <div className = {styles.inputarea}>
                            <div className = {styles.inputTitle}>NFT asset amount</div>
                            <Input className = {styles.inputValue} value={nftAmount} onChange={(e) => setNFTAmount(e.target.value)} variant= 'flushed' placeholder = ''/>
                        </div>
                        <div className = {styles.inputarea}>
                            <div className = {styles.inputTitle}>Duration in block</div>
                            <Input className = {styles.inputValue} value={duration} onChange={(e) => setDuration(e.target.value)} variant= 'flushed' placeholder = ''/>
                        </div>
                    </div>
                </div>
                <div className = {styles.feearea}>
                    <div className = {styles.certification}>
                        <div className = {styles.feeTitle}>Certification fee:</div>
                        <div className = {styles.fee}>{certFee} RKMT</div>
                    </div>
                    <div className = {styles.transaction}>
                        <div className = {styles.feeTitle}>Transaction fee:</div>
                        <div className = {styles.fee}>{transactionFee} Waves</div>
                    </div>
                </div>
                <div className = {styles.confirmarea}>
                    <a className={cx(styles.button, styles.filled)} onClick={startAuction}>Start Auction</a>
                    <div className = {styles.subcomment}>
                        This transaction is secure and will open waves Signer
                    </div>
                </div>
            </div>

        </div>
    )
}

export default walletContainer(Create)