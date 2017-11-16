import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CurrencyRate from './../../components/currency-rate/currency-rate.jsx';
import TransactionsGraph from './../../components/transactions-graph/transactions-graph.jsx';
import TransactionsResults from './../../components/transactions-results/transactions-results.jsx';
import CategoriesStats from './../../components/categories-stats/categories-stats.jsx';
import MonthCourse from './../month-course/month-course';
import Container from './../../components/container/container.jsx';
import Row from './../../components/row/row.jsx';
import Col from './../../components/col/col.jsx';

import Helpers from './../../helpers/Helpers';

const Statistics = props => {
  const Helper = new Helpers();
  const { transactions, course, categories, user } = props;
  const { theme, lang, pallet } = user.settings;

  return (
    <Container>
      <Row>
        <Col lg={6} md={6}>
          <CurrencyRate
            lang={lang}
            course={course}
            theme={theme}
            pallet={pallet}
          />
        </Col>
        <Col lg={6} md={6}>
          <TransactionsGraph
            monthTransactions={Helper.getCurrentMonthTransactions(transactions)}
            lang={lang}
            theme={theme}
            pallet={pallet}
          />
        </Col>
        <Col lg={6} md={6}>
          <MonthCourse
            lang={lang}
            theme={theme}
            pallet={pallet}
          />
          <TransactionsResults
            monthTransactions={Helper.getCurrentMonthTransactions(transactions)}
            lang={lang}
            course={course}
            theme={theme}
          />         
        </Col>
        <Col lg={6} md={6}>
          <CategoriesStats
            transactions={transactions}
            categories={categories}
            lang={lang}
            theme={theme}
          />
        </Col>
      </Row>
    </Container>
  );
};

Statistics.defaultProps = {
  categories: [],
  course: [],
  transactions: [],
};

Statistics.propTypes = {
  categories: PropTypes.array,
  course: PropTypes.array,
  transactions: PropTypes.array,
  user: PropTypes.object,
};

export default connect(state => ({
  transactions: state.transactions,
  categories: state.categories,
  course: state.course,
  user: state.user,
}))(Statistics);
