import React, {useContext, useEffect, useState} from 'react';
import cx from 'classnames';
import download from 'downloadjs';
import moment from 'moment';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {FaDownload, FaFileContract, FaPaste, FaPencilAlt, FaRegFilePdf, FaRegPlusSquare, RiAddCircleFill} from 'react-icons/all';

import WavesConfig from 'config/waves';
import WavesUtils from 'utils/waves';
import ApiUtils from 'utils/api';
import AlertUtils from 'utils/alert';
import {ThemeContext} from 'context/ThemeContext'
import sign from 'assets/images/sign.png'
import styles from './MutualCertificationCell.module.scss'

function MutualCertificationCell({detail, owner, walletState, toggleDetail}){
  const {theme} = useContext(ThemeContext)

  const timestamp = moment(detail.timestamp).toString();
  const split = detail.key.split('_')
  const txid = split[2]
  const creator = split[3]
  const isOwner = creator === owner ? true : false
  const [flag, setFlag] = useState(false)

  const toggleDetails = () => {
    setFlag( !flag )
    toggleDetail(detail, !flag)
  }

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
    <div className={styles.mutualCertification} key={detail.key} style={{backgroundColor: theme.stepBackground, boxShadow: theme.historyglow}}>
        {
          isOwner ? <FaFileContract className={styles.fileIcon} style={{color: theme.iconBack}}/>
                    :
                    <img src={sign} className={styles.fileIcon} alt=''/>
                  // : <FaSignature className={styles.fileIcon} style={{color: theme.iconBack}}/>
        }
      <div className ={styles.infomob} style={{color: theme.primaryText}}>
            {timestamp}
      </div>
      <div className={styles.dataArea}>
        <div className={styles.timestampArea}>
          <div className ={styles.info} style={{color: theme.primaryText}}>
            {timestamp}
          </div>
          <div className={styles.actions}>
            {
              detail.link?
                <FaDownload className={styles.action} onClick={ShowIPFS}style={{color: theme.iconBack}} />
              :
                null
            }
            {
              isOwner ? <RiAddCircleFill className={styles.action} onClick={toggleDetails} style={{color: theme.iconBack}}/>
                      : <FaPencilAlt className={styles.action} onClick={toggleDetails} style={{color: theme.iconBack}}/>
            }
            <CopyToClipboard text={WavesConfig.BASE_URL + '/explorer/' + txid}>
              <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
            </CopyToClipboard>
            <FaRegFilePdf className={styles.action} onClick={DownloadCertificate} style={{color: theme.iconBack}}/>
          </div>
        </div>
        <div className={styles.references} style={{color: theme.primaryText}}>
            {
              isOwner ? <>You created an agreement request: <b>{detail.title}</b></>
                      : <>Your signature is requested: <b>{detail.title}</b></>
            }
            <br/>
            Hash: <span>{detail.hash}</span>
            <br/>
            TXId: <a href={`${WavesConfig.EXPLORER_URL}/tx/${txid}`} target="_blank" rel="noreferrer">{txid}</a>
        </div>
        <div className={styles.referencesmob} style={{color: theme.primaryText}}>
            {
              isOwner ? <>You created an agreement request: <b>{detail.title}</b></>
                      : <>Your signature is requested: <b>{detail.title}</b></>
            }
            <div className={styles.tmob}>
              <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                Hash: <span>{(detail.hash).slice(0,25)+'...'}</span>
              </div>
              <CopyToClipboard text={detail.hash}>
                <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
              </CopyToClipboard>
            </div>
            <div className={styles.tmob}>
              <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
              TXId: <a href={`${WavesConfig.EXPLORER_URL}/tx/${txid}`} target="_blank" rel="noreferrer">{txid.slice(0,25)+'...'}</a>
              </div>
              <CopyToClipboard text={txid}>
                <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
              </CopyToClipboard>             
            </div>
        </div>
      </div>
    </div>
  )
}

export default MutualCertificationCell