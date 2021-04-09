import React, {useContext, useState} from 'react';
import { Button } from '@chakra-ui/react';

import ThemeContext from 'context/UserContext';
import styles from './Auction.module.scss';
import WavesUtils from 'utils/waves';

function AuctionTx({detail, owner, height}) {
  const {theme} = useContext(ThemeContext);
  const isOwner = owner === detail.organizer
  const isOutdated = detail.end_block <= height
  const [bid, setBid] = useState('')

  const Withdrawn = () => {
    return (
      <div className={styles.badge} style={{backgroundColor: theme.buttonBack}}>
        Withdrawn
      </div>
    )
  }

  const SoldOut = () => {
    return (
      <div className={styles.badge} style={{backgroundColor: theme.buttonBack}}>
        Sold Out
      </div>
    )
  }

  const Withdraw = () => {
    WavesUtils.WithdrawAuction(detail.id)
  }

  const Bid = () => {
    WavesUtils.BidAuction(detail.id, bid, detail.price_id)
  }

  return (
    <div
      className={styles.auction}
      style={{backgroundColor: theme.itemBackground, color: theme.primaryText}}
    >
      <div className={styles.row}>
        <span className={styles.label}>NFT Asset ID:</span>
        <span className={styles.value}>{detail.nft_id}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>NFT Asset Amount:</span>
        <span className={styles.value}>{detail.nft_amount}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Price Asset ID:</span>
        <span className={styles.value}>{detail.price_id}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Min Price:</span>
        <span className={styles.value}>{detail.price}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Current Bid:</span>
        <span className={styles.value}>{detail.bid || '?'}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Current Winner:</span>
        <span className={styles.value}>{detail.winner || '?'}</span>
      </div>
      {
        detail.operator ?
          isOwner?  <Withdrawn />
          :         <SoldOut />
        :
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
    </div>
  )
}

export default AuctionTx;