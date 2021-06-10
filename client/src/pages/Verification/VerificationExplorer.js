import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import cx from 'classnames'
import {sha256} from 'js-sha256'
import moment from 'moment'
import WavesConfig from 'config/waves'
import ApiUtils from 'utils/api'
import AlertUtils from 'utils/alert'
import {useDropzone} from 'react-dropzone'
import {Input} from '@chakra-ui/react'
import {BsPlusCircle} from 'react-icons/all'
import QRCode from 'qrcode.react';
import certBG from 'assets/images/certificate_bg.jpg'
import {ThemeContext} from 'context/ThemeContext'

import styles from './VerificationExplorer.module.scss'

function VerificationExplorer({query}){

    const [transactionID, setTransactionID] = useState('');
    const [hashID, setHashID] = useState('');
    const [reference, setReference] = useState('');
    const searchButton = useRef(null);
    const [certification, setCertification] = useState();
    const {theme} = useContext(ThemeContext)

    useEffect(() => {
        if(query) {
            setTransactionID(query)
            setTimeout(() => {
                searchButton.current.click();
            }, 1000)
        }
    }, [query, setTransactionID])

    const onCertDrop = useCallback(acceptedFiles => {
        if(acceptedFiles.length === 1) {
            const reader = new FileReader()
            reader.onload = () => {
                const str = reader.result
                const regex = /https:\/\/wavesexplorer.com\/tx\/[A-Za-z0-9]*/g;
                const found = str.match(regex);
                if(found != null && found.length === 1) {
                    const txid = found[0].replace('https://wavesexplorer.com/tx/', '')
                    ApiUtils.searchCertification(txid, '', '', setCertification)
                } else {
                    AlertUtils.SystemAlert('Not supported certification')
                }
            }
            reader.readAsText(acceptedFiles[0])
        }
    }, [])
    const poc = useDropzone({onDrop: onCertDrop})
    const onFileDrop = useCallback(acceptedFiles => {
        if(acceptedFiles.length === 1) {
            const reader = new FileReader()
            reader.onload = () => {
                const binaryStr = reader.result
                setTransactionID('')
                setHashID(sha256(binaryStr))
                setReference('')
            }
            reader.readAsArrayBuffer(acceptedFiles[0])
        }
    }, [])
    const fth = useDropzone({onDrop: onFileDrop})

    const Search = () => {
        if(!transactionID && !hashID && !reference) {
            return
        }
        ApiUtils.searchCertification(transactionID, hashID, reference, setCertification)
    }

    return(
        <div className={styles.verficationExplorer}>
            <div className={styles.container}>
                <div className={styles.verificationTitle} style={{color: theme.primaryText}}>Verification Explorer</div>
                <hr className = {styles.border}/>
                <div className={styles.uploadarea}>
                    <div {...poc.getRootProps()} className={styles.certification}>
                        <BsPlusCircle size={40} style={{color: theme.dropZone}}/>
                        <input {...poc.getInputProps()} />
                        <p className={styles.upload} style={{color: theme.dropZone}}>
                        {
                            poc.acceptedFiles.length === 1 ?
                            poc.acceptedFiles[0].path
                            :
                                "Select or drop a proof of certification"
                        }
                        </p>
                        <p className={styles.uploadComment} style={{color: theme.commentText}}>Max files size: 10GB</p>
                    </div>
                    <div {...fth.getRootProps()} className={styles.hash}>
                        <BsPlusCircle size={40} style={{color: theme.dropZone}}/>
                        <input {...fth.getInputProps()} />
                        <p className={styles.upload} style={{color: theme.dropZone}}>
                        {
                            fth.acceptedFiles.length === 1 ?
                            fth.acceptedFiles[0].path
                            :
                                "Select or drop a file to hash"
                        }
                        </p>
                        <p className={styles.uploadComment} style={{color: theme.commentText}}>Max files size: 10GB</p>
                    </div>
                </div>
                <div className={styles.transactionarea}>
                    <div className ={styles.transactionId}>
                            <div className = {styles.inputTitle} style={{color: theme.commentText}}>Transaction ID</div>
                            <Input className = {styles.inputValue} style={{color: theme.primaryText}} value={transactionID} onChange={e => setTransactionID(e.target.value)} variant="flushed" placeholder=""/>
                    </div>
                    <div className ={styles.fileHash}>
                        <div className = {styles.inputTitle} style={{color: theme.commentText}}>File hash or message ID</div>
                        <Input className = {styles.inputValue} style={{color: theme.primaryText}} value={hashID} onChange={e => setHashID(e.target.value)} variant="flushed" placeholder=""/>
                    </div>
                </div>
                <div className={styles.reference}>
                    <div className = {styles.inputTitle} style={{color: theme.commentText}}>Reference</div>
                    <Input className = {styles.inputValue} style={{color: theme.primaryText}} maxLength={60} value={reference} onChange={e => setReference(e.target.value)} variant="flushed" placeholder=""/>        
                </div>
                <div className = {styles.confirmarea}>
                    <a className={cx(styles.button, styles.filled)} onClick={() => Search} style={{backgroundColor: theme.buttonBack}}>Search</a>
                </div>
                <div className={styles.explorerListWrapper}>
                    {
                        certification ?
                            <div className={styles.explorerList}>
                                <div className={styles.item} style={{backgroundImage: `url(${certBG})`}}>
                                    <span style={{fontSize: 20}}>
                                        <b>PROOF OF CERTIFICATION</b>
                                    </span>
                                    <span style={{color: 'white', fontSize: 14, fontWeight: 'bold', padding: '5px 25px'}}>
                                        THE FOLLOWING FILE WAS CERTIFIED ON
                                        <br/>
                                        THE WAVES BLOCKCHAIN
                                    </span>
                                    <span>
                                        <i>BY {certification.address}</i>
                                    </span>
                                    <span>
                                        <b>Reference:</b>
                                        <br/>
                                        {certification.title || certification.reference}
                                    </span>
                                    <span>
                                        <b>Date:</b>
                                        <br/>
                                        {moment(certification.timestamp).toString()}
                                    </span>
                                    <span>
                                        <b>{certification.hash ? 'File Hash' : 'Message ID'}:</b>
                                        <br/>
                                        {certification.hash || certification.messageid}
                                    </span>
                                    <a href={`${WavesConfig.EXPLORER_URL}/tx/${certification.txid}`} target="_blank" rel="noreferrer">
                                        SEE ON WAVES EXPLORER
                                    </a>
                                    <QRCode value={WavesConfig.BASE_URL + '/explorer/' + certification.txid} includeMargin={true} size={72} className={styles.qr} />
                                    {
                                        certification.status?
                                            <span className={styles.status}>
                                                <a href={"http://wavesexplorer.com/tx/" + certification.status.replace('REVOKED_', '')} target="_blank" rel="noreferrer">
                                                    REVOKED
                                                </a>
                                            </span>
                                        :
                                            null
                                    }
                                </div>
                            </div>
                        :
                            null
                    }
            </div>
            </div>
        </div>

    )
}

export default VerificationExplorer