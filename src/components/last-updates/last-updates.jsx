import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import staticContent from './../../static-content/languages';

const LastUpdates = props => {
  const { lang, amount, transactions } = props;

  const LatestTransaction = Math.max.apply(Math,transactions.map(transaction => transaction.id));

  return (
    <ul className="list-group">
      <li className="list-group-item">
        {staticContent[lang]['last-updates']['lastUpdate']}
        <span className="badge">
          {moment(LatestTransaction).format('DD MMM, YYYY')}
        </span>
      </li>
      <li className="list-group-item">
        {staticContent[lang]['last-updates']['amount']}
        <span className="badge">
          {amount} {staticContent[lang]['currency']}
        </span>
      </li>
    </ul>
  );
}

LastUpdates.defaultProps = {
  lang: 'eng',
  amount: 0,
  transactions: []
};

LastUpdates.propTypes = {
  lang: PropTypes.string,
  amount: PropTypes.number,
  transactions: PropTypes.array
};

export default LastUpdates;
