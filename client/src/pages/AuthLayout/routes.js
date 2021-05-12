import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import Overview from 'pages/Overview'
import Receive from 'pages/Manage/Receive'
import Send from 'pages/Manage/Send'
import MassTransfer from 'pages/Manage/MassSend'
import FileCertify from 'pages/Certification/File'
import EmailCertify from 'pages/Certification/Email'
import MutualCertify from 'pages/Certification/Mutual'
import AuctionExplorer from 'pages/Auction/Explorer'
import AuctionCreate from 'pages/Auction/Create'
import Stake from 'pages/Stake';

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
      <Route path={'/auction/explorer'} exact component={AuctionExplorer} />
      <Route path={'/auction/create'} exact component={AuctionCreate} />
      {/*Staking*/}
      <Route path={'/stake'} exact component={Stake} />
      {/*NotFound*/}
      <Route render={() => <Redirect to='/' />} />
    </Switch>
  )
}

export default AuthRoutes