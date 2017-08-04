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
    const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentMounthNumber = parseInt(moment().format('MM')) - 1;
    return mL[currentMounthNumber];
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
    const unicTransactions = this.Helpers.sumSameDateTransactions(transactions);
    const today = new Date();
    let amount = 0;

    if(unicTransactions && unicTransactions.length > 0) {
      amount = unicTransactions.reduce((sum, transaction) => {
        return sum += transaction.money;
      }, 0) / unicTransactions.length;
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
          <h6 className="result">{transactions.length}</h6>
        </div>
        <div className="result-wrapper">
          <h6 className="result-item">{staticContent[lang]['transactions-results'].bigTrans}</h6>
          <div className="dots"></div>
          <h6 className="result">{this.getMaxValue(transactions)}</h6>
        </div>
        <div className="result-wrapper">
          <h6 className="result-item">{staticContent[lang]['transactions-results'].amount}</h6>
          <div className="dots"></div>
          <h6 className="result">{amount.toFixed(2)} RUB {staticContent[lang]['transactions-results'].perDay}</h6>
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
