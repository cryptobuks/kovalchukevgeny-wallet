import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, Redirect } from 'react-router';

import App from './containers/app/App.js';
import Categories from './containers/categories/categories';
import Statistics from './containers/statistics/statistics';
import Transactions from './containers/transactions/transactions';
import Reports from './containers/reports/reports';
import ErrorPage from './components/error-page/error-page';
import Backup from './containers/backup/backup';
import CategoryEditor from './containers/category-editor/category-editor';

import './styles/main.scss';

import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Redirect from="/" to="/transactions" />
      <Route path="/" component={App}>
        <Route path="/transactions" component={Transactions} />
        <Route path="/categories" component={Categories} />
        <Route path="/categories/:id" component={CategoryEditor} />
        <Route path="/statistics" component={Statistics} />
        <Route path="/reports" component={Reports} />
        <Route path="/backup" component={Backup} />
        <Route path="*" component={ErrorPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
