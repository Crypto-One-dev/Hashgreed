import React, {useState, useCallback, useEffect, useContext} from 'react'

import cx from 'classnames'
import {Input, Textarea, Select} from '@chakra-ui/react'
import {BsPaperclip} from 'react-icons/bs'
import styles from './Email.module.scss'
import {useDropzone} from 'react-dropzone'
import walletContainer from 'redux/containers/wallet'
import AlertUtils from 'utils/alert'
import ApiUtils from 'utils/api'
import WavesUtils from 'utils/waves'
import { v4 as uuidgen } from 'uuid'
import EmailCertification from 'components/EmailCertification/EmailCertification'
import {ThemeContext} from 'context/ThemeContext'

function Email({walletState}){

    const certFee = 100
    const transactionFee = 0.005
    const [certifications, setCertifications] = useState([])
    const {theme} = useContext(ThemeContext)
    
    useEffect(() => {
        if(walletState.address) {
          const proc = () => {
              ApiUtils.getCertifications('data_ec_([A-Za-z0-9]*)_' + walletState.address, setCertifications)
          }
          proc()
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
        acceptedFiles.splice(0, acceptedFiles.length)
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
            <div className={styles.certifyTitle} style={{color: theme.primaryText}}>Certify email</div>
            <hr className = {styles.border}/>
            <div className = {styles.certifyContainer}>
                <div className = {styles.fromContainer}>
                    <div className ={styles.from}>
                        <div className = {styles.inputTitle} style={{color: theme.commentText}}>From</div>
                        <Input className = {styles.inputValue} style={{color: theme.primaryText}} value={email_sender} onChange={e => setEmailSender(e.target.value)} variant="flushed" placeholder=""/>
                    </div>
                    <div className ={styles.firstName}>
                        <div className = {styles.inputTitle} style={{color: theme.commentText}}>First Name</div>
                        <Input className = {styles.inputValue} style={{color: theme.primaryText}} value={first_name} onChange={e => setFirstName(e.target.value)} variant="flushed" placeholder=""/>
                    </div>
                    <div className ={styles.lastName}>
                        <div className = {styles.inputTitle} style={{color: theme.commentText}}>Last Name</div>
                        <Input className = {styles.inputValue} style={{color: theme.primaryText}} value={last_name} onChange={e => setLastName(e.target.value)} variant="flushed" placeholder=""/>
                    </div>
                </div>
                <div className = {styles.toContainer}>
                    <div className ={styles.server}>
                        <div className = {styles.inputTitle} style={{color: theme.commentText}}>SMTP Server</div>
                        <Select className = {styles.inputValue} style={{color: theme.primaryText}} onChange={(e) => setSmtp(e.target.value)} variant="flushed" placeholder="">
                            <option value="open" style={{color: theme.selectboxText}}>Use our open SMTP</option>
                            <option value="custom" style={{color: theme.selectboxText}}>Use your custom SMTP(For privacy)</option>
                        </Select>
                    </div>
                    <div className ={styles.reference}>
                        <div className = {styles.inputTitle} style={{color: theme.commentText}}>Server</div>
                        <Input className = {styles.inputValue} style={{color: theme.primaryText}} value={server} onChange={e => setServer(e.target.value)} variant="flushed" placeholder=""/>
                    </div>
                    <div className ={styles.to}>
                        <div className = {styles.inputTitle} style={{color: theme.commentText}}>Port</div>
                        <Input className = {styles.inputValue} style={{color: theme.primaryText}} value={port} onChange={e => setPort(e.target.value)} variant="flushed" placeholder=""/>
                    </div>
                </div>
            </div>
            <div className = {styles.customContainer} style={{display: smtp === 'open' ? 'none' : 'block'}}>
                <div className = {styles.serverArea}>
                    <div className ={styles.server}>
                        <div className = {styles.inputTitle} style={{color: theme.commentText}}>Reference*</div>
                        <Input className = {styles.inputValue} style={{color: theme.primaryText}} value={reference} onChange={e => setReference(e.target.value)} variant="flushed" placeholder=""/>
                    </div>
                    <div className ={styles.port}>
                        <div className = {styles.inputTitle} style={{color: theme.commentText}}>Login</div>
                        <Input className = {styles.inputValue} style={{color: theme.primary}} value={login} onChange={e => setLogin(e.target.value)} variant="flushed" placeholder=""/>
                    </div>
                </div>
                <div className = {styles.userArea}>
                    <div className ={styles.userId}>
                        <div className = {styles.inputTitle} style={{color: theme.commentText}}>To</div>
                        <Input className = {styles.inputValue} style={{color: theme.primaryText}} value={email_recipient} onChange={e => setEmailRecipient(e.target.value)} variant="flushed" placeholder="" maxLength={60}/>
                    </div>
                    <div className ={styles.userPassword}>
                        <div className = {styles.inputTitle} style={{color: theme.commentText}}>Password</div>
                        <Input type='password' className = {styles.inputValue} style={{color: theme.primaryText}} value={password} onChange={e => setPassword(e.target.value)} variant="flushed" placeholder=""/>
                    </div>
                </div>
            </div>

            <div className = {styles.subDatas}>
                <div className = {styles.message}>
                    <div className = {styles.inputTitle} style={{color: theme.commentText}}>Message**</div>
                    <div  className = {styles.upload}>
                        <div  className = {styles.inputTitle} style={{color: theme.commentText}}>Attachment: {
                                acceptedFiles.length === 1 ?
                                    acceptedFiles[0].path
                                :
                                    "Max files size: 4MB"
                            } </div>
                        <BsPaperclip {...getRootProps()} className = {styles.paperClip} style={{color: theme.primaryText}}/>
                        <input {...getInputProps()} />

                    </div>
                </div>
                <Textarea className = {styles.messagezone} style={{color: theme.primaryText}} value={message} onChange={e => setMessage(e.target.value)}/>
                <div className = {styles.messageComment}>
                    <div className = {styles.subcomment} style={{color: theme.commentText}}>* The reference has a maximum of 60 characters. This will be public on the blockchain and used as a reference in the webapp.</div>
                    <div className = {styles.subcomment} style={{color: theme.commentText}}>** You will recieve a copy of this message, this wont be public.</div>
                </div>
            </div>
            <div className = {styles.feearea}>
                <div className = {styles.certification}>
                    <div className = {styles.feeTitle} style={{color: theme.feeText}}>Certification fee:</div>
                    <div className = {styles.fee} style={{color: theme.feeText}}>{certFee} RKMT</div>
                </div>
                <div className = {styles.transaction}>
                    <div className = {styles.feeTitle} style={{color: theme.feeText}}>Transaction fee:</div>
                    <div className = {styles.fee} style={{color: theme.feeText}}>{transactionFee} Waves</div>
                </div>
            </div>
            <div className = {styles.confirmarea}>
              <a className={cx(styles.button, styles.filled)} style={{backgroundColor: theme.buttonBack}} onClick={certifyEmail}>Certify email</a>
              <div className = {styles.subcomment} style={{color: theme.commentText}}>
                This transaction is secure and will open waves Signer
              </div>
            </div>
          </div>
          {/* {
            certifications[0] != null ?
            <EmailCertification detail={certifications[0]} owner={walletState.address}/>
            :
            null
          } */}
          <div className={styles.emailCerts}>
            <EmailCertification owner={walletState.address} />
          </div> 
        </div>
    )
}

export default walletContainer(Email)