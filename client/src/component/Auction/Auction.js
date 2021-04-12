import React, {useContext, useEffect, useRef, useState} from 'react';
import { Button, Tooltip } from '@chakra-ui/react';
import cx from 'classnames';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import ThemeContext from 'context/UserContext';
import styles from './Auction.module.scss';
import WavesConfig from 'config/waves';
import WavesUtils from 'utils/waves';
import ApiUtils from 'utils/api';
import AlertUtils from 'utils/alert';

function AuctionTx({detail, owner, height, filter}) {
  const {theme} = useContext(ThemeContext);
  const clipboard = useRef(null);
  const isOwner = detail.winner ? owner === detail.winner : owner === detail.organizer
  const isOutdated = detail.end_block <= height
  const [bid, setBid] = useState('')
  const [nft, setNFT] = useState({
    name: '',
    decimals: 0,
    description: ''
  })
  const [price, setPrice] = useState({
    name: '',
    decimals: 0,
    description: ''
  })

  useEffect(() => {
    ApiUtils.getAssetInfo(detail.nft_id, setNFT)
    ApiUtils.getAssetInfo(detail.price_id, setPrice)
  }, [detail.nft_id, detail.price_id])

  const Badge = ({text, color}) => {
    return (
      <div className={styles.badge} style={{backgroundColor: color || theme.buttonBack}}>
        {text}
      </div>
    )
  }

  const Withdraw = () => {
    WavesUtils.WithdrawAuction(detail.id)
    AlertUtils.SystemAlert("NFT successfully withdraw")
  }

  const Bid = () => {
    if(isNaN(bid) || bid <= 0) {
      AlertUtils.SystemAlert('Bid amount is not valid');
        return;
    }
    AlertUtils.SystemAlert('Buying and Selling NFT are subject to risk so better you will do your own research before buying. Be aware of scam assets as we are only a platform to provide services')
    WavesUtils.BidAuction(detail.id, bid, detail.price_id)
    AlertUtils.SystemAlert("You have successfully placed a bid. When someone else places a higher bid, your bid will be returned back to you")
  }

  return (
    <div
      className={styles.auction}
      style={{backgroundColor: theme.itemBackground, color: theme.primaryText, display: (!filter || nft.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) ? 'block' : 'none'}}
    >
      <div className={styles.row}>
        <span className={styles.label}>Auction ID:</span>
        <span className={cx(styles.value, styles.smaller)}>{detail.id}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>NFT Asset:</span>
        <span className={styles.value}>
          {detail.nft_amount / (10 ** nft.decimals)} <b>{nft.name}</b>
          <Tooltip placement="right" label={nft.description}>
            <span className={styles.question} style={{backgroundColor: theme.manageTokenHighlight}} onClick={() => clipboard.current.click()}>
              ?
            </span>
          </Tooltip>
          <CopyToClipboard text={WavesConfig.EXPLORER_URL + '/assets/' + detail.nft_id}>
            <span ref={clipboard}></span>
          </CopyToClipboard>
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Min Price:</span>
        <span className={styles.value}>{detail.price / (10 ** price.decimals)} <b>{price.name}</b></span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Current Bid:</span>
        <span className={styles.value}>{detail.bid / (10 ** price.decimals) || '?'} <b>{price.name}</b></span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Current Winner:</span>
        <span className={cx(styles.value, styles.smaller)}>{detail.winner || '?'}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Time Left:</span>
        <span className={styles.value}>~ {detail.end_block >= height ? detail.end_block - height : 0} <b>minutes</b></span>
      </div>
      {/* {
        detail.avatar ?
          <div className={styles.row}>
            <img src={`https://ipfs.io/ipfs/${detail.avatar}`} alt="" className={styles.avatar} />
          </div>
        :
          null
      } */}
      {
        detail.operator ?
          isOwner?  <Badge text="Withdrawn" color="#0000ff" />
          :         <Badge text="SoldOut" color="#0000ff"/>
        :
          <>
            {
              detail.end_block <= height ? <Badge text="Expired Auction" color="#ee0000" />
              : <Badge text="Running" color="#008800" />
            }
            {
              isOwner?
                <div className={styles.withdraw}>
                  <Button
                    className={styles.clickable}
                    style={{backgroundColor: theme.buttonBack}}
                    disabled={!isOutdated}
                    onClick={Withdraw}
                  >
                    Withdraw
                  </Button>
                </div>
              :
                <div className={styles.placebid}>
                  <input
                    value={bid}
                    onChange={(e) => setBid(e.target.value)}
                    className={styles.bidinput}
                    style={{backgroundColor: theme.itemBackground}}
                    disabled={isOutdated}
                  />
                  <Button
                    className={styles.clickable}
                    style={{backgroundColor: theme.buttonBack, color: 'white'}}
                    disabled={isOutdated}
                    onClick={Bid}
                  >
                    Bid
                  </Button>
                </div>
            }
          </>
          
      }
    </div>
  )
}

export default AuctionTx;