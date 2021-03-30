import React, {useContext} from 'react';
import download from 'downloadjs';
import moment from 'moment';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {FaEnvelope, FaPaste, FaRegFilePdf} from 'react-icons/all';

import WavesConfig from 'config/waves';
import ThemeContext from 'context/UserContext';
import walletContainer from 'redux/containers/wallet';
import styles from './EmailCertification.module.scss';

function EmailCertification({detail, owner}) {
  const {theme} = useContext(ThemeContext);

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
    <div className={styles.tx}>
      <div className={styles.transaction}>
        <div className={styles.main} style={{backgroundColor: theme.itemBackground}}>
          <FaEnvelope className={styles.arrow} style={{color: theme.overviewTransactionArrow}} />
          <div className={styles.info}>
            <div className={styles.timestamp} style={{color: theme.overviewTransactionTimestamp}}>{timestamp}</div>
            <div className={styles.reference} style={{color: theme.primaryText}}>
              Reference: <b>{detail.reference}</b>
            </div>
            <div className={styles.txid} style={{color: theme.overviewTransactionId}}>
              TXId: <a href={`${WavesConfig.EXPLORER_URL}/tx/${txid}`} target="_blank" rel="noreferrer">{txid}</a>
            </div>
          </div>
          <div className={styles.actions}>
            <CopyToClipboard text={WavesConfig.BASE_URL + '/explorer/' + txid}>
              <FaPaste className={styles.action} style={{color: theme.manageTokenHighlight}} />
            </CopyToClipboard>
          </div>
        </div>
        <div className={styles.extra} style={{color: theme.primaryText, backgroundColor: theme.itemBackground}}>
          <FaRegFilePdf className={styles.envelope} style={{color: theme.overviewTransactionEnvelope}} onClick={DownloadCertificate} />
        </div>
      </div>
    </div>
  )
}

export default walletContainer(EmailCertification);