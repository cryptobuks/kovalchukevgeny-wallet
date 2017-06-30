import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import AddingPanel from './../../components/adding-panel/adding-panel.jsx';
import TransactionsTable from './../../components/transactions-table/transactions-table.jsx';

class Transactions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <AddingPanel />
            <TransactionsTable />
          </div>
        </div>
      </div>
    );
  }
}

Transactions.propTypes = {

};

export default Transactions;
