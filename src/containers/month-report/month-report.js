import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

import DayExpenses from './../../components/day-expenses/day-expenses.jsx';

class MonthReport extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <DayExpenses />
    );
  }
}

MonthReport.defaultProps = {
  lang: 'eng'
};

MonthReport.propTypes = {
  lang: PropTypes.string
};

export default connect(state => ({
  lang: state.lang
}), { changeLang })(MonthReport);
