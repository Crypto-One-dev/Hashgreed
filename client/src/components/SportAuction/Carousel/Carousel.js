import React, {forwardRef, useRef, useState, useImperativeHandle } from 'react'

import "owl.carousel/dist/assets/owl.carousel.css"
import "owl.carousel/dist/assets/owl.theme.green.css"
import OwlCarousel from 'react-owl-carousel'
import AuctionCell from '../AuctionCell/AuctionCell'
import SportBidModal from 'components/SportBidModal/BidModal'
import AliceCarousel from 'react-alice-carousel'

function Carousel({data, priceAssetId, customer}, ref){
    const carousel = useRef(null)
    const bidModal = useRef(null)
    const [auctionData, setAuctionData] = useState(); 
    const openBidModal = (auctionData) => {
        setAuctionData(auctionData)
        bidModal.current.openModal()
    }
    
    var id = 0;
    useImperativeHandle(ref, () => ({
        prev() {
            carousel.current.prev()
            // carousel.current.slidePrev()
        },
        next() {
            carousel.current.next()
            // carousel.current.slideNext()
        }
      }
    ))

    const responsive = {
        0:{
            items: 2.5
        },
        600:{
            items: 3
        },
        900:{
            items: 4
        },
        1200:{
            items: 4
        },
    }

    return(
        <>
            <SportBidModal ref={bidModal} auctionData={auctionData} priceAssetId={priceAssetId} customer={customer} />
            <OwlCarousel className="owl-theme" responsiveClass={true} margin={0} dots={false} ref={carousel} responsive={{
                0:{
                    items: 2
                },
                600:{
                    items: 3
                },
                900:{
                    items: 4
                },
                1200:{
                    items: 4
                }
            }}>
            {/* <AliceCarousel
                responsive = {responsive}
                ref={carousel} disableDotsControls={true} disableButtonsControls={true} playButtonEnabled={false} autoPlayActionDisabled={true} autoPlay={false}> */}

                {
                    data && data.map(auction =>{
                        id++;
                        return <AuctionCell key={id} auction={auction} priceAssetId={priceAssetId} bidOpen = {(val) => openBidModal(val)} />
                    }
                        
                    )
                }
            </OwlCarousel>
            {/* </AliceCarousel> */}
        </>
    )
}

export default forwardRef(Carousel)