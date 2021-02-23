import React from 'react';
import { Route, Switch,  BrowserRouter } from 'react-router-dom';

import Main from 'pages/Main/Main';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/'} exact component={Main} />
        <Route path={'/explorer'} exact component={Main} />
        <Route path={'/explorer/:txid'} component={Main} />
      </Switch>
    </BrowserRouter>
  )
}