import React, {useContext, useState} from 'react';
import moment from 'moment';
import {FaLongArrowAltDown, FaLongArrowAltUp, FaRegEnvelope} from 'react-icons/all';
import {base58Decode, bytesToString} from '@waves/ts-lib-crypto';


import WavesConfig from 'config/waves';
import ThemeContext from 'context/UserContext';
import styles from './Transaction.module.scss';

function Transaction({detail, owner}) {
  const {theme} = useContext(ThemeContext);
  const [messageShow, ShowMessage] = useState(false);

  const toggleMessage = () => {
    ShowMessage(!messageShow);
  }
  
  const message = detail.data.attachment ? bytesToString(base58Decode(detail.data.attachment)) : '';
  const direction = detail.data.sender === owner ? 'to' : 'from';
  const target = detail.data.sender === owner ? detail.data.recipient : detail.data.sender;
  const timestamp = moment(detail.data.timestamp).toString()
  return (
    <div className={styles.tx}>
      <div className={styles.transaction}>
        <div className={styles.main} style={{backgroundColor: theme.itemBackground}}>
          {
            direction === 'to' ?
              <FaLongArrowAltUp className={styles.arrow} style={{color: theme.overviewTransactionArrow}} />
            :
              <FaLongArrowAltDown className={styles.arrow} style={{color: theme.overviewTransactionArrow}} />
          }
          <div className={styles.info}>
            <span className={styles.timestamp} style={{color: theme.overviewTransactionTimestamp}}>{timestamp}</span>
            <span className={styles.address} style={{color: theme.primaryText}}>
              <b>Transfer {direction}: </b>{target}
            </span>
            <span className={styles.txid} style={{color: theme.overviewTransactionId}}>
              TXId: <a href={`${WavesConfig.EXPLORER_URL}/tx/${detail.data.id}`} target="_blank" rel="noreferrer">{detail.data.id}</a>
            </span>
          </div>
        </div>
        <div className={styles.extra} style={{color: theme.primaryText}}>
          <span className={styles.amount} style={{backgroundColor: theme.itemBackground}}>
              Amount: {detail.data.amount}
          </span>
          {
            message ?
            <span className={styles.attachment} onClick={()=>toggleMessage()} style={{backgroundColor: theme.itemBackground}}>
                <FaRegEnvelope className={styles.envelope} style={{color: theme.overviewTransactionEnvelope}} />
              </span>
            : null
          }
        </div>
      </div>
      <div className={styles.message} style={{display: messageShow ? 'block' : 'none', backgroundColor: theme.itemBackground, color: theme.primaryText}}>
        Message: {message}
      </div>
    </div>
  )
}

export default Transaction;