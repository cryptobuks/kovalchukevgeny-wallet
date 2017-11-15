import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, linearGradient } from 'Recharts';

import Helpers from './../../helpers/Helpers';
import Panel from './../panel/panel.jsx';
import CustomTooltip from './../custom-tooltip/custom-tooltip.jsx';

import staticContent from './../../static-content/languages';

const TransactionsGraph = props => {
  const Helper = new Helpers();
  const { monthTransactions, lang, theme, pallet } = props;

  // Remaped data for graph
  let transactionsData = Helper.sumSameDateTransactions(monthTransactions).sort((a, b) => a['date'] - b['date']);
  transactionsData = transactionsData.map(item => {
    const date = moment(item.date).format('MMM D');
    return {
      name: date,
      value: item.money
    }
  });

  return (
    <div>
      {monthTransactions.length > 0 &&
      <Panel
        specialClass={`transactions-graph ${theme}`}
        heading={staticContent[lang]['transactions-graph']['head']}
        headingIcon="multiline_chart"
        >
        <div className="graph-wrapper">
          <ResponsiveContainer>
            <AreaChart 
              width={550} 
              height={250} 
              data={transactionsData}
              margin={{top: 10, right: 30, left: 0, bottom: 0}}
            >
              <XAxis
                tick={{stroke: `${theme === 'dark' ? '#fff' : '#000'}`, strokeWidth: 1}}
                dataKey="name"
              />
              <YAxis
                tick={{stroke: `${theme === 'dark' ? '#fff' : '#000'}`, strokeWidth: 1}}
              />
              <CartesianGrid               
                fill={theme === 'dark' ? 'rgba(0, 0, 0, 0.125)' : 'rgba(255, 255, 255, 0.05)'}
              />
              <Tooltip 
                content={<CustomTooltip lang={lang} type={'transactions'}/>}
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
              <Area 
                type='monotone' 
                dataKey='value' 
                stroke={`${pallet.startColor}`} 
                fillOpacity={1} fill='url(#colorUv)'
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Panel>
      }
    </div>
  );
}

TransactionsGraph.defaultProps = {
  monthTransactions: [],
  lang: 'eng',
  theme: 'dark',
};

TransactionsGraph.propTypes = {
  monthTransactions: PropTypes.array,
  lang: PropTypes.string,
  theme: PropTypes.string,
};

export default TransactionsGraph;
