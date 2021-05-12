import React, {useState, useCallback, useEffect} from 'react'

import cx from 'classnames'
import {Input, Textarea} from '@chakra-ui/react'
import {BsPaperclip} from 'react-icons/bs'
import styles from './Email.module.scss'
import {useDropzone} from 'react-dropzone'
import walletContainer from 'redux/containers/wallet'
import AlertUtils from 'utils/alert'
import ApiUtils from 'utils/api'
import WavesUtils from 'utils/waves'
import { v4 as uuidgen } from 'uuid'

function Email({walletState}){

    const certFee = 100;
    const transactionFee = 0.001;
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

    const certifyEmail = async () => {
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
        <div className = {styles.email}>
            <div className = {styles.container}>
                <div className={styles.certifyTitle}>Certify email</div>
                <hr className = {styles.border}/>
                <div className = {styles.certifyContainer}>
                    <div className = {styles.fromContainer}>
                        <div className ={styles.from}>
                            <div className = {styles.inputTitle}>From</div>
                            <Input className = {styles.inputValue} value={email_sender} onChange={e => setEmailSender(e.target.value)} variant="flushed" placeholder=""/>
                        </div>
                        <div className ={styles.firstName}>
                            <div className = {styles.inputTitle}>First Name</div>
                            <Input className = {styles.inputValue} value={first_name} onChange={e => setFirstName(e.target.value)} variant="flushed" placeholder=""/>
                        </div>
                        <div className ={styles.lastName}>
                            <div className = {styles.inputTitle}>Last Name</div>
                            <Input className = {styles.inputValue} value={last_name} onChange={e => setLastName(e.target.value)} variant="flushed" placeholder=""/>
                        </div>
                    </div>
                    <div className = {styles.toContainer}>
                    <div className ={styles.server}>
                            <div className = {styles.inputTitle}>SMTP Server</div>
                            <Input className = {styles.inputValue} value={server} onChange={e => setServer(e.target.value)} variant="flushed" placeholder=""/>
                        </div>
                        <div className ={styles.reference}>
                            <div className = {styles.inputTitle}>Reference*</div>
                            <Input className = {styles.inputValue} value={reference} onChange={e => setReference(e.target.value)} variant="flushed" placeholder=""/>
                        </div>
                        <div className ={styles.to}>
                            <div className = {styles.inputTitle}>To</div>
                            <Input className = {styles.inputValue} value={email_recipient} onChange={e => setEmailRecipient(e.target.value)} variant="flushed" placeholder=""/>
                        </div>
                    </div>
                </div>
                <div className = {styles.subDatas}>
                    <div className = {styles.message}>
                        <div className = {styles.inputTitle}>Message**</div>
                        <div className = {styles.upload}>
                            <div className = {styles.inputTitle}>Attachment: Max files size: 30MB</div>
                            <BsPaperclip className = {styles.paperClip}/>
                        </div>
                    </div>
                    <Textarea className = {styles.messagezone} value={message} onChange={e => setMessage(e.target.value)}/>
                    <div className = {styles.messageComment}>
                        <div className = {styles.subcomment}>* The reference has a maximum of 45 characters. This will be public on the blockchain and used as a reference in the webapp.</div>
                        <div className = {styles.subcomment}>** You will recieve a copy of this message, this wont be public.</div>
                    </div>
                </div>
                <div className = {styles.feearea}>
                    <div className = {styles.certification}>
                        <div className = {styles.feeTitle}>Certification fee:</div>
                        <div className = {styles.fee}>{certFee} RKMT</div>
                    </div>
                    <div className = {styles.transaction}>
                        <div className = {styles.feeTitle}>Transaction fee:</div>
                        <div className = {styles.fee}>{transactionFee} Waves</div>
                    </div>
                </div>
                <div className = {styles.confirmarea}>
                    <a className={cx(styles.button, styles.filled)} onClick={certifyEmail}>Certify email</a>
                    <div className = {styles.subcomment}>
                        This transaction is secure and will open waves Signer
                    </div>
                </div>

            </div>
        </div>
    )
}

export default walletContainer(Email)