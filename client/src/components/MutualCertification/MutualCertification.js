import React, {useContext, useEffect, useState} from 'react';
import cx from 'classnames';
import download from 'downloadjs';
import moment from 'moment';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {FaDownload, FaFileContract, FaPaste, FaPencilAlt, FaRegFilePdf, FaRegPlusSquare, FaSignature} from 'react-icons/all';

import WavesConfig from 'config/waves';
import walletContainer from 'redux/containers/wallet';
import WavesUtils from 'utils/waves';
import ApiUtils from 'utils/api';
import AlertUtils from 'utils/alert';

import styles from './MutualCertification.module.scss'

function MutualCertification({detail, owner, walletState}){

  const timestamp = moment(detail.timestamp).toString();
  const split = detail.key.split('_')
  const txid = split[2]
  const creator = split[3]
  const isOwner = creator === owner ? true : false
  const [details, ShowDetails] = useState(false);

  const [counterparts, setCounterparts] = useState([])

  useEffect(() => {
    ApiUtils.getCounterparts(txid, setCounterparts)
  }, [txid])

  const toggleDetails = () => {
    ShowDetails(!details);
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

  const sign = async () => {
    const tx = await WavesUtils.SignMutual(detail.hash, txid, walletState.publicKey)
    if(tx) {
      AlertUtils.SystemAlert('You signed the contract successfully, Transaction ID: ' + tx.id)
    }
  }
  return (
    <>
    <div className={styles.mutualCertification}>
      <div className={styles.title}>
          Mutual Certification
      </div>
      <hr className = {styles.line}/>
      <div className={styles.main}>
        {
          isOwner ? <FaFileContract className={styles.fileIcon}/>
                  : <FaSignature className={styles.fileIcon}/>
        }
        <div className={styles.dataArea}>
          <div className ={styles.info}>
            {
              isOwner ? <>You created an agreement request: <b>{detail.title}</b></>
                      : <>Your signature is requested: <b>{detail.title}</b></>
            }
            <br/>
            Hash: <span>{detail.hash}</span>
            <br/>
            TXId: <a href={`${WavesConfig.EXPLORER_URL}/tx/${txid}`} target="_blank" rel="noreferrer">{txid}</a>
          </div>
          <div className={styles.actions}>
            {
              detail.link?
                <FaDownload className={styles.action} onClick={ShowIPFS} />
              :
                null
            }
            <CopyToClipboard text={WavesConfig.BASE_URL + '/explorer/' + txid}>
              <FaPaste className={styles.action}/>
            </CopyToClipboard>
            {
              isOwner ? <FaRegPlusSquare className={styles.envelope} onClick={toggleDetails} />
                      : <FaPencilAlt className={styles.envelope} onClick={toggleDetails} />
            }
            <FaRegFilePdf className={styles.envelope} onClick={DownloadCertificate} />
          </div>
        </div>
      </div>
    </div>
    <div className={styles.message} style={{display: details ? 'block' : 'none'}}>
        <div>Agreement creator: {creator}</div>
        <div>Agreement ID: <a href={`${WavesConfig.EXPLORER_URL}/tx/${txid}`} target="_blank" rel="noreferrer" className={styles.signLink} >{txid}</a></div>
        <div className={styles.counterparts_title}>Counterparts</div>
        <div className={styles.counterparts}>
          {
            counterparts.map((each, index) => {
              return <div key={index}>
                {
                  each.status === 'PENDING' ?
                    <>
                      <div className={styles.signLink}>{each.address}</div>
                      <span
                        className={cx(styles.signStatus, each.address === owner ? styles.sign : styles.pending, each.address === owner ? styles.clickable : null)}
                        onClick={each.address === owner ? sign : null}
                      >
                        {
                          each.address === owner ? 'Click to sign' : 'PENDING'
                        }
                      </span>
                    </>
                  :
                    <>
                      <div className={styles.signLink}>
                        <a href={`${WavesConfig.EXPLORER_URL}/tx/${each.status}`} target="_blank" rel="noreferrer">{each.address}</a>
                      </div>
                      <span className={cx(styles.signStatus, styles.signed)}>SIGNED</span>
                    </>
                }
              </div>
            })
          }
        </div>
      </div>
    </>
  )
}

export default MutualCertification