import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AddingPanel from './../../components/adding-panel/adding-panel.jsx';
import TransactionsTable from './../../components/transactions-table/transactions-table.jsx';
import Panel from './../../components/panel/panel.jsx';
import Button from './../../components/button/button.jsx';
import TransactionsFilter from './../../components/transactions-filter/transactions-filter.jsx';
import DownloadData from './../../components/download-data/download-data.jsx';
import ButtonsToolbar from './../../components/button-toolbar/button-toolbar.jsx';
import Container from './../../components/container/container.jsx';
import Row from './../../components/row/row.jsx';
import Col from './../../components/col/col.jsx';

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

  sortSheme(dataArray, column, descending) {
    dataArray.sort((a, b) => {
      // Sort numbers
      if(parseInt(column !== 'date' && a[column]) && parseInt(b[column])) {
        return descending ?
        (+a[column] > +b[column] ? 1 : -1) :
        (+a[column] < +b[column] ? 1 : -1);
      // Sort strings
      }
      return descending ?
      (a[column] > b[column] ? 1 : -1) :
      (a[column] < b[column] ? 1 : -1);
    });
  }

  sortData(event, col) {
    const { transactions } = this.props;
    const column = event ? event.target.dataset.cell : col;
    const descending = this.state.sortby === column && !this.state.descending;

    this.sortSheme(transactions, column, descending);

    this.setState({
      transactions,
      sortby: column,
      descending
    });
  }

  spellingDay(date, lang) {
    const declOfNum = (number, titles) => {
      const cases = [2, 0, 1, 1, 1, 2];
      return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    };

    if(lang === 'eng') {
      return date === 1 ? 'day' : 'days';
    }
    return declOfNum(date, ['день', 'дня', 'дней']);
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
        {staticContent[lang]['transactions-table']['bigDescr']}
        <span>{unicTransactions.length} </span>
        {this.spellingDay(unicTransactions.length, lang)}{':'}
        <span>{amount.toFixed(2)} </span>
        {staticContent[lang]['currency']}
      </span>
    );
  }

  render() {
    const { descending, sortby, showPanel } = this.state;
    const {
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
      amount = unicTransactions.reduce((sum, transaction) => sum += transaction.money, 0);
    }

    return (
      <Container specialClass="transactions">
        <Row>
          <AddingPanel
            categories={categories}
            lang={lang}
            addTransaction={addTransaction}
            transactions={transactions}
            showPanel={showPanel}
            hideAddingPanel={this.hideAddingPanel}
          />
          {transactions.length > 0 ?
          <Col lg={3} md={3}>
            <TransactionsFilter
              categories={categories}
              lang={lang}
              updateCategory={updateCategory}
              changeAllCategories={changeAllCategories}
            />
          </Col> : <h4>{staticContent[lang]['description']}</h4>
          }
          <Col lg={9} md={9}>
            {transactions.length > 0 &&
            <Panel
              specialClass="tr-table"
              heading={staticContent[lang]['transactions-table']['head']}
              headingIcon="view_list"
              footer={this.renderTableFooter(amount, unicTransactions)}
            >
              <TransactionsTable
                transactions={this.Helpers.filteredTransactions(monthTransactions, categories)}
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
            <Row>
              <Col lg={12}>
                <ButtonsToolbar>
                  <Button
                    onClickFunction={this.showAddingPanel}
                    specialClass="btn btn-primary"
                    icon="add"
                  >{staticContent[lang]['transactions-table']['btnAdd']}</Button>
                  {transactions.length > 0 &&
                  <DownloadData
                    transactions={monthTransactions}
                    categories={categories}
                    fileName="monthExpenses"
                    fileFormat="csv"
                    btnText={staticContent[lang]['transactions-table']['btnCsv']}
                  />
                  }
                </ButtonsToolbar>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
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
  addTransaction: PropTypes.func,
  categories: PropTypes.array,
  changeAllCategories: PropTypes.func,
  changeTransaction: PropTypes.func,
  deleteTransaction: PropTypes.func,
  lang: PropTypes.string,
  transactions: PropTypes.array,
  updateCategory: PropTypes.func
};

export default connect(state => ({
  transactions: state.transactions,
  categories: state.categories,
  lang: state.lang
}), {
  deleteTransaction,
  changeTransaction,
  addTransaction,
  updateCategory,
  changeAllCategories
})(Transactions);
