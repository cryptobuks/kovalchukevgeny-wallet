import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Helpers from './../../helpers/Helpers';
import Panel from './../panel/panel.jsx';

class TransactionsResults extends Component {
  constructor(props) {
    super(props);

    this.Helpers = new Helpers();

    this.getCurrentMonth = this.getCurrentMonth.bind(this);
    this.getMaxValue = this.getMaxValue.bind(this);
  }

  getCurrentMonth() {
    const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentMounthNumber = parseInt(moment().format('MM')) - 1;
    return mL[currentMounthNumber];
  }

  getMaxValue(array) {
    return Math.max.apply(Math,array.map(function(transaction){return transaction.money;}))
  }

  render() {
    const { transactions } = this.props;
    const unicTransactions = this.Helpers.sumSameDateTransactions(transactions);
    const today = new Date();

    const amount = unicTransactions.reduce((sum, transaction) => {
      return sum += transaction.money;
    }, 0) / unicTransactions.length;

    return (
      <Panel
        specialClass="panel-success results"
        heading="Month results"
      >
        <div className="result-wrapper">
          <h6 className="result-item">Month:</h6>
          <div className="dots"></div>
          <h6 className="result">{this.getCurrentMonth()}</h6>
        </div>
        <div className="result-wrapper">
          <h6 className="result-item">Transactions:</h6>
          <div className="dots"></div>
          <h6 className="result">{transactions.length}</h6>
        </div>
        <div className="result-wrapper">
          <h6 className="result-item">The biggest transaction:</h6>
          <div className="dots"></div>
          <h6 className="result">{this.getMaxValue(transactions)}</h6>
        </div>
        <div className="result-wrapper">
          <h6 className="result-item">Amount:</h6>
          <div className="dots"></div>
          <h6 className="result">{amount.toFixed(2)} RUB per day</h6>
        </div>
      </Panel>
    );
  }
}

TransactionsResults.defaultProps = {
  transactions: []
};

TransactionsResults.propTypes = {
  transactions: PropTypes.array
};

export default TransactionsResults;
