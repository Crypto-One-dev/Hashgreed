import React, {useContext, useState} from 'react'

import {Button, Modal, ModalOverlay, ModalContent, ModalBody} from '@chakra-ui/react';
import moment from 'moment';
import download from 'downloadjs';
import WavesConfig from 'config/waves';
import walletContainer from 'redux/containers/wallet';
import WavesUtils from 'utils/waves';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {FaDownload, FaPaste, FaRegFilePdf, FaTimes, FaBan} from 'react-icons/all';
import styles from './FileCertificationCell.module.scss'
import {ThemeContext} from 'context/ThemeContext'
import fileIcon from 'assets/icons/RKMT.png'

function FileCertificationCell({detail, owner, walletState}){
    const {theme} = useContext(ThemeContext)

    const timestamp = moment(detail.timestamp).toString();
    const txid = detail.key.replace('data_fc_', '').replace('_' + owner, '');
    const revoked = detail.status ? detail.status.replace('REVOKED_', '') : '';
    const certFee = 100;
    const transactionFee = 0.005;
    const [modalShow, ShowModal] = useState(false);

    const RevokeCertificate = () => {
        WavesUtils.RevokeCertificate(txid, walletState.publicKey, certFee, transactionFee)
        ShowModal(false);
    };
    const DownloadCertificate = () => {
      fetch('/api/certifications/downloadCertificate', {
        method: 'POST',
        body: JSON.stringify({
          txid,
          hash_title: 'File hash',
          ...detail
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(resp) {
        return resp.blob();
      }).then(function(blob) {
        return download(blob, detail.title + '.pdf');
      });
    }

      const ShowIPFS = () => {
        window.open('https://ipfs.io/ipfs/' + detail.link)
      }



    return (
        <div className={styles.fileCertification} key={detail.key} style={{backgroundColor: theme.stepBackground, boxShadow: theme.historyglow}}>
            <div className={styles.iconArea}>
              <img src = {fileIcon} className = {styles.RKMTIcon} alt = ""/>
            </div>
            <div className={styles.dataArea}>
              <div className={styles.timestampArea}>
                <div className={styles.info} style={{color: theme.primaryText}}>
                    {timestamp}
                </div>
                <div className={styles.actions}>
                  {
                    detail.link?
                      <FaDownload className={styles.action} onClick={ShowIPFS} style={{color: theme.iconBack}} />
                    :
                      null
                  }
                  {
                    revoked?
                      // <span className={styles.status}>
                      
                        <a href={"http://wavesexplorer.com/tx/" + revoked} target="_blank" rel="noreferrer">
                          <FaBan className={styles.action}/>
                        </a>
                    :
                      <FaTimes className={styles.action} onClick={() => ShowModal(true)} style={{color: theme.iconBack}} />
                  }
                  <CopyToClipboard text={WavesConfig.BASE_URL + '/explorer/' + txid}>
                    <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                  </CopyToClipboard>
                  <FaRegFilePdf className={styles.action} onClick={DownloadCertificate} style={{color: theme.iconBack}}/>
                </div>
              </div>
              <div className ={styles.references} style={{color: theme.primaryText}}>
                    Reference: <span>{detail.title}</span>
                    <br/>
                    Hash: <span>{detail.hash}</span>
                    <br/>
                    TXId: <a href={`${WavesConfig.EXPLORER_URL}/tx/${txid}`} target="_blank" rel="noreferrer">{txid}</a>
              </div>
              <div className ={styles.mobReferences} style={{color: theme.primaryText}}>
                    <div className={detail.title.length>20 ? styles.clipboard: null}>
                      {
                        detail.title.length>20 ? 
                          <>
                            <div className={styles.clipboard}>
                              Reference:&nbsp;
                              <b>{detail.title.slice(0,20)+ "..."}</b>
                            </div>
                            <CopyToClipboard text={detail.title}>
                              <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                            </CopyToClipboard>
                          </>
                        : 
                          <div className={styles.clipboard}>
                            <div className={styles.clipboard}>
                              Reference:&nbsp;
                              <b>{detail.title}</b>
                            </div>
                            <CopyToClipboard text={detail.title}>
                              <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                            </CopyToClipboard>
                          </div>
                      }
                      </div>
                      <div className={detail.hash.length>20 ? styles.clipboard : null}>
                        Hash:&nbsp;
                        {
                          detail.hash.length>20 ?
                            <>
                              {detail.hash.slice(0,20)+"..."}
                              <CopyToClipboard text={detail.hash}>
                                <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                              </CopyToClipboard>
                            </>
                            : 
                            <div className={styles.clipboard}>
                              {detail.hash}
                              <CopyToClipboard text={detail.hash}>
                                <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                              </CopyToClipboard>
                            </div>
                        }
                      </div>
                        {
                         txid.length>20 ?
                            <div className={styles.clipboard}>
                              <div className={styles.txclipboard}>
                                TXId:&nbsp;
                                <a href={`${WavesConfig.EXPLORER_URL}/tx/${txid}`} target="_blank" rel="noreferrer">{txid.slice(0,20)+"..."}</a>
                              </div>
                              <CopyToClipboard text={txid}>
                                <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                              </CopyToClipboard>
                            </div>
                            : 
                            <div>
                              TXId:&nbsp;<a href={`${WavesConfig.EXPLORER_URL}/tx/${txid}`} target="_blank" rel="noreferrer">{txid}</a>
                            </div>
                        }
              </div>
              <div className ={styles.semiMobReferences} style={{color: theme.primaryText}}>
                    <div className={detail.title.length>15 ? styles.clipboard: null}>
                      {
                        detail.title.length>15 ? 
                        <>
                          <div className={styles.clipboard}>
                            Reference:&nbsp;
                            <b>{detail.title.slice(0,15)+ "..."}</b>
                            </div>
                            <CopyToClipboard text={detail.title}>
                              <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                            </CopyToClipboard>
                          </>
                        : 
                          <div className={styles.clipboard}>
                            <div className={styles.clipboard}>
                              Reference:&nbsp;
                              <b>{detail.title}</b>
                            </div>
                            <CopyToClipboard text={detail.title}>
                              <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                            </CopyToClipboard>
                          </div>
                      }
                      </div>
                      <div className={detail.hash.length>15 ? styles.clipboard : null}>
                        Hash:&nbsp;
                        {
                          detail.hash.length>15 ?
                            <>
                              {detail.hash.slice(0,15)+"..."}
                              <CopyToClipboard text={detail.hash}>
                                <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                              </CopyToClipboard>
                            </>
                            : 
                            <>
                              {detail.hash}
                              <CopyToClipboard text={detail.hash}>
                                <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                              </CopyToClipboard>
                            </>
                        }
                      </div>
                        {
                         txid.length>15 ?
                              <div className={styles.clipboard}>
                                <div className={styles.txclipboard}>
                                  TXId:&nbsp;
                                  <a href={`${WavesConfig.EXPLORER_URL}/tx/${txid}`} target="_blank" rel="noreferrer">{txid.slice(0,15)+"..."}</a>
                                </div>
                                <CopyToClipboard text={txid}>
                                  <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                                </CopyToClipboard>
                              </div>
                            : 
                            <div className={styles.clipboard}>
                              <div className={styles.txclipboard}>
                                TXId:&nbsp;
                                <a href={`${WavesConfig.EXPLORER_URL}/tx/${txid}`} target="_blank" rel="noreferrer">{txid}</a>
                              </div>
                              <CopyToClipboard text={txid}>
                                <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                              </CopyToClipboard>
                            </div>
                        }
              </div>
              <div className={styles.mobActions}>
                  {
                    detail.link?
                      <FaDownload className={styles.action} onClick={ShowIPFS} style={{color: theme.iconBack}} />
                    :
                      null
                  }
                  {
                    revoked?
                        <a href={"http://wavesexplorer.com/tx/" + revoked} target="_blank" rel="noreferrer">
                          <FaBan className={styles.action}/>
                        </a>
                    :
                      <FaTimes className={styles.action} onClick={() => ShowModal(true)} style={{color: theme.iconBack}} />
                  }
                  <CopyToClipboard text={WavesConfig.BASE_URL + '/explorer/' + txid}>
                    <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                  </CopyToClipboard>
                  <FaRegFilePdf className={styles.action} onClick={DownloadCertificate} style={{color: theme.iconBack}}/>
                </div>        
            </div>
            <Modal isCentered isOpen={modalShow} size='xl' onClose={() => ShowModal(false)} >
              <ModalOverlay />
              <ModalContent style={{backgroundColor: theme.itemBackground}}>
                <ModalBody style={{display: 'flex', flexDirection: 'column', color: 'white', padding: 20, textAlign: 'center'}}>
                  <div style={{backgroundColor: 'black', padding: '3px 0'}} >
                    <b>REVOKE THE CERTIFICATE</b> WITH ID:
                  </div>
                  <div style={{margin: '10px 0'}}style={{color: theme.primaryText}}>
                    <b>{txid}</b>
                  </div>
                  <Button onClick={RevokeCertificate} style={{backgroundColor: theme.buttonBack}} className={styles.clickable}>
                    REVOKE CERTIFICATE
                  </Button>
                </ModalBody>
              </ModalContent>
            </Modal>
        </div>
    )
}

export default walletContainer(FileCertificationCell)