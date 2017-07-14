import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MetricsGraphics from 'react-metrics-graphics';
import Helpers from './../../helpers/Helpers';

class Graph extends Component {
  constructor(props) {
    super(props);

    this.Helpers = new Helpers();

    this.sumOneDateTransactions = this.sumOneDateTransactions.bind(this);
  }

  sumOneDateTransactions(date) {
    const { formatDate } = this.Helpers;

    let obj = {}
    for(let i = 0; i < date.length; i++) {
      // Create key string for transaction data
      let key = formatDate(date[i].startDate, 'dash');
      /*
       * if object hasn't key add new,
       * if key already exist summarize key value and transaction value
      **/
      obj[key] = !obj[key] ? +date[i].money : +obj[key] + +date[i].money;
    }

    let transaction = {}; let transactions = [];

    /*
     * create array of objects from obj
     * example:
     * [{money: 20, date: Sun Jul 09 2017}, {money: 10, date: Sun Jul 10 2017}]
    **/
    for (let prop in obj) {
      transactions.push({
        money: obj[prop],
        date: new Date(formatDate(prop, 'dash'))
      })
    }

    return transactions;
  }

  render() {
    const { transactions } = this.props;

    return (
      <div className="panel panel-success currency">
        <div className="panel-heading">
          <h3 className="panel-title">Graph</h3>
        </div>
        <div className="panel-body">
          <MetricsGraphics
          	title="transactions"
          	description="This graphic shows a time-series of transactions."
          	data={this.sumOneDateTransactions(transactions)}
          	height={250}
            width={525}
          	x_accessor="date"
          	y_accessor="money"
            yax_units="BYR "
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
  transactions: PropTypes.array
};

export default Graph;
