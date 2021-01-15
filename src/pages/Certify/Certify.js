import React, {useContext, useCallback} from 'react';
import {useDropzone} from 'react-dropzone'
import { Tooltip, Input, Checkbox, Select } from "@chakra-ui/react"
import { FaLock } from 'react-icons/fa';
import { Button } from '@chakra-ui/react';

import ThemeContext from 'context/UserContext';
import {ColorModeSwitcher} from 'component/ColorModeSwitcher';
import Text from 'component/Text/Text';
import styles from './Certify.module.scss';
import Balances from 'component/Balances/Balances';

export default function Certify() {
  const {theme, setTheme, userInfo} = useContext(ThemeContext);
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


  return (
    <div className={styles.main} style={{backgroundColor: theme.background}}>
      <div className={styles.wrapper}>
        <Balances userInfo={userInfo} />
        <div className={styles.header} style={{backgroundColor: theme.primaryColor}}>CERTIFY A FILE</div>
        <ColorModeSwitcher theme={theme} setTheme={setTheme} className={styles.colorModeSwitcher} />
        <div className={styles.container}>
          <div className={styles.topContainer}>
            <Text>Click to select or drag and drop any type of file.</Text>
            <Text>Bigger files will take longer to compute. Max tested file size is 10 GB.</Text>
          </div>
          <div className={styles.dropContainer}>
            <div {...getRootProps()} className={styles.dropZone} style={{backgroundColor: theme.itemBackground}}>
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Drop the files here ...</p> :
                  <p>Select or Drop a file</p>
              }
            </div>
            <div className={styles.inputs}>
              <div>
                <div className={styles.inputDiv}>
                  <Text color={theme.primaryText} className={styles.boldText}>Reference</Text>
                  <Text color={theme.grayText} className={styles.description}>(0 / 45 Chars.)</Text>
                  <Tooltip label="Phone number" fontSize="md" placement="right">
                    <span className={styles.question}>?</span>
                  </Tooltip>
                </div>
                <Input className={styles.textInput} />
              </div>
              <div>
                <div className={styles.inputDiv}>
                  <Text color={theme.primaryText} className={styles.boldText}>File hash</Text>
                  <Text color={theme.grayText} className={styles.description}>- No file is sent or stored online unless you choose IPFS option.</Text>
                </div>
                <Input className={styles.textInput} />
              </div>
              <Checkbox className={styles.checkbox}>
                <div className={styles.inputDiv}>
                  <Text color={theme.primaryText} className={styles.boldText}>Store file on IPFS</Text>
                  <Text color={theme.grayText} className={styles.description}>(10MB max)</Text>
                  <Tooltip label="Fill will be public and permanently stored on IPFS, this is not a personal storage. Always keep your own copy and don't use it for sensitive/private files." fontSize="md" placement="right">
                    <span className={styles.question}>?</span>
                  </Tooltip>
                </div>
              </Checkbox>
            </div>
          </div>
          <div className={styles.feeContainer}>
            <div className={styles.lockContainer}>
              <FaLock color="white" />
            </div>
            <Text className={styles.transactionText}>This transaction is secure and will open Waves Signer</Text>
            <div className={styles.comboDiv}>
              <Text color={theme.grayText} className={styles.feeText}>Transaction fee:</Text>
              <Select>
                <option value="option1">50 SIGN</option>
                <option value="option2">0.005 WAVES</option>
              </Select>
            </div>
            <div className={styles.comboDiv}>
              <Text color={theme.grayText} className={styles.feeText}>Certification fee:</Text>
              <Text color={theme.primaryText} className={styles.primaryText}>310.00569738 SIGN(0.5$)</Text>
            </div>
            <Button>CERTIFY FILE</Button>
          </div>
        </div>
      </div>
    </div>
  )
}