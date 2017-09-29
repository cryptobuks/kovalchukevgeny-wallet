import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import DayExpenses from './../../components/day-expenses/day-expenses.jsx';

import { changeLang } from './../../actions/actionCreators';

class MonthReport extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { lang } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <DayExpenses 
              lang={lang}
            />
          </div>
        </div>
      </div>
    );
  }
}

MonthReport.defaultProps = {
  lang: 'eng',
  categories: [],
  transactions: []
};

MonthReport.propTypes = {
  categories: PropTypes.array,
  transactions: PropTypes.array,
  lang: PropTypes.string,
};

export default connect(state => ({
  lang: state.lang
}), { changeLang })(MonthReport);
