import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import AddingPanel from './../../components/adding-panel/adding-panel.jsx';
import TransactionsTable from './../../components/transactions-table/transactions-table.jsx';
import Panel from './../../components/panel/panel.jsx';
import Button from './../../components/button/button.jsx';
import Helpers from './../../helpers/Helpers';
import { deleteTransaction, changeTransaction, addTransaction } from './../../actions/actionCreators';

import staticContent from './../../static-content/languages.json'; // eslint-disable-line import/namespace

class Transactions extends Component {
  constructor(props) {
    super(props);

    this.Helpers = new Helpers();

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
      // ignore id key
      const column = Object.keys(transactions[0])[1];
      this.sortData(event = null, column);
    }
  }

  convertToCSV(objArray) {
    const { formatDate } = this.Helpers;
    // To format date to 20/7/2017
    objArray = objArray.map(item => {
      item.date = formatDate(item.date);
      return item;
    });
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    // TODO: Rewrite to forEach or map
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in array[i]) {
        if(index !== 'id') { // ignore ids in final table
          if (line != '') line += ',';
          line += array[i][index];
        }
      }
      str += line + '\r\n';
    }
    return str;
  }

  download(format, event) {
    let contents = format === 'json' ? JSON.stringify(this.state.transactions) :
    this.convertToCSV(this.state.transactions);
    const URL = window.URL || window.webkitURL;
    const blob = new Blob([contents], {type: `text/${format};charset=utf-8;`});
    event.target.href = URL.createObjectURL(blob);
    event.target.download = 'data.' + format;
  }

  sortSheme(dataArray, column, descending) {
    dataArray.sort((a, b) => {
      // Sort numbers
      if(parseInt(column !== 'date' && a[column]) && parseInt(b[column])) {
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
    let { transactions, categories, lang, deleteTransaction, changeTransaction, addTransaction } = this.props;
    const unicTransactions = this.Helpers.sumSameDateTransactions(transactions);
    let amount = 0;

    // Filter transactions on current month
    const monthTransactions = transactions.filter(transaction => {
      return moment().month() === moment(transaction.date).month();
    });

    if(transactions && transactions.length > 0) {
      amount = unicTransactions.reduce((sum, transaction) => {
        return sum += transaction.money;
      }, 0) / unicTransactions.length;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <AddingPanel
              categories={categories}
              lang={lang}
              addTransaction={addTransaction}
            />
            {transactions.length > 0 &&
              <Panel
                specialClass="panel-primary tr-table"
                heading={staticContent[lang]['transactions-table'].head}
              >
                <TransactionsTable
                  transactions={monthTransactions}
                  deleteTransaction={deleteTransaction}
                  changeTransaction={changeTransaction}
                  descending={descending}
                  sortby={sortby}
                  sortFunction={this.sortData}
                  categories={categories}
                  lang={lang}
                />
              </Panel>
            }
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
              {transactions.length > 0 &&
                <div className="toolbar">
                  <Button
                    onClickFunction={this.download.bind(this, 'json')}
                    specialClass="btn btn-primary"
                    href="data.json"
                  >{staticContent[lang]['transactions-table'].btnJson}</Button>
                  <Button
                    onClickFunction={this.download.bind(this, 'csv')}
                    specialClass="btn btn-primary"
                    href="data.csv"
                  >{staticContent[lang]['transactions-table'].btnCsv}</Button>
                </div>
              }
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 text-right amount-wrapper">
                <h5 className="amount">
                  {staticContent[lang]['transactions-table'].bigDescr}
                  <span>{unicTransactions.length}</span> days:
                  <span>{amount.toFixed(2)}</span> RUB
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Transactions.propTypes = {
  categories: PropTypes.array,
  transactions: PropTypes.array,
  lang: PropTypes.string,
  deleteTransaction: PropTypes.func,
  changeTransaction: PropTypes.func
};

export default connect(state => ({
  transactions: state.transactions,
  categories: state.categories,
  lang: state.lang
}), { deleteTransaction, changeTransaction, addTransaction })(Transactions);
