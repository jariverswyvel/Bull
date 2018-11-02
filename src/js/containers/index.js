import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader';
import Routes from '../routes';

const App = () => {
  return (
    <Fragment>
      <Routes />
    </Fragment>
  );
};

export default hot(module)(App);
