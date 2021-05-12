import React, {useCallback, useEffect, useState} from 'react'
import walletContainer from 'redux/containers/wallet'

import cx from 'classnames'
import {Input, Checkbox} from '@chakra-ui/react'
import {BsPlusCircle} from 'react-icons/all'
import {useDropzone} from 'react-dropzone'
import { v5 as uuidgen } from 'uuid';
import {sha256} from 'js-sha256';

import styles from './File.module.scss'
import ApiUtils from 'utils/api';
import WavesUtils from 'utils/waves';
import WavesConfig from 'config/waves';

function File({walletState}){

    const [certifications, setCertifications] = useState([]);

    const certFee = 100;
    const transactionFee = 0.001;

    useEffect(() => {
      let interval = -1
      if(walletState.address) {
        const proc = () => {
            ApiUtils.getCertifications('data_fc_([A-Za-z0-9]*)_' + walletState.address, setCertifications);
        }
        proc()
        interval = setInterval(proc, 60000)
      }
    
      return () => {
        if(interval > -1) {
          clearInterval(interval)
        }
      }
    }, [walletState.address])

    const [hash, setHash] = useState('');
    const [reference, setReference] = useState('');
    const [uuid, setUUID] = useState('');
    const [store, setStore] = useState(false)
    const [uploading, setUploading] = useState(false)

    const onDrop = useCallback(acceptedFiles => {
        if(acceptedFiles.length === 1) {
            const reader = new FileReader()
            reader.onload = () => {
                const binaryStr = reader.result
                const hash = sha256(binaryStr)
                setHash(hash)
                setReference(acceptedFiles[0].path)
                setUUID(uuidgen(hash, WavesConfig.UUID_NAMESPACE))
            }
            reader.readAsArrayBuffer(acceptedFiles[0])
        }
    }, [])
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop})

    const certifyFile = async () => {
        if(acceptedFiles.length === 1 && hash && reference && uuid) {
            const timestamp = Date.now()
            const tx = await WavesUtils.CertifyFile(reference, hash, uuid, timestamp, walletState.publicKey, certFee, transactionFee)
            if(tx && store) {
                setUploading(true)
                await ApiUtils.fileUpload(acceptedFiles[0], tx.id)
            }
        }
        acceptedFiles.splice(0, acceptedFiles.length);
        setHash('')
        setReference('')
        setUUID('')
        setStore(false)
        setUploading(false)
    }

    return(
        <div className= {styles.file}>
            <div className = {styles.container}>
                <div className={styles.certifyTitle}>Certify a file</div>
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
                <div className = {styles.hasharea}>
                    <div className = {styles.reference}>
                        <div className = {styles.inputTitle}>
                            Reference 
                            <div className = {styles.inputTitleSm}>(0-45 chars)</div>
                        </div>
                        <Input className = {styles.inputValue} variant="flushed" placeholder="" value={reference} onChange={e => setReference(e.target.value)}/>
                    </div>
                    <div className = {styles.hash}>
                        <div className = {styles.inputTitle}>
                            File hash <div className = {styles.inputTitleSm}>(No file is sent or stored online unless you choose IPFS option)</div>
                        </div>
                        <Input className = {styles.inputValue} variant="flushed" placeholder="" value={hash} onChange={e => setHash(e.target.value)} />
                        <Checkbox size="sm" className = {styles.checkbox}>
                            Store file on IPFS (max 30MB)
                        </Checkbox>
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
                    <a className={cx(styles.button, styles.filled)} onClick={certifyFile}>Certify file</a>
                    <div className = {styles.subcomment}>
                        This transaction is secure and will open waves Signer
                    </div>
                </div>
            </div>
        </div>
    )
}

export default walletContainer(File)