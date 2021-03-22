import React, {useCallback, useContext, useEffect, useState} from 'react';
import { Button, Input, Textarea } from '@chakra-ui/react';
import cx from 'classnames';
import {useDropzone} from 'react-dropzone';
import {FaLock, RiArrowDownCircleLine} from "react-icons/all";

import ThemeContext from "context/UserContext";
import walletContainer from 'redux/containers/wallet';
import styles from './Email.module.scss';

function Email({walletState}) {
    const {theme} = useContext(ThemeContext);
    const [isCertifyFormOpen, openCertifyForm] = useState(false);
    const [certifications, setCertifications] = useState([]);
    const [smtp, setSmtp] = useState('open');

    useEffect(() => {
      let interval = -1
      if(walletState.address) {
        const proc = () => {
        //   ApiUtils.getEmailCertifications(walletState.address, setCertifications);
            setCertifications([]) // For Debug
        }
        proc()
        interval = setInterval(proc, 60000)
      }
    
      return () => {
        if(interval > -1) {
          clearInterval(interval)
        }
      }
    }, [walletState.address])

    
    const onDrop = useCallback(acceptedFiles => {
    }, [])
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop})

    return (
        <div className={styles.wrapper}>
            <div style={{display: isCertifyFormOpen ? 'block' : 'none'}}>
                <div className={cx(styles.header, styles.clickable)} style={{backgroundColor: theme.primaryColor}} onClick={() => openCertifyForm(false)}>
                    <span>SEND A CERTIFIED EMAIL</span>
                    <RiArrowDownCircleLine className={styles.openIcon} />
                </div>
                <div style={{fontSize: 16, margin: '30px 0', color: theme.primaryText}}>
                    <div>Enter your email information to certify an important email.</div>
                    <div>No STMP information will be stored or accessible by anyone.</div>
                </div>
                <div className={styles.container}>
                    <div className={styles.smtp}>
                        <div className={smtp === 'open' ? styles.twoInRow : styles.fullRow}>
                            <select className={styles.smtpoption} style={{color: theme.highlightText, backgroundColor: theme.itemBackground, borderColor: theme.manageTokenHighlight}} onChange={(e) => setSmtp(e.target.value)}>
                                <option value='open'>Use our open SMTP</option>
                                <option value='custom'>Use your custom SMTP (For privacy)</option>
                            </select>
                        </div>
                        <div className={smtp === 'open' ? styles.twoInRow : styles.threeInRow}>
                            <Input className={styles.textInput} placeholder="Reference *" style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}} />
                        </div>
                        <div className={smtp === 'open' ? styles.twoInRow : styles.threeInRow} style={{display: smtp === 'open' ? 'none' : 'block'}}>
                            <Input className={styles.textInput} placeholder="Server" style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}} />
                        </div>
                        <div className={smtp === 'open' ? styles.twoInRow : styles.threeInRow} style={{display: smtp === 'open' ? 'none' : 'block'}}>
                            <Input className={styles.textInput} placeholder="Port" style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}} />
                        </div>
                        <div className={smtp === 'open' ? styles.twoInRow : styles.threeInRow} style={{display: smtp === 'open' ? 'none' : 'block'}}>
                            <Input className={styles.textInput} placeholder="Login" style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}} />
                        </div>
                        <div className={smtp === 'open' ? styles.twoInRow : styles.threeInRow} style={{display: smtp === 'open' ? 'none' : 'block'}}>
                            <Input className={styles.textInput} placeholder="Password" style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}} />
                        </div>
                        <div className={smtp === 'open' ? styles.twoInRow : styles.threeInRow}>
                            <Input className={styles.textInput} placeholder="First name" style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}} />
                        </div>
                        <div className={smtp === 'open' ? styles.twoInRow : styles.threeInRow}>
                            <Input className={styles.textInput} placeholder="Last name" style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}} />
                        </div>
                        <div className={smtp === 'open' ? styles.twoInRow : styles.threeInRow}>
                            <Input className={styles.textInput} placeholder="Email sender" style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}} />
                        </div>
                        <div className={smtp === 'open' ? styles.twoInRow : styles.threeInRow}>
                            <Input className={styles.textInput} placeholder="Email recipient" style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}} />
                        </div>
                        <div {...getRootProps()} className={cx(styles.fullRow, styles.dropzone)} style={{backgroundColor: theme.itemBackground, color: theme.buttonBack, borderColor: theme.manageTokenHighlight}}>
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
                        <div className={cx(styles.fullRow, styles.smallfont)} style={{height: 'initial'}}>
                            Recommendations: 10MB total, including message and attachment(s); 2MB limit per attachment.
                        </div>
                        <div className={styles.fullRow} style={{height: 150}}>
                            <Textarea style={{backgroundColor: theme.itemBackground, color: theme.buttonBack, borderColor: theme.manageTokenHighlight}}></Textarea>
                        </div>
                        <div className={cx(styles.fullRow, styles.smallfont)} style={{height: 'initial'}}>
                            <div>* The reference has a maximum of 45 characters. This will be public on the blockchain and used as a reference in the webapp.</div>
                            <div>** You will receive a copy of this message, this won't be public.</div>
                        </div>
                        <div style={{clear: 'both', float: 'none', height: 15, backgroundColor: 'transparent'}} />
                    </div>
                    <div className={styles.certificationFee}>
                        <div style={{color: theme.overviewTransactionId}}>
                            Certification fee:
                        </div>
                        <div style={{color: theme.manageTokenHighlight}}>
                            100 RKMT
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
                                <option value="waves">0.001 waves</option>
                            </select>
                        </div>
                        <div className={cx(styles.feeArea, styles.certificationFee2)}>
                            <div style={{color: theme.overviewTransactionId}}>
                                Certification fee:
                            </div>
                            <div style={{color: theme.manageTokenHighlight}}>
                                100 RKMT
                            </div>
                        </div>
                        <Button className={cx(styles.certify, styles.clickable)} style={{backgroundColor: theme.buttonBack}}>
                            CERTIFY EMAIL
                        </Button>
                    </div>
                </div>
            </div>
            <div className={styles.header} style={{backgroundColor: theme.primaryColor}}>
                CERTIFIED EMAIL HISTORY
            </div>
            <div className={styles.subheader} style={{color: theme.primaryText}}>
                <span>Here is your latest certified emails</span>
                <Button
                    className={cx(styles.certifyForm, styles.clickable)}
                    onClick={() => openCertifyForm(!isCertifyFormOpen)}
                    style={{backgroundColor: theme.buttonBack}}
                >
                    {
                        isCertifyFormOpen ? 'CLOSE THE FORM' : 'SEND EMAIL NOW'
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

export default walletContainer(Email);