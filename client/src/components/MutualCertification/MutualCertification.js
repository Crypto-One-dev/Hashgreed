import React, {useContext, useRef} from 'react'
import "owl.carousel/dist/assets/owl.carousel.css"
import "owl.carousel/dist/assets/owl.theme.green.css"
import "react-alice-carousel/lib/alice-carousel.css"
import AliceCarousel from 'react-alice-carousel'
import {ThemeContext} from 'context/ThemeContext'
import WavesConfig from 'config/waves'
import Prev from 'assets/images/left.png'
import Next from 'assets/images/right.png'
import MutualCertificationCell from './MutualCertificationCell/MutualCertificationCell'
import styles from './MutualCertification.module.scss'

function MutualCertification({certifications, owner, toggleDetails}){

  const carousel = useRef(null)
  const {theme} = useContext(ThemeContext)
  const viewMore = useRef(null);

  const toggleDetail = () => {
    toggleDetails('', false)
  }
  var num = 0;
  return (
        (certifications && certifications.length>0) ?
        (
          <div className={styles.mutualCertification} style={{backgroundColor: theme.stepBackground, boxShadow: theme.historyglow}}>
            <div className={styles.CarouselArea}>
              <div className={styles.header}>
                <div className={styles.titleBar}>
                  <div className={styles.title} style={{color: theme.primaryText}}>
                    Latest Mutual Agreement
                  </div>
                  <a ref={viewMore} className={styles.view} href={`${WavesConfig.EXPLORER_URL}/tx/${certifications && certifications.length > 0 ? certifications[0].key.replace('data_MA_', '').replace('_' + owner, '') : '#'}`} target="_blank" rel="noreferrer">View more</a>
                </div>
                <hr className = {styles.line}/>
              </div>
              <div className={styles.mainCarousel}>
                <img src = {Prev} className = {styles.leftIcon} style={{color: theme.primaryText}} onClick={()=>{
                   setTimeout(function() {
                    carousel.current.slidePrev();
                  }, 100);
                  toggleDetail();
                }} alt = ""/>
                {/* <OwlCarousel style={{width: 'calc(100% - 80px)'}} className="owl-theme" items={1} responsiveClass={true} margin={0} dots={false} ref={carousel} mouseDrag={false} touchDrag={false}> */}
                <AliceCarousel
                  onSlideChanged  = {(e) => {
                    if(e.item !== null && e.item) {
                      viewMore.current.href = `${WavesConfig.EXPLORER_URL}/tx/${certifications[e.item].key.replace('data_MA_', '').replace('_' + owner, '')}`
                    }
                  }}
                  ref={carousel} autoWidth={true} disableDotsControls={true} disableButtonsControls={true} playButtonEnabled={false} autoPlayActionDisabled={true}>
                    {

                        certifications && certifications.map((cert) =>{
                          num++;
                          return (<MutualCertificationCell key={num} detail={cert} owner={owner} toggleDetail= {toggleDetails}/>)
                        }
                      )
                    }
                </AliceCarousel>
                <img src = {Next} className = {styles.rightIcon} onClick={()=>{
                  setTimeout(function() {
                    carousel.current.slideNext();
                  }, 100);
                  toggleDetail();
                }} alt = ""/>
              </div>
            </div>
          </div>
        )
        : null
  )
}

export default MutualCertification