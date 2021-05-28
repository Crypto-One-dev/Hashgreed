import React, {useContext, useState} from 'react';

import {ThemeContext} from 'context/ThemeContext'
import styles from './Price.module.scss'

const Price = ({Coin,Imgurl, Description, Price, Decimals}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <div className={styles.main} key={Coin} style={{backgroundColor: theme.overviewPriceBack}}>
      <div className={styles.iconArea}>
        <img src={Imgurl} className={styles.img} />
      </div>
      <div className={styles.priceArea}>
        <span className={styles.coin} style={{color: theme.primaryText}}>{Coin}</span>
        <span className={styles.description} style={{color: theme.primaryText}}>{Description}</span>
        <span className={styles.coin} style={{color: theme.primaryText}}>{parseFloat(Price).toFixed(Decimals)}$</span>
      </div>
    </div>
  );
};

export default Price