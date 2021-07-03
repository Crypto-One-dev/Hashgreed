import React, {forwardRef, useRef, useState, useImperativeHandle, useEffect, useContext} from 'react'

import "owl.carousel/dist/assets/owl.carousel.css"
import "owl.carousel/dist/assets/owl.theme.green.css"
import OwlCarousel from 'react-owl-carousel'
import CertificationCell from './CertificationCell/CertificationCell'
import ApiUtils from 'utils/api'
import WavesConfig from 'config/waves'
import Prev from 'assets/images/left.png'
import Next from 'assets/images/right.png'
import {ThemeContext} from 'context/ThemeContext'
import styles from './EmailCertification.module.scss'

function EmailCertification({owner}, ref){
  const carousel = useRef(null)
  const [certifications, setCertifications] = useState([])
  const {theme} = useContext(ThemeContext)

  useEffect(() => {
      if(owner) {
      const proc = () => {
          ApiUtils.getCertifications('data_ec_([A-Za-z0-9]*)_' + owner, setCertifications)
      }
      proc()
    }
  }, [owner])

    useImperativeHandle(ref, () => ({
        prev() {
            carousel.current.prev()
        },
        next() {
            carousel.current.next()
        }
      }
      ))

    return(      
      (certifications && certifications.length>0) ?
      (
        <>
        <div className = {styles.container} style={{backgroundColor: theme.stepBackground, boxShadow: theme.historyglow}}>
          <div className={styles.CarouselArea}>
            <div className={styles.header}>
            <div className={styles.titleBar}>
                  <div className={styles.title} style={{color: theme.primaryText}}>
                    Latest Email
                  </div>
                  {/* <a className={styles.view} href={`${WavesConfig.EXPLORER_URL}/tx/`} target="_blank" rel="noreferrer">View more</a> */}
                </div>
              <hr className = {styles.line}/>
            </div>
            <div className={styles.mainCarousel}>
              <img src = {Prev} className = {styles.leftIcon} style={{color: theme.primaryText}} onClick={()=>{carousel.current.prev()}} alt = ""/>
              <OwlCarousel style={{width: 'calc(100% - 80px)'}} className="owl-theme" items={1} responsiveClass={true} margin={0} dots={false} ref={carousel} mouseDrag={false} touchDrag={false} >
                  {
                      certifications && certifications.map((cert) =>
                          <CertificationCell cert={cert} owner={owner} />
                      )
                  }
              </OwlCarousel>
              <img src = {Next} className = {styles.rightIcon} onClick={()=>{carousel.current.next()}} alt = ""/>
            </div>
          </div>
        </div>
        </>
      )
      : null     
    )
}

export default forwardRef(EmailCertification)