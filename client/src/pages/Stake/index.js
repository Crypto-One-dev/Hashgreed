import React, {useEffect, useState} from 'react'

import {Flex, Stat, StatLabel, StatNumber, StatHelpText} from '@chakra-ui/react'
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
import styles from './Stake.module.scss'

function Stake({walletState}){

    const [staked, setStaked] = useState(0.0)
    const [sendAmount, setSendAmount] = useState(0)
    const [receiveAmount, setReceiveAmount] = useState(0)

    useEffect(() => {
        let interval = -1
        if(walletState.address) {
          const proc = () => {
            WavesUtils.StakedRKMT(walletState.address, setStaked)
          }
          proc()
          interval = setInterval(proc, 60000)
        }
      
        return () => {
          if(interval > -1) {
            clearInterval(interval)
          }
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
                    <div className={styles.depositTitle}>Deposit</div>
                    <div className={styles.totalStaked}> TotalStaked: {staked} RKMT</div>
                </div>
                <hr className = {styles.border}/>
                {/* <Sliders index = {1} staked = {staked} setAmount = {setAmount} setStaked = {setStaked} isDisabled = {walletState.rkmt_balance === 0}/> */}
                {/* <Sliders index = {2} staked = {staked} setAmount = {setAmount} setStaked = {setStaked} isDisabled = {staked === 0}/> */}
                <div className = {styles.sliderarea}>
                    <div className={styles.slider}>
                        <NumberInput className={styles.numInput}  mr="1rem" ml="1rem"  value={sendAmount} onChange={(value) => setSendAmount(value)}  step={0.1} isDisabled = {walletState.rkmt_balance === 0}>
                            <div className = {styles.numberarea}>
                                <div className = {styles.title}>Amount</div>
                                <NumberInputField className = {styles.numberField} borderWidth="0" color = 'ActiveBorder: #f1eef0' borderInlineEndColor='#f1eef0' focusBorderColor="#f1eef0" />
                            </div>
                            <NumberInputStepper>
                                <NumberIncrementStepper color=' rgba(0, 4, 81, 0.5)' fontSize = '18px'/>
                                <NumberDecrementStepper color=' rgba(0, 4, 81, 0.5)' fontSize = '18px'/>
                            </NumberInputStepper>
                        </NumberInput>

                        <Slider flex="7"  focusThumbOnChange={false} value={sendAmount} onChange={(value) => setSendAmount(value)}  max={100} step={0.1} mr ='25' isDisabled = {walletState.rkmt_balance === 0}>
                            <SliderTrack bg="#C4C4C4" p={1.5} borderRadius="full" >
                            <SliderFilledTrack bg='linear-gradient(268.98deg, #FE006C -0.67%, #000451 116.78%)'p={1.5} borderRadius="full"/>
                            </SliderTrack>
                            <SliderThumb fontSize='50px' boxSize='32px' boxShadow=''/>
                        </Slider>
                    </div>
                    <a className={cx(styles.button, walletState.rkmt_balance === 0 ? styles.disabled : styles.filled)} onClick={walletState.rkmt_balance === 0 ? null : Deposit}>Deposit</a>   
                </div>
                <div className = {styles.sliderarea}>
                    <div className={styles.slider}>
                        <NumberInput className={styles.numInput}  mr="1rem" ml="1rem"  value={receiveAmount} onChange={(value) => setReceiveAmount(value)}  step={0.1} isDisabled = {staked === 0}>
                            <div className = {styles.numberarea}>
                                <div className = {styles.title}>Amount</div>
                                <NumberInputField className = {styles.numberField} borderWidth="0" color = 'ActiveBorder: #f1eef0' borderInlineEndColor='#f1eef0' focusBorderColor="#f1eef0" />
                            </div>
                            <NumberInputStepper>
                                <NumberIncrementStepper color=' rgba(0, 4, 81, 0.5)' fontSize = '18px'/>
                                <NumberDecrementStepper color=' rgba(0, 4, 81, 0.5)' fontSize = '18px'/>
                            </NumberInputStepper>
                        </NumberInput>

                        <Slider flex="7"  focusThumbOnChange={false}  value={receiveAmount} onChange={(value) => setReceiveAmount(value)}  max={100} step={0.1} mr ='25' isDisabled = {staked === 0}>
                            <SliderTrack bg="#C4C4C4" p={1.5} borderRadius="full" >
                            <SliderFilledTrack bg='linear-gradient(268.98deg, #FE006C -0.67%, #000451 116.78%)'p={1.5} borderRadius="full"/>
                            </SliderTrack>
                            <SliderThumb fontSize='50px' boxSize='32px' boxShadow=''/>
                        </Slider>
                    </div>
                    <a className={cx(styles.button, staked === 0 ? styles.disabled : styles.filled)} onClick={staked === 0 ? null : Withdraw}>Withdraw</a>
                </div>


                <Flex className={styles.stats}>
                    <Stat color = '#000451'>
                        <StatLabel>Daily</StatLabel>
                        <StatNumber>{(sendAmount * 0.04 / 100).toFixed(2)}</StatNumber>
                        <StatHelpText>0.04%</StatHelpText>
                    </Stat>
                    <Stat color = '#000451'>
                        <StatLabel>Weekly</StatLabel>
                        <StatNumber>{(sendAmount * 0.28 / 100).toFixed(2)}</StatNumber>
                        <StatHelpText>0.28%</StatHelpText>
                    </Stat>
                    <Stat color = '#000451'>
                        <StatLabel>Monthly</StatLabel>
                        <StatNumber>{(sendAmount * 1.2 / 100).toFixed(2)}</StatNumber>
                        <StatHelpText>1.2%</StatHelpText>
                    </Stat>
                    <Stat color = '#000451'>
                        <StatLabel>Yearly</StatLabel>
                        <StatNumber>{(sendAmount * 14.6 / 100).toFixed(2)}</StatNumber>
                        <StatHelpText>14.6%</StatHelpText>
                    </Stat>
                </Flex>
            </div>
        </div>
    )
}

export default walletContainer(Stake)