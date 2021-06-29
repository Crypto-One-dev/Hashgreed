import React, { useContext, useState, useCallback, useEffect } from 'react'
import styles from './loan.module.scss'
import { ThemeContext } from 'context/ThemeContext'
import cx from 'classnames'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider, SliderTrack, SliderFilledTrack, SliderThumb
} from '@chakra-ui/react'
import walletContainer from 'redux/containers/wallet'
import WavesUtils from 'utils/waves'
import AlertUtils from 'utils/alert'
import ApiUtils from 'utils/api'
import WavesConfig from 'config/waves'
import { useHistory } from 'react-router-dom'

function Loan({ walletState }) {

  const { theme } = useContext(ThemeContext)
  const [period, setPeriod] = useState(30)
  const [collateralAmount, setCollateralAmount] = useState(0)
  const [collateralAssetBalance, setCollateralAssetBalance] = useState(0)
  const [totalInterest, setTotalInterest] = useState()
  const [curLoanAmount, setCurLoanAmont] = useState()

  const history = useHistory()

  useEffect(() => {
    if (walletState.address) {
      const proc =  async () => {
        let balance = await ApiUtils.getBalance(walletState.address)
        let loanStatus = await ApiUtils.getLoanStatus(walletState.address)
        setTotalInterest(loanStatus.data.result[0].loan_interest)
        setCurLoanAmont(loanStatus.data.result[0].loan_amount/(10 ** WavesConfig.USDT_DECIMALS))
        setCollateralAssetBalance(balance)
      }
      proc()
    }
  }, [walletState.address])

  const requestLoan = async () => {
    if (isNaN(period) || period <= 0) {
      AlertUtils.SystemAlert('Period is not valid')
      return
    }
    if (isNaN(collateralAmount) || collateralAmount <= 0) {
      AlertUtils.SystemAlert('NFT Asset Amount is not valid')
      return
    }
    const tx = await WavesUtils.CreateLoan(parseInt(period), collateralAmount)
    AlertUtils.SystemAlert('Request successed')
  }

  const gotoRepay = useCallback(() => history.push('/defi/repayloan'), [history])

  return (
    <div className={styles.loan}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.depositTitle} style={{ color: theme.primaryText }}>Loan</div>
          <div className={styles.totalStaked} style={{ color: theme.buttonBack }}> TotalBorrowed: <div style={{ color: theme.primaryText, marginLeft: '10px' }}>{curLoanAmount} USDT</div> </div>
        </div>
        <hr className={styles.border} />
        <div className={styles.description} style={{ color: theme.primaryText }}>
          <div style={{ marginBottom: '25px', fontWeight: '700' }}>Description</div>
          <br />

          This DApp allow users to Take loan against WAVES as Collateral. Users will get loan Amount in USDT.<br />
          Loan Payback Time Period: 1-90 days.<br />
          Collateral Interest Charge: 0.9792 WAVES per day for 1000 WAVES.<br />

          <div style={{ fontWeight: '700', marginTop: '25px', marginBottom: '25px' }}>1. Users can get only single loans per address as per DApp availability of USDT.<br />
            2. If more than 1 Loan are issued to the same address, last loan amount will be considered as “liquidate”<br />
            3. To use the same address incase you have an open loan retrun your previous loan amount and get a fresh loan.<br /></div>

          Loan offered will be up to 60% of the value of your WAVES collateral. Liquidation is only based on expiry of loan period not price of WAVES asset
        </div>
        <div className={styles.period}>
          <div className={styles.title} style={{ color: theme.primaryText }}>
            Enter Loan Period (1-90)
          </div>
          <div className={styles.slider}>
            <NumberInput className={styles.numInput} max={90} min={1} mr="1rem" ml="1rem" value={period} onChange={(value) => setPeriod(value)} step={1} >
              <div className={styles.numberarea}>
                <div className={styles.title}>Day</div>
                <NumberInputField className={styles.numberField} borderWidth="0" color='ActiveBorder: #f1eef0' borderInlineEndColor='#f1eef0' focusBorderColor="#f1eef0" />
              </div>
              <NumberInputStepper>
                <NumberIncrementStepper color=' rgba(0, 4, 81, 0.5)' fontSize='18px' />
                <NumberDecrementStepper color=' rgba(0, 4, 81, 0.5)' fontSize='18px' />
              </NumberInputStepper>
            </NumberInput>

            <Slider flex="6" focusThumbOnChange={false} value={period} onChange={(value) => setPeriod(value)} max={90} min={1} step={1} mr='50' >
              <SliderTrack bg="#C4C4C4" p={1.5} borderRadius="full" >
                <SliderFilledTrack bg='linear-gradient(268.98deg, #FE006C -0.67%, #000451 116.78%)' p={1.5} borderRadius="full" />
              </SliderTrack>
              <SliderThumb fontSize='50px' boxSize='32px' boxShadow='' />
            </Slider>
          </div>
        </div>
        <div className={styles.period}>
          <div className={styles.title} style={{ color: theme.primaryText }}>
            Enter Amount of Waves as collateral
          </div>
          <div className={styles.slider}>
            <NumberInput className={styles.numInput} max={collateralAssetBalance} min={0} mr="1rem" ml="1rem" value={collateralAmount} onChange={(value) => setCollateralAmount(value)} step={0.0001} >
              <div className={styles.numberarea}>
                <div className={styles.title}>Waves</div>
                <NumberInputField className={styles.numberField} borderWidth="0" color='ActiveBorder: #f1eef0' borderInlineEndColor='#f1eef0' focusBorderColor="#f1eef0" />
              </div>
              <NumberInputStepper>
                <NumberIncrementStepper color=' rgba(0, 4, 81, 0.5)' fontSize='18px' />
                <NumberDecrementStepper color=' rgba(0, 4, 81, 0.5)' fontSize='18px' />
              </NumberInputStepper>
            </NumberInput>

            <Slider flex="6" focusThumbOnChange={false} value={collateralAmount} onChange={(value) => setCollateralAmount(value)} max={collateralAssetBalance} step={0.0001} mr='50' >
              <SliderTrack bg="#C4C4C4" p={1.5} borderRadius="full" >
                <SliderFilledTrack bg='linear-gradient(268.98deg, #FE006C -0.67%, #000451 116.78%)' p={1.5} borderRadius="full" />
              </SliderTrack>
              <SliderThumb fontSize='50px' boxSize='32px' boxShadow='' />
            </Slider>
          </div>
        </div>
        <div className={styles.interest} style={{ color: styles.commentText }}>
          Total interest (WAVES):  {parseFloat(totalInterest).toFixed(5)}
        </div>
        <div className={styles.buttonArea}>
          <a className={cx(styles.button, collateralAmount === 0 ? styles.disabled : styles.filled, styles.loanButton)} style={{ backgroundColor: collateralAmount === 0 ? theme.disabledButtonBack : theme.buttonBack }}  onClick={collateralAmount === 0 ? null : () => requestLoan()} >Request Loan</a>
          <a className={cx(styles.button, curLoanAmount === 0 ? styles.disabled: styles.filled, styles.loanButton)} style={{ backgroundColor: curLoanAmount === 0 ? theme.disabledButtonBack : theme.buttonBack }} onClick={() => curLoanAmount !== 0?gotoRepay() : null}>Repay Loan</a>
        </div>
      </div>
    </div>
  )
}

export default walletContainer(Loan)