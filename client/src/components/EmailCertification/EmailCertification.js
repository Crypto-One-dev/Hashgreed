import React from 'react'

import walletContainer from 'redux/containers/wallet'
import styles from './EmailCertification.module.scss'
import Carousel from './Carousel/Carousel'

function EmailCertification({owner}){

  return (
    <>
      <div className = {styles.container}>
        <Carousel owner={owner}/>
      </div>
    </>
  )
}

export default walletContainer(EmailCertification)