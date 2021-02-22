import React, {useContext} from 'react';

import ThemeContext from 'context/UserContext';
import styles from './Price.module.scss';


const Price = ({Coin, Description, Price, Decimals}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <div className={styles.main} style={{backgroundColor: theme.overviewPriceBack, borderColor: theme.overviewPriceBorder}}>
      <span className={styles.coin} style={{color: theme.overviewPrimaryText}}>{Coin}</span>
      <span className={styles.description} style={{color: theme.overviewSecondaryText}}>{Description}</span>
      <span className={styles.price} style={{color: theme.overviewPrimaryText}}>{parseFloat(Price).toFixed(Decimals)}$</span>
    </div>
  );
};

export default Price