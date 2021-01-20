import React, {useContext} from 'react';
import cx from 'classnames';
import { Button } from '@chakra-ui/react';
import {FaCertificate} from "react-icons/all";
import {FaFileAlt} from "react-icons/all";

import ThemeContext from "context/UserContext";
import Text from 'component/Text/Text';
import Balances from 'component/Balances/Balances';
import styles from './VerificationExplorer.module.scss';

export default function VerificationExplorer() {
    const {theme, userInfo, setUserInfo} = useContext(ThemeContext);

    return (
        <div className={styles.wrapper}>
            <Balances userInfo={userInfo} />
            <div className={styles.header} style={{backgroundColor: theme.primaryColor}}>
              VERIFICATION EXPLORER
            </div>
            <div className={styles.container}>
                <div className={styles.item} style={{backgroundColor: theme.itemBackground}}>
                    <div className={styles.itemMain}>
                        <FaCertificate className={styles.iconSize}/>
                        <Text className={styles.selectText} style={{color: theme.primaryColor}}>Select or Drop a</Text>
                        <Text className={styles.boldText} style={{color: theme.primaryColor}}>Proof Of Certification</Text>
                    </div>
                </div>
                <div className={styles.item} style={{backgroundColor: theme.itemBackground}}>
                    <div className={styles.itemMain}>
                        <FaFileAlt className={styles.iconSize}/>
                        <Text className={styles.selectText} style={{color: theme.primaryColor}}>Select or Drop a</Text>
                        <Text className={styles.boldText} style={{color: theme.primaryColor}}>File to hash</Text>
                    </div>
                </div>
            </div>
            <input className={styles.inputText} placeholder="Transaction ID"/>
            <input className={styles.inputText} placeholder="File Hash or Message ID"/>
            <div className={styles.referenceWrapper}>
                <input className={styles.referenceText} placeholder="Reference"/>
                <Button className={styles.searchButton}>SEARCH</Button>
            </div>
            <div className={styles.header} style={{backgroundColor: theme.primaryColor}}>
                RESULT(S)
            </div>
            <div className={styles.explorerListWrapper}>
                <div className={styles.explorerList}></div>
                <Button className={styles.openSearchForm}>OPEN SEARCH FORM</Button>
            </div>
        </div>
    )
}
