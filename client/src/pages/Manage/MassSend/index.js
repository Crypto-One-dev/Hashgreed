import React, {useState, useEffect} from 'react'

import {Input} from '@chakra-ui/react'
import {FaMinusCircle, FaPlusCircle} from 'react-icons/all'
import walletContainer from 'redux/containers/wallet'
import _ from 'lodash'
import WAValidator from 'multicoin-address-validator'
import WavesConfig from 'config/waves'
import WavesUtils from 'utils/waves'
import AlertUtils from 'utils/alert'

import cx from 'classnames'
import ApiUtils from 'utils/api'
import styles from './MassSend.module.scss'

function MassSend({walletState, walletActions}){

    const [transactions, setTransactions] = useState([])
    const emptyRecipient = {address: '', amount: ''}
    const [recipients, setRecipients] = useState([_.cloneDeep(emptyRecipient)])
    const [comment, setComment] = useState('')

    useEffect(() => {
      let interval = -1
      if(walletState.address) {
        const proc = () => {
          ApiUtils.getMassTransactions(walletState.address, setTransactions)
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

    const addNewRecipient = () => {
        setRecipients([...recipients, _.cloneDeep(emptyRecipient)])
    }
    const removeRecipient = (index) => {
        const newRecipients = _.cloneDeep(recipients)
        newRecipients.splice(index, 1)
        setRecipients(newRecipients)
    }
    const setRecipientAddress = (index, value) => {
        const newRecipients = _.cloneDeep(recipients)
        newRecipients[index].address = value
        setRecipients(newRecipients)
    }
    const setRecipientAmount = (index, value) => {
        const newRecipients = _.cloneDeep(recipients)
        newRecipients[index].amount = value
        setRecipients(newRecipients)
    }

    const confirmTransfer = () => {
        var total = 0
        for (var i = 0; i < recipients.length; ++i) {
            if(!WAValidator.validate(recipients[i].address, 'waves', WavesConfig.WAVES_PLATFORM)) {
                AlertUtils.SystemAlert('#' + (i + 1) + ' Recipient address is not valid')
              return
            }
            if(isNaN(recipients[i].amount) || recipients[i].amount <= 0) {
                AlertUtils.SystemAlert('#' + (i + 1) + ' Amount is not valid')
                return
            }
            total += Number(recipients[i].amount)
        }
        if(isNaN(total) || total <= 0 || total > walletState.rkmt_balance) {
            AlertUtils.SystemAlert('Amount is not valid')
            return
        }
        WavesUtils.masssend(recipients, comment)
    }
    return(
        <div className = {styles.masssend}>
            <div className = {styles.container}>
                <div className={styles.transfertitle}>Mass Transfer RKMT</div>
                <hr className = {styles.border}/>
                <div className = {styles.massTransfer}>
                    {recipients.map((recipient, index) => (
                        <div className={styles.recipient} key={index}>
                            <div className={styles.address}>
                                <div className={styles.inputTitle}>
                                    Recipient Address/Alias
                                </div>
                                <Input
                                    className={styles.inputValue}
                                    value={recipient.address}
                                    variant="flushed"
                                    onChange={(e) => setRecipientAddress(index, e.target.value)}
                                />
                            </div>
                            <div className={styles.amount}>
                                <div className={styles.inputTitle}>
                                Amount
                                </div>
                                <div className = {styles.valueGroup}>
                                    <Input
                                        className={styles.value}
                                        value={recipient.amount}
                                        variant="flushed"
                                        onChange={(e) => setRecipientAmount(index, e.target.value)}
                                    />
                                    {
                                        index === recipients.length - 1 ?
                                            <FaPlusCircle className={styles.cursor} size={30} onClick={addNewRecipient}/>
                                        :
                                            <FaMinusCircle className={styles.cursor} size={30} onClick={() => removeRecipient(index)}/>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.confirms}>
                    <div className = {styles.comment}>
                        <div className = {styles.inputTitle}>
                            Comment
                        </div>
                        <Input className = {styles.inputValue} value={comment} onChange={(e) => setComment(e.target.value)} variant="flushed" placeholder="" />
                        <div className = {styles.subcomment}>
                            This transaction is secure and will open waves Signer
                        </div>
                    </div>
                    <div className = {styles.confirm}>
                        <div className = {styles.fee}>
                            <div className = {styles.feetitle}>Transaction fee:</div>
                            <div className = {styles.feevalue}>{0.001}Waves</div>
                        </div>
                        <a className={cx(styles.button, styles.filled)} onClick={confirmTransfer}>Confirm mass transfer</a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default walletContainer(MassSend)