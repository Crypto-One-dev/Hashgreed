import React, {useContext, useState} from 'react'

import moment from 'moment';
import {FaPaste} from 'react-icons/all';
import {base58Decode, bytesToString} from '@waves/ts-lib-crypto';

import WavesConfig from 'config/waves';
import styles from './TransactionCell.module.scss'
import {ThemeContext} from 'context/ThemeContext'
import fileIcon from 'assets/icons/RKMT.png'
import {CopyToClipboard} from 'react-copy-to-clipboard';

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
            <div className={styles.imageArea}>
              <img src = {fileIcon} className = {styles.fileIcon} alt = ""/>
              <div className = {styles.amount} style={{color: theme.primaryText}}>
                {
                  type === 'fc' ? parseFloat(100).toFixed(4) :
                  type === 'ec' ? parseFloat(100).toFixed(4) :
                  type === 'MA' ? parseFloat(300).toFixed(4) :
                  parseFloat(transaction.data.amount).toFixed(4) 
                }
              </div>
            </div>
            <div className = {styles.dataArea}>
              <div className={styles.timestampArea}>
                <div className={styles.info} style={{color: theme.primaryText}}>
                  {timestamp}
                </div>
                <div className = {styles.actions}>
                  <div className = {styles.amount} style={{color: theme.primaryText}}>
                    {
                      type === 'fc' ? parseFloat(100).toFixed(4) :
                      type === 'ec' ? parseFloat(100).toFixed(4) :
                      type === 'MA' ? parseFloat(300).toFixed(4) :
                      parseFloat(transaction.data.amount).toFixed(4) 
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
              <div className ={styles.mobreferences} style={{color: theme.primaryText}}>
                  {
                      type === 'to' || type === 'from' ?
                        <>
                          {
                          target.length>15 ? 
                            <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between', alignItems: 'center'}}>
                              <div style={{display:'flex', flexDirection:'row',justifyContent:'flex-start'}}>
                                <b>Transfer {type}: </b>
                                {target.slice(0,15) + '...'}
                              </div>
                              <CopyToClipboard text={target}>
                                <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                              </CopyToClipboard>
                            </div>
                            :
                            <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between', alignItems: 'center'}}>
                              <div style={{display:'flex', flexDirection:'row',justifyContent:'flex-start'}}>
                                <b>Transfer {type}: </b>
                                {target}
                              </div>
                              <CopyToClipboard text={target}>
                                <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                              </CopyToClipboard>
                            </div>
                          }
                        </>
                      : type === 'fc' ?
                        <>
                          {
                          title.length>15 ? 
                            <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between', alignItems: 'center'}}>
                              <div style={{display:'flex', flexDirection:'row',justifyContent:'flex-start'}}>
                                <b>File Certification: </b>
                                {title.slice(0,15) + '...'}
                              </div>
                              <CopyToClipboard text={title}>
                                <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                              </CopyToClipboard>
                            </div>
                            :
                            <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between', alignItems: 'center'}}>
                              <div style={{display:'flex', flexDirection:'row',justifyContent:'flex-start'}}>
                                <b>File Certification: </b>
                                {title}
                              </div>
                              <CopyToClipboard text={title}>
                                <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                              </CopyToClipboard>
                            </div>
                          }
                        </>
                      : type === 'ec' ?
                        <>
                          {
                          reference.length>15 ? 
                            <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between', alignItems: 'center'}}>
                              <div style={{display:'flex', flexDirection:'row',justifyContent:'flex-start'}}>
                                <b>Email Certification: </b>
                                {reference.slice(0,15) + '...'}
                              </div>
                              <CopyToClipboard text={reference}>
                                <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                              </CopyToClipboard>
                            </div>
                            :
                            <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between', alignItems: 'center'}}>
                              <div style={{display:'flex', flexDirection:'row',justifyContent:'flex-start'}}>
                                <b>Email Certification: </b>
                                {reference}
                              </div>
                              <CopyToClipboard text={reference}>
                                <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                              </CopyToClipboard>
                            </div>
                          }
                        </>
                      : type === 'MA' && publisher === owner ?
                        <>
                          {
                          title.length>15 ? 
                            <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between', alignItems: 'center'}}>
                              <div style={{display:'flex', flexDirection:'row',justifyContent:'flex-start'}}>
                                <b>Agreement request: </b>
                                {title.slice(0,15) + '...'}
                              </div>
                              <CopyToClipboard text={title}>
                                <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                              </CopyToClipboard>
                            </div>
                            :
                            <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between', alignItems: 'center'}}>
                              <div style={{display:'flex', flexDirection:'row',justifyContent:'flex-start'}}>
                                <b>Agreement request: </b>
                                {title}
                              </div>
                              <CopyToClipboard text={title}>
                                <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                              </CopyToClipboard>
                            </div>
                          }
                        </>
                      : type === 'MA' && publisher !== owner ?
                        <>
                          {
                          title.length>15 ? 
                            <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between', alignItems: 'center'}}>
                              <div style={{display:'flex', flexDirection:'row',justifyContent:'flex-start'}}>
                                <b>Signature requested: </b>
                                {title.slice(0,15) + '...'}
                              </div>
                              <CopyToClipboard text={title}>
                                <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                              </CopyToClipboard>
                            </div>
                            :
                            <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between', alignItems: 'center'}}>
                              <div style={{display:'flex', flexDirection:'row',justifyContent:'flex-start'}}>
                                <b>Signature requested: </b>
                                {title}
                              </div>
                              <CopyToClipboard text={title}>
                                <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                              </CopyToClipboard>
                            </div>
                          }
                        </>
                      :
                          null
                  }
                  <div>
                      {
                      transaction.data.id.length>15 ? 
                        <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between', alignItems: 'center'}}>
                          <div style={{display:'flex', flexDirection:'row',justifyContent:'flex-start'}}>
                            TXId: 
                            <a href={`${WavesConfig.EXPLORER_URL}/tx/${transaction.data.id}`} target="_blank" rel="noreferrer">{transaction.data.id.slice(0,15) + '...'}</a>
                          </div>
                          <CopyToClipboard text={transaction.data.id}>
                            <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                          </CopyToClipboard>
                        </div>
                        :
                        <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between', alignItems: 'center'}}>
                          <div style={{display:'flex', flexDirection:'row',justifyContent:'flex-start'}}>
                            TXId: 
                            <a href={`${WavesConfig.EXPLORER_URL}/tx/${transaction.data.id}`} target="_blank" rel="noreferrer">{transaction.data.id}</a>
                          </div>
                          <CopyToClipboard text={transaction.data.id}>
                            <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
                          </CopyToClipboard>
                        </div>
                      }
                  </div>
              </div>

            </div>
        </div>
    )
}

export default TransactionCell