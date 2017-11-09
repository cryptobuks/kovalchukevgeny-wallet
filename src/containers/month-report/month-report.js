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
    const { transactions, categories, user } = this.props;
    const lang = user.settings.lang;
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
            const currentTransaction = item;
            currentTransaction.categoryName = category.title;
            currentTransaction.categoryIcon = category.icon;
            currentTransaction.categoryColor = category.color;
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
                    theme={user.settings.theme}
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
  categories: [],
  transactions: [],
};

MonthReport.propTypes = {
  categories: PropTypes.array,
  transactions: PropTypes.array,
  user: PropTypes.object,
};

export default connect(state => ({
  categories: state.categories,
  transactions: state.transactions,
  user: state.user,
}), { changeLang })(MonthReport);
