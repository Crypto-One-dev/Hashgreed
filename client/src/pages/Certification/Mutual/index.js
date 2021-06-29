import React, {useCallback, useEffect, useState, useContext} from 'react'

import cx from 'classnames'
import {Input, Checkbox, Textarea} from '@chakra-ui/react'
import {BsPlusCircle} from 'react-icons/all'
import {useDropzone} from 'react-dropzone'
import { v5 as uuidgen } from 'uuid'
import {sha256} from 'js-sha256'


import styles from './Mutual.module.scss'
import ApiUtils from 'utils/api'
import WavesUtils from 'utils/waves'
import WavesConfig from 'config/waves'
import walletContainer from 'redux/containers/wallet'
import MutualCertification from 'components/MutualCertification/MutualCertification'
import AlertUtils from 'utils/alert'
import {ThemeContext} from 'context/ThemeContext'

function Mutual({walletState}){

    const [certifications, setCertifications] = useState([])
    const [certFee, setCertFee] = useState(100)
    const transactionFee = 0.009
    const {theme} = useContext(ThemeContext)

    useEffect(() => {
        if(walletState.address) {
          const proc = () => {
              ApiUtils.getMutualCertifications(walletState.address, setCertifications)
          }
          proc()
        }
    }, [walletState.address])

    const [hash, setHash] = useState('')
    const [reference, setReference] = useState('')
    const [uuid, setUUID] = useState('')
    const [store, setStore] = useState(false)
    const [recipients, setRecipients] = useState('')
    const [uploading, setUploading] = useState(false)
    const [txid, setTxid] = useState(null);
    const [creator, setCreator] = useState(null);
    const [toggle, settoggle] = useState(false);
    const [counterparts, setCounterparts] = useState([])
    const [detail0, setDetail] = useState(null)
  
    const toggleDetail = (detail,flag) => {
      if(detail !== '' && detail){
        let split = detail.key.split('_')
        setTxid(split[2])
        setCreator(split[3])
        ApiUtils.getCounterparts(split[2], setCounterparts)
        setDetail(detail)
        settoggle(flag)
      }
      else{
        settoggle(flag)
      }
    }

    let sign = async () => {
        const tx = await WavesUtils.SignMutual(detail0.hash, txid, walletState.publicKey)
        if(tx) {
            AlertUtils.SystemAlert('You signed the contract successfully, Transaction ID: ' + tx.id)
        }
    }

    useEffect(() => {
        let lines = recipients.trim().split('\n').length
        if(!recipients.trim())
            lines = 0
        setCertFee(lines > 5 ? 600 : (lines + 1) * 100)
    }, [recipients])
    
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

    const Certify = async () => {
        const recp = recipients.trim().split('\n')
        if(acceptedFiles.length === 1 && hash && reference && uuid && recp.length > 0) {
            const timestamp = Date.now()
            const tx = await WavesUtils.CertifyMutual(reference, hash, recp, uuid, timestamp, walletState.publicKey, certFee, transactionFee)
            if(tx && store) {
                setUploading(true)
                await ApiUtils.fileUpload(acceptedFiles[0], tx.id)
            }
        }
        acceptedFiles.splice(0, acceptedFiles.length)
        setHash('')
        setReference('')
        setUUID('')
        setStore(false)
        setUploading(false)
        setRecipients('')
    }
    return(
        <div className = {styles.mutual}>
           <div className = {styles.container}>
                <div className={styles.certifyTitle} style={{color: theme.primaryText}}>Certify a mutual agreement</div>
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
                <div className = {styles.hasharea}>
                    <div className = {styles.reference}>
                        <div className = {styles.inputTitle} style={{color: theme.commentText}}>
                            Reference 
                            <div className = {styles.inputTitleSm} style={{color: theme.commentText}}>(0-60 chars)</div>
                        </div>
                        <Input className = {styles.inputValue} style={{color: theme.primaryText}} variant="flushed" placeholder="" value={reference} onChange={e => setReference(e.target.value)} maxLength={60}/>
                    </div>
                    <div className = {styles.hash}>
                        <div className = {styles.inputTitle} style={{color: theme.commentText}}>
                            File hash <div className = {styles.inputTitleSm}>(No file is sent or stored online unless you choose IPFS option)</div>
                        </div>
                        <Input className = {styles.inputValue} style={{color: theme.primaryText}} variant="flushed" placeholder="" value={hash} onChange={e => setHash(e.target.value)} />
                        <Checkbox size="sm" className = {styles.checkbox} isChecked={store} onChange={e => setStore(e.target.checked)}>
                            <div className = {styles.checkcomment} style={{color: theme.commentText}}>Store file on IPFS (max 30MB)</div>
                        </Checkbox>
                    </div>
                </div>
                <div className = {styles.addressesarea}>
                    <div className = {styles.headerTitle} style={{color: theme.commentText}}>Enter Counterparts Addresses (not alias), one per line. (5Max)</div>
                    <Textarea rows = {5} className = {styles.textarea} style={{color: theme.primaryText}} value={recipients}
                                    onChange={e => setRecipients(e.target.value)}/>
                    <div className = {styles.bottomTitle} style={{color: theme.commentText}}>Recipient Addresses (5 max) Enter all counterparts with one address (no alias) per line</div>
                </div>
                <div className = {styles.feearea}>
                    <div className = {styles.certification}>
                        <div className = {styles.feeTitle} style={{color: theme.feeText}}>Certification fee:</div>
                        <div className = {styles.fee} style={{color: theme.feeText}}>{certFee} RKMT</div>
                    </div>
                    <div className = {styles.transaction}>
                        <div className = {styles.feeTitle} style={{color: theme.feeText}}>Transaction fee:</div>
                        <div className = {styles.fee} style={{color: theme.feeText}}>{transactionFee} Waves</div>
                    </div>
                </div>
                <div className = {styles.confirmarea}>
                    <a className={cx(styles.button, styles.filled)} style={{backgroundColor: theme.buttonBack}} onClick={Certify}>Create agreement</a>
                    <div className = {styles.subcomment} style={{color: theme.commentText}}>
                        This transaction is secure and will open waves Signer
                    </div>
                </div>
            </div>
            <div className={styles.mutualCertificationList}>
                <MutualCertification certifications={certifications} owner={walletState.address} toggleDetails = {toggleDetail} />
            </div>
            <div className={toggle? styles.message: styles.messageHide} style={{color: theme.primaryText}}>
              <div className={styles.aggrement}>
                <div className={styles.subData}>
                  <div className={styles.title}>
                    Agreement creator: 
                  </div>
                  <div className={styles.value}>
                    {creator}
                  </div>
                </div>
                <div className={styles.subData}>
                  <div className={styles.title}>
                    Agreement ID: 
                  </div>
                  <div className={styles.value}>
                    <a href={`${WavesConfig.EXPLORER_URL}/tx/${txid}`} target="_blank" rel="noreferrer" className={styles.signLink} >{txid}</a>
                  </div>
                </div>
              </div>
              <div className={styles.counterparts_title}>Counterparts</div>
              <div className={styles.counterparts}>
                {
                  counterparts.map((each, index) => {
                    return <div key={index}>
                      {
                        each.status === 'PENDING' ?
                          <>
                            <div className={styles.signLink}>{each.address}</div>
                            <span
                              className={cx(styles.signStatus, each.address === walletState.address ? styles.sign : styles.pending, each.address === walletState.address ? styles.clickable : null)}
                              onClick={each.address === walletState.address ? sign : null}
                            >
                              {
                                each.address === walletState.address ? 'Click to sign' : 'PENDING'
                              }
                            </span>
                          </>
                        :
                          <>
                            <div className={styles.signLink}>
                              <a href={`${WavesConfig.EXPLORER_URL}/tx/${each.status}`} target="_blank" rel="noreferrer">{each.address}</a>
                            </div>
                            <span className={cx(styles.signStatus, styles.signed)}>SIGNED</span>
                          </>
                      }
                    </div>
                  })
                }
              </div>
            </div> 
        </div>
    )
}

export default walletContainer(Mutual)