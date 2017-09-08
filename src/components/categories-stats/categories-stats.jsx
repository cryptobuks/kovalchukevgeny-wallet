import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { PieChart, Pie, Legend, Tooltip } from 'Recharts';

import Icon from './../icon/icon.jsx';
import Panel from './../panel/panel.jsx';
import CustomTooltip from './../custom-tooltip/custom-tooltip.jsx';

import Helpers from './../../helpers/Helpers';

import staticContent from './../../static-content/languages';

const CategoriesStats = props => {

  const Helper = new Helpers();

  let { lang, categories, transactions } = props;
  // Get month transactions
  transactions = transactions.filter(transaction => {
    return moment(transaction.date).format('YYYY-MM') === moment().format('YYYY-MM');
  });
  // Render table head
  const tableHead = staticContent[lang]['categories-stats']['tableHead'].map((headItem, i) => {
    headItem = headItem.toLowerCase();
    return (
      <div className="table-data" key={i} data-cell={headItem}>
        <span data-cell={headItem}>{staticContent[lang]['categories-stats']['tableHead'][i]}</span>
      </div>
    );
  });
  // Sum money by category
  let categoriesStats = Helper.sumSameCategoryTransactions(transactions);
  // Sort data by results of summarized money value
  if(categoriesStats.length > 0) {
    categoriesStats.sort((a, b) => b['money'] - a['money']);
  }
  // Get amount month money spended
  const amountCategoryMoney = categoriesStats.reduce((sum, currentCategoryStats) => {
    return sum += currentCategoryStats.money;
  }, 0);
  // Render table data
  const tableData = categoriesStats.map((categoryStats, i) => {
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
          <span className="amount">{categoryStats.money.toFixed(2)}</span>
          {staticContent[lang]['currency']}
        </div>
      </div>
    );
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ed0cc1', '#f91616', '#ede944', '#827d7d'];
  // Remap data for graph
  let categoriesStatsPie = categoriesStats.map((categoryStats, index) => {
    const categoryPercentage = Math.round((categoryStats.money / amountCategoryMoney) * 100);

    COLORS[index] = COLORS[index] ? COLORS[index] : COLORS[Math.round(0 - 0.5 + Math.random() * (8 - 1 + 1))];
    return {
      id: index,
      name: categoryStats.category,
      value: categoryStats.money,
      fill: COLORS[index]
    }
  });

  return (
    <div>
      {categories.length > 0 &&
        <Panel
          specialClass="categories-stats"
          heading={staticContent[lang]['categories-stats'].head}
        >
          <div className="table">
            <div className="table-head clearfix">
              <div className="table-row clearfix">
                {tableHead}
              </div>
            </div>
            <div className="table-body clearfix">
              {tableData}
            </div>
          </div>
          <PieChart width={300} height={300}>
            <Pie
              data={categoriesStatsPie}
              isAnimationActive={false}
              dataKey="value"
              cx={150}
              cy={150}
              innerRadius={50}
              outerRadius={100}
              fill="#8884d8"
            >

            </Pie>
            <Legend
              dataKey="money"
              valueKey="category"
              iconType='circle'
              iconSize={10}
              width={120}
              height={140}
              layout='vertical'
              wrapperStyle={{top: 20, left: 320}}
            />
            <Tooltip content={<CustomTooltip lang={lang} category/>}/>
          </PieChart>
        </Panel>
      }
    </div>
  );
}

CategoriesStats.propTypes = {
  lang: PropTypes.string,
  categories: PropTypes.array,
  transactions: PropTypes.array
};

export default CategoriesStats;
