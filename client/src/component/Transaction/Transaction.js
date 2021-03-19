import React, {useContext, useState} from 'react';
import moment from 'moment';
import {FaCertificate, FaFileContract, FaLongArrowAltDown, FaLongArrowAltUp, FaQuestion, FaRegEnvelope, FaSignature} from 'react-icons/all';
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
  const type = detail.data.sender ? detail.data.sender === owner ? 'to' : 'from' : detail.data.type;
  const target = detail.data.sender === owner ? detail.data.recipient : detail.data.sender;
  const reference = detail.data.title
  const publisher = detail.data.publisher
  const hash = detail.data.hash
  const timestamp = moment(detail.data.timestamp).toString()
  return (
    <div className={styles.tx}>
      <div className={styles.transaction}>
        <div className={styles.main} style={{backgroundColor: theme.itemBackground}}>
          {
            type === 'to' ?
              <FaLongArrowAltUp className={styles.arrow} style={{color: theme.overviewTransactionArrow}} />
            : type === 'from' ?
              <FaLongArrowAltDown className={styles.arrow} style={{color: theme.overviewTransactionArrow}} />
            : type === 'fc' ?
              <FaCertificate className={styles.arrow} style={{color: theme.overviewTransactionArrow}} />
            : type === 'MA' && publisher === owner ?
              <FaFileContract className={styles.arrow} style={{color: theme.overviewTransactionArrow}} />
            : type === 'MA' && publisher !== owner ?
              <FaSignature className={styles.arrow} style={{color: theme.overviewTransactionArrow}} />
            :
              <FaQuestion className={styles.arrow} style={{color: theme.overviewTransactionArrow}} />
          }
          <div className={styles.info}>
            <span className={styles.timestamp} style={{color: theme.overviewTransactionTimestamp}}>{timestamp}</span>
            <span className={styles.address} style={{color: theme.primaryText}}>
              {
                type === 'to' || type === 'from' ?
                  <><b>Transfer {type}: </b>{target}</>
                : type === 'fc' ?
                  <><b>File Certification: </b>{reference}</>
                : type === 'MA' && publisher === owner ?
                  <><b>Agreement request: </b>{reference}</>
                : type === 'MA' && publisher !== owner ?
                  <><b>Signature requested: </b>{reference}</>
                :
                  null
              }
            </span>
            <span className={styles.txid} style={{color: theme.overviewTransactionId}}>
              TXId: <a href={`${WavesConfig.EXPLORER_URL}/tx/${detail.data.id}`} target="_blank" rel="noreferrer">{detail.data.id}</a>
            </span>
          </div>
        </div>
        <div className={styles.extra} style={{color: theme.primaryText}}>
          <span className={styles.amount} style={{backgroundColor: theme.itemBackground}}>
              Amount: 
              {
                type === 'fc' ? 100 :
                type === 'MA' ? 300 :
                detail.data.amount
              }
          </span>
          {
            message || hash ?
            <span className={styles.attachment} onClick={()=>toggleMessage()} style={{backgroundColor: theme.itemBackground}}>
                <FaRegEnvelope className={styles.envelope} style={{color: theme.overviewTransactionEnvelope}} />
              </span>
            : null
          }
        </div>
      </div>
      <div className={styles.message} style={{display: messageShow ? 'block' : 'none', backgroundColor: theme.itemBackground, color: theme.primaryText}}>
        {
          type === 'fc' ? <>Hash: {hash}</> :
          type === 'MA' ? <>Agreement file hash: {hash}</> :
          message ? <>Message: {message}</> :
          null
        }
      </div>
    </div>
  )
}

export default Transaction;