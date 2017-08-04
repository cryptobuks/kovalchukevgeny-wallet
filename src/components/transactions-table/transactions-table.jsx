import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';
import moment from 'moment';
import Helpers from './../../helpers/Helpers.js';
import Icon from './../icon/icon.jsx';
import Input from './../input/input.jsx';

import staticContent from './../../static-content/languages.json'; // eslint-disable-line import/namespace

class TransactionsTable extends Component {
  constructor(props) {
    super(props);

    this.Helpers = new Helpers();

    this.state = {
      activeRow: {},
      isEditRow: {},
      startDate: moment()
    }

    this.handleChangeData = this.handleChangeData.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeMoney = this.handleChangeMoney.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.openEditMenu = this.openEditMenu.bind(this);
    this.editTransaction = this.editTransaction.bind(this);
    this.updateTransaction = this.updateTransaction.bind(this);
    this.cancelChanges = this.cancelChanges.bind(this);
  }

  cancelChanges(isEditRow) {
    this.editTransaction(isEditRow);
  }

  handleChangeCategory(event) {
    let isEditRow = this.state.isEditRow;
    isEditRow.category = event.target.value;
    this.setState({isEditRow});
  }

  handleChangeData(date) {
    let isEditRow = this.state.isEditRow;
    isEditRow.startDate = date;
    this.setState({isEditRow});
  }

  handleChangeMoney(event) {
    let isEditRow = this.state.isEditRow;
    isEditRow.money = event.target.value;
    this.setState({isEditRow});
  }

  handleChangeDescription(event) {
    let isEditRow = this.state.isEditRow;
    isEditRow.description = event.target.value;
    this.setState({isEditRow});
  }

  updateTransaction(isEditRow) {
    const { id, startDate, money, description, category } = this.state.isEditRow;
    this.props.changeTransaction(id, startDate, money, description, category);
    this.setState({
      isEditRow: false,
      activeRow: false
    });
  }

  openEditMenu(activeRow) {
    if(activeRow.id !== this.state.isEditRow.id) {
      const oldActiveRow = this.state.activeRow || {};
      const activeTransaction = this.props.transactions.filter(transaction => {
        if(transaction.id === activeRow.id && activeRow.id !== oldActiveRow.id) {
          transaction.active = true;
          return transaction;
        }
        transaction.active = false;
      })[0];
      this.setState({activeRow: activeTransaction});
    }
  }

  editTransaction(isEditRow) {
    const oldEditRow = this.state.isEditRow || {};
    const editableTransaction = this.props.transactions.filter(transaction => {
      if(transaction.id === isEditRow.id && isEditRow.id !== oldEditRow.id) {
        transaction.isEdit = true;
        return transaction;
      }
      transaction.isEdit = false;
    })[0];
    this.setState({isEditRow: editableTransaction});
  }

  render() {
    let { transactions, descending, sortby, categories, lang, deleteTransaction, sortFunction } = this.props;
    const { activeRow, isEditRow } = this.state;
    const titles = staticContent[lang]['transactions-table'].tableHead;

    const selectCategories = categories.map((category, i) => {
      return(
        <option key={i} value={category.categoryTitle}>{category.categoryTitle}</option>
      );
    });

    const tableHead = transactions && transactions.length > 0 ?
    Object.keys(transactions[0]).map((key, i) => {
      if (key === 'id' || key === 'active' || key === 'isEdit') { return }; // ignore state keys
      return(
        <div className="table-data" key={i} data-cell={key}>
          <span data-cell={key}>{titles[i-1]}</span> {/* ignore id */}
          {sortby === key &&
          <span className="filter-arrow">
            {descending ? <Icon icon={'arrow_downward'} /> : <Icon icon={'arrow_upward'} />}
          </span>
          }
        </div>
      );
    }) : [];

    const tableData = transactions.map((transaction, i) => {
      const date = this.Helpers.formatDate(transaction.startDate)

      const categoryIconObj = categories.filter(category => {
        if(category.categoryTitle === transaction.category) {
          return category.categoryIcon;
        };
      })[0] || null;

      const categoryIcon = categoryIconObj ? categoryIconObj.categoryIcon : '';
      return(
        <div className="table-row clearfix" key={i} data-row={transaction.id}
          onClick={() => this.openEditMenu(transaction)}
        >
          {/* Data column */}
          <div className="table-data clearfix">
            {!transaction.isEdit ?
              <span>{date}</span> :
              <DatePicker
                locale="en-gb"
                className="form-control"
                selected={moment(transaction.startDate)}
                onChange={this.handleChangeData}
              />
            }
          </div>
          {/* Money column */}
          <div className="table-data clearfix">
            {!transaction.isEdit ?
              <span>{transaction.money}</span> :
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
              <span>{transaction.description}</span> :
              <Input
                placeholder={staticContent[lang]['adding-panel'].descr}
                value={this.state.isEditRow.description}
                handleChange={this.handleChangeDescription}
              />
            }
          </div>
          {/* Category column */}
          <div className="table-data clearfix">
            {!transaction.isEdit ?
              <span>
                <Icon icon={categoryIcon} type="fa" />
                {transaction.category}
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
            <div className={classNames('edit-menu', {active: transaction.active})}>
              <Icon
                onClickFunction={() => this.editTransaction(transaction)}
                icon={'fa-pencil'}
                type="fa"
              />
              <Icon
                onClickFunction={() => deleteTransaction(transaction.id)}
                icon={'fa-close'}
                type="fa"
              />
            </div> :
            <div className={classNames('change-menu', {active: transaction.isEdit})}>
              <Icon
                onClickFunction={() => this.updateTransaction(transaction)}
                icon={'fa-check'}
                type="fa"
              />
              <Icon
                onClickFunction={() => this.cancelChanges(transaction)}
                icon={'fa-close'}
                type="fa"
              />
            </div>
          }
        </div>
      );
    });

    return (
      <div className="table transactions">
        <div className="table-head clearfix">
          <div className="table-row clearfix" onClick={this.props.sortFunction}>
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

TransactionsTable.propTypes = {
  transactions: PropTypes.array,
  categories: PropTypes.array,
  descending: PropTypes.bool,
  sortby: PropTypes.string,
  deleteTransaction: PropTypes.func,
  sortFunction: PropTypes.func,
  lang: PropTypes.string
};

export default TransactionsTable;
