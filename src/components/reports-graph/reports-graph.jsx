import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'Recharts';

import Helpers from './../../helpers/Helpers';

import Panel from './../panel/panel.jsx';
import CustomTooltip from './../custom-tooltip/custom-tooltip.jsx';

import staticContent from './../../static-content/languages';

const ReportsGraph = props => {
  const Helper = new Helpers();
  const { transactions, categories, lang } = props;
  let categoriesData = Helper.groupTransactionsByMonths(transactions);

  categoriesData = categoriesData.map(item => {
    let sum = 0;
    for(let i = 0; i < item.length; i++) {
      sum += item[i].money;
    }
    return sum;
  });

  let resArr = [];
  for (let i = 0; i < categoriesData.length; i++) {
    if (categoriesData[i] > 0) {
      resArr.push({
        name: moment(moment().month(i)).format('MMM'),
        money: categoriesData[i]
      })
    }
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
              <BarChart width={600} height={300} data={resArr}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
               <XAxis dataKey="name"/>
               <YAxis/>
               <CartesianGrid strokeDasharray="3 3"/>
               <Tooltip content={<CustomTooltip lang={lang}/>}/>
               <Bar type="monotone" dataKey="money" fill="rgba(185, 25, 25, 0.6)" stroke="#b91919" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      }
    </div>
  );
}

ReportsGraph.defaultProps = {
  transactions: [],
  categories: [],
  lang: 'eng'
};

ReportsGraph.propTypes = {
  transactions: PropTypes.array,
  categories: PropTypes.array,
  lang: PropTypes.string
};

export default ReportsGraph;
