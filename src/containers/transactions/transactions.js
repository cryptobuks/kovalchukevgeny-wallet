import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

import AddingPanel from './../../components/adding-panel/adding-panel.jsx';
import TransactionsTable from './../../components/transactions-table/transactions-table.jsx';
import Panel from './../../components/panel/panel.jsx';
import Button from './../../components/button/button.jsx';
import Icon from './../../components/icon/icon.jsx';
import TransactionsFilter from './../../components/transactions-filter/transactions-filter.jsx';
import DownloadData from './../../components/download-data/download-data.jsx';

import Helpers from './../../helpers/Helpers';

import {
  deleteTransaction,
  changeTransaction,
  addTransaction,
  updateCategory,
  changeAllCategories } from './../../actions/actionCreators';

import staticContent from './../../static-content/languages';

class Transactions extends Component {
  constructor(props) {
    super(props);

    this.Helpers = new Helpers();

    this.state = {
      sortby: null,
      descending: false,
      transactions: this.props.transactions,
      showPanel: false
    };

    this.sortData = this.sortData.bind(this);
    this.sortSheme = this.sortSheme.bind(this);
    this.spellingDay = this.spellingDay.bind(this);
    this.showAddingPanel = this.showAddingPanel.bind(this);
    this.hideAddingPanel = this.hideAddingPanel.bind(this);
    this.renderTableFooter = this.renderTableFooter.bind(this);
    this.filteredTransactions = this.filteredTransactions.bind(this);
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

  filteredTransactions(transactions) {
    const { categories } = this.props;
    transactions = transactions.filter(transaction => {
      for(let i = 0; i < categories.length; i++) {
        if(transaction.category === categories[i].id) {
          if(categories[i].filter === true) {
            return transaction;
          }
        }
      }
    });
    return transactions;
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

  spellingDay(date, lang) {
    const declOfNum = (number, titles) => {
      let cases = [2, 0, 1, 1, 1, 2];
      return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    };

    if(lang === 'eng') {
      return date === 1 ? 'day' : 'days';
    } else {
      return declOfNum(date, ['день', 'дня', 'дней']);
    }
  }

  showAddingPanel() {
    this.setState({ showPanel: true });
  }

  hideAddingPanel() {
    this.setState({ showPanel: false });
  }

  renderTableFooter(amount, unicTransactions) {
    const { lang } = this.props;
    return(
      <span className="amount">
        {staticContent[lang]['transactions-table'].bigDescr}
        <span>{unicTransactions.length} </span>
        {this.spellingDay(unicTransactions.length, lang)}:
        <span>{amount.toFixed(2)} </span>
        {staticContent[lang]['currency']}
      </span>
    );
  }

  render() {
    const { descending, sortby, showPanel } = this.state;
    let {
      transactions,
      categories,
      lang,
      deleteTransaction,
      changeTransaction,
      addTransaction,
      updateCategory,
      changeAllCategories } = this.props;
    let amount = 0;

    const monthTransactions = this.Helpers.getCurrentMonthTransactions(transactions);
    const unicTransactions = this.Helpers.sumSameDateTransactions(monthTransactions);

    if(monthTransactions && monthTransactions.length > 0) {
      amount = unicTransactions.reduce((sum, transaction) => {
        return sum += transaction.money;
      }, 0);
    }

    return (
      <div className="container transactions">
        <div className="row">
          <AddingPanel
            categories={categories}
            lang={lang}
            addTransaction={addTransaction}
            transactions={transactions}
            showPanel={showPanel}
            hideAddingPanel={this.hideAddingPanel}
          />
          {transactions.length > 0 ?
          <div className="col-lg-3 col-md-3">
            <TransactionsFilter
              categories={categories}
              lang={lang}
              updateCategory={updateCategory}
              changeAllCategories={changeAllCategories}
            />
          </div> : <h4>{staticContent[lang]["description"]}</h4>
          }
          <div className="col-lg-9 col-md-9">
            {transactions.length > 0 &&
            <Panel
              specialClass="tr-table"
              heading={staticContent[lang]['transactions-table'].head}
              headingIcon="view_list"
              footer={this.renderTableFooter(amount, unicTransactions)}
            >
              <TransactionsTable
                transactions={this.filteredTransactions(monthTransactions)}
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
              <div className="col-lg-12">
                <div className="toolbar">
                  <Button
                    onClickFunction={this.showAddingPanel}
                    specialClass="btn btn-primary"
                  >
                    <Icon icon={'add'} />
                    {staticContent[lang]['transactions-table'].btnAdd}
                  </Button>
                  {transactions.length > 0 &&
                  <DownloadData
                    transactions={monthTransactions}
                    categories={categories}
                    fileName="monthExpenses"
                    fileFormat="csv"
                    btnText={staticContent[lang]['transactions-table'].btnCsv}
                  />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Transactions.defaultProps = {
  categories: [],
  transactions: [],
  lang: 'eng',
  deleteTransaction: () => {},
  changeTransaction: () => {},
  addTransaction: () => {},
  updateCategory: () => {},
  changeAllCategories: () => {}
};

Transactions.propTypes = {
  categories: PropTypes.array,
  transactions: PropTypes.array,
  lang: PropTypes.string,
  deleteTransaction: PropTypes.func,
  changeTransaction: PropTypes.func,
  addTransaction: PropTypes.func,
  updateCategory: PropTypes.func,
  changeAllCategories: PropTypes.func
};

export default connect(state => ({
  transactions: state.transactions,
  categories: state.categories,
  lang: state.lang
}), { deleteTransaction, changeTransaction, addTransaction, updateCategory, changeAllCategories })(Transactions);
