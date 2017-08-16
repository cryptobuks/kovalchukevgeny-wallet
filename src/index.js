/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';

import App from './containers/app/App.js';
import Categories from './containers/categories/categories';
import Statistics from './containers/statistics/statistics';
import Transactions from './containers/transactions/transactions';
import Reports from './containers/reports/reports';
import ErrorPage from './components/error-page/error-page';

import './styles/main.scss';

import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Redirect from="/" to="/transactions" />
      <Route path="/" component={App}>
        <Route path="/transactions" component={Transactions} />
        <Route path="/categories" component={Categories} />
        <Route path="/statistics" component={Statistics} />
        <Route path="/reports" component={Reports} />
        <Route path="*" component={ErrorPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
