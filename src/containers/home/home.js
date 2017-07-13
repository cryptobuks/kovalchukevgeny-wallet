import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CurrencyRate from './../../components/currency-rate/currency-rate.jsx';
import Graph from './../../components/graph/graph.jsx';

const Home = (props) => {
  const { transactions } = props;
  return (
    <div className="widgets">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <CurrencyRate />
          </div>
          <div className="col-lg-6">
            <Graph
              transactions={transactions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {

};

export default connect(state => ({
  transactions: state.transactions
}))(Home);
