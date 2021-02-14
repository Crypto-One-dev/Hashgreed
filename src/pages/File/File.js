import React, {useCallback, useContext, useEffect, useState} from 'react';
import { Button, Checkbox, Input, Text, Tooltip } from '@chakra-ui/react';
import cx from 'classnames';
import {useDropzone} from 'react-dropzone';
import {FaLock, RiArrowDownCircleLine} from "react-icons/all";

import ThemeContext from "context/UserContext";
import walletContainer from 'redux/containers/wallet';
import styles from './File.module.scss';

function File({walletState}) {
    const {theme} = useContext(ThemeContext);
    const [isCertifyFormOpen, openCertifyForm] = useState(false);
    const [certifications, setCertifications] = useState([]);

    useEffect(() => {
      let interval = -1
      if(walletState.address) {
        const proc = () => {
        //   ApiUtils.getFileCertifications(walletState.address, setCertifications);
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

    
    const onDrop = useCallback(acceptedFiles => {
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div className={styles.wrapper}>
            <div style={{display: isCertifyFormOpen ? 'block' : 'none'}}>
                <div className={cx(styles.header, styles.clickable)} style={{backgroundColor: theme.primaryColor}} onClick={() => openCertifyForm(false)}>
                    <span>CERTIFY A FILE</span>
                    <RiArrowDownCircleLine className={styles.openIcon} />
                </div>
                <div style={{fontSize: 16, margin: '30px 0', color: theme.primaryText}}>
                    <div>Click to select or drag and drop any type of file.</div>
                    <div>Bigger files will take longer to compute. Max tested file size is 10 GB.</div>
                </div>
                <div className={styles.container}>
                    <div className={styles.dropContainer}>
                        <div {...getRootProps()} className={styles.dropZone} style={{backgroundColor: theme.itemBackground, color: theme.buttonBack, borderColor: theme.manageTokenHighlight}}>
                        <input {...getInputProps()} />
                        {
                            <p>Select or Drop a file</p>
                        }
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
                                <Input className={styles.textInput} style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}} />
                            </div>
                            <div>
                                <div className={styles.inputDiv}>
                                    <Text color={theme.manageTokenHighlight}>File hash</Text>
                                    <Text color={theme.grayText} className={styles.description}>- No file is sent or stored online unless you choose IPFS option.</Text>
                                </div>
                                <Input className={styles.textInput} style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}} />
                            </div>
                            <Checkbox className={styles.checkbox}>
                                <div className={styles.inputDiv}>
                                    <Text color={theme.primaryText}>Store file on IPFS</Text>
                                    <Text color={theme.grayText} className={styles.description}>(10MB max)</Text>
                                    <Tooltip label="Fill will be public and permanently stored on IPFS, this is not a personal storage. Always keep your own copy and don't use it for sensitive/private files." placement="right">
                                        <span className={styles.question} style={{backgroundColor: theme.manageTokenHighlight}}>?</span>
                                    </Tooltip>
                                </div>
                            </Checkbox>
                        </div>
                    </div>
                    <div className={styles.certificationFee}>
                        <div style={{color: theme.overviewTransactionId}}>
                            Certification fee:
                        </div>
                        <div style={{color: theme.manageTokenHighlight}}>
                            267.78935561 SIGN (0.5$)
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
                                <option value="token">50 SIGN</option>
                                <option value="waves">0.005 waves</option>
                            </select>
                        </div>
                        <div className={cx(styles.feeArea, styles.certificationFee2)}>
                            <div style={{color: theme.overviewTransactionId}}>
                                Certification fee:
                            </div>
                            <div style={{color: theme.manageTokenHighlight}}>
                                267.78935561 SIGN (0.5$)
                            </div>
                        </div>
                        <Button className={cx(styles.certify, styles.clickable)} style={{backgroundColor: theme.buttonBack}}>
                            CERTIFY FILE
                        </Button>
                    </div>
                </div>
            </div>
            <div className={styles.header} style={{backgroundColor: theme.primaryColor}}>
                CERTIFIED FILE HISTORY
            </div>
            <div className={styles.subheader} style={{color: theme.primaryText}}>
                <span>Here is your last certified files</span>
                <Button
                    className={cx(styles.certifyForm, styles.clickable)}
                    onClick={() => openCertifyForm(!isCertifyFormOpen)}
                    style={{backgroundColor: theme.buttonBack}}
                >
                    {
                        isCertifyFormOpen ? 'CLOSE THE FORM' : 'CERTIFY NOW'
                    }
                </Button>
            </div>
            <div className={styles.certifications}>
                {certifications.map((certification, index) => (
                    // <Certification key={index} detail={certification} />
                    <div key={index}></div>
                ))}
            </div>
        </div>
    )
}

export default walletContainer(File);