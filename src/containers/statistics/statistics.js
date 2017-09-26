import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import CurrencyRate from './../../components/currency-rate/currency-rate.jsx';
import TransactionsGraph from './../../components/transactions-graph/transactions-graph.jsx';
import TransactionsResults from './../../components/transactions-results/transactions-results.jsx';
import CategoriesStats from './../../components/categories-stats/categories-stats.jsx';
import MonthCourse from './../month-course/month-course';

import Helpers from './../../helpers/Helpers';

const Statistics = props => {
  const Helper = new Helpers();
  const { transactions, lang, course, categories } = props;

  return (
    <div className="widgets">
      <div className="container">
        <div className="row">
          <div className="col-lg-offset-0 col-lg-6 col-md-6">
            <CurrencyRate
              lang={lang}
              course={course}
            />
          </div>
          <div className="col-lg-offset-0 col-lg-6 col-md-6">
            <TransactionsGraph
              monthTransactions={Helper.getCurrentMonthTransactions(transactions)}
              lang={lang}
            />
          </div>
          <div className="col-lg-offset-0 col-lg-6 col-md-6">
            <CategoriesStats
              transactions={transactions}
              categories={categories}
              lang={lang}
            />
          </div>
          <div className="col-lg-offset-0 col-lg-6 col-md-6">
            <TransactionsResults
              monthTransactions={Helper.getCurrentMonthTransactions(transactions)}
              lang={lang}
              course={course}
            />
            <MonthCourse
              lang={lang}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Statistics.defaultProps = {
  lang: 'eng',
  categories: [],
  transactions: [],
  course: []
};

Statistics.propTypes = {
  transactions: PropTypes.array,
  categories: PropTypes.array,
  lang: PropTypes.string,
  course: PropTypes.array
};

export default connect(state => ({
  transactions: state.transactions,
  categories: state.categories,
  lang: state.lang,
  course: state.course
}))(Statistics);
