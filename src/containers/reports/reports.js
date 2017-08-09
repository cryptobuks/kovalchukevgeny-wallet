import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import Helpers from './../../helpers/Helpers';
import Icon from './../../components/icon/icon.jsx';

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
        return moment(transaction.date).month() === i;
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
    let { lang, course } = this.props;

    return reMapedTransactions.map((reMapedTransaction, i) => {
      const unicTransactions = this.Helpers.sumSameDateTransactions(reMapedTransaction);
      let amountDay = 0;
      let amountMonth = 0;

      if(reMapedTransaction && reMapedTransaction.length > 0) {
        amountDay = unicTransactions.reduce((sum, transaction) => {
          return sum += transaction.money;
        }, 0) / unicTransactions.length;
        amountMonth = unicTransactions.reduce((sum, transaction) => {
          return sum += transaction.money;
        }, 0);
      }

      let monthCourse = {
        course: 1
      }

      if(unicTransactions[0]) {
        monthCourse = course.filter(courseItem => {
          return courseItem.date === moment(unicTransactions[0].date).format('YYYY-MM');
        })[0] || { course: 1 };
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
            <div className='panel panel-primary tr-table'>
              <div
                onClick={(e) => this.openMonth(e)}
                className="panel-heading clearfix">
                <h3 className="panel-title left">
                  {`${staticContent[lang]['months'][i]} ${moment(reMapedTransaction.date).year()}`}
                </h3>
                <h3 className="panel-title right">
                  <Icon type="fa" icon="fa-caret-square-o-down" />
                </h3>
              </div>
              <div className="panel-body">
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
              </div>
              <div className="panel-footer">
                <h3 className="panel-title">
                  <div className="text-right amount-wrapper">
                    <h5 className="amount">
                      {staticContent[lang]['reports']['amountMonth']}
                      <span>{amountMonth.toFixed(2)}</span>
                      {staticContent[lang]['currency']}
                    </h5>
                    <h5 className="amount">
                      {staticContent[lang]['reports']['amountDay']}
                      <span>{amountDay.toFixed(2)}</span>
                      {staticContent[lang]['currency']}
                    </h5>
                    <h5 className="amount">
                      {staticContent[lang]['reports']['monthCourse']}
                      <span>{monthCourse.course.toFixed(2)}</span>
                      {staticContent[lang]['currency']}
                    </h5>
                  </div>
                </h3>
              </div>
            </div>
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
  lang: PropTypes.string,
  course: PropTypes.array
};

export default connect(state => ({
  transactions: state.transactions,
  categories: state.categories,
  lang: state.lang,
  course: state.course
}))(Reports);
