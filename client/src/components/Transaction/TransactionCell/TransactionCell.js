import React, {useContext, useState} from 'react'

import moment from 'moment';
import {FaCertificate, FaEnvelope, FaFileContract, FaLongArrowAltDown, FaLongArrowAltUp, FaQuestion, FaRegEnvelope, FaSignature} from 'react-icons/all';
import {base58Decode, bytesToString} from '@waves/ts-lib-crypto';

import WavesConfig from 'config/waves';
import styles from './TransactionCell.module.scss'
import {ThemeContext} from 'context/ThemeContext'
import fileIcon from 'assets/icons/RKMT.png'

function TransactionCell ({transaction, owner}){

  const {theme} = useContext(ThemeContext)
  const [messageShow, ShowMessage] = useState(false);

  const toggleMessage = () => {
    ShowMessage(!messageShow);
  }
  
  const message = transaction.data.attachment ? bytesToString(base58Decode(transaction.data.attachment)) : '';
  const type = transaction.data.sender ? transaction.data.sender === owner ? 'to' : 'from' : transaction.data.type;
  const target = transaction.data.sender === owner ? transaction.data.recipient : transaction.data.sender;
  const title = transaction.data.title
  const reference = transaction.data.reference
  const publisher = transaction.data.publisher
  const hash = transaction.data.hash
  const messageid = transaction.data.messageid
  const timestamp = moment(transaction.data.timestamp).toString()

    return(
        <div className = {styles.transaction} key={transaction.key} style={{backgroundColor: theme.stepBackground, boxShadow: theme.historyglow}}>
            <img src = {fileIcon} className = {styles.fileIcon} alt = ""/>
            <div className = {styles.dataArea}>
              <div className={styles.timestampArea}>
                <div className={styles.info} style={{color: theme.primaryText}}>
                  {timestamp}
                </div>
                <div className = {styles.actions}>
                  <div className = {styles.amount} style={{color: theme.primaryText}}>
                    {
                      type === 'fc' ? 100 :
                      type === 'ec' ? 100 :
                      type === 'MA' ? 300 :
                      transaction.data.amount 
                    }
                  </div>
                </div>
              </div>
              <div className ={styles.references} style={{color: theme.primaryText}}>
                  {
                      type === 'to' || type === 'from' ?
                          <><b>Transfer {type}: </b>{target}</>
                      : type === 'fc' ?
                          <><b>File Certification: </b>{title}</>
                      : type === 'ec' ?
                          <><b>Email Certification: </b>{reference}</>
                      : type === 'MA' && publisher === owner ?
                          <><b>Agreement request: </b>{title}</>
                      : type === 'MA' && publisher !== owner ?
                          <><b>Signature requested: </b>{title}</>
                      :
                          null
                  }
                  <br/>
                  TXId: <a href={`${WavesConfig.EXPLORER_URL}/tx/${transaction.data.id}`} target="_blank" rel="noreferrer">{transaction.data.id}</a>
              </div>
              
            </div>
        </div>
    )
}

export default TransactionCell