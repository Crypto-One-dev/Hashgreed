import React, {useContext, useEffect, useState} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {FaDownload, FaPaste, FaUser} from 'react-icons/all';
import QRCode from 'qrcode.react';
import Transaction from 'component/Transaction/Transaction';
import ThemeContext from 'context/UserContext';
import walletContainer from 'redux/containers/wallet';
import ApiUtils from 'utils/api';
import styles from './Receive.module.scss';

function Receive({walletState}) {
  const {theme} = useContext(ThemeContext);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    let interval = -1
    if(walletState.address) {
      const proc = () => {
        ApiUtils.getReceiveTransactions(walletState.address, setTransactions);
      }
      proc()
      interval = setInterval(proc, 60000)
    }
  
    return () => {
      if(interval > -1) {
        clearInterval(interval)
      }
    }
  }, [walletState.address])

  const downloadQR = () => {
    const canvas = document.getElementById("ADDRESS");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "yourQrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <div className={styles.main}>
      <div className={styles.header} style={{backgroundColor: theme.primaryColor}}>DEPOSIT RKMT</div>
      <div className={styles.info}>
        <QRCode value={walletState.address} includeMargin={true} size={164} id="ADDRESS" />
        <div className={styles.address}>
          <div className={styles.balance}>
            You have: <span style={{color: theme.manageTokenHighlight, fontWeight: 'bold'}}>{walletState.rkmt_balance}</span> RKMT
          </div>
          <div className={styles.status}>
            <div className={styles.label} style={{backgroundColor: theme.buttonBack, color: '#ffffff'}}>
              <FaUser className={styles.icon} />
              Your address
            </div>
            <div className={styles.value} style={{backgroundColor: theme.itemBackground, color: theme.manageTokenHighlight, borderColor: theme.manageTokenHighlight}}>
              {walletState.address}
            </div>
          </div>
          <div className={styles.buttons} style={{color: theme.primaryText}}>
            <CopyToClipboard text={walletState.address}>
              <span className={styles.button} style={{marginRight: 30}}>
                <FaPaste className={styles.icon} style={{color: theme.manageTokenHighlight}} />
                Copy address
              </span>
            </CopyToClipboard>
            <div className={styles.button} onClick={downloadQR}>
              <FaDownload className={styles.icon} style={{color: theme.manageTokenHighlight}} />
              Download QRCODE
            </div>
          </div>
        </div>
      </div>
      <div className={styles.header} style={{backgroundColor: theme.primaryColor}}>DEPOSIT HISTORY</div>
      <div className={styles.subheader} style={{color: theme.primaryText}}>Here is your latest incoming transaction</div>
      <div className={styles.transactions}>
        {transactions.map((transfer, index) => (
          <Transaction key={index} detail={transfer} owner={walletState.address} />
        ))}
      </div>
    </div>
  )
}

export default walletContainer(Receive);