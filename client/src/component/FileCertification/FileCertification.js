import React, {useContext, useState} from 'react';
import moment from 'moment';
import {FaCertificate, FaFilePdf} from 'react-icons/all';


import WavesConfig from 'config/waves';
import ThemeContext from 'context/UserContext';
import styles from './FileCertification.module.scss';

function FileCertification({detail, owner}) {
  const {theme} = useContext(ThemeContext);
  const [messageShow, ShowMessage] = useState(false);

  const data = JSON.parse(detail.value)
  const timestamp = moment(data.timestamp).toString()
  const txid = detail.key.replace('data_fc_', '').replace('_' + owner, '')
  
  return (
    <div className={styles.tx}>
      <div className={styles.transaction}>
        <div className={styles.main} style={{backgroundColor: theme.itemBackground}}>
          <FaCertificate className={styles.arrow} style={{color: theme.overviewTransactionArrow}} />
          <div className={styles.info}>
            <div className={styles.timestamp} style={{color: theme.overviewTransactionTimestamp}}>{timestamp}</div>
            <div className={styles.reference} style={{color: theme.primaryText}}>
              Reference: <b>{data.title}</b>
            </div>
            <div className={styles.hash} style={{color: theme.primaryText}}>
              Hash: <span style={{color: theme.buttonBack}}>{data.hash}</span>
            </div>
            <div className={styles.txid} style={{color: theme.overviewTransactionId}}>
              TXId: <a href={`${WavesConfig.EXPLORER_URL}/tx/${txid}`} target="_blank" rel="noreferrer">{txid}</a>
            </div>
          </div>
        </div>
        <div className={styles.extra} style={{color: theme.primaryText, backgroundColor: theme.itemBackground}}>
          <FaFilePdf className={styles.envelope} style={{color: theme.overviewTransactionEnvelope}} />
        </div>
      </div>
    </div>
  )
}

export default FileCertification;