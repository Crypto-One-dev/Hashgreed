import React, {useContext} from 'react'
import {ThemeContext} from 'context/ThemeContext'

import styles from './Balance.module.scss'

function Balance({title, icon, value, price}) {
  const {theme} = useContext(ThemeContext)

  return (
    <div className={styles.balance} style={{color: theme.primaryText}}>
      <div className={styles.header} style={{color: theme.primaryText}}>
        {title}
      </div>
      <div className={styles.amount} >
        <img src={icon} alt="" />
        <div className={styles.value} style={{color: theme.primaryText}}>{isNaN(value) ? value : parseFloat(value).toFixed(4)}</div>
      </div>
      {
        price !== undefined ?
          <div className={styles.price} style={{color: theme.primaryText}}>
            Current Price: <span className={styles.value}>USD {price.toFixed(4)}</span>
          </div>
        :
          null
      }
    </div>
  )
}

export default Balance