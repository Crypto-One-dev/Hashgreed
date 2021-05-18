import React, {useEffect, useState} from 'react'

import cx from 'classnames'
import WAValidator from 'multicoin-address-validator'
import {
    Input
} from '@chakra-ui/react'

import WavesConfig from 'config/waves'
import walletContainer from 'redux/containers/wallet'
import WavesUtils from 'utils/waves'
import styles from './Send.module.scss'
import AlertUtils from 'utils/alert'
import ApiUtils from 'utils/api'
import Transaction from 'components/Transaction/Transaction'

function Send({walletState}){

    const [recipient, setRecipient] = useState('')
    const [amount, setAmount] = useState()
    const [comment, setComment] = useState('')
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
      let interval = -1
      if(walletState.address) {
        const proc = () => {
          ApiUtils.getSendTransactions(walletState.address, setTransactions);
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

    const confirmTransfer = () => {
        if(!WAValidator.validate(recipient, 'waves', WavesConfig.WAVES_PLATFORM)) {
            AlertUtils.SystemAlert('Recipient address is not valid')
            return
        }
        if(isNaN(amount) || amount <= 0 || amount > walletState.rkmt_balance) {
            AlertUtils.SystemAlert('Amount is not valid')
            return
        }
        WavesUtils.send(recipient, amount, comment)
    }
    return(
        <div className = {styles.send}>
            <div className = {styles.container}>
                <div className={styles.transfertitle}>Transfer RKMT</div>
                <hr className = {styles.border}/>
                <div className = {styles.recepient}>
                    <div className = {styles.address}>
                        <div className = {styles.inputTitle} >
                            Recepient Address/Alias
                        </div>
                        <Input className = {styles.inputValue} value = {recipient} onChange={(e) => setRecipient(e.target.value)} variant="flushed" placeholder="" />
                    </div>
                    <div className = {styles.amount}>
                        <div className = {styles.inputTitle}>
                            Amount
                        </div>
                        <Input className = {styles.inputValue} value={amount} onChange={(e) => setAmount(e.target.value)} variant="flushed" placeholder="" />
                    </div>
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
                        <a className={cx(styles.button, styles.filled)} onClick={confirmTransfer}>Confirm transfer</a>
                    </div>
                </div>
            </div>
            {
                transactions[0] != null ?
                <Transaction detail={transactions[0]} owner={walletState.address}/>
                :
                null
            }
        </div>
    )
}

export default walletContainer(Send)