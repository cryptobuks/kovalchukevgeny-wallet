import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Icon from './../icon/icon.jsx';
import Panel from './../panel/panel.jsx';
import Helpers from './../../helpers/Helpers';

import staticContent from './../../static-content/languages';

class CategoriesStats extends Component {
  constructor(props) {
    super(props);

    this.Helpers = new Helpers();
  }

  render() {
    let { lang, categories, transactions } = this.props;

    transactions = transactions.filter(transaction => {
      return moment(transaction.date).format('YYYY-MM') === moment().format('YYYY-MM');
    });

    const tableHead = staticContent[lang]['categories-stats']['tableHead'].map((headItem, i) => {
      headItem = headItem.toLowerCase();
      return (
        <div className="table-data" key={i} data-cell={headItem}>
          <span data-cell={headItem}>{staticContent[lang]['categories-stats']['tableHead'][i]}</span>
        </div>
      );
    });

    const categoriesStats = this.Helpers.sumSameCategoryTransactions(transactions);

    const amountCategoryMoney = categoriesStats.reduce((sum, currentCategoryStats) => {
      return sum += currentCategoryStats.money;
    }, 0);

    const tableDate = categoriesStats.map((categoryStats, i) => {

      const categoryPercentage = (categoryStats.money / amountCategoryMoney) * 100;

      return(
        <div className="table-row" key={i}>
          <div className="table-data">
            <span>{categoryStats.category}</span>
          </div>
          <div className="table-data clearfix">
            <span className="percentages left">{categoryPercentage.toFixed(0)}%</span>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{width: categoryPercentage +'%'}}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div className="table-data">
            <span className="amount">{categoryStats.money}</span>
            {staticContent[lang]['currency']}
          </div>
        </div>
      );
    });

    return (
      <Panel
        specialClass="panel-success categories-stats"
        heading={staticContent[lang]['categories-stats'].head}
      >
        <div className="table">
          <div className="table-head clearfix">
            <div className="table-row clearfix">
              {tableHead}
            </div>
          </div>
          <div className="table-body clearfix">
            {tableDate}
          </div>
        </div>
      </Panel>
    );
  }
}

CategoriesStats.propTypes = {
  lang: PropTypes.string,
  categories: PropTypes.array,
  transactions: PropTypes.array
};

export default CategoriesStats;
