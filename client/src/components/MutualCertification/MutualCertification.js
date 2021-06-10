import React, {useContext, useEffect, useState,useRef} from 'react';
import "owl.carousel/dist/assets/owl.carousel.css"
import "owl.carousel/dist/assets/owl.theme.green.css"
import OwlCarousel from 'react-owl-carousel'
import {ThemeContext} from 'context/ThemeContext'
import Prev from 'assets/images/prev.svg'
import Next from 'assets/images/next.svg'
import MutualCertificationCell from './MutualCertificationCell/MutualCertificationCell'
import styles from './MutualCertification.module.scss'

function MutualCertification({certifications, owner}){

  const carousel = useRef(null)
  const {theme} = useContext(ThemeContext)
  
  return (
    <div className={styles.mutualCertification}>
      {
          (certifications && certifications.length>0) ?
          (
            <div className={styles.CarouselArea}>
              <div className={styles.header}>
                <div className={styles.title} style={{color: theme.primaryText}}>
                  Certified Files
                </div>
                <hr className = {styles.line}/>
              </div>
              <div className={styles.mainCarousel}>
                <img src = {Prev} className = {styles.leftIcon} style={{color: theme.primaryText}} onClick={()=>{carousel.current.prev()}} alt = ""/>
                <OwlCarousel style={{width: 'calc(100% - 80px)'}} className="owl-theme" items={1} responsiveClass={true} margin={0} dots={false} ref={carousel} mouseDrag={false} touchDrag={false}>
                    {
                        certifications && certifications.map((cert) =>
                            <MutualCertificationCell detail={cert} owner={owner} />
                        )
                    }
                </OwlCarousel>
                <img src = {Next} className = {styles.rightIcon} onClick={()=>{carousel.current.next()}} alt = ""/>
              </div>
            </div>
          )
          : null
        }
    </div>
  )
}

export default MutualCertification