import React, {useContext, useCallback} from 'react'
import {useHistory} from 'react-router-dom'
import styles from './Defi.module.scss'
import {ThemeContext} from 'context/ThemeContext'
import cx from 'classnames'

function Defi() {
  const {theme} = useContext(ThemeContext)
  const history = useHistory()
  const gotoStake = useCallback(() => history.push('/defi/stake'), [history])

  return (
    <div className={styles.main}>
      <div className={styles.title} style={{color: theme.primaryText}}>
        Watch your money work for you
      </div>
      <div className={styles.comment}>
        Earn staking rewards and watch your money work for you
      </div>
      <a className={cx(styles.button, styles.filled, styles.stakeButton)} onClick={gotoStake} style={{backgroundColor: theme.buttonBack}}>Stake now</a>
    </div>
  )
}
export default Defi
