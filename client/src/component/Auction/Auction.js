import React, {useContext, useEffect, useRef, useState} from 'react';
import { Button, Tooltip } from '@chakra-ui/react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import ThemeContext from 'context/UserContext';
import styles from './Auction.module.scss';
import WavesConfig from 'config/waves';
import WavesUtils from 'utils/waves';
import ApiUtils from 'utils/api';

function AuctionTx({detail, owner, height}) {
  const {theme} = useContext(ThemeContext);
  const clipboard = useRef(null);
  const isOwner = owner === detail.organizer
  const isOutdated = detail.end_block <= height
  const [bid, setBid] = useState('')
  const [nft, setNFT] = useState({
    name: detail.nft_id,
    decimals: 0
  })
  const [price, setPrice] = useState({
    name: detail.price_id,
    decimals: 0
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
        <span className={styles.label}>ID:</span>
        <span className={styles.value}>{detail.id}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>NFT Asset:</span>
        <span className={styles.value}>
          {nft.name}
          <Tooltip placement="right" label="Buying and Selling NFT are subject to risk so better you will do your own research before buying. Be aware of scam assets as we are only a platform to provide services">
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
        <span className={styles.label}>NFT Asset Amount:</span>
        <span className={styles.value}>{detail.nft_amount / (10 ** nft.decimals)}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Price Asset:</span>
        <span className={styles.value}>{price.name}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Min Price:</span>
        <span className={styles.value}>{detail.price / (10 ** price.decimals)}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Current Bid:</span>
        <span className={styles.value}>{detail.bid / (10 ** price.decimals) || '?'}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Current Winner:</span>
        <span className={styles.value}>{detail.winner || '?'}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Time Left:</span>
        <span className={styles.value}>{detail.end_block >= height ? detail.end_block - height : 0}</span>
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