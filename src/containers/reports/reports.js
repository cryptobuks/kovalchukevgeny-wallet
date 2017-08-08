import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import Panel from './../../components/panel/panel.jsx';
import Button from './../../components/button/button.jsx';
import Helpers from './../../helpers/Helpers';

import staticContent from './../../static-content/languages.json'; // eslint-disable-line import/namespace

class Reports extends Component {
  constructor(props) {
    super(props);

    this.Helpers = new Helpers();

    this.reMapTransactions = this.reMapTransactions.bind(this);
    this.renderMonthPanels = this.renderMonthPanels.bind(this);
    this.renderMonthTable = this.renderMonthTable.bind(this);
    this.openMonth = this.openMonth.bind(this);
  }

  openMonth(event) {
    event.currentTarget.parentNode.parentNode.classList.toggle("expanded");
  }

  reMapTransactions(transactions) {
    let arrTrans = []
    for(let i = 0; i < 12; i++) {
      let res = transactions.filter(transaction => {
        return moment(transaction.date).month() === i+1;
      });
      if(res && res.length > 0) {
        arrTrans[i] = res;
      } else {
        arrTrans[i] = [];
      }
    }
    return arrTrans;
  }

  renderMonthTable(transactions) {
    return transactions.map((transaction, i) => {
      const date = this.Helpers.formatDate(transaction.date);

      return (
        <div className="table-row clearfix" key={i} data-row={transaction.id}>
          <div className="table-data clearfix">{date}</div>
          <div className="table-data clearfix">{transaction.money}</div>
          <div className="table-data clearfix">{transaction.description}</div>
          <div className="table-data clearfix">{transaction.category}</div>
        </div>
      );
    });
  }

  renderMonthPanels(reMapedTransactions) {
    const { lang } = this.props;

    return reMapedTransactions.map((reMapedTransaction, i) => {
      const unicTransactions = this.Helpers.sumSameDateTransactions(reMapedTransaction);
      let amount = 0;

      if(reMapedTransaction && reMapedTransaction.length > 0) {
        amount = unicTransactions.reduce((sum, transaction) => {
          return sum += transaction.money;
        }, 0) / unicTransactions.length;
      }

      const tableHead = staticContent[lang]['transactions-table']['tableHead'].map((headItem, i) => {
        return (
          <div key={i} className="table-data">
            {staticContent[lang]['transactions-table']['tableHead'][i]}
          </div>
        );
      });

      return (
        <div key={i} data-month={staticContent[lang]['months'][i+1]}>
          {reMapedTransaction.length > 0 &&
            <Panel
              specialClass="panel-primary tr-table"
              onClickFunction={this.openMonth}
              heading={`${staticContent[lang]['months'][i+1]} ${moment(reMapedTransaction.date).year()}`}
            >
              <div className="table transactions">
                <div className="table-head clearfix">
                  <div className="table-row clearfix">
                    {tableHead}
                  </div>
                </div>
                <div className="table-body clearfix">
                  {this.renderMonthTable(reMapedTransaction)}
                </div>
              </div>
              <div className="text-right amount-wrapper">
                <h5 className="amount">
                  <span>{amount.toFixed(2)}</span> RUB
                </h5>
              </div>
            </Panel>
          }
        </div>
      );
    });
  }

  render() {
    let { transactions, categories } = this.props;

    const reMapedTransactions = this.reMapTransactions(transactions);
    return (
      <div className="container reports">
        <div className="row">
          <div className="col-md-12">
            {this.renderMonthPanels(reMapedTransactions)}
          </div>
        </div>
      </div>
    );
  }
}

Reports.propTypes = {
  categories: PropTypes.array,
  transactions: PropTypes.array,
  lang: PropTypes.string
};

export default connect(state => ({
  transactions: state.transactions,
  categories: state.categories,
  lang: state.lang
}))(Reports);
