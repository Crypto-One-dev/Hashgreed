import React, {useState, useEffect, useContext} from 'react'

import {FaCopy, FaShareAlt} from 'react-icons/all'
import QRCode from 'qrcode.react'
import {CopyToClipboard} from 'react-copy-to-clipboard'

import styles from './Receive.module.scss'
import walletContainer from 'redux/containers/wallet'
import Transaction from 'components/Transaction/Transaction'
import ApiUtils from 'utils/api';
import {ThemeContext} from 'context/ThemeContext'

function Receive({walletState, walletActions}){
    const urlAddress = 'https://wavesexplorer.com/address/' + walletState.address
    const [transactions, setTransactions] = useState([])
    const {theme} = useContext(ThemeContext)

    useEffect(() => {
        if(walletState.address) {
          const proc = () => {
            ApiUtils.getReceiveTransactions(walletState.address, setTransactions);
          }
          proc()
        }
      }, [walletState.address, transactions])

    const toExplorer = () => {window.open('https://wavesexplorer.com')}
    return(
        <div className={styles.receive}>
            <div className = {styles.container}>
                <div className = {styles.title} style ={{color: theme.primaryText}}>
                    Deposit RKMT
                </div>
                <hr className={styles.border}/>
                <div className={styles.body}>
                    <QRCode className={styles.qrcode} value={walletState.address} size={180} />
                    <div className={styles.subbody}>
                        <div className = {styles.subheader} style ={{color: theme.commentText}}>
                            Deposit Address
                        </div>
                        <div className = {styles.codevalue} style ={{color: theme.primaryText}}>{walletState.address}</div>
                        <div className = {styles.copy}>
                            <CopyToClipboard text = {walletState.address} style ={{color: theme.primaryText}}>
                                <div className = {styles.copyaddress1}><FaCopy className = {styles.facopy} size='16px' />Copy Address</div>
                            </CopyToClipboard >
                            <CopyToClipboard text = {urlAddress} style ={{color: theme.primaryText}}>
                                <div className = {styles.copyaddress2}><FaShareAlt className = {styles.fasharealt} size='16px' />Copy Address</div>
                            </CopyToClipboard>
                        </div>
                        <div className = {styles.mobileCopy}>
                            <CopyToClipboard text = {walletState.address} style ={{opacity: '0.8'}}>
                                <QRCode className={styles.qrcodemobile} value={walletState.address} size={24} />
                            </CopyToClipboard >
                            <CopyToClipboard text = {walletState.address} style ={{color: theme.primaryText}}>
                                <FaCopy className = {styles.facopy} size='24px' />
                            </CopyToClipboard >
                            <CopyToClipboard text = {urlAddress} style ={{color: theme.primaryText}}>
                                <FaShareAlt className = {styles.fasharealt} size='24px' />
                            </CopyToClipboard>
                        </div>
                        <div className={styles.subcontent}style ={{color: theme.commentText}}>
                            Do not send any other cryptocurrencies or assets than RKMT to this wallet address. All other coins will be lost. <br/>Your account will automatically update after the cryptocurrency network confirms your transaction. The confirmation takes only few minutes. You can track all the transactions directly on the <a className={styles.explorer} onClick ={toExplorer} style ={{color: theme.primaryText}}>Explorer</a>.
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.transactionList}>
                <Transaction transactions={transactions} title="Latest Transaction" owner={walletState.address} />
            </div>
        </div>
    )
}

export default walletContainer(Receive)