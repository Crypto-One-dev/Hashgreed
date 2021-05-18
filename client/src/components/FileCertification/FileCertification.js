import React, {useContext, useState} from 'react'

import {Button, Modal, ModalOverlay, ModalContent, ModalBody} from '@chakra-ui/react';
import moment from 'moment';
import download from 'downloadjs';
import WavesConfig from 'config/waves';
import walletContainer from 'redux/containers/wallet';
import WavesUtils from 'utils/waves';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {FaCertificate, FaDownload, FaPaste, FaRegFilePdf, FaTimes} from 'react-icons/all';
import styles from './FileCertification.module.scss'

function FileCertification({detail, owner, walletState}){

    const timestamp = moment(detail.timestamp).toString();
    const txid = detail.key.replace('data_fc_', '').replace('_' + owner, '');
    const revoked = detail.status ? detail.status.replace('REVOKED_', '') : '';
    const certFee = 100;
    const transactionFee = 0.001;
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
        <div className={styles.fileCertification}>
            <div className={styles.title}>
                File Certification
            </div>
            <hr className = {styles.line}/>
            <div className={styles.main}>
              <FaCertificate className={styles.fileIcon}/>
              <div className={styles.dataArea}>
                <div className={styles.info}>
                    {timestamp}
                    <br/>
                    Reference: <b>{detail.title}</b>
                    <br/>
                    Hash: <span>{detail.hash}</span>
                    <br/>
                    TXId: <a href={`${WavesConfig.EXPLORER_URL}/tx/${txid}`} target="_blank" rel="noreferrer">{txid}</a>
                </div>
                <div className={styles.actions}>
                {
                  detail.link?
                    <FaDownload className={styles.action} onClick={ShowIPFS} />
                  :
                    null
                }
                {
                  revoked?
                    <span className={styles.status}>
                      <a href={"http://wavesexplorer.com/tx/" + revoked} target="_blank" rel="noreferrer">
                        REVOKED
                      </a>
                    </span>
                  :
                    <FaTimes className={styles.action} onClick={() => ShowModal(true)} />
                }
                <CopyToClipboard text={WavesConfig.BASE_URL + '/explorer/' + txid}>
                  <FaPaste className={styles.action}/>
                </CopyToClipboard>
                <FaRegFilePdf className={styles.envelope} onClick={DownloadCertificate} />
              </div>
              </div>
            </div>
            <Modal isCentered isOpen={modalShow} size='xl' onClose={() => ShowModal(false)}>
              <ModalOverlay />
              <ModalContent style={{backgroundColor: '#D359A6'}}>
                <ModalBody style={{display: 'flex', flexDirection: 'column', color: 'white', padding: 20, textAlign: 'center'}}>
                  <div style={{backgroundColor: 'black', padding: '3px 0'}}>
                    <b>REVOKE THE CERTIFICATE</b> WITH ID:
                  </div>
                  <div style={{margin: '10px 0'}}>
                    <b>{txid}</b>
                  </div>
                  <Button onClick={RevokeCertificate} style={{backgroundColor: '#981467'}} className={styles.clickable}>
                    REVOKE CERTIFICATE
                  </Button>
                </ModalBody>
              </ModalContent>
            </Modal>
        </div>
    )
}

export default walletContainer(FileCertification)