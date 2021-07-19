import React, {useContext} from 'react'
import styles from './Faq.module.scss'
import {ThemeContext} from 'context/ThemeContext'

function Faq(){
    const {theme} = useContext(ThemeContext)

    return(
        <div className={styles.verficationExplorer}>
            <div className={styles.container} style={{color: theme.primaryText, textAlign:'justify'}}>
                <span className={styles.header} style={{fontSize: '56px', textAlign:'center'}}>F A Q</span>
                <br/>
                <br/>
                <div className={styles.faqData}>
                    <b>1. What is Hashgreed?</b>
                    <br/>
                    <br/>

                    Hashgreed is a multi-purpose dApp platform for file, agreements, email certification along with NFT marketplace and DeFi solutions.
                    <br/>
                    <br/>
                    <b>2. How do I create a hashgreed account?</b>
                    <br/><br/>
                    Simply click on “Start Now”, then create a Waves account using the Email method.  Confirm the 6 digits code sent to your email and you will be redirected to Hashgreed automatically and ready to go.
                    <br/><br/>
                    <b>3. What cryptocurrency does Hashgreed uses?</b>
                    <br/><br/>
                    Hashgreed is currently on the Waves blockchain. You need both RKMT and Waves tokens. RKMT is for certification fees and Waves is for transaction fees. Soon Hashgreed will be on Kross blockchain and you will only need KSS-Kross tokens.
                    <br/><br/>
                    <b>4. What is RKMT?</b>
                    <br/><br/>
                    RKMT is the KSS proxy on the Waves blockchain. It is “KSS-Waves” but just with a different name.
                    <br/><br/>
                    <b>5. What are the other KSS chains?</b>
                    <br/><br/>
                    KSS is currently on 3 blockchains.
                    RKMT is KSS on the Waves blockchain and has a max supply of 10 billion
                    KSS-Kross is the KSS on Kross blockchain and has a current supply of 10 million with an annual inflation of 5.27%. It is also a coin as it is the network coin on the Kross blockchain. You pay fees on the Kross blockchain with KSS.
                    KSS-BEP20 is KSS on the Binance Smart Chain.
                    KSS will also be created on more blockchains and will have KSS powered dApps there as well.
                    <br/><br/>
                    <b>6. What is the relationship between RKMT, KSS-Kross and KSS-BEP20?</b>
                    <br/><br/>
                    1000 RKMT = 1 KSS-Kross
                    <br/>
                    1000 RKMT = 1 KSS-BEP20
                    <br/>
                    1 KSS-BEP20 = 1 KSS-Kross
                    <br/><br/>
                    <b>7. Where can I watch video tutorials about using Hashgreed?</b>
                    <br/><br/>
                    Hashgreed tutorials are on our Youtube Channel called Krosscoin Project.
                    <br/><br/>
                    <b>8. How much interest is charged on the Loan Dapp on Hashgreed?</b>
                    <br/><br/>
                    Every 90 days, interest equivalent to 8.88% is charged. Interest is however calculated on a daily basis based on how many days duration you selected. Interest is charged immediately from your collateral.
                    <br/><br/>
                    <b>9. How can I learn more about Hashgreed and the Krosscoin Ecosystem?</b>
                    <br/><br/>
                    You can join our Telegram community at t.me/krosscoin_kss or on Twitter at @hashgreed and @krosscoin_team to ask questions.
                    <br/><br/>
                    <b>10. Does Hashgreed have a referral program?</b>
                    <br/><br/>
                    Definitely Yes! Join us on Telegram to learn about it and participate. Referral rewards are in various forms; KSS, Fiat and BUSD.
                    <br/><br/>
                </div>
            </div>
        </div>

    )
}

export default Faq