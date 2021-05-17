import React, {useContext, useState} from 'react'

import moment from 'moment';
import {FaCertificate, FaEnvelope, FaFileContract, FaLongArrowAltDown, FaLongArrowAltUp, FaQuestion, FaRegEnvelope, FaSignature} from 'react-icons/all';
import {base58Decode, bytesToString} from '@waves/ts-lib-crypto';

import WavesConfig from 'config/waves';
import RKMT from 'assets/icons/RKMT.svg'
import styles from './Transaction.module.scss'

function Transaction ({detail, owner}){

    const [messageShow, ShowMessage] = useState(false);

  const toggleMessage = () => {
    ShowMessage(!messageShow);
  }
  
  const message = detail.data.attachment ? bytesToString(base58Decode(detail.data.attachment)) : '';
  const type = detail.data.sender ? detail.data.sender === owner ? 'to' : 'from' : detail.data.type;
  const target = detail.data.sender === owner ? detail.data.recipient : detail.data.sender;
  const title = detail.data.title
  const reference = detail.data.reference
  const publisher = detail.data.publisher
  const hash = detail.data.hash
  const messageid = detail.data.messageid
  const timestamp = moment(detail.data.timestamp).toString()

    return(
        <div className = {styles.transaction}>
            <div className = {styles.title}>
            {
                type === 'to' || type === 'from' ?
                  <>Last Transaction</>
                : type === 'fc' ?
                  <>File Certification</>
                : type === 'ec' ?
                  <>Email Certification</>
                : type === 'MA' && publisher === owner ?
                  <>Agreement request</>
                : type === 'MA' && publisher !== owner ?
                  <>Signature requested</>
                :
                  null
              }
            </div>
            <hr className = {styles.line}/>
            <div className = {styles.dataarea}>
                <img src = {RKMT} className = {styles.img} alt = ""/>
                <div className = {styles.data}>
                    {timestamp}
                    <br/>
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
                    TXId: <a href={`${WavesConfig.EXPLORER_URL}/tx/${detail.data.id}`} target="_blank" rel="noreferrer">{detail.data.id}</a>
                </div>
                <div className = {styles.price}>
                {
                    type === 'fc' ? 100 :
                    type === 'ec' ? 100 :
                    type === 'MA' ? 300 :
                    detail.data.amount
                }
                </div>
            </div>
        </div>
    )
}

export default Transaction