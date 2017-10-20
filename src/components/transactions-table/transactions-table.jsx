import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';
import moment from 'moment';
import { toastr } from 'react-redux-toastr';

import Helpers from './../../helpers/Helpers';

import Icon from './../icon/icon.jsx';
import Input from './../input/input.jsx';
import Button from './../button/button.jsx'

import staticContent from './../../static-content/languages';

class TransactionsTable extends Component {
  constructor(props) {
    super(props);

    this.Helpers = new Helpers();

    this.state = {
      activeRow: {},
      isEditRow: {},
      sortby: null,
      descending: false,
      date: moment()
    }

    this.sortData = this.sortData.bind(this);
    this.sortSheme = this.sortSheme.bind(this);
    this.handleChangeData = this.handleChangeData.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeMoney = this.handleChangeMoney.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.openEditMenu = this.openEditMenu.bind(this);
    this.editTransaction = this.editTransaction.bind(this);
    this.updateTransaction = this.updateTransaction.bind(this);
    this.cancelChanges = this.cancelChanges.bind(this);
    this.deleteTransaction = this.deleteTransaction.bind(this);
  }

  componentWillMount() {
    const transactions = this.props.transactions;
    // Set default sort for data
    if (transactions.length > 0) {
      // ignore id key
      const column = Object.keys(transactions[0])[1];
      this.sortData(event = null, column);
    }
  }

  cancelChanges(isEditRow) {
    this.editTransaction(isEditRow);
  }

  deleteTransaction(id) {
    const { deleteTransaction, lang } = this.props;
    toastr.confirm(staticContent[lang]['toastr']['transactionRemove'], { onOk: () => deleteTransaction(id) });
  }

  handleChangeCategory(event) {
    let isEditRow = this.state.isEditRow;
    isEditRow.category = event.target.value;
    this.setState({ isEditRow });
  }

  handleChangeData(date) {
    let isEditRow = this.state.isEditRow;
    isEditRow.date = date;
    this.setState({ isEditRow });
  }

  handleChangeMoney(event) {
    let isEditRow = this.state.isEditRow;
    isEditRow.money = event.target.value;
    this.setState({ isEditRow });
  }

  handleChangeDescription(event) {
    let isEditRow = this.state.isEditRow;
    isEditRow.description = event.target.value;
    this.setState({ isEditRow });
  }

  updateTransaction(isEditRow) {
    const { lang, changeTransaction } = this.props;
    let { id, date, money, description, category } = this.state.isEditRow;
    this.props.changeTransaction(id, date, +money, description, +category);
    this.setState({
      isEditRow: {},
      activeRow: {}
    });
    toastr.success(staticContent[lang]['toastr']['transactionUpdated'], { timeOut: 4000 });
  }

  openEditMenu(activeRow) {
    if (activeRow.id !== this.state.isEditRow.id) {
      const oldActiveRow = this.state.activeRow || {};
      const activeTransaction = this.props.transactions.find(transaction => {
        if (transaction.id === activeRow.id && activeRow.id !== oldActiveRow.id) {
          transaction.active = true;
          return transaction;
        }
        transaction.active = false;
      });
      this.setState({ activeRow: activeTransaction });
    }
  }

  sortSheme(dataArray, column, descending) {
    dataArray.sort((a, b) => {
      // Sort numbers
      if (parseInt(column !== 'date' && a[column]) && parseInt(b[column])) {
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

  editTransaction(isEditRow) {
    const oldEditRow = this.state.isEditRow || {};
    const editableTransaction = this.props.transactions.find(transaction => {
      if (transaction.id === isEditRow.id && isEditRow.id !== oldEditRow.id) {
        transaction.isEdit = true;
        return transaction;
      }
      transaction.isEdit = false;
    });
    this.setState({ isEditRow: editableTransaction });
  }

  render() {
    let { transactions, categories, lang } = this.props;
    const { activeRow, isEditRow, descending, sortby } = this.state;

    const selectCategories = categories.map((category, i) => {
      return (
        <option key={i} value={category.id}>{category.title}</option>
      );
    });

    const tableHead = staticContent[lang]['transactions-table']['tableHead'].map((headItem, i) => {
      headItem = staticContent['eng']['transactions-table']['tableHead'][i].toLowerCase();

      return (
        <div className={`table-data ${sortby === headItem ? 'active' : ''}`} key={i} data-cell={headItem}>
          <span data-cell={headItem}>{staticContent[lang]['transactions-table']['tableHead'][i]}</span>
          {sortby === headItem &&
            <span className="filter-arrow">
              {descending ? <Icon data-cell={headItem} icon={'arrow_downward'} /> : <Icon data-cell={headItem} icon={'arrow_upward'} />}
            </span>
          }
        </div>
      );
    });

    const tableData = transactions.map((transaction, i) => {

      const categoryIconObj = categories.find(category => {
        if (category.id === transaction.category) {
          return category.icon;
        };
      }) || null;

      let categoryColor = '#33373e';
      let category = categories.find(category => {
        if (category.id === +transaction.category) {
          return category.color;
        };
      });

      if (category) {
        categoryColor = category.color;
      }

      return (
        <div className="table-row clearfix" key={i} data-row={transaction.id}
          onClick={() => this.openEditMenu(transaction)}
        >
          {/* Data column */}
          <div className="table-data clearfix">
            {!transaction.isEdit ?
              <span>{moment(transaction.date).format('DD/MM/YYYY')}</span> :
              <DatePicker
                locale="en-gb"
                className="form-control"
                maxDate={moment()}
                selected={moment(transaction.date)}
                onChange={this.handleChangeData}
              />
            }
          </div>
          {/* Money column */}
          <div className="table-data clearfix">
            {!transaction.isEdit ?
              <span>
                <span>{transaction.money} </span>
                <span>{staticContent[lang]['currency']}</span>
              </span> :
              <Input
                type="number"
                placeholder="0.00"
                value={this.state.isEditRow.money}
                handleChange={this.handleChangeMoney}
              />
            }
          </div>
          {/* Description column */}
          <div className="table-data clearfix">
            {!transaction.isEdit ?
              <span title={transaction.description}>{transaction.description}</span> :
              <Input
                placeholder={staticContent[lang]['adding-panel']['descr']}
                value={this.state.isEditRow.description}
                handleChange={this.handleChangeDescription}
              />
            }
          </div>
          {/* Category column */}
          <div className="table-data clearfix">
            {!transaction.isEdit ?
              <span>
                {category
                  ? <span className="icon-wrapper" style={{ backgroundColor: categoryColor }}>
                      <Icon icon={categoryIconObj ? categoryIconObj.icon : ''} type="fa" />
                    </span>
                  : ''
                }
                {this.Helpers.getCategoryById(categories, transaction)}
              </span> :
              <select
                className="form-control"
                value={this.state.isEditRow.category}
                onChange={this.handleChangeCategory}
              >
                {selectCategories}
              </select>
            }
          </div>
          {/* Edit menu */}
          {!transaction.isEdit ?
            <div className={classNames('edit-menu', { active: transaction.active })}>
              <Button specialClass="button-icon" onClickFunction={() => this.editTransaction(transaction)}>
                <Icon icon={'fa-pencil'} type="fa" />
              </Button>
              <Button specialClass="button-icon" onClickFunction={() => this.deleteTransaction(transaction.id)}>
                <Icon icon={'fa-close'} type="fa" />
              </Button>
            </div> :
            <div className={classNames('change-menu', { active: transaction.isEdit })}>
              <Button specialClass="button-icon" onClickFunction={() => this.updateTransaction(transaction)}>
                <Icon icon={'fa-check'} type="fa" />
              </Button>
              <Button specialClass="button-icon" onClickFunction={() => this.cancelChanges(transaction)}>
                <Icon icon={'fa-close'} type="fa" />
              </Button>
            </div>
          }
        </div>
      );
    });

    return (
      <div className="table transactions">
        <div className="table-head clearfix">
          <div className="table-row clearfix" onClick={this.sortData}>
            {tableHead}
          </div>
        </div>
        <div className="table-body clearfix">
          {tableData}
        </div>
      </div>
    );
  }
}

TransactionsTable.defaultProps = {
  categories: [],
  transactions: [],
  lang: 'eng',
  deleteTransaction: () => { },
  changeTransaction: () => { }
};

TransactionsTable.propTypes = {
  transactions: PropTypes.array,
  categories: PropTypes.array,
  deleteTransaction: PropTypes.func,
  changeTransaction: PropTypes.func,
  lang: PropTypes.string
};

export default TransactionsTable;
