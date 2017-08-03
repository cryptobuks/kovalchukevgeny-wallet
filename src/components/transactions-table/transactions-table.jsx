import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Helpers from './../../helpers/Helpers.js';
import Icon from './../icon/icon.jsx';

import staticContent from './../../static-content/languages.json';

class TransactionsTable extends Component {
  constructor(props) {
    super(props);

    this.Helpers = new Helpers();

    this.state = {
      activeRow: {}
    }

    this.openEditMenu = this.openEditMenu.bind(this);
  }

  openEditMenu(activeRow) {
    activeRow.active = !activeRow.active
    this.setState({
      activeRow
    });
  }

  render() {
    let { transactions, descending, sortby, categories, lang, deleteTransaction } = this.props;
    const { activeRow } = this.state;
    const titles = staticContent[lang]['transactions-table'].tableHead;

    const tableHead = transactions && transactions.length > 0 ?
    Object.keys(transactions[0]).map((key, i) => {
      if (key === 'id' || key === 'active') { return }; // ignore id
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
          <div className="table-data clearfix" data-cell='1'>{date}</div>
          <div className="table-data clearfix" data-cell='2'>{transaction.money}</div>
          <div className="table-data clearfix" data-cell='3'>{transaction.description}</div>
          <div className="table-data clearfix" data-cell='4'>
            <Icon icon={categoryIcon} type="fa" />
            {transaction.category}
          </div>
          <div className={classNames('edit-menu', {active: transaction.active})}>
            <Icon
              icon={'fa-pencil'}
              type="fa"
            />
            <Icon
              onClickFunction={() => deleteTransaction(transaction.id)}
              icon={'fa-close'}
              type="fa"
            />
          </div>
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
  sortFunction: PropTypes.func
};

export default TransactionsTable;
