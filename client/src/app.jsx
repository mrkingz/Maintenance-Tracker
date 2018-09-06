import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import decode from 'jwt-decode';
import store from './js/store';
import Routes from './routes';
import actionTypes from '../src/js/actions/actionTypes';

import '../assets/css/bootstrap.css';
import '../assets/css/style.css';
import '../assets/css/carousel.css';

import '../assets/js/script';

import setAuthenticationToken from '../../client/src/utils/setAuthorizationToken';
import validateToken from '../../client/src/utils/validateToken';

if (validateToken(localStorage.getItem('token'))) {
  setAuthenticationToken(localStorage.token);
  const user = decode(localStorage.token).user;
  store.dispatch({
    type: actionTypes.SET_CURRENT_USER,
    payload: { user }
  });
} else {
  store.dispatch({
    type: actionTypes.SIGNOUT_USER,
    payload: {}
  });
}


ReactDom.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
);