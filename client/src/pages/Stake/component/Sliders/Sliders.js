import React, {useState} from 'react'

import cx from 'classnames'
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Slider, SliderTrack, SliderFilledTrack, SliderThumb
  } from '@chakra-ui/react'
  
import WavesUtils from 'utils/waves';
import styles from './Sliders.module.scss'
import walletContainer from 'redux/containers/wallet';

const Sliders = ({index, staked, setStaked, isDisabled, walletState}) => {
    
    const [value, setValue] = useState(0)
    const handleChange = (value) => setValue(value)

    const [sendAmount, setSendAmount] = useState(0)
    const [receiveAmount, setReceiveAmount] = useState(0)

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
        <div className = {styles.sliderarea}>
            
                <NumberInput  mr="2rem" ml="2rem"  value={value} onChange={handleChange} step={0.1} isDisabled = {isDisabled}>
                    <div className = {styles.numberarea}>
                        <div className = {styles.title}>Amount</div>
                        <NumberInputField className = {styles.numberField} borderWidth="0" color = 'ActiveBorder: #f1eef0' borderInlineEndColor='#f1eef0' focusBorderColor="#f1eef0" />
                    </div>
                    <NumberInputStepper>
                        <NumberIncrementStepper color=' rgba(0, 4, 81, 0.5)' fontSize = '18px'/>
                        <NumberDecrementStepper color=' rgba(0, 4, 81, 0.5)' fontSize = '18px'/>
                    </NumberInputStepper>
                </NumberInput>

                    <Slider flex="1"  focusThumbOnChange={false} value={value} onChange={handleChange} max={100} step={0.1} mr ='25' isDisabled = {isDisabled}>
                        <SliderTrack bg="#C4C4C4" p={1.5} borderRadius="full" >
                        <SliderFilledTrack bg='linear-gradient(268.98deg, #FE006C -0.67%, #000451 116.78%)'p={1.5} borderRadius="full"/>
                        </SliderTrack>
                        <SliderThumb fontSize='50px' boxSize='32px' boxShadow=''/>
                    </Slider>
                    {
                        index === 1?
                        <a className={cx(styles.button, isDisabled ? styles.disabled : styles.filled)} onClick={isDisabled ? null : Deposit}>Deposit</a>
                        : index === 2?
                        <a className={cx(styles.button, isDisabled ? styles.disabled : styles.filled)} onClick={isDisabled ? null : Withdraw}>Withdraw</a>
                        :
                        null
                    }
        </div>
    )
}

export default walletContainer(Sliders)