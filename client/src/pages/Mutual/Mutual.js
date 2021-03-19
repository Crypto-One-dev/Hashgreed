import React, {useCallback, useContext, useEffect, useState} from 'react';
import { Button, Checkbox, Input, Spinner, Text, Textarea, Tooltip } from '@chakra-ui/react';
import cx from 'classnames';
import {sha256} from 'js-sha256';
import {useDropzone} from 'react-dropzone';
import {FaLock, RiArrowDownCircleLine} from "react-icons/all";
import { v5 as uuidgen } from 'uuid';

import MutualCertification from 'component/MutualCertification/MutualCertification';
import ThemeContext from "context/UserContext";
import WavesConfig from 'config/waves';
import walletContainer from 'redux/containers/wallet';
import styles from './Mutual.module.scss';
import ApiUtils from 'utils/api';
import WavesUtils from 'utils/waves';

function Mutual({walletState}) {
    const {theme} = useContext(ThemeContext);
    const [isCertifyFormOpen, openCertifyForm] = useState(false);
    const [certifications, setCertifications] = useState([]);

    const certFee = 300;
    const transactionFee = 0.005;

    useEffect(() => {
      let interval = -1
      if(walletState.address) {
        const proc = () => {
            ApiUtils.getMutualCertifications(walletState.address, setCertifications);
        }
        proc()
        interval = setInterval(proc, 10000)
      }
    
      return () => {
        if(interval > -1) {
          clearInterval(interval)
        }
      }
    }, [walletState.address])

    const [hash, setHash] = useState('');
    const [reference, setReference] = useState('');
    const [uuid, setUUID] = useState('');
    const [store, setStore] = useState(false)
    const [recipients, setRecipients] = useState('')
    const [uploading, setUploading] = useState(false)
    
    const onDrop = useCallback(acceptedFiles => {
        if(acceptedFiles.length === 1) {
            const reader = new FileReader()
            reader.onload = () => {
                const binaryStr = reader.result
                const hash = sha256(binaryStr)
                setHash(hash)
                setReference(acceptedFiles[0].path)
                setUUID(uuidgen(hash, WavesConfig.UUID_NAMESPACE))
            }
            reader.readAsArrayBuffer(acceptedFiles[0])
        }
    }, [])
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop})

    const Certify = async () => {
        const recp = recipients.split('\n')
        if(acceptedFiles.length === 1 && hash && reference && uuid && recp.length > 0) {
            const timestamp = Date.now()
            const tx = await WavesUtils.CertifyMutual(reference, hash, recp, uuid, timestamp, walletState.publicKey, certFee, transactionFee)
            if(tx && store) {
                setUploading(true)
                await ApiUtils.fileUpload(acceptedFiles[0], tx.id)
            }
        }
        acceptedFiles.splice(0, acceptedFiles.length);
        setHash('')
        setReference('')
        setUUID('')
        setStore(false)
        setUploading(false)
        setRecipients('')
    }

    return (
        <div className={styles.wrapper}>
            {
                uploading ?
                    <div className={styles.spinner}>
                        <Spinner size="xl" color="red.500" />
                    </div>
                :
                    null
            }
            <div style={{display: isCertifyFormOpen ? 'block' : 'none'}}>
                <div className={cx(styles.header, styles.clickable)} style={{backgroundColor: theme.primaryColor}} onClick={() => openCertifyForm(false)}>
                    <span>CERTIFY A MUTUAL AGREEMENT</span>
                    <RiArrowDownCircleLine className={styles.openIcon} />
                </div>
                <div style={{fontSize: 16, margin: '30px 0', color: theme.primaryText}}>
                    <div>Click to select or drag and drop the agreement document.</div>
                    <div>Enter a reference for this contract and add the counterparts required to sign it.</div>
                    <div>Creating an agreement automatically sign it with your account.</div>
                </div>
                <div className={styles.container}>
                    <div className={styles.dropContainer}>
                        <div {...getRootProps()} className={styles.dropZone} style={{backgroundColor: theme.itemBackground, color: theme.buttonBack, borderColor: theme.manageTokenHighlight}}>
                        <input {...getInputProps()} />
                        <p>
                        {
                            acceptedFiles.length === 1 ?
                                acceptedFiles[0].path
                            :
                                "Select or Drop a file"
                        }
                        </p>
                        </div>
                        <div className={styles.inputs}>
                            <div>
                                <div className={styles.inputDiv}>
                                    <Text color={theme.manageTokenHighlight}>Reference</Text>
                                    <Text color={theme.grayText} className={styles.description}>(0 / 45 Chars.)</Text>
                                    <Tooltip label="File name by default, can be changed. It will also be used as the generated PDF name" placement="right">
                                        <span className={styles.question} style={{backgroundColor: theme.manageTokenHighlight}}>?</span>
                                    </Tooltip>
                                </div>
                                <Input
                                    className={styles.textInput}
                                    style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}}
                                    value={reference}
                                    onChange={e => setReference(e.target.value)}
                                />
                            </div>
                            <div>
                                <div className={styles.inputDiv}>
                                    <Text color={theme.manageTokenHighlight}>File hash</Text>
                                    <Text color={theme.grayText} className={styles.description}>- No file is sent or stored online unless you choose IPFS option.</Text>
                                </div>
                                <Input
                                    className={styles.textInput}
                                    style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}}
                                    value={hash}
                                    onChange={e => setHash(e.target.value)}
                                />
                            </div>
                            <Checkbox className={styles.checkbox} isChecked={store} onChange={e => setStore(e.target.checked)}>
                                <div>
                                    <div className={styles.inputDiv}>
                                        <Text color={theme.manageTokenHighlight}>Store file on IPFS</Text>
                                        <Text color={theme.grayText} className={styles.description}>(10MB max)</Text>
                                        <Tooltip label="Fill will be public and permanently stored on IPFS, this is not a personal storage. Always keep your own copy and don't use it for sensitive/private files." placement="right">
                                            <span className={styles.question} style={{backgroundColor: theme.manageTokenHighlight}}>?</span>
                                        </Tooltip>
                                    </div>
                                </div>
                            </Checkbox>
                            <div>
                                <div className={styles.inputDiv}>
                                    <Text color={theme.manageTokenHighlight}>Recipients addresses (6 max)</Text>
                                    <Text color={theme.grayText} className={styles.description}>- Enter all counterparts with one address (no alias) per line.</Text>
                                </div>
                                <Textarea
                                    className={styles.textInput}
                                    style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}}
                                    rows={6}
                                    value={recipients}
                                    onChange={e => setRecipients(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.certificationFee}>
                        <div style={{color: theme.overviewTransactionId}}>
                            Certification fee:
                        </div>
                        <div style={{color: theme.manageTokenHighlight}}>
                            {certFee} RKMT
                        </div>
                    </div>
                    <div className={styles.buttonArea}>
                        <div className={styles.lock} style={{backgroundColor: theme.buttonBack, color: '#ffffff'}}>
                            <FaLock className={styles.icon} />
                        </div>
                        <div className={styles.description} style={{color: theme.primaryText}}>This transaction is secure and will open Waves Signer</div>
                        <div className={styles.feeArea}>
                            <div style={{color: theme.overviewTransactionId}}>
                                Transaction fee:
                            </div>
                            <select style={{color: theme.highlightText, backgroundColor: theme.itemBackground, borderColor: theme.buttonBack, borderWidth: 1, borderStyle: 'solid'}}>
                                <option value="waves">{transactionFee} waves</option>
                            </select>
                        </div>
                        <div className={cx(styles.feeArea, styles.certificationFee2)}>
                            <div style={{color: theme.overviewTransactionId}}>
                                Certification fee:
                            </div>
                            <div style={{color: theme.manageTokenHighlight}}>
                                {certFee} RKMT
                            </div>
                        </div>
                        <Button className={cx(styles.certify, styles.clickable)} style={{backgroundColor: theme.buttonBack}} onClick={Certify}>
                            CREATE AGREEMENT
                        </Button>
                    </div>
                </div>
            </div>
            <div className={styles.header} style={{backgroundColor: theme.primaryColor}}>
                MUTUAL AGREEMENT HISTORY
            </div>
            <div className={styles.subheader} style={{color: theme.primaryText}}>
                <span>Here is your latest certified agreements</span>
                <Button
                    className={cx(styles.certifyForm, styles.clickable)}
                    onClick={() => openCertifyForm(!isCertifyFormOpen)}
                    style={{backgroundColor: theme.buttonBack}}
                >
                    {
                        isCertifyFormOpen ? 'CLOSE THE FORM' : 'CREATE AGREEMENT NOW'
                    }
                </Button>
            </div>
            <div className={styles.certifications}>
                {
                    certifications.map((cert, index) => {
                        return (
                            <MutualCertification key={index} detail={cert} owner={walletState.address} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default walletContainer(Mutual);