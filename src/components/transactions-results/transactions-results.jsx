import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Helpers from './../../helpers/Helpers';
import Panel from './../panel/panel.jsx';
import ListGroup from '../list-group/list-group.jsx';
import ListGroupItem from '../list-group-item/list-group-item.jsx';
import Badge from '../badge/badge.jsx';

import staticContent from './../../static-content/languages';

const TransactionsResults = props => {
  const Helper = new Helpers();

  const getMaxValue = array => {
    if (array && array.length > 0) {
      return Math.max.apply(Math, array.map(transaction => transaction.money));
    }
    return 0;
  }

  const renderBiggestTransaction = transactions => {
    const { lang, theme } = props;

    let biggestTransaction = transactions.filter(transaction => transaction.money === getMaxValue(transactions));

    return (
      biggestTransaction.map((transaction, i) => {
        return (
          <ListGroup key={i}>
            <ListGroupItem className={`list-group-item ${theme}`}>
              {`${moment(transaction.date).format('DD')}
              ${staticContent[lang]['rusMonths'][moment().month()]} -
              ${transaction.description}`}
              <Badge>
                {transaction.money.toFixed(2)} {staticContent[lang]['currency']}
              </Badge>
            </ListGroupItem>
          </ListGroup>
        );
      })
    );
  }

  const { monthTransactions, lang, course, theme } = props;
  const today = new Date();
  let amountDay = 0;
  let amountMonth = 0;
  let amountDayCurrency = 0;
  let amountMonthCurrency = 0;

  let monthCourse = { course: 1 }

  if (monthTransactions[0]) {
    monthCourse = course.find(currentCourse => {
      return moment(currentCourse.date).format('YYYY-MM') === moment(monthTransactions[0].date).format('YYYY-MM');
    }) || { course: 1 };
  }

  const unicTransactions = Helper.sumSameDateTransactions(monthTransactions);

  if (unicTransactions && unicTransactions.length > 0) {
    amountDay = unicTransactions.reduce((sum, transaction) => {
      return sum += transaction.money;
    }, 0) / unicTransactions.length;
    amountMonth = unicTransactions.reduce((sum, transaction) => {
      return sum += transaction.money;
    }, 0);
  }

  amountDayCurrency = amountDay / monthCourse.course;
  amountMonthCurrency = amountMonth / monthCourse.course;

  return (
    <Panel
      specialClass={`results ${theme}`}
      heading={staticContent[lang]['transactions-results']['head']}
      headingIcon="insert_invitation"
    >
      <ListGroup>
        <ListGroupItem className={`list-group-item ${theme}`}>
          {staticContent[lang]['transactions-results']['month']}
          <Badge>
            {staticContent[lang]['months'][moment().month()]}
          </Badge>
        </ListGroupItem>
        <ListGroupItem className={`list-group-item ${theme}`}>
          {staticContent[lang]['transactions-results']['transactions']}
          <Badge>
            {monthTransactions.length}
          </Badge>
        </ListGroupItem>
        <ListGroupItem className={`list-group-item ${theme}`}>
          {staticContent[lang]['transactions-results']['amountMonth']}
          <Badge>
            {`${amountMonth.toFixed(2)} ${staticContent[lang]['currency']} /
            ${amountMonthCurrency.toFixed(2)}$`}
          </Badge>
        </ListGroupItem>
        <ListGroupItem className={`list-group-item ${theme}`}>
          {staticContent[lang]['transactions-results']['amountDay']}
          <Badge>
            {`${amountDay.toFixed(2)} ${staticContent[lang]['currency']} /
            ${amountDayCurrency.toFixed(2)}$`}
          </Badge>
        </ListGroupItem>
      </ListGroup>
      <h6 className="result-item">{staticContent[lang]['transactions-results']['bigTrans']}:</h6>
      {renderBiggestTransaction(monthTransactions)}
    </Panel>
  );
}

TransactionsResults.defaultProps = {
  transactions: [],
  lang: 'eng',
  course: [],
  theme: 'dark',
};

TransactionsResults.propTypes = {
  transactions: PropTypes.array,
  lang: PropTypes.string,
  course: PropTypes.array,
  theme: PropTypes.string,
};

export default TransactionsResults;
