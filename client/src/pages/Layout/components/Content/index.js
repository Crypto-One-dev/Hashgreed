import React from 'react'
import {Route, Switch} from 'react-router-dom'

import AuthLayout from 'pages/AuthLayout'
import Main from 'pages/Main'
import Verification from 'pages/Verification/VerificationExplorer'

const VerificationExplorer = () => <Verification/>

function Content() {
  return (
    <Switch>
      <Route path={'/'} exact component={Main} />
      <Route path={'/explorer'} exact component={Verification} />
      <Route path={'/explorer/:txid'} component={Verification} />
      <Route component={AuthLayout} />
    </Switch>
  )
}

export default Content