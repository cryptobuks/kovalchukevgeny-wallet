import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import ListGroup from '../list-group/list-group.jsx';
import ListGroupItem from '../list-group-item/list-group-item.jsx';
import Badge from '../badge/badge.jsx';

import staticContent from './../../static-content/languages';

const LastUpdates = props => {
  const { lang, amount, transactions } = props;

  const LatestTransaction = Math.max.apply(Math, transactions.map(transaction => transaction.id));

  return (
      <ListGroup>
        <ListGroupItem>
          {staticContent[lang]['last-updates']['lastUpdate']}
          <Badge>
            {moment(LatestTransaction).format('DD MMM, YYYY')}
          </Badge>
        </ListGroupItem>
        <ListGroupItem>
        {staticContent[lang]['last-updates']['amount']}
          <Badge>
            {amount} {staticContent[lang]['currency']}
          </Badge>
        </ListGroupItem>
      </ListGroup>
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
