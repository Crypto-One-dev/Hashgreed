import React, {useContext, useEffect, useState} from 'react';
import { Button } from '@chakra-ui/react';
import cx from 'classnames';
import _ from "lodash"
import WAValidator from 'multicoin-address-validator'
import {FaMinusCircle, FaLock, FaPlusCircle, FaUser, RiArrowDownCircleLine} from "react-icons/all";

import Transaction from 'component/Transaction/Transaction';
import WavesConfig from 'config/waves';
import ThemeContext from "context/UserContext";
import walletContainer from 'redux/containers/wallet';
import ApiUtils from 'utils/api';
import WavesUtils from 'utils/waves';
import styles from './MassSend.module.scss';

function MassSend({walletState}) {
    const {theme} = useContext(ThemeContext);
    const [isTransferFormOpen, openTransferForm] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const emptyRecipient = {address: '', amount: ''};
    const [recipients, setRecipients] = useState([_.cloneDeep(emptyRecipient)]);
    const [comment, setComment] = useState('');

    useEffect(() => {
      let interval = -1
      if(walletState.address) {
        const proc = () => {
          ApiUtils.getMassTransactions(walletState.address, setTransactions);
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
        setRecipients([...recipients, _.cloneDeep(emptyRecipient)]);
    }
    const removeRecipient = (index) => {
        const newRecipients = _.cloneDeep(recipients);
        newRecipients.splice(index, 1);
        setRecipients(newRecipients);
    }
    const setRecipientAddress = (index, value) => {
        const newRecipients = _.cloneDeep(recipients);
        newRecipients[index].address = value;  
        setRecipients(newRecipients);
    }
    const setRecipientAmount = (index, value) => {
        const newRecipients = _.cloneDeep(recipients);
        newRecipients[index].amount = value;  
        setRecipients(newRecipients);
    }

    const confirmTransfer = () => {
        var total = 0;
        for (var i = 0; i < recipients.length; ++i) {
            if(!WAValidator.validate(recipients[i].address, 'waves', WavesConfig.WAVES_PLATFORM)) {
              alert('#' + (i + 1) + ' Recipient address is not valid');
              return;
            }
            if(isNaN(recipients[i].amount) || recipients[i].amount <= 0) {
                alert('#' + (i + 1) + ' Amount is not valid');
                return;
            }
            total += recipients[i].amount;
        }
        if(isNaN(total) || total <= 0 || total > walletState.rkmt_balance) {
            alert('Amount is not valid');
            return;
        }
        WavesUtils.masssend(recipients, comment);
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
                                    value={recipient.address}
                                    onChange={(e) => setRecipientAddress(index, e.target.value)}
                                />
                            </div>
                            <div className={styles.amountArea}>
                                <input
                                    className={styles.amount}
                                    style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}}
                                    placeholder="Amount"
                                    value={recipient.amount}
                                    onChange={(e) => setRecipientAmount(index, e.target.value)}
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
                                <option value="waves">0.002 waves</option>
                            </select>
                        </div>
                        <Button className={cx(styles.transfer, styles.clickable)} style={{backgroundColor: theme.buttonBack}} onClick={confirmTransfer}>
                            CONFIRM MASS TRANSFER
                        </Button>
                    </div>
                </div>
            </div>
            <div className={styles.header} style={{backgroundColor: theme.primaryColor}}>
                MASS TRANSFER HISTORY
            </div>
            <div className={styles.subheader} style={{color: theme.primaryText}}>
                <span>Here is your latest mass transaction</span>
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