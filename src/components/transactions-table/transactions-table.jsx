import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class TransactionsTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { transactions } = this.props;

    let transaction = transactions.map((transaction, i) => {
      return(
        <tr key={i} >
          <td>{i}</td>
          <td>{transaction.startDate}</td>
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
            <th>#</th>
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
