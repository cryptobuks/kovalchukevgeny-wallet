import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import Helpers from './../../helpers/Helpers';

import Icon from './../../components/icon/icon.jsx';
import TransactionsFilter from './../../components/transactions-filter/transactions-filter.jsx';
import TransactionsTable from '../../components/transactions-table/transactions-table.jsx';
import ReportsGraph from './../../components/reports-graph/reports-graph.jsx';
import DownloadData from './../../components/download-data/download-data.jsx';
import ButtonToolbar from './../../components/button-toolbar/button-toolbar.jsx';
import Container from './../../components/container/container.jsx';
import Row from './../../components/row/row.jsx';
import Col from './../../components/col/col.jsx';

import {
  deleteTransaction,
  changeTransaction,
  updateCategory,
  changeAllCategories } from './../../actions/actionCreators';

import staticContent from './../../static-content/languages';

import LoadingHOC from './../../HOC/loadingHOC.jsx';

class Reports extends Component {
  constructor(props) {
    super(props);

    this.Helpers = new Helpers();

    this.openMonth = this.openMonth.bind(this);
  }

  openMonth(event) {
    event.currentTarget.parentNode.parentNode.classList.toggle('expanded');
  }

  renderMonthPanels(reMapedTransactions) {
    const { lang, course, categories, deleteTransaction, changeTransaction } = this.props;

    return reMapedTransactions.map((reMapedTransaction, i) => {
      const unicTransactions = this.Helpers.sumSameDateTransactions(reMapedTransaction);
      let amountDay = 0;
      let amountMonth = 0;
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
        monthCourse = course.find(courseItem => {
          return moment(courseItem.date).format('YYYY-MM') === moment(unicTransactions[0].date).format('YYYY-MM');
        }) || { course: 1 };
      }

      return (
        <div key={i} data-month={staticContent[lang]['months'][i+1]}>
          {reMapedTransaction.length > 0 &&
            <div className="panel panel-primary res-table">
              <div
                onClick={e => this.openMonth(e)}
                className="panel-heading clearfix"
              >
                <h3 className="panel-title left">
                  <Icon icon={'today'} />
                  {`${staticContent[lang]['months'][i]} ${moment(reMapedTransaction.date).year()}`}
                </h3>
                <h3 className="panel-title right">
                  <Icon icon="arrow_drop_down_circle" />
                </h3>
              </div>
              <div className="panel-body">
                <TransactionsTable
                  transactions={reMapedTransaction}
                  deleteTransaction={deleteTransaction}
                  changeTransaction={changeTransaction}
                  categories={categories}
                  lang={lang}
                />
              </div>
              <div className="panel-footer">
                <h3 className="panel-title">
                  <div className="text-right amount-wrapper">
                    <h5 className="amount">
                      {staticContent[lang]['reports']['amountMonth']}
                      <span>{amountMonth.toFixed(2)}</span>
                      {staticContent[lang]['currency']} {'/'}
                      <span>{(amountMonth / monthCourse.course).toFixed(2)}</span>{'$'}
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
    const { transactions, categories, lang, updateCategory, changeAllCategories } = this.props;
    const reMapedTransactions = this.Helpers.groupTransactionsByMonths(this.Helpers.filteredTransactions(transactions, categories));

    return (
      <Container specialClass="reports">
        <Row>
          <Col lg={3} md={3}>
            <TransactionsFilter
              updateCategory={updateCategory}
              changeAllCategories={changeAllCategories}
              lang={lang}
              categories={categories}
            />
          </Col>
          <Col lg={9} md={9}>
            <ReportsGraph
              transactions={this.Helpers.filteredTransactions(transactions, categories)}
              categories={categories}
              lang={lang}
            />
            {this.renderMonthPanels(reMapedTransactions)}
            {transactions.length > 0 &&
            <ButtonToolbar>
              <DownloadData
                transactions={transactions}
                categories={categories}
                fileName="report"
                fileFormat="csv"
                btnText={staticContent[lang]['reports']['btnCsv']}
              />
            </ButtonToolbar>
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

Reports.defaultProps = {
  lang: 'eng',
  categories: [],
  transactions: [],
  course: [],
  updateCategory: () => {},
  changeAllCategories: () => {}
};

Reports.propTypes = {
  categories: PropTypes.array,
  changeAllCategories: PropTypes.func,
  course: PropTypes.array,
  lang: PropTypes.string,
  transactions: PropTypes.array,
  updateCategory: PropTypes.func,
  deleteTransaction: PropTypes.func,
  changeTransaction: PropTypes.func
};

export default connect(state => ({
  transactions: state.transactions,
  categories: state.categories,
  lang: state.lang,
  course: state.course
}), {
  deleteTransaction,
  changeTransaction,
  updateCategory,
  changeAllCategories
})(LoadingHOC('transactions')(Reports));
