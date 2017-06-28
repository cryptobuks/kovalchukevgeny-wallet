/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';
import App from './containers/app/App.js';
import Categories from './containers/categories/categories';
import './styles/vendor/mdl/material.js';
import './styles/main.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="categories" component={Categories} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
