import React from 'react'
import {Route, Switch} from 'react-router-dom'

import AuthLayout from 'pages/AuthLayout'
import Main from 'pages/Main'

const VerificationExplorer = () => <div>VerificationExplorer</div>

function Content() {
  return (
    <Switch>
      <Route path={'/'} exact component={Main} />
      <Route path={'/explorer'} exact component={VerificationExplorer} />
      <Route path={'/explorer/:txid'} component={VerificationExplorer} />
      <Route component={AuthLayout} />
    </Switch>
  )
}

export default Content