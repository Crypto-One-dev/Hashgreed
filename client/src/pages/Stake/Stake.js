import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  Flex,
  NumberInput,  NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
  Slider, SliderTrack, SliderFilledTrack, SliderThumb,
  Stat, StatLabel, StatNumber, StatHelpText,
  Text
} from '@chakra-ui/react';

import ThemeContext from "context/UserContext";
import walletContainer from 'redux/containers/wallet';
import WavesUtils from 'utils/waves';
import styles from './Stake.module.scss';

function Stake({walletState}) {
  const [sendAmount, setSendAmount] = useState(0)
  const [receiveAmount, setReceiveAmount] = useState(0)

  const [staked, setStaked] = useState(0)
  useEffect(() => {
    let interval = -1
    if(walletState.address) {
      const proc = () => {
        WavesUtils.StakedRKMT(walletState.address, setStaked)
      }
      proc()
      interval = setInterval(proc, 10000)
    }
  
    return () => {
      if(interval > -1) {
        clearInterval(interval)
      }
    }
  }, [walletState.address])

  const {theme} = useContext(ThemeContext);

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
    <div className={styles.wrapper}>
       <Flex className={styles.item}>
        <NumberInput
          className={styles.input}
          isDisabled={walletState.rkmt_balance === 0}
          value={sendAmount} onChange={value => setSendAmount(value)}
          min={0} max={walletState.rkmt_balance}
          style={{color: theme.primaryText}}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Slider
          flex={1} mx='10px' width='calc(100% - 20px)'
          focusThumbOnChange={false} isDisabled={walletState.rkmt_balance === 0}
          value={sendAmount} onChange={value => setSendAmount(value)}
          min={0} max={walletState.rkmt_balance}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize="24px" />
        </Slider>
        <Button
          style={{backgroundColor: theme.primaryColor, color: 'white'}}
          className={styles.button}
          onClick={Deposit}
          isDisabled={walletState.rkmt_balance === 0}
        >
          Deposit</Button>
      </Flex>
      <Flex className={styles.item} style={{color: theme.primaryText}}>
        <Text fontSize="3xl" className={styles.text}>Total Staked:</Text>
        <Text fontSize="3xl" className={styles.text}>{staked} RKMT</Text>
      </Flex>
       <Flex className={styles.item}>
        <NumberInput
          className={styles.input}
          isDisabled={staked === 0}
          value={receiveAmount} onChange={value => setReceiveAmount(value)}
          min={0} max={staked}
          style={{color: theme.primaryText}}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Slider
          flex={1} mx='10px' width='calc(100% - 20px)'
          focusThumbOnChange={false} isDisabled={staked === 0}
          value={receiveAmount} onChange={value => setReceiveAmount(value)}
          min={0} max={staked}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize="24px" />
        </Slider>
        <Button
          style={{backgroundColor: theme.primaryColor, color: 'white'}}
          className={styles.button}
          onClick={Withdraw}
          isDisabled={staked === 0}
        >
          Withdraw</Button>
      </Flex>
      <Flex className={styles.stats}>
          <Stat>
            <StatLabel>Daily</StatLabel>
            <StatNumber>{(sendAmount * 0.04 / 100).toFixed(2)}</StatNumber>
            <StatHelpText>0.04%</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Weekly</StatLabel>
            <StatNumber>{(sendAmount * 0.28 / 100).toFixed(2)}</StatNumber>
            <StatHelpText>0.28%</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Monthly</StatLabel>
            <StatNumber>{(sendAmount * 1.2 / 100).toFixed(2)}</StatNumber>
            <StatHelpText>1.2%</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Yearly</StatLabel>
            <StatNumber>{(sendAmount * 14.6 / 100).toFixed(2)}</StatNumber>
            <StatHelpText>14.6%</StatHelpText>
          </Stat>
      </Flex>
    </div>
  )
}
export default walletContainer(Stake);