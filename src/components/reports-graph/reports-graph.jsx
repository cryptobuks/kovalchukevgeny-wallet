import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'Recharts';

import Helpers from './../../helpers/Helpers';
import Panel from './../panel/panel.jsx';
import CustomTooltip from './../custom-tooltip/custom-tooltip.jsx';

import staticContent from './../../static-content/languages';

const ReportsGraph = props => {
  const Helper = new Helpers();
  const { transactions, categories, lang } = props;

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

  let categoriesData = reMapTransactions(transactions);

  categoriesData = categoriesData.map(categoryData => {
    categoryData = Helper.sumSameMonthTransactions(categoryData);
    return categoryData;
  })

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

  let linesArr = [];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ed0cc1', '#f91616', '#ede944', '#827d7d'];
  let type, dataKey, stroke = '';
  for( let prop in categoriesObj ) {
    const color = COLORS[Math.round(0 - 0.5 + Math.random() * (8 - 1 + 1))];
    linesArr.push(<Line key={prop} type="monotone" dataKey={prop} stroke={color} />)
  }

  return (
    <div>
      {transactions.length > 0 &&
        <Panel
          specialClass="reports-graph"
          heading={staticContent[lang]['transactions-graph'].head}
        >
          <LineChart width={1150} height={400} data={resArr}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip content={<CustomTooltip lang={lang} report/>}/>
            <Legend />
            {linesArr}
          </LineChart>
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
