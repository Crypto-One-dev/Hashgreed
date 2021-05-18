import React, {useCallback,useState, useEffect} from 'react'

import {FaCopy, FaShareAlt} from 'react-icons/all'
import QRCode from 'qrcode.react'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {useHistory} from 'react-router-dom'

import styles from './Receive.module.scss'
import walletContainer from 'redux/containers/wallet'
import Transaction from 'components/Transaction/Transaction'
import ApiUtils from 'utils/api';

function Receive({walletState, walletActions}){
    const history = useHistory()
    const urlAddress = 'https://wavesexplorer.com/address/' + walletState.address
    const [transactions, setTransactions] = useState([]);
    const [transaction, setTransaction] = useState();

    useEffect(() => {
        let interval = -1
        if(walletState.address) {
          const proc = () => {
            ApiUtils.getReceiveTransactions(walletState.address, setTransactions);
            transactions.map((transfer) => {setTransaction(transfer)})
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

    const toExplorer = () => {window.open('https://wavesexplorer.com')}
    return(
        <div className={styles.receive}>
            <div className = {styles.container}>
                <div className = {styles.title}>
                    Deposit RKMT
                </div>
                <hr className={styles.border}/>
                <div className={styles.body}>
                    <QRCode className={styles.qrcode} value={walletState.address} size={180} />
                    <div className={styles.subbody}>
                        <div className = {styles.subheader}>
                            Deposit Address
                        </div>
                        <div className = {styles.codevalue}>{walletState.address}</div>
                        <div className = {styles.copy}>
                            <CopyToClipboard text = {walletState.address}>
                                <div className = {styles.copyaddress1}><FaCopy className = {styles.facopy} size='16px' />Copy Address</div>
                            </CopyToClipboard >
                            <CopyToClipboard text = {urlAddress}>
                                <div className = {styles.copyaddress2}><FaShareAlt className = {styles.fasharealt} size='16px' />Copy Address</div>
                            </CopyToClipboard>
                        </div>
                        <div className={styles.subcontent}>
                            Do not send any other cryptocurrencies or assets than RKMT to this wallet address. All other coins will be lost. <br/>Your account will automatically update after the cryptocurrency network confirms your transaction. The confirmation takes only few minutes. You can track all the transactions directly on the <a className={styles.explorer} onClick ={toExplorer}>Explorer</a>.
                        </div>
                    </div>
                </div>
            </div>
            {/* {transactions.map((transfer) => (
                <Transaction detail={transfer} owner={walletState.address} />
            ))}  */}
            {
                transactions[0] != null ?
                <Transaction detail={transactions[0]} owner={walletState.address}/>
                :
                null
            }
            {/* <Transaction detail={transactions[0]} owner={walletState.address}/> */}
        </div>
    )
}

export default walletContainer(Receive)