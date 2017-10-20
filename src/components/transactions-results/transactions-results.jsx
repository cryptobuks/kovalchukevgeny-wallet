import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Helpers from './../../helpers/Helpers';
import Panel from './../panel/panel.jsx';

import staticContent from './../../static-content/languages';

const TransactionsResults = props => {
  const Helper = new Helpers();

  const getMaxValue = array => {
    if(array && array.length > 0) {
      return Math.max.apply(Math,array.map(transaction => transaction.money));
    }
    return 0;
  }

  const renderBiggestTransaction = transactions => {
    const { lang } = props;

    let biggestTransaction = transactions.filter(transaction => transaction.money === getMaxValue(transactions));

    return(
      biggestTransaction.map((transaction, i) => {
        return (
          <ul className="list-group" key={i}>
            <li className="list-group-item">
              {`${moment(transaction.date).format('DD')}
              ${staticContent[lang]['rusMonths'][moment().month()]} -
              ${transaction.description}`}
              <span className="badge">
                {transaction.money.toFixed(2)} {staticContent[lang]['currency']}
              </span>
            </li>
          </ul>
        );
      })
    );
  }

  const { monthTransactions, lang, course } = props;
  const today = new Date();
  let amountDay = 0;
  let amountMonth = 0;
  let amountDayCurrency = 0;
  let amountMonthCurrency = 0;

  let monthCourse = { course: 1 }

  if(monthTransactions[0]) {
    monthCourse = course.find(currentCourse => {
      return moment(currentCourse.date).format('YYYY-MM') === moment(monthTransactions[0].date).format('YYYY-MM');
    }) || { course: 1 };
  }

  const unicTransactions = Helper.sumSameDateTransactions(monthTransactions);

  if(unicTransactions && unicTransactions.length > 0) {
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
      specialClass="results dark"
      heading={staticContent[lang]['transactions-results']['head']}
      headingIcon="insert_invitation"
    >
      <ul className="list-group">
        <li className="list-group-item">
          {staticContent[lang]['transactions-results']['month']}
          <span className="badge">
            {staticContent[lang]['months'][moment().month()]}
          </span>
        </li>
        <li className="list-group-item">
          {staticContent[lang]['transactions-results']['transactions']}
          <span className="badge">
            {monthTransactions.length}
          </span>
        </li>
        <li className="list-group-item">
          {staticContent[lang]['transactions-results']['amountMonth']}
          <span className="badge">
            {`${amountMonth.toFixed(2)} ${staticContent[lang]['currency']} /
            ${amountMonthCurrency.toFixed(2)}$`}
          </span>
        </li>
        <li className="list-group-item">
          {staticContent[lang]['transactions-results']['amountDay']}
          <span className="badge">
            {`${amountDay.toFixed(2)} ${staticContent[lang]['currency']} /
            ${amountDayCurrency.toFixed(2)}$`}
          </span>
        </li>
      </ul>
      <h6 className="result-item">{staticContent[lang]['transactions-results']['bigTrans']}:</h6>
      {renderBiggestTransaction(monthTransactions)}
    </Panel>
  );
}

TransactionsResults.defaultProps = {
  transactions: [],
  lang: 'eng',
  course: []
};

TransactionsResults.propTypes = {
  transactions: PropTypes.array,
  lang: PropTypes.string,
  course: PropTypes.array
};

export default TransactionsResults;
