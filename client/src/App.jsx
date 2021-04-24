import clsx from 'clsx';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Room } from './pages/Room';

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <div className={clsx('jumbotron', 'bg-light', 'container')}>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/rooms/:roomId">
            <Room />
          </Route>
        </div>
      </Switch>
    </BrowserRouter>
  );
}
