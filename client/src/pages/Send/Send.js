import React, {useContext, useEffect, useState} from 'react';
import { Button } from '@chakra-ui/react';
import cx from 'classnames';
import WAValidator from 'multicoin-address-validator'
import {FaLock, FaUser, RiArrowDownCircleLine} from "react-icons/all";

import Transaction from 'component/Transaction/Transaction';
import WavesConfig from 'config/waves';
import ThemeContext from "context/UserContext";
import walletContainer from 'redux/containers/wallet';
import ApiUtils from 'utils/api';
import WavesUtils from 'utils/waves';
import styles from './Send.module.scss';

function Send({walletState}) {
    const {theme} = useContext(ThemeContext);
    const [isTransferFormOpen, openTransferForm] = useState(false);
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

    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState();
    const [comment, setComment] = useState('');

    const confirmTransfer = () => {
        if(!WAValidator.validate(recipient, 'waves', WavesConfig.WAVES_PLATFORM)) {
          alert('Recipient address is not valid');
          return;
        }
        if(isNaN(amount) || amount <= 0 || amount > walletState.rkmt_balance) {
            alert('Amount is not valid');
            return;
        }
        WavesUtils.send(recipient, amount, comment);
    }

    return (
        <div className={styles.wrapper}>
            <div style={{display: isTransferFormOpen ? 'block' : 'none'}}>
                <div className={cx(styles.header, styles.clickable)} style={{backgroundColor: theme.primaryColor}} onClick={() => openTransferForm(false)}>
                    <span>TRANSFER RKMT</span>
                    <RiArrowDownCircleLine className={styles.openIcon} />
                </div>
                <div className={styles.container}>
                    <div className={styles.info}>
                        <div className={styles.addressArea}>
                            <div className={styles.user} style={{backgroundColor: theme.buttonBack, color: '#ffffff'}}>
                                <FaUser className={styles.icon} />
                            </div>
                            <input
                                className={styles.address}
                                style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}}
                                placeholder="Recipient address / alias"
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                            />
                        </div>
                        <input
                            className={styles.amount}
                            style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}}
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div className={styles.commentArea}>
                        <div style={{fontSize: 16}}>
                            <span style={{color: theme.highlightText}}>Comments/Notes</span>
                            <span style={{color: theme.overviewTransactionId}}>&nbsp;(0 / 100 Chars.)</span>
                        </div>
                        <textarea
                            className={styles.comment}
                            style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        >
                        </textarea>
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
                        <Button className={cx(styles.transfer, styles.clickable)} style={{backgroundColor: theme.buttonBack}} onClick={confirmTransfer}>
                            CONFIRM TRANSFER
                        </Button>
                    </div>
                </div>
            </div>
            <div className={styles.header} style={{backgroundColor: theme.primaryColor}}>
                TRANSFER HISTORY
            </div>
            <div className={styles.subheader} style={{color: theme.primaryText}}>
                <span>Here is your latest outgoing transaction</span>
                <Button
                    className={cx(styles.transferForm, styles.clickable)}
                    onClick={() => openTransferForm(!isTransferFormOpen)}
                    style={{backgroundColor: theme.buttonBack}}
                >
                    {
                        isTransferFormOpen ? 'CLOSE THE FORM' : 'TRANSFER NOW'
                    }
                </Button>
            </div>
            <div className={styles.transactions}>
                {transactions.map((transfer, index) => (
                    <Transaction key={index} detail={transfer} owner={walletState.address} />
                ))}
            </div>
        </div>
    )
}

export default walletContainer(Send);