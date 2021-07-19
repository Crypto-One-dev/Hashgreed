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
import {CopyToClipboard} from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';
import certBG from 'assets/images/certificate_bg.jpg'
import {ThemeContext} from 'context/ThemeContext'
import {FaCertificate, FaPaste, FaRegFilePdf, FaFileContract} from 'react-icons/all';
import {AiOutlineClose} from 'react-icons/all'
import Logo from 'assets/images/Header.svg'
import styles from './VerificationExplorer.module.scss'
import download from 'downloadjs';

function VerificationExplorer({match}){

    const [transactionID, setTransactionID] = useState('')
    const [hashID, setHashID] = useState('');
    const [reference, setReference] = useState('')
    const [certification, setCertification] = useState({})
    const {theme} = useContext(ThemeContext)
    const [searchFlag, setSearchFlag] = useState(false)
    const searchButton = useRef(null)

    const Search = async () => {
        if(!transactionID && !hashID && !reference) {
            return
        }
        await ApiUtils.searchCertification(transactionID, hashID, reference, setCertification)
        if(certification && certification !== null){
          if(Object.keys(certification).length>0){
            setSearchFlag(true)
            setReference(certification.title || certification.reference)
            setHashID(certification.hash || certification.messageid)
          }
        } else {
          AlertUtils.SystemAlert('We can\'t find matched certification' )
        }
    }

    useEffect(() => {
        if(match.path === '/explorer/:txid') {
            ApiUtils.searchCertification(match.params.txid, '', '', setCertification)
            setSearchFlag(true)
            setTransactionID(match.params.txid)
            setReference(certification.title || certification.reference)
            setHashID(certification.hash)
        }
    }, [match, setTransactionID, transactionID, searchButton,setSearchFlag, certification])

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
            setSearchFlag(true)
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

    const DownloadCertificate = () => {
      let hashTitle = certification.hash ? 'File hash' : certification.messageid ? 'Messge ID' : null
      fetch('/api/certifications/downloadCertificate', {
        method: 'POST',
        body: JSON.stringify({
          txid: certification.txid,
          hash_title: hashTitle,
          ...certification
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(resp) {
        return resp.blob();
      }).then(function(blob) {
        return download(blob, certification.title + '.pdf');
      });
    }

    return(
        <div className={styles.verficationExplorer}>
            <div className={styles.container}>
                <div className={styles.verificationTitle} style={{color: theme.primaryText}}>Certification Explorer</div>
                <hr className = {styles.border}/>
                {
                    !searchFlag || !certification || certification === null ?
                    <>
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
                        <div className={styles.searchInputs}>
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
                        </div>
                        <div className = {styles.confirmarea}>
                            <a className={cx(styles.button, styles.filled)} onClick={Search} style={{backgroundColor: theme.buttonBack}} ref={searchButton}>Search</a>
                        </div>
                    </>
                    :
                    null
                }
                <div className={styles.explorerListWrapper}>
                    {
                        searchFlag && certification && certification !== null ?
                            <div className={styles.proofArea} style={{backgroundColor: theme.stepBackground, boxShadow: theme.historyglow}}>
                              <div className={styles.mainArea}>
                                <div className={styles.titleBar}>
                                  <div className={styles.title} style={{color: theme.primaryText}}>
                                    Proof of Certification
                                    <AiOutlineClose className={styles.icon_1} onClick={() => setSearchFlag(false)}/>
                                  </div>
                                  <a className={styles.view}>
                                    The following data was cretified on the waves blockchain
                                    <AiOutlineClose className={styles.icon_2} onClick={() => setSearchFlag(false)}/>
                                  </a>
                                </div>
                                <hr className = {styles.line}/>
                                <div className ={styles.certification}>
                                  <div className={styles.iconGroup}>
                                    <FaFileContract className={styles.fileIcon} style={{color: theme.iconBack}}/>
                                    <div className={styles.mobIconArea}>
                                      <CopyToClipboard text={WavesConfig.BASE_URL + '/explorer/' + certification.txid}>
                                        <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                                      </CopyToClipboard>
                                      <FaRegFilePdf className={styles.action} style={{color: theme.iconBack}}/>
                                    </div>
                                  </div>
                                  <div className={styles.main}>
                                    <div className={styles.timeArea}>
                                      <div className={styles.time} style={{color: theme.primaryText}}>
                                        {
                                          certification && certification !== null ?
                                          moment(certification.timestamp).toString()
                                          :
                                          null
                                        }
                                      </div>
                                      <div className={styles.iconArea}>
                                        <CopyToClipboard text={WavesConfig.BASE_URL + '/explorer/' + certification.txid}>
                                          <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                                        </CopyToClipboard>
                                        <FaRegFilePdf className={styles.action} style={{color: theme.iconBack}} onClick={DownloadCertificate}/>
                                      </div>
                                    </div>
                                    <div className={styles.dataArea}>
                                      <div className={styles.certData} style={{color: theme.primaryText}}>
                                        By: <b>{certification.address}</b> <br/>
                                        Reference: <b>{certification.title || certification.reference}</b> <br/>
                                        {certification.hash ? 'File hash':'Message ID' }: <b>{certification.hash || certification.messageid}</b> <br/>
                                        TxID: <b>{certification.txid}</b> 
                                      </div>
                                      <div className={styles.certDataMob} style={{color: theme.primaryText}}>
                                        By: <b>{certification.address ? certification.address.length>20 ? certification.address.slice(0,20)+'...' : certification.address : ''}</b> <br/>
                                        Reference: <b>{certification.title || certification.reference}</b> <br/>
                                        File hash: <b>{certification.hash ? certification.hash.length > 20 ? certification.hash.slice(0,20) + '...' : certification.hash : ''}</b> <br/>
                                        TxID: <b>{certification.txid ? certification.txid.length > 20 ? certification.txid.slice(0,20) + '...' : certification.txid : ''}</b> 
                                      </div>
                                      <div className={styles.qrArea}>
                                        <div className={styles.qr}>
                                          <QRCode value={WavesConfig.BASE_URL + '/explorer/' + certification.txid} includeMargin={true} size={120} border={0}/>
                                        </div>
                                        <a href={`${WavesConfig.EXPLORER_URL}/tx/${certification.txid}`} style={{color: theme.primaryText}}>See on waves explorer</a>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                              </div>
                              <div className={styles.explorerList}>
                                  <div className={styles.item}>
                                    <div className={styles.header}>
                                      <img src={Logo} className={styles.logo} alt=""/>
                                      <QRCode value={WavesConfig.BASE_URL + '/explorer/' + certification.txid} includeMargin={true} className={styles.qrpdf} />
                                    </div>
                                    <div className={styles.titleArea}>
                                      <div className={styles.proof} style={{color: theme.certificationText}}>
                                          <b>Proof</b>
                                      </div>
                                      <div className={styles.prfCertifcation}>
                                        <b>OF CERTIFICATION</b>
                                      </div>
                                      <div className={styles.comment} style={{color: theme.certificationText}}>
                                        <b>You certified the following data on waves blockchain</b>
                                      </div>
                                    </div>
                                    <div className={styles.dataArea} style={{color: theme.commentText}}>
                                      Reference:<br/>
                                      <div style={{color: theme.buttonBack, fontSize: '28px', fontWeight: '700'}}>
                                        {certification.title || certification.reference}
                                      </div>                        
                                      <br/>{certification.hash ? 'File Hash' : 'Message ID'}: <br/>
                                      <div className={styles.imgHash} style={{color: theme.certificationText, fontWeight:'500', paddingRight: '30px', marginBottom: '10px'}}>
                                        {certification.hash || certification.messageid}
                                      </div>
                                      <div className={styles.mobHash} style={{color: theme.certificationText, fontWeight:'500', paddingRight: '30px', marginBottom: '10px'}}>
                                        {certification.hash ? certification.hash.length > 15 ? certification.hash.slice(0,15) + '...' : certification.hash : ''}
                                      </div>
                                      <br/>Date: <br/>
                                      <div className={styles.time} style={{color: theme.certificationText, fontWeight:'500', paddingRight: '30px', marginBottom: '10px'}}>
                                        {moment(certification.timestamp).toString()}
                                      </div>
                                      <div className={styles.mobtime} style={{color: theme.certificationText, fontWeight:'500', paddingRight: '30px', marginBottom: '10px'}}>
                                        {moment(certification.timestamp).toString().length > 15 ? moment(certification.timestamp).toString().slice(0,20) + '...' : moment(certification.timestamp).toString() }
                                      </div>
                                    </div>
                                    <div className={styles.footer} style={{color: theme.commentText}}>
                                      <a href={`${WavesConfig.EXPLORER_URL}/tx/${certification.txid}`} target="_blank" rel="noreferrer">
                                        See on Waves
                                      </a>
                                      <a href={`${WavesConfig.BASE_URL}`} target="_blank" rel="noreferrer">
                                        New Certification
                                      </a>
                                    </div>
                                      
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