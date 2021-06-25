import React, {useContext, useEffect, useState,useRef} from 'react';
import "owl.carousel/dist/assets/owl.carousel.css"
import "owl.carousel/dist/assets/owl.theme.green.css"
import "react-alice-carousel/lib/alice-carousel.css";
import cx from 'classnames';
import OwlCarousel from 'react-owl-carousel'
import ResponsiveCarousel from 'react-responsive-carousel'
import AliceCarousel from 'react-alice-carousel'
import {ThemeContext} from 'context/ThemeContext'
import WavesConfig from 'config/waves'
import Prev from 'assets/images/left.png'
import Next from 'assets/images/right.png'
import MutualCertificationCell from './MutualCertificationCell/MutualCertificationCell'
import styles from './MutualCertification.module.scss'

function MutualCertification({certifications, owner, toggleDetails, walletState}){

  const carousel = useRef(null)
  const {theme} = useContext(ThemeContext)
  const [toggle, settoggle] = useState(false);
  return (
    <div className={styles.mutualCertification} style={{backgroundColor: theme.stepBackground, boxShadow: theme.historyglow}}>
      {
        (certifications && certifications.length>0) ?
        (
              <div className={styles.CarouselArea}>
                <div className={styles.header}>
                  <div className={styles.titleBar}>
                    <div className={styles.title} style={{color: theme.primaryText}}>
                      Transactions
                    </div>
                    <a className={styles.view} href={`${WavesConfig.EXPLORER_URL}/tx/`} target="_blank" rel="noreferrer">View more</a>
                  </div>
                  <hr className = {styles.line}/>
                </div>
                <div className={styles.mainCarousel}>
                  <img src = {Prev} className = {styles.leftIcon} style={{color: theme.primaryText}} onClick={()=>{carousel.current.slidePrev(); settoggle(false);}} alt = ""/>
                  {/* <OwlCarousel style={{width: 'calc(100% - 80px)'}} className="owl-theme" items={1} responsiveClass={true} margin={0} dots={false} ref={carousel} mouseDrag={false} touchDrag={false}> */}
                  <AliceCarousel style={{width: 'calc(100% - 100px)'}} ref={carousel} disableDotsControls={true} disableButtonsControls={true} playButtonEnabled={false} autoPlayActionDisabled={true}>
                      {
                          certifications && certifications.map((cert) =>
                              <MutualCertificationCell detail={cert} owner={owner} toggleDetail= {toggleDetails}/>
                          )
                      }
                  </AliceCarousel>
                  <img src = {Next} className = {styles.rightIcon} onClick={()=>{carousel.current.slideNext(); settoggle(false);}} alt = ""/>
                </div>
              </div>
        )
        : null
      }
    </div>
  )
}

export default MutualCertification