import React, {useContext, useState} from 'react';
import { Button } from '@chakra-ui/react';
import cx from 'classnames';
import {RiArrowDownCircleLine, FaCertificate, FaFileAlt} from "react-icons/all";

import ThemeContext from "context/UserContext";
import Text from 'component/Text/Text';
import styles from './VerificationExplorer.module.scss';

export default function VerificationExplorer() {
    const {theme} = useContext(ThemeContext);
    const [isSearchOpen, openSearchForm] = useState(false);

    return (
        <div className={styles.wrapper}>
            <div style={{display: isSearchOpen ? 'block' : 'none'}}>
                <div className={cx(styles.header, styles.clickable)} style={{backgroundColor: theme.primaryColor}} onClick={() => openSearchForm(false)}>
                    <span>VERIFICATION EXPLORER</span>
                    <RiArrowDownCircleLine className={styles.openIcon} />
                </div>
                <div className={styles.container}>
                    <div
                        className={styles.item}
                        style={{backgroundColor: theme.itemBackground, borderColor: theme.buttonBack}}
                    >
                        <div className={styles.itemMain} style={{color: theme.buttonBack}}>
                            <FaCertificate className={styles.iconSize} style={{color: theme.buttonBack}}/>
                            <Text className={styles.selectText} style={{color: theme.buttonBack}}>Select or Drop a</Text>
                            <Text className={styles.boldText} style={{color: theme.buttonBack}}>Proof Of Certification</Text>
                        </div>
                    </div>
                    <div className={styles.item} style={{backgroundColor: theme.itemBackground}}>
                        <div className={styles.itemMain}>
                            <FaFileAlt className={styles.iconSize} style={{color: theme.buttonBack}}/>
                            <Text className={styles.selectText} style={{color: theme.buttonBack}}>Select or Drop a</Text>
                            <Text className={styles.boldText} style={{color: theme.buttonBack}}>File to hash</Text>
                        </div>
                    </div>
                </div>
                <input className={styles.inputText} style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight}} placeholder="Transaction ID"/>
                <input className={styles.inputText} style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight}} placeholder="File Hash or Message ID"/>
                <div className={styles.referenceWrapper}>
                    <input className={styles.referenceText} style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight}} placeholder="Reference"/>
                    <Button className={styles.searchButton} style={{backgroundColor: theme.buttonBack}}>SEARCH</Button>
                </div>
            </div>
            <div className={styles.header} style={{backgroundColor: theme.primaryColor}}>
                RESULT(S)
            </div>
            <div className={styles.explorerListWrapper}>
                <div className={styles.explorerList}></div>
                <Button
                    className={styles.openSearchForm}
                    onClick={() => openSearchForm(!isSearchOpen)}
                    style={{backgroundColor: theme.buttonBack}}
                >
                    {isSearchOpen ? 'CLOSE' : 'OPEN'} SEARCH FORM
                </Button>
            </div>
        </div>
    )
}
