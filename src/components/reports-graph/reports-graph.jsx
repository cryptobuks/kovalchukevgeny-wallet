import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'Recharts';

import Helpers from './../../helpers/Helpers';

import Panel from './../panel/panel.jsx';
import CustomTooltip from './../custom-tooltip/custom-tooltip.jsx';

import staticContent from './../../static-content/languages';

const ReportsGraph = props => {
  const Helper = new Helpers();
  const { transactions, categories, lang } = props;

  const newTransactions = transactions.map(transaction => {
    transaction.category = Helper.getCategoryById(categories, transaction);
    return transaction;
  })

  const reMapTransactions = transactions => {
    let arrTrans = [];
    for(let i = 0; i < 12; i++) {
      let res = transactions.filter(transaction => {
        return moment(transaction.date).month() === i;
      });
      if(res && res.length > 0) {
        arrTrans[i] = res;
      } else {
        arrTrans[i] = [];
      }
    }
    return arrTrans;
  }

  let categoriesData = reMapTransactions(newTransactions);

  categoriesData = categoriesData.map(categoryData => {
    categoryData = Helper.sumSameMonthTransactions(categoryData);
    return categoryData;
  })
console.log(categoriesData);
  let categoriesObj = {}
  for (let i = 0; i < categories.length; i++) {
    let key = categories[i].title;
    categoriesObj[key] = 0;
  }

  let resArr = [];
  for (let i = 0; i < categoriesData.length; i++) {
    resArr[i] = {
      id: i,
      name: moment(moment().month(i)).format('MMM')
    }
    Object.assign(resArr[i], categoriesObj);
    Object.assign(resArr[i], ...categoriesData[i]);
  }

  // let categoryColor = categories.filter(category => {
  //   return category.title === categoryStats.category
  // })[0];
  // categoryColor = categoryColor.color ? categoryColor.color : '#33373';

  let linesArr = [];
  let type, dataKey, stroke = '';

  for( let prop in categoriesObj ) {
    linesArr.push(<Line key={prop} type="monotone" dataKey={prop} stroke={'#000'} />)
  }

  return (
    <div>
      {transactions.length > 0 &&
        <Panel
          specialClass="reports-graph"
          heading={staticContent[lang]['transactions-graph'].head}
        >
          <div className="graph-wrapper">
            <ResponsiveContainer>
              <LineChart width={1150} height={400} data={resArr}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip content={<CustomTooltip lang={lang} type={'report'}/>}/>
                <Legend />
                {linesArr}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      }
    </div>
  );
}

ReportsGraph.defaultProps = {
  transactions: []
};

ReportsGraph.propTypes = {
  transactions: PropTypes.array,
  categories: PropTypes.array,
  lang: PropTypes.string
};

export default ReportsGraph;
