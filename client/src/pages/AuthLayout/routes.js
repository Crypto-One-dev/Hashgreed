import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

const Overview = () => <div>Overview</div>
const Send = () => <div>Send</div>
const Receive = () => <div>Receive</div>
const MassTransfer = () => <div>MassTransfer</div>
const FileCertify = () => <div>FileCertify</div>
const EmailCertify = () => <div>EmailCertify</div>
const MutualCertify = () => <div>MutualCertify</div>
const AuctionExplorer = () => <div>AuctionExplorer</div>
const AuctionCreate = () => <div>AuctionCreate</div>
const Stake = () => <div>Stake</div>

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
      <Route path={'/auction//explorer'} exact component={AuctionExplorer} />
      <Route path={'/auction/create'} exact component={AuctionCreate} />
      {/*Staking*/}
      <Route path={'/stake'} exact component={Stake} />
      {/*NotFound*/}
      <Route render={() => <Redirect to='/' />} />
    </Switch>
  )
}

export default AuthRoutes