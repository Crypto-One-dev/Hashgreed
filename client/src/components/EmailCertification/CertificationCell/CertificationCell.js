import React, {useContext} from 'react'
import download from 'downloadjs'
import moment from 'moment'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {FaEnvelope, FaPaste, FaRegFilePdf} from 'react-icons/all'

import WavesConfig from 'config/waves'
import walletContainer from 'redux/containers/wallet'
import styles from './CertificationCell.module.scss'
import {ThemeContext} from 'context/ThemeContext'

function CertificationCell({cert, owner}){

  const timestamp = moment(cert.timestamp).toString();
  const txid = cert.key.replace('data_ec_', '').replace('_' + owner, '');
  const {theme} = useContext(ThemeContext)

  const DownloadCertificate = () => {
    fetch('/api/certifications/downloadCertificate', {
        method: 'POST',
        body: JSON.stringify({
          txid,
          title: cert.reference,
          hash: cert.messageid,
          hash_title: 'Email ID',
          ...cert
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function(resp) {
        return resp.blob();
      }).then(function(blob) {
        return download(blob, cert.reference + '.pdf');
      });
    }

    return (
      <div className={styles.emailCertification} key={cert.key} style={{backgroundColor: theme.stepBackground, boxShadow: theme.historyglow}} >
        <FaEnvelope className={styles.fileIcon} style={{color: theme.iconBack}}/>
        <div className={styles.dataArea}>
          <div className={styles.timestampArea}>  
            <div className={styles.info} style={{color: theme.primaryText}}>
              {timestamp}
            </div>
            <div className={styles.actions}>
              <CopyToClipboard text={WavesConfig.BASE_URL + '/explorer/' + txid}>
                <FaPaste className={styles.action} style={{color: theme.iconBack}} />
              </CopyToClipboard>
              <FaRegFilePdf className={styles.action} onClick={DownloadCertificate} style={{color: theme.iconBack}}/>
            </div>
          </div>
          <div className ={styles.references} style={{color: theme.primaryText}}>
            Reference: <b>{cert.reference}</b>
            <br/>
            TXId: <a href={`${WavesConfig.EXPLORER_URL}/tx/${txid}`} target="_blank" rel="noreferrer">{txid}</a>
          </div>   
        </div>
      </div>
    )
}

export default walletContainer(CertificationCell)