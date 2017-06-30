import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helpers from './../../helpers/Helpers.js';

class TransactionsTable extends Component {
  constructor(props) {
    super(props);

    this.Helpers = new Helpers();

    this.state = {
      sortby: null,
      descending: false,
      transactions: this.props.transactions
    }

    this.sortData = this.sortData.bind(this);
  }

  sortData(e) {
    let { transactions } = this.props;

    let column = e.target.dataset;
    console.log(column);
    switch (column.cell) {
      case 'date' :
      transactions.sort((a, b) => {
        return a.date > b.date ? 1 : -1;
      });
      break;
      case 'money' :
      transactions.sort((a, b) => {
        return a.money > b.money ? 1 : -1;
      });
      break;
      case 'description' :
      transactions.sort((a, b) => {
        return a.transactionsTitle > b.transactionsTitle ? 1 : -1;
      });
      break;
      case 'category' :
      transactions.sort((a, b) => {
        return a.category > b.category ? 1 : -1;
      });
      break;
    }

    this.setState({ transactions: transactions });
  }

  render() {
    let { transactions } = this.state;

    const transaction = transactions.map((transaction, i) => {
      const date = this.Helpers.formatDate(transaction.startDate)
      return(
        <tr key={i} data-row={i}>
          <td data-cell='1'>{date}</td>
          <td data-cell='2'>{transaction.money}</td>
          <td data-cell='3'>{transaction.transactionTitle}</td>
          <td data-cell='4'>{transaction.category}</td>
        </tr>
      );
    });

    return (
      <table className="table table-striped table-hover ">
        <thead onClick={(e) => this.sortData(e)}>
          <tr>
            <th data-cell='date'>Date</th>
            <th data-cell='money'>Money</th>
            <th data-cell='description'>Description</th>
            <th data-cell='category'>Category</th>
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
