import React, {forwardRef, useRef, useState, useImperativeHandle } from 'react'

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.green.css";
import OwlCarousel from "react-owl-carousel";
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
      ));

    return(
        <>
            <OwlCarousel className="owl-theme"  margin={0} items = {4} dots={false} ref={carousel} loop >
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
            <div class="item">
                <AuctionCell index = {5} />
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