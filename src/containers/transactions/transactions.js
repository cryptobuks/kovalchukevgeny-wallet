import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import AddingPanel from './../../components/adding-panel/adding-panel.jsx';
import TransactionsTable from './../../components/transactions-table/transactions-table.jsx';
import Button from './../../components/button/button.jsx';

class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortby: null,
      descending: false,
      transactions: this.props.transactions
    };

    this.convertToCSV = this.convertToCSV.bind(this);
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

  convertToCSV(objArray) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    // TODO: Rewrite to forEach or map
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in array[i]) {
        if (line != '') line += ',';
        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  }

  download(format, event) {
    let contents = format === 'json' ? JSON.stringify(this.state.transactions) :
    this.convertToCSV(this.state.transactions);

    const URL = window.URL || window.webkitURL;
    const blob = new Blob([contents], {type: 'text/' + format});
    event.target.href = URL.createObjectURL(blob);
    event.target.download = 'data.' + format;
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
            <div className="panel panel-primary tr-table">
              <div className="panel-heading">
                <h3 className="panel-title">Transactions</h3>
              </div>
              <div className="panel-body">
                <TransactionsTable
                  transactions={transactions}
                  descending={descending}
                  sortby={sortby}
                  sortFunction={this.sortData}
                />
              </div>
            </div>
            <div className="toolbar">
              <Button
                onClickFunction={this.download.bind(this, 'json')}
                specialClass="btn btn-primary"
                href="data.json"
              >Export JSON</Button>
              <Button
                onClickFunction={this.download.bind(this, 'json')}
                specialClass="btn btn-primary"
                href="data.csv"
              >Export CSV</Button>
            </div>
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
