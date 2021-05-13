import React, {useEffect, useState} from 'react'
import Sliders from './component/Sliders/Sliders'

import {Flex, Stat, StatLabel, StatNumber, StatHelpText} from '@chakra-ui/react'
import walletContainer from 'redux/containers/wallet'
import WavesUtils from 'utils/waves'
import styles from './Stake.module.scss'

function Stake({walletState}){

    const [staked, setStaked] = useState(0.0)

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

    return (
        <div className = {styles.stake}>
            <div className = {styles.container}>
                <div className = {styles.header}>
                    <div className={styles.depositTitle}>Deposit</div>
                    <div className={styles.totalStaked}> TotalStaked: {staked} RKMT</div>
                </div>
                <hr className = {styles.border}/>
                <Sliders index = {1} staked = {staked} setStaked = {setStaked} isDisabled = {walletState.rkmt_balance === 0}/>
                <Sliders index = {2} staked = {staked} setStaked = {setStaked} isDisabled = {false}/>
                <Flex className={styles.stats}>
                    <Stat color = '#000451'>
                        <StatLabel>Daily</StatLabel>
                        <StatNumber>{(12 * 0.04 / 100).toFixed(2)}</StatNumber>
                        <StatHelpText>0.04%</StatHelpText>
                    </Stat>
                    <Stat color = '#000451'>
                        <StatLabel>Weekly</StatLabel>
                        <StatNumber>{(12 * 0.28 / 100).toFixed(2)}</StatNumber>
                        <StatHelpText>0.28%</StatHelpText>
                    </Stat>
                    <Stat color = '#000451'>
                        <StatLabel>Monthly</StatLabel>
                        <StatNumber>{(12 * 1.2 / 100).toFixed(2)}</StatNumber>
                        <StatHelpText>1.2%</StatHelpText>
                    </Stat>
                    <Stat color = '#000451'>
                        <StatLabel>Yearly</StatLabel>
                        <StatNumber>{(12 * 14.6 / 100).toFixed(2)}</StatNumber>
                        <StatHelpText>14.6%</StatHelpText>
                    </Stat>
                </Flex>
            </div>
        </div>
    )
}

export default walletContainer(Stake)