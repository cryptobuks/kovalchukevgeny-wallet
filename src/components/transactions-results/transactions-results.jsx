import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Helpers from './../../helpers/Helpers';
import Panel from './../panel/panel.jsx';

import staticContent from './../../static-content/languages.json'; // eslint-disable-line import/namespace

class TransactionsResults extends Component {
  constructor(props) {
    super(props);

    this.Helpers = new Helpers();

    this.getCurrentMonth = this.getCurrentMonth.bind(this);
    this.getMaxValue = this.getMaxValue.bind(this);
  }

  getCurrentMonth() {
    const { lang } = this.props;
    return staticContent[lang]['months'][moment().month()];
  }

  getMaxValue(array) {
    if(array && array.length > 0) {
      return Math.max.apply(Math,array.map(function(transaction){return transaction.money;}));
    } else {
        return 0;
    }
  }

  render() {
    const { transactions, lang } = this.props;
    const today = new Date();
    let amountDay = 0;
    let amountMonth = 0;

    // Filter transactions on current month
    const monthTransactions = transactions.filter(transaction => {
      return moment().month() === moment(transaction.date).month();
    });

    const unicTransactions = this.Helpers.sumSameDateTransactions(monthTransactions);

    if(unicTransactions && unicTransactions.length > 0) {
      amountDay = unicTransactions.reduce((sum, transaction) => {
        return sum += transaction.money;
      }, 0) / unicTransactions.length;
      amountMonth = unicTransactions.reduce((sum, transaction) => {
        return sum += transaction.money;
      }, 0);
    }

    return (
      <Panel
        specialClass="panel-success results"
        heading={staticContent[lang]['transactions-results'].head}
      >
        <div className="result-wrapper">
          <h6 className="result-item">{staticContent[lang]['transactions-results'].month}</h6>
          <div className="dots"></div>
          <h6 className="result">{this.getCurrentMonth()}</h6>
        </div>
        <div className="result-wrapper">
          <h6 className="result-item">{staticContent[lang]['transactions-results'].transactions}</h6>
          <div className="dots"></div>
          <h6 className="result">{monthTransactions.length}</h6>
        </div>
        <div className="result-wrapper">
          <h6 className="result-item">{staticContent[lang]['transactions-results'].bigTrans}</h6>
          <div className="dots"></div>
          <h6 className="result">{this.getMaxValue(monthTransactions)}</h6>
        </div>
        <div className="result-wrapper">
          <h6 className="result-item">{staticContent[lang]['transactions-results'].amountMonth}</h6>
          <div className="dots"></div>
          <h6 className="result">{amountMonth.toFixed(2)} RUB</h6>
        </div>
        <div className="result-wrapper">
          <h6 className="result-item">{staticContent[lang]['transactions-results'].amountDay}</h6>
          <div className="dots"></div>
          <h6 className="result">{amountDay.toFixed(2)} RUB</h6>
        </div>
      </Panel>
    );
  }
}

TransactionsResults.defaultProps = {
  transactions: []
};

TransactionsResults.propTypes = {
  transactions: PropTypes.array,
  lang: PropTypes.string
};

export default TransactionsResults;
