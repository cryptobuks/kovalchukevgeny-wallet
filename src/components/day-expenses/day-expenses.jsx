import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Panel from './../panel/panel.jsx';

const DayExpenses = props => {
     return (
        <Panel>
            <div>
                Day
            </div>
        </Panel>
    );
}

DayExpenses.defaultProps = {
  payload: [],
  lang: 'eng'
}

DayExpenses.propTypes = {
  type: PropTypes.string,
  payload: PropTypes.array,
  label: PropTypes.string,
  lang: PropTypes.string
}

export default DayExpenses;
