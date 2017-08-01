import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CurrencyRate from './../../components/currency-rate/currency-rate.jsx';
import TransactionsGraph from './../../components/transactions-graph/transactions-graph.jsx';
import TransactionsResults from './../../components/transactions-results/transactions-results.jsx';

const Home = (props) => {
  const { transactions, lang } = props;
  return (
    <div className="widgets">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <CurrencyRate
              lang={lang}
            />
          </div>
          <div className="col-lg-6">
            <TransactionsGraph
              transactions={transactions}
              lang={lang}
            />
          </div>
          <div className="col-lg-6">
            <TransactionsResults
              transactions={transactions}
              lang={lang}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  transactions: PropTypes.array,
  lang: PropTypes.string
};

export default connect(state => ({
  transactions: state.transactions,
  lang: state.lang
}))(Home);
