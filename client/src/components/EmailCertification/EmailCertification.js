import React from 'react';
import download from 'downloadjs';
import moment from 'moment';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {FaEnvelope, FaPaste, FaRegFilePdf} from 'react-icons/all';

import WavesConfig from 'config/waves';
import walletContainer from 'redux/containers/wallet';
import styles from './EmailCertification.module.scss'

function EmailCertification({detail, owner}){

  const timestamp = moment(detail.timestamp).toString();
  const txid = detail.key.replace('data_ec_', '').replace('_' + owner, '');

  const DownloadCertificate = () => {
    fetch('/api/certifications/downloadCertificate', {
      method: 'POST',
      body: JSON.stringify({
        txid,
        title: detail.reference,
        hash: detail.messageid,
        hash_title: 'Email ID',
        ...detail
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(function(resp) {
      return resp.blob();
    }).then(function(blob) {
      return download(blob, detail.reference + '.pdf');
    });
  }

    return (
        <div className={styles.emailCertification}>
          <div className={styles.title}>
            Email Certification
          </div>
          <hr className = {styles.line}/>
          <div className={styles.main}>
            <FaEnvelope className={styles.fileIcon}/>
            <div className={styles.dataArea}>
              <div className={styles.info}>
                {timestamp}
                <br/>
                Reference: <b>{detail.reference}</b>
                <br/>
                TXId: <a href={`${WavesConfig.EXPLORER_URL}/tx/${txid}`} target="_blank" rel="noreferrer">{txid}</a>
              </div>
              <div className={styles.actions}>
                <CopyToClipboard text={WavesConfig.BASE_URL + '/explorer/' + txid}>
                  <FaPaste className={styles.action} />
                </CopyToClipboard>
                <FaRegFilePdf className={styles.action} onClick={DownloadCertificate} />
              </div>
            </div>
          </div>
        </div>
    )
}

export default walletContainer(EmailCertification)