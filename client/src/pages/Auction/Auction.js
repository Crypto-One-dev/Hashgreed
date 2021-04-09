import React, {useContext, useEffect, useState} from 'react';
import { Button, Checkbox, Spinner, Text } from '@chakra-ui/react';
import cx from 'classnames';
import {FaLock, RiArrowDownCircleLine} from "react-icons/all";
import {useDropzone} from 'react-dropzone';

import AuctionTx from 'component/Auction/Auction';
import ThemeContext from "context/UserContext";
import walletContainer from 'redux/containers/wallet';
import ApiUtils from 'utils/api';
import WavesUtils from 'utils/waves';
import styles from './Auction.module.scss';

function Auction({walletState}) {
    const {theme} = useContext(ThemeContext);
    const [isTransferFormOpen, openTransferForm] = useState(false);
    const [auctions, setAuctions] = useState([]);
    const [height, setHeight] = useState(0);
    const [hidden, setHidden] = useState(false)

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

    const [duration, setDuration] = useState('');
    const [price, setPrice] = useState('');
    const [priceID, setPriceID] = useState('');
    const [nftID, setNFTID] = useState('');
    const [nftAmount, setNFTAmount] = useState('');
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({ accept: 'image/jpeg, image/png' })
    const [uploading, setUploading] = useState(false)

    const startAuction = async () => {
        if(isNaN(price) || price <= 0) {
            alert('Starting Price is not valid');
            return;
        }
        if(isNaN(nftAmount) || nftAmount <= 0) {
            alert('NFT Asset Amount is not valid');
            return;
        }
        if(isNaN(duration) || duration <= 0) {
            alert('Duration in blocks is not valid');
            return;
        }
        if(acceptedFiles.length !== 1) {
            alert('You must upload 1 image for NFT');
            return;
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
        acceptedFiles.splice(0, acceptedFiles.length);
        setUploading(false)
    }

    

    return (
        <div className={styles.wrapper}>
            {
                uploading ?
                    <div className={styles.spinner}>
                        <Spinner size="xl" color="red.500" />
                    </div>
                :
                    null
            }
            <div style={{display: isTransferFormOpen ? 'block' : 'none'}}>
                <div className={cx(styles.header, styles.clickable)} style={{backgroundColor: theme.primaryColor}} onClick={() => openTransferForm(false)}>
                    <span>START AN AUCTION</span>
                    <RiArrowDownCircleLine className={styles.openIcon} />
                </div>
                <div className={styles.container}>
                    <div className={styles.info}>
                        <input
                            className={styles.input}
                            style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}}
                            placeholder="Duration in blocks"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                        <div style={{width: 30}} />
                        <input
                             className={styles.input}
                            style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}}
                            placeholder="Starting Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className={styles.info}>
                        <input
                            className={styles.input}
                            style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}}
                            placeholder="Price Asset ID"
                            value={priceID}
                            onChange={(e) => setPriceID(e.target.value)}
                        />
                    </div>
                    <div className={styles.info}>
                        <input
                            className={styles.input}
                            style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}}
                            placeholder="NFT Asset ID"
                            value={nftID}
                            onChange={(e) => setNFTID(e.target.value)}
                        />
                        <div style={{width: 30}} />
                        <input
                            className={styles.input}
                            style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}}
                            placeholder="NFT Asset Amount"
                            value={nftAmount}
                            onChange={(e) => setNFTAmount(e.target.value)}
                        />
                    </div>
                    <div {...getRootProps()} className={styles.dropZone} style={{backgroundColor: theme.itemBackground, color: theme.buttonBack, borderColor: theme.manageTokenHighlight}}>
                        <input {...getInputProps()} />
                        <p>
                        {
                            acceptedFiles.length === 1 ?
                                acceptedFiles[0].path
                            :
                                "Select or Drop a file"
                        }
                        </p>
                    </div>
                    <div className={styles.buttonArea}>
                        <div className={styles.lock} style={{backgroundColor: theme.buttonBack, color: '#ffffff'}}>
                            <FaLock className={styles.icon} />
                        </div>
                        <div className={styles.description} style={{color: theme.primaryText}}>This transaction is secure and will open Waves Signer</div>
                        <div className={styles.feeArea}>
                        </div>
                        <Button className={cx(styles.transfer, styles.clickable)} style={{backgroundColor: theme.buttonBack}} onClick={startAuction}>
                            START AUCTION
                        </Button>
                    </div>
                </div>
            </div>
            <div className={styles.header} style={{backgroundColor: theme.primaryColor}}>
                AUCTION HISTORY
            </div>
            <div className={styles.subheader} style={{color: theme.primaryText}}>
                <Checkbox className={styles.checkbox} isChecked={hidden} onChange={e => setHidden(e.target.checked)}>
                    <Text color={theme.primaryText}>Show Soldout/Withdrawn Auctions</Text>
                </Checkbox>
                <Button
                    className={cx(styles.transferForm, styles.clickable)}
                    onClick={() => openTransferForm(!isTransferFormOpen)}
                    style={{backgroundColor: theme.buttonBack}}
                >
                    {
                        isTransferFormOpen ? 'CLOSE THE FORM' : 'START AUCTION NOW'
                    }
                </Button>
            </div>
            <div className={styles.auctions}>
                {auctions.map((auction, index) => (
                    hidden || !auction.operator ?
                        <AuctionTx key={index} detail={auction} owner={walletState.address} height={height} />
                    : null
                ))}
            </div>
        </div>
    )
}

export default walletContainer(Auction);