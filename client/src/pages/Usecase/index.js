import React, {useContext} from 'react'
import styles from './Usecase.module.scss'
import {ThemeContext} from 'context/ThemeContext'

function Usecase(){
    const {theme} = useContext(ThemeContext)

    return(
        <div className={styles.verficationExplorer}>
            <div className={styles.container} style={{color: theme.primaryText, textAlign:'justify'}}>
                <span className={styles.header}>HASHGREED USE CASES</span>
                <br/><br/>
                <div className={styles.faqData}>
                    Hashgreed is the World’s only file, agreement, email certification, storage and sharing tool which also houses a digital NFT marketplace and Defi solutions. Hashgreed is a suite of several useful blockchain powered solutions for file certification, storage, sharing, lending and digital art marketplace.
                    <br/><br/>
                    Below are some of the Advantages of Using Hashgreed:
                    <br/><br/>  
                    1. Everyone can store and share information safely, freely without relying on centralized platforms like facebook, instagram, twitter, linkedin and Youtube which can censor and remove your communications.
                    <br/><br/>
                    2. Everyone can store thousands of files safely and securely on Hashgreed which can be easily retrieved and shared to others. No more maxing out your phone storage or that of others.
                    <br/><br/>
                    3. By using Hashgreed, your information is no more in a private, centralized cloud like Apple Cloud, which can be hacked or your phone can be stolen. Your information is secured on the blockchain and you can access it from any phone and from any place.
                    <br/><br/>
                    4. Anyone can certify and store both audio, video or text versions of their Intellectual properties and prove authenticity and proof of ownership on demand and from any device.
                    <br/><br/>
                    5. Hashgreed allows immutable proof of copyrighted material transfer or sale by using an NFT and the NFT marketplace tool. Also by using an NFT (Non fungible token), the scope of use of a copyrighted material can be defined.
                    <br/><br/>
                    6. Doctors, Lawyers, Professionals can safely and securely store public data on Hashgreed for easy indexing and retrieval, and these files can be accessed from any device and from anywhere. They can also authenticate and certify sensitive business documents such as Invoices, Purchase Agreements.
                    <br/><br/>
                    7. Anyone can create a mutual agreement contract on Hashgreed between themselves and up to 5 other people. The agreement is stored on the Blockchain and immutable.
                    <br/><br/>
                    8. Anyone can use the Email certification tool to send blockchain certified emails to other people. The unique message ID of the email which links both sender and recipient and contains the entire email message is stored on the blockchain forever.
                    <br/><br/>
                    9. Through the NFT marketplace tool, music albums, concert tickets, events tickets, art works, Educational courses and even merchandise can be sold to the public and the proof of ownership of the NFT is the proof of purchase. This allows for instant auditing and easy accounting of sales receipts.
                    <br/><br/>
                    10. Through the Loan product, Hashgreed participates in the trillion dollar global lending market and the multi billion dollar Defi lending market. Crypto traders can take over- collateralized loans for emergencies, doubling down on an asset during a bear market, taking advantage of a new and early crypto opportunity without selling any of their current crypto holdings. They can select a loan period of 1 to 90 days.
                    <br/><br/>
                    11. Hashgreed has also innovated in Sports gaming by being the first to introduce Sport NFTs and NFT gamified management of Soccer Players. Currently 50 top soccer players are involved in this new gaming experience, several hundreds more across various Sport categories will be minted in the coming weeks.
                    <br/><br/>
                    12. Hashgreed will also feature a new way of trading financial instruments and assets such as Gold, Silver, Oil, Forex. This tool has been tested and will be live in the Hashgreed product in a few days.
                    <br/><br/>
                    13. Lastly, Hashgreed features a Freelance and Cryptocurrency Escrow solution to provide safe and secured hiring of skilled contractors and secure crypto payments.
                    <br/><br/>
                </div>
            </div>
        </div>

    )
}

export default Usecase