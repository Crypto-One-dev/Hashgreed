import React, {forwardRef, useRef, useState, useImperativeHandle } from 'react'

import "owl.carousel/dist/assets/owl.carousel.css"
import "owl.carousel/dist/assets/owl.theme.green.css"
import OwlCarousel from 'react-owl-carousel'
import AuctionCell from '../AuctionCell/AuctionCell'
import BidModal from 'components/BidModal/BidModal'

function Carousel({data, height}, ref){
    const carousel = useRef(null)
    const bidModal = useRef(null)
    const [bidData, setBidData] = useState(''); 
    const openBidModal = (str) => {
        setBidData(str)
        bidModal.current.openModal()
    }

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
        <>
            <BidModal ref={bidModal} bidData={bidData}/>
            <OwlCarousel className="owl-theme" responsiveClass={true} margin={0} dots={false} ref={carousel} responsive={{
                0:{
                    items: 1
                },
                600:{
                    items: 2
                },
                900:{
                    items: 3
                },
                1200:{
                    items: 4
                }
            }}>
                {
                    data && data.map(auction =>
                        <AuctionCell auction={auction} bidOpen = {(str) => openBidModal(str)} />
                    )
                }
            </OwlCarousel>
        </>
    )
}

export default forwardRef(Carousel)