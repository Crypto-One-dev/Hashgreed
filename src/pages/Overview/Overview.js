import React, {useContext, useEffect, useState} from 'react';
import Price from 'component/Price/Price';
import Transaction from 'component/Transaction/Transaction';
import ThemeContext from 'context/UserContext';
import priceContainer from 'redux/containers/price';
import walletContainer from 'redux/containers/wallet';
import ApiUtils from 'utils/api';
import styles from './Overview.module.scss';

function Overview({walletState, priceState, priceActions}) {
  const {theme} = useContext(ThemeContext);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    let interval = -1
    if(walletState.address) {
      interval = setInterval(() => {
        ApiUtils.getPrice('signaturechain', 'TOKEN', priceActions.setPrice);
        ApiUtils.getPrice('waves', 'WAVES', priceActions.setPrice);
        ApiUtils.getTransactions(walletState.address, setTransactions);
      }, 1000)
    }
  
    return () => {
      if(interval > -1) {
        clearInterval(interval)
      }
    }
  }, [walletState.address, priceActions])

  return (
    <div className={styles.main}>
      <div className={styles.prices}>
        <Price Coin="HASH" Description="Current Price" Price={priceState.token_price + '$'} Decimals={8} />
        <Price Coin="WAVES" Description="Current Price" Price={priceState.waves_price + '$'} Decimals={2} />
        <Price Coin="USD" Description="Total HASH Balance" Price={priceState.token_price * walletState.token_balance} Decimals={4} />
      </div>
      <div className={styles.header} style={{backgroundColor: theme.primaryColor}}>TRANSACTIONS HISTORY</div>
      <div className={styles.subheader} style={{color: theme.primaryText}}>Here is your last transaction</div>
      
      <div className={styles.transactions}>
        {transactions.map((transfer, index) => (
          <Transaction key={index} detail={transfer} owner={walletState.address} />
        ))}
      </div>
    </div>
  )
}

export default priceContainer(walletContainer(Overview));