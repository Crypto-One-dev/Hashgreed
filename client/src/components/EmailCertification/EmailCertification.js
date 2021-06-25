import React, {useContext} from 'react'

import walletContainer from 'redux/containers/wallet'
import styles from './EmailCertification.module.scss'
import Carousel from './Carousel/Carousel'
import {ThemeContext} from 'context/ThemeContext'

function EmailCertification({owner}){
  const {theme} = useContext(ThemeContext)

  return (
    <>
      <div className = {styles.container} style={{backgroundColor: theme.stepBackground, boxShadow: theme.historyglow}}>
        <Carousel owner={owner}/>
      </div>
    </>
  )
}

export default walletContainer(EmailCertification)