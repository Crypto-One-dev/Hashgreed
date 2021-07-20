import React, {useContext} from 'react'
import styles from './About.module.scss'
import {ThemeContext} from 'context/ThemeContext'

function About(){
    const {theme} = useContext(ThemeContext)

    return(
        <div className={styles.verficationExplorer}>
            <div className={styles.container} style={{color: theme.primaryText, textAlign:'justify'}}>
                <span className={styles.header}>About Hashgreed</span>
                <div className={styles.aboutData}>
                    <br/>
                    Hashgreed is a multi-purpose dApp platform for file, agreements, email certification along with NFT marketplace and DeFi solutions
                    <br/><br/>
                    Hashgreed is a web dApp by Vinekross LLC, who run the Krosscoin Project.
                    <br/><br/>
                    Vinekross LLC (L18958) is a Nevis registered company.
                </div>
            </div>
        </div>

    )
}

export default About