import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, linearGradient } from 'Recharts';

import Helpers from './../../helpers/Helpers';

import Panel from './../panel/panel.jsx';
import CustomTooltip from './../custom-tooltip/custom-tooltip.jsx';

import staticContent from './../../static-content/languages';

const ReportsGraph = props => {
  const Helper = new Helpers();
  const { transactions, categories, lang, theme, pallet } = props;
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
          specialClass={`reports-graph ${theme}`}
          heading={staticContent[lang]['transactions-graph']['head']}
        >
          <div className="graph-wrapper">
            <ResponsiveContainer>
              <BarChart 
                width={600} 
                height={300} 
                data={resArr}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
              >
                <XAxis 
                  dataKey="name"
                  tick={{stroke: `${theme === 'dark' ? '#fff' : '#000'}`, strokeWidth: 1}}
                />
                <YAxis
                  tick={{stroke: `${theme === 'dark' ? '#fff' : '#000'}`, strokeWidth: 1}}
                />
                <CartesianGrid 
                  fill={theme === 'dark' ? 'rgba(0, 0, 0, 0.125)' : 'rgba(255, 255, 255, 0.05)'}
                />
                <Tooltip 
                  content={<CustomTooltip lang={lang}/>}
                />
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop 
                      offset="5%" 
                      stopColor={`${pallet.endColor}`} 
                      stopOpacity={0.8}
                    />
                    <stop 
                      offset="95%" 
                      stopColor={`${pallet.startColor}`} 
                      stopOpacity={0.2}
                    />
                  </linearGradient>
                </defs>
                <Bar               
                  dataKey="money" 
                  stroke={`${pallet.startColor}`} 
                  fillOpacity={1} 
                  fill='url(#colorUv)'
                />
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
  lang: 'eng',
  theme: 'dark',
};

ReportsGraph.propTypes = {
  transactions: PropTypes.array,
  categories: PropTypes.array,
  lang: PropTypes.string,
  theme: PropTypes.string
};

export default ReportsGraph;
