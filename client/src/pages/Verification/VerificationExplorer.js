import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import cx from 'classnames'
import {sha256} from 'js-sha256'
import moment from 'moment'
import WavesConfig from 'config/waves'
import ApiUtils from 'utils/api'
import AlertUtils from 'utils/alert'
import {useDropzone} from 'react-dropzone'
import {Input, Textarea} from '@chakra-ui/react'
import {BsPlusCircle} from 'react-icons/all'
import Balances from 'pages/AuthLayout/components/Balances'

import styles from './VerificationExplorer.module.scss'

function VerificationExplorer({query}){

    const [transactionID, setTransactionID] = useState('');
    const [hashID, setHashID] = useState('');
    const [reference, setReference] = useState('');
    const searchButton = useRef(null);
    const [certification, setCertification] = useState();
    const transactionFee = 0.01;
    const certFee = 100;


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
                if(found.length === 1) {
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
        <>
        <Balances/>
        <div className={styles.verficationExplorer}>
            <div className={styles.container}>
                <div className={styles.verificationTitle}>Certify a file</div>
                <hr className = {styles.border}/>
                <div className={styles.uploadarea}>
                    <div {...poc.getRootProps()} className={styles.certification}>
                        <BsPlusCircle size={40}/>
                        <input {...poc.getInputProps()} />
                        <p className={styles.upload}>
                        {
                            poc.acceptedFiles.length === 1 ?
                            poc.acceptedFiles[0].path
                            :
                                "Select or drop a proof of certification"
                        }
                        </p>
                        <p className={styles.uploadComment}>Max files size: 10GB</p>
                    </div>
                    <div {...fth.getRootProps()} className={styles.hash}>
                        <BsPlusCircle size={40}/>
                        <input {...fth.getInputProps()} />
                        <p className={styles.upload}>
                        {
                            fth.acceptedFiles.length === 1 ?
                            fth.acceptedFiles[0].path
                            :
                                "Select or drop a file to hash"
                        }
                        </p>
                        <p className={styles.uploadComment}>Max files size: 10GB</p>
                    </div>
                </div>
                <div className={styles.transactionarea}>
                    <div className ={styles.transactionId}>
                            <div className = {styles.inputTitle}>Transaction ID</div>
                            <Input className = {styles.inputValue} value={transactionID} onChange={e => setTransactionID(e.target.value)} variant="flushed" placeholder=""/>
                    </div>
                    <div className ={styles.fileHash}>
                        <div className = {styles.inputTitle}>File hash or message ID</div>
                        <Input className = {styles.inputValue} value={hashID} onChange={e => setHashID(e.target.value)} variant="flushed" placeholder=""/>
                    </div>
                </div>
                <div className={styles.reference}>
                    <div className = {styles.inputTitle}>Reference</div>
                    <Input className = {styles.inputValue} value={reference} onChange={e => setReference(e.target.value)} variant="flushed" placeholder=""/>        
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
                    <a className={cx(styles.button, styles.filled)} onClick={Search}>Search</a>
                    <div className = {styles.subcomment}>
                        This transaction is secure and will open waves Signer
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default VerificationExplorer