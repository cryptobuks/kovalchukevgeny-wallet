import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import AddingPanel from './../../components/adding-panel/adding-panel.jsx';
import TransactionsTable from './../../components/transactions-table/transactions-table.jsx';

class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortby: null,
      descending: false,
      transactions: this.props.transactions
    };

    this.sortData = this.sortData.bind(this);
    this.sortSheme = this.sortSheme.bind(this);
  }

  componentWillMount() {
    const transactions = this.props.transactions;
    // Set default sort for data
    if(transactions.length > 0) {
      const column = Object.keys(transactions[0])[0];
      this.sortData(event = null, column);
    }
  }

  sortSheme(dataArray, column, descending) {
    dataArray.sort((a, b) => {
      // Sort numbers
      if(parseInt(column !== 'startDate' && a[column]) && parseInt(b[column])) {
        return descending ?
        (+a[column] > +b[column] ? 1 : -1) :
        (+a[column] < +b[column] ? 1 : -1);
      // Sort strings
      } else {
        return descending ?
        (a[column] > b[column] ? 1 : -1) :
        (a[column] < b[column] ? 1 : -1);
      }
    });
  }

  sortData(event, col) {
    const { transactions } = this.props;
    const column = event ? event.target.dataset.cell : col;
    const descending = this.state.sortby === column && !this.state.descending;

    this.sortSheme(transactions, column, descending);

    this.setState({
      transactions: transactions,
      sortby: column,
      descending: descending
    });
  }

  render() {
    const { descending, sortby } = this.state;
    const { transactions, categories } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <AddingPanel
              categories={categories}
            />
            <TransactionsTable
              transactions={transactions}
              descending={descending}
              sortby={sortby}
              sortFunction={this.sortData}
            />
          </div>
        </div>
      </div>
    );
  }
}

Transactions.propTypes = {
  categories: PropTypes.array,
  transactions: PropTypes.array
};

export default connect(state => ({
  transactions: state.transactions,
  categories: state.categories
}))(Transactions);
