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
                      <FaBan className={styles.action}>
                        <a href={"http://wavesexplorer.com/tx/" + revoked} target="_blank" rel="noreferrer">
                          REVOKED
                        </a>
                      {/* </span> */}
                      </FaBan>
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
                    Reference: <b>{detail.title}</b>
                    <br/>
                    Hash: <span>{detail.hash}</span>
                    <br/>
                    TXId: <a href={`${WavesConfig.EXPLORER_URL}/tx/${txid}`} target="_blank" rel="noreferrer">{txid}</a>
              </div>
              <div className ={styles.mobReferences} style={{color: theme.primaryText}}>
                    Reference: <b>{detail.title.length>25 ? detail.title.slice(0,25)+ "...": detail.title}</b>
                    <br/>
                    Hash: <span>{detail.hash.length>25 ? detail.hash.slice(0,25)+"...": detail.hash}</span>
                    <br/>
                    TXId: <a href={`${WavesConfig.EXPLORER_URL}/tx/${txid}`} target="_blank" rel="noreferrer">{txid.length>25 ? txid.slice(0,25)+"...": txid}</a>
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
                      <FaBan className={styles.action}>
                        <a href={"http://wavesexplorer.com/tx/" + revoked} target="_blank" rel="noreferrer">
                          REVOKED
                        </a>
                      </FaBan>
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