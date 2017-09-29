import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DayExpenses from './../../components/day-expenses/day-expenses.jsx';
import Row from './../../components/row/row.jsx';
import Container from './../../components/container/container.jsx';

import { changeLang } from './../../actions/actionCreators';

class MonthReport extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { lang } = this.props;

    return (
      <Container>
        <Row>
          <div className="col-lg-12">
            <DayExpenses
              lang={lang}
            />
          </div>
        </Row>
      </Container>
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
  lang: PropTypes.string,
  transactions: PropTypes.array
};

export default connect(state => ({
  categories: state.categories,
  lang: state.lang,
  transactions: state.transactions
}), { changeLang })(MonthReport);
