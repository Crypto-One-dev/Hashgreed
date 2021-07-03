import React, {useEffect, useState, useContext} from 'react'

import {Flex, Stat, StatLabel, StatNumber, StatHelpText} from '@chakra-ui/react'
import cx from 'classnames'
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Slider, SliderTrack, SliderFilledTrack, SliderThumb,
  } from '@chakra-ui/react'
import walletContainer from 'redux/containers/wallet'
import WavesUtils from 'utils/waves'
import ApiUtils from 'utils/api'
import styles from './Stake.module.scss'
import {ThemeContext} from 'context/ThemeContext'

function Stake({walletState}){

    const [staked, setStaked] = useState(0.0)
    const [sendAmount, setSendAmount] = useState(0)
    const [receiveAmount, setReceiveAmount] = useState(0)
    const {theme} = useContext(ThemeContext)
    
    useEffect(() => {
        if(walletState.address) {
          const proc = () => {
            WavesUtils.StakedRKMT(walletState.address, setStaked)
          }
          proc()
        }
      }, [walletState.address])

      const Deposit = () => {
        if(sendAmount > 0 && sendAmount <= walletState.rkmt_balance) {
          WavesUtils.DepositRKMT(parseInt(sendAmount))
          WavesUtils.StakedRKMT(walletState.address, setStaked)
        }
      }
    
      const Withdraw = () => {
        if(receiveAmount > 0 && receiveAmount <= staked) {
          WavesUtils.WithdrawRKMT(parseInt(receiveAmount))
          WavesUtils.StakedRKMT(walletState.address, setStaked)
        }
    }

    return (
        <div className = {styles.stake}>
            <div className = {styles.container}>
                <div className = {styles.header}>
                    <div className={styles.stakeTitle} style={{color: theme.primaryText}}>Stake <div className={styles.depositTitle}>Deposit</div></div>
                    <div className={styles.totalStaked} style={{color: theme.primaryText}}> TotalStaked: {staked} RKMT</div>
                </div>
                <hr className = {styles.border}/>                
                <Flex className={styles.stats} style={{color: theme.primaryText}}>
                    <Stat color = '#000451'>
                        <StatLabel style={{color: theme.primaryText}}>Daily</StatLabel>
                        <StatNumber style={{color: theme.primaryText}}>{(sendAmount * 0.04 / 100).toFixed(2)}</StatNumber>
                        <StatHelpText style={{color: theme.primaryText}}>0.04%</StatHelpText>
                    </Stat>
                    <Stat color = '#000451'>
                        <StatLabel style={{color: theme.primaryText}}>Weekly</StatLabel>
                        <StatNumber style={{color: theme.primaryText}}>{(sendAmount * 0.28 / 100).toFixed(2)}</StatNumber>
                        <StatHelpText style={{color: theme.primaryText}}>0.28%</StatHelpText>
                    </Stat>
                    <Stat color = '#000451'>
                        <StatLabel style={{color: theme.primaryText}}>Monthly</StatLabel>
                        <StatNumber style={{color: theme.primaryText}}>{(sendAmount * 1.2 / 100).toFixed(2)}</StatNumber>
                        <StatHelpText style={{color: theme.primaryText}}>1.2%</StatHelpText>
                    </Stat>
                    <Stat color = '#000451'>
                        <StatLabel style={{color: theme.primaryText}}>Yearly</StatLabel>
                        <StatNumber style={{color: theme.primaryText}}>{(sendAmount * 14.6 / 100).toFixed(2)}</StatNumber>
                        <StatHelpText style={{color: theme.primaryText}}>14.6%</StatHelpText>
                    </Stat>
                </Flex>

                <div className = {styles.sliderarea}>
                    <NumberInput allowMouseWheel className={styles.numInput} max={walletState.rkmt_balance} min={0} mr="1rem" ml="1rem"  value={sendAmount} onChange={(value) => setSendAmount(value)}  step={0.1} isDisabled = {walletState.rkmt_balance === 0}>
                        <div className = {styles.numberarea}>
                            <div className = {styles.title}>Amount</div>
                            <NumberInputField className = {styles.numberField} borderWidth="0" color = 'ActiveBorder: #f1eef0' borderInlineEndColor='#f1eef0' focusBorderColor="#f1eef0" />
                        </div>
                        <NumberInputStepper>
                            <NumberIncrementStepper color=' rgba(0, 4, 81, 0.5)' fontSize = '24px'/>
                            <NumberDecrementStepper color=' rgba(0, 4, 81, 0.5)' fontSize = '24px'/>
                        </NumberInputStepper>
                    </NumberInput>
                    <Slider flex="7"  focusThumbOnChange={false} value={sendAmount} onChange={(value) => setSendAmount(value)}  max={walletState.rkmt_balance} step={0.1} ml="1.2rem" mr ='1rem' isDisabled = {walletState.rkmt_balance === 0}>
                        <SliderTrack bg="#C4C4C4" p={1.5} borderRadius="full" >
                        <SliderFilledTrack bg='linear-gradient(268.98deg, #FE006C -0.67%, #000451 116.78%)'p={1.5} borderRadius="full"/>
                        </SliderTrack>
                        <SliderThumb className={styles.sliderThumb} fontSize='26px' boxSize='28px' boxShadow=''/>
                    </Slider>
                    <a className={cx(styles.button, walletState.rkmt_balance === 0 ? styles.disabled : styles.filled)} style={{backgroundColor: theme.buttonBack}} onClick={walletState.rkmt_balance === 0 ? null : Deposit}>Deposit</a>   
                </div>
                <div className = {styles.sliderarea}>
                    <NumberInput allowMouseWheel className={styles.numInput} max={staked} min={0} mr="1rem" ml="1rem"  value={receiveAmount} onChange={(value) => setReceiveAmount(value)}  step={0.1} isDisabled = {staked === 0}>
                        <div className = {styles.numberarea}>
                            <div className = {styles.title}>Amount</div>
                            <NumberInputField className = {styles.numberField} borderWidth="0" color = 'ActiveBorder: #f1eef0' borderInlineEndColor='#f1eef0' focusBorderColor="#f1eef0" />
                        </div>
                        <NumberInputStepper>
                            <NumberIncrementStepper color=' rgba(0, 4, 81, 0.5)' fontSize = '24px'/>
                            <NumberDecrementStepper color=' rgba(0, 4, 81, 0.5)' fontSize = '24px'/>
                        </NumberInputStepper>
                    </NumberInput>

                    <Slider flex="7"  focusThumbOnChange={false}  value={receiveAmount} onChange={(value) => setReceiveAmount(value)}  max={staked} step={0.1} ml="1.2rem" mr ='1rem' isDisabled = {staked === 0}>
                        <SliderTrack bg="#C4C4C4" p={1.5} borderRadius="full" >
                        <SliderFilledTrack bg='linear-gradient(268.98deg, #FE006C -0.67%, #000451 116.78%)'p={1.5} borderRadius="full"/>
                        </SliderTrack>
                        <SliderThumb fontSize='26px' boxSize='28px' boxShadow=''/>
                    </Slider>
                    <a className={cx(styles.button, staked === 0 ? styles.disabled : styles.filled)} style={{backgroundColor: theme.buttonBack}} onClick={staked === 0 ? null : Withdraw}>Withdraw</a>
                </div>
            </div>
        </div>
    )
}

export default walletContainer(Stake)