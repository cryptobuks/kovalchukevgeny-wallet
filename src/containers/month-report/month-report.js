import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import Helpers from './../../helpers/Helpers';

import DayExpenses from './../../components/day-expenses/day-expenses.jsx';
import Row from './../../components/row/row.jsx';
import Col from './../../components/col/col.jsx';
import Container from './../../components/container/container.jsx';

import { changeLang } from './../../actions/actionCreators';

class MonthReport extends Component {
  constructor(props) {
    super(props);

    this.Helpers = new Helpers();
  }

  render() {
    const { lang, transactions, categories } = this.props;
    const currentMonthTransactions = [];
    const transactionsByDay = [];
    let currentProcessedDay = null;

    this.Helpers.getCurrentMonthTransactions(transactions).forEach(transaction => currentMonthTransactions.push({ ...transaction }));

    currentMonthTransactions.forEach((transaction, index, array) => {
      if (moment(transaction.date).date() !== currentProcessedDay) {
        currentProcessedDay = moment(transaction.date).date();
        transactionsByDay.push(array.filter(item => {
          if (moment(item.date).date() === currentProcessedDay) {
            const category = this.Helpers.getCategoryItemById(categories, item.category);
            item['categoryName'] = category.title;
            item['categoryIcon'] = category.icon;
            item['categoryColor'] = category.color;
            return true;
          }
          return false;
        }));
      }
    });

    transactionsByDay.sort((a, b) => moment(b[0].date).date() - moment(a[0].date).date());

    return (
      <div className="month-report">
        {transactionsByDay.map((dayTransaction, index) => {
          return (
            <Container key={index}>
              <Row>
                <Col lg={12}>
                  <DayExpenses
                    lang={lang}
                    transaction={dayTransaction}
                    day={this.Helpers.getDayName(moment(dayTransaction[0].date).day(), lang)}
                  />
                </Col>
              </Row>
            </Container>
          );
        })
        }
      </div>
    );
  }
}

MonthReport.defaultProps = {
  lang: 'eng',
  categories: [],
  transactions: [],
};

MonthReport.propTypes = {
  categories: PropTypes.array,
  lang: PropTypes.string,
  transactions: PropTypes.array,
};

export default connect(state => ({
  categories: state.categories,
  lang: state.lang,
  transactions: state.transactions,
}), { changeLang })(MonthReport);
