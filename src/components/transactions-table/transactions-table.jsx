import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helpers from './../../helpers/Helpers.js';

class TransactionsTable extends Component {
  constructor(props) {
    super(props);

    this.Helpers = new Helpers();
  }

  render() {
    const { transactions } = this.props;
    const transaction = transactions.map((transaction, i) => {
      const date = this.Helpers.formatDate(transaction.startDate)
      return(
        <tr key={i} >
          <td>{date}</td>
          <td>{transaction.money}</td>
          <td>{transaction.transactionTitle}</td>
          <td>{transaction.category}</td>
        </tr>
      );
    });

    return (
      <table className="table table-striped table-hover ">
        <thead>
          <tr>
            <th>Date</th>
            <th>Money</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {transaction}
        </tbody>
      </table>
    );
  }
}

TransactionsTable.propTypes = {

};

export default connect(state => ({
  transactions: state.transactions,
}))(TransactionsTable);
