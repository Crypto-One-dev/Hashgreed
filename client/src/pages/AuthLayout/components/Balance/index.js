import React, {useContext} from 'react'
import {ThemeContext} from 'context/ThemeContext'
import copy from 'assets/images/copy.png'
import styles from './Balance.module.scss'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {FaCopy} from 'react-icons/all'
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

      <img src={icon} alt="" className={styles.imgMob}/>
      <div className={styles.contentMob}>
        <div className={styles.valueMob}>
          <div className={{}} style={{color: theme.primaryText}}>
            {title}
          </div>
          {
            isNaN(value)?
            <CopyToClipboard text = {value} style ={{color: theme.buttonBack}}>
              <FaCopy size='12px' />
            </CopyToClipboard>
            // <img src={copy} alt="" className={styles.imgMobIco}/>
            :
            <div className={{}} style={{color: theme.primaryText}}>{parseFloat(value).toFixed(4)}</div>
          }
          
        </div>
        {
          price !== undefined ?
            <div className={styles.priceMob} style={{color: theme.primaryText}}>
              Current Price: <span className={styles.priceMobB}>USD {price.toFixed(4)}</span>
            </div>
          :
          isNaN(value)?  
            <div className={styles.valueMob} style={{color: theme.primaryText}}> {value.slice(0,26)+"..."} </div>
          :null
        }
        
      </div>
    </div>
  )
}

export default Balance