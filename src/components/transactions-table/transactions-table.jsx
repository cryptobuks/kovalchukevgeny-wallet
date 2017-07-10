import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helpers from './../../helpers/Helpers.js';
import Icon from './../icon/icon.jsx';

class TransactionsTable extends Component {
  constructor(props) {
    super(props);

    this.Helpers = new Helpers();
  }

  render() {
    let { transactions, descending, sortby } = this.props;

    const tableData = transactions.map((transaction, i) => {
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

    const titles = ['Date', 'Money', 'Description', 'Category'];

    const tableHead = transactions && transactions.length > 0 ?
    Object.keys(transactions[0]).map((key, i) => {
      return(
        <th key={i} data-cell={key}>
          <span data-cell={key}>{titles[i]}</span>
          {sortby === key &&
          <span className="filter-arrow">
            {descending ? <Icon icon={'arrow_downward'} /> : <Icon icon={'arrow_upward'} />}
          </span>
          }
        </th>
      );
    }) : [];

    return (
      <table className="table table-striped table-hover transactions">
        <tbody>
          <tr onClick={this.props.sortFunction}>
            {tableHead}
          </tr>
          {tableData}
        </tbody>
      </table>
    );
  }
}

TransactionsTable.propTypes = {
  transactions: PropTypes.array,
  categories: PropTypes.array,
  descending: PropTypes.bool,
  sortby: PropTypes.string,
  sortFunction: PropTypes.func
};

export default TransactionsTable;