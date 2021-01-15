import React from 'react';
import { Route, Switch,  BrowserRouter } from 'react-router-dom';

import Main from 'pages/Main/Main';
import Certify from 'pages/Certify/Certify';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/'} exact component={Main} />
        <Route path={'/certify'} exact component={Certify} />
      </Switch>
    </BrowserRouter>
  )
}