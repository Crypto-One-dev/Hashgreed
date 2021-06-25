import React, {forwardRef, useRef, useState, useImperativeHandle } from 'react'

import "owl.carousel/dist/assets/owl.carousel.css"
import "owl.carousel/dist/assets/owl.theme.green.css"
import OwlCarousel from 'react-owl-carousel'
import AuctionCell from '../AuctionCell/AuctionCell'
import SportBidModal from 'components/SportBidModal/BidModal'

function Carousel({data, priceAssetId, customer}, ref){
    const carousel = useRef(null)
    const bidModal = useRef(null)
    const [auctionData, setAuctionData] = useState(); 
    const openBidModal = (auctionData) => {
        setAuctionData(auctionData)
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
            <SportBidModal ref={bidModal} auctionData={auctionData} priceAssetId={priceAssetId} customer={customer} />
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
                        <AuctionCell auction={auction} priceAssetId={priceAssetId} bidOpen = {(val) => openBidModal(val)} />
                    )
                }
            </OwlCarousel>
        </>
    )
}

export default forwardRef(Carousel)