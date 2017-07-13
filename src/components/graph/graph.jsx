import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MetricsGraphics from 'react-metrics-graphics';
import Helpers from './../../helpers/Helpers';

class Graph extends Component {
  constructor(props) {
    super(props);

    this.Helpers = new Helpers();
  }

  render() {
    let { transactions } = this.props;
    const { formatDateGraph } = this.Helpers;
    // Sort transactions by date
    transactions.sort((a,b) => {
      return a.startDate - b.startDate;
    })
    // Change some fields data type
    transactions = transactions.map(transaction => {
      return transaction = {
        money: +transaction.money,
        date: new Date(formatDateGraph(transaction.startDate))
      }
    });

    transactions = transactions.map((transaction, i, arr) => {
      /* TODO: add functionality of summarize transactions of one day */
    });

    console.log(transactions);

    return (
      <div className="panel panel-success currency">
        <div className="panel-heading">
          <h3 className="panel-title">Graph</h3>
        </div>
        <div className="panel-body">
          <MetricsGraphics
          	title="transactions"
          	description="This graphic shows a time-series of transactions."
          	data={transactions}
          	height={250}
            width={525}
          	x_accessor="date"
          	y_accessor="money"
          />
        </div>
      </div>
    );
  }
}

Graph.defaultProps = {
  transactions: []
};

Graph.propTypes = {

};

export default Graph;
