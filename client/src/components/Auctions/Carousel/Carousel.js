import React, {forwardRef, useRef, useState, useImperativeHandle } from 'react'

import "owl.carousel/dist/assets/owl.carousel.css"
import "owl.carousel/dist/assets/owl.theme.green.css"
import OwlCarousel from 'react-owl-carousel'
import AuctionCell from '../AuctionCell/AuctionCell'
import ApiUtils from 'utils/api'
import BidModal from 'components/BidModal/BidModal'

function Carousel({category, auctionType, data, height, customer}, ref){
    const carousel = useRef(null)
    const bidModal = useRef(null)
    const [auctionData, setAuctionData] = useState(); 
    const openBidModal = (auctionData) => {
        setAuctionData(auctionData)
        bidModal.current.openModal()
        // ApiUtils.getAuctions(walletState.address, auctionType, setAuctions, setHeight);
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
            <BidModal ref={bidModal} auctionData={auctionData} auctionType={auctionType} category={category} height={height} customer={customer} />
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
                        <AuctionCell category={category} auction={auction} height={height} bidOpen = {(val) => openBidModal(val)} />
                    )
                }
            </OwlCarousel>
        </>
    )
}

export default forwardRef(Carousel)