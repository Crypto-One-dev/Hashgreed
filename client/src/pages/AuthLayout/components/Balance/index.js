import React from 'react'

import styles from './Balance.module.scss'

function Balance({title, icon, value, price}) {
  return (
    <div className={styles.balance}>
      <div className={styles.header}>
        {title}
      </div>
      <div className={styles.amount}>
        <img src={icon} alt="" />
        <div className={styles.value}>{isNaN(value) ? value : parseFloat(value).toFixed(4)}</div>
      </div>
      {
        price !== undefined ?
          <div className={styles.price}>
            Current Price: <span className={styles.value}>USD {price.toFixed(4)}</span>
          </div>
        :
          null
      }
    </div>
  )
}

export default Balance