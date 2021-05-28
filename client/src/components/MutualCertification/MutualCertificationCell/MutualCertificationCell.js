import React, {useContext, useEffect, useState} from 'react';
import cx from 'classnames';
import download from 'downloadjs';
import moment from 'moment';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {FaDownload, FaFileContract, FaPaste, FaPencilAlt, FaRegFilePdf, FaRegPlusSquare, FaSignature} from 'react-icons/all';
import {Button, Modal, ModalOverlay, ModalContent, ModalBody} from '@chakra-ui/react';

import WavesConfig from 'config/waves';
import WavesUtils from 'utils/waves';
import ApiUtils from 'utils/api';
import AlertUtils from 'utils/alert';
import {ThemeContext} from 'context/ThemeContext'

import styles from './MutualCertificationCell.module.scss'

function MutualCertificationCell({detail, owner, walletState}){
  const {theme} = useContext(ThemeContext)

  const timestamp = moment(detail.timestamp).toString();
  const split = detail.key.split('_')
  const txid = split[2]
  const creator = split[3]
  const isOwner = creator === owner ? true : false
  const [details, ShowDetails] = useState(false)
  const [showmodal, setshowModal] = useState(false)
  const [counterparts, setCounterparts] = useState([])

  useEffect(() => {
    ApiUtils.getCounterparts(txid, setCounterparts)
  }, [txid])

  const toggleDetails = () => {
    ShowDetails(!details);
    setshowModal(!showmodal);
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
    <div>
      <div className={styles.mutualCertification} key={detail.key} style={{backgroundColor: theme.stepBackground, boxShadow: theme.historyglow}}>
        {
          isOwner ? <FaFileContract className={styles.fileIcon} style={{color: theme.iconBack}}/>
                  : <FaSignature className={styles.fileIcon} style={{color: theme.iconBack}}/>
        }
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
            <CopyToClipboard text={WavesConfig.BASE_URL + '/explorer/' + txid}>
              <FaPaste className={styles.action} style={{color: theme.iconBack}}/>
            </CopyToClipboard>
            {
              isOwner ? <FaRegPlusSquare className={styles.action} onClick={toggleDetails} style={{color: theme.iconBack}}/>
                      : <FaPencilAlt className={styles.action} onClick={toggleDetails} style={{color: theme.iconBack}}/>
            }
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
        </div>
      </div>
      <Modal isCentered isOpen={showmodal} size='xl' onClose={() => setshowModal(false)}>
        <ModalOverlay />
        <ModalContent style={{backgroundColor: theme.itemBackground, margin: '0 5px'}}>
          <ModalBody style={{display: 'flex', flexDirection: 'column', color: 'white', padding: 20, textAlign: 'center'}}>
            <div className={styles.message} style={{color: theme.primaryText}}>
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
            <Button onClick={toggleDetails} style={{backgroundColor: theme.buttonBack}} className={styles.clickable}>
              close
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default MutualCertificationCell