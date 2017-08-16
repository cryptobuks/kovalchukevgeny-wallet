import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

import Helpers from './../../helpers/Helpers';

import Icon from './../../components/icon/icon.jsx';
import TransactionsFilter from './../../components/transactions-filter/transactions-filter.jsx';
import Button from './../../components/button/button.jsx';

import { changeCategory } from './../../actions/actionCreators';

import staticContent from './../../static-content/languages';

import LoadingHOC from './../../HOC/loadingHOC.jsx';

class Reports extends Component {
  constructor(props) {
    super(props);

    this.Helpers = new Helpers();

    this.convertToCSV = this.convertToCSV.bind(this);
    this.isCategoryActive = this.isCategoryActive.bind(this);
    this.reMapTransactions = this.reMapTransactions.bind(this);
    this.renderMonthPanels = this.renderMonthPanels.bind(this);
    this.renderMonthTable = this.renderMonthTable.bind(this);
    this.openMonth = this.openMonth.bind(this);
    this.filteredTransactions = this.filteredTransactions.bind(this);
  }

  convertToCSV(objArray) {
    const { lang } = this.props;
    objArray = objArray.map(item => {
      item.date = moment(item.date).format('DD/MM/YYYY');
      return item;
    });
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = staticContent[lang]['csvTableHead']; // table head
    // TODO: Rewrite to forEach or map
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in array[i]) {
        if(index !== 'id') { // ignore ids in final table
          if (line != '') line += ',';
          line += array[i][index];
        }
      }
      str += line + '\r\n';
    }
    return str;
  }

  download(format, event) {
    let { transactions } = this.props;
    let contents = format === 'json' ? JSON.stringify(transactions) :
    this.convertToCSV(transactions);
    const URL = window.URL || window.webkitURL;
    const blob = new Blob(['\ufeff' + contents], {type: `text/${format};charset=utf-8;`});
    event.target.href = URL.createObjectURL(blob);
    event.target.download = 'report.' + format;
  }

  isCategoryActive(category) {
    const { changeCategory } = this.props;
    let { id, description, title, icon, filter } = category;
    filter = !filter;
    changeCategory(id, description, title, icon, filter);
  }

  openMonth(event) {
    event.currentTarget.parentNode.parentNode.classList.toggle("expanded");
  }

  reMapTransactions(transactions) {
    let arrTrans = [];
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

  filteredTransactions(transactions) {
    const { categories } = this.props;
    transactions = transactions.filter(transaction => {
      for(let i = 0; i < categories.length; i++) {
        if(transaction.category === categories[i].title) {
          if(categories[i].filter === true) {
            return transaction;
          }
        }
      }
    });
    return transactions;
  }

  renderMonthTable(transactions) {
    return transactions.map((transaction, i) => {
      return (
        <div className="table-row clearfix" key={i} data-row={transaction.id}>
          <div className="table-data clearfix">{moment(transaction.date).format('DD/MM/YYYY')}</div>
          <div className="table-data clearfix">{transaction.money}</div>
          <div className="table-data clearfix" title={transaction.description}>{transaction.description}</div>
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
      let amountMonthCurrency = 0;
      let monthCourse = { course: 1 };

      if(reMapedTransaction && reMapedTransaction.length > 0) {
        amountDay = unicTransactions.reduce((sum, transaction) => {
          return sum += transaction.money;
        }, 0) / unicTransactions.length;
        amountMonth = unicTransactions.reduce((sum, transaction) => {
          return sum += transaction.money;
        }, 0);
      }

      if(unicTransactions[0]) {
        monthCourse = course.filter(courseItem => {
          return moment(courseItem.date).format('YYYY-MM') === moment(unicTransactions[0].date).format('YYYY-MM');
        })[0] || { course: 1 };
      }

      amountMonthCurrency = amountMonth / monthCourse.course;

      const tableHead = staticContent[lang]['reports']['tableHead'].map((headItem, i) => {
        return (
          <div key={i} className="table-data">
            {staticContent[lang]['reports']['tableHead'][i]}
          </div>
        );
      });

      return (
        <div key={i} data-month={staticContent[lang]['months'][i+1]}>
          {reMapedTransaction.length > 0 &&
            <div className="panel panel-primary tr-table">
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
                      {staticContent[lang]['currency']} /
                      <span>{amountMonthCurrency.toFixed(2)}</span>$
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
    let { transactions, categories, lang } = this.props;

    const reMapedTransactions = this.reMapTransactions(this.filteredTransactions(transactions));
    return (
      <div className="container reports">
        <TransactionsFilter
          isCategoryActive={this.isCategoryActive}
        />
        <div className="row">
          <div className="col-md-12">
            {this.renderMonthPanels(reMapedTransactions)}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6">
          {transactions.length > 0 &&
            <div className="toolbar">
              <Button
                onClickFunction={this.download.bind(this, 'json')}
                specialClass="btn btn-primary"
                href="report.json"
              >{staticContent[lang]['reports'].btnJson}</Button>
              <Button
                onClickFunction={this.download.bind(this, 'csv')}
                specialClass="btn btn-primary"
                href="report.csv"
              >{staticContent[lang]['reports'].btnCsv}</Button>
            </div>
          }
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
  course: PropTypes.array,
  changeCategory: PropTypes.func
};

export default connect(state => ({
  transactions: state.transactions,
  categories: state.categories,
  lang: state.lang,
  course: state.course
}), { changeCategory })(LoadingHOC('transactions')(Reports));
