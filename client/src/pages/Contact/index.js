import React, {useContext} from 'react'
import styles from './Contact.module.scss'
import {ThemeContext} from 'context/ThemeContext'

function Contact(){
    const {theme} = useContext(ThemeContext)

    return(
        <div className={styles.verficationExplorer}>
            <div className={styles.container} style={{color: theme.primaryText, textAlign:'justify'}}>
                <span className ={styles.title}>Contact</span>
                <div className={styles.contactDatas}>
                    <br/>
                    You can contact us through the following ways:
                    <br/><br/>
                    <b>Telegram:</b> <a href="https://t.me/krosscoin_kss" target="_blank" rel="noreferrer" className = { styles.telegram}>t.me/krosscoin_kss</a>
                    <br/><br/>
                    <b>Twitter:</b> @hashgreed or @krosscoin_kss
                    <br/><br/>
                    <b>Email:</b> support@krosscoin.io
                    <br/><br/>
                    <b>Phone number:</b>
                    <br/>
                    (+234) 081 2844 7600
                    <br/>
                    (+1) 972 207 1218
                    <br/><br/>
                </div>
            </div>
        </div>

    )
}

export default Contact