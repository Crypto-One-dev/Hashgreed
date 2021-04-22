import React, {useCallback, useContext, useEffect, useState} from 'react';
import { Button, Input, Spinner, Textarea } from '@chakra-ui/react';
import cx from 'classnames';
import {useDropzone} from 'react-dropzone';
import {FaLock, RiArrowDownCircleLine} from "react-icons/all";
import { v4 as uuidgen } from 'uuid';

import EmailCertification from 'component/EmailCertification/EmailCertification';
import ThemeContext from "context/UserContext";
import walletContainer from 'redux/containers/wallet';
import AlertUtils from 'utils/alert';
import ApiUtils from 'utils/api';
import WavesUtils from 'utils/waves';

import styles from './Email.module.scss';


function Email({walletState}) {
    const {theme} = useContext(ThemeContext);
    const [isCertifyFormOpen, openCertifyForm] = useState(false);
    const [certifications, setCertifications] = useState([]);

    useEffect(() => {
      let interval = -1
      if(walletState.address) {
        const proc = () => {
            ApiUtils.getCertifications('data_ec_([A-Za-z0-9]*)_' + walletState.address, setCertifications);
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

    const certFee = 100;
    const transactionFee = 0.005;
    
    const onDrop = useCallback(acceptedFiles => {
    }, [])
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop})

    const [smtp, setSmtp] = useState('open')
    const [server, setServer] = useState('')
    const [port, setPort] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email_sender, setEmailSender] = useState('')
    const [email_recipient, setEmailRecipient] = useState('')
    const [message, setMessage] = useState('')
    const [reference, setReference] = useState('')
    const [uploading, setUploading] = useState(false)

    const Certify = async () => {
        if(reference) {
            const timestamp = Date.now()
            const uuid = uuidgen()
            const domain = smtp === 'open' ? 'hashgreed.com' : login.split('@').pop()
            const tx = await WavesUtils.CertifyEmail(reference, uuid, domain, timestamp, walletState.publicKey, certFee, transactionFee)
            if(tx) {
                setUploading(true)
                await ApiUtils.emailUpload(
                    acceptedFiles.length === 1 ? acceptedFiles[0] : null, 
                    smtp, server, port, login, password, first_name, last_name, email_sender, email_recipient, message, reference, uuid + '@' + domain, tx.id)
                AlertUtils.SystemAlert('You sent a Hashgreed Certified Email')
            }
        }
        acceptedFiles.splice(0, acceptedFiles.length);
        setSmtp('open')
        setServer('')
        setPort('')
        setLogin('')
        setPassword('')
        setFirstName('')
        setLastName('')
        setEmailSender('')
        setEmailRecipient('')
        setMessage('')
        setReference('')
        setUploading(false)
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
                            <Input className={styles.textInput} placeholder="Reference *" style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}} 
                                    value={reference} onChange={e => setReference(e.target.value)} />
                        </div>
                        <div className={smtp === 'open' ? styles.twoInRow : styles.threeInRow} style={{display: smtp === 'open' ? 'none' : 'block'}}>
                            <Input className={styles.textInput} placeholder="Server" style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}}
                                    value={server} onChange={e => setServer(e.target.value)} />
                        </div>
                        <div className={smtp === 'open' ? styles.twoInRow : styles.threeInRow} style={{display: smtp === 'open' ? 'none' : 'block'}}>
                            <Input className={styles.textInput} placeholder="Port" style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}}
                                    value={port} onChange={e => setPort(e.target.value)} />
                        </div>
                        <div className={smtp === 'open' ? styles.twoInRow : styles.threeInRow} style={{display: smtp === 'open' ? 'none' : 'block'}}>
                            <Input className={styles.textInput} placeholder="Login" style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}}
                                    value={login} onChange={e => setLogin(e.target.value)} />
                        </div>
                        <div className={smtp === 'open' ? styles.twoInRow : styles.threeInRow} style={{display: smtp === 'open' ? 'none' : 'block'}}>
                            <Input className={styles.textInput} placeholder="Password" style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}}
                                    value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className={smtp === 'open' ? styles.twoInRow : styles.threeInRow}>
                            <Input className={styles.textInput} placeholder="First name" style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}}
                                    value={first_name} onChange={e => setFirstName(e.target.value)} />
                        </div>
                        <div className={smtp === 'open' ? styles.twoInRow : styles.threeInRow}>
                            <Input className={styles.textInput} placeholder="Last name" style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}}
                                    value={last_name} onChange={e => setLastName(e.target.value)} />
                        </div>
                        <div className={smtp === 'open' ? styles.twoInRow : styles.threeInRow}>
                            <Input className={styles.textInput} placeholder="Email sender" style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}}
                                    value={email_sender} onChange={e => setEmailSender(e.target.value)} />
                        </div>
                        <div className={smtp === 'open' ? styles.twoInRow : styles.threeInRow}>
                            <Input className={styles.textInput} placeholder="Email recipient" style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}}
                                    value={email_recipient} onChange={e => setEmailRecipient(e.target.value)} />
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
                            Recommendations: 30MB total, including message and attachment.
                        </div>
                        <div className={styles.fullRow} style={{height: 150}}>
                            <Textarea style={{backgroundColor: theme.itemBackground, color: theme.buttonBack, borderColor: theme.manageTokenHighlight}}
                                    value={message} onChange={e => setMessage(e.target.value)} >
                            </Textarea>
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
                {
                    certifications.map((cert, index) => {
                        return (
                            <EmailCertification key={index} detail={cert} owner={walletState.address} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default walletContainer(Email);