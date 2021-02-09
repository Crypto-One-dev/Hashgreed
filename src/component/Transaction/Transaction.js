import React, {useContext} from 'react';
import {FaLongArrowAltDown, FaLongArrowAltUp} from 'react-icons/all';

import WavesConfig from 'config/waves';
import ThemeContext from 'context/UserContext';
import styles from './Transaction.module.scss';

function Transaction({detail, owner}) {
  const {theme} = useContext(ThemeContext);

  const direction = detail.data.sender === owner ? 'to' : 'from';
  const target = detail.data.sender === owner ? detail.data.recipient : detail.data.sender;
  return (
    <div className={styles.transaction}>
      <div className={styles.main} style={{backgroundColor: theme.itemBackground}}>
        {
          direction === 'to' ?
            <FaLongArrowAltDown className={styles.arrow} />
          :
            <FaLongArrowAltUp className={styles.arrow} />
        }
        <div className={styles.info}>
          <span className={styles.timestamp}>{detail.data.timestamp}</span>
          <span className={styles.address}>
            <b>Transfer {direction}: </b>{target}
          </span>
          <span className={styles.txid}>
            TXId: <a href={`${WavesConfig.EXPLORER_URL}/tx/${detail.data.id}`} target="_blank" rel="noreferrer">{detail.data.id}</a>
          </span>
        </div>
      </div>
      <div className={styles.amount} style={{backgroundColor: theme.itemBackground}}>
        Amount: {detail.data.amount}
      </div>
    </div>
  )
}

export default Transaction;