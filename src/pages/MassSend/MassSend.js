import React, {useContext, useEffect, useState} from 'react';
import { Button } from '@chakra-ui/react';
import cx from 'classnames';
import _ from "lodash"
import {FaMinusCircle, FaLock, FaPlusCircle, FaUser, RiArrowDownCircleLine} from "react-icons/all";

import Transaction from 'component/Transaction/Transaction';
import ThemeContext from "context/UserContext";
import walletContainer from 'redux/containers/wallet';
import ApiUtils from 'utils/api';
import styles from './MassSend.module.scss';

function MassSend({walletState}) {
    const {theme} = useContext(ThemeContext);
    const [isTransferFormOpen, openTransferForm] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const emptyRecipient = {address: '', amount: 0};
    const [recipients, setRecipients] = useState([_.cloneDeep(emptyRecipient)]);

    useEffect(() => {
      let interval = -1
      if(walletState.address) {
        const proc = () => {
          ApiUtils.getMassTransactions(walletState.address, setTransactions);
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

    const addNewRecipient = () => {
        setRecipients([...recipients, _.cloneDeep(emptyRecipient)]);
    }
    const removeRecipient = (index) => {
        const newRecipients = _.cloneDeep(recipients);
        newRecipients.splice(index, 1);
        setRecipients(newRecipients);
    }

    return (
        <div className={styles.wrapper}>
            <div style={{display: isTransferFormOpen ? 'block' : 'none'}}>
                <div className={cx(styles.header, styles.clickable)} style={{backgroundColor: theme.primaryColor}} onClick={() => openTransferForm(false)}>
                    <span>MASS TRANSFER RKMT</span>
                    <RiArrowDownCircleLine className={styles.openIcon} />
                </div>
                <div className={styles.container}>
                    {recipients.map((recipient, index) => (
                        <div className={styles.info} key={index}>
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
                            <div className={styles.amountArea}>
                                <input
                                    className={styles.amount}
                                    style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}}
                                    placeholder="Amount"
                                />
                                {
                                    index === recipients.length - 1 ?
                                        <FaPlusCircle className={styles.cursor} onClick={addNewRecipient} style={{color: theme.buttonBack}} />
                                    :
                                        <FaMinusCircle className={styles.cursor} onClick={() => removeRecipient(index)} style={{color: theme.buttonBack}} />
                                }
                            </div>
                        </div>
                    ))}
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
                                <option value="waves">0.002 waves</option>
                            </select>
                        </div>
                        <Button className={cx(styles.transfer, styles.clickable)} style={{backgroundColor: theme.buttonBack}}>
                            CONFIRM MASS TRANSFER
                        </Button>
                    </div>
                </div>
            </div>
            <div className={styles.header} style={{backgroundColor: theme.primaryColor}}>
                MASS TRANSFER HISTORY
            </div>
            <div className={styles.subheader} style={{color: theme.primaryText}}>
                <span>Here is your last mass transaction</span>
                <Button
                    className={cx(styles.transferForm, styles.clickable)}
                    onClick={() => openTransferForm(!isTransferFormOpen)}
                    style={{backgroundColor: theme.buttonBack}}
                >
                    {
                        isTransferFormOpen ? 'CLOSE THE FORM' : 'MASS TRANSFER NOW'
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

export default walletContainer(MassSend);