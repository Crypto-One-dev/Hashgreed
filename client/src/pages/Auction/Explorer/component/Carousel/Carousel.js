import React, {forwardRef, useRef, useState, useImperativeHandle } from 'react'

import "owl.carousel/dist/assets/owl.carousel.css"
import "owl.carousel/dist/assets/owl.theme.green.css"
import OwlCarousel from 'react-owl-carousel'
import AuctionCell from '../AuctionCell/AuctionCell'

function Carousel(props, ref){
    const carousel = useRef(null)

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
            <OwlCarousel autoWidth={true} className="owl-theme" responsiveClass={true} margin={0} items = {4} dots={false} ref={carousel} loop responsive={{
                0:{
                    items:1
                },
                350:{
                    items:2
                },
                700:{
                    items:3
                },
                1000:{
                    items:4
                }
            }}>
                <div class="item">
                    <AuctionCell index = {1} />
                </div>
                <div class="item">
                    <AuctionCell index = {2} />
                </div>
                <div class="item">
                    <AuctionCell index = {3} />
                </div>
                <div class="item">
                    <AuctionCell index = {4} />
                </div>
                <div class="item">
                    <AuctionCell index = {5} />
                </div>
                <div class="item">
                    <AuctionCell index = {5} />
                </div>
            </OwlCarousel>
        </>
    )
}

export default forwardRef(Carousel)