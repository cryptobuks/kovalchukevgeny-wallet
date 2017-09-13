import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'Recharts';

import Helpers from './../../helpers/Helpers';
import Panel from './../panel/panel.jsx';
import CustomTooltip from './../custom-tooltip/custom-tooltip.jsx';

import staticContent from './../../static-content/languages';

const TransactionsGraph = props => {
  const Helper = new Helpers();
  const { transactions, lang } = props;

  // Filter transactions on current month
  const monthTransactions = transactions.filter(transaction => {
    return moment().month() === moment(transaction.date).month();
  });

  // Remaped data for graph
  let transactionsData = Helper.sumSameDateTransactions(monthTransactions).sort((a, b) => a['date'] - b['date']);
  transactionsData = transactionsData.map((item, index) => {
    const date = moment(item.date).format('MMM D');
    return {
      id: index,
      name: date,
      value: item.money
    }
  });

  return (
    <div>
      {transactions.length > 0 &&
        <Panel
          specialClass="transactions-graph"
          heading={staticContent[lang]['transactions-graph'].head}
          >
          <div className="graph-wrapper">
            <ResponsiveContainer>
              <AreaChart width={550} height={250} data={transactionsData}
                margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                <XAxis dataKey="name"/>
                <YAxis unit={staticContent[lang].currency}/>
                <CartesianGrid strokeDasharray="1 1"/>
                <Tooltip content={<CustomTooltip lang={lang} type={'transactions'}/>}/>
                <Area type='monotone' dataKey='value' stroke='#b91919' fill='#b91919' />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      }
    </div>
  );
}

TransactionsGraph.defaultProps = {
  transactions: []
};

TransactionsGraph.propTypes = {
  transactions: PropTypes.array,
  lang: PropTypes.string
};

export default TransactionsGraph;
