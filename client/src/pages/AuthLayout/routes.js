import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import Overview from 'pages/Overview'
import Receive from 'pages/Manage/Receive'
import Send from 'pages/Manage/Send'
import MassTransfer from 'pages/Manage/MassSend'
import FileCertify from 'pages/Certification/File'
import EmailCertify from 'pages/Certification/Email'
import MutualCertify from 'pages/Certification/Mutual'
import HashDealzExplorer from 'pages/Auction/HashDealz/Explorer'
import HashDealzCreate from 'pages/Auction/HashDealz/Create'
import ArtNFTsExplorer from 'pages/Auction/ArtNFTs/Explorer'
import ArtNFTsCreate from 'pages/Auction/ArtNFTs/Create'
import SportNFTsExplorer from 'pages/Auction/SportNFTs/Explorer'
import SportNFTsCreate from 'pages/Auction/SportNFTs/Create'
import MusicEventsNFTsExplorer from 'pages/Auction/MusicEventsNFTs/Explorer'
import MusicEventsNFTsCreate from 'pages/Auction/MusicEventsNFTs/Create'
import GameNFTsExplorer from 'pages/Auction/GameNFTs/Explorer'
import GameNFTsCreate from 'pages/Auction/GameNFTs/Create'
import ForexNFTsExplorer from 'pages/Auction/ForexNFTs/Explorer'
import ForexNFTsCreate from 'pages/Auction/ForexNFTs/Create'
import Defi from 'pages/Defi'
import Stake from 'pages/Defi/Stake'
import Loans from 'pages/Defi/Loan'
import RepayLoan from 'pages/Defi/RepayLoan'

function AuthRoutes() {
  return (
    <Switch>
      {/*Overview*/}
      <Route path={'/overview'} exact component={Overview} />
      {/* Manage Tokens */}
      <Route path={'/manage/send'} exact component={Send} />
      <Route path={'/manage/receive'} exact component={Receive} />
      <Route path={'/manage/mass'} exact component={MassTransfer} />
      {/* Certification Tools */}
      <Route path={'/certify/file'} exact component={FileCertify} />
      <Route path={'/certify/email'} exact component={EmailCertify} />
      <Route path={'/certify/mutual'} exact component={MutualCertify} />
      {/*Auction Tools*/}
      {/*Auction Art NFTs*/}
      <Route path={'/auction/artnfts/explorer'} exact component={ArtNFTsExplorer} />
      <Route path={'/auction/artnfts/create'} exact component={ArtNFTsCreate} />
      {/*Auction HashDealz*/}
      <Route path={'/auction/hashdealz/explorer'} exact component={HashDealzExplorer} />
      <Route path={'/auction/hashdealz/create'} exact component={HashDealzCreate} />
      {/*Auction SportNFTs*/}
      <Route path={'/auction/sportnfts/explorer'} exact component={SportNFTsExplorer} />
      <Route path={'/auction/sportnfts/create'} exact component={SportNFTsCreate} />
      {/*Auction Music/EventsNFTs*/}
      <Route path={'/auction/musiceventsnfts/explorer'} exact component={MusicEventsNFTsExplorer} />
      <Route path={'/auction/musiceventsnfts/create'} exact component={MusicEventsNFTsCreate} />
      {/*Auction GameNFTs*/}
      <Route path={'/auction/gamenfts/explorer'} exact component={GameNFTsExplorer} />
      <Route path={'/auction/gamenfts/create'} exact component={GameNFTsCreate} />
      {/*Auction ForexNFTs*/}
      <Route path={'/auction/forexnfts/explorer'} exact component={ForexNFTsExplorer} />
      <Route path={'/auction/forexnfts/create'} exact component={ForexNFTsCreate} />
      {/*Staking*/}
      <Route path={'/defi'} exact component={Defi} />
      <Route path={'/defi/stake'} exact component={Stake} />
      <Route path={'/defi/loan'} exact component={Loans} />
      <Route path={'/defi/repayloan'} exact component={RepayLoan} />
      {/*NotFound*/}
      <Route render={() => <Redirect to='/' />} />
    </Switch>
  )
}

export default AuthRoutes