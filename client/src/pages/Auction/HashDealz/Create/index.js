import React, { useContext, useEffect, useState, useRef } from 'react'

import { useDropzone } from 'react-dropzone'
import { Input, Textarea } from '@chakra-ui/react'
import { BsPlusCircle } from 'react-icons/all'

import cx from 'classnames'
import styles from './Create.module.scss'
import ApiUtils from 'utils/api'
import WavesUtils from 'utils/waves'
import AlertUtils from 'utils/alert'
import WavesConfig from 'config/waves'
import walletContainer from 'redux/containers/wallet'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import{
    Popover,
    PopoverTrigger,
    PopoverContent,
    FormLabel
  } from '@chakra-ui/react'
import { ThemeContext } from 'context/ThemeContext'
import "react-alice-carousel/lib/alice-carousel.css"
import AliceCarousel from 'react-alice-carousel'
import Prev from 'assets/images/left.png'
import Next from 'assets/images/right.png'

function Create({ walletState }) {

    const certFee = 100
    const transactionFee = 0.005
    const { theme } = useContext(ThemeContext)
    const [duration, setDuration] = useState('')
    const [price, setPrice] = useState('')
    const [assetName, setAssetName] = useState('')
    const [assetComment, setAssetComment] = useState('')
    const [priceID, setPriceID] = useState('')
    const [nftID, setNFTID] = useState(WavesConfig.RKMT_ID)
    const [nftAmount, setNFTAmount] = useState('')
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ accept: 'image/jpeg, image/png' })
    const [uploading, setUploading] = useState(false)
    const clipboard = useRef(null);
    const clipboardPrice = useRef(null);
    const [imgsrc, setImgsrc] = useState([])
    const assetType = 'HashDealz'
    const carousel = useRef(null)

    const [nft, setNFT] = useState({
      name: '',
      decimals: 0,
      description: ''
    })
    const [priceData, setPriceData] = useState({
        name: '',
        decimals: 0,
        description: ''
    })
    useEffect(() => {
        if (walletState.address) {
            const proc = () => {
                if(nftID && nftID !== '')
                    ApiUtils.getAssetInfo(nftID, setNFT)
                if(priceID && priceID !== '')
                    ApiUtils.getAssetInfo(priceID, setPriceData)
            }
            proc()
        }
        num=0
        setImgsrc([])
        acceptedFiles && acceptedFiles.map((cert) =>{
            let reader = new FileReader()
            reader.readAsDataURL(cert)
            reader.onloadend = function () {
                setImgsrc(imgsrc => imgsrc.concat(URL.createObjectURL(cert))) 
            }
        })
    }, [walletState.address, nftID, priceID, acceptedFiles, setImgsrc])

    const setNFTIDs = (id) => {
      setNFTID(id)
    }

    const startAuction = async () => {
        if (isNaN(price) || price <= 0) {
            AlertUtils.SystemAlert('Starting Price is not valid')
            return
        }
        if (isNaN(nftAmount) || nftAmount <= 0) {
            AlertUtils.SystemAlert('NFT Asset Amount is not valid')
            return
        }
        if (isNaN(duration) || duration <= 0) {
            AlertUtils.SystemAlert('Duration in minutes is not valid')
            return
        }
        if (acceptedFiles.length < 1) {
            AlertUtils.SystemAlert('You must upload at least 1 image for HashDealz')
            return
        }
        if (acceptedFiles.length > 8) {
            AlertUtils.SystemAlert('You can upload up to 8 images for HashDealz')
            return
        }
        const tx = await WavesUtils.StartAuction(parseInt(duration), parseFloat(price), priceID, nftID, parseFloat(nftAmount))
        if (tx) {
            setUploading(true)
            acceptedFiles.forEach(async (file) => { 
                await ApiUtils.auctionUpload(file, tx.id, assetType, assetName, assetComment)
            });
        }
        setDuration('')
        setPrice('')
        setPriceID('')
        setNFTAmount('')
        setAssetName('')
        setAssetComment('')
        acceptedFiles.splice(0, acceptedFiles.length)
        setImgsrc([])
        acceptedFiles.length =0;
        setUploading(false)
        AlertUtils.SystemAlert('Auction was successfully started')
    }

var num=0
    return (
        <div className={styles.create}>
            <div className={styles.container}>
                <div className={styles.nftType}>
                    <div className={styles.enabledNFT} style={{ color: theme.primaryText, borderColor: theme.buttonBack }}>HashDealz</div>
                </div>
                <div className={styles.certifyTitle}>Create an Auction</div>
                <hr className={styles.border} />
                <div {...getRootProps()} className={styles.dropzone}>
                    <BsPlusCircle size={40} style={{ color: theme.dropZone }} />
                    <input {...getInputProps()} multiple/>
                    <p className={styles.upload} style={{ color: theme.dropZone }}>
                        {
                            acceptedFiles.length>=1 ?
                            acceptedFiles.length === 1?
                                acceptedFiles.length + ' image is selected.'
                                :
                                acceptedFiles.length + ' images are selected.'
                                :
                                "Click to select or drag and drop a file here"
                        }
                    </p>
                    <p className={styles.uploadComment} style={{ color: theme.commentText }}>Max files size: 10GB</p>
                </div>
                {
                    imgsrc && imgsrc.length > 0 ?
                        <div className={styles.carouselArea}>
                            <div className={styles.piccarousel}>
                                <img src = {Prev} className = {styles.leftIcon} style={{color: theme.primaryText}} onClick={()=>{carousel.current.slidePrev()}} alt = ""/>
                                <AliceCarousel
                                ref={carousel} disableDotsControls={true} disableButtonsControls={true} playButtonEnabled={false} autoPlayActionDisabled={true}>
                                {
                                        imgsrc && imgsrc.map((result) =>{
                                            num++;
                                            return (
                                            <div className = {styles.picCell} key={num} style={{backgroundColor: theme.stepBackground}}>
                                                <img src={result} className={styles.img} alt=""/>
                                            </div>
                                            ) 
                                        })
                                    }
                                </AliceCarousel>
                                <img src = {Next} className = {styles.rightIcon} onClick={()=>{carousel.current.slideNext()}} alt = ""/>
                            </div>
                        </div>
                    :
                        null
                }
                <div className={styles.datasarea}>
                    <div className={styles.assetData}>
                        <div className={styles.inputarea}>
                            <div className={styles.inputTitle} style={{ color: theme.commentText }}>Name of Asset</div>
                            <Input className={styles.inputValue} style={{ color: theme.primaryText }} value={assetName} onChange={(e) => setAssetName(e.target.value)} variant='flushed' placeholder='' />
                        </div>
                        <div className={styles.inputarea}>
                            <div className={styles.inputTitle} style={{ color: theme.commentText }}>About this asset</div>
                            <Textarea className={styles.messagezone} style={{ color: theme.primaryText }} size={5} value={assetComment} onChange={e => setAssetComment(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.assetIds}>
                    <div className={styles.inputarea}>
                            <div className={styles.inputTitle} style={{ color: theme.commentText }}>
                                Price asset ID
                                {
                                    priceData.description && priceData.description !== '' && priceData.description !== null ?
                                    <>
                                    <CopyToClipboard text={WavesConfig.EXPLORER_URL + '/assets/' + priceID}>
                                    <span ref={clipboardPrice}></span>
                                    </CopyToClipboard>
                                    <Popover  placement='bottom'>
                                    <PopoverTrigger>
                                        <span className={styles.question} style={{backgroundColor: theme.buttonBack}} onClick={() => clipboardPrice.current.click()}>
                                        ?
                                        </span>
                                    </PopoverTrigger>
                                    <PopoverContent bg='rgba(0, 4, 81, 0.4)' className = {styles.content}>
                                        {
                                        priceData.description && priceData.description !== '' && priceData.description !== null ?
                                        <div className={styles.submenu}>
                                            <div className={styles.subitem} >{priceData.description}</div>
                                        </div>
                                        :
                                        null
                                        }
                                    </PopoverContent>
                                    </Popover>
                                    </>
                                    :
                                    null
                                }
                            </div>
                            <Input className={styles.inputValue} style={{ color: theme.primaryText }} value={priceID} onChange={(e) => setPriceID(e.target.value)} variant='flushed' placeholder='' />
                        </div>
                        <div className={styles.inputarea}>
                            <div className={styles.inputTitle} style={{ color: theme.commentText }}>
                                NFT asset ID
                                {/* {
                                    nft.description && nft.description !== '' && nft.description !== null ?
                                    <>
                                    <CopyToClipboard text={WavesConfig.EXPLORER_URL + '/assets/' + nftID}>
                                    <span ref={clipboard}></span>
                                    </CopyToClipboard>
                                    <Popover  placement='bottom'>
                                    <PopoverTrigger>
                                        <span className={styles.question} style={{backgroundColor: theme.buttonBack}} onClick={() => clipboard.current.click()}>
                                        ?
                                        </span>
                                    </PopoverTrigger>
                                    <PopoverContent bg='rgba(0, 4, 81, 0.4)' className = {styles.content}>
                                        {
                                        nft.description && nft.description !== '' && nft.description !== null ?
                                        <div className={styles.submenu}>
                                            <div className={styles.subitem} >{nft.description}</div>
                                        </div>
                                        :
                                        null
                                        }
                                    </PopoverContent>
                                    </Popover>
                                    </>
                                    :
                                    null
                                } */}
                            </div>
                            <Input variant="unstyled" className={styles.inputValue} style={{ color: theme.primaryText }} value={WavesConfig.RKMT_ID} onChange={(e) => setNFTIDs(e.target.value)} variant='flushed' placeholder='' disabled/>
                        </div>
                    </div>
                    <div className={styles.auctionDatas}>
                        <div className={styles.inputarea}>
                            <div className={styles.inputTitle} style={{ color: theme.commentText }}>Starting price</div>
                            <Input className={styles.inputValue} style={{ color: theme.primaryText }} value={price} onChange={(e) => setPrice(e.target.value)} variant='flushed' placeholder='' />
                        </div>
                        <div className={styles.inputarea}>
                            <div className={styles.inputTitle} style={{ color: theme.commentText }}>NFT asset amount</div>
                            <Input className={styles.inputValue} style={{ color: theme.primaryText }} value={nftAmount} onChange={(e) => setNFTAmount(e.target.value)} variant='flushed' placeholder='' />
                        </div>
                        <div className={styles.inputarea}>
                            <div className={styles.inputTitle} style={{ color: theme.commentText }}>Duration in minutes</div>
                            <Input className={styles.inputValue} style={{ color: theme.primaryText }} value={duration} onChange={(e) => setDuration(e.target.value)} variant='flushed' placeholder='' />
                        </div>
                    </div>
                </div>
                <div className={styles.feearea}>
                    <div className={styles.transaction} >
                        <div className={styles.feeTitle} style={{ color: theme.feeText }}>Transaction fee:</div>
                        <div className={styles.fee} style={{ color: theme.feeText }}>{transactionFee} Waves</div>
                    </div>
                </div>
                <div className={styles.confirmarea}>
                    <a className={cx(styles.button, styles.filled)} onClick={startAuction} style={{ backgroundColor: theme.buttonBack }}>Create</a>
                    <div className={styles.subcomment} style={{ color: theme.commentText }}>
                        This transaction is secure and will open waves Signer
                    </div>
                </div>
            </div>

        </div>
    )
}

export default walletContainer(Create)