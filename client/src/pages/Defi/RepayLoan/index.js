import React, { useState, useContext, useEffect } from 'react'
import styles from './RepayLoan.module.scss'
import { ThemeContext } from 'context/ThemeContext'
import cx from 'classnames'
import {
  Input
} from '@chakra-ui/react'
import AlertUtils from 'utils/alert'
import WavesUtils from 'utils/waves'
import ApiUtils from 'utils/api'
import WavesConfig from 'config/waves'
import walletContainer from 'redux/containers/wallet'

function RepayLoan({walletState}) {
  const { theme } = useContext(ThemeContext)
  const [assetId, setAssetId] = useState('34N9YcEETLWn93qYQ64EsP1x89tSruJU44RrEMSXXEPJ')
  const [amount, setAmount] = useState(0)
  const [currentAmount, setCurrentAmount] = useState(0);

  useEffect(() => {
    if (walletState.address) {
      const proc =  async () => {
        let loanStatus = await ApiUtils.getLoanStatus(walletState.address)
        let curamount = loanStatus.data.result[0].loan_amount/(10 ** WavesConfig.USDT_DECIMALS)
        setCurrentAmount(curamount)
      }
      proc()
      setInterval(proc, 30000)
    }
  }, [walletState.address])

  const repayLoan = async () => {
    if (assetId === '' || assetId !== '34N9YcEETLWn93qYQ64EsP1x89tSruJU44RrEMSXXEPJ') {
      AlertUtils.SystemAlert('AssetId is not valid')
      return
    }
    console.log(amount)
    console.log(currentAmount)
    if (parseFloat(currentAmount) !== parseFloat(amount)) {
      AlertUtils.SystemAlert('Current Amount value is ' + currentAmount + '!')
      return
    }
    await WavesUtils.RepayLoan(assetId, parseFloat(amount))
  }

  return (
    <div className={styles.repay}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.depositTitle} style={{ color: theme.primaryText }}>Repay Loan</div>
          <div className={styles.totalStaked} style={{ color: theme.buttonBack }}> TotalBorrowed: <div style={{ color: theme.primaryText, marginLeft: '10px' }}>{currentAmount} USDT</div> </div>
        </div>
        <hr className={styles.border} />
        <div className={styles.repayLoan}>
          <div className={styles.asset}>
            <div className={styles.inputTitle} style={{ color: theme.commentText }}>
              Asset ID  (USDT)
            </div>
            <Input className={styles.inputValue} style={{ color: theme.primaryText }} value={assetId} onChange={(e) => setAssetId(e.target.value)} variant="flushed" placeholder="" />
          </div>
          <div className={styles.amount} >
            <div className={styles.inputTitle} style={{ color: theme.commentText }}>
              Amount
            </div>
            <Input className={styles.inputValue} style={{ color: theme.primaryText }} value={amount} onChange={(e) => setAmount(e.target.value)} variant="flushed" placeholder="" />
          </div>
        </div>
        <div className={styles.comment} style={{ color: theme.primaryText }}>Return exact USDT amount to close loan</div>
        <div className={styles.buttonArea}>
          <a className={cx(styles.button, styles.filled, styles.continueButton)} style={{ backgroundColor: theme.buttonBack }} onClick={() => repayLoan()}>Continue</a>
        </div>
      </div>
    </div>
  )
}

export default walletContainer(RepayLoan)