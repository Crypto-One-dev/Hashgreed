import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import { Button } from '@chakra-ui/react';
import cx from 'classnames';
import {sha256} from 'js-sha256';
import moment from 'moment';
import QRCode from 'qrcode.react';
import {useDropzone} from 'react-dropzone';
import {RiArrowDownCircleLine, FaCertificate, FaFileAlt} from "react-icons/all";

import certBG from 'assets/certificate_bg.jpg';
import Text from 'component/Text/Text';
import ThemeContext from "context/UserContext";
import WavesConfig from 'config/waves';
import ApiUtils from 'utils/api';
import styles from './VerificationExplorer.module.scss';
import AlertUtils from 'utils/alert';

function VerificationExplorer({query}) {
    const {theme} = useContext(ThemeContext);
    const [isSearchOpen, openSearchForm] = useState(false);

    const [transactionID, setTransactionID] = useState('');
    const [hashID, setHashID] = useState('');
    const [reference, setReference] = useState('');
    const searchButton = useRef(null);
    const [certification, setCertification] = useState();

    useEffect(() => {
        if(query) {
            openSearchForm(true)
            setTransactionID(query)
            setTimeout(() => {
                searchButton.current.click();
            }, 1000)
        }
    }, [query, openSearchForm, setTransactionID])

    // const {acceptedFiles, getRootProps, getInputProps} = useDropzone({})
    const onCertDrop = useCallback(acceptedFiles => {
        if(acceptedFiles.length === 1) {
            const reader = new FileReader()
            reader.onload = () => {
                const str = reader.result
                const regex = /https:\/\/wavesexplorer.com\/tx\/[A-Za-z0-9]*/g;
                const found = str.match(regex);
                if(found.length === 1) {
                    const txid = found[0].replace('https://wavesexplorer.com/tx/', '')
                    ApiUtils.searchCertification(txid, '', '', setCertification)
                } else {
                    AlertUtils.SystemAlert('Not supported certification')
                }
            }
            reader.readAsText(acceptedFiles[0])
        }
    }, [])
    const poc = useDropzone({onDrop: onCertDrop})
    const onFileDrop = useCallback(acceptedFiles => {
        if(acceptedFiles.length === 1) {
            const reader = new FileReader()
            reader.onload = () => {
                const binaryStr = reader.result
                setTransactionID('')
                setHashID(sha256(binaryStr))
                setReference('')
            }
            reader.readAsArrayBuffer(acceptedFiles[0])
        }
    }, [])
    const fth = useDropzone({onDrop: onFileDrop})

    const Search = () => {
        if(!transactionID && !hashID && !reference) {
            return
        }
        ApiUtils.searchCertification(transactionID, hashID, reference, setCertification)
    }

    return (
        <div className={styles.wrapper}>
            <div style={{display: isSearchOpen ? 'block' : 'none'}}>
                <div className={cx(styles.header, styles.clickable)} style={{backgroundColor: theme.primaryColor}} onClick={() => openSearchForm(false)}>
                    <span>VERIFICATION EXPLORER</span>
                    <RiArrowDownCircleLine className={styles.openIcon} />
                </div>
                <div className={styles.container}>
                    <div {...poc.getRootProps()} className={styles.item} style={{backgroundColor: theme.itemBackground, color: theme.buttonBack, borderColor: theme.manageTokenHighlight}}>
                        <input {...poc.getInputProps()} />
                        <div className={styles.itemMain} style={{color: theme.buttonBack}}>
                            <FaCertificate className={styles.iconSize} style={{color: theme.buttonBack}}/>
                            <Text className={styles.selectText} style={{color: theme.buttonBack}}>Select or Drop a</Text>
                            <Text className={styles.boldText} style={{color: theme.buttonBack}}>Proof Of Certification</Text>
                        </div>
                    </div>
                    <div {...fth.getRootProps()} className={styles.item} style={{backgroundColor: theme.itemBackground, color: theme.buttonBack, borderColor: theme.manageTokenHighlight}}>
                        <input {...fth.getInputProps()} />
                        <div className={styles.itemMain} style={{color: theme.buttonBack}}>
                            <FaFileAlt className={styles.iconSize} style={{color: theme.buttonBack}}/>
                            {
                                fth.acceptedFiles.length === 1 ?
                                    <Text className={styles.selectText} style={{color: theme.buttonBack}}>{fth.acceptedFiles[0].path}</Text>
                                :
                                    <>
                                        <Text className={styles.selectText} style={{color: theme.buttonBack}}>Select or Drop a</Text>
                                        <Text className={styles.boldText} style={{color: theme.buttonBack}}>File to hash</Text>
                                    </>
                            }
                        </div>
                    </div>
                </div>
                <input className={styles.inputText} style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight}} placeholder="Transaction ID" value={transactionID} onChange={e => setTransactionID(e.target.value)}/>
                <input className={styles.inputText} style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight}} placeholder="File Hash or Message ID" value={hashID} onChange={e => setHashID(e.target.value)}/>
                <div className={styles.referenceWrapper}>
                    <input className={styles.referenceText} style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight}} placeholder="Reference" value={reference} onChange={e => setReference(e.target.value)}/>
                    <Button className={styles.searchButton} style={{backgroundColor: theme.buttonBack}} onClick={Search} ref={searchButton}>SEARCH</Button>
                </div>
            </div>
            <div className={styles.header} style={{backgroundColor: theme.primaryColor}}>
                RESULT(S)
            </div>
            <div className={styles.explorerListWrapper}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{flex: 1}} />
                    <Button
                        className={cx(styles.openSearchForm, styles.clickable)}
                        onClick={() => openSearchForm(!isSearchOpen)}
                        style={{backgroundColor: theme.buttonBack}}
                        >
                        {isSearchOpen ? 'CLOSE' : 'OPEN'} SEARCH FORM
                    </Button>
                </div>
                {
                    certification ?
                        <div className={styles.explorerList}>
                            <div className={styles.item} style={{backgroundImage: `url(${certBG})`}}>
                                <span style={{fontSize: 20}}>
                                    <b>PROOF OF CERTIFICATION</b>
                                </span>
                                <span style={{backgroundColor: theme.primaryColor, color: 'white', fontSize: 14, fontWeight: 'bold', padding: '5px 25px'}}>
                                    THE FOLLOWING FILE WAS CERTIFIED ON
                                    <br/>
                                    THE WAVES BLOCKCHAIN
                                </span>
                                <span>
                                    <i>BY {certification.address}</i>
                                </span>
                                <span>
                                    <b>Reference:</b>
                                    <br/>
                                    {certification.title}
                                </span>
                                <span>
                                    <b>Date:</b>
                                    <br/>
                                    {moment(certification.timestamp).toString()}
                                </span>
                                <span>
                                    <b>File Hash:</b>
                                    <br/>
                                    {certification.hash}
                                </span>
                                <a style={{color: theme.buttonBack}} href={`${WavesConfig.EXPLORER_URL}/tx/${certification.txid}`} target="_blank" rel="noreferrer">
                                    SEE ON WAVES EXPLORER
                                </a>
                                <QRCode value={WavesConfig.BASE_URL + '/explorer/' + certification.txid} includeMargin={true} size={72} className={styles.qr} />
                                {
                                    certification.status?
                                        <span className={styles.status}>
                                            <a href={"http://wavesexplorer.com/tx/" + certification.status.replace('REVOKED_', '')} target="_blank" rel="noreferrer">
                                                REVOKED
                                            </a>
                                        </span>
                                    :
                                        null
                                }
                            </div>
                        </div>
                    :
                        null
                }
            </div>
        </div>
    )
}

export default VerificationExplorer