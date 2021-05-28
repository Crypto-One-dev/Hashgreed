import React, {forwardRef, useRef, useState, useImperativeHandle, useEffect, useContext} from 'react'

import "owl.carousel/dist/assets/owl.carousel.css"
import "owl.carousel/dist/assets/owl.theme.green.css"
import OwlCarousel from 'react-owl-carousel'
import CertificationCell from '../CertificationCell/CertificationCell'
import ApiUtils from 'utils/api'
import Prev from 'assets/images/prev.svg'
import Next from 'assets/images/next.svg'
import {ThemeContext} from 'context/ThemeContext'
import styles from './Carousel.module.scss'

function Carousel({owner}, ref){
  const carousel = useRef(null)
  const [certifications, setCertifications] = useState([])
  const {theme} = useContext(ThemeContext)

  useEffect(() => {
      let interval = -1
      if(owner) {
      const proc = () => {
          ApiUtils.getCertifications('data_ec_([A-Za-z0-9]*)_' + owner, setCertifications)
      }
      proc()
      interval = setInterval(proc, 60000)
    }

    return () => {
      if(interval > -1) {
        clearInterval(interval)
      }
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
        <div className={styles.CarouselArea}>
          <div className={styles.header}>
            <div className={styles.title} style={{color: theme.primaryText}}>
              Certified Emails
            </div>
            <hr className = {styles.line}/>
          </div>
          <div className={styles.mainCarousel}>
            <img src = {Prev} className = {styles.leftIcon} style={{color: theme.primaryText}} onClick={()=>{carousel.current.prev()}} alt = ""/>
            <OwlCarousel style={{width: 'calc(100% - 80px)'}} className="owl-theme" items={1} responsiveClass={true} margin={0} dots={false} ref={carousel} >
                {
                    certifications && certifications.map((cert) =>
                        <CertificationCell cert={cert} owner={owner} />
                    )
                }
            </OwlCarousel>
            <img src = {Next} className = {styles.rightIcon} onClick={()=>{carousel.current.next()}} alt = ""/>
          </div>
        </div>
      )
      : null     
    )
}

export default forwardRef(Carousel)