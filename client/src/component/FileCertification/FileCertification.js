import React, {useContext, useState} from 'react';
import {Button, Modal, ModalOverlay, ModalContent, ModalBody} from '@chakra-ui/react';
import download from 'downloadjs';
import moment from 'moment';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {FaCertificate, FaDownload, FaPaste, FaRegFilePdf, FaTimes} from 'react-icons/all';

import WavesConfig from 'config/waves';
import ThemeContext from 'context/UserContext';
import walletContainer from 'redux/containers/wallet';
import WavesUtils from 'utils/waves';
import styles from './FileCertification.module.scss';

function FileCertification({detail, owner, walletState}) {
  const {theme} = useContext(ThemeContext);

  const timestamp = moment(detail.timestamp).toString();
  const txid = detail.key.replace('data_fc_', '').replace('_' + owner, '');
  const revoked = detail.status ? detail.status.replace('REVOKED_', '') : '';

  const [modalShow, ShowModal] = useState(false);

  const certFee = 100;
  const transactionFee = 0.005;

  const RevokeCertificate = () => {
    WavesUtils.RevokeCertificate(txid, walletState.publicKey, certFee, transactionFee)
    ShowModal(false);
  };

  const DownloadCertificate = () => {
    fetch('/api/certifications/downloadCertificate', {
      method: 'POST',
      body: JSON.stringify({
        txid,
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
    <div className={styles.tx}>
      <div className={styles.transaction}>
        <div className={styles.main} style={{backgroundColor: theme.itemBackground}}>
          <FaCertificate className={styles.arrow} style={{color: theme.overviewTransactionArrow}} />
          <div className={styles.info}>
            <div className={styles.timestamp} style={{color: theme.overviewTransactionTimestamp}}>{timestamp}</div>
            <div className={styles.reference} style={{color: theme.primaryText}}>
              Reference: <b>{detail.title}</b>
            </div>
            <div className={styles.hash} style={{color: theme.primaryText}}>
              Hash: <span style={{color: theme.buttonBack}}>{detail.hash}</span>
            </div>
            <div className={styles.txid} style={{color: theme.overviewTransactionId}}>
              TXId: <a href={`${WavesConfig.EXPLORER_URL}/tx/${txid}`} target="_blank" rel="noreferrer">{txid}</a>
            </div>
          </div>
          <div className={styles.actions}>
            {
              detail.link?
                <FaDownload className={styles.action} style={{color: theme.manageTokenHighlight}} onClick={ShowIPFS} />
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
                <FaTimes className={styles.action} style={{color: theme.manageTokenHighlight}} onClick={() => ShowModal(true)} />
            }
            <CopyToClipboard text={WavesConfig.BASE_URL + '/explorer/' + txid}>
              <FaPaste className={styles.action} style={{color: theme.manageTokenHighlight}} />
            </CopyToClipboard>
          </div>
        </div>
        <div className={styles.extra} style={{color: theme.primaryText, backgroundColor: theme.itemBackground}}>
          <FaRegFilePdf className={styles.envelope} style={{color: theme.overviewTransactionEnvelope}} onClick={DownloadCertificate} />
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

export default walletContainer(FileCertification);