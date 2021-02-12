import React, {useContext, useEffect, useState} from 'react';
import { Button } from '@chakra-ui/react';
import cx from 'classnames';
import {FaLock, FaUser, RiArrowDownCircleLine} from "react-icons/all";

import Transaction from 'component/Transaction/Transaction';
import ThemeContext from "context/UserContext";
import walletContainer from 'redux/containers/wallet';
import ApiUtils from 'utils/api';
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
        interval = setInterval(proc, 10000)
      }
    
      return () => {
        if(interval > -1) {
          clearInterval(interval)
        }
      }
    }, [walletState.address])

    return (
        <div className={styles.wrapper}>
            <div style={{display: isTransferFormOpen ? 'block' : 'none'}}>
                <div className={cx(styles.header, styles.clickable)} style={{backgroundColor: theme.primaryColor}} onClick={() => openTransferForm(false)}>
                    <span>TRANSFER SIGN</span>
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
                            />
                        </div>
                        <input
                            className={styles.amount}
                            style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}}
                            placeholder="Amount"
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
                                <option value="token">10 SIGN</option>
                                <option value="waves">0.001 waves</option>
                            </select>
                        </div>
                        <Button className={cx(styles.transfer, styles.clickable)} style={{backgroundColor: theme.buttonBack}}>
                            CONFIRM TRANSFER
                        </Button>
                    </div>
                </div>
            </div>
            <div className={styles.header} style={{backgroundColor: theme.primaryColor}}>
                TRANSFER HISTORY
            </div>
            <div className={styles.subheader} style={{color: theme.primaryText}}>
                <span>Here is your last incoming transaction</span>
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