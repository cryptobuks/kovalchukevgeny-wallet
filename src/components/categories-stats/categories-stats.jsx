import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'Recharts';

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
  // Remap category object, transform category title from id to title
  categoriesStats = categoriesStats.map(category => {
    let currentCategory = categories.find(item => +category.category === item.id);
    let categoryColor = '#b91919';

    if (currentCategory) {
      categoryColor = currentCategory.color;
    } else {
      currentCategory = category;
      currentCategory.title = staticContent[lang].defaultCategory;
    }

    return {
        money: category.money,
        category: currentCategory.title,
        color: categoryColor
    }
  });
  // Get amount month money spended
  const amountCategoryMoney = categoriesStats.reduce((sum, currentCategoryStats) => {
    return sum += currentCategoryStats.money;
  }, 0);
  // Show/Hide stats data
  const openStats = event => {
    event.currentTarget.nextSibling.classList.toggle("expanded");
  };
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
              style={{width: categoryPercentage +'%', backgroundColor: categoryStats.color}}
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

  // Remap data for graph
  let categoriesStatsPie = categoriesStats.map((categoryStats, index) => {
    const categoryPercentage = Math.round((categoryStats.money / amountCategoryMoney) * 100);
    let categoryColor = '#33373e';
    let currentCategory = categories.find(category => {
      return category.title === categoryStats.category
    });

    if (currentCategory) {
      categoryColor = currentCategory.color;
    }

    return {
      id: index,
      name: categoryStats.category,
      value: categoryStats.money,
      fill: categoryColor
    }
  });

  return (
    <div>
      {categories.length > 0 &&
        <Panel
          specialClass="categories-stats"
          heading={staticContent[lang]['categories-stats']['head']}
          headingIcon="pie_chart"
        >
          <div className="graph-wrapper">
            <ResponsiveContainer>
              <PieChart width={300} height={300}>
                <Pie
                  data={categoriesStatsPie}
                  dataKey="value"
                  cx={150}
                  cy={150}
                  innerRadius={50}
                  outerRadius={100}
                  fill="#8884d8"
                  label
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
                <Tooltip content={<CustomTooltip lang={lang} type={'category'}/>}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="panel stats">
            <div
              onClick={(e) => openStats(e)}
              className="panel-heading clearfix">
              <h3 className="panel-title left">
                <Icon icon={'format_list_bulleted'} />
                {staticContent[lang]['categories-stats']['details']}
              </h3>
              <h3 className="panel-title right">
                <Icon icon="arrow_drop_down_circle" />
              </h3>
            </div>
            <div className="panel-body expanded">
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
            </div>
          </div>
        </Panel>
      }
    </div>
  );
}

CategoriesStats.defaultProps = {
  lang: 'eng',
  categories: [],
  transactions: []
};

CategoriesStats.propTypes = {
  lang: PropTypes.string,
  categories: PropTypes.array,
  transactions: PropTypes.array
};

export default CategoriesStats;
